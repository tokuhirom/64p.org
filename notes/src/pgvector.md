---
created: 2026-08-10 17:10
updated: 2026-08-10 17:13
---
# pgvector

[[postgresql|PostgreSQL]]にベクトルデータ型（`vector`）とその類似検索機能を追加する拡張機能。テキストや画像の埋め込み（embedding）をリレーショナルデータベースに直接保存し、類似度検索ができる。生成AIによるRAG（検索拡張生成）や画像検索、レコメンドエンジンなどの用途で使われる。

#postgresql #database #vector-search #ai

## 距離関数

コサイン類似度、L2距離、内積など複数の距離指標をサポートする。なお単位ベクトル（正規化済み、長さ=1）同士であれば、内積とコサイン類似度は数学的に等価になる。

## インデックス方式

- **IVFFlat**: データをクラスタリングしてから検索範囲を絞る方式。学習コストは抑えられるが、性能を保つために定期的な再構築が必要。
- **[[hnsw|HNSW]]**: グラフ構造を使った近似最近傍探索方式。高精度・高速だがインデックス構築の負荷が大きい。学習ステップがなく、データが空の状態からインデックスを作成してデータ追加とともに段階的に構築できる点がIVFFlatと異なる。

## メリット

AWS/Azure/GCPなど主要クラウドのマネージドPostgreSQLサービスでも対応しており、既存のBIツールやSQLベースの分析基盤とも相性がよい。PostgreSQLの知見があれば学習コストを抑えて導入できる。

## 出典

- [PostgreSQL×pgvector：ベクトル検索とインデックスの基礎](https://note.com/takuma_doi/n/n4bc08c81a858)
- [pgvectorの基本概要とPostgreSQLにおけるベクトル検索の重要性 | 株式会社一創](https://www.issoh.co.jp/tech/details/6231/)
- [pgvectorとは何か、そして3つの距離指標の違いを整理する #PostgreSQL - Qiita](https://qiita.com/youman_318/items/af6569a11460a22110ae)
- [Cloud SQL for PostgreSQL: pgvector インデックスによる類似検索の高速化 | Google Cloud 公式ブログ](https://cloud.google.com/blog/ja/products/databases/faster-similarity-search-performance-with-pgvector-indexes?hl=ja)
- [pgvector とは | Google Cloud](https://cloud.google.com/discover/what-is-pgvector?hl=ja)
