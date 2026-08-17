---
created: 2026-08-17 18:22
updated: 2026-08-17 18:22
---
# Lutris

Linux向けのゲームランチャー/ライブラリマネージャー。Wine・Proton・DOSBox・ScummVM・各種エミュレータなど複数のランナーを切り替えて、WindowsゲームやレトロゲームをLinux上で実行できる。Battle.net・EA・GOG・Epicなど各種ストアとの統合機能も持つ。

## Proton統合

- **Proton**はValveが開発する、SteamでWindowsゲームをLinux上で動かすための互換レイヤー。Wineをベースに、DXVK(Direct3D→Vulkan変換)やVKD3D-Proton(Direct3D 12→Vulkan変換)などを同梱している。
- **GE-Proton**は`GloriousEggroll`氏によるコミュニティフォーク。Valve公式のProtonにまだ入っていないパッチ(DXVK/VKD3D-Proton/FAudioの更新版など)を先行して取り込んでおり、2026年時点でLutrisにおけるWindowsゲーム実行の推奨選択肢になっている。

## UMU(umu-launcher)経由での起動(Lutris 0.5.20〜)

- **UMU-Launcher**は"Unified Launcher for Windows Games on Linux"の略称。Valveの Proton や protonfixesプロジェクトをSteamクライアント外でも使えるようにする統一ランチャーで、Lutris・Heroic Games Launcher・Bottles・Rareなど複数のクライアントから共通のやり方でProtonを起動し、Wineプレフィックスを設定できるようにする目的で作られた。必要なSteam Runtimeを自動でダウンロードし、`$HOME/.local/share/umu`に配置する。
- **Lutris 0.5.20**(2026年)で、GE-ProtonをこのUMU経由で起動する方式がデフォルトになった。狙いはGE-Protonを常に最新の状態に保つこと。
- 併せて、VKD3D・D3D Extras・DXVK-NVAPIの処理をProton側に委譲し、Esync/Fsync/DXVKの設定をProtonへ渡すなど、Proton統合まわりの内部処理も整理された。
- 同バージョンでは、Protonとは別系統の変更として、WineランナーにもWaylandドライバを選択できるオプションが追加されている。

## 出典

- [Lutris 0.5.20 Linux Game Manager Brings New Features, Wine Wayland Option - Phoronix](https://www.phoronix.com/news/Lutris-0.5.20-Released)
- [GitHub - Open-Wine-Components/umu-launcher](https://github.com/Open-Wine-Components/umu-launcher)
- [Game manager Lutris v0.5.20 released with Proton upgrades - GamingOnLinux](https://www.gamingonlinux.com/2026/02/game-manager-lutris-v0-5-20-released-with-proton-upgrades-store-updates-and-much-more/)
- [Lutris v0.5.20 sets Proton-GE via umu by default - AlternativeTo](https://alternativeto.net/news/2026/2/lutris-v0-5-20-sets-proton-ge-via-umu-by-default-adds-new-sources)
- [Which UMU should I install to get Proton? - Lutris Forums](https://forums.lutris.net/t/which-umu-should-i-install-to-get-proton/22255)

#linux #gaming
