---
created: 2026-08-10 17:15
updated: 2026-08-10 17:21
---
# MVCC

Multi-Version Concurrency Control（多version同時実行制御）の略。[[postgresql|PostgreSQL]]が採用している並行処理制御の仕組みで、行に対する読み書きの際にロックで衝突を防ぐのではなく、行の複数バージョンを保持することで実現している。

#database #concurrency #postgresql

## 基本的な仕組み

行を更新（UPDATE）するとき、PostgreSQLはその場で行を書き換えるのではなく、新しいバージョンの行を作成し、古いバージョンは「不要（dead tuple）」として残す。削除（DELETE）も同様に、物理的にはすぐ消さず不要マークを付けるだけ。各行には以下の情報が持たせてある。

- **xmin**: その行バージョンを挿入したトランザクションのID
- **xmax**: その行バージョンを削除（または更新で無効化）したトランザクションのID

トランザクションは自分が開始した時点のスナップショットに基づいて、どの行バージョンが「見える」かを判定する。これにより読み取りが書き込みをブロックせず、書き込みも読み取りをブロックしない。

## [[vacuum|VACUUM]]との関係

UPDATE/DELETEで発生した不要行（dead tuple）は物理的にはすぐ削除されないため、そのまま放置するとテーブルが肥大化（bloat）する。この不要行を回収するのが`VACUUM`コマンドで、いわばガベージコレクションの役割を果たす。

## 他DBとの違い

Oracleや[[mysql|MySQL]]はundoログを使い、コミット前の変更を退避しておいて必要に応じて過去のバージョンを再構築する方式を取るのに対し、PostgreSQLはすべての行バージョンをテーブルのデータ構造そのものの中に保持する点が異なる。

## [[transaction-isolation-levels|トランザクション分離レベル]]との関係

`Read Committed`と`Repeatable Read`はどちらも同じスナップショット判定方式を使うが、`Read Committed`はSQL文を実行するたびにスナップショットを取り直すのに対し、`Repeatable Read`はトランザクション開始時に取った一つのスナップショットを最後まで使い続ける、という違いがある。

## 出典

- [Multiversion Concurrency Control (MVCC) in PostgreSQL - GeeksforGeeks](https://www.geeksforgeeks.org/postgresql/multiversion-concurrency-control-mvcc-in-postgresql/)
- [PostgreSQL Concurrency with MVCC | Heroku Dev Center](https://devcenter.heroku.com/articles/postgresql-concurrency)
- [PostgreSQLのMVCCとガベージコレクション（Vacuum）](https://masahikosawada.github.io/2021/12/22/MVCC-and-GC-in-PostgreSQL/)
- [PostgreSQL のトランザクション & MVCC & スナップショットの仕組み](https://www.nminoru.jp/~nminoru/postgresql/pg-transaction-mvcc-snapshot.html)
- [Cloud SQL for PostgreSQL - VACUUM について深く掘り下げる](https://cloud.google.com/blog/ja/products/databases/deep-dive-into-postgresql-vacuum-garbage-collector?hl=ja)
