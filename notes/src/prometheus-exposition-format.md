---
created: 2026-08-17 09:51
updated: 2026-08-17 09:51
---
# Prometheus text-based exposition format

[[prometheus|Prometheus]]がスクレイプ対象(`/metrics`エンドポイント)に期待する、メトリクスを表現するためのテキストベースのワイヤーフォーマット。2014年から安定して使われているバージョンが`0.0.4`で、HTTPの`Content-Type`は`text/plain; version=0.0.4`(バージョン指定が無い場合は最新版にフォールバックする)。人間が生成・読解しやすいことを重視した行指向(改行文字`\n`区切り)の設計になっている。

#observability

## 行のフォーマット

各行は基本的に以下の形。トークンは空白またはタブで区切られ、ファイルの最終行は改行文字で終わる必要がある。

```
metric_name{label1="value1",label2="value2"} value [timestamp]
```

タイムスタンプ(ミリ秒単位のUnixtime)は省略可能。[[node_exporter]]のtextfile collectorはこのタイムスタンプ付き行をサポートしておらず、含まれているとファイル全体がスキップされることを実験で確認した(詳細は[[node-exporter-textfile-experiment]]参照)。

## `# HELP` / `# TYPE` コメント行

`#`で始まる行はコメントとして扱われるが、最初のトークンが`HELP`または`TYPE`の場合だけ特別に解釈される。

- `# HELP <metric_name> <説明文>`: メトリクスの説明。バックスラッシュ・改行はそれぞれ`\\`・`\n`でエスケープする
- `# TYPE <metric_name> <type>`: メトリクスの型を宣言する。1メトリクス名につき最大1つで、最初のサンプル行より前に出現しなければならない

それ以外の`#`始まりの行は単に無視される。

## メトリクスタイプ(5種)

- **counter**: 単調増加するカウンタ
- **gauge**: 増減する値
- **histogram**: 値の分布をバケット化して集計。同じ名前から複数のサンプル行が派生する
  - `<name>_bucket{le="<上限>"}`: 累積バケット。必ず`{le="+Inf"}`のバケットを持ち、その値は`<name>_count`と一致する
  - `<name>_sum`: 観測値の合計
  - `<name>_count`: 観測回数
- **summary**: histogramと似ているが、サーバー側ではなくクライアント側で分位数(quantile)を事前計算して公開する
  - `<name>{quantile="<分位点>"}`: 分位数ごとのサンプル行
  - `<name>_sum` / `<name>_count`: histogramと同様
- **untyped**: 型が不明な場合のフォールバック

## ラベル値のエスケープ

ラベル値は任意のUTF-8文字列を許容するが、バックスラッシュ・二重引用符・改行の3文字は必ずそれぞれ`\\`・`\"`・`\n`にエスケープする必要がある。

## 行の並び順

同じメトリクス名に属する行は1つのグループとしてまとめ、`HELP`/`TYPE`行を先頭に置く必要がある。グループ内でのそれ以降の順序に厳密な規定はなく、「毎回同じ出力になるようソートするのが望ましいが必須ではない」という緩い方針になっている。

## OpenMetricsとの関係

この0.0.4形式をベースに、IETFへの標準化提案も見据えて仕様を整理・厳格化したのがOpenMetrics(2020年に1.0リリース)。ExporterやPrometheus本体でのOpenMetrics対応も進んでいるが、node_exporterのtextfile collectorが読むのは伝統的な0.0.4形式。

## 出典

- [Exposition formats | Prometheus](https://prometheus.io/docs/instrumenting/exposition_formats/)
- [OpenMetrics 1.0 | Prometheus](https://prometheus.io/docs/specs/om/open_metrics_spec/)
- [prometheus/OpenMetrics - OpenMetrics.md](https://github.com/prometheus/OpenMetrics/blob/main/specification/OpenMetrics.md)
