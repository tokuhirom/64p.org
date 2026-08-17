---
created: 2026-08-17 20:57
updated: 2026-08-17 20:57
---
# j-tau-bench

[SB Intuitions](https://www.sbintuitions.co.jp/)が公開している、日本語での対話型AIエージェントの能力を測定するベンチマーク。カスタマーサポートのようなシナリオで、ポリシーに従いつつツール呼び出し・ユーザー対話を正確にこなせるかを評価する。Sierra Research製のτ²-bench(tau2-bench)を土台に日本語ドメインへローカライズしたもので、Modified MIT Licenseで公開されている。 #llm #benchmark #agent

## 元になったτ²-bench

τ²-bench(τ-benchの拡張版)は、多ターンの「ユーザー-エージェント」対話をシミュレートし、以下3点を同時に評価するベンチマーク。

- 動的な多ターン対話への対応
- 提供されたAPIツールの適切な呼び出し
- ビジネスポリシー・ガイドラインの遵守

オリジナル版の特徴は、エージェント側だけでなくユーザー側もツール呼び出しを行える「dual-control」設定で、実際の技術サポート・共同トラブルシューティングに近い状況を再現する。テレコム・小売・航空の3ドメインを持ち(テレコムのみで114タスク)、MITライセンスで公開されている。

## 日本語ドメイン

j-tau-benchが追加する3ドメイン。

- **telecom_ja** — 通信事業者のカスタマーサポート(端末操作指示)
- **airline_ja** — 航空会社のカスタマーサポート(予約管理・変更)
- **retail_ja** — 小売業のカスタマーサポート(注文・返品処理)

単純な翻訳だけでなく、`retail_ja`・`airline_ja`ではタスク内容自体にも変更を加えている(詳細は`TASK_CHANGES.md`)。評価フレームワーク側にも独自の手入れが入っており、エラー分類の見直しやClaude向けプロンプトキャッシュの有効化などが行われている。

## 使い方

`uv`パッケージマネージャー前提。モデル指定はLiteLLM形式(vLLMサーバー・API双方対応)。

```sh
uv run tau2 run --domain telecom_ja --agent-llm <llm_name> --user-llm <llm_name> --num-trials 1
```

結果は`data/simulations/`に保存され、`uv run tau2 view`で確認する。`retail_ja`はLLMによる対話内容の評価を報酬判定に使うため、評価用モデルを環境変数(`TAU2_NL_ASSERTIONS_MODEL`等)で別途指定する必要がある。

## 出典

- [GitHub - sbintuitions/j-tau-bench](https://github.com/sbintuitions/j-tau-bench)
- [GitHub - sierra-research/tau2-bench](https://github.com/sierra-research/tau2-bench)
- [τ²-Bench: Evaluating Conversational Agents in a Dual-Control Environment (arXiv)](https://arxiv.org/pdf/2506.07982)
- [τ-bench: A Benchmark for Tool-Agent-User Interaction in Real-World Domains (arXiv)](https://arxiv.org/pdf/2406.12045)
