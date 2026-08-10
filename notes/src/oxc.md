---
created: 2026-08-10 19:19
updated: 2026-08-10 19:32
---
# Oxc(Oxidation Compiler)

Rustで書かれた、JavaScript/TypeScript向けの高性能ツール群(ツールチェーン)。VoidZero社(Vue.js作者Evan You氏が設立)が掲げる「統一された高性能JSツールチェーン」構想の一部。 #javascript #rust

## 構成要素

パーサー、リンター(oxlint)、フォーマッター(oxfmt)、トランスフォーマー、ミニファイアなどからなり、パース・モジュール解決・lint・整形・変換・圧縮までを一通りカバーする。

## 性能

既存ツール比で3〜100倍高速と謳っている。

- パーサー: SWCの3倍高速
- リンター(Oxlint): ESLintの50〜100倍高速
- トランスフォーマー: Babelの40倍高速
- ミニファイア: Terser相当の圧縮率をより高速に実現

## アーキテクチャ

各コンポーネントは独立した個別ツールとして利用可能。例えばOxlintだけを採用し、他のコンポーネントは使わないという導入もできる。

## [[ruff|Ruff]]との類似性

Rust製・高速・複数の既存ツールを1つに統合するという思想面で、Python向けの[[ruff|Ruff]]と似た立ち位置にある。対象言語エコシステムは異なる。

## [[biome|Biome]]との関係

同じくRust製・JS/TS向けオールインワンツールである[[biome|Biome]]とは競合関係にある。Biomeは既存プロジェクト(Rome)のフォークという系譜を持つ点で、ゼロから作られたOxcとは出自が異なる。

## 出典

- [What is Oxc? | The JavaScript Oxidation Compiler](https://oxc.rs/docs/guide/what-is-oxc.html)
- [GitHub - oxc-project/oxc](https://github.com/oxc-project/oxc)
- [OXC JavaScript Tooling: 100x Faster Rust-Based Development Tools](https://alisoueidan.com/blog/oxc-rust-powered-next-gen-javascript-tooling)
