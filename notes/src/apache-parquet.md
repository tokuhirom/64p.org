---
created: 2026-08-09 21:14
updated: 2026-08-12 09:55
---
# Apache Parquet

ディスク永続化用の、オープンソースの列指向(カラムナー)ファイルフォーマット。[[apache-arrow|Apache Arrow]]と対比されることが多く、「Arrowはメモリ上、Parquetはディスク上」という関係にある。

## 特徴

- **列指向ストレージ**: CSVやJSONのような行指向フォーマットと異なり、同じ列の値をディスク上に連続して配置する。
- **高い圧縮率**: 同じ型のデータをまとめて持つため、列ごとに異なるエンコード/圧縮アルゴリズムを適用でき、CSV/JSONより高い圧縮率を実現する。
- **カラムプルーニング**: クエリに必要な列だけを読み込むことでI/Oを削減する。
- **述語プッシュダウン(predicate pushdown)**: データ読み込み前にフィルタ条件を適用し、不要な読み込みを避ける。

## 用途・エコシステム

Apache Hadoop, Apache Spark, Apache Drill, Presto などの分散処理基盤で広く使われている、分析ワークロード向けのフォーマット。

## [[data-lakehouse|データレイクハウス]]の中での位置づけ

データレイクハウスのスタックでは最下層の「データファイル本体」のフォーマット。この上に [[apache-iceberg|Apache Iceberg]] のようなテーブルフォーマットが載り、SQLテーブルとしての抽象を与える。

## 出典

- [Parquet公式サイト](https://parquet.apache.org/)
- [What is Parquet? | Databricks](https://www.databricks.com/blog/what-is-parquet)
- [What is Apache Parquet? | IBM](https://www.ibm.com/think/topics/parquet)
