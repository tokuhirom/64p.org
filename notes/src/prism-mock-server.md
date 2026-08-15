---
created: 2026-08-15 16:18
updated: 2026-08-15 16:18
---
# Prism (モックサーバー)

Stoplightが開発するOSS。[[openapi|OpenAPI]] v2/v3(v3.1含む)やPostman CollectionからHTTPモックサーバーを生成する。

`-d`フラグでFaker.jsを用いた、スキーマに準拠したランダムなダミーレスポンスを生成できる。単なるモックだけでなく、リクエスト/レスポンスのバリデーションや、実サーバーの手前に立ててレスポンスを検証するValidation Proxyとしても使える。

[[spectral|Spectral]]と同じStoplightエコシステムの一部で、SmartBearによるStoplight買収(2023年8月)後はSwaggerHubへの統合対象になっている。

#openapi #mocking #devtools

## 出典

- [GitHub: stoplightio/prism](https://github.com/stoplightio/prism)
- [Prism - Stoplight](https://stoplight.io/open-source/prism)
