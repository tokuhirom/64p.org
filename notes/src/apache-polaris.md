---
created: 2026-08-12 13:33
updated: 2026-08-12 13:38
---
# Apache Polaris

#data-engineering #security

[[apache-iceberg|Apache Iceberg]] 用のオープンソースのカタログ実装。Iceberg の REST catalog 仕様のベンダー中立な実装で、Spark・Flink・Trino・Apache Doris・StarRocks・[[dremio|Dremio]]・Snowflake など複数のエンジンから同じ Iceberg テーブル群に相互運用的にアクセスできるようにする。Apache 2.0 ライセンス。

もともとは Snowflake が「Polaris Catalog」として2024年6月に発表し、Dremio との共同開発（co-creator）で2024年7月30日にオープンソース化、同年8月に Apache Incubator に寄贈された。約1年半のインキュベーションを経て、2026年2月15日に Apache のトップレベルプロジェクトに昇格した。Google・Microsoft・Confluent など多数の組織がコントリビュートしている。Snowflake のマネージド版は「Snowflake Open Catalog」という名前で提供されている。

## カタログとしての機能

テーブルのメタデータ位置を管理するだけでなく、ガバナンスレイヤーとしての機能を持つのが特徴。

- **[[rbac|RBAC]]**: ロールベースのアクセス制御。principal ごとにカタログ・namespace・テーブル単位の権限を管理する。
- **credential vending**: エンジンがテーブルを読み書きする際、Polaris が RBAC を検査したうえで、そのテーブルのストレージパスだけにスコープされた短命のクラウドストレージ認証情報を発行して渡す。エンジン側にオブジェクトストレージの広い権限を直接持たせずに済む。
- **カタログフェデレーション**: 外部カタログを配下に束ねられる。
- マルチテナントの namespace、Iceberg SQL view、generic table などにも対応。

## [[data-lakehouse|データレイクハウス]]の中での位置づけ

Iceberg スタックの「カタログ」レイヤーの標準実装になりつつあるプロジェクト。同じレイヤーの [[project-nessie|Project Nessie]] が Git ライクなバージョン管理に軸足を置くのに対し、Polaris は REST 仕様準拠の相互運用性とアクセス制御（ガバナンス）に軸足がある。

## 出典

- [Apache Polaris 公式サイト](https://polaris.apache.org/)
- [Apache Polaris Graduates to Top Level Project!](https://polaris.apache.org/blog/2026/02/19/apache-polaris-graduates-to-top-level-project/)
- [Polaris Catalog: An Open Source Catalog for Apache Iceberg | Snowflake](https://www.snowflake.com/en/blog/introducing-polaris-catalog/)
- [Apache Polaris: The Catalog Standard for Iceberg Lakehouses and Agentic Analytics | Dremio](https://www.dremio.com/blog/apache-polaris-the-catalog-standard-for-lakehouses-and-ai/)
