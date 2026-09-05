---
created: 2026-09-05 15:09
updated: 2026-09-05 15:30
---
# GPUI Community Edition (gpui-ce)

#rust #gui

[[gpui|GPUI]]のコミュニティフォーク。2025年12月にZedのソースからフォークされ、`cargo add gpui-ce`だけで使えるよう独立配布されている。ライセンスApache-2.0、GitHub Starsは約1,000(2026年9月時点)。READMEでは「今はほぼAPI互換だが、これから変えていく」と明言している。

公式`gpui`がcrates.ioで0.2.2(2025-10-22)から止まっていることへの対応として選択肢に挙がるが、単なるスナップショット再配布(`gpui-pre`や`gpui-unofficial`)とは違い、**upstreamに入っていない機能を独自に足している**のがこのフォークの性格。

## なぜフォークしたのか

READMEのFAQに目的が明記されている。

> **What is the long-term goal of GPUI-CE?**
> To be the premiere Rust GUI library.
> We were born out of Zed's hard work, and we will always pull their fixes and hard work, they remain a huge inspiration.
> And yet, our ambitions are larger than supporting the use-cases of two applications. (…) Our roots are in the web, and we want to take on the current application monster that is Electron, head to head, but with order-of-magnitude performance improvements and platform integrations.

「Zedを壊さない・Zedを支えるという制約から外れて、GPUIを汎用GUIフレームワークとして先に進める」ための場、という位置づけ。[[gpui|GPUI]]自体がZedとテキスト編集を念頭に作られており、Zed Industriesがコミュニティ専用の作業に工数を割くのを正当化しにくい、という事情の裏返しでもある。

他のフォークとの関係についてもFAQで触れていて、WGPUIなどは「それぞれが使われているプロジェクトの利害に沿って分岐していて、多様だが断片化したエコシステムになっている」とし、gpui-ceは安定性を重視しつつ他フォークの良いアイデアを継続的に取り込む、としている。

## リポジトリの形からして違う

- ワークスペースは21クレートで、中身はGPUIとその周辺だけ。Zedのエディタ関連クレートは丸ごと落としている(初期の`cleanup/remove-non-apache-crates`でApache-2.0でないものも除去)。
- ルートの`Cargo.toml`に**gitソース依存が0件**。upstream Zedはalacritty_terminal・tree-sitter・lsp-typesなどgit依存を多数持っており、これがそのままだとcrates.ioに出せない。gpui-ceは「crates.ioだけで解決できる」状態を維持することを公開の前提にしている。
- `gpui_elements`という独立クレートがある(後述のテキスト入力要素の置き場)。
- crates.ioでの`gpui-ce`は0.2.2(2026-08-28)。0.3.2/0.3.3(2025-12-27)はyank済みなので`cargo add gpui-ce`は0.2.2を拾う。`docs/releasing.md`によると、main のCIが通るたびに`1.0.0-alpha.N`という開発スナップショットをcrates.ioに出す方針(prereleaseなので通常の解決からは外れ、明示的に`cargo add gpui-ce@1.0.0-alpha.3`する必要がある)。2026年9月初旬時点ではまだalphaは公開されていない。

## 独自機能

以下は2026年9月初旬時点でZed本流(`zed-industries/zed`)のツリーに見当たらず、gpui-ce側にだけあるもの。

### スタイルのトランジション

CSSの`transition`相当。upstreamにはアニメーション(`Animation`)はあるがスタイル変化の補間APIは無い。

```rust
div()
    .id(self.id)
    .bg(base_color)
    .transitions(|transitions| {
        transitions.bg(Duration::from_millis(200).with_easing(ease_in_out))
    })
    .hover(|refinement| refinement.bg(hover_color))
    .active(|refinement| refinement.bg(active_color))
```

自動サイズ(`auto`)に対するトランジションのスナップ処理まで入っている(`style_transitions.rs`)。

### filter / backdrop-filter(ぼかし)

`Styled`にCSS相当のフィルタAPIがある。

- `.blur(radius)` — 要素とその子をグループとしてぼかす。CSSの`filter: blur()`。サブツリーをオフスクリーンに分離してから合成する
- `.backdrop_blur(radius)` — 要素の**背後**をぼかす。CSSの`backdrop-filter: blur()`。すりガラス。半透明の`.bg()`と組み合わせて使う
- `.filter(...)` / `.backdrop_filter(...)` — チェーン全体を置き換える

`Filter` enumは現状`Blur(Pixels)`のみ。`Filter::is_identity()`が真になるフィルタはレンダラに届く前に落とされ、全部が恒等ならオフスクリーン分離自体を省く、という作りになっている。

### wgpuのテクスチャをGPUI要素として貼れる

