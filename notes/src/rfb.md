---
created: 2026-08-11 07:38
updated: 2026-08-12 20:41
---
# RFB（Remote Framebuffer）プロトコル

[[vnc]]の基盤となる通信プロトコル。ウィンドウシステムをフレームバッファ（画面描画データ）のレベルで扱うため、X11・Windows・Macintoshなど、あらゆるウィンドウシステムに適用できる。

## アーキテクチャ

- ユーザーが操作する側（表示・入力する側）を**RFBクライアント（Viewer）**、フレームバッファの変更元となる側を**RFBサーバー**と呼ぶ。
- クライアントはTCPポート5900でサーバーに接続する。1台に複数のRFBサーバーが立つ場合、N番目は5900+Nのポートで待ち受けるのが慣習。

## 設計思想

- 「シンクライアント」プロトコルとして設計されており、クライアント側に要求する処理を極力少なくすることに重点を置く。これにより、幅広いハードウェア上でクライアントを動作させられ、クライアント実装の難易度も低く抑えられる。
- 画面更新は、Raw・CopyRect・RRE・Hextile・ZRLE・Tightなど複数のエンコーディング方式から選択でき、回線状況に応じて圧縮効率と処理負荷のトレードオフを調整できる。

## 標準化

- 発明者はTristan Richardson（VNCの考案者と同一人物）。
- 2011年、IETFにより**RFC 6143**としてプロトコルバージョン3.8が標準化された。

## ブラウザ・JavaScriptでの実装

ブラウザは通常のVNC接続で使われる生のTCPソケットを直接扱えないため、[[novnc]]は[[websocket|WebSocket]]を介してRFBプロトコルをやり取りする。

## 出典

- [RFC 6143: The Remote Framebuffer Protocol | RFC Editor](https://www.rfc-editor.org/info/rfc6143/)
- [RFC 6143 - The Remote Framebuffer Protocol 日本語訳](https://tex2e.github.io/rfc-translater/html/rfc6143.html)
- [RFB (protocol) - Wikipedia](https://en.wikipedia.org/wiki/RFB_(protocol))

#protocol #remote-desktop
