---
created: 2026-08-17 10:50
updated: 2026-08-17 10:53
---
# Hammerspoon

macOSのシステム機能をLuaスクリプトから操作できるデスクトップ自動化ツール。[Hammerspoon/hammerspoon](https://github.com/Hammerspoon/hammerspoon)としてGitHubで公開されているフリー・オープンソースソフトウェア。「a set of extensions that expose specific pieces of system functionality」という位置づけで、macOSの低レベルAPIをLuaのextensionとして束ねている。

## 機能

- ウィンドウ・マウスポインタ・アプリケーションの操作(移動・リサイズ・位置スナップなど)
- システム全体で有効なホットキー・カスタムキーボードショートカットの登録
- ファイルシステム、オーディオデバイス、バッテリー、ディスプレイ解像度の制御
- キーボード/マウスイベントの監視、クリップボード操作、位置情報、Wi-Fi管理
- USBデバイスの抜き差しやスクリーンのスリープ/復帰などシステムイベントへの反応

## 使い方

`~/.hammerspoon/init.lua`にLuaスクリプトを書いて設定する。HammerspoonのAPIと標準Luaの機能を組み合わせ、「イベント→アクション」の対応付けを自由に記述できる。設定ファイルを直接編集する形式のため、GUIでの設定を主とする[[ice-menu-bar-manager|Ice]]や[[meetingbar|MeetingBar]]とは性質が異なる。

## [[karabiner-elements|Karabiner-Elements]]との違い

Karabiner-Elementsがキーボードのキー配列そのものを低レベルでリマップする専門ツールであるのに対し、Hammerspoonはウィンドウ管理・システムイベント対応・任意のスクリプト実行までを含む汎用の自動化エンジンである。両者を組み合わせて使う例(Karabiner-Elementsでキー入力をカスタムイベントに変換し、Hammerspoonでそれを受けてアクションを実行する、など)もよく見られる。

## Karabiner-Elementsの単機能ルールの置き換え先としても使える

Karabiner-Elementsの複雑な修正ルールの中には、Hammerspoon単体で代替できるものがある。例えば「コマンドキー単体押しで英数/かなキーを送信する(左右で送信するキーを分ける)」という定番ルールは、`hs.eventtap`で`flagsChanged`イベントを監視し、他のキーを併用せずにCommandキーが押されて離されたことを検知した上で、英数(keycode 102)/かな(keycode 104)のキーイベントをpostする、という実装で再現できる([mac-ra.comの記事](https://mac-ra.com/post-965/)、[zennの記事](https://zenn.dev/ytk6565/articles/hammerspoon-switch-input-source)などで実装例が紹介されている)。Karabiner-Elementsの利用がこの1ルールだけになっているような場合、Hammerspoonに一本化する余地がある。

#macos #automation #lua
