---
created: 2026-08-12 09:55
updated: 2026-08-12 09:55
---
# Project Nessie

#data-engineering #version-control

データレイクに Git ライクなバージョン管理セマンティクスを与えるオープンソースのトランザクショナルカタログ。「Git がソースコードに対して果たす役割を、データレイクに対して果たす」ことを謳っており、[[apache-iceberg|Apache Iceberg]] のテーブルやSQLビューに対して commit / branch / tag / hash という Git 由来の概念で履歴を管理できる。Apache 2.0 ライセンス。

## できること

- **ブランチによる環境分離**: 同じデータレイク上で development / staging / production をブランチとして分離できる。本番データを汚すリスクなしに実験用ブランチで ETL を試し、検証後にマージする、という Git 的なワークフローが組める。
- **クロステーブルトランザクション**: 複数テーブルにまたがる変更を1つのコミットとして原子的に反映できる。単一テーブル内のACIDしか持たない Iceberg 単体に対する大きな付加価値。
- **タイムトラベルの一般化**: テーブル単位のスナップショットではなく、「データレイク全体のある時点の状態」をハッシュで参照できる。

## アーキテクチャ

軽量な Java 製 REST API サーバーで、楽観的ロックで原子性を保証する。ストレージバックエンドはプラガブルで、DynamoDB・Google Bigtable・Cassandra・PostgreSQL・MariaDB/MySQL・RocksDB（ローカル）などに対応する。

## [[data-lakehouse|データレイクハウス]]の中での位置づけ

Iceberg に必須の「カタログ」レイヤーの実装のひとつで、単なるメタデータ置き場に留まらずバージョン管理機能を足したもの。[[dremio|Dremio]] が開発を主導しており、同社のカタログサービスの基盤になっている。

## 出典

- [Project Nessie 公式サイト](https://projectnessie.org/)
- [projectnessie/nessie - GitHub](https://github.com/projectnessie/nessie)
- [Project Nessie: Transactional Catalog for Data Lakes with Git-like semantics | Dremio](https://www.dremio.com/blog/project-nessie-transactional-catalog-for-data-lakes-with-git-like-semantics/)
