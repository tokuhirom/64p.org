---
created: 2026-08-13 07:30
updated: 2026-08-13 07:42
---
# WebAssembly (Wasm)

スタックベースの仮想機械向けバイナリ命令フォーマット。プログラミング言語の移植可能なコンパイルターゲットとして設計されている。

#wasm #webassembly

## 設計目標

- **高速**: ネイティブに近い実行速度を目指す。
- **安全**: メモリセーフでサンドボックス化された実行環境。ウェブ埋め込み時はブラウザのセキュリティポリシーが適用される。
- **移植可能**: ブラウザ以外の環境(サーバー、エッジ、組込機器など)でも動作する。
- **オープン**: デバッグ・テスト・学習用のテキスト形式も定義されている。

## フォーマット

デプロイ用のバイナリ形式(`.wasm`)と、人間が読めるテキスト形式(`.wat`)の2つが定義されている。

## 仕様の現状

コア仕様は WebAssembly 3.0(2026年7月28日版)が最新。2025年9月にW3C標準として正式に勧告された。

## 対応言語

Rust、C/C++、Go、AssemblyScriptなど多数の言語からコンパイル可能。[[raku-rakudo-perl6|mutsu]]もWebAssembly化されて公式サイト上のプレイグラウンドで動いている。

## Component Model

複数のWasmモジュール(異なる言語で書かれたものも含む)を組み合わせてアプリケーションを構築するための仕組み。[[wit|WIT(WebAssembly Interface Types)]]というIDLで複雑な型のやり取りを扱う。ブラウザの外でWasmを動かす際のOS機能アクセスは[[wasi|WASI]]が担う。

## 出典

- [Introduction — WebAssembly 3.0](https://webassembly.github.io/spec/core/intro/introduction.html)
- [webassembly.org](https://webassembly.org/)
- [State of WebAssembly 2026](https://devnewsletter.com/p/state-of-webassembly-2026/)
