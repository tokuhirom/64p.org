---
created: 2026-09-01 23:23
updated: 2026-09-01 23:23
---
# Quickshell

QtQuick（QML）でデスクトップシェルを組み立てるためのツールキット。バー・ウィジェット・ランチャー・ロック画面・通知・OSDといった「デスクトップ環境のガワ」を、モノリシックなDEの一部としてではなくQMLで宣言的に記述して自分で組み立てる。Wayland/X11の両対応。ライセンスはLGPL-3.0 / GPL-3.0のデュアル。公式リポジトリは[git.outfoxxed.me/quickshell/quickshell](https://git.outfoxxed.me/quickshell/quickshell)で、GitHubの[quickshell-mirror/quickshell](https://github.com/quickshell-mirror/quickshell)はミラー。本体はC++、ユーザーが書く設定はQML。

## 何を提供するのか

- **QMLホスト** — UI・振る舞い・システム連携をすべてQMLで宣言的に書く。個別のツールを設定ファイルで寄せ集めるのではなく、1つの言語・1つのプロセスの中で完結する。
- **ホットリロード** — QMLを保存すると即座に反映され、シェルを組む試行錯誤のサイクルが速い。
- **システム連携の組み込み** — NetworkManagerとのD-Bus通信、PipeWire（オーディオミキサー）、StatusNotifierItemによるシステムトレイ、`ext-session-lock-v1`（ロック画面）、`ext-idle-notify-v1`（アイドルタイマー）といったWaylandプロトコルを直接扱えるコンポーネント群が用意されている。[[hyprland|Hyprland]]やi3のIPCとの連携も含む。

## 位置づけ

[[cosmic-desktop|COSMIC]]のように「コンポジタからアプリまで一式」を提供する統合デスクトップ環境とは逆方向で、コンポジタは[[hyprland|Hyprland]]などに任せ、シェル部分だけを自作させるレイヤーに徹する。従来この領域はWaybar（バー）・Walker（ランチャー）・Mako（通知）・swaylock（ロック）…と用途別の独立ツールを寄せ集めるのが一般的だったが、Quickshellはそれらを単一のフレームワーク上で一貫して書けるようにする。

## [[omarchy|Omarchy]]での採用

[[omarchy|Omarchy]] 4 "Quattro"（2026年8月）がデスクトップシェル全体をQuickshellで書き直し、Waybar・Walker・Mako・SwayOSD・hyprlock・hypridle・swaybg・polkit-gnomeの8プログラムを単一の常駐プロセスに統合した。Omacom FoundationはQuickshellのスポンサーにもなっている。

## 出典

- [Quickshell公式サイト](https://quickshell.org/)
- [quickshell-mirror/quickshell - GitHub](https://github.com/quickshell-mirror/quickshell)
- [Quickshell Takes Over, Don't Be Like Me - Zack Bartel](https://zackbartel.com/blog/2026/07/quickshell/)
- [Quickshell Tutorial - Build Your Own Bar](https://tonybtw.com/tutorial/quickshell/)

#linux #wayland #qt #qml #hyprland
