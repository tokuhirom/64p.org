---
created: 2026-08-10 17:26
updated: 2026-08-10 17:29
---
# FTS3（SQLite）

[[sqlite|SQLite]]の全文検索機能を提供する仮想テーブルモジュール。`CREATE VIRTUAL TABLE ... USING fts3(...)`のように仮想テーブルとして定義し、通常のテーブルと同様にSQLで検索できる。SQLiteのソース配布に標準で含まれる全文検索モジュール群（FTS3/FTS4/FTS5）のうち最初に導入されたバージョン。

#sqlite #database #full-text-search

## 仕組み

トークナイザ（tokenizer）が文章を単語などのトークンに分割し、それをもとにインデックスを構築する。`CREATE VIRTUAL TABLE`文の中でトークナイザを指定できる。

## 制限事項

単語単位の前方一致・完全一致検索にしか対応していない。標準のトークナイザは空白区切りを前提としているため、単語の区切りが明示されない日本語のような言語ではそのままでは実用的な検索ができない（トークナイザの工夫で改善は可能）。

## FTS4・FTS5との違い

FTS3の後継として**FTS4**（データ圧縮オプションやcontentlessテーブルなどの改善）、さらに**[[sqlite-fts5|FTS5]]**（モジュール設計の刷新、FTS3/4とはSQL構文がやや異なる、`ORDER BY`でのrelevancy（関連度）スコアリングに対応）が追加されている。FTSモジュールは性能改善が継続的に行われているため、新しいバージョンを使う場合はFTS5が推奨される。

## 出典

- [Sqlite で全文検索 #SQLite3 - Qiita](https://qiita.com/AsladaGSX/items/2bb743d1d8b19cec6cbc)
- [Part 6 - Full Text Search Extensions](https://www.koeki-prj.org/~yuuji/2025/s4/06/sqlite-fts.html)
- [SQLite検索が遅い？LIKEの限界とFTS5で高速化する方法](https://zenn.dev/stockdatalab/articles/20251010_tech_fts5)
- [【Python】SQLite で日本語を全文検索するコード例【N-Gram, FTS4/FTS5】 | シラベルノート](https://srbrnote.work/archives/5846)
- [SQLite3 (PDO) を使った全文検索 (FTS) 入門 – セルティスラボ](https://celtislab.net/archives/20160531/sqlite3-fts-tutorial/3/)
