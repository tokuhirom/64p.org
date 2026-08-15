---
created: 2026-08-15 16:18
updated: 2026-08-15 16:18
---
# OpenAPI

RESTful APIをHTTP越しに記述するための言語非依存なインターフェース仕様。正式名称は OpenAPI Specification (OAS)。人間にもマシンにも読める形式(YAML/JSON)でエンドポイント・リクエスト/レスポンス形式・認証方式などを定義し、ドキュメント生成・クライアントSDK生成・モックサーバー・[[spectral|リンティング]]など様々なツールの入力として使われる。

## Swaggerからの経緯

2011年、Wordnikの辞書チームがSwagger Toolkit（Swagger Specification・[[swagger-ui-editor|Swagger UI]]・Swagger Codegen）を作成した。Swagger 2.0が2014年にリリースされ広く普及。

2015年、SmartBearがSwagger 2.0仕様をLinux Foundation傘下の新設団体「OpenAPI Initiative (OAI)」に寄贈し、2016年1月1日に仕様名が正式に"OpenAPI Specification"へ改称され、新しいGitHubリポジトリへ移動した。OAIにはSmartBear・Google・IBM・Microsoft・PayPal・SAP・Salesforceなどが名を連ねる、ベンダー中立なオープンガバナンス組織。

現在の用語整理としては、「Swagger」はSmartBearが提供するツール群（[[swagger-ui-editor|Swagger UI/Editor]]など）を指す通称として残り、「OpenAPI」が仕様そのものを指す。

## バージョン変遷

- **2.0 (Swagger, 2014)** — OAI移管前の最終形。今も"Swagger"の名で呼ばれることが多い
- **3.0 (2017)** — OpenAPI Initiative発足後、最初のメジャーバージョン
- **3.1 (2021)** — schemaがJSON Schema Draft 2020-12に完全準拠。3.0のschemaはJSON Schema Draft 5の「サブセット」に過ぎず完全互換ではなかった。主な変更点:
  - `webhooks`フィールドが新設され、アウトバウンド（サーバー→クライアント）イベントを正式に記述可能に。3.0にはネイティブな手段がなく、callbacksの転用や仕様外文書化で代替していた
  - `nullable`キーワード（3.0.3では独自拡張）が廃止され、JSON Schema標準のunion型表現に置き換わった
  - `$ref`が3.0.3では`description`や`example`などの兄弟キーワードと共存できなかったが、3.1.0ではJSON Schemaの挙動に合わせてこの制約が撤廃された
- **3.2.0 (2025年9月)** — hierarchical tags、QUERYメソッド、ストリーミングAPIのネイティブサポートを追加

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
