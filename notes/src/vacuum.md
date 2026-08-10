---
created: 2026-08-10 17:20
updated: 2026-08-10 17:20
---
# VACUUM

[[postgresql|PostgreSQL]]で、[[mvcc|MVCC]]によりUPDATE/DELETEで発生した不要行（dead tuple）を回収するコマンド。物理削除されずに残った不要行を掃除する、ガベージコレクションに相当する役割を持つ。

#database #postgresql #vacuum

## 役割

VACUUMが担う主な役割は以下の3つ。

- **不要行の回収**: dead tupleが占有していた領域を再利用可能にする。放置するとテーブルが肥大化（bloat）する。
- **FREEZE（凍結）**: 古いタプルのXID（トランザクションID）を`FrozenTransactionId`という特別な値に書き換える。凍結されたタプルはどのトランザクションから見ても「確定した非常に古いデータ」として扱われる。
- **統計情報の更新**: `ANALYZE`と組み合わせてクエリプランナ用の統計情報を最新化する。

## AUTOVACUUM

VACUUMはユーザーが意識しなくても、バックグラウンドで動く`autovacuum`によって更新頻度に応じて自動実行される。

## トランザクションID周回問題

PostgreSQLのXIDは有限のため、FREEZEせずに放置するとXIDが一周（wraparound）してデータが不可視になるおそれがある。これを防ぐため、`autovacuum_freeze_max_age`パラメータでテーブルの`relfrozenxid`の最大経過トランザクション数を制限しており、これを超えると強制的にVACUUMが走る。この「周回防止自動VACUUM」は、通常のautovacuum機能が明示的に無効化されていても動作する。

## 出典

- [PostgreSQL VACUUMの3つの重要機能とは？｜定時帰りのDBA](https://note.com/teijikaeri_dba/n/n79bdc4765b68)
- [周回防止自動VACUUMについて改めて調べてみる #PostgreSQL - Qiita](https://qiita.com/U_ikki/items/111694ba5296b0f553bd)
- [運用トラブルを防止するVACUUMのチューニング ～XID/MXID周回問題と性能影響を防ぐ～ | 富士通](https://www.fujitsu.com/jp/products/software/resources/feature-stories/postgres/article-index/vacuum-tuning/)
- [PostgreSQL ドキュメンテーション: autovacuum_freeze_max_age パラメータ](https://postgresqlco.nf/doc/ja/param/autovacuum_freeze_max_age/)
