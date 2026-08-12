---
created: 2026-08-12 20:47
updated: 2026-08-12 20:47
---
# HTTP/3

輸送層に[[quic|QUIC]]を使う版のHTTP。TCPの代わりにUDPベースのQUICを使うことで、HTTP/2までTCP由来で残っていたHead-of-lineブロッキング問題(1つのストリームのパケットロストが同一コネクション上の他の全ストリームを止めてしまう問題)を解消する。IETFにより2022年6月に**RFC 9114**として標準化された。 #protocol #web

## HTTP/2との関係

- メソッド・ステータスコード・ヘッダーといったHTTPセマンティクス自体はHTTP/2・HTTP/1.1と同じ
- 各ストリーム上でHTTP/2に似たバイナリフレーミングを使う
- リクエスト/レスポンスヘッダーはHTTP/2同様に圧縮される(ただしQUICのストリーム順不同配送に対応するため、圧縮アルゴリズム自体はQPACKに変更されている)
- HTTP/2の機能の一部はQUIC自体に吸収され、残りはQUICの上に実装される、という形で再構成されている

## 出典

- [RFC 9114: HTTP/3](https://www.rfc-editor.org/rfc/rfc9114.html)
- [HTTP/2 vs HTTP/3: A look at key differences and similarities - Ably](https://ably.com/topic/http-2-vs-http-3)
