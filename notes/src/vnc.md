---
created: 2026-08-11 07:38
updated: 2026-08-11 07:38
---
# VNC

Virtual Network Computing。[[rfb]]プロトコルを使い、ネットワーク越しに別のコンピュータのデスクトップを遠隔操作するためのクロスプラットフォームなリモートデスクトップ技術。

## 仕組み

- クライアント・サーバーモデルで動作。制御される側のマシンに**VNC Server**、操作する側に**VNC Viewer（Client）**をインストールする。
- サーバーは自身のデスクトップ画面（フレームバッファ）を取得し、更新差分をビューアに送信。ビューアはそれを表示し、キーボード・マウス入力をサーバーへ送り返す。
- OSに依存しないプロトコルのため、異なるプラットフォーム間（例：LinuxサーバーをWindowsから操作）でも通信できる。
- デフォルトのポート番号は5900（ディスプレイ番号が0の場合。ディスプレイ番号Nに対して5900+Nを使う慣習がある）。

## 歴史

- 1990年代半ば、英ケンブリッジのOlivetti Research Laboratory（ORL）で発明された。1999年にAT&Tがラボを買収し、AT&T Laboratories Cambridgeとなる。
- 主要な発明者はTristan Richardson（RFBプロトコルの設計・リファレンス実装）で、Andy Harterがプロジェクトを主導、Quentin Stafford-Fraser、James Weatherall、Andy Hopperらが関わった。
- オリジナル実装はGPLでオープンソース公開された。
- 2002年4月にAT&Tがケンブリッジ研究所を閉鎖した後、RichardsonやHarterらがRealVNC社を設立し、商用版の開発を継続。
- オープンなプロトコル仕様のため、TightVNC（低速回線向け圧縮強化）、UltraVNC（Windows向け、ファイル転送等の機能追加）、TigerVNC（Unix/Linux向けの高性能フォーク、2009年にTightVNCから分岐）など、多数の互換実装が派生した。

## 出典

- [Virtual Network Computing - Wikipedia（日本語）](https://ja.wikipedia.org/wiki/Virtual_Network_Computing)
- [VNCとは？リモートアクセス技術について知っておくべきすべて - RealVNC](https://www.realvnc.com/ja/blog/vnc%E3%81%A8%E3%81%AF%EF%BC%9F%E3%83%AA%E3%83%A2%E3%83%BC%E3%83%88%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9%E6%8A%80%E8%A1%93%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6%E7%9F%A5%E3%81%A3%E3%81%A6%E3%81%8A/)
- [TCP Port VNC: 5900, 5901, 5902, and the Display-Number Pattern](https://www.runxbuild.com/blog/tcp-port-vnc/)
- [TigerVNC - GitHub](https://github.com/TigerVNC/tigervnc)

#protocol #remote-desktop
