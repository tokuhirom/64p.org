---
created: 2026-08-12 23:09
updated: 2026-08-12 23:09
---
# LSP (Language Server Protocol)

エディタ/IDEと「言語サーバー」の間で通信するためのプロトコル。コード補完・定義へのジャンプ・参照検索・診断（エラー表示）などの言語機能を、エディタ本体から切り離して独立プロセス（言語サーバー）に持たせ、JSON-RPCベースの標準化されたメッセージでやり取りする。 #lsp

## 成り立ち

2015年、MicrosoftがVS Code向けに開発。元々はOmniSharpがC#向けの高度な編集機能を提供するために採用した「言語サーバー」という概念がベースになっている。2016年6月27日、Red Hat・Codenvyと協業してプロトコル仕様を標準化すると発表し、以降はVS Codeに限らないオープンな仕様として展開されている。

## 目的

言語ごとの解析ロジック（言語サーバー）をエディタごとに再実装せずに済むようにすること。「N個のエディタ × M個の言語」の組み合わせ問題を、共通プロトコルを挟むことで「N + M」の実装量に減らせる。

## バージョン

現行は3.17〜3.18系。3.17ではtype hierarchy・inline values・inlay hints・ノートブックドキュメント対応などが追加された。

## エコシステム(2026年時点)

- 400以上の言語サーバーが開発されている。
- VS Code、JetBrains系IDE、Neovim、Eclipseなど主要エディタが対応。[[biome|Biome]]もCLIに加えてLSP経由での利用に対応している。
- 近年はGitHub Copilot Language Server SDKのようにAIアシスタント側でも採用が広がり、Jupyter Notebookやデータベースツールなど従来のコードエディタ以外にも拡大している。[[mojo|Mojo]]もLSPサーバーを提供しており、Modular 26.5でその安定性が向上した。

## 出典

- [Language Server Protocol - Wikipedia](https://en.wikipedia.org/wiki/Language_Server_Protocol)
- [Official page for Language Server Protocol](https://microsoft.github.io/language-server-protocol/)
- [Language Server Protocol Specification - 3.17](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/)
- [Language Server Protocol Ecosystem 2026 | Zylos Research](https://zylos.ai/research/2026-01-13-language-server-protocol-ecosystem/)
