---
created: 2026-08-18 13:29
updated: 2026-08-19 15:16
---
# Omarchy

[Ruby on Rails](https://rubyonrails.org/)の作者であり[37signals](https://37signals.com/)/Basecampの創業者でもあるDHH（David Heinemeier Hansson）が開発している、[Arch Linux](https://archlinux.org/)ベースのopinionatedなLinuxディストリビューション。[Hyprland](https://hyprland.org/)（Wayland上で動くタイリングウィンドウマネージャー）を採用し、開発者向けのデスクトップ環境をあらかじめ一式構築済みの状態で提供する。GitHubは[basecamp/omarchy](https://github.com/basecamp/omarchy)、MITライセンス。公式サイトは[omarchy.org](https://omarchy.org/)。

## コンセプト

素のArch Linuxを何時間もかけて自分好みに設定する代わりに、単一のインストーラーコマンドで「フルに設定済みのモダンな開発者デスクトップ」を即座に手に入れることを目指すディストリビューション。DHHが以前作成したUbuntuベースの同種プロジェクト[Omakub](https://omakub.org/)のArch Linux版という位置づけ。

「*美しいシステムはやる気を起こさせるシステムである*（a beautiful system is a motivating system）」という設計哲学を掲げ、実用性だけでなく見た目の美しさも重視している。

## 主な特徴

- **ベース**: Arch Linux + Hyprland（Waylandコンポジタ）。
- **キーボード中心の操作**: マウスなしでも完結する操作設計。`Super + Space`でアプリランチャーが開き、主要アプリにはホットキーが割り当て済み。
- **標準搭載ツール**: Alacritty（ターミナル）、Neovim、tmux、Chromium、Spotify、Typora、LibreOffice、Zoomなど、開発者がすぐ使える一通りのアプリが同梱される。
- **セキュリティ**: フルディスク暗号化（LUKS）が必須、ファイアウォールがデフォルトで有効。
- **その他**: テーマ切り替え、スクリーンショット・画面録画機能、Windows VMサポートなどが用意されている。
- 最新版はOmarchy Quattro（v4.0.0、ISOイメージで配布）。

## [[manjaro]]との違い

同じくArch Linuxベースだが方向性は異なる。[[manjaro|Manjaro]]は「Archを万人向けに使いやすくする」ことを狙った複数デスクトップ環境対応の総合ディストリビューションで、独自にステージング済みのリポジトリを持つ。一方Omarchyはopinionatedな単一構成で、Hyprland中心の開発者向けデスクトップを単一のインストーラーで即座に構築することに特化している。

## 出典

- [Omarchy公式サイト](https://omarchy.org/)
- [basecamp/omarchy - GitHub](https://github.com/basecamp/omarchy)
- [Omarchy Manual](https://learn.omacom.io/2/the-omarchy-manual)
- [Omarchy is out - DHH](https://world.hey.com/dhh/omarchy-is-out-4666dd31)

#linux #arch-linux #hyprland #wayland #dotfiles
