---
created: 2026-08-12 09:55
updated: 2026-08-12 13:33
---
# Apache Iceberg

#data-engineering #database

巨大な分析用テーブルのためのオープンテーブルフォーマット。Parquet / ORC / Avro などのオープンなファイル形式でオブジェクトストレージ上に置かれたデータファイル群の上に、「SQLのテーブルのように扱える」抽象化レイヤーを提供する仕様＋ライブラリ。Netflix で Ryan Blue と Dan Weeks が2017年に開発を始め、2018年11月に Apache Software Foundation に寄贈、2020年5月にトップレベルプロジェクトに昇格した。もともとは Apache Hive のテーブル形式が抱えていた正確性の保証不足・原子的トランザクションの欠如といった課題への対処として作られた。

## 主な機能

- **ACIDトランザクション**: スナップショットベースの分離により、複数エンジンからの同時読み書きでも一貫性を保証する。
- **スキーマ進化**: カラムの追加・リネーム・削除をテーブル全体の書き換えなしに行える。
- **隠しパーティショニングとパーティション進化**: パーティション列をクエリ側が意識する必要がなく、パーティション方式の変更もテーブル書き換えなしでできる。
- **タイムトラベル**: 変更のたびに新しいスナップショットが記録され、過去の任意の時点のテーブルをクエリできる。
- **高速なスキャンプランニング**: ファイルレベルのメタデータとカラム統計により、不要なデータファイルの読み込みを事前に除外できる。

## エコシステム

Spark, Trino, Flink, Hive, Impala など多数のクエリエンジンが対応しており、特定ベンダーにロックインされないのが強み。テーブルの現在のメタデータ位置を管理する「カタログ」レイヤーが別途必要で、REST catalog 仕様のほか [[project-nessie|Project Nessie]] や [[apache-polaris|Apache Polaris]] などの実装がある。データファイル自体は [[apache-parquet|Parquet]] が使われることが多い。

## [[data-lakehouse|データレイクハウス]]の中での位置づけ

ファイルの集まりでしかなかったデータレイクに「テーブル」の抽象を与える中核レイヤー。同種のテーブルフォーマットに Delta Lake（Databricks発）や Apache Hudi があるが、エンジン中立性の高さから Iceberg が業界標準になりつつある。

## 出典

- [Apache Iceberg 公式ドキュメント](https://iceberg.apache.org/docs/latest/)
- [Apache Iceberg - Wikipedia](https://en.wikipedia.org/wiki/Apache_Iceberg)
- [Apache Iceberg: The Basics | Qlik Blog](https://www.qlik.com/blog/apache-iceberg-the-basics)
