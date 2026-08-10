---
created: 2026-08-10 17:29
updated: 2026-08-10 17:29
---
# FTS5（SQLite）

[[sqlite|SQLite]]の全文検索用仮想テーブルモジュールの最新版。[[sqlite-fts3|FTS3]]/FTS4の後継として設計が刷新されており、SQL構文にも違いがある。

#sqlite #database #full-text-search

## BM25によるランキング

FTS5は`rank`という隠しカラムを公開しており、`ORDER BY rank`とするだけでBM25スコア（値が小さいほど関連度が高い）による関連度順ソートができる。BM25の計算に使う定数`k1`・`b`はそれぞれ1.2・0.75に固定されている。この関連度ランキングはFTS3/FTS4にはなかった機能。

## external content / contentless テーブル

`content`オプションで、元のテキストを別テーブルに持たせる「external contentテーブル」（`content='posts'`のように指定、本文の二重保存を避けられる）や、本文を一切保持しない「contentlessテーブル」（`content=''`、検索はできるが元テキストの取得はできず、rowidだけを返す）を構成できる。

## トークナイザ

組み込みトークナイザとして`unicode61`（デフォルト）、`ascii`、`porter`、`trigram`がある。デフォルトの`unicode61`は空白区切りを前提とするため英語向けで、単語の区切りが明示されない日本語には不向き。`trigram`トークナイザを使うと3文字の連続部分文字列単位でのマッチングができ、完全な単語でなくても任意の文字列にマッチできるようになる（ただし3文字未満の文字列はどの行にもマッチしないという制約がある）。日本語（CJK）検索では、ラテン文字部分は`unicode61`、CJK部分は`trigram`を使い分けるハイブリッド戦略が実用的とされる。

## FTS3/FTS4との違い

[[sqlite-fts3|FTS3]]のノートで触れた通り、FTS3/FTS4は単語単位の前方一致・完全一致にしか対応せず関連度ランキングも持たないのに対し、FTS5はモジュール設計が刷新され、SQL構文もやや異なる（例: プレフィックス検索は`MATCH`演算子内で`term*`のように書く）。

## 出典

- [SQLite FTS5 Extension（公式ドキュメント）](https://www.sqlite.org/fts5.html)
- [SQLite Full-Text Search: FTS5 Virtual Tables and MATCH](https://coddy.tech/docs/sqlite/full-text-search)
- [Full-text CJK Search with SQLite FTS5: Trigram Tokenizer and Hybrid Strategy](https://zenn.dev/kanseilink/articles/kanseilink-fts5-trigram-cjk-20260507?locale=en)
- [SQLite FTS5 Tokenizers: unicode61 and ascii](https://audrey.feldroy.com/articles/2025-01-13-SQLite-FTS5-Tokenizers-unicode61-and-ascii)
