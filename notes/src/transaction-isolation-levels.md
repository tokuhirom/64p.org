---
created: 2026-08-10 17:20
updated: 2026-08-10 17:20
---
# トランザクション分離レベル

複数のトランザクションが同時に実行されたとき、互いの変更がどこまで見えるかを定める設定。SQL標準では4段階定義されているが、[[postgresql|PostgreSQL]]は3段階（Read Committed / Repeatable Read / Serializable）を実装しており、いずれも内部的には[[mvcc|MVCC]]のスナップショット機構で実現されている。

#database #postgresql #transaction

## Read Committed（デフォルト）

トランザクション内の各SQL文が、その文を実行した時点でコミット済みのデータだけを見る。文が実行されるたびにスナップショットを取り直すため、同じトランザクション内でも文ごとに見えるデータが変わりうる。

## Repeatable Read

Read Committedと違い、トランザクション内で最初にSQL文を実行した時点のスナップショットを、トランザクションが終わるまで使い続ける。これによりダーティリード・非再現リードは防げるが、PostgreSQLのMVCC実装の性質上、限定的なファントムリードは起こりうる。

## Serializable

最も厳格な分離レベル。すべてのコミット済みトランザクションを、あたかも一つずつ順番に（serialに）実行したかのように振る舞わせる。PostgreSQLの実装はSerializable Snapshot Isolation（SSI）と呼ばれ、既知の異常動作すべてに耐性を持つことを目指している。

## MySQL（InnoDB）との違い

デフォルトの分離レベルが異なる。PostgreSQLはRead Committedがデフォルトなのに対し、MySQLのInnoDBはRepeatable Readがデフォルト。設計思想の違いとして、MySQLは初期状態からより強い分離レベルを提供する方向、PostgreSQLはより高い並行性を優先する方向とされる。

ファントムリードへの対処方法も異なる。PostgreSQLはMVCCのスナップショット機構だけでファントムリードに対処するため、Repeatable Readでも限定的にファントムリードが起こりうる。一方InnoDBのRepeatable Readは、MVCCに加えてgap lock・next-key lockという行間ロックを併用しており、多くのケースでファントムリードそのものを防いでいる。つまり同じ「Repeatable Read」という名前でも、内部の実現方法（ロックの有無）が異なる点に注意が必要。

## 出典

- [PostgreSQL: Documentation: 18: 13.2. Transaction Isolation](https://www.postgresql.org/docs/current/transaction-iso.html)
- [Transaction Isolation in Postgres, explained](https://www.thenile.dev/blog/transaction-isolation-postgres)
- [PostgreSQL Transaction Isolation Levels & MVCC | Mydbops](https://www.mydbops.com/blog/postgresql-transaction-isolation-levels-guide)
- [Isolation Repeatable Read in PostgreSQL versus MySQL](https://postgresql.verite.pro/blog/2020/02/14/isolation-repeatable-read-postgresql-mysql.html)
- [MySQL 8.4 Reference Manual :: 17.7.2.1 Transaction Isolation Levels](https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-isolation-levels.html)
