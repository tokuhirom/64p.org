---
created: 2026-08-17 10:50
updated: 2026-08-17 10:50
---
# Karabiner-Elements

macOS向けのキーボードカスタマイズツール。[pqrs-org/Karabiner-Elements](https://github.com/pqrs-org/Karabiner-Elements)としてGitHubで公開されているフリー・オープンソースソフトウェア。Intel Mac・Apple Silicon Macの両方に対応し、Homebrewでは`brew install --cask karabiner-elements`でインストールできる。

## 機能

- **Simple Modifications** — 特定のキーを別のキーに単純変更(例: Caps LockをControlに変更)
- **Complex Modifications** — 修飾キーの組み合わせを含む複雑なルールでキーを変更(例: Control+Mをreturnに変更)
- ファンクションキー(F1〜F12)をメディアコントロールキーとして扱う変更
- 特定のキーボードデバイスにのみ変更を適用する指定機能
- 複数プロファイルの切り替えに対応
- メニューバーアイコンの表示有無を設定可能

## 設定方法

GUIの「Karabiner Elements Viewer」による設定と、カスタムJSONルールによる設定の2通りが用意されている。前者は初心者向けの直感的な操作、後者は複雑な条件分岐を含むルールを書きたい場合に使う。

## [[hammerspoon|Hammerspoon]]との違い

Karabiner-Elementsはキーボードのキー配列そのものを低レベルでリマップする専門ツールという位置づけ。ウィンドウ管理やシステムイベント対応まで含む汎用自動化エンジンの[[hammerspoon|Hammerspoon]]とは役割が異なる。

#macos
