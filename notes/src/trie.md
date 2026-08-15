---
created: 2026-08-15 16:29
updated: 2026-08-15 16:29
---
# トライ木 (Trie)

文字列の集合を、根から葉までの経路が1つのキーに対応する木構造で表現するデータ構造。「prefix tree(接頭辞木)」「digital tree」とも呼ばれる。共通の接頭辞を持つキー同士がノードを共有するため、プレフィックス検索(前方一致検索)を効率的に行える。 #algorithm #data-structure

## 歴史

1959年、René de la Briandaisが論文 "File searching using variable length keys" で最初に導入した。名前は1960年代にEdward Fredkinが独立に考案し、"retrieval"(検索)の中間音節から**trie**と名付けた。発音は本来「tree」と同じ/triː/だが、「tree」と区別するために/traɪ/(「try」と同じ)と発音する人も多い。

2000年代、Googleがオートコンプリート機能に採用したことで改めて注目を集めた。

## 実装上の課題と派生構造

素朴なTrie実装(各ノードが子への配列やハッシュマップを持つ)は、特にアルファベットの種類が多い場合(漢字など)にメモリを浪費しやすい。この課題に対処するため、いくつかの圧縮・高速化手法が考案されている。

- **[[double-array|ダブル配列]]** — TRIEをBASE配列とCHECK配列の2本に圧縮して表現する手法。[[mecab|MeCab]]など日本語形態素解析器の辞書引きで広く使われる
- **[[marisa-trie|MARISA]]** — パトリシアトライ(Patricia Trie、共通接頭辞を持つ単一子ノードの連鎖をまとめて圧縮したTrie)を再帰的に用いて、さらに高い圧縮率を実現する静的Trie
- **Patricia Trie** — 単一の子しか持たないノードの連鎖を1つのノードにまとめることでメモリを節約する、Trieの基本的な圧縮手法

## 出典

- [Trie - Wikipedia](https://en.wikipedia.org/wiki/Trie)
- [Edward Fredkin - Wikipedia](https://en.wikipedia.org/wiki/Edward_Fredkin)
