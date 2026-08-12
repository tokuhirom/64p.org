---
created: 2026-08-12 20:43
updated: 2026-08-12 20:43
---
# WebTransport

HTTP/3(QUIC)上に構築された、ブラウザとサーバー間の低遅延双方向通信API。[[websocket|WebSocket]]の後継候補として設計されている。仕様はIETF WEBTRANS Working GroupとW3Cが共同で策定しており、W3C仕様はGoogle・Mozilla・Appleのエディタが名を連ねる。2026年時点でW3C Working Draft、HTTP/3マッピングのIETFドラフトはWorking Group Last Callの段階。 #protocol #web

## WebSocketとの違い

- **輸送層**: WebSocketはTCP上、WebTransportはQUIC(UDPベース)上のHTTP/3を使う
- **Head-of-lineブロッキング**: TCPではストリーム単位の分離ができず、1つのデータ欠落が他の通信もブロックする。QUICはストリームを多重化できるため、この問題が起きない
- **ネットワーク切り替え**: QUICは接続をIPアドレスでなく接続IDで識別するため、Wi-Fi⇔モバイル回線の切り替えでも接続を継続できる
- **信頼性の選択**: WebSocketは常に信頼性のある配信のみだが、WebTransportは信頼性あり/なしを通信方式ごとに選べる

## 3つの通信方式

- **データグラム**: 信頼性・順序保証なし。ゲームの状態更新やセンサーデータなど、最新の値だけ届けばよい用途向け
- **単方向ストリーム**: 信頼性・順序保証あり、片方向のみ。ファイル送信やライブ配信向け
- **双方向ストリーム**: 信頼性・順序保証あり、双方向。チャットやリアルタイム共同編集向け

## ブラウザ対応

Chrome/Edgeは2022年頃(Chrome 97, Edge 98)から対応、Firefoxは114から対応。Safariは2026年3月リリースのSafari 26.4で対応し、主要ブラウザが出揃った。

## 出典

- [WebTransport API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebTransport_API)
- [WebTransport over HTTP/3 - IETF Datatracker](https://datatracker.ietf.org/doc/draft-ietf-webtrans-http3/)
- [Can I use: WebTransport](https://caniuse.com/webtransport)
