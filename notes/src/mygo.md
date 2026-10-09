---
created: 2026-10-09 03:13
updated: 2026-10-09 03:13
---
# MyGo

#go #gui #typescript #mygo

egoistによる、Goで書くデスクトップアプリ用フレームワーク（`github.com/egoist/mygo`、MIT）。ウィンドウごとに「OS標準WebViewでWebページを表示」か「Goだけで書いてGPU描画するネイティブUI」を選べて、1アプリ内で混在もできる。公式サイトのキャッチは "Tiny, fast, fully typed."。調査時点（2026年10月）の公式サイト記載バージョンは v0.3.5。

[[wails]]と同じ「Goバックエンド + OS標準WebView + 型付きバインディング」の系統だが、**cgoを使わない純Go**であることと、**WebViewを使わないネイティブUIも持つ**ことが目立つ違い。

## 特徴

- **純Go（cgoなし）** — どのマシンからも全プラットフォーム向けにクロスビルドできる。
- **Webフロントエンド** — macOSはWKWebView、LinuxはWebKitGTK、WindowsはWebView2。ブラウザは同梱しない。フロントエンドは任意のWebツールで作る。
- **ネイティブUI** — `ui`パッケージでGoだけでUIを組む。Flexbox/Gridレイアウト、IME対応テキスト編集、仮想化リスト、スクリーンリーダー対応など。HTML/JS/WebViewなし。
- **型付きIPC** — Goの構造体メソッドを`mygo.Bind`で公開し、`mygo generate`がTypeScriptクライアントを生成する。引数・戻り値はJSON、エラーを返すとJS側のPromiseがreject、第1引数の`context.Context`はページ遷移やウィンドウcloseで自動キャンセルされる。`mygo.Channel[T]`で値のストリーミング、`NewEvent[T]`で型付きイベント（`Emit`/`Broadcast`）。
- **デスクトップAPI** — ウィンドウ、メニュー、トレイ、ダイアログ、通知、グローバルショートカット、ディープリンク、ファイル関連付け。
- **配布まわり** — アプリバンドル、ディスクイメージ、Windowsインストーラー、Debianパッケージ、コード署名、公証、署名付き自動更新（差分更新含む）。
- 公式サイト掲載値（自己申告）: バイナリ約7MB、メモリはネイティブUIで約44MB・WebView込みで約62MB、アイドルCPU 0%。

最小例（READMEより）:

```go
type Greeter struct{}

func (Greeter) Greet(name string) string { return "Hello, " + name }

func main() {
	mygo.Bind(Greeter{})
	mygo.App.WhenReady(func() {
		mygo.NewWindow(mygo.WindowOptions{Title: "Hello", URL: "/"})
	})
	if err := mygo.App.Run(); err != nil {
		log.Fatal(err)
	}
}
```

```ts
import { Greeter } from "./mygo"; // 生成されたクライアント
document.body.textContent = await Greeter.greet("Ada");
```

開発は`mygo dev`、本番ビルドは`mygo build`。Webフロントエンドの場合はGo 1.27以上とBunが必要で、ネイティブUIならGoだけで足りる（`go tool mygo dev`）。

## スレッドモデル

AppKit/GTK/Win32はメインスレッドからしか触れないため、MyGoは初期化中にメインゴルーチンをメインスレッドに固定する。`App.Run`は`main()`から呼ぶ必要がある。他のAPIは任意のゴルーチンから呼べ、メインスレッド以外からの呼び出しは転送されて結果を待つ。`OnClose`などのリスナーはメインスレッド上で動くので短く保つ。

## Wailsとの違い

公式サイト・READMEにはWailsとの比較記述はない。以下は各公式ドキュメントの記載を並べた整理（比較の評価ではなく事実の対比）。

| 観点 | MyGo | [[wails]]（v3） |
| --- | --- | --- |
| cgo | 不要。全OS向けにどのマシンからもビルドできる | WindowsはcgoなしでクロスビルドできるがmacOS/LinuxはWebView統合にcgoが必要。クロスビルドにはDocker等が要る |
| UI | WebView または Go製ネイティブUI（混在可） | WebView（OSネイティブ） |
| バインディング | `mygo.Bind` + `mygo generate`でTSクライアント生成 | サービスをバインドしTSバインディング生成 |
| ビルド/CLI | `mygo dev`/`mygo build`、フロントエンドのscaffoldはBun前提 | `wails3`コマンド、Taskfileベースのビルド |
| 成熟度 | v0.3.5（0.x） | v2が安定版、v3はベータ |
| 配布機能 | バンドル・インストーラー・署名・公証・差分自動更新を含む | コード署名・パッケージングツールあり |

Wails v3のMyGo同様の特徴として、複数ウィンドウ、メニュー・トレイ・ダイアログなどのデスクトップAPI、TypeScriptバインディング生成がある。実際に両方でアプリを作って比較したわけではなく、ここは公式記載ベース。

## 関連

- [[go-gui-libraries]] — Go GUIライブラリ一覧の中ではWebView型（Wails）とGPU描画型（Gio/Fyne）の両方の性格を併せ持つ位置づけ
- [[tauri]] — 同じくOS標準WebViewを使う。バックエンドはRust

## 出典

- [MyGo 公式サイト](https://mygo.egoist.dev)
- [egoist/mygo - GitHub](https://github.com/egoist/mygo)
- [github.com/egoist/mygo - pkg.go.dev](https://pkg.go.dev/github.com/egoist/mygo)
- [Cross-Platform Building - Wails v3](https://v3.wails.io/guides/build/cross-platform)
- [What's New in Wails v3 Alpha](https://v3alpha.wails.io/whats-new/)
- [Wails v3 Beta is here](https://newreleases.io/project/github/wailsapp/wails/release/v3.0.0-beta.0)
