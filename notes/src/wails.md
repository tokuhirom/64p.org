---
created: 2026-08-09
updated: 2026-08-09
---
# Wails

#go #typescript #wails

Go言語のバックエンドとWeb技術(HTML/CSS/JS、React/Vue/Svelteなど)のフロントエンドを組み合わせてクロスプラットフォームのデスクトップアプリを作れるフレームワーク。MITライセンスのOSSで、GitHub Stars約35.7k。対応OSはWindows/macOS/Linux。[[sakpilot]]もWails v2で作られている。

## アーキテクチャ

Electronがフルの Chromium を同梱するのに対し、Wailsは OS のネイティブ WebView(macOSならWebKit、WindowsならWebView2、LinuxならWebKitGTK)を利用してUIを描画する。そのためアプリのバンドルサイズやメモリ使用量が大幅に小さく済む(公式ドキュメントの目安は~15MB、RAM~10MB、起動0.5秒未満)。GoとJS間のバインディングは自動生成され、Goの関数をJS側から直接呼び出せる。

## 類似ツールとの違い

- **Electron**: フルのChromiumを同梱する成熟したエコシステム。バイナリサイズは大きいがドキュメント・実績が豊富。
- **Tauri**: WailsとほぼおなじくOSネイティブWebViewを使うアーキテクチャだが、バックエンドはRust。WebViewはデフォルトでネイティブ機能に一切アクセスできず、明示的な許可(capabilities)を与える設計でセキュリティ面で一歩進んでいる。
- **Wails**: Goでバックエンドを書きたい開発者にとって、Tauriに近い軽量さのメリットを享受できる選択肢という位置づけ。

## バージョン状況

v2が安定版(stable)として広く使われており、v3は現在ベータ版で開発中。6,600以上のコミットで活発に開発が続いている。

## 出典

- [wailsapp/wails - GitHub](https://github.com/wailsapp/wails)
- [Wails: Build Lightweight Desktop Apps with Golang and Web Tech](https://www.stork.ai/blog/gos-secret-weapon-for-desktop-apps)
- [Desktop Apps from Web: Tauri vs Electron vs Deno 2026](https://www.digitalapplied.com/blog/desktop-apps-web-stack-tauri-electron-deno-wails-2026)
- [Why Wails Wins at IPC for Go Desktop Apps - Medium](https://medium.com/@tacherasasi/why-wails-wins-at-ipc-for-go-desktop-apps-and-how-it-stacks-up-against-tauri-electron-5a00b202cf09)
