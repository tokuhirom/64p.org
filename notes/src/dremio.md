---
created: 2026-08-12 09:55
updated: 2026-08-12 13:33
---
# Dremio

#data-engineering #database

データレイクハウスプラットフォームを提供する米国企業、およびその製品名。2015年に Tomer Shiran と Jacques Nadeau らが創業した。Nadeau は [[apache-arrow|Apache Arrow]] の共同開発者であり、Dremio 社は Apache Arrow と [[apache-polaris|Apache Polaris]] の co-creator を名乗る。[[project-nessie|Project Nessie]] の開発も主導している。

## 製品の特徴

- **Arrowベースのクエリエンジン**: Apache Arrow のインメモリカラムナー表現をネイティブに使う高速SQLエンジンが中核。データウェアハウスにデータをコピーせず、データレイク（[[apache-iceberg|Iceberg]] テーブル）や各種データソースを直接クエリする。
- **データ連合（federation）**: クエリを解析して各データソースにフィルタや集計をプッシュダウンし、最小限のデータだけ取得してメモリ上で結合する。「Query, Don't Move」（データを動かさずクエリする）が設計原則。
- **Reflections**: クエリパターンに基づく自動のクエリアクセラレーション（実体化ビューの自動管理に相当）。
- **セマンティックレイヤー**: 物理データの上に論理的なビュー階層を定義し、BIツールやAIエージェントから統一的にアクセスさせる。
- カタログは Apache Polaris ベースで、フルマネージドのクラウドサービスとセルフマネージド版の両方がある。

## [[data-lakehouse|データレイクハウス]]の中での位置づけ

Parquet/Arrow/Iceberg/Nessie/Polaris というオープンなビルディングブロックを束ねて、Snowflake のようなデータウェアハウス体験をデータレイク上で提供する統合プラットフォーム。オープンソース戦略（Arrow・Nessie・Polaris への貢献）を軸にしているのが特徴。

## 出典

- [What is Dremio? The Unified Lakehouse and AI Platform | Dremio](https://www.dremio.com/blog/what-is-dremio/)
- [SQL Query Engine | Dremio](https://www.dremio.com/platform/sql-query-engine/)
- [About Us | Dremio](https://www.dremio.com/about/)
