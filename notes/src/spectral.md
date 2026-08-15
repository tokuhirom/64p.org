---
created: 2026-08-15 16:18
updated: 2026-08-15 16:18
---
# Spectral

Stoplight社が開発するOSSのJSON/YAMLリンター。[[openapi|OpenAPI]] (v3.1, v3.0, v2.0)、Arazzo v1.0、AsyncAPI v2.xの組み込みサポートを持つ。汎用ルールセットエンジンとして任意のJSON/YAMLに使えるが、OpenAPI/AsyncAPI/JSON Schemaを念頭に設計されている。

## 仕組み: given / then / severity

ルールは3要素で構成される。

- `given` — [JSONPath Plus](https://github.com/JSONPath-Plus/JSONPath)でドキュメント内のチェック対象要素を指定
- `then` — `field`(対象内のどのフィールドか)・`function`(assertion内容)・`functionOptions`で検証内容を指定
- `severity` — `error` / `warn` / `info` / `off`

組み込みルールセットは`extends: ["spectral:oas", "spectral:asyncapi", "spectral:arazzo"]`のように参照する。`.spectral.yml`をリポジトリルートに置いて設定するのが通例。カスタムルールセットは配列にファイルパス・npmパッケージ・CDN URLを追加で`extends`できる（例: OWASP APIセキュリティ観点のルールセット`@stoplight/spectral-owasp-ruleset`）。

## CLI

```sh
spectral lint myapifile.yaml --ruleset myruleset.yaml
```

## CI/CD

公式GitHub Action `stoplightio/spectral-action` が提供されており、リポジトリの`.spectral.yml`を尊重してPR上でチェックできる。

## Stoplightエコシステムとメンテナンス状況

SmartBearが2023年8月にStoplightを買収し、Spectral・Elements・[[prism-mock-server|Prism]]を自社OSSポートフォリオ(Swagger、SoapUI、Pact)に統合した。買収後はSpectralをSwaggerHubに統合する方向で開発が続いている。公式リポジトリ`stoplightio/spectral`自体は買収後も存続・開発継続している。

## 他リンターとの関係

[[redocly-cli|Redocly CLI]]も同種のlint機能を持ち、公式に「Spectralからの移行ガイド」を提供している。両者は競合関係にある。

#openapi #linter #devtools

## 出典

- [GitHub: stoplightio/spectral](https://github.com/stoplightio/spectral)
- [Spectral - Stoplight](https://stoplight.io/open-source/spectral)
- [Spectral rulesets - GitHub docs](https://github.com/stoplightio/spectral/blob/develop/docs/getting-started/3-rulesets.md)
- [Spectral OpenAPI Linting Guide 2026 - QASkills](https://qaskills.sh/blog/spectral-openapi-linting-guide-2026)
- [GitHub: stoplightio/spectral-owasp-ruleset](https://github.com/stoplightio/spectral-owasp-ruleset)
- [GitHub: stoplightio/spectral-action](https://github.com/stoplightio/spectral-action)
- [SmartBear to Acquire API Company Stoplight - SD Times](https://sdtimes.com/api/smartbear-to-acquire-api-company-stoplight/)
- [Elevating API Development with Stoplight - SmartBear Blog](https://smartbear.com/blog/elevating-api-development-with-stoplight/)
- [SmartBear Integrates Stoplight's Spectral, Elements and Prism into SwaggerHub - DevOpsDigest](https://www.devopsdigest.com/smartbear-integrates-stoplights-spectral-elements-and-prism-into-swaggerhub)
