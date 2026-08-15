---
created: 2026-08-15 17:49
updated: 2026-08-15 17:49
---
# NNUE

NNUE(Efficiently Updatable Neural Network)は、盤面評価に浅い層のニューラルネットワークを用いる評価関数アーキテクチャ。2018年に那須(tanuki-チーム)が考案し、将棋エンジン「やねうら王」で最初に採用された。その後チェスにも移植され、Stockfishが2020年に採用したことで西洋チェス界にも広まった。

## 基本原理

NNUEは「入力特徴量の非ゼロ要素が少ないこと」と「1手進むごとに入力の変化が小さいこと」という2つの性質を前提に設計されている。アルファベータ探索中は1手ごとに評価関数を何百万回も呼び出す必要があるが、NNUEは差分更新(incremental update)によって、盤面全体のニューラルネットワークを毎回フルで計算し直すのではなく、直前の評価からの変化分だけを反映してAccumulator(入力層直後の中間表現)を更新する。これにより、疎な全結合層を持つネットワークでも高速に評価値を算出できる。

## アーキテクチャの典型例

入力層は玉の位置と各駒の位置の組み合わせ(King-Piece)などを特徴量としたスパースなベクトル(チェスでは768次元程度)で、Feature Transformer(FT)層と呼ばれる隠れ層(数千ユニット程度)に変換され、さらにいくつかの隠れ層を経て最終的に1つのスカラー値(評価値)を出力する。

## 差分更新の限界とFinny Tables

差分更新は「駒が動く」ケースには強いが、玉の位置自体が入力特徴に含まれる(King-Piece方式の)場合、玉が移動すると入力特徴が全て変わってしまい差分更新できず、盤面全体を再計算する「full refresh」が必要になる。このコストを削減する最適化が[[finny-tables|Finny Tables]]。

## 出典

- [Efficiently updatable neural network - Wikipedia](https://en.wikipedia.org/wiki/Efficiently_updatable_neural_network)
- [NNUE - Chess Programming Wiki](https://www.chessprogramming.org/NNUE)
- [Introducing NNUE Evaluation - Stockfish](https://stockfishchess.org/blog/2020/introducing-nnue-evaluation/)
- [やねうら王 - Wikipedia](https://ja.wikipedia.org/wiki/%E3%82%84%E3%81%AD%E3%81%86%E3%82%89%E7%8E%8B)

#nnue #shogi #chess #neural-network
