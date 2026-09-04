---
created: 2026-08-14 13:58
updated: 2026-09-04 18:06
---
# gpui-wry

#rust

[[wry]]をベースに、[[gpui|GPUI]]アプリの中にWebViewを埋め込むためのブリッジcrate。[[gpui-kit|GPUI Kit]]リポジトリ(旧名`longbridge/gpui-component`)の`crates/webview`として、huacnleeが開発している。ライセンスはApache-2.0。

## API

`WebView`(wryベースのWebView実装本体)と`WebViewElement`(それをGPUIのUIツリーに配置するための要素)という2つの主要な型で構成される。

## 制約

- まだ実験的段階で機能は限定的
- **対応プラットフォームはmacOSとWindowsのみ**([[gpui|GPUI]]自体はLinuxにも対応しているが、gpui-wryはLinux非対応)
- WebViewはGPUIウィンドウの最上部にオーバーレイ表示され、背後にあるGPUI要素を覆い隠してしまう。この制約を避けるため、別ウィンドウまたはPopupレイヤーでの使用が推奨されている

## 実行例

リポジトリルートから`cargo run -p webview`でサンプルを実行できる。

## 出典

- [gpui_wry - docs.rs](https://docs.rs/gpui-wry/latest/gpui_wry/)
- [longbridge/gpui-kit/crates/webview - GitHub](https://github.com/longbridge/gpui-kit/tree/main/crates/webview)
