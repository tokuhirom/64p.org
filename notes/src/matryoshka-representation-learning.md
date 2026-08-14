---
created: 2026-08-15 07:22
updated: 2026-08-15 07:22
---
# Matryoshka Representation Learning(MRL)

1つの[[bekko-embedding|embedding]]モデルの出力を、切り詰め(truncate)るだけでより低次元のベクトルとしてもそのまま使えるように学習する手法。2022年にGoogle Research・ワシントン大学らの論文で提案された。#embedding #機械学習 #ベクトル検索

## 仕組み

通常の学習では、埋め込みベクトルの全次元(例: 768次元)に対してのみ損失関数を適用する。MRLでは、768次元の中の先頭768/512/256/128/64/32次元…といった複数のprefixそれぞれに対しても同じ損失関数を適用し、まとめて学習する。この結果、ベクトルの先頭側の次元だけを取り出して切り詰めても、単独でその次元数用に学習したモデルと同等以上の精度を保った低次元表現として機能する。

名前の由来はロシアの入れ子人形「マトリョーシカ」で、大きな人形の中に小さな人形が入れ子になっている様子に、粗い(低次元)表現の中に細かい(高次元)表現が入れ子状に含まれているイメージを重ねている。

## メリット

- 推論・デプロイ時に追加コストがかからず、既存の学習パイプラインへの変更も最小限で済む。
- 用途に応じて同じモデルの出力を複数の次元数で使い分けられる。例えば「小さいベクトルで大まかに候補を絞り込み(shortlisting)、絞り込んだ候補だけをフル次元で再ランキングする(reranking)」という2段階の検索が可能になる。
- 論文ではImageNet-1Kの分類・大規模検索タスクで、最大14倍の埋め込みサイズ削減・14倍の検索高速化を、精度をほぼ落とさず達成したと報告されている。

## 実装・利用例

- `sentence-transformers`ライブラリは`MatryoshkaLoss`を提供しており、既存の損失関数を複数次元で適用するラッパーとして使う。
- MRL対応モデルをロードする際に`truncate_dim`パラメータを指定するだけで、任意の次元数に切り詰めた埋め込みを得られる(例: `truncate_dim=64`)。
- OpenAIの`text-embedding-3-small`/`text-embedding-3-large`もMRLを採用しており、開発者が埋め込みサイズをコスト・速度に応じて短縮できる。
- [[bekko-embedding|Bekko Embedding]]もMatryoshka学習を採用しており、384次元の出力を256/128/64次元に圧縮して使うことができる。

## 出典

- [Matryoshka Representation Learning (arXiv:2205.13147)](https://arxiv.org/abs/2205.13147)
- [Matryoshka Embeddings — Sentence Transformers documentation](https://sbert.net/examples/sentence_transformer/training/matryoshka/README.html)
