---
created: 2026-08-11 07:53
updated: 2026-08-11 07:53
---
# 技術的負債の四象限（Technical Debt Quadrant）

Martin Fowlerが提唱した、[[technical-debt|技術的負債]]を分類するためのフレームワーク。負債の性質を「reckless/prudent（無謀／慎重）」と「deliberate/inadvertent（意図的／無意識的）」という2つの軸で整理する。

## 2つの軸

- **Reckless（無謀）vs Prudent（慎重）**：無謀な負債は利息負担が大きく返済に長期間を要する設計上の欠陥。慎重な負債は、短期的な利益（リリース達成など）と長期的な返済コストを天秤にかけた上での判断。
- **Deliberate（意図的）vs Inadvertent（無意識的）**：意図的な負債はチームが負債の存在を認識し、返済タイミングも検討している状態。無意識的な負債はチームが設計の欠陥そのものに気づいていない状態。

## 4つの象限

1. **Reckless-Deliberate**: 品質より速度を優先する意識的な選択。通常は悪い判断とされる。
2. **Reckless-Inadvertent**: 設計実践の知識がないまま作られた混乱したコード。
3. **Prudent-Deliberate**: 戦略的な負債取得。短期的なリリースを実現するための計算された判断。
4. **Prudent-Inadvertent**: 優秀なチームであっても開発を進める中で学習した結果、後から気づく避けられない負債。

## 位置づけ

Fowlerはこの図を用いて、負債比喩を経営層・管理職に説明しやすくすることを意図した。特に「優秀なチームであっても必ず負債が発生する」という現実を示し、計画的な返済の必要性を強調している。

## 出典

- [bliki: Technical Debt Quadrant - Martin Fowler](https://martinfowler.com/bliki/TechnicalDebtQuadrant.html)

#software-engineering #agile
