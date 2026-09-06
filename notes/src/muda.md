---
created: 2026-09-06 23:14
updated: 2026-09-06 23:14
---
# muda

#rust #gui

「Menu Utilities for Desktop Applications」。[[tauri|Tauri]]チームが作っているRustのメニュークレートで、同じチームの`tray-icon`([[system-tray|システムトレイ]]用)と対になる。macOS/Windows/Linux・BSDのそれぞれで**OSネイティブのメニューを作る**のが方針。バージョンは0.19.3(2026年6月)、crates.ioのダウンロードは累計3,286万・recent 1,335万と、Tauriの土台としてよく使われている。

対応プラットフォームは Windows / macOS / Linux・BSD (GTK 3) / Linux・BSD (GTK 4)。GTK3とGTK4はcargo featureで排他的に選ぶ(`gtk`が既定、`gtk4`を使うときは`default-features = false`が要る)。

## メニューの「取り付け方」がプラットフォームごとに違う

`Menu`を組み立てるところまでは共通だが、それをどこに繋ぐかのAPIが分かれている。

| プラットフォーム | アプリのメニュー | コンテキストメニュー |
| --- | --- | --- |
| macOS | `Menu::init_for_nsapp()` | `show_context_menu_for_nsview()` |
| Windows | `unsafe Menu::init_for_hwnd(hwnd)` | `show_context_menu_for_hwnd()` |
| Linux/BSD | `Menu::init_for_gtk_window(window, container)` | `show_context_menu_for_gtk_window()` |

macOSは画面上部のメニューバー、Windowsはウィンドウ内のメニューバー(HMENU)、Linuxは指定したGTKコンテナの中、と出る場所も違う。`init_for_hwnd`にはテーマを指定できる`init_for_hwnd_with_theme()`もある。

[[gpui|GPUI]]がmacOSでしかOSメニューを作らず、Windows/Linuxではアプリ側に自前描画を任せている([[gpui-kit-cross-platform-menu|GPUI Kitでのクロスプラットフォームなメニュー]])のとは対照的な設計。3プラットフォームともOSに任せる代わりに、呼び出し側がプラットフォーム分岐を書く。

## アクセラレータ

`"CmdOrCtrl+Space"`のような文字列をパースして`Accelerator`にする。`CmdOrCtrl`はmacOSでは⌘、それ以外ではCtrlに解決される。

Windowsには固有の落とし穴があり、**win32のメッセージループが`TranslateAcceleratorW`を呼ばないとショートカットが効かない**。`Menu::haccel()`でHACCELを取れるので、自前のイベントループを持つ場合はそこに組み込む必要がある。

## PredefinedMenuItem

OSが役割を知っている標準項目を`PredefinedMenuItem`として用意している。ラベル文字列は`Option<&str>`で上書きでき、`None`ならOS既定の(ローカライズされた)ラベルになる。

- 編集系: `copy` / `cut` / `paste` / `paste_and_match_style` / `delete` / `select_all` / `undo` / `redo`
- ウィンドウ系: `minimize` / `maximize` / `zoom` / `fullscreen` / `hide` / `hide_others` / `show_all` / `close_window` / `bring_all_to_front`
- 表示系: `actual_size` / `zoom_in` / `zoom_out`
- アプリ系: `about(text, metadata)` / `services` / `quit` / `separator`
- macOS固有: `start_speaking` / `stop_speaking` / `start_dictation` / `emoji_and_symbols`

`paste_and_match_style`や`start_speaking`のようにmacOSにしか対応物が無いものも含まれており、他のプラットフォームでは無効になる。

## Linuxの依存

GTK3バックエンドの`copy`/`cut`/`paste`/`select_all`は、`libxdo`(xdotool)を使ってキーストロークを合成することで実現している。そのため既定featureの`libxdo`が有効だと`libxdo`へのリンクが必要になる。GTK4バックエンドはこれを使わない。

```sh
# Debian/Ubuntu, GTK 3
sudo apt install libgtk-3-dev libxdo-dev
# Debian/Ubuntu, GTK 4
sudo apt install libgtk-4-dev
```

## 出典

- [tauri-apps/muda - GitHub](https://github.com/tauri-apps/muda) — README、`src/menu.rs`、`src/items/predefined.rs`、`src/accelerator/`、CHANGELOG
- [muda - crates.io](https://crates.io/crates/muda)
- [muda - docs.rs](https://docs.rs/muda/latest/muda/)
