---
created: 2026-08-15 17:49
updated: 2026-08-15 17:49
---
# Finny Tables

チェス・将棋AIの評価関数[[nnue|NNUE]]において、玉(キング)が移動した際のアキュムレータ(Accumulator)更新を高速化する最適化技術。「Accumulator Cache」とも呼ばれる。チェスエンジンKoivistoの開発者Finn Eggersが考案したことに由来する通称。

## 解決する問題

NNUEはFeature Transformer(FT)層への入力特徴量として、玉の位置と各駒の組み合わせ(King-Piece, KP)を使うことが多い。この設計(king bucketed inputs)では、駒が動いた場合は差分更新(incremental update)でFT層の出力を軽量に更新できるが、玉自体が移動して別のking bucketをまたぐと、入力特徴が全て変わってしまうため、アキュムレータ全体を再計算する「full refresh」が必要になる。この処理は通常の差分更新よりもはるかにコストが高い。

## 仕組み

Finny Tablesは、玉の位置(チェスなら64マス、将棋なら81マス)ごとに、過去に計算したアキュムレータとその時点の盤面のビットボードをキャッシュとして保持しておく。玉が別のking bucketへ移動してfull refreshが必要になった場面では、以下の手順で更新する。

1. 移動先の玉位置に対応するキャッシュ済みアキュムレータとビットボードを取得する
2. キャッシュ時点のビットボードと現在の盤面のビットボードとの差分(駒の増減)を計算する
3. その差分だけをキャッシュ済みアキュムレータに適用して更新する
4. 更新後のアキュムレータと現在のビットボードで、そのking bucketのキャッシュエントリを上書きする

これにより、駒の全特徴量を再計算するfull refreshを避け、差分計算だけで済ませられる。

## やねうら王への実装

将棋エンジン「やねうら王」に実装された際の計測では、推論部で30〜50%の高速化、探索速度(NPS)で約15%の向上が報告されている。玉移動コストが下がったことで、FT層のユニット数を増やすなど評価精度を上げる方向の設計変更にも余地が生まれ、既存の「最適」とされてきたアーキテクチャの見直しが将棋AI開発コミュニティで進んでいる。

## 出典

- [Finny Tablesをやねうら王に実装した - やねうら王](https://yaneuraou.yaneu.com/2026/08/11/finny-tables-implemented-in-yaneuraou/)
- [NNUE - Chess Programming Wiki](https://www.chessprogramming.org/NNUE)

#nnue #shogi #chess #search-algorithm
