---
created: 2026-08-17 09:48
updated: 2026-08-17 09:51
---
# node_exporter

Linux/UNIXマシン自体のハードウェア・OSレベルのメトリクス(CPU、メモリ、ディスクI/O、ネットワーク、ファイルシステムなど)を[[prometheus|Prometheus]]形式で公開する公式exporter。Go製のシングルバイナリで、`/proc`・`/sys`以下の仮想ファイルシステムをパースしてメトリクス化する「collector」がドメインごとにプラグイン的に実装されている(`cpu`、`meminfo`、`diskstats`、`filesystem`など)。各collectorは共通のCollectorインターフェースを実装し、`/metrics`へのスクレイプ時にNodeCollectorが全collectorのUpdate()を呼び出してメトリクスを集約する。

#observability

## 動作モデル

Prometheus本体と同じくpull型。node_exporterはHTTPサーバーとして起動し(デフォルトポート9100)、Prometheusサーバー側が`/metrics`エンドポイントを定期的にスクレイプしに来る。

## textfile collector

`--collector.textfile.directory=<dir>`フラグで指定したディレクトリ内の`*.prom`ファイル([[prometheus-exposition-format|Prometheusのtext exposition format]])をスクレイプのたびに読み込み、そのままメトリクスとしてマージして公開する機能。node_exporter自身が対応していない独自メトリクスや、cronジョブの実行結果("最後に成功した時刻"など)を後付けで露出させたい場合に使う。

- ファイルごとに`node_textfile_mtime_seconds{file="..."}`(最終読み込み成功時のmtime)が自動付与される
- タイムスタンプ付きの行(`metric_name 1 1234567890000`のような3カラム目)はサポートされておらず、含まれているとそのファイル全体がパース不可としてスキップされる(他の`.prom`ファイルには影響しない、ファイル単位のエラー)。この場合`node_textfile_scrape_error`が1になる
- 書き込み中の不完全な内容を読まれないよう、一時ファイルに書いてから`mv`でリネームするatomicな置き換えが推奨パターンとして機能することを実験で確認した(詳細は[[node-exporter-textfile-experiment|textfile collectorを動かした実験記録]]参照)

## 出典

- [GitHub - prometheus/node_exporter](https://github.com/prometheus/node_exporter)
- [Node exporter textfile collector | client_python](https://prometheus.github.io/client_python/exporting/textfile/)
- [Collector Interface | node_exporter | DeepWiki](https://deepwiki.com/grafana/node_exporter/2.1-collector-interface)
- [prometheus/node_exporter collector/textfile.go](https://github.com/prometheus/node_exporter/blob/master/collector/textfile.go)
