---
created: 2026-08-12 20:41
updated: 2026-08-12 20:43
---
# WebSocket

ブラウザとサーバー間で全二重（双方向）通信を実現するプロトコル。単一のTCPコネクション上で、HTTPのリクエスト/レスポンス方式と異なり、両側から任意のタイミングでメッセージを送受信できる。仕様は[RFC 6455](https://www.rfc-editor.org/rfc/rfc6455.html)で定義されている。 #protocol #web

## ハンドシェイク

最初はHTTPのGETリクエストとして開始する。クライアントは`Upgrade: websocket`ヘッダーとランダムな`Sec-WebSocket-Key`を送り、サーバーは`101 Switching Protocols`と、そのキーに固定GUIDを連結してSHA-1・Base64エンコードした`Sec-WebSocket-Accept`を返す。以後はHTTPではなくWebSocket独自のフレーム形式で通信する。80/443番ポートで動作しHTTPプロキシとの親和性を保てるよう設計されている。

## フレーム構造

- FINビット: メッセージの最終フラグメントかどうか
- Opcode(4bit): `0x1`=テキスト、`0x2`=バイナリ、`0x8`=クローズ、`0x9`=Ping、`0xA`=Pong
- MASKビット: クライアント→サーバー方向は必須。ペイロードをマスクすることでキャッシュポイズニング攻撃を防ぐ
- ペイロード長: 0〜125byteは直接、126なら16bit、127なら64bitで拡張長を表現

## Ping/Pongとクローズ

Ping(`0x9`)を受け取った側は同じペイロードでPong(`0xA`)を返し、接続の生存確認とレイテンシ計測に使う。切断時はどちらかがクローズフレーム(`0x8`、16bitのステータスコード付き)を送り、相手も応答クローズフレームを返してからTCP接続を閉じる（`1000`=正常終了など）。

## ユースケース

チャット、リアルタイム通知、共同編集ツール、ゲーム通信、株価配信など。将来的にはバックプレッシャー対応や非順序配信を持つ[[webtransport|WebTransport]](HTTP/3・QUICベース)が一部用途を置き換える見込み。

## 関連

- [[websockify]]はWebSocket⇔TCPのプロキシ／ブリッジ、[[novnc]]はWebSocket経由で[[rfb]]プロトコルを話すVNCクライアント。[[browser-raw-tcp-restriction|ブラウザが生のTCPソケットを直接扱えない]]制約への対処として、この構成が使われている。
- [[htmx]]はHTML属性からWebSocketを宣言的に扱う拡張を持つ。
- [[cro]]（Rakuのウェブフレームワーク）もWebSocketをサポートしている。

## 出典

- [RFC 6455: The WebSocket Protocol](https://www.rfc-editor.org/rfc/rfc6455.html)
- [WebSocket Protocol: RFC 6455 Handshake, Frames & More - WebSocket.org](https://websocket.org/guides/websocket-protocol/)
- [WebSocket API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
