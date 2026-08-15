---
created: 2026-08-15 20:46
updated: 2026-08-15 21:21
---
# wasm2go

[[go-yaml-libraries|goccy]]氏が開発している、[[wasm|WebAssembly]]バイナリをスタンドアロンなGoソースコードに変換するahead-of-timeコンパイラ。解釈器や[[wasi|WASI]]ランタイム（wazero等）を実行時に必要とせず、ネイティブなGoの実行ファイルとして動作する。[[go-spidermonkey]]はこのツールで[[spidermonkey|SpiderMonkey]]のWasmビルドをGoコードへ変換して使っている。

## 動機

大規模なC/C++ライブラリをWASI SDKでWasmとしてビルドした場合、それをGoプログラムに組み込む際の起動時間・メモリコストを削減することが目的。Wasmランタイムを介したインタプリタ/JIT実行ではなく、事前に丸ごとGoコードへ変換してしまうアプローチを取る。

## 変換の仕組み

1. Wasmバイナリをパースし、SSA形式の中間表現に変換
2. SSAベースのレジスタアロケータで最適化
3. 出力はデュアルアーキテクチャ対応: amd64/arm64向けにはPlan9形式のネイティブアセンブリを生成し、それ以外のGOOS/GOARCHでは純Goのフォールバック実装を使う
4. インポートに`wasi_snapshot_preview1`が含まれる場合、対応するネイティブGo実装を自動生成する

レジスタアロケータ側の最適化としては、ブロックローカル最適化・ブロック間スタック割り当て・mポインタキャッシング・スロット再利用・ピープホール最適化・ブランチ融合などを行っている。

## 使い方

CLIとして:

```sh
wasm2go -i module.wasm -o module.go -pkg mymodule
```

ライブラリとしても`github.com/goccy/wasm2go/transpile`から利用できる。

## 性能

wazero（Go製のWasmランタイム）との比較で、短いクエリでは18〜81倍の高速化が見られるとのこと。メモリ割り当ても削減され、呼び出しオーバーヘッドが最小化される。

#go #webassembly #compiler

## 出典

- [GitHub - goccy/wasm2go](https://github.com/goccy/wasm2go)
- [GitHub - goccy/go-spidermonkey](https://github.com/goccy/go-spidermonkey)
