---
created: 2026-08-17 18:23
updated: 2026-08-17 18:23
---
# Proton

Valveが開発する、Windows向けソフトウェア(主にゲーム)をLinux上で動かすための互換レイヤー。2018-08-21に初版がリリースされた。CodeWeavers社との協力のもと、Wineをベースにいくつかのライブラリを組み合わせて構成されている。

## 構成コンポーネント

- **Wine** — Windows APIコールをその場でPOSIX互換の呼び出しに変換する互換レイヤー。Protonの基盤。
- **DXVK** — Direct3D 9/10/11をVulkanに変換するレイヤー。Philip RebohleとJoshua Ashtonが開発し、両者ともValveに雇用されてProton開発に従事している。
- **VKD3D-Proton** — Direct3D 12をVulkanに変換するレイヤー。Józef Kuciaが元プロジェクトを立ち上げ、Hans-Kristian Arntzenらが開発を継続。ValveはこれをフォークしてProtonの全ビルドに同梱している。
- **FAudio** — Microsoft XAudio2の再実装。

## Steam Playとの関係

Protonはユーザー向けにはSteamクライアントに統合された**Steam Play**機能として配布されている。バージョン番号は基となるWineのバージョンを参照し、パッチ番号が付加される形式(例: 11.0-1)。2020年12月には継続的ベータ版の**Proton Experimental**が登場し、新機能をより早く取り込めるようになった。

## Steam Deck/SteamOSでの位置づけ

SteamOS・Steam DeckでのWindowsゲーム互換性を支える中核技術。

## GE-ProtonとProtonDB

- 公式Protonに未マージのパッチを先行して取り込むコミュニティフォーク**GE-Proton**が存在し、[[lutris|Lutris]]など公式Steam以外のランチャーで広く使われている。
- コミュニティ主導の**ProtonDB**サイトでは、Windowsゲームごとの動作互換性が「Borked」〜「Platinum」のスケールで集約・共有されている。

## [[lutris|Lutris]]での利用

[[lutris|Lutris]]は2026年、GE-Protonを**UMU(umu-launcher)**経由で起動する方式をデフォルトにし、GE-Protonを常に最新の状態に保てるようにした。

## 出典

- [Proton (software) - Wikipedia](https://en.wikipedia.org/wiki/Proton_(software))
- [GitHub - ValveSoftware/Proton](https://github.com/ValveSoftware/Proton)
- [Proton 11 is a huge win for Linux gaming - NERDS.xyz](https://nerds.xyz/2026/07/proton-11-linux-gaming-ea-games-fixes/)

#linux #gaming
