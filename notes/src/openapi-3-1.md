---
created: 2026-08-15 16:22
updated: 2026-08-15 16:22
---
# OpenAPI 3.1

2021年2月にリリースされた[[openapi|OpenAPI]]仕様のマイナーバージョン。中心的な目的はJSON Schemaとの完全互換性の実現で、公式ブログでも「OpenAPIのJSON Schema関連構造とJSON Schema自体のズレは長年、利用者・実装者双方にとっての課題だった」と説明されている。

## JSON Schema Draft 2020-12への完全準拠

3.0のSchema ObjectはJSON Schema Draft 5の「サブセット」でしかなく、完全互換ではなかった。3.1ではSchema ObjectがJSON Schema Draft 2020-12ボキャブラリーに100%準拠するようになった。あわせてトップレベルフィールド`jsonSchemaDialect`が新設され、文書内のSchema Objectが従うデフォルトの`$schema`値を宣言できるようになった。

## semverからの意図的な逸脱

OAS Technical Steering Committee (TSC) は、JSON Schema 2020-12との整合とOpenAPI 3.0からの学びの反映を優先し、破壊的変更を意図的にマイナーバージョン(3.0→3.1)へ含めるという判断を下した。つまり3.1は「マイナーバージョンは後方互換であるべき」というセマンティックバージョニングの慣習から意図的に逸脱している。

## 主な変更点

- **webhooks** — トップレベルフィールドとして新設。帯域外(out-of-band)で登録されるWebhookをOpenAPI Object内で正式に記述できるようになった。3.0にはネイティブな手段がなく、callbacksの転用や仕様外での文書化で代替していた
- **nullable廃止** — 3.0.3の独自拡張だった`nullable`キーワードが廃止され、JSON Schema標準のunion型表現に統一された
- **$refと兄弟キーワードの共存** — 3.0.3では`$ref`が`description`や`example`など兄弟キーワードと共存できなかったが、JSON Schemaの挙動に合わせてこの制約が撤廃された
- **examples(複数形)** — OpenAPI独自の単数形`example`キーワードに加え、JSON Schema標準の複数形`examples`キーワードが使えるようになった
- **再利用可能なPath Items** — Components Objectに`pathItems`が追加され、Path Item Objectをコンポーネントとして再利用できるようになった
- **ライセンスのSPDX識別子表記** — APIライセンスをSPDX識別子で表記可能に

## 採用状況

Atlassian・Microsoft・Googleなど大手が採用。[[swagger-ui-editor|Swagger UI/Editor]]も3.1をサポートしている。

## [[openapi|OpenAPI]]の中での位置づけ

[[openapi|OpenAPI]]のバージョン変遷における一段階。次のメジャーバージョンに向けた検討は[[openapi-moonwalk|OpenAPI Moonwalk]]を参照。

#openapi #json-schema

## 出典

- [OpenAPI Specification 3.1.0 Released - OpenAPI Initiative](https://www.openapis.org/blog/2021/02/18/openapi-specification-3-1-released)
- [What's new in OpenAPI 3.1.0? - Beeceptor](https://beeceptor.com/docs/concepts/openapi-what-is-new-3.1.0/)
- [Upgrading from OpenAPI 3.0 to 3.1 - learn.openapis.org](https://learn.openapis.org/upgrading/v3.0-to-v3.1.html)
- [Swagger Supports OpenAPI 3.1](https://swagger.io/blog/swagger-supports-openapi-3-1/)
