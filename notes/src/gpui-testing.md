---
created: 2026-09-05 09:30
updated: 2026-09-05 09:30
---
# GPUIアプリのテスト

#rust #gui #test

[[gpui|GPUI]]はヘッドレスのテストプラットフォーム(`TestPlatform` / `TestDispatcher`)を内蔵しており、実GPU・実ウィンドウなしで「アプリを起動してクリック・キー入力してアサートする」ところまで書ける。[[playwright|Playwright]]のような外部ドライバを立てるのではなく、フレームワーク自身がプラットフォーム層を差し替える方式。Zed本体もこの仕組みで大量のテストを回している。

## セットアップ

`dev-dependencies`で`test-support`フィーチャを有効にするだけ。crates.ioの`gpui` 0.2.2にもこのフィーチャはある。

```toml
[dev-dependencies]
gpui = { version = "0.2", features = ["test-support"] }
```

## `#[gpui::test]`マクロ

テスト本体をGPUIの決定論的スケジューラでラップした上で`#[test]`を吐くので、`cargo test`や`cargo nextest`にそのまま乗る。**引数の型を見て必要なものを自動で注入する**のが特徴。

| 引数の型 | 注入されるもの |
| --- | --- |
| `&mut TestAppContext` / `&TestAppContext` | テスト用アプリコンテキスト。複数個要求できる(マルチクライアントのテスト用) |
| `StdRng` | `SEED`環境変数でシードされた乱数 |
| `BackgroundExecutor` | 非同期テストのみ |

```rust
#[gpui::test]
fn sync_test(cx: &mut TestAppContext) { }

#[gpui::test]
async fn async_test(cx: &mut TestAppContext) { }

#[gpui::test(seeds(10, 20, 30))]
fn randomized(cx: &mut TestAppContext, rng: StdRng) { }
```

マクロ引数は`seed = N` / `seeds(..)` / `iterations = N`(シード0..N-1でN回実行) / `retries = N` / `on_failure = "path::to::fn"`。環境変数`SEED`・`ITERATIONS`・`PENDING_TRACES=1`でも制御できる。ランダマイズドテストを大量に流して、落ちたシードを`seed = N`で固定して再現する、という使い方が本来の狙い。

## `TestAppContext` — アプリレベル

```rust
let window = cx.add_window(|_, _| MyView::new());            // 最大化サイズで開く
let (view, cx) = cx.add_window_view(|_, cx| MyView::new());  // ViewとVisualTestContextを同時に得る
let window = cx.open_window(bounds, |_, _| MyView::new());   // レイアウト依存テスト用にサイズ指定
```

- `cx.update(|cx| ...)` / `cx.read(|cx| ...)` で`&mut App`・`&App`を借りる
- `cx.run_until_parked()` — 保留タスクが尽きるまで進める。**アサート前にこれを呼ぶのが基本作法**
- `cx.simulate_keystrokes(window, "cmd-shift-p b k s p enter")` / `cx.simulate_input(window, "abc")` / `cx.dispatch_action(window, MyAction)`。いずれも内部で自動的にrun_until_parkedする
- プラットフォームのフリをする系: `write_to_clipboard` / `read_from_clipboard`、`simulate_new_path_selection`(ファイル選択ダイアログ)、`simulate_prompt_answer` / `has_pending_prompt`(アラート)、`opened_url()`(`cx.open_url()`の記録)、`shown_system_notifications()`、`simulate_window_resize`
- `cx.notifications::<T>()` / `cx.events::<Evt, T>()` でエンティティの通知・イベントをストリームとして観測できる。`cx.condition(..)`で条件成立まで待つ
- `cx.skip_drawing()` で描画を全部スキップする(描画が本題でないテスト向け)

## `VisualTestContext` — ウィンドウ・入力レベル

`add_window_view`の戻り値、または`VisualTestContext::from_window(window, cx)`で得る。元の`TestAppContext`をこれでシャドウイングするのが慣例(`Deref`で`TestAppContext`のメソッドも生えている)。

- `simulate_click(point, modifiers)`、`simulate_mouse_move/down/up`、`simulate_modifiers_change`、`simulate_capslock_change`
- `simulate_input("hello")`、`simulate_keystrokes("cmd-p escape")`、`dispatch_action(..)`
- `cx.draw(origin, space, |window, cx| element)` で任意のElementを単体で描画し、その上に`simulate_event(ScrollWheelEvent { .. })`のような低レベルイベントを流す
- `debug_bounds("selector")` で要素の実際のboundsを取得し、ヒットテスト位置を決める
- `simulate_resize` / `deactivate_window` / `simulate_close` / `window_title`

Zedのmarkdown crateにある実例。ウィンドウを開いて`(8px, 8px)`をクリックし、リンクが開かれたかを`opened_url()`で確認している。

```rust
#[gpui::test]
fn test_clicking_image_fallback_opens_image_url(cx: &mut TestAppContext) {
    let (_, cx) = cx.add_window_view(|_, cx| ImageTestView {
        markdown: cx.new(|cx| Markdown::new(source.into(), None, None, cx)),
        image_source: failing_image_source(),
    });
    cx.run_until_parked();

    cx.simulate_click(point(px(8.), px(8.)), gpui::Modifiers::default());
    assert_eq!(cx.opened_url(), Some("https://example.com/image.png".to_string()));
}
```

## 時間の制御

`BackgroundExecutor`が偽クロックを持っているので、実時間をsleepして待つ必要がない。ここが[[flaky-test|flaky test]]を避ける肝になっている。

- `executor.advance_clock(Duration::from_secs(1))` — タスクは走らせず、タイマーだけ満期にする
- `executor.run_until_parked()` / `executor.tick()`
- `allow_parking()` / `forbid_parking()` — 未完了タスクが残った状態でのpanicを抑制/再有効化する
- `simulate_random_delay().await` — ランダムな順序でタスクを差し込む。SEEDを変えて総当たりすることで、並行処理の順序依存バグを炙り出す

注意点として、GPUIのテスト内で`smol::Timer::after(..)`を直接使わないこと。テストスケジューラが追跡していないため`run_until_parked()`がそれを待ってくれない。時間待ちは`cx.background_executor().timer(..)`経由にする。

## 外部アプリから使うときの前提

[[gpui|GPUI]]のノートに書いた通りcrates.io版`gpui`は0.2.2で更新が止まっているため、上記APIのうち新しめのもの(`open_window`、`shown_system_notifications`など)は`gpui-unofficial` / `gpui-pre` / `gpui-ce`といったスナップショット側にしか無い可能性がある。手元で使っているバージョンの`TestAppContext` / `VisualTestContext`のdocsを確認するのが確実。

## 出典

- [test in gpui - docs.rs](https://docs.rs/gpui/latest/gpui/attr.test.html)
- [zed/crates/gpui/src/app/test_context.rs](https://github.com/zed-industries/zed/blob/main/crates/gpui/src/app/test_context.rs)
- [zed/crates/gpui/src/executor.rs](https://github.com/zed-industries/zed/blob/main/crates/gpui/src/executor.rs)
- [zed/crates/markdown/src/markdown.rs のテスト](https://github.com/zed-industries/zed/blob/main/crates/markdown/src/markdown.rs)
- [gpui-test Skill by zed-industries](https://claudeskills.info/skills/zed-industries/zed/gpui-test/)
