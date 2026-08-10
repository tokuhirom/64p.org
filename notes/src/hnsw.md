---
created: 2026-08-10 17:13
updated: 2026-08-10 17:13
---
# HNSW

Hierarchical Navigable Small World の略。高次元ベクトルに対する近似最近傍探索（ANN: Approximate Nearest Neighbor Search）アルゴリズムのひとつ。2016年にYu MalkovとDmitry Yashuninが発表した論文「Efficient and Robust Approximate Nearest Neighbor Search Using Hierarchical Navigable Small World Graphs」（2018年にIEEE TPAMI誌掲載）が元になっている。[[pgvector]]が対応するインデックス方式の一つ。

#vector-search #algorithm #ann

## 仕組み

グラフベースの手法で、2つのアイデアを組み合わせている。

- **Navigable Small World**: 各点が近い点同士で接続されたグラフ構造。
- **階層（Hierarchical）**: 探索を高速化するためのレイヤー構造。

下位レイヤーには全ベクトルが含まれ近傍同士が密に接続される一方、上位レイヤーに行くほどノード数が少なくなり、遠くの領域へ素早く移動するための「ハイウェイ」として機能する。検索時は最上層のエントリーポイントから始まり、クエリベクトルに近い方向へ貪欲に降りていくことで、全件比較なしに高速に近傍を見つけられる。

## 主なパラメータ

- **M**: 各ノードが持つ接続数の上限（推奨値はおおむね5〜48程度）。大きいほど精度（リコール率）は上がるがメモリ消費も増える。
- **ef_construction**: インデックス構築時に探索する近傍候補の幅。大きいほど構築品質は上がるが構築時間が伸びる。

## IVFFlatとの違い

学習ステップが不要で、空のテーブルからでもインデックスを作成しデータ追加とともに段階的に構築できる。精度・速度のバランスが良い一方、構築負荷はIVFFlatより大きい。

## 出典

- [What is a Hierarchical Navigable Small World | MongoDB](https://www.mongodb.com/resources/basics/hierarchical-navigable-small-world)
- [Hierarchical navigable small world - Wikipedia](https://en.wikipedia.org/wiki/Hierarchical_navigable_small_world)
- [Understanding Hierarchical Navigable Small Worlds (HNSW) - Zilliz Learn](https://zilliz.com/learn/hierarchical-navigable-small-worlds-HNSW)
- [Hierarchical Navigable Small Worlds (HNSW) | Pinecone](https://www.pinecone.io/learn/series/faiss/hnsw/)
- [HNSW Algorithm Explained: Diagrams + Tuning (2026)](https://krunalkanojiya.com/blog/hnsw-algorithm-explained)
