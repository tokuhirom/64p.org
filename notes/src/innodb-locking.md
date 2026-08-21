---
created: 2026-08-21 10:55
updated: 2026-08-21 10:55
---
# InnoDBのロック

[[mysql|MySQL]]のデフォルトストレージエンジンInnoDBが実装しているロック機構。[[postgresql|PostgreSQL]]の[[postgres-lock-blocking-graph|ロック]]がテーブルロック(8段階)＋行ロック(数種類)という比較的シンプルな構成なのに対し、InnoDBは行・インデックスレベルのロックにギャップロック等の概念が加わり、レイヤーが1段多い。

#database #mysql #innodb #lock

## 行・インデックスレベルのロック

InnoDBの行ロックは実体としては「インデックスレコード」に対して張られる（テーブルにインデックスがなくても、自動生成されるクラスタード索引に対して張られる）。

- **Record Lock**: 特定のインデックスレコード1件に対するロック。`SELECT ... FOR UPDATE`などで取得される、最も基本的な行ロック。
- **Gap Lock**: インデックスレコードとレコードの「間」（先頭レコードの前や末尾レコードの後も含む）に対するロック。目的は他トランザクションによるその隙間への挿入を防ぐことのみで、読み書き自体は妨げない。ギャップロック同士は競合しない（同じ隙間に複数トランザクションがギャップロックを持てる）。トランザクション分離レベルを`READ COMMITTED`にすると原則無効化されるが、外部キー制約チェックと重複キーチェックでは分離レベルによらず使われ続ける。
- **Next-Key Lock**: Record Lock + そのレコード直前のGap Lockを組み合わせたもの。デフォルトの`REPEATABLE READ`でのインデックス走査時に自動で設定され、[[transaction-isolation-levels|ファントムリード]]を防ぐ役割を持つ。
- **Insert Intention Lock**: `INSERT`実行前に取得される、Gap Lockの一種。同じ隙間への挿入であっても、挿入位置が異なれば互いに待ち合わない（例: 隙間(4,7)にトランザクションAが5を、Bが6を挿入する場合、AとBは競合せず並行実行できる）。

## テーブルレベルのロック

- **Intention Lock (IS/IX)**: 「これから行にS lock/X lockを取りにいく」ことを示すテーブルレベルのロック。行にS lockを取る前にテーブルのIS lock以上、行にX lockを取る前にテーブルのIX lockが必須、というプロトコル(multiple granularity locking)によって、行ロックとテーブルロック(`LOCK TABLES`等)の整合性を取っている。IS/IX同士は競合しない。
- **AUTO-INC Lock**: `AUTO_INCREMENT`列を持つテーブルへの`INSERT`時に取得されるテーブルロック。連番の連続性を保証するためのもので、`innodb_autoinc_lock_mode`で「連番の予測可能性」と「INSERTの並行性」のトレードオフを調整できる。

## 空間インデックス用: Predicate Lock

`SPATIAL`インデックスに対するロック。空間データには1次元的な順序がなくNext-Key Lockの概念が使えないため、代わりにMBR(Minimum Bounding Rectangle、外接矩形)値の範囲に対して述語ロックを設定する。

## メタデータロック(MDL)

上記の行・テーブルロックとは別レイヤーで、MySQLサーバ層が持つロック機構。テーブル・スキーマ・ストアドプログラム・テーブルスペースなど「オブジェクトの定義そのもの」を対象とする。`ALTER TABLE`や`RENAME TABLE`のようなDDLは、実行中そのテーブルにアクセスしている他のDML(`SELECT`/`INSERT`等)と衝突し、待ち合いが発生する。トランザクション中に触れたテーブルのMDLは、コミットするまで保持され続ける点に注意が必要（トランザクションを開きっぱなしにすると、無関係なDDLがブロックされ続ける）。

## 代表的なSQL文が取るロック

| SQL文 | 取得するロック |
|---|---|
| `SELECT ... FROM`（通常） | ロックなし（一貫性読み取り。`SERIALIZABLE`分離レベルでは共有Next-Key Lock） |
| `SELECT ... FOR UPDATE` | 一意インデックス＋一意検索ならRecord Lockのみ、それ以外はNext-Key Lock |
| `SELECT ... FOR SHARE` | `FOR UPDATE`と同じ戦略で共有ロック版 |
| `UPDATE`/`DELETE ... WHERE ...` | 排他Next-Key Lock（一意インデックス＋一意検索ならRecord Lockのみ） |
| `INSERT` | 挿入位置に排他Record Lock（Gap Lockなし）。事前にInsert Intention Lockを取得 |
| `INSERT ... ON DUPLICATE KEY UPDATE` | 重複キー衝突時は排他ロック |

## [[postgres-lock-blocking-graph|PostgreSQLのロック]]との違い

[[transaction-isolation-levels|トランザクション分離レベル]]のデフォルトが異なる（PostgreSQLはRead Committed、InnoDBはRepeatable Read）ことに加え、ファントムリードへの対処方法も異なる。PostgreSQLは[[mvcc|MVCC]]のスナップショット機構だけで対処するため、Repeatable Readでも限定的にファントムリードが起こりうるのに対し、InnoDBはMVCCに加えてGap Lock・Next-Key Lockという行間ロックを併用することで、多くのケースでファントムリードそのものを防いでいる。同じ「Repeatable Read」でも、内部の実現方法（追加のロックの有無）が異なる。

## 出典

- [MySQL 8.4 Reference Manual: 17.7.1 InnoDB Locking](https://dev.mysql.com/doc/refman/8.4/en/innodb-locking.html)
- [MySQL 8.4 Reference Manual: 17.7.3 Locks Set by Different SQL Statements in InnoDB](https://dev.mysql.com/doc/refman/8.4/en/innodb-locks-set.html)
- [MySQL 8.4 Reference Manual: 10.5.4 Metadata Locking](https://dev.mysql.com/doc/refman/8.4/en/metadata-locking.html)
