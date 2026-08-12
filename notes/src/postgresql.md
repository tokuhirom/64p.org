---
created: 2026-08-10 17:10
updated: 2026-08-13 00:41
---
# PostgreSQL

オープンソースのRDBMS（リレーショナルデータベース管理システム）。ルーツは1986年にカリフォルニア大学バークレー校で始まった研究プロジェクト（POSTGRES）で、1996年に現在の名称「PostgreSQL」として公開された。ライセンスはBSD系の緩いライセンス（PostgreSQL License）で、商用利用も無償・無制限。

#database #rdbms #sql

## 特徴

- **高度なSQL標準準拠**: ウィンドウ関数、CTE（共通テーブル式）、再帰クエリなどをサポート。
- **豊富なデータ型**: JSONB型、配列型、RANGE型など。
- **[[mvcc|MVCC]]（Multi-Version Concurrency Control）**: 複数トランザクションが同時に読み書きしてもロック競合が起きにくい仕組みで、高並列環境に強い。
- **拡張性**: プラガブルなインデックス方式や独自データ型・関数を拡張機能として追加できる。地理情報を扱うPostGIS、ベクトル検索を可能にする[[pgvector]]などが代表例。

## クラウド上での利用

商用DBに引けを取らない機能を無償で使える点から、企業の基幹システム・金融システム・政府機関でも採用されている。近年はPostgreSQL互換のマネージドクラウドサービスも増えており、[[neon|Neon]]のようにサーバーレス・従量課金で提供するものもある。また[[pglite|PGlite]]のようにWASMにコンパイルしてブラウザ内で動かすアプローチも登場している。

## 最新動向

2025年9月25日にメジャーバージョン**PostgreSQL 18**がリリースされた。新しいI/Oサブシステムによりストレージ読み込み性能が最大3倍向上したほか、仮想生成列、`uuidv7()`関数、OAuth 2.0認証サポートなどが追加された。2026年2月時点の最新パッチは18.2（他に17.8/16.12/15.16/14.21も並行メンテナンス中）。

## 出典

- [PostgreSQLが最強のデータベースである理由](https://data-analyst.weblabo.jp/postgresql-introduction/)
- [PostgreSQL とは？| Microsoft Azure](https://azure.microsoft.com/ja-jp/resources/cloud-computing-dictionary/what-is-postgresql)
- [PostgreSQL 18 がリリースされました | 日本PostgreSQLユーザ会](https://www.postgresql.jp/node/485)
- [「PostgreSQL 18.2/17.8/16.12/15.16/14.21」リリース](https://thinkit.co.jp/news/38971)
- [【2026年2月版】PostgreSQLのバージョン情報とサポート期限](https://tane-creative.co.jp/column/6367/)
