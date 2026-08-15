---
created: 2026-08-15 20:55
updated: 2026-08-15 20:55
---
# Goのコンパイル時計装(compile-time instrumentation)

OpenTelemetryが2026年に発表した、Goアプリケーションを**ソースコード変更なし**でトレーシング計装する仕組み。AlibabaとDatadogの協力で開発され、v1.0がリリースされた。

## 背景

Goのプログラムは単一の静的バイナリにコンパイルされる。Javaのように起動時にランタイムエージェントを注入して計装する手法が使えないため、これまでGoの自動計装は主に以下のいずれかだった。

- ソースコードを手動で書き換えてSDKを呼び出す(手動計装)
- eBPFでプロセス外からフックする([[bpf|eBPF]]ベースの計装。バイナリの再ビルドが不要な代わり、プロセス外からの観測になる)

Go compile-time instrumentationはこれらとは別の第三の道として、**ビルド時にGoツールチェーンへ介入し、コンパイル中に計装コードを直接注入する**アプローチを取る。

## 仕組み

`otelc`というCLIツールが標準のGoツールチェーンをラップする。

```sh
otelc go build ./...
```

のように`go build`の前に`otelc`を挟むだけで、`net/http`・`database/sql`・gRPC・Redisなど対応ライブラリの呼び出し箇所にテレメトリ送出コードがビルド時に埋め込まれる。ランタイムオーバーヘッドがないのが特徴(実行時にフックを行うeBPF計装や、リフレクション・プロキシを使う手法と対照的)。

## 制限事項

v1では「中核的な計装」に対応範囲を絞っており、Goエコシステム全体をカバーしているわけではない。未対応ライブラリはルールの追加、または手動計装との併用で補う必要がある。

## 出典

- [Go Compile-Time Instrumentation v1.0 - OpenTelemetry Blog](https://opentelemetry.io/blog/2026/go-compile-time-instrumentation-v1/)

#opentelemetry #golang #observability
