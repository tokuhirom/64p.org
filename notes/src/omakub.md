---
created: 2026-09-01 23:23
updated: 2026-09-01 23:23
---
# Omakub

DHH（David Heinemeier Hansson）がUbuntu向けに作った「オマカセ」開発環境セットアップ。単一のコマンドで、素のUbuntu 24.04を設定済みのモダンなWeb開発環境に変える（"turn a fresh Ubuntu installation into a fully-configured, beautiful, and modern web development system"）。名前は**Omakase + Ubuntu**のかばん語。2024年6月公開。

## 中身と設計

GNOMEデスクトップをベースに、Neovim（エディタ）、Zellij（ターミナルマルチプレクサ）、テーマ、フォント、開発ツール類を一式インストール・設定する。ディストリビューションそのものを作るのではなく、**既存のUbuntuインストールの上に乗せるレイヤー**という構成だった。

「オマカセ」という名前は、Rails自体の設計思想（フレームワークが選択を代行するopinionatedなアプローチ）と地続きで、ユーザーに選択肢を並べるのではなく作者の好みを完成品として渡すことを指している。

## 現状：リタイア

プロジェクトはリタイアしており、GitHubの`omakub`および`omakub-site`リポジトリはアーカイブ済み。`omakub.org`は`omarchy.org/omakub`へリダイレクトされる。コミュニティフォークのOmabuntuが、Ubuntu上でのオマカセ路線を引き継いでいる。

## [[omarchy|Omarchy]]への発展

公式の総括は「開発者に美しく完成されたLinuxを最初から渡せば人は来る、というテーゼを証明した」というもの。その路線を、他人のディストリビューションの上に乗るレイヤーではなく**"the whole meal"（ディストリビューションそのもの）**として作り直したのが[[omarchy|Omarchy]]にあたる。

| | Omakub | [[omarchy|Omarchy]] |
| --- | --- | --- |
| ベース | Ubuntu 24.04 | Arch Linux |
| デスクトップ | GNOME | [[hyprland|Hyprland]] |
| 提供形態 | 既存インストールへ被せるレイヤー | ISOによる独立ディストリビューション |
| 状態 | アーカイブ済み | 活発に開発中 |

## 出典

- [The story of Omakub - omarchy.org](https://omarchy.org/omakub)
- [Introducing Omakub - DHH](https://world.hey.com/dhh/introducing-omakub-354db366)
- [Introduction to Omakub, a Curated Ubuntu Environment by DHH - The New Stack](https://thenewstack.io/introduction-to-omakub-a-curated-ubuntu-environment-by-dhh/)

#linux #ubuntu #dotfiles
