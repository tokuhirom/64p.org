---
created: 2026-08-09 16:05
updated: 2026-08-09 16:05
---
# Go GUI ライブラリ一覧

Go言語のGUIライブラリ・フレームワークをまとめておく。[[rust-gui-libraries|Rust版]]の対比として作成。Web技術を使うハイブリッド型は[[wails]]に個別ノートがあるのでそちらを参照。 #go #gui

## 比較表

| 名前 | 開発元 | スター数 | レンダリング方式 | 対応プラットフォーム | ライセンス |
| --- | --- | --- | --- | --- | --- |
| [Fyne](https://github.com/fyne-io/fyne) | fyne-io | 28.6k | Material Design風、独自レンダラー | Windows/macOS/Linux/BSD/Android/iOS | BSD-3-Clause |
| [Gio](https://github.com/gioui/gio) | Elias Naur / gioui | 2.2k(GitHubミラー) | GPUベースのimmediate mode | Android/iOS/macOS/Linux/FreeBSD/OpenBSD/Windows/Web(実験的) | 記載あり(詳細未確認) |
| [Giu](https://github.com/AllenDang/giu) | AllenDang | 2.8k | Dear ImGui(cimgui-go)ベースのimmediate mode | Windows/macOS/Linux/Raspberry Pi | MIT |
| [Walk](https://github.com/lxn/walk) | lxn | 7.1k | Windows API直接ラップ | Windows専用 | BSD-3-Clause |
| [gotk3](https://github.com/gotk3/gotk3) | gotk3 | 2.2k | GTK3バインディング | 主にLinux(GTK3が動く環境) | ISC |
| [[wails]] | wailsapp | 約35.7k | OSネイティブWebView(Web技術) | Windows/macOS/Linux | MIT |

※スター数は調査時点(2026年8月)のスナップショット。

## 各ライブラリの補足

### Fyne
Material Designに着想を得た独自レンダラーを持つツールキット。デスクトップとモバイルを単一コードベースでカバーし、GoのGUIライブラリの中では最もスター数が多く事実上のデファクトに近い。ビルドにはCコンパイラが必要。

### Gio
immediate mode設計でGPUベースのレンダリングを行う。開発は元々[Sourcehut](https://git.sr.ht/~eliasnaur/gio)上で行われており、GitHubはミラー。モバイル対応が手厚く、Android/iOSをネイティブにターゲットできる点が特徴。

### Giu
Dear ImGuiのGoバインディング(cimgui-go)上に構築されたimmediate mode GUI。実行ファイルサイズの小ささ(UPX圧縮後3MB以下)や低CPU使用率を売りにしている。

### Walk
"Windows Application Library Kit"の略。Windows API・WPF系の思想をベースにしたWindows専用ライブラリ。クロスプラットフォームではない点で他と用途が異なる。

### gotk3
GTK3の薄いバインディング。GoのGCとGObjectの参照カウントを橋渡しする設計。GNOME系デスクトップ環境に馴染むアプリを作る場合の選択肢。

### Wails
ネイティブGUIツールキットではなく、GoバックエンドとOSネイティブWebView(WebKit/WebView2/WebKitGTK)を組み合わせたハイブリッド型。詳細は[[wails]]を参照。

## 出典

- [Best GUI frameworks for Go - LogRocket Blog](https://blog.logrocket.com/best-gui-frameworks-go/)
- [go-graphics/go-gui-projects - GitHub](https://github.com/go-graphics/go-gui-projects)
- [fyne-io/fyne - GitHub](https://github.com/fyne-io/fyne)
- [gioui/gio - GitHub](https://github.com/gioui/gio)
- [AllenDang/giu - GitHub](https://github.com/AllenDang/giu)
- [lxn/walk - GitHub](https://github.com/lxn/walk)
- [gotk3/gotk3 - GitHub](https://github.com/gotk3/gotk3)
