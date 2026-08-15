---
created: 2026-08-15 19:06
updated: 2026-08-15 19:06
---
# MySQLのVECTOR型

[[mysql|MySQL]] 9.0（2024年7月リリース）で新規追加されたデータ型。`VECTOR(N)`として宣言し、単精度浮動小数点数(4バイト)の配列を格納する。デフォルト長は2048、最大16,383次元。

#mysql #database #vector-search #ann

## Community/Commercial版でできること・できないこと

VECTOR型自体はCommunity版・Commercial版でも使えるが、できることは値の格納とシリアライズに限られる。

- 使える関数: `STRING_TO_VECTOR()`(文字列→バイナリ変換)、`VECTOR_TO_STRING()`(逆変換)、`VECTOR_DIM()`(次元数取得)、および`BIT_LENGTH()`/`CHAR_LENGTH()`/`HEX()`/`LENGTH()`/`TO_BASE64()`など汎用の文字列関数。
- 比較は同じVECTOR型同士の等価比較のみ可能（大小比較は不可）。
- 主キー・外部キー・一意キー・パーティションキーには使えない。
- 集約関数(COUNT/DISTINCT除く)・ウィンドウ関数・数値/時間/JSON/ビット/全文検索関数の引数にはできない。

決定的なのは、コサイン類似度などを計算する`DISTANCE()`関数（COSINE/DOT/EUCLIDEANの3指標に対応）が**[[mysql-heatwave|MySQL HeatWave]]（OCI上のHeatWave、またはMySQL AI）専用**であり、Community版・Commercial版には含まれないこと。近似最近傍探索（ANN）用の[[hnsw|HNSW]]やIVFといったベクトルインデックスもCommunity版には存在しない。つまりCommunity版では「VECTOR型に値を保存する」ことはできても、SQLだけで類似検索を行うことはできない。

## HeatWave側のフル機能

[[mysql-heatwave|MySQL HeatWave]]のGenAI/Vector Store機能では、頻繁にクエリされるVECTOR列に対して自動的に[[hnsw|HNSW]]ベースのベクトルインデックスが構築され、大規模データ向けのANN検索と小〜中規模向けのインメモリ全探索の両方が提供される。DB内蔵LLMによる埋め込み生成、ドキュメントのパース・チャンク化・埋め込み格納の自動化、RAGパイプラインまで統合されているが、これらはOracle Cloud上の商用サービスとしてのみ利用できる。

## サードパーティ・他DBとの比較

- サードパーティの`MyVector`プラグインが、MySQL 8.4.x/9.7.x向けにHNSWベースのANN検索機能を後付けで追加している。
- 競合の[[mariadb|MariaDB]]は11.7でネイティブの`VECTOR INDEX`([[hnsw|HNSW]])をOSS版に実装済みで、この点でMySQL Community版より先行している。
- [[postgresql|PostgreSQL]]も[[pgvector]]拡張によりOSS版のままANN検索が可能。

## 出典

- [MySQL 9.7 Reference Manual: 13.3.5 The VECTOR Type](https://dev.mysql.com/doc/refman/9.7/en/vector.html)
- [MySQL 9.7 Reference Manual: 14.21 Vector Functions](https://dev.mysql.com/doc/refman/9.7/en/vector-functions.html)
- [Accelerate Similarity Search with Automatic HeatWave Vector Index](https://blogs.oracle.com/mysql/accelerate-similarity-search-with-automatic-heatwave-vector-index)
- [MySQL HeatWave User Guide: 7.9 Perform Vector Search with RAG](https://dev.mysql.com/doc/heatwave/en/mys-hw-genai-vector-search.html)
- [The 'Vector Lite' Trap: MySQL 9.x AI Parity Illusion](https://tech-champion.com/database/mysql/the-vector-lite-trap-mysql-9-x-ai-parity-illusion/)
- [Introducing MyVector Plugin — Vector Storage & Similarity Search in MySQL](https://medium.com/@shiyer22/introducing-myvector-plugin-vector-storage-similarity-search-in-mysql-a32a6f84755e)
- [Paths of MySQL, vector search edition](https://theconsensus.dev/p/2026/02/08/paths-of-mysql-vector-search-edition.html)
