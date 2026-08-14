---
created: 2026-08-14 19:51
updated: 2026-08-14 19:51
---
# html5ever

Rustで書かれた高性能なHTML5パーサー。[[servo|Servo]]プロジェクトの一部として開発された。 #rust #browser-engine

## 特徴

- WHATWG HTML5仕様に準拠したパース・シリアライズを行う。パフォーマンス・セキュリティ・堅牢なエラー回復性を重視した設計。
- Rustで実装されているため、C/C++実装のHTMLパーサーにありがちなメモリ安全性由来の脆弱性を回避しつつ、C実装に匹敵する性能を狙う。
- 特定のDOM実装を前提としない設計になっており、DOMツリー自体は保持しない。パース結果は`TreeSink`というコールバックインターフェース経由で外部に通知され、呼び出し側が任意のDOM表現に組み立てる。この設計により、Servo以外のプロジェクトでも独立したクレートとして利用しやすくなっている。

## 利用例

[[sghtmltopdf]]はHTML解析コンポーネントとしてhtml5everを採用している。

## 出典

- [servo/html5ever - GitHub](https://github.com/servo/html5ever)
- [html5ever/README.md - GitHub](https://github.com/servo/html5ever/blob/main/README.md)
