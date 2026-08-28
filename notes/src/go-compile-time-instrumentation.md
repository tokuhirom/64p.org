---
created: 2026-08-15 20:55
updated: 2026-08-28 12:46
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

のように`go build`の前に`otelc`を挟むだけで、`net/http`・`database/sql`・gRPC・Redisなど対応ライブラリの呼び出し箇所にテレメトリ送出コードがビルド時に埋め込まれる。埋め込まれたコードはOTel SDK経由でOTLPを喋るので、送出先には[[opentelemetry-collector|OpenTelemetry Collector]]や、ローカル確認用の[[otel-desktop-viewer]]をそのまま使える。ランタイムオーバーヘッドがないのが特徴(実行時にフックを行うeBPF計装や、リフレクション・プロキシを使う手法と対照的)。

## 取得できるメトリクス

生成されるメトリクスはOpenTelemetryのセマンティック規約に準拠する。対応ライブラリごとに主に以下のようなものが取れる。

**HTTP(`net/http`)**

- `http.server.request.duration`(Histogram, 秒) — サーバー側のリクエスト処理時間
- `http.server.active_requests`(UpDownCounter) — 処理中リクエスト数
- `http.client.request.duration`(Histogram, 秒) — クライアント側のリクエスト時間
- (opt-in) リクエスト/レスポンスのボディサイズ、コネクション数など

**gRPC**

- `rpc.server.duration` / `rpc.client.duration`系 — リクエスト処理時間
- メッセージサイズ、RPCあたりのメッセージ数

**database/sql・Redis**

- クエリ/コマンド実行時間のduration系メトリクス(`db.client.operation.duration`系のセマンティック規約準拠)

**Goランタイム**

- `go.goroutine.count` — ゴルーチン数
- `go.memory.used` / `go.memory.allocated` — メモリ使用量・割り当て量
- `go.memory.gc.cycles` / `go.memory.gc.pause.duration` — GCサイクル数・stop-the-worldの一時停止時間
- `go.processor.limit`、`go.schedule.duration` など

「リクエスト処理時間(duration histogram)」＋「今アクティブな数(UpDownCounter)」という定番の形が中心。GitHub上の各`instrumentation/<pkg>`ディレクトリの実装は発展途上で、メトリクス名の一覧表を網羅したドキュメントは2026年8月時点ではまだあまり整備されていない。

## 制限事項

v1では「中核的な計装」に対応範囲を絞っており、Goエコシステム全体をカバーしているわけではない。未対応ライブラリはルールの追加、または手動計装との併用で補う必要がある。

## 出典

- [Go Compile-Time Instrumentation v1.0 - OpenTelemetry Blog](https://opentelemetry.io/blog/2026/go-compile-time-instrumentation-v1/)
- [Compile-Time OpenTelemetry Auto-Instrumentation in Go - Dash0](https://www.dash0.com/guides/otelc-opentelemetry-go)
- [Semantic conventions for HTTP metrics](https://opentelemetry.io/docs/specs/semconv/http/http-metrics/)
- [Semantic conventions for Go runtime metrics](https://opentelemetry.io/docs/specs/semconv/runtime/go-metrics/)
- [opentelemetry-go-compile-instrumentation (GitHub)](https://github.com/open-telemetry/opentelemetry-go-compile-instrumentation)

#opentelemetry #golang #observability
