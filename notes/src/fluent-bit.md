---
created: 2026-08-13 13:05
updated: 2026-08-17 09:48
---
# Fluent Bit

ログ・メトリクス・トレースを収集する軽量なテレメトリエージェント。[[fluentd|Fluentd]]のアーキテクチャを踏襲しつつ、組み込み機器やエッジデバイスなどFluentdの実行が困難な低リソース環境向けに開発された。作者はEduardo Silva、現在はChronosphere社がスポンサーとなっている。CNCF傘下のFluentdプロジェクトのサブプロジェクトという位置づけで、Fluent Bit自体もCNCF Graduatedレベルにある。ライセンスはApache License v2.0。

#data-engineering #cncf #observability

## Fluentdとの違い

| | Fluentd | Fluent Bit |
|---|---|---|
| 実装言語 | Ruby(コアの一部はC) | C言語のみ |
| プラグイン | Ruby gemとして実行後にインストール | コアにコンパイルして組み込み |
| メモリ使用量 | 単一インスタンスで約40MB | 単一インスタンスで1MB未満 |
| 対応シグナル | ログ中心(OpenTelemetryにも対応) | ログ・メトリクス・トレースの3種に対応 |

同一ワークロードでの比較では、FluentdはFluent Bitのおよそ4倍のCPU、4〜6倍のメモリを消費するというベンチマーク結果がある。

## 主な機能

- JSON・正規表現・LTSV・Logfmtなど複数フォーマットのログパーサーに対応。
- [[prometheus|Prometheus]]およびOpenTelemetryと互換性のあるメトリクス収集・出力。
- バックプレッシャーハンドリングと、メモリ/ファイルシステムでのデータバッファリング。
- 高スループット・低リソース消費を重視した設計で、[[kubernetes|Kubernetes]]のノードレベルやエッジ層でのログ収集用途によく使われる。

## 出典

- [Fluent Bit: Official Manual](https://docs.fluentbit.io/manual)
- [Fluentd & Fluent Bit | Fluent Bit: Official Manual](https://docs.fluentbit.io/manual/2.0/about/fluentd-and-fluent-bit)
- [Fluentd vs Fluent Bit: How to Choose in 2026 | Better Stack Community](https://betterstack.com/community/logging/fluentd-vs-fluent-bit/)
