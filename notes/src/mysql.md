---
created: 2026-08-10 17:21
updated: 2026-08-10 17:21
---
# MySQL

オープンソースのRDBMS（リレーショナルデータベース管理システム）。1995年にMichael Widenius、David Axmark、Allan LarsonらによりMySQL ABから最初のバージョンがリリースされた（Solaris向け）。世界で最も多くデプロイされているオープンソースRDBMSとされる。

#database #rdbms #sql

## ライセンス・買収の経緯

公開当初は独自ライセンスだったが、2000年にGPL v2を採用し、商用ライセンスとのデュアルライセンスモデルになった。その後Sun MicrosystemsがMySQL ABを買収し、2010年1月27日にOracleがSun Microsystemsを買収したことでMySQLもOracleの一部門（MySQL Global Business Unit）となった。

## ストレージエンジン: InnoDB

MySQL 8.0以降のデフォルトストレージエンジンは**InnoDB**。

- **ACID準拠**: コミット・ロールバック・クラッシュリカバリ機能を持つ。
- **行レベルロック**: テーブル全体ではなく行単位でロックするため、複数ユーザーでの並行性が高い。
- **外部キーサポート**。
- [[postgresql|PostgreSQL]]と同様に[[mvcc|MVCC]]を実装しており、両者はデフォルトの[[transaction-isolation-levels|トランザクション分離レベル]]や、ファントムリードへの対処方法（gap lock・next-key lockの有無）が異なる。

## リリースモデル

2023年以降、機能追加を含む**Innovation**リリースと、長期サポート版の**LTS**リリースの2トラック体制に移行した。MySQL 8.4がLTS版として提供されている。従来の連番バージョニング（〜9.7）はMySQL 9.7が最後となり、以降は`YY.M`形式のカレンダーバージョニングに変わる。

## 出典

- [MySQL InnoDBの概要｜チンプー](https://note.com/danchi_kun/n/n72e52f84772a)
- [15.1 InnoDB 入門 | MySQL 8.0 リファレンスマニュアル](https://dev.mysql.com/doc/refman/8.0/ja/innodb-introduction.html)
- [MySQLの歴史が面白い #読み物 - Qiita](https://qiita.com/nom_bom/items/75d409b303f4814143c8)
- [Oracleに買収されたMySQLは「いま、どうなの？」](https://enterprisezine.jp/article/detail/3128)
- [より予測しやすい MySQL リリースモデル | mysql-jp](https://blogs.oracle.com/mysql-jp/a-more-predictable-mysql-release-model-calendar-versions-lts-and-innovation-jp)
- [MySQL :: MySQL 9.7 Reference Manual :: 1.3 MySQL Releases: Innovation and LTS](https://dev.mysql.com/doc/refman/9.7/en/mysql-releases.html)
