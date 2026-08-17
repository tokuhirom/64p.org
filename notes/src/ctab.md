---
created: 2026-08-15 20:34
updated: 2026-08-17 10:42
---
# cTab

macOS向けのウィンドウスイッチャーアプリ。[petitviolet](https://github.com/petitviolet)さんが開発。リポジトリは[petitviolet/cTab](https://github.com/petitviolet/cTab)、Swift製・MITライセンス。

標準のCommand+Tabは「アプリ単位」の切り替えしかできない。cTabはこれを「ウィンドウ単位」の切り替えに拡張する。既存のウィンドウスイッチャー([[alttab|AltTab]]など)への不満から自作したとのこと。

## 機能

- Command+Tabでスイッチャー起動、ウィンドウのサムネイルをグリッド表示(ScreenCaptureKitでプレビュー取得・キャッシュ)
- Tab/Shift+Tab、矢印キー(←→↑↓)、マウスクリックでウィンドウ選択
- インクリメンタル検索でウィンドウを絞り込み
- 選択中ウィンドウに対してCommand+W(閉じる)/Command+Q(アプリ終了)/Command+M(最小化)を直接実行可能

## インストール

Homebrewから(推奨):

```sh
brew install --cask --no-quarantine petitviolet/tap/ctab
```

または[Releases](https://github.com/petitviolet/cTab/releases)から`.zip`をダウンロードして`cTab.app`を`~/Applications`に配置。初回起動時にアクセシビリティ権限・画面収録権限の許可が必要。

Apple Developer Programに未加入のため「野良アプリ」扱いで、`--no-quarantine`フラグが必要になっている。

必要環境: macOS 14以降、Swift 6ツールチェーン。

## 開発の発端

petitvioletさんのブログ記事「[cTab: Mac ウィンドウスイッチャー](https://petitviolet.hatenablog.com/entry/20260726/1785046348)」で開発経緯が語られている。Claude(AI)の支援を受けて開発したと言及されている。

## [[macos-menu-bar-utilities|macOSメニューバー常駐ユーティリティ]]の中での位置づけ

[[alttab|AltTab]]と同じくウィンドウ単位の切り替えを実現するツール。メニューバーに常駐してキー操作をフックする点が[[macos-menu-bar-utilities|同カテゴリ]]の他ツールと共通する。

#macos #swift #claude
