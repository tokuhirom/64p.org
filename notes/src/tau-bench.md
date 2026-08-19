---
created: 2026-08-19 09:24
updated: 2026-08-19 09:24
---
# τ-bench

#llm #benchmark #agent

Sierra Research(カスタマー向けAIエージェントを開発する企業)がShunyu Yao・Noah Shinn・Pedram Razavi・Karthik Narasimhanの4名で2024年6月に発表した、対話型AIエージェントを評価するベンチマーク。言語モデルが演じるユーザーと、ドメイン固有のAPIツール・ポリシーガイドラインを持つ言語エージェントの間の動的な会話をエミュレートする。MITライセンス。後継の[[tau2-bench|τ²-bench]]がdual-control(ユーザー側もツール呼び出し可能)へ拡張している。

## 評価ドメイン

retail(115タスク)・airline(50タスク)の2ドメイン、計165タスクで構成される。τ²-benchと異なり、ツールを呼び出すのはエージェント側のみ。

## pass^kという評価指標

同一タスクをk回試行し、**k回すべてが成功して初めてpass**とみなす指標。best-of-k(k回中1回成功すればよい)とは異なり、モデルの一貫性の欠如(同じタスクでも試行ごとに成否がぶれること)を可視化できる。

## 成功判定の仕組み

各タスクはユーザーからのリクエストで始まり、エージェントが型付きAPIツールを呼びながら多ターン対話を行う。会話終了時のDB状態と、注釈付けされたゴール状態を比較して成否を判定する。

## 性能傾向

発表当時、gpt-4oのような最先端のfunction calling agentでもタスク成功率は50%未満にとどまり、pass^8(8回連続成功)ではretailで25%未満と、一貫性の低さが顕著だった。

## 出典

- [τ-bench: A Benchmark for Tool-Agent-User Interaction in Real-World Domains (arXiv)](https://arxiv.org/pdf/2406.12045)
- [GitHub - sierra-research/tau-bench](https://github.com/sierra-research/tau-bench)
- [𝜏-Bench: Benchmarking AI agents for the real-world - Sierra](https://sierra.ai/blog/benchmarking-ai-agents)
