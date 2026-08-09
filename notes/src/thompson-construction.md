---
created: 2026-08-09
updated: 2026-08-09
---
# Thompson construction

Ken Thompsonが考案した、正規表現を等価なNFA（非決定性有限オートマトン）に変換するアルゴリズム。McNaughton–Yamada–Thompsonアルゴリズムとも呼ばれる。[[regex-engine-backtracking-vs-nfa|NFA/DFA型の正規表現エンジン]]の理論的基盤になっている。

## 仕組み

ボトムアップに構築する。正規表現の部分式ごとに小さなNFAをまず作り、それらを結合して全体のNFAを組み立てる。基本となるNFAは4種類。

- 1文字とのマッチ（単純な遷移）
- 連接（concatenation、例: `ab`）
- 選択（alternation、例: `a|b`）
- Kleeneスター（例: `a*`）

## 意義

理論的には「正規表現とNFAは同じ言語（正規言語）を受理する」ことの証明の一部を成す。実用上は、テキスト処理ツールが正規表現で検索パターンを記述する一方、コンピュータ上での実行にはNFAの方が適しているため、Thompson constructionで正規表現をNFAに変換し、そのNFAをシミュレートする（あるいはさらにDFA化する）ことで、正規表現の長さと入力文字列の長さに対して線形の実行時間を持つパターンマッチングが実現できる。

#regex

## 出典

- [Thompson's construction - Wikipedia](https://en.wikipedia.org/wiki/Thompson's_construction)
- [Visualizing Thompson's Construction Algorithm for NFAs, step-by-step | Medium](https://medium.com/swlh/visualizing-thompsons-construction-algorithm-for-nfas-step-by-step-f92ef378581b)
