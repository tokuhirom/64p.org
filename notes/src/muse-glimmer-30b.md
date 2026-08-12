---
created: 2026-08-11 09:44
updated: 2026-08-12 13:02
---
# Muse Glimmer 30B

Meta（Meta Superintelligence Labs）が2026年8月10日に発表した、300億パラメータのAIモデル。ローカル環境で動くAIエージェント向けに設計されている。

## 概要

- Apache 2.0ライセンスでオープンウェイトとして公開。
- 専用の知覚エンコーダを備えた300億パラメータの因果言語モデルで、より大規模な「Muse Spark」モデルから蒸留（distillation）され、コンシューマー向けハードウェア上での自律的なエージェントタスクに特化して設計されている。
- 多段階の推論（multi-step reasoning）、信頼性の高いツール呼び出し（tool use）、マルチモーダル理解、失敗からの回復（failure recovery）を単一モデルに統合しており、クラウドインフラやネットワーク接続なしにローカルだけで完結して動作する。

## 想定用途

- ローカルのコーディングエージェント、LLM-as-a-judge評価、エンドツーエンドのエージェンティックタスク完遂など、常時稼働するローカルエージェントワークフロー向けに最適化。
- 長時間にわたるタスク実行、正確なツール呼び出し、マルチモーダル理解、長文脈メモリ、指示追従を組み合わせることを目指した設計。

## 動作要件・性能

- 量子化した状態で20GB未満のメモリで動作可能とされ、単一のコンシューマー向けGPUでも動く小規模設計。
- AMD Ryzen AI Max+ 395プロセッサで最大24 tokens/秒、AMD Radeon AI PRO R9700 GPU（dFlash有効時）で最大53 tokens/秒という初期ベンチマーク結果が報告されている。
- Hugging Face上で公開されており（`meta-models/Muse-Glimmer-30B`など）、unslothによる[[ggml|GGUF]]量子化版も配布されている。

## 出典

- [Meta Publishes Muse Glimmer As 30B Open Agentic Model - Phoronix](https://www.phoronix.com/news/Meta-Muse-Glimmer)
- [Meta launches Muse Glimmer, a 30B AI model designed for local AI agents - Digit](https://www.digit.in/news/general/meta-launches-muse-glimmer-a-30b-ai-model-designed-for-local-ai-agents.html)
- [Run Meta Muse Glimmer 30B on AMD Ryzen™ AI Max Agentic PCs and Radeon™ GPUs - AMD](https://www.amd.com/en/blogs/2026/run-meta-muse-glimmer-30b-on-amd-ryzen-ai-max-and-radeon-gpus.html)
- [meta-models/Muse-Glimmer-30B - Hugging Face](https://huggingface.co/meta-models/Muse-Glimmer-30B)

#llm #meta
