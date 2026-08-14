---
created: 2026-08-14 15:35
updated: 2026-08-14 15:35
---
# OWASP API Security Top 10

[[owasp|OWASP]]が公開する、API特有のセキュリティリスクを10個にランキングしたドキュメント。[[owasp-top-10|OWASP Top 10]]（Webアプリ全般向け）とは別立てのプロジェクトで、2019年に初版が出た後2023年に改訂された。

APIはWebアプリのUI層を経由せず直接ロジック・データにアクセスされる分、認可まわり（誰がどのオブジェクト・機能にアクセスできるか）の不備が上位を占める傾向がある。

## Top 10:2023

1. **API1:2023 Broken Object Level Authorization** — [[bola|BOLA]]。オブジェクトIDに対する認可チェックの不備。
2. **API2:2023 Broken Authentication** — 認証機構の実装不備。
3. **API3:2023 Broken Object Property Level Authorization** — オブジェクト単位ではなく、そのプロパティ（フィールド）単位での認可不備。
4. **API4:2023 Unrestricted Resource Consumption** — レート制限・リソース上限の欠如によるDoSやコスト増大。
5. **API5:2023 Broken Function Level Authorization** — 管理者専用機能など、関数・エンドポイント単位での認可不備。
6. **API6:2023 Unrestricted Access to Sensitive Business Flows** — 購入・予約など特定のビジネスフローが、自動化されたボット等から乱用可能な状態。
7. **API7:2023 Server Side Request Forgery** — [[ssrf|SSRF]]。APIがユーザー指定URLを検証せずフェッチしてしまう不備。
8. **API8:2023 Security Misconfiguration** — 不適切なデフォルト設定や不要な機能の露出。
9. **API9:2023 Improper Inventory Management** — 廃止版・デバッグ用など管理外になったAPIエンドポイントの放置。
10. **API10:2023 Unsafe Consumption of APIs** — 自身が呼び出す外部APIのレスポンスを無条件に信頼してしまう不備。

## 関連

- [[owasp|OWASP]] — 発行元のハブノート
- [[owasp-top-10|OWASP Top 10]] — Webアプリ全般向けの姉妹プロジェクト
- [[bola|BOLA]]（API1:2023）、[[ssrf|SSRF]]（API7:2023）— このリストに掲載される個別の脆弱性カテゴリ

## 出典

- [OWASP API Security Project | OWASP Foundation](https://owasp.org/www-project-api-security/)
- [Introduction to OWASP API Security Top 10 2023 | DevCentral](https://community.f5.com/kb/technicalarticles/introduction-to-owasp-api-security-top-10-2023/312309)

#security #api
