---
created: 2026-08-10 19:32
updated: 2026-08-12 23:17
---
# Biome

Rustで書かれた、Web(JavaScript/TypeScript/JSX/TSX/JSON/HTML/CSS/GraphQL)向けのオールインワン開発ツールチェーン。フォーマッターとリンターを中心に提供する。 #javascript #rust

## 機能

- **フォーマッター**: [[prettier|Prettier]]と97%互換の高速フォーマッター
- **リンター**: [[eslint|ESLint]]・TypeScript-ESLint由来の517ルールを搭載した高性能リンター

ESLint・[[prettier|Prettier]]のドロップイン置き換えを狙って設計されており、Node.jsを必要とせず単体で動作する。CLIおよび[[lsp|LSP]]経由で利用可能。

## 性能

ESLint比で最大15倍高速なlint、[[prettier|Prettier]]比で最大35倍高速な整形を謳う。最新のBiome v2(コードネーム"Biotype")では、TypeScriptコンパイラに依存しない型認識(type-aware)のlintルールを初めて実現した。

## 前身: Rome

Biomeの前身はRome。RomeはSebastian McKenzie氏が2020年8月に「Babelの精神的後継」として立ち上げたプロジェクトで、Babel・ESLint・webpack・Prettier・Jestなどを置き換える統合ツールチェーンを目指した。当初Meta OSS傘下でリリースされ、後にRome Tools Inc.として独立したが事業がうまくいかず全従業員がレイオフされた。これを受けて2023年8月、Rome旧コアチームのEmanuele Stoppa氏らが新プロジェクトとしてBiomeを立ち上げた。

## [[oxc|Oxc]]との関係

同じくRust製・JS/TS向けオールインワンツールである[[oxc|Oxc]]とは競合関係にある。ともにRust製・高速・複数機能統合という共通点を持つが、Biomeは既存プロジェクト(Rome)のフォークという系譜を持つ点で、ゼロから作られたOxcとは出自が異なる。

## [[javascript-linters-formatters|JavaScriptのリンター・フォーマッター]]の中での位置づけ

Rust製新世代の統合ツールチェーン。従来世代のESLint+[[prettier|Prettier]]を一括で置き換えることを狙う。同じ新世代の[[oxc|Oxc]]とは競合。

## 出典

- [Biome, toolchain of the web](https://biomejs.dev/)
- [GitHub - biomejs/biome](https://github.com/biomejs/biome)
- [Biome v2—codename: Biotype | Biome](https://biomejs.dev/blog/biome-v2/)
- [Announcing Biome | Biome](https://biomejs.dev/blog/announcing-biome/)
- [🚀 Announcing Biome: the community fork of Rome · rome/tools · Discussion #4787](https://github.com/rome/tools/discussions/4787)
