---
created: 2026-08-19 12:48
updated: 2026-08-19 12:48
---
# CertStream

複数の[[certificate-transparency|Certificate Transparency]]ログを集約し、新規発行されたSSL/TLS証明書をWebSocket/SSE経由でリアルタイム配信するサービス。もとはCali Dog Security社がElixirで開発した`certstream-server`が起点で、現在はRustで再実装された`certstream-server-rust`が公開されている。 #security #pki

## 仕組み

- ChromeおよびAppleが信頼する全てのCTログを対象に、RFC 6962の従来型`get-entries`プロトコルと、新しいstatic-CT-API(checkpoint + tileベース)の両方を単一バイナリで同時に監視する。
- 同じ証明書が複数のCTログに重複投稿されることがあるため、SHA-256によるフィルタでデデュープし、クライアントには重複のないストリームを届ける。
- 各メッセージには証明書のドメイン名(CN/SAN)・発行者情報・有効期間などのメタデータが含まれる。
- WebSocketとServer-Sent Eventsの両方をサポートし、同一データを異なる転送方式で配信する。

## 用途

新規発行された証明書を能動的にポーリングせずリアルタイムで受け取れるため、フィッシングサイトの早期検知やC2インフラの検知など、「証明書が発行された瞬間」に反応したいセキュリティ監視のビルディングブロックとして使われる。[[crtsh|crt.sh]]がクエリ型の検索であるのに対し、CertStreamは常時接続のプッシュ型フィードという違いがある。

## [[ct-monitoring-tools|CTログ監視・検索ツール]]の中での位置づけ

新規発行を能動的にプッシュ配信する「プッシュ型」ツール。過去分も含めて遡って調べたい場合は[[crtsh|crt.sh]]のような「検索型」ツールを使う。

## 出典

- [Certstream Server Rust - Real-Time Certificate Transparency Log Streaming](https://certstream.dev/)
- [Introducing CertStream - Cali Dog Security](https://medium.com/cali-dog-security/introducing-certstream-3fc13bb98067)
