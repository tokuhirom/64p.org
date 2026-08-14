---
created: 2026-08-14 22:54
updated: 2026-08-14 22:54
---
# 遺伝的アルゴリズム (Genetic Algorithm)

生物進化のプロセス（自然選択・交叉・突然変異）を模倣した、最適化・探索のためのメタヒューリスティック手法。微分不可能・非線形・多峰性など、勾配法や通常の離散最適化手法では扱いにくい問題に対して用いられる。

## 基本的な流れ

1. **初期集団の生成** — 解の候補（個体）をランダムに多数生成する
2. **評価** — 各個体を目的関数（適応度関数）で評価する
3. **選択 (Selection)** — 適応度の高い個体を次世代の親として優先的に選ぶ
4. **交叉 (Crossover)** — 選ばれた親同士の遺伝子（解の構成要素）を組み合わせ、新しい子個体を生成する。異なる個体の良い部分を混ぜ合わせ、解空間の探索を進める役割を持つ
5. **突然変異 (Mutation)** — 子個体の一部をランダムに変化させ、多様性を維持する。局所最適解への収束を防ぐ役割
6. 2〜5を世代を重ねて繰り返し、適応度が十分高い解に収束させる

## パラメータの目安

交叉率は0.95程度と高く設定されることが多い一方、突然変異率は0.01〜0.05程度と低く抑えられる。交叉で解空間を効率よく探索しつつ、突然変異で局所最適に陥るのを防ぐ、というバランスの取り方。

## 用途

数値最適化、スケジューリング、機械学習のハイパーパラメータ探索、構造設計など、探索空間が広く評価関数の性質が悪い（微分不可能・非凸など）問題全般に応用される。[[fuzzing|ファジング]]ツールの[[fuzzing|AFL]]も、入力のミューテーション戦略に遺伝的アルゴリズムの考え方を取り入れている。

#optimization #metaheuristics

## 出典

- [Crossover and mutation: An introduction to two operations in genetic algorithms - The DO Loop](https://blogs.sas.com/content/iml/2021/10/18/crossover-mutation.html)
- [Genetic Algorithms – An Overview](https://help.imsl.com/c/cnlstat/current/genetic-algorithms-overview.htm)
- [How the Genetic Algorithm Works - MATLAB & Simulink](https://www.mathworks.com/help/gads/how-the-genetic-algorithm-works.html)
- [Choosing Mutation and Crossover Ratios for Genetic Algorithms—A Review with a New Dynamic Approach](https://www.mdpi.com/2078-2489/10/12/390)
