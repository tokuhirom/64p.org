---
created: 2026-08-14 19:51
updated: 2026-08-14 19:51
---
# cssparser (rust-cssparser)

CSS Syntax Level 3のRust実装。[[servo|Servo]]プロジェクト由来のクレートで、`servo/rust-cssparser`リポジトリで開発されている。 #rust #browser-engine

## 特徴

- 個別のCSSプロパティのパースは行わず、トークナイズやコンポーネント値のパースといった低レベルな処理を提供する設計。CSSカラーや`:nth-child()`等の引数(An+B記法)を解析するヘルパー関数は含む。
- どのCSSプロパティ群をサポートするかは上位のライブラリに委ねられている。Servoの`style`クレートは、cssparserを土台にプロパティ対応を追加した完全なCSSパースシステムの実装例になっている。

## Stylo/Quantum CSSとの関係

Servoのスタイルシステムである「Stylo」(Quantum CSS)は、CSS解析にcssparserを利用している。Styloは[[quantum-project|Quantumプロジェクト]]を通じてFirefoxにも統合されており、cssparserはServoとFirefox両方のCSSエンジンを支える基盤コンポーネントになっている。

## 利用例

[[sghtmltopdf]]はCSS解析コンポーネントとしてcssparserを採用している。

## 出典

- [servo/rust-cssparser - GitHub](https://github.com/servo/rust-cssparser)
- [cssparser - crates.io](https://crates.io/crates/cssparser)
- [servo/stylo - GitHub](https://github.com/servo/stylo)
