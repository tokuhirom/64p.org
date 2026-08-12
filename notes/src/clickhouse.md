---
created: 2026-08-12 12:53
updated: 2026-08-12 12:53
---
# ClickHouse

#database #olap #data-engineering

**OLAP**（Online Analytical Processing、大量データの集計・分析に最適化されたワークロード）向けに設計されたオープンソースの列指向（columnar）データベース管理システム。対義語はOLTP（Online Transaction Processing、少量レコードの読み書きを高頻度にこなすトランザクション処理）。実装言語はC++（約150万行）で、近年は一部の周辺機能（BLAKE3ハッシュ関数、PRQLというクエリ言語ライブラリの統合など)でRustも部分的に採用され始めているが、コア部分を全面書き換えする方針ではない。

## 生まれた経緯

2009年、ロシアのYandex社内でAlexey Milovidov氏が「非集計の生データからリアルタイムでレポートを生成できるか」という仮説検証として開発を開始した。Yandex.Metrica（ロシア第2位のWebアクセス解析サービス）のバックエンドとして2011年に本番投入され、当時374台構成のクラスタで20.3兆行・約2PBの圧縮データを保持し、1日1000億件超のレコード挿入をコアチーム15名で処理していた。2016年6月、MoscowのHighload++カンファレンスでOSS公開。2021年にMilovidov氏がClickHouse社を設立した（CEO: Aaron Katz、Index Ventures/Benchmark主導のシリーズAで$50M調達）。

## アーキテクチャ

- **列指向ストレージ**: 行ではなく列単位でデータを保持する。50カラムのテーブルから3カラムだけ使うクエリなら、その3カラムのファイルしか読まない。
- **ベクトル化実行**: 1行ずつでなく、行の集合（バッチ）単位で演算することでCPUキャッシュ効率を最大化する。
- **MergeTreeエンジン**: 中核のストレージエンジンファミリー。INSERTのたびに「パート」というディレクトリ単位でデータが書き込まれる（命名規則: `{partition_id}_{min_block}_{max_block}_{merge_level}`）。パート内部にはカラムごとの圧縮データファイル・インデックスファイル・チェックサムが入り、すべて`ORDER BY`キーでソート済み。パートは書き込み後イミュータブルで、バックグラウンドで小さいパート同士がマージされてパート数を減らし検索性能を保つ（エンジン名の由来）。

## データ配置

デフォルトはローカルディスク（`/var/lib/clickhouse`、多くの場合1台の高速NVMe）にパートとして直接格納する形で、オブジェクトストレージへの依存はない。ただし「ディスク」を抽象化する層があり、S3互換オブジェクトストレージをディスクとして設定することも可能。よくあるのは階層ストレージ（tiered storage）構成で、直近のよく参照されるデータは高速なローカルディスクに、古いデータは閾値を超えたらS3などの安価なストレージに自動で移す「hot-cold」運用。

マネージドサービスのClickHouse Cloudでは、SharedMergeTreeというエンジンによってストレージとコンピュートの分離が設定不要でデフォルトで組み込まれており、複数のコンピュートノードが同じオブジェクトストレージ上のデータを共有できる。

## 得意・不得意

リアルタイムダッシュボード、ログ分析・SIEM、BIの高速化、AdTech、時系列分析、プロダクト分析、オブザーバビリティ基盤などの分析ワークロードが主戦場。一方でOLTPやレコード単位の頻繁な更新・削除には不向き。実務では「[[postgresql|PostgreSQL]]/[[mysql|MySQL]]でOLTPを担い、分析・リアルタイム集計はClickHouseに任せる」という併用構成が一般的。

## オブザーバビリティ用途と OTLP

**OTLP**（OpenTelemetry Protocol、OpenTelemetryが定義するprotobufベースのテレメトリ送信プロトコル）は、ログ・メトリクス・トレースの収集方式を標準化するが、そのデータの永続化先（バックエンド）までは規定しない。ここでClickHouseが受け皿として使われることが多い。OpenTelemetry CollectorがgRPC/HTTP経由でOTLPとしてスパンやログを受け取り、ClickHouse Exporterでそのままテーブルに書き込む構成が一般的。オブザーバビリティデータは「高頻度の追記のみの書き込み」「広い時間範囲のスキャン」「特定カラムに対する集計」という特性を持ち、これが列指向DBの得意分野と噛み合うため、行指向DBと比べて5〜10倍の圧縮率改善が報告されている。

## 出典

- [ClickHouse architecture 101: A comprehensive overview](https://www.flexera.com/blog/finops/clickhouse-architecture/)
- [How to choose a database for real-time analytics in 2026 | ClickHouse](https://clickhouse.com/resources/engineering/how-to-choose-a-database-for-real-time-analytics-in-2026)
- [Use Cases | ClickHouse](https://clickhouse.com/use-cases)
- [What is a columnar database? | ClickHouse](https://clickhouse.com/resources/engineering/what-is-columnar-database)
- [One Engineer at Yandex: The Origin Story of ClickHouse](https://www.stacksync.com/blog/one-engineer-at-yandex-the-origin-story-of-clickhouse)
- [Report: ClickHouse's Business Breakdown & Founding Story](https://research.contrary.com/company/clickhouse)
- [What Is a MergeTree Engine and How It Works](https://oneuptime.com/blog/post/2026-03-31-clickhouse-what-is-mergetree-engine/view)
- [How ClickHouse Stores Data on Disk - Part Files Explained](https://oneuptime.com/blog/post/2026-03-31-clickhouse-part-files-explained/view)
- [ClickHouse Storage Architecture and Optimization | Severalnines](https://severalnines.com/blog/clickhouse-storage-architecture-and-optimization/)
- [Tiered Storages in ClickHouse](https://docs.gitlab.com/development/database/clickhouse/tiered_storage)
- [Separation of storage and compute | ClickHouse Docs](https://clickhouse.com/docs/guides/separation-storage-compute)
- [Moving From C++ to Rust? ClickHouse Has Some Advice - The New Stack](https://thenewstack.io/moving-from-c-to-rust-clickhouse-has-some-advice/)
- [A Year of Rust in ClickHouse | ClickHouse](https://clickhouse.com/blog/rust)
- [Building an Observability Solution with ClickHouse - Part 2 - Traces | ClickHouse](https://clickhouse.com/blog/storing-traces-and-spans-open-telemetry-in-clickhouse)
- [Integrating OpenTelemetry for data collection - ClickHouse Documentation](https://clickhouse.com/docs/observability/integrating-opentelemetry)
