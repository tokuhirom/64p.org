---
created: 2026-08-15 21:59
updated: 2026-08-15 21:59
---
# MariaDB

[[mysql|MySQL]]のフォークであるオープンソースRDBMS。2009年、OracleによるSun Microsystems買収を機に、MySQLの原作者の一人Michael "Monty" Wideniusが立ち上げた。名称は同氏の娘の名前に由来する。MariaDB Foundationという非営利組織が開発を統括しており、企業単独ではなくコミュニティ主導のガバナンス体制を取る点がMySQL(Oracle所有)との対比としてよく語られる。

## MySQLとの違い

- ストレージエンジン: MySQLと共通の`InnoDB`をフォークして独自の最適化(バッファプール管理・圧縮)を加えているほか、`Aria`(MyISAMの後継、クラッシュセーフ)、`MyRocks`(SSD向け、RocksDBベース)など独自エンジンを持つ。
- システムバージョン管理テーブル: MariaDB 10.3で導入。テーブルの行の変更履歴を自動的に保持する。
- `S3`ストレージエンジン: 古いテーブルをS3互換オブジェクトストレージへ直接アーカイブできる。
- ベクトル検索: 11.7で`VECTOR INDEX`([[hnsw|HNSW]]ベース)をOSS版に実装済み。[[mysql-vector|MySQLのベクトル検索対応]]はCommunity版では未対応(Enterprise版の[[mysql-heatwave|HeatWave]]でのみ提供)なため、この点でMariaDBが先行している。

## ライセンス面

MariaDB社(MariaDB Foundationとは別法人)は、[[business-source-license|Business Source License]](BUSL-1.1)の考案元でもある。MaxScale(接続プロキシ)で最初に採用され、後にHashiCorpなど他社も追随した。MariaDB自体(サーバー本体)はGPLv2のオープンソースのまま維持されている。

## 出典

- [MariaDB vs MySQL 2026: Feature Comparison, Licensing & Migration Guide - JusDB](https://www.jusdb.com/blog/mariadb-vs-mysql-2026)
- [MySQL vs. MariaDB: a Complete Comparison in 2026 - Bytebase](https://www.bytebase.com/blog/mysql-vs-mariadb/)

#database #mysql #oss
