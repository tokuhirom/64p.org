---
created: 2026-09-19 21:49
updated: 2026-09-19 21:49
---
# OpenTelemetry Weaver

セマンティック規約(semantic conventions)を**定義・検証・ドキュメント化・配布**するためのCLIツール。Rust実装、Apache License 2.0、[open-telemetry/weaver](https://github.com/open-telemetry/weaver)。掲げている思想は "Observability by Design" で、テレメトリ(メトリクス・スパン・ログ・イベント)を「公開API」として扱い、スキーマとしてバージョン管理・変更検知の対象にする。

#opentelemetry #observability #rust #cli

## 解こうとしている問題

セマンティック規約が「読み物としての仕様書」に留まっていると、以下が起きる。

- メトリクス名がデプロイでこっそり変わってアラートが壊れる
- チームごとに命名がバラバラでクエリが書けない
- どのシグナルが出ているのか誰も文書化していない

Weaverは規約を機械可読なレジストリとして持ち、CI上で`check`/`diff`/`live-check`を回すことで、これらをコンパイルエラーのように早期に検出させる。公式のOpenTelemetryセマンティック規約レジストリ自体がWeaverで管理されており、70超のドメイン・900超の属性/シグナルが入っている。

## レジストリとマニフェスト

Weaverが扱う中心的なデータは、属性・メトリクス・スパン・イベント・エンティティの定義を並べたYAMLの集合(**レジストリ**)。マニフェストで公式レジストリを依存として取り込み、その上に自組織の定義を重ねる。

```yaml
# registry_manifest.yaml
name: todo_app
description: OTel signals for my native ToDo app
semconv_version: 0.1.0
dependencies:
  - name: otel
    registry_path: https://github.com/open-telemetry/semantic-conventions/archive/refs/tags/v1.34.0.zip[model]
```

`imports`で依存レジストリから使うものを選び、`groups`で独自のシグナルを定義する。既存属性は`ref`で参照でき、requirement_levelだけ上書きするといったことができる。

```yaml
imports:
  metrics:
    - db.client.*
  events:
    - app.*
    - exception
  entities:
    - host
    - host.cpu

groups:
  - id: metric.todo.completion_time
    type: metric
    brief: Measures the time between the creation and completion of a ToDo item.
    metric_name: todo.completion_time
    instrument: histogram
    unit: s
    attributes:
      - id: todo.priority
        type: string
        brief: The priority of the ToDo item.
      - ref: user.id
        requirement_level: required
    entity_associations:
      - os.name
      - os.version
```

現状の合成は2階層まで(自分のレジストリ + 依存1つ)に制限されている。

## 主なサブコマンド

| コマンド | 内容 |
|---|---|
| `registry check` | レジストリのロード・パース・解決を通して構文/意味の妥当性を検証。ポリシーも適用できる |
| `registry generate` | テンプレートからコード・ドキュメント・設定ファイルを生成 |
| `registry update-markdown` | 既存Markdown中のマーカーで挟まれた区間だけを生成内容で差し替える |
| `registry diff` | 2バージョン間の差分を計算する。破壊的変更の検出に使う |
| `registry live-check` | 実際のOTLPストリームをレジストリと突き合わせて適合レポートを出す |
| `registry emit` | レジストリ中のexampleからサンプルシグナルをOTLPで送る |
| `registry infer` | 流れているOTLPメッセージからスキーマを逆算する |
| `registry package` | 自己完結したレジストリ成果物を作る(配布用) |
| `registry stats` | レジストリの統計 |
| `registry json-schema` | レジストリ文書のJSON Schemaを出力 |
| `registry mcp` | [[mcp|MCP]]サーバとしてレジストリをLLMツールに公開する |

`registry resolve`と`registry search`は非推奨になっており、前者は`generate`/`package`、後者は生成済みドキュメントで代替する。

```sh
weaver registry check -r registry-path
weaver registry update-markdown -r registry-path --target=markdown
weaver registry generate -r registry-path -t templates-root-dir go
weaver registry diff -r current-registry --baseline-registry previous-registry
```

インストールはリリースページのバイナリ、`docker pull otel/weaver`、`cargo build --release`のいずれか。GitHub Actionも提供されている。

## テンプレートによる生成

`generate`はレジストリを解決した結果に対して、[[jq]]式でデータを切り出し、MiniJinja(Rust製のJinja2互換テンプレートエンジン)でレンダリングする、という二段構えになっている。出力はコードに限らずMarkdownでも設定ファイルでもよい。Go/Rust向けの「型安全な計装ヘルパ」を吐く高級なジェネレータは開発中。

`update-markdown`があるおかげで、人手で書いたドキュメントの中に生成された属性表だけを埋め込んで同期させ続けられる。

## ポリシー検証

構文チェックを超えた組織固有のルールは、[[rego|Rego]]で書いたポリシーとして`check`や`live-check`に渡す。「属性名は必ず自社プレフィックスで始まる」「stableな属性を破壊的に変更してはいけない」といったルールをレジストリ定義とは独立に持てる。

## live-check — 実際に流れているテレメトリを検査する

`live-check`はOTLPレシーバとして待ち受け、受け取ったシグナルがレジストリとポリシーに適合しているかのレポートを出す。CIのテスト実行中に立てておけば、「このアプリが実際に吐くテレメトリ」を検査できる。

```sh
weaver registry live-check \
  --registry <path_to_registry> \
  --policy <path_to_policies> \
  --input-source otlp \
  --otlp-grpc-address 0.0.0.0 --otlp-grpc-port 4318 \
  --format yaml --output report.yaml
```

レジストリ定義の静的チェックだけでは「定義したが実装されていない」「定義にない属性を勝手に足している」を検出できないので、静的な`check`と対になる。

## [[opentelemetry-collector|OpenTelemetry Collector]]との関係

Weaver自体はCollectorの機能ではないが、otelcolの文脈では3方向で絡む。

**1. live-checkの送信先として** — Collectorのexporterを`live-check`が待ち受けるエンドポイントに向ければ、パイプラインを通った後のテレメトリを検査できる。`emit`で逆にCollectorへサンプルを流し込むこともできる。

**2. mdatagenをWeaverに寄せるRFC** — Collectorには`metadata.yaml`からコンポーネントの内部テレメトリのコード・ドキュメント・テストを生成する`cmd/mdatagen`があるが、やっていることがWeaverと重複している。[RFC: Use weaver in mdatagen for telemetry (#13454)](https://github.com/open-telemetry/opentelemetry-collector/issues/13454)では2案が提示されている。

- 案1: `metadata.yaml`に`semconv`キーを生やす。設定が1ファイルに収まるが、Weaverの通常の使い方から外れる。
- 案2: `registry_manifest.yaml`を別途置く。Weaverの機能をフルに使えるが、ファイルが増える。

いずれにせよmdatagenが中間ファイルを書き出してWeaverを呼ぶ形になり、コンポーネントごとに漸進的に移行できるようにする(設定またはファイルの有無でWeaver利用を検出し、無ければ従来動作)という提案。2026-09時点で議論中、実装PRは見当たらない。

**3. 内部テレメトリの規約整合** — [Align internal telemetry with semantic conventions (#14350)](https://github.com/open-telemetry/opentelemetry-collector/issues/14350)は、Collector自身が吐く内部テレメトリが規約に従っていない問題。ルート名前空間`otelcol`が「ドット区切りの各要素が複数語ならsnake_case」という規約に反する(`otel.col`か`otel_col`へ)、consumed/producedを別メトリクスに分けず方向属性付きの`entity.io`に統合すべき、`otelcol.component.kind`/`otelcol.component.id`が既存の`otel.component.*`と衝突する、`otelcol.signal`は何のプロパティか不明瞭なので`otel.signal.kind`へ、といった指摘が並ぶ。このissue自体にWeaverの言及はないが、「Collectorの内部テレメトリもレジストリで管理する」という上のRFCと同じ方向を向いている。

## 出典

- [open-telemetry/weaver (GitHub)](https://github.com/open-telemetry/weaver)
- [Command-Line Help for weaver](https://github.com/open-telemetry/weaver/blob/main/docs/usage.md)
- [Observability by Design: Unlocking Consistency with OpenTelemetry Weaver | OpenTelemetry Blog](https://opentelemetry.io/blog/2025/otel-weaver/)
- [RFC: Use weaver in mdatagen for telemetry · Issue #13454](https://github.com/open-telemetry/opentelemetry-collector/issues/13454)
- [Align internal telemetry with semantic conventions · Issue #14350](https://github.com/open-telemetry/opentelemetry-collector/issues/14350)
