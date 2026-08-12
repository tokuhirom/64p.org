---
created: 2026-08-12 23:17
updated: 2026-08-12 23:17
---
# ESLint

JavaScript向けの静的解析ツール（リンター）のデファクト標準。Nicholas C. Zakas氏が2013年6月に公開した（当初の名前はJSCheckで、1ヶ月後にESLintに改名）。MITライセンスで、2019年からは[[openjs-foundation|OpenJS Foundation]]傘下のプロジェクト。2025年末時点で週間ダウンロード数は7,000万を超え、最も広く使われているJSリンターとなっている。 #javascript

## プラガブルという設計思想

先行する[[jslint|JSLint]]・[[jshint|JSHint]]には「独自ルールを追加できない」という制約があり、それへの不満がESLint誕生の動機になった。ESLintではすべてのルールが個別に有効/無効を切り替えられ、独自ルールを実行時にプラグインとして読み込める。公式サイトも "Pluggable JavaScript Linter" を掲げている。TypeScript対応も[[typescript-eslint]]というプラグインとして提供される、というようにエコシステム全体がこのプラグイン機構の上に成り立っている。

## flat config

長年使われてきた `.eslintrc` 形式（eslintrc config）を置き換える新しい設定システム。`eslint.config.js` にJavaScriptの配列としてフラットに設定を書く。最初のRFCからv9.0.0（2024年4月）でのデフォルト化まで約5年をかけ、エコシステム全体が移行できるよう意図的にゆっくりロールアウトされた。次期メジャーバージョンのv10.0.0でeslintrc形式のサポートは完全に削除される予定（2025年11月にalpha、12月にbetaが出ておりリリースが近い）。

## JavaScriptの外への拡張

2024年に「言語非依存（language-agnostic）なリンターになる」方針を発表し、言語プラグイン機構を導入した。公式プラグインとして @eslint/json（JSON/JSONC/JSON5、2024年10月）、@eslint/markdown（同）、@eslint/css（2025年2月）が提供され、コミュニティのhtml-eslint（2025年5月）も合わせると、JavaScript・CSS・HTMLというWebの三要素すべてをESLintでlintできるようになった。

## Rust製新世代ツールとの関係

[[biome|Biome]]や[[oxc|Oxc]]（oxlint）などRust製の新世代リンターが「ESLint比で何倍高速」と比較対象にする基準点になっている（oxlintはESLintの50〜100倍高速を謳う）。一方ESLint自身もv9.34.0でマルチスレッドlintを導入し、大規模プロジェクトで30〜300%の性能向上を実現するなど、性能面での改善を進めている。

## [[javascript-linters-formatters|JavaScriptのリンター・フォーマッター]]の中での位置づけ

従来世代（JS製・単機能）のリンター側の代表。フォーマッター側の代表である[[prettier|Prettier]]と組み合わせて使われることが多い。

## 出典

- [ESLint - Pluggable JavaScript Linter](https://eslint.org/)
- [ESLint - Wikipedia](https://en.wikipedia.org/wiki/ESLint)
- [ESLint v9.0.0: A retrospective - ESLint](https://eslint.org/blog/2025/05/eslint-v9.0.0-retrospective/)
- [ESLint now officially supports linting of JSON and Markdown - ESLint](https://eslint.org/blog/2024/10/eslint-json-markdown-support/)
- [ESLint now officially supports linting of CSS - ESLint](https://eslint.org/blog/2025/02/eslint-css-support/)
- [ESLint can now lint HTML using the html-eslint language plugin - ESLint](https://eslint.org/blog/2025/05/eslint-html-plugin/)
- [ESLint's 2025 year in review - ESLint](https://eslint.org/blog/2026/01/eslint-2025-year-review/)
