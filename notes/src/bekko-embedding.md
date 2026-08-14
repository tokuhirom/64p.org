---
created: 2026-08-15 07:14
updated: 2026-08-15 07:22
---
# Bekko Embedding

2026年7月に公開された超小型の多言語ベクトル検索(embedding)モデル。`bekko-a8m`(Active Parameters 7.67M)と`bekko-a25m`(24.93M)の2サイズがあり、MITライセンスで公開されている。#embedding #ベクトル検索 #機械学習

## 開発の狙い

近年のembeddingモデルは大規模化が主流だが、逆にAIエージェント普及で増えているローカルマシン上でのドキュメント変換・インデックス作成需要(GPUなし環境やRaspberry Piのような低スペック機での実行)に応えるため、検索性能を保ちながら極限まで小型化することを目指したモデル。

## アーキテクチャ

- mmBERT-small(22層)を4層(a8m)/13層(a25m)にプルーニングして構築。
- 出力は384次元。[[matryoshka-representation-learning|Matryoshka学習]]により256/128/64次元にも圧縮可能。
- 最大8,192トークンの入力に対応。

## Active Parameters(AP)という指標

トークン埋め込みテーブルを除いた、Transformer演算で実際に使われる重み量を指す独自の見方。総パラメータ数だけでは推論コストの実態を表せないという問題意識から導入されている。例えば`bekko-a8m`は総パラメータ106Mだが、APはわずか7.67M。

## 学習

- 約11億の多言語ペア(合成データ含む)で2段階対照学習を実施。
- 教師モデルからの蒸留は使用していない。
- RTX PRO 6000 Blackwell Max-Q 1枚のみで学習(a8mは約3日、a25mは約8日)。

## 量子化とファイルサイズ

トークン埋め込みテーブルをint8量子化することで、`bekko-a8m`は124MiB(ブラウザ配信も可能なサイズ)、`bekko-a25m`は190MiBまで圧縮されている。

## 性能

- MMTEB検索18タスクでbekko-a8m(56.2)/a25m(57.5)が、APが約3倍大きいmultilingual-e5系モデルやBGE-M3を上回る。
- 長文検索(LongEmbed)ではa25m(70.6)が密ベクトルモデル中1位。
- CPU推論(Ryzen 9 7950X, OpenVINO使用)でa8mは364 docs/秒。Raspberry Pi 5でもa8mで33 docs/秒動作し、multilingual-e5-largeなら2時間かかる処理が約5分に短縮される。
- 100言語以上で学習しており、言語横断検索(日本語クエリで英語文書を検索する、など)に対応。評価対象14言語ではa25mが全言語でmultilingual-e5-smallを上回るが、タイ語・アラビア語・セルビア語はやや弱め。
- 一方、分類・クラスタリング性能は中位以下で、検索タスク専用モデルという位置づけ。

## 実行環境

PyTorch(sentence-transformers)、CPU向けOpenVINO(x86で約2.8倍、Raspberry Pi 5で約1.7倍高速化)、ブラウザ向けTransformers.js(WebGPU/WASM上で動作し、データをサーバーに送らずクライアント完結)の3系統に対応。いずれもprefixやタスク指示なしの統一インターフェースで使える。

## [[pgvector]]との関係

[[pgvector]]はテキストや画像の埋め込み(embedding)をPostgreSQLに保存して類似検索する拡張機能で、embeddingモデル自体はpgvectorの外で生成する必要がある。Bekko Embeddingのような軽量モデルは、GPUを持たない環境でもembedding生成側を賄える選択肢になる。

## 出典

- [超小型で高性能な多言語ベクトル検索モデル「bekko embedding」を公開しました](https://secon.dev/entry/2026/07/29/080000-bekko-embedding/)
