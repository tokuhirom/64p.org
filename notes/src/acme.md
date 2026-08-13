---
created: 2026-08-14 08:33
updated: 2026-08-14 08:33
---
# ACME (Automatic Certificate Management Environment)

TLS証明書の取得・ドメイン所有権の検証・更新を、人手を介さず自動化するためのプロトコル。[[lets-encrypt|Let's Encrypt]]を実現するために開発され、2019年3月に**RFC 8555**としてIETF標準になった。 #protocol #security

## チャレンジ: ドメイン所有権の証明方法

CAがクライアントに「このドメインを本当に支配しているか」を証明させる仕組み。クライアントがチャレンジ種別を選び、証明となるデータを配置してからCAに検証を依頼する。

- **HTTP-01** — CAが `http://<ドメイン>/.well-known/acme-challenge/<トークン>` を取得して検証する。ポート80がインターネットから到達可能である必要がある。最も手軽だがワイルドカード証明書は取れない
- **DNS-01** — 指定されたTXTレコードをDNSに設定して検証する。ワイルドカード証明書に対応し、ポートを開ける必要がない。DNSプロバイダーのAPI連携が必要になる
- **TLS-ALPN-01** — ポート443のTLSハンドシェイク（ALPN拡張）だけで検証する。リバースプロキシがTLS終端している構成向け

## クライアント

certbot（EFF製、最も広く使われる）、acme.sh、legoなどの専用クライアントのほか、Caddyや[[traefik|Traefik]]のようにサーバー自体がACMEクライアントを内蔵していて、証明書の取得から更新までを完全に自動でやってくれるものもある。

## 出典

- [RFC 8555 - Automatic Certificate Management Environment (ACME)](https://datatracker.ietf.org/doc/html/rfc8555)
- [ACME Protocol Explained - EverTrust](https://evertrust.io/guide/acme-protocol/)
- [ACME Challenges Deep Dive: HTTP-01 vs DNS-01 vs TLS-ALPN-01 - NameSilo](https://www.namesilo.com/blog/en/domain-security/acme-challenges-deep-dive-http-01-vs-dns-01-vs-tls-alpn-01)
