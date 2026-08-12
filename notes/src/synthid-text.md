# SynthID-Text

#llm #ai #security #watermarking #google

Google DeepMind による[[llm-text-watermarking|LLMテキスト電子透かし]]の本番実装。論文 "Scalable watermarking for identifying large language model outputs" は Nature（2024-10）に掲載された。**生成テキスト透かしを大規模本番運用した初の事例**で、Gemini / Gemini Advanced 上で数百万ユーザー規模で稼働した。

## Tournament sampling

中核のアルゴリズム。次トークンを決めるときに:

1. 元の分布から候補トークンを複数サンプリングする
2. 候補をペアにして、秘密鍵由来の疑似乱数関数（PRF）のスコアが大きい方を勝ち残らせる
3. これをL層のトーナメントとして繰り返し、最後に残ったトークンを出力する

基礎に本物のサンプリングが残っているため「同じプロンプトでも毎回違う応答」という多様性が保たれる。Gumbel-max系のdistortion-free手法が抱える出力の決定化問題を回避しつつ、設定次第で:

- **非歪曲（non-distortionary）**: 出力分布を保存し品質劣化なし
- **歪曲（distortionary）**: 品質を少し犠牲にして検出力を上げる

の両モードを選べる。論文では両カテゴリで既存手法（KGW系・Gumbel系）より検出力が高いことを示した。

## 実運用上の特徴

- 学習には一切手を入れず、サンプリング手順だけを差し替える
- 検出はLLM本体を使わず軽量に実行できる
- 約2,000万件の本番トラフィックでの人間フィードバック評価で品質劣化なしを確認
- 実装はオープンソース化されており、Hugging Face Transformers にも組み込まれている

## [[llm-text-watermarking]]の中での位置づけ

ロジット操作型（KGW法）とサンプリング置換型（Gumbel-max）の長所を統合した実用システム。ただしトークン表層の偏りに依存する点は変わらず、強い言い換え・翻訳への耐性は限定的。

## 出典

- [Scalable watermarking for identifying large language model outputs (Nature, 2024)](https://www.nature.com/articles/s41586-024-08025-4)
- [On Google's SynthID-Text LLM Watermarking System: Theoretical Analysis and Empirical Validation (2026)](https://arxiv.org/abs/2603.03410) — 第三者による理論解析
