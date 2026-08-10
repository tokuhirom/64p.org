---
created: 2026-08-11 07:38
updated: 2026-08-11 07:38
---
# noVNC

HTML5（JavaScript・Canvas API・WebSocket）で実装された、ブラウザ上で動く[[rfb]]クライアント。専用のVNCクライアントアプリなしに、ブラウザだけで[[vnc]]サーバーへ接続できる。

## 構成

- 中核は「Core VNC/RFB」コンポーネントで、RFBプロトコルの状態機械（ステートマシン）をすべて内包している。
- 画面描画にはHTML5 Canvasを使う。
- ブラウザは生のTCPソケットを直接扱えないため、WebSocketを介してRFBプロトコルをやり取りする。サーバー側のVNCが素のTCPしか話さない場合は、**websockify**（WebSocket⇔TCPのプロキシ／ブリッジ）を挟んでnoVNCと接続する構成が一般的（VNCサーバー自体がWebSocketに対応していれば不要）。

## 採用例

OpenStack、Docker、Proxmox、DigitalOceanなど多くの製品でブラウザ上のリモートコンソール機能として採用されている。スマートフォン・タブレットからのアクセスにも対応する。

## 出典

- [noVNCでブラウザからリモートデスクトップ！VNCクライアント不要の便利ツール完全ガイド](https://www.choge-blog.com/programming/novncbrowser-remotedesktop/)
- [HTML5 Case Study: Building the noVNC Client with WebSockets, Canvas and JavaScript - InfoQ](https://www.infoq.com/news/2010/07/html5-novnc/)
- [自宅サーバのデスクトップへブラウザからアクセスできるように「noVNC」を設える - Qiita](https://qiita.com/knaka/items/b61e0cb0b5d07d2527b2)

#protocol #remote-desktop #javascript
