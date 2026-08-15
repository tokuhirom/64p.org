---
created: 2026-08-15 20:42
updated: 2026-08-15 20:42
---
# go-spidermonkey

[[go-yaml-libraries|goccy]]氏が開発している、FirefoxのSpiderMonkey JavaScriptエンジンを純粋なGoで動かすライブラリ。「SpiderMonkey in pure Go — run untrusted JavaScript anywhere Go runs. No cgo, no WebAssembly runtime, one static binary.」を謳う。

## 仕組み

SpiderMonkeyを一度WebAssemblyにコンパイルし、それを`wasm2go`（Wasm→Go変換ツール。`goccy/spidermonkeywasm2go`として変換済みエンジンが提供されている）でGoのソースコードに変換している。この方式により:

- CGO不要（クロスコンパイルが容易、glibc依存がない）
- 別途Wasmランタイム（wasmtime, wazeroなど）を同梱する必要がない
- 単一の静的バイナリとして配布できる

## 主な用途: サンドボックスでのJS実行

信頼できないJavaScriptコードを安全に実行することに主眼が置かれている。

- ゲストスクリプトはファイルシステム・ネットワーク・環境変数に一切アクセスできない
- ホスト側から外部のwatchdogで暴走ループを強制停止可能
- `context.Context`によるキャンセル/タイムアウト制御
- `Config.MaxMemoryBytes`でメモリ上限を設定可能
- 標準出力/エラー出力は`Config.Stdout`/`Stderr`にリダイレクト

## 標準準拠性

公式のtest262準拠テストスイートで約98%（52,266/53,329件）パス。ES Modules、`SharedArrayBuffer`、`Atomics`などマルチエージェント関連の機能もサポートしている。

## 基本的な使い方

```go
js, _ := spidermonkey.New(spidermonkey.Config{})
defer js.Close()

r, _ := js.Eval(context.Background(),
    "[1, 2, 3].map(x => x * 2).join(',')")
fmt.Println(r.Value.String()) // 2,4,6
```

## ライセンス

Go側のソースコードはMIT、SpiderMonkeyエンジン自体はMozilla Public License 2.0。

#go #javascript #sandbox #webassembly

## 出典

- [GitHub - goccy/go-spidermonkey](https://github.com/goccy/go-spidermonkey)