upstreamの`SurfaceSource`はmacOSの`CVPixelBuffer`(CoreVideoの映像バッファ)専用。gpui-ceはここに「型消去したGPUテクスチャハンドル」のvariantを足していて、Linux/FreeBSDと、Windows(`wgpu-surfaces` feature)で自前のwgpu描画をGPUIのレイアウトに載せられる。

関連して、

- `gpui_windows`の`wgpu` featureでWindowsのwgpuレンダラが使える
- `Window::gpu_device_lost()`でデバイスロスト状態を問い合わせられる(upstreamはWindowsプラットフォーム内部にしか無い)

3Dビューやカスタムシェーダの描画を埋め込みたい場合、これがupstreamとの一番大きな機能差になる。

### テキスト入力要素(`gpui_ce_elements`)

`gpui_ce_elements::editable_text::{text_input, text_area}`。HTMLの`<input>`/`<textarea>`に相当する要素で、素のGPUIには存在しない(Zedは自前の`editor`クレート、[[gpui-kit|GPUI Kit]]は自前のInputコンポーネントで賄っている)。

```rust
use gpui_ce_elements::editable_text::text_input;

text_input("my_input")
    .placeholder("empty text")
    .w_5()
    .min_h_auto()
    .whitespace_nowrap()
```

ドキュメンテーションコメントによれば、文字/単語/行/文書単位のキーボード移動、ダブル・トリプルクリックとドラッグでの選択、**IME入力(日本語・中国語・韓国語)**、カット/コピー/ペースト、点滅キャレット、フィールド内でのundo/redoまで含む。ストレージは既定で`String`だが、大きな文書向けに`UnicodeTextStorage`を自前実装して差し替えられる。フォーカスハンドルを要素が内部に持つ点だけ他の要素と違う。

### macOSのactivation policy

```rust
pub enum MacActivationPolicy {
    Regular,    // Dockに出る通常のアプリ
    Accessory,  // Dockにもメニューバーにも出ないが、ウィンドウのクリック等で有効化できる
    Prohibited, // Dockに出ず、ウィンドウ生成も有効化もできない
}
```

`Platform::set_mac_activation_policy()`。upstreamには無い。Dockアイコンを出さない常駐型ツールを作るのに要る。

### その他のプラットフォームAPI

| API | 内容 |
| --- | --- |
| `supports_haptic_feedback()` / 触覚フィードバック再生 | macOSのハプティクス |
| `set_keyring_label()` | OSキーリングに出るラベルの指定 |
| Waylandのキネティックスクロール | 慣性スクロール |
| Waylandのウィンドウアイコン | アイコン設定 |
| win32の`start_window_move` | タイトルバー相当領域からのウィンドウ移動 |

### テキストスタイルの追加

`Styled::letter_spacing()`と`Styled::text_transform()`。どちらもupstreamの`styled.rs`には無い。

## 色の型が`palette`クレートに置き換わっている

一番大きな非互換。GPUI独自実装の`Rgba`/`Hsla`を捨て、`palette`クレートの型をそのまま再エクスポートしている。

```rust
use palette::{IntoColor, OklabHue, Oklcha, RgbHue};
pub use palette::{Hsla, rgb::Rgba};
```

グラデーションの既定の補間色空間もoklabになった。「ほぼAPI互換」と言いつつ、色を構造体リテラルで組み立てているコードは書き換えが必要になる。実際、後述のコンポーネントライブラリのフォークではこの追随作業が commit の大半を占めている。

## コンポーネントライブラリも別系統でフォークしている

2026年8月末、gpui-ceは[[gpui-kit|GPUI Kit]](旧`longbridge/gpui-component`)を取り込み、`gpui-ce/gpui-component`という別リポジトリのフォークとして持ち、crates.ioに`gpui_ce_components`系として公開した。

| クレート | 対応する本家 |
| --- | --- |
| `gpui_ce_components` | `gpui-component` |
| `gpui_ce_components_base` | `gpui-base` |
| `gpui_ce_components_shell` | `gpui-shell` |
| `gpui_ce_components_webview` | `crates/webview`([[gpui-wry]]) |
| `gpui_ce_components_assets` / `_fps` / `_macros` | 同名の補助クレート |

つまり「GPUI Kitのコンポーネントをgpui-ceの上で使う」という道は一応開いた。ただしダウンロード数は各数十件で、本家(`gpui-component`はrecentだけで4.5万)とは実績も追随の速さも桁が違う。

### なぜコンポーネント側までフォークが要ったか

機械的な理由は、GPUIの再配布元が`Cargo.toml`にハードコードされていること。

```toml
gpui = { package = "gpui-pre", version = "0.3.1" }   # 本家 longbridge/gpui-kit
gpui = { package = "gpui-ce", version = "0.2.2" }    # gpui-ce/gpui-component
```

