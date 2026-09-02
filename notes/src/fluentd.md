---
created: 2026-08-13 13:03
updated: 2026-09-02 19:13
---
# Fluentd

多様なデータソースからのログを収集し、JSON形式に構造化した上でファイル・RDBMS・NoSQL・IaaS/SaaS・Hadoopなど様々な出力先へ転送する、オープンソースのデータコレクタ(統一ロギングレイヤー)。Treasure Data社の古橋貞之(Sadayuki Furuhashi)氏が開発した。同氏は[[embulk|Embulk]]や[[messagepack|MessagePack]]の開発者でもあり、Fluentdがストリーム型のログ収集を担うのに対し、Embulkはバルク(一括)型のデータ転送を担う位置づけになっている。

#data-engineering #ruby #cncf

## 主な機能

- 複数のデータソースとデータ出力を繋ぐプラグイン型アーキテクチャ。500以上のコミュニティ提供プラグインが存在する。
- ログ収集・フィルタリング・バッファリング・出力という一連の処理を、JSON形式によるデータ構造化で統一的に扱う。
- メモリおよびファイルベースのバッファリングによるデータ損失防止と、フェイルオーバー機能。
- C言語とRubyの組み合わせで実装されており、30〜40MBのメモリで動作し、コア当たり13,000イベント/秒を処理できる。

## CNCFとFluent Bit

- 2016年11月8日に[[cncf|CNCF]](Cloud Native Computing Foundation)のIncubatingプロジェクトとして採択され、2019年4月11日にGraduatedレベルへ昇格した。
- 組み込み機器やエッジデバイスなど、Fluentdの実行が困難な軽量環境向けに、Fluentdのアーキテクチャを踏襲した軽量版として[[fluent-bit|Fluent Bit]]が開発された。Fluent BitはFluentdの傘下にあるCNCF Graduatedのサブプロジェクトという位置づけ。
- Fluent Bitはログだけでなくメトリクスやトレースの収集・処理・転送にも対応するよう発展しており、現在はFluentdより広く採用されている。

## 出典

- [Fluentd | Open Source Data Collector | Unified Logging Layer](https://www.fluentd.org/)
- [Fluentd Architecture](https://www.fluentd.org/architecture)
- [Fluentd | CNCF](https://www.cncf.io/projects/fluentd/)
- [Fluentd has Graduated! | Fluentd Blog](https://www.fluentd.org/blog/fluentd-cncf-graduation/)
- [Fluentd & Fluent Bit | Fluent Bit: Official Manual](https://docs.fluentbit.io/manual/2.0/about/fluentd-and-fluent-bit)
