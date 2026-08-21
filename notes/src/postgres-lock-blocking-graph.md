---
created: 2026-08-21 10:40
updated: 2026-08-21 10:55
---
# Lock Blocking Graph(PostgreSQLのロック競合を可視化するインタラクティブツール)

[postgreslocksexplained.com](https://postgreslocksexplained.com/)というサイトの1コーナー([https://postgreslocksexplained.com/locks/lock_tool](https://postgreslocksexplained.com/locks/lock_tool))。SQLの操作(コマンド)を1つ選ぶと、それがどの操作をブロックするかを円形のグラフでインタラクティブに表示してくれるツール。

#database #postgresql #lock

## サイト全体について

`postgreslocksexplained.com`は「Postgres Locks Explained」というタイトルの、[[postgresql|PostgreSQL]]のロックに特化した学習サイト。作者は[@TheOtherBrian1](https://github.com/TheOtherBrian1)で、Postgresの運用・可観測性を専門とするcustomer reliability engineer。「学んでいた当時に欲しかったドキュメント」として作られたとのこと。ソースは[GitHub上でOSS公開](https://github.com/TheOtherBrian1/Postgres_Lock_Explainer)されている(SvelteKit製)。

サイトは以下のセクションで構成される。

- **About** — サイトの目的
- **Concept** — ロックの基本概念をアニメーション付きで解説
- **Locks by Example** — 実際に動かして試せるデモ
- **Lock Blocking Graph** — 本ノートで扱うインタラクティブツール
- **Troubleshooting** — ロック絡みのトラブルとその対処
- **Monitoring** — 監視ツールのレビュー

## Lock Blocking Graphツールの使い方

左側のプルダウンからSQL操作を1つ選ぶと、右側の円形グラフ上でその操作がブロックする他の操作がハイライトされる。選択できる操作は45種類あり、`SELECT`のような単純な読み取りから、`UPDATE`(ユニーク制約の有無で挙動が分かれる)、`DELETE`、`INSERT`、`MERGE`、`VACUUM`、`CREATE INDEX CONCURRENTLY`、各種`ALTER TABLE`サブコマンド、`REINDEX`、`CLUSTER`、`TRUNCATE`、`SELECT... FOR UPDATE`系の行ロック構文まで網羅している。

ブロック関係は3種類に色分けして凡例が表示される。

- 🔴 **Table Lock** — テーブル全体に対するロック
- 🔵 **Ref Table Lock** — 外部キー等で参照している別テーブルへのロック
- 🟡 **Row Lock** — 行単位のロック

`SELECT`のようにどの操作もブロックしない場合は「Non-blocking operation」のバッジが表示される。デフォルト選択は`UPDATE (NOT UNIQUE)`。

## 背景にある概念(Conceptページより)

Concept節では、Postgresが並行アクセスの衝突を3パターンに分けて対処していると説明している。

- **Reader + Reader**: 衝突なし。特別な処理は不要。
- **Reader + Writer**: [[mvcc|MVCC]]で対処。行の複数バージョンを保持することで読み取りと書き込みを互いにブロックしないようにする。
- **Writer + Writer / テーブル構造の変更**: ロックで対処。

特に`DROP`/`ALTER`/`CREATE`のようなテーブルファイル自体を変更する操作は、実行中にテーブルの構造がどう変わるか他のトランザクションからは分からない(ファイルの中身が不確定な状態)ため、最も厳しいロックが必要になる、という説明がされている。テーブル全体をオフラインにしたり、書き込みを全面的にブロックしたりする挙動はこれに起因する。

## メモ

- [[mvcc|MVCC]]・[[vacuum|VACUUM]]・[[transaction-isolation-levels|トランザクション分離レベル]]・[[innodb-locking|InnoDBのロック]]など、ロックと隣接する概念は別ノートに切り出し済み。本ノートはあくまで上記ツール(および元サイト)の紹介に徹する。
- MySQL/InnoDB側で同種の「操作を選ぶと何をブロックするか可視化する」専用サイトは調査時点(2026-08-21)では見当たらなかった。内容的に一番近いのは[MySQL Reference Manual: 17.7.3 Locks Set by Different SQL Statements in InnoDB](https://dev.mysql.com/doc/refman/8.4/en/innodb-locks-set.html)で、「このSQL文はこのロックを取る」という対応表を持っているが、あくまで静的なドキュメントでインタラクティブなグラフ表示ではない。[InnoDB Data Locking – Part 3 "Deadlocks"](https://dev.mysql.com/blog-archive/innodb-data-locking-part-3-deadlocks/)というMySQL公式ブログにはトランザクションを三角形・ロックを円で表した動画による可視化があるが、一方向の動画でインタラクティブ性はない。[sql-academy.org/guide/locking](https://sql-academy.org/en/guide/locking)というMySQL/PostgreSQL両方を扱う学習ページもあるが、概念説明と確認問題1問のみで、操作選択式のシミュレータ機能はなかった。

## 出典

- [Postgres Locks Explained - Lock Blocking Graph](https://postgreslocksexplained.com/locks/lock_tool)
- [Postgres Locks Explained - About](https://postgreslocksexplained.com/)
- [Postgres Locks Explained - Concept](https://postgreslocksexplained.com/locks/concept)
- [TheOtherBrian1/Postgres_Lock_Explainer - GitHub](https://github.com/TheOtherBrian1/Postgres_Lock_Explainer)
