---
created: 2026-08-09 16:15
updated: 2026-08-27 08:11
---
# Electron

ChromiumとNode.jsを組み合わせて、Web技術(JavaScript/HTML/CSS)だけでクロスプラットフォームのデスクトップアプリを作れるフレームワーク。 #electron #javascript

## 概要

- GitHub: [electron/electron](https://github.com/electron/electron) — 約122.4kスター、17.4kフォーク
- ライセンス: MIT([[openjs-foundation|OpenJS Foundation]]傘下のプロジェクト)
- 対応OS: macOS(Ventura+, Intel/Apple Silicon)、Windows(10+, x64/arm64)、Linux(x64/arm64)

## アーキテクチャ

Node.jsとChromiumを1バイナリに同梱し、Webアプリと同じ書き方でOSのネイティブ機能(ファイルシステム、メニュー、通知など)にアクセスできるようにする設計。[[tauri]]や[[wails]]がOSネイティブWebViewを使うのとは対照的に、レンダリングエンジン自体を丸ごと同梱するため、バイナリサイズ・メモリ使用量は大きくなる。

## 沿革

- 2013年、GitHubのエンジニア Cheng Zhao が、エディタAtomをクロスプラットフォームで作るために開発(当初の名前は"Atom Shell")
- 2014年5月、AtomおよびAtom ShellがMITライセンスでオープンソース化
- 2015年4月、"Atom Shell"から**Electron**に改称

## 著名な採用アプリ

Visual Studio Code、Slack、GitKraken、WebTorrentなど(初期採用者を含む)。フロントエンドをElectron、バックエンドをRustで書く構成の例として[[openscreen]]がある。

## 位置づけ

デスクトップアプリをWeb技術で作る「元祖」的存在で、エコシステム・実績が最も豊富。一方でバイナリサイズやメモリ使用量の大きさが、[[tauri]]・[[wails]]など軽量な後発フレームワークが生まれる動機になっている。

## 出典

- [GitHub - electron/electron](https://github.com/electron/electron)
- [10 years of Electron - Electron Blog](https://www.electronjs.org/blog/10-years-of-electron)
- [Electron (software framework) - Wikipedia](https://en.wikipedia.org/wiki/Electron_(software_framework))
