---
created: 2026-08-18 13:29
updated: 2026-09-01 23:23
---
# Omarchy

[Ruby on Rails](https://rubyonrails.org/)の作者であり[37signals](https://37signals.com/)/Basecampの創業者でもあるDHH（David Heinemeier Hansson）が開発している、[Arch Linux](https://archlinux.org/)ベースのopinionatedなLinuxディストリビューション。[[hyprland|Hyprland]]（Wayland上で動くタイリングウィンドウマネージャー）を採用し、開発者向けのデスクトップ環境をあらかじめ一式構築済みの状態で提供する。GitHubは[omacom/omarchy](https://github.com/omacom/omarchy)（当初は`basecamp/omarchy`だったが、後述のOmacom Foundation設立に伴い`omacom` organizationへ移された）、MITライセンス。公式サイトは[omarchy.org](https://omarchy.org/)。

## コンセプト

素のArch Linuxを何時間もかけて自分好みに設定する代わりに、単一のインストーラーコマンドで「フルに設定済みのモダンな開発者デスクトップ」を即座に手に入れることを目指すディストリビューション。DHHが以前作成したUbuntuベースの同種プロジェクト[[omakub|Omakub]]のArch Linux版という位置づけ。

「*美しいシステムはやる気を起こさせるシステムである*（a beautiful system is a motivating system）」という設計哲学を掲げ、実用性だけでなく見た目の美しさも重視している。

## 主な特徴

- **ベース**: Arch Linux + [[hyprland|Hyprland]]（Waylandコンポジタ）。
- **キーボード中心の操作**: マウスなしでも完結する操作設計。`Super + Space`でアプリランチャーが開き、主要アプリにはホットキーが割り当て済み。
- **標準搭載ツール**: Alacritty（ターミナル）、Neovim、tmux、Chromium、Spotify、Typora、LibreOffice、Zoomなど、開発者がすぐ使える一通りのアプリが同梱される。
- **セキュリティ**: フルディスク暗号化（LUKS）が必須、ファイアウォールがデフォルトで有効。
- **その他**: テーマ切り替え、スクリーンショット・画面録画機能、Windows VMサポートなどが用意されている。

## Omarchy 4 "Quattro"（2026年8月14日）

プロジェクト開始以来最大のリリースとされる。ISOイメージで配布され、サイズは6GB未満（前バージョンから1GB以上削減）、インストール速度も30%以上向上している。8月25日に修正版の4.0.1がリリースされた（後述）。

### Quickshellによるデスクトップシェルの統合

バー・ランチャー・メニュー・通知・OSD・コントロールパネル・ロック画面・polkitエージェントを、[[quickshell|Quickshell]]ベースの単一の常駐プロセスに統合し、プラグインアーキテクチャとIPCでスクリプタブルにした。これに伴い、Waybar・Walker・Mako・SwayOSD・hyprlock・hypridle・swaybg・polkit-gnomeという8つの独立プログラムが構成から取り除かれている。`omarchy plugin clone`でビルトインウィジェットを複製してカスタマイズできる。

### コーディングエージェントを一級市民として扱う

Quattroの方向性を最も特徴づけているのがこの点で、AIコーディングエージェントをOSの構成要素として組み込んでいる。

- Claude Code・Codex・OpenCode・Gemini CLI・GitHub Copilot CLI・Crush・Grokなど9種のエージェントがプリワイヤードされ、システム全体のデフォルトを一度選ぶ形になっている。
- トップバーにエージェントのステータスパネルがあり、セッション上限・週次レート制限の消費率が表示される。
- クラッシュ時のcoredumpをそのままエージェントに渡して診断させる導線がある。
- ベースパッケージに[[herdr]]（複数エージェントの状態をペインごとに追跡するRust製ターミナルマルチプレクサ）が同梱され、従来のtmuxと併存する形になった。

## Omacom Foundation

2026年8月21日、DHHがOmarchyとその周辺エコシステムを支えるための非営利団体Omacom Foundationを設立した。Founding Patron 8名（Tobi Lütke、Patrick Collison、Michael Dell、Jack Dorsey、Matthew Prince、Brendan Iribe、Jason Fried、DHH）による$8Mでスタートし、8月24日にDrew Houston（Dropbox）とPeter Steinbergerの各$1M追加で$10M、8月31日には1Password・37signalsのコーポレートパトロン参加などを含め14件のパトロン契約・計$12.6Mに達している。

特徴的なのは、資金がOmarchy本体だけでなく上流プロジェクトへ流れている点で、[[hyprland|Hyprland]]の独占スポンサー、[[quickshell|Quickshell]]のスポンサー、[mise](https://mise.jdx.dev/)のプレミアムスポンサーに就いている。個人のdotfiles的プロジェクトから、Linuxデスクトップのエコシステムに資金を配分する組織へと性質が変わりつつある。

このほか、Core Teamの設立、プラグインコンテスト、Rangersプログラム、AIRレジデンシー、世界各地でのミートアップなど、コミュニティ運営の枠組みが8月中に一斉に立ち上がっている。Quattroリリース後1週間で10万ダウンロードを記録した。

## セキュリティ面の割り切り

強めのデフォルトを持つ一方、ブートチェーンについては割り切りがある。

- LUKSによるフルディスク暗号化が必須、deny-by-defaultのファイアウォール、SSHはデフォルト無効、sudoのFIDO2対応と、デフォルト設定は堅い。
- 一方で**[[uefi|Secure Boot]]と[[tpm|TPM]]をBIOSで無効化することがインストールの前提条件**になっており、オプションではない。ブートチェーンの信頼が確立できないため「secure distributionとは言えない」という指摘がある（有志によるSecure Boot有効化手順は出回っている）。また標準のsystemd-cryptsetupのフローに乗っていない。
- 4.0.0には複数のコード実行に関わる問題があり、11日後の4.0.1で修正された。プロジェクトとしてのセキュリティプロセス自体がまだ新しい。
- ローリングリリースであるため、更新に伴う破壊的変更は前提となる。

## [[manjaro]]との違い

同じくArch Linuxベースだが方向性は異なる。[[manjaro|Manjaro]]は「Archを万人向けに使いやすくする」ことを狙った複数デスクトップ環境対応の総合ディストリビューションで、独自にステージング済みのリポジトリを持つ。一方Omarchyはopinionatedな単一構成で、[[hyprland|Hyprland]]中心の開発者向けデスクトップを単一のインストーラーで即座に構築することに特化している。

## 出典

- [Omarchy公式サイト](https://omarchy.org/)
- [omacom/omarchy - GitHub](https://github.com/omacom/omarchy)
- [Omarchy Manual](https://learn.omacom.io/2/the-omarchy-manual)
- [Security — The Omarchy Manual](https://omarchy.org/manual/security/)
- [Omarchy is out - DHH](https://world.hey.com/dhh/omarchy-is-out-4666dd31)
- [Omacom Foundation funding hits $10m - Omarchy News](https://omarchy.org/news/2026/08/omacom-foundation-funding-hits-10m/)
- [1Password and 37signals become Distinguished Corporate Patrons - Omarchy News](https://omarchy.org/news/2026/08/1password-and-37signals-become-distinguished-corporate-patrons/)
- [Omarchy 4 Quattro: What's New in DHH's Agentic Linux Desktop - Code To Cloud](https://codetocloud.io/blog/omarchy-4-quattro-whats-new/)
- [Omarchy 4 Makes the Linux Desktop Feel Like a Product, Finally - DevOps Daily](https://devops-daily.com/posts/omarchy-4-quattro-developer-workstation)
- [Omarchy distro gains serious backing - The Register](https://www.theregister.com/os-platforms/2026/08/27/omarchy-distro-gains-serious-backing/5293026)

#linux #arch-linux #hyprland #wayland #dotfiles #ai-agent
