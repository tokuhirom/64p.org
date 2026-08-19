---
created: 2026-08-20 08:54
updated: 2026-08-20 08:54
---
# PostgreSQL for Everything

「[[postgresql|PostgreSQL]]一本で、Redis・Kafka・MongoDB・Elasticsearchなど専門特化したミドルウェアの多くを代替し、技術スタックを単純化できる」という主張・ムーブメント。特定の1本の記事が起点というより、ここ数年で複数の書き手が独立に似た主張を展開している一種のミームに近い。

#postgresql #database

## 主な発信源

- **[postgresforeverything.com](https://postgresforeverything.com/)** — Anton氏が個人運営するカタログサイト。分散DB化、サーバーレス運用、リアルタイム同期、REST/GraphQL自動生成、全文検索、地理空間クエリ、時系列、キュー、キャッシュ、ML/AI、NoSQL/グラフ対応など30以上のユースケースを一覧化し、各項目にOSSツールやサービスへのリンクを付けている。
- **[Just Use Postgres for Everything](https://www.amazingcto.com/postgres-for-everything/)**（Amazing CTO、Stephan Schmidt氏、2025年12月更新）— スタートアップ・成長期企業向けに技術スタック単純化を説く記事。「less moving parts means fewer developers」を核とする。
- **[PostgreSQL for Everything](https://www.raphaelbauer.com/posts/postgresql-everything/)**（Raphael Bauer氏）— 2003年の研究プロジェクト「ColumbaDB」以来のPostgreSQL活用経験とCTOとしての実践を背景に、Contentful/Instacart/The Guardianなどの採用事例を引きつつ同様の主張を展開。

## 代表的な代替パターン

複数の発信源でほぼ共通して挙げられている組み合わせ。

| 従来のツール | PostgreSQL側の機能・拡張 |
|---|---|
| [[redis\|Redis]]（キャッシュ） | UNLOGGEDテーブル |
| Kafka/RabbitMQ（メッセージキュー） | `SELECT FOR UPDATE` / `SKIP LOCKED` |
| MongoDB（JSONストア） | JSONB型 + GINインデックス |
| [[elasticsearch\|Elasticsearch]]/Solr（全文検索） | 内蔵text search |
| 専用ベクトルDB | [[pgvector]] |
| [[clickhouse\|ClickHouse]]（時系列・分析） | TimescaleDB拡張 |
| グラフDB（階層データ） | LTREE型 |

## 考えたこと

各記事が主張する「代替パターン」自体はほぼ同一で、著者ごとの違いは自分の実務経験談を乗せているかどうかの差にとどまる。PostgreSQLが元々多機能なことに加え、[[pgvector]]や[[pglite|PGlite]]のような周辺拡張・派生プロジェクトが次々登場していること自体が、このムーブメントを後押ししている面がありそう。ただしどの記事も「小〜中規模の技術スタック単純化」を主眼にしており、大規模トラフィックや専用ミドルウェアが持つ運用ツール群(監視・スケーリング機構等)まで含めた比較にはなっていない点は留意したい。
