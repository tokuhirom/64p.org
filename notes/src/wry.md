---
created: 2026-08-14 13:58
updated: 2026-08-14 13:58
---
# wry

#rust

[[tauri|Tauri]]プログラム(The Commons Conservancy傘下)が開発している、クロスプラットフォームのWebViewレンダリングライブラリ。各OSのネイティブWebエンジンをラップし、統一的なRust APIでWebViewの生成・操作(JS実行、IPC等)を行えるようにする。

## 対応プラットフォームとバックエンド

| OS | 使用するWebエンジン |
| --- | --- |
| Windows | WebView2(Edge Chromiumベース) |
| macOS/iOS | WKWebView(WebKit) |
| Linux | WebKitGTK(X11/Wayland) |
| Android | 対応あり |

ElectronのようにWebエンジン自体をバンドルせず、OSに標準で入っているWebViewを利用する設計のため、アプリのバイナリサイズが小さく済む。

## 使い方

WebViewの表示にはウィンドウとイベントループが必要で、`HasWindowHandle`を実装したウィンドウ型が要る。公式には`tao`(`winit`のフォーク)との組み合わせが推奨されている。`os-webview`(デフォルト)、`protocol`(カスタムURLスキーム)、`file-drop`などのfeatureフラグで機能を切り替えられる。

## Tauriとの関係

wryは[[tauri|Tauri]]の中核コンポーネントで、TauriアプリのWebView描画を担う(ウィンドウ管理は姉妹プロジェクトの`tao`が担当)。Tauriから独立した単体クレートとしても利用可能で、[[gpui-wry]]のようにTauri以外のフレームワークからWebView機能を取り込む用途にも使われている。

## 出典

- [wry - crates.io](https://crates.io/crates/wry)
- [wry - lib.rs](https://lib.rs/crates/wry)
- [tauri-apps/wry - GitHub](https://github.com/tauri-apps/wry)
