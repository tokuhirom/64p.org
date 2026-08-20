---
created: 2026-08-20 09:06
updated: 2026-08-20 09:10
---
# DuckDB

インプロセス(組み込み型)実行のOLAP(分析用)データベース。「分析用途のSQLite」と形容されることが多く、サーバープロセスを別途立てずアプリケーションのプロセス内で直接動作する。オランダの研究機関CWI(Centrum Wiskunde & Informatica)のHannes MühleisenとMark Raasveldtが2019年に発表し、2021年に彼らを中心とするスピンオフ企業DuckDB Labsが設立された。

## 特徴

- インプロセス実行: 外部サーバーへの接続が不要で、依存関係も少ない。
- ベクトル化実行エンジン: データをチャンク単位でベクトル化して処理し、分析クエリを高速化する。
- 列指向ストレージ: 集計処理など「多くの行・少ない列」を扱うワークロードに向いている。[[apache-arrow|Apache Arrow]]など列指向フォーマットとの相性が良い。
- [[apache-parquet|Parquet]]・CSVファイルを事前のロードなしに直接クエリできる。

## v2.0 "Cyanoptera"(2026年秋リリース予定)

10,000以上のコミットを含む大規模アップデート。公式ブログでは「サーバーとしてのDuckDBの年を開始する」リリースと位置づけられている。主な変更点は以下の通り。

- **サーバー機能**: ネイティブプロトコル「Quack」でDuckDBプロセス同士が直接通信可能に。`CONNECT`ステートメントで他のデータベース(PostgreSQL、MySQLなど)に接続し、フィルタや集約を接続先側で処理する"リモートプッシュダウン"最適化にも対応。
- **VARIANT型の拡張**: JSONのような柔軟な半構造化データ型でありながら、"シュレッディング"処理により高速なクエリ実行を実現。実行時に自動でスキーマを検出し圧縮効率を向上させる。
- **トリガー機能**: `BEFORE`/`AFTER`トリガー、`REFERENCING OLD/NEW TABLE`構文に対応し、監査テーブルなどに使える。
- **SQL方言の拡張**: `NEAREST`結合(ベクトル検索)、CTE内でのDML操作、ネストされたスキーマ、変数構文`$x`、JSON変更関数などを追加。
- **パフォーマンス改善**: 非同期I/O導入によりS3などのオブジェクトストレージへのクエリのスケーラビリティ・並列性が大幅向上。再帰CTEが約40倍高速化。タイムゾーン・カレンダー処理はICUライブラリを廃止し、IANAデータベースから構築した独自実装(約45KB)に置き換え、2.2〜2.6倍高速化。
- **新ストレージフォーマット**: メタデータの遅延読込、デフォルト有効の`DICT_FSST`圧縮、削除エントリのコンパクト化、ワイドテーブルのメモリ効率向上。
- **新SQLパーサー**: PostgreSQL派生のパーサーから独自のPEGベースパーサーへ移行し、より良いエラーメッセージと正確なソース位置情報を提供。
- **拡張機能の改善**: 安定版C APIによりリリースごとの再ビルドが不要に。C++ APIとRustバインディングを提供。カスタムリポジトリでの拡張機能配布にも対応。
- DuckDB Foundationの顧問委員会が設立された。上記以外にも複数の破壊的変更が予定されており、詳細は秋の正式リリース時に発表される。

## 出典

- [DuckDB: an Embeddable Analytical Database (SIGMOD 2019)](https://duckdb.org/pdf/SIGMOD2019-demo-duckdb.pdf)
- [New CWI spin-off company DuckDB Labs](https://www.cwi.nl/en/news/cwi-spin-off-company-duckdb-labs-provides-solutions-for-fast-database-analytics/)
- [DuckDB 2.0 Highlights](https://duckdb.org/2026/08/17/duckdb-20-highlights)

#duckdb #database #sql
