---
created: 2026-08-15 16:27
updated: 2026-08-15 16:29
---
# ダブル配列 (Double Array)

[[trie|TRIE(トライ木)]]を**BASE配列**と**CHECK配列**という2つの配列に圧縮して表現するデータ構造。青江順一(Jun-ichi Aoe)が1989年にIEEE Transactions on Software Engineering誌に発表した論文 "An Efficient Digital Search Algorithm by Using a Double-Array Structure"(vol.15, no.9, pp.1066-1077)で提案した。 #algorithm #data-structure #nlp

## 仕組み

元のTRIEでは各ノードがエッジラベル(文字コード)ごとに子ノードを指す行テーブルを持つが、これはスパース(疎)になりがちでメモリを浪費する。ダブル配列はこのスパースな行テーブルを「ずらして重ね合わせる」ことで、単一の配列に圧縮する。

- **BASE配列** — 各ノードからの「ずらし量(オフセット)」を記録する
- **CHECK配列** — ある位置が本当に期待した親ノードの子であるかを検証する

検索は「現在位置のBASE値 + 次の文字コード」で次の位置を計算し、CHECK配列でその位置の親が正しいか確認する、という手順を繰り返す。この検証があるため、別の親の子ノードを誤って辿ってしまう問題を防げる。1文字あたりの遷移がO(1)で行えるため、キー長kに対して検索全体はO(k)となる。

## 応用

形態素解析、スペル訂正、日本語かな漢字変換の辞書検索など、高速なプレフィックス検索が必要な場面で広く使われている。実装としては[[mecab|MeCab]]の辞書引きや、Darts(Double-ARray Trie System)などが知られる。

## 出典

- [An Efficient Digital Search Algorithm by Using a Double-Array Structure | IEEE](https://dl.acm.org/doi/10.1109/32.31365)
- [A fast digital search algorithm using a double‐array structure - Aoe - 1989 | Wiley](https://onlinelibrary.wiley.com/doi/abs/10.1002/scj.4690200710)
- [情報系修士にもわかるダブル配列 - アスペ日記](https://takeda25.hatenablog.jp/entry/20120219/1329634865)
- [Static Double Array Trie (DASTrie)](https://www.chokkan.org/software/dastrie/)