Rustではパッケージが違えば同じ`struct`でも別の型なので、本家のコンポーネントはgpui-ceの上で1行も使えない。コンポーネントが欲しければフォークするしかない。

上流で解決しようとした形跡はある。[Discussion #1856「Feature flag to use gpui-ce」](https://github.com/longbridge/gpui-component/discussions/1856)で、`gpui-component`の利用者がコンパイル時に`gpui`と`gpui-ce`をfeature flagで選べるようにしてはどうか、という提案が出た。メンテナ(huacnlee)は[Issue #2234](https://github.com/longbridge/gpui-kit/issues/2234)(`gpui-unofficial`を使う提案)へ誘導し、そちらは Closed as not planned。結局longbridgeはどちらにも乗らず自前の`gpui-pre`を作った。上流でスイッチャブルにする道が閉じたのでフォークした、という流れに見える(フォーク側に明文の説明は見当たらないので、ここは経緯からの推測)。

フォークの中身もそれを裏付ける。upstreamの`0e2fb7a`(2026-08-29)から分岐し、フォーク独自のコミットは13個。内訳はクレート名のリネーム(`Package GPUI CE components`)と色APIのpalette化への追随(`Adapt base palette colors`、`Adapt UI palette APIs`など)、あとはCI修正。136ファイルの変更のうち大半が`Cargo.lock`と`crates/ui/src/theme/color.rs`と各`Cargo.toml`で、**機能追加は1つも無い**。独自路線を歩むためのフォークではなく、純粋な互換ポート。

追随体制も弱い。分岐点はGPUI Kitへの改名前(`crates/ui`のままの構成)で、本家の更新をそのまま取り込めるわけでもない。

## 誤解しやすい点

- **システムトレイ/ステータスバー常駐はgpui-ceにも無い。** `NSStatusBar`・`Shell_NotifyIcon`・`StatusNotifierItem`のいずれの実装も、upstream・gpui-ceどちらのツリーにも見当たらない(2026年9月初旬時点)。「Zed本体に要らない機能はgpui-ceへ」という案内から、トレイ対応がgpui-ceにあると思われがちだが、そこは埋まっていない。この誤解の出所はおそらく前述のDiscussion #1856で、そこでは「Zedのスコープ外として弾かれる機能」の例としてカスタムシェーダ・トレイ対応・Waylandのタッチイベント変換が挙げられている。あくまで要望として挙がっただけで、実装されたわけではない。同じくメニュー周りも、macOS以外でOSのメニューバーを出す手段は無い([[gpui-kit-cross-platform-menu|GPUI Kitでのクロスプラットフォームなメニュー]])。
- Waylandの`input_region`・`exclusive_zone`・layer shellは**upstreamにも入っている**。gpui-ce側のPRとして議論されたものの一部は本流にも取り込まれている。
- upstreamも`spring.rs`や`elements/surface.rs`は持っている。差分は「surfaceの入力元にGPUテクスチャがあるか」といった中身の側にある。

## 選ぶかどうか

トランジション・ぼかし・テキスト入力・wgpu合成のどれかが要るなら、これらはupstreamに無いのでgpui-ceが実質唯一の選択肢になる。逆に、コンポーネントが揃った状態でデスクトップアプリを早く作りたいだけなら[[gpui-kit|GPUI Kit]]の方が実績もコンポーネント数も上。両者は参照するGPUIの再配布元が違うため型として混ざらないので、最初にどちらかを選ぶ必要がある(詳細は[[gpui-kit]]の「系統は混ぜられない」節)。

## 出典

- [gpui-ce/gpui-ce - GitHub](https://github.com/gpui-ce/gpui-ce) — `crates/gpui/src/styled.rs`、`style_transitions.rs`、`elements/surface.rs`、`platform.rs`、`color.rs`、`crates/gpui_elements/src/editable_text.rs`、`docs/releasing.md`
- [gpui-ce - crates.io](https://crates.io/crates/gpui-ce)
- [gpui-ce/gpui-ce README の FAQ](https://github.com/gpui-ce/gpui-ce/blob/main/README.md) — フォークの目的
- [gpui-ce/gpui-component - GitHub](https://github.com/gpui-ce/gpui-component)
- [Feature flag to use gpui-ce · longbridge/gpui-component Discussion #1856](https://github.com/longbridge/gpui-component/discussions/1856)
- [Use gpui-unofficial · longbridge/gpui-kit Issue #2234](https://github.com/longbridge/gpui-kit/issues/2234) — Closed as not planned
- [gpui_ce_components - crates.io](https://crates.io/crates/gpui_ce_components)
- [gpui_ce_elements - crates.io](https://crates.io/crates/gpui_ce_elements)
- [zed-industries/zed - GitHub](https://github.com/zed-industries/zed) — 比較対象としての本流
