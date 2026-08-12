---
created: 2026-08-13 07:30
updated: 2026-08-13 07:42
---
# WASI (WebAssembly System Interface)

[[wasm|WebAssembly]]にコンパイルされたソフトウェアがファイル・ネットワーク・時刻・乱数などOS機能にアクセスするための標準API仕様群。ブラウザのサンドボックスの外(サーバー・エッジ・組込機器)でWasmを動かす際の「システムコール」に相当する。

#wasm #webassembly #wasi

## 必要性

HTTPマイクロサービスのような重い仕組みなしに、異なる言語で書かれたコンポーネント同士を安全に組み合わせられるようにする。プラグインモデルやマルチ言語SDKを持つプロジェクトに向く。

## バージョン推移

Preview 1 → Preview 2(WASI 0.2、モジュール化されComponent Model上に構築、[[wit|WIT]]で定義された安定版) → Preview 3(WASI 0.3、2026年2月導入。WITの`stream<T>`/`future<T>`によるネイティブ非同期I/Oサポートを追加)。

## セキュリティモデル

capability-basedサンドボックス。Wasmモジュール/コンポーネントは起動時に権限を一切持たず、ホスト側が明示的に許可した操作しか実行できない。

## 代表的なランタイム

Wasmtime、WasmEdge、WAMR、wazero(Go製)、Wasmer、wasmi/wasm3(組込向け軽量実装)など。

## 出典

- [Introduction · WASI.dev](https://wasi.dev/)
- [WASI and the WebAssembly Component Model: Current Status](https://eunomia.dev/blog/2025/02/16/wasi-and-the-webassembly-component-model-current-status/)
