---
created: 2026-08-12 09:55
updated: 2026-08-12 13:33
---
# データレイクハウス

#moc #data-engineering

オブジェクトストレージ上のオープンなファイル群（データレイク）に、データウェアハウス並みのテーブル管理機能（ACID・スキーマ管理・ガバナンス）を載せるアーキテクチャ。「lake + warehouse」の造語。オープンなフォーマットと仕様の積み重ねでベンダーロックインを避けられるのが、プロプライエタリなDWHに対する売り。この領域のノートの見取り図。

## スタックの構成要素

- **ファイルフォーマット**
    - [[apache-parquet|Apache Parquet]] — ディスク上の列指向ファイルフォーマット。データ本体はこれで置かれることが多い。
    - [[apache-arrow|Apache Arrow]] — メモリ上の列指向フォーマット。エンジン内部の処理・エンジン間のデータ交換用。
- **テーブルフォーマット**
    - [[apache-iceberg|Apache Iceberg]] — ファイルの集まりに「SQLテーブル」の抽象を与えるレイヤー。ACID・スキーマ進化・タイムトラベル。同種に Delta Lake / Apache Hudi。
- **カタログ**
    - [[project-nessie|Project Nessie]] — Iceberg テーブルのカタログに Git ライクなブランチ/コミットの意味論を足したもの。
    - [[apache-polaris|Apache Polaris]] — Iceberg REST catalog 仕様の標準実装。RBAC や credential vending などガバナンス機能に軸足。
- **クエリエンジン / プラットフォーム**
    - [[dremio|Dremio]] — 上記のオープン部品（Arrow/Iceberg/Nessie/Polaris)を束ねた商用レイクハウスプラットフォーム。ほかに Trino, Spark, Snowflake, Databricks などがこのレイヤーのプレイヤー。
