---
created: 2026-09-01 23:23
updated: 2026-09-01 23:23
---
# Hyprland

Vaxryが開発する、C++で書かれた独立系のダイナミックタイリングWaylandコンポジタ。2022年に最初のリリース、BSD-3-Clauseライセンス、リポジトリは[hyprwm/Hyprland](https://github.com/hyprwm/Hyprland)。公式サイトは[hypr.land](https://hypr.land/)。

## 設計上の立ち位置

タイリングウィンドウマネージャは操作効率と引き換えに見た目が素っ気なくなりがちだが、Hyprlandはアニメーション・ブラー・角丸・グラデーションボーダー・シャドウといったeye candyを最初から一級の機能として持つ点を売りにしている（"a dynamic tiling Wayland compositor that doesn't sacrifice on its looks"）。

## 主な機能

- **ダイナミックタイリング** — dwindle / master / monocle など複数のレイアウト。0.54（2026年2月）以降はワークスペース単位・モニタ単位で別々のレイアウトを設定できる。
- フローティングウィンドウ、ウィンドウのグループ化（タブ化）、special workspace。
- **ソケットベースのIPC** — `hyprctl`から状態取得・制御ができ、外部のバーやスクリプトから叩ける。
- 設定ファイルのライブリロード。
- **プラグインAPI** — C++で書くプラグインと、そのプラグインマネージャ（hyprpm）。
- ゲーム向けのtearing対応、タッチパッドジェスチャ、IME/インプットパネル対応。

## wlrootsからの独立とAquamarine

当初はwlroots上に構築されていたが、0.42.0（2024年）でwlrootsを外し、自前のレンダリングバックエンドライブラリ[Aquamarine](https://github.com/hyprwm/aquamarine)へ移行した。wlrootsのミニマリスト志向な設計が、独自のレンダリングパイプラインやハードウェアアクセラレーションによるブラーといった機能と相性が悪かったことが理由とされる。現在は「100% independent, no wlroots, no libweston, no kwin, no mutter」を標榜している。

Aquamarineはwlrootsの代替を狙ったものではなく、KMS/DRMなど低レベルのレンダリング・入力バックエンドだけを実装する軽量ライブラリ。レンダリングAPI（Vulkan/OpenGL）には非依存で、C++専用（他言語バインディングなし）。Waylandプロトコル自体は引き続きサポートされるため、wlroots前提のツール類が動かなくなるわけではない。

## エコシステム

hypridle（アイドル検出）、hyprlock（ロック画面）、hyprpaper（壁紙）、hyprpicker（カラーピッカー）など、`hypr`接頭辞の周辺ツール群が同じhyprwm organizationで開発されている。ただし[[omarchy|Omarchy]] 4はこれらのうちhyprlock/hypridleを[[quickshell|Quickshell]]ベースの実装に置き換えている。

## リリース状況

0.55が2026年5月9日、0.56系の安定化リリースとして0.56.2が2026年8月5日にリリースされている。

## [[omarchy|Omarchy]]との関係

[[omarchy|Omarchy]]がデスクトップの中核コンポジタとしてHyprlandを採用しており、2026年8月にOmacom FoundationがHyprlandの独占スポンサーに就いた。

## 出典

- [Hyprland公式サイト](https://hypr.land/)
- [hyprwm/Hyprland - GitHub](https://github.com/hyprwm/Hyprland)
- [aquamarine - Hyprland Wiki](https://wiki.hypr.land/Hypr-Ecosystem/aquamarine/)
- [Hyprland is now fully independent!](https://hypr.land/news/independentHyprland/)
- [Hyprland 0.42 Wayland Compositor Ditches Wlroots, Adds Explicit Sync Support - Phoronix](https://www.phoronix.com/news/Hyprland-0.42-Wayland)
- [Hyprland - Wikipedia](https://en.wikipedia.org/wiki/Hyprland)
- [Hyprland 0.56.2 Released - LinuxCompatible](https://www.linuxcompatible.org/story/hyprland-0562-released-16-backported-fixes-stabilize-the-056-series/)

#linux #wayland #hyprland #cpp
