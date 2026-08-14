---
created: 2026-08-09 16:14
updated: 2026-08-14 13:58
---
# Tauri

Rustバックエンドとネイティブ(OS標準)WebViewを組み合わせてクロスプラットフォームのデスクトップ／モバイルアプリを作れるフレームワーク。 #rust #tauri

## 概要

- GitHub: [tauri-apps/tauri](https://github.com/tauri-apps/tauri) — 約110,000スター、3,900フォーク
- 運営: Tauri Programme（Commons Conservancy傘下、持続的なOSSコミュニティとして運営）
- ライセンス: MIT / Apache-2.0 デュアル
- 対応OS: Windows 7+、macOS 10.15+、Linux、iOS/iPadOS 9+、Android 7+

## アーキテクチャ

- **[[wry|WRY]]**: プラットフォームごとのWebView(macOS/iOS: WKWebView、Windows: WebView2、Linux: WebKitGTK)を抽象化するライブラリ
- **TAO**: `winit`をフォークしたウィンドウ管理ライブラリ(メニューバー・システムトレイ機能を追加)
- Rustコアと WebView間はメッセージパッシングで通信する設計

## セキュリティモデル

WebViewはデフォルトでOS機能に一切アクセスできず、`capabilities`/`permissions`という明示的な許可リストを与える設計になっている。[[wails]]など類似ツールとの比較でもこの点がよく特徴として挙げられる。

## 沿革・バージョン

- 2022年6月: v1.0リリース
- 2024年2月: v2 Beta(iOS/Androidのモバイル対応が追加)
- 2024年10月2日: v2 安定版リリース。単一のRust+JSコードベースでデスクトップ・モバイル5プラットフォームを統合
- 2026年8月時点で2.11系(2.11.5が2026-07-01リリース)

## 類似ツールとの比較

[[electron|Electron]]がフル Chromium を同梱するのに対し、TauriはOSネイティブWebViewを使うことでバイナリサイズを大幅に削減する(READMEでは「Electronより95%小さいバイナリ」と謳う)。バックエンドをGoで書く[[wails]]とは、OSネイティブWebViewを使うという設計思想は共通しつつ、Rust製である点と上記capabilitiesによるセキュリティモデルが異なる。

## 出典

- [GitHub - tauri-apps/tauri](https://github.com/tauri-apps/tauri)
- [Tauri Architecture](https://v2.tauri.app/concept/architecture/)
- [Tauri 2.0 Stable Release](https://v2.tauri.app/blog/tauri-20/)
- [Tauri (software framework) - Wikipedia](https://en.wikipedia.org/wiki/Tauri_(software_framework))
