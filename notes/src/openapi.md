---
created: 2026-08-15 16:18
updated: 2026-08-15 16:22
---
# OpenAPI

RESTful APIをHTTP越しに記述するための言語非依存なインターフェース仕様。正式名称は OpenAPI Specification (OAS)。人間にもマシンにも読める形式(YAML/JSON)でエンドポイント・リクエスト/レスポンス形式・認証方式などを定義し、ドキュメント生成・クライアントSDK生成・モックサーバー・[[spectral|リンティング]]など様々なツールの入力として使われる。

## Swaggerからの経緯

2011年、Wordnikの辞書チームがSwagger Toolkit（Swagger Specification・[[swagger-ui-editor|Swagger UI]]・Swagger Codegen）を作成した。Swagger 2.0が2014年にリリースされ広く普及。

2015年、SmartBearがSwagger 2.0仕様をLinux Foundation傘下の新設団体「OpenAPI Initiative (OAI)」に寄贈し、2016年1月1日に仕様名が正式に"OpenAPI Specification"へ改称され、新しいGitHubリポジトリへ移動した。OAIにはSmartBear・Google・IBM・Microsoft・PayPal・SAP・Salesforceなどが名を連ねる、ベンダー中立なオープンガバナンス組織。

現在の用語整理としては、「Swagger」はSmartBearが提供するツール群（[[swagger-ui-editor|Swagger UI/Editor]]など）を指す通称として残り、「OpenAPI」が仕様そのものを指す。詳しくは[[swagger|Swagger]]参照。

## バージョン変遷

- **2.0 (Swagger, 2014)** — OAI移管前の最終形。今も"Swagger"の名で呼ばれることが多い
- **3.0 (2017)** — OpenAPI Initiative発足後、最初のメジャーバージョン
- **[[openapi-3-1|3.1]] (2021)** — schemaがJSON Schema Draft 2020-12に完全準拠。webhooks新設など、TSCが意図的にsemverの慣習を破った変更を含む。詳細は[[openapi-3-1|OpenAPI 3.1]]参照
- **3.2.0 (2025年9月)** — hierarchical tags、QUERYメソッド、ストリーミングAPIのネイティブサポートを追加

次期メジャーバージョン(通称OpenAPI 4.0)の検討は[[openapi-moonwalk|OpenAPI Moonwalk]]という取り組みで進行中。

## 契約ファーストとの関係

[[grpc|gRPC]]が`.proto`による契約ファースト(スキーマを先に定義してからコード生成)なのに対し、REST + OpenAPIはエンドポイントを実装してから後付けでスキーマを書く流れになることが多い。ただしOpenAPI定義を先に書いて[[openapi-generator|openapi-generator]]でスタブコードを生成する契約ファーストな運用も可能。

## エコシステム

Spectralによるリンティング、Redocly CLIによるlint/bundle、Swagger UI/Editorによる可視化、openapi-generatorによるコード生成、oasdiffによる破壊的変更検出、Prismによるモックサーバーなど、周辺ツール群は[[openapi-tooling|OpenAPI関連ツールエコシステム]]にまとめた。

#openapi #api #json-schema

## 出典

- [OpenAPI vs Swagger: What's the Difference? - Postman Blog](https://blog.postman.com/openapi-vs-swagger/)
- [Swagger (software) - Wikipedia](https://en.wikipedia.org/wiki/Swagger_(software))
- [What's new in OpenAPI 3.1.0? - Beeceptor](https://beeceptor.com/docs/concepts/openapi-what-is-new-3.1.0/)
- [OpenAPI Specification - swagger.io](https://swagger.io/specification/)
- [OpenAPI 3.2 History - Bump.sh](https://docs.bump.sh/openapi/v3.2/introduction/history/)
