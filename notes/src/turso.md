---
created: 2026-08-13 22:28
updated: 2026-08-13 22:28
---
# Turso

turso.tech社が提供する、[[sqlite|SQLite]]互換のデータベース製品群。名称が指す対象が時期によって変化しており、現在は「libSQL」「Turso Cloud」「Turso Database」という3つの要素が絡み合っている。

#database #sqlite #serverless #edge-computing

## libSQL

Turso社がメンテナンスする[[sqlite|SQLite]]のオープンソースフォーク。ファイルフォーマット・APIともにSQLiteと完全な後方互換性を保ちつつ、SQLite本家に取り込まれなかった機能を追加している。組み込みデータベースとしてだけでなく、WebSocket/HTTP経由でSQLを実行できるリモートサーバーとしても動作できる点が特徴。外部システムがWALの変更を消費・適用できる「virtual WAL interface」を持ち、分散同期の基盤になっている。

## Turso Cloud

libSQLを使って構築された、現行のマネージドデータベースサービス。エッジの35以上のリージョンでlibSQLサーバーを稼働させ、プライマリリージョンで作成したデータベースを他リージョンへレプリケートする。読み取りは最寄りのレプリカへ、書き込みはプライマリへ向かう構成。

「embedded replicas」という仕組みも提供しており、クラウド上のプライマリDBと同期するローカルのSQLiteファイルをアプリケーション側に持たせることで、ローカルディスク並みの速度（ベンチマークで200ナノ秒未満とされる）での読み取りを実現する。

## Turso Database

Rustで新規にゼロから書き直されている、SQLite互換の新データベース（2026年8月時点でベータ）。libSQLとは別物で、将来的にTurso Cloudへ組み込む方向で開発が進められている。

## 用途

コンテンツ配信・分析ダッシュボード・ドキュメントツールのような「読み取りが多く書き込みは中程度」なアプリケーションに向いているとされる。リアルタイムコラボレーションやトレーディング、マルチプレイヤーゲームのような高並行書き込みが必要な用途は、[[postgresql|PostgreSQL]]系（[[neon|Neon]]など）の方が適しているとされる。SQLiteのベクトル検索拡張`sqlite-vec`にも対応しており、AI関連のユースケースでの利用も謳われている。

## 出典

- [libSQL - Turso](https://docs.turso.tech/libsql)
- [Pekka Enberg氏によるTurso/Turso Cloud/libSQLの関係の説明 (X)](https://x.com/penberg/status/2032373944007688226)
- [What is Turso? — The SQLite-compatible database for the agentic era](https://turso.tech/what-is-turso)
- [GitHub - tursodatabase/libsql](https://github.com/tursodatabase/libsql)
- [The Edge Database Landscape in 2026: Postgres, Turso, and the SQLite Renaissance | Sabaoon](https://www.sabaoon.dev/blog/edge-database-landscape-2026)
