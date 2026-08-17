---
created: 2026-08-18 08:40
updated: 2026-08-18 08:40
---
# τ²-bench

Sierra Research(カスタマー向けAIエージェントを開発する企業)が公開した、対話型AIエージェントを評価するベンチマーク。2024年6月発表の[[tau-bench|τ-bench]]の拡張版で、カスタマーサポートのようなシナリオでの「ツール呼び出し」「多ターン対話」「ポリシー遵守」を同時に評価する。MITライセンス。 #llm #benchmark #agent

## τ-bench(オリジナル)との違い

- τ-benchはretail(115タスク)・airline(50タスク)の2ドメイン、計165タスクで、エージェント側だけがツールを呼び出す
- τ²-benchでは**dual-control**設定を導入し、エージエントだけでなくユーザーシミュレータ側もツール呼び出しを行えるようにした。技術サポートでユーザー自身が端末を操作する場面など、より実際の状況に近いシナリオを再現する
- ドメインにtelecom(114タスク)を追加

## pass^kという評価指標

τ-benchが導入した指標で、同一タスクをk回試行し、**k回すべてが成功して初めてpass**とみなす。best-of-k(k回中1回成功すればよい)と異なり、モデルの一貫性の欠如を可視化できる。

## 成功判定の仕組み

各タスクはユーザーからのリクエストで始まり、エージェントが型付きAPIツールを呼びながら多ターン対話を行う。以下3点を満たすと成功と判定される。

- ユーザーの意図が満たされている
- DB状態が正しい結果を反映している
- 対話の軌跡がそのドメインのポリシーに準拠している

## その後の展開: τ³-bench

同じ`sierra-research/tau2-bench`リポジトリはその後も更新が続き、知識検索ドメイン(`banking_knowledge`。RAGベースで約700文書・約19.5万トークンの知識ベースを使う)、リアルタイム音声対応(full-duplex voice)、既存タスクの75件以上の修正を加えたτ³-bench(tau3-bench)へと発展している。[[j-tau-bench|j-tau-bench]]が土台にしたのは、この拡張が入る前のτ²-bench時点のコード。

## [[j-tau-bench|j-tau-bench]]との関係

j-tau-bench(SB Intuitions製)は、τ²-benchを日本語ドメイン(telecom_ja/airline_ja/retail_ja)へローカライズしたもの。

## 出典

- [GitHub - sierra-research/tau2-bench](https://github.com/sierra-research/tau2-bench)
- [GitHub - sierra-research/tau-bench](https://github.com/sierra-research/tau-bench)
- [τ²-Bench: Evaluating Conversational Agents in a Dual-Control Environment (arXiv)](https://arxiv.org/pdf/2506.07982)
- [τ-bench: A Benchmark for Tool-Agent-User Interaction in Real-World Domains (arXiv)](https://arxiv.org/pdf/2406.12045)
- [τ³-Bench: Advancing agent evaluation to knowledge and voice | Sierra](https://sierra.ai/blog/bench-advancing-agent-benchmarking-to-knowledge-and-voice)
- [Tau-Bench Retail and Airline: 165 Tasks, Frontier Pass^1 Below 70%](https://benchmarkingagents.com/tau-bench-retail-airline/)
