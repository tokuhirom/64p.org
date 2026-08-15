---
created: 2026-08-15 16:18
updated: 2026-08-15 16:18
---
# Redocly CLI

Redocly社製のOSS CLI。[[openapi|OpenAPI]]定義に対する`lint`（設定した基準に沿っているかチェック）と`bundle`（`$ref`を解決して単一ファイルへ結合し、他ツールへ渡す用途）が代表的なコマンド。

[[spectral|Spectral]]とは競合するツールで、公式に「Spectralからの移行ガイド」を提供している。Spectralの`--ruleset/-r`オプションに相当するものとしてRedocly CLIでは`--extends`でルールセットを指定する対応表が用意されている。推奨ルールセットはSwagger・Spectral・OAS-Kitからの着想を明記している。

#openapi #linter #devtools

## 出典

- [Lint and bundle - Redocly](https://redocly.com/docs/cli/guides/lint-and-bundle)
- [Migrate from Spectral - Redocly](https://redocly.com/docs/cli/guides/migrate-from-spectral)
- [GitHub: Redocly/redocly-cli](https://github.com/Redocly/redocly-cli)
