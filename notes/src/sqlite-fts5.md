---
created: 2026-08-10 17:29
updated: 2026-08-10 17:50
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

## 日本語対応の選択肢: N-gramと形態素解析

日本語のように単語の区切りが明示されない言語では、`unicode61`のような空白区切り前提のトークナイザはそのままでは使えない。主なアプローチは2つ。

- **N-gram（trigramトークナイザなど）**: 意味のある単語に分割せず、機械的にN文字ずつの部分文字列に区切ってトークン化する。単語の切れ目を解析する必要がないのが利点だが、意味のない部分文字列にもヒットするノイズ（false positive）が発生しやすく、インデックスサイズも単語ベースより大きくなりがち。
- **形態素解析（MeCabなど）**: 事前にMeCabのような形態素解析エンジンでテキストを単語単位に分割してからFTSに投入する。精度は高いが、外部の解析エンジンへの依存が増える。

日本語（CJK）検索では、ラテン文字部分は`unicode61`、CJK部分は`trigram`を使い分けるハイブリッド戦略も実用的とされる。

## FTS3/FTS4との違い

[[sqlite-fts3|FTS3]]のノートで触れた通り、FTS3/FTS4は単語単位の前方一致・完全一致にしか対応せず関連度ランキングも持たないのに対し、FTS5はモジュール設計が刷新され、SQL構文もやや異なる（例: プレフィックス検索は`MATCH`演算子内で`term*`のように書く）。

## 出典

- [SQLite FTS5 Extension（公式ドキュメント）](https://www.sqlite.org/fts5.html)
- [SQLite Full-Text Search: FTS5 Virtual Tables and MATCH](https://coddy.tech/docs/sqlite/full-text-search)
- [Full-text CJK Search with SQLite FTS5: Trigram Tokenizer and Hybrid Strategy](https://zenn.dev/kanseilink/articles/kanseilink-fts5-trigram-cjk-20260507?locale=en)
- [SQLite FTS5 Tokenizers: unicode61 and ascii](https://audrey.feldroy.com/articles/2025-01-13-SQLite-FTS5-Tokenizers-unicode61-and-ascii)
- [SQLiteを使ってAndroid端末内でお手軽に日本語全文検索する #SQLite3 - Qiita](https://qiita.com/shikato/items/512db7bf051eddb84600)
- [SQLite FTS : trigram tokenizerでunigram＆bigram検索までサポート](https://www.space-i.com/post-blog/sqlite-fts-trigram-tokenizer%E3%81%A7unigram%EF%BC%86bigram%E6%A4%9C%E7%B4%A2%E3%81%BE%E3%81%A7%E3%82%B5%E3%83%9D%E3%83%BC%E3%83%88-%E6%97%A5%E6%9C%AC%E8%AA%9E%E5%85%A8%E6%96%87%E6%A4%9C%E7%B4%A2/)
- [【Python】SQLite で日本語を全文検索するコード例【N-Gram, FTS4/FTS5】 | シラベルノート](https://srbrnote.work/archives/5846)
