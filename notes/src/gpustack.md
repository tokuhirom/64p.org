---
created: 2026-08-14 09:19
updated: 2026-08-19 17:09
---
# GPUStack

複数のGPUを束ねてLLMの推論・サービングを行うためのオープンソースのGPUクラスタ管理プラットフォーム。Seal, Inc.が開発しており、Apache License 2.0で公開されている。 #llm #gpu

## 特徴

- 単一のGPUStackサーバがオンプレミス・Kubernetesクラスタ・クラウドプロバイダーをまたいで複数のGPUクラスタを一元管理できる（マルチクラスタ管理）
- [[vllm|vLLM]]・SGLang・TensorRT-LLMなど複数の推論エンジンをプラガブルに扱い、モデルに応じて自動選択・自動構成する。カスタムエンジンの追加も可能
- NVIDIA・AMDに加え、Ascend NPU・Hygon DCU・Moore Threads・MetaX・Cambricon MLU・Iluvatar・T-Head PPUなど幅広いアクセラレータをサポート
- OpenAI互換・Anthropic互換のAPIで推論エンジンを提供する
- Grafana/[[prometheus|Prometheus]]と連携した監視ダッシュボードで、システムの健全性・メトリクスを可視化する

## [[vllm|vLLM]]とのレイヤーの違い

vLLMは単一ノード上でLLM推論を実行する推論エンジンそのものであり、GPUStackはそのvLLM(やSGLang、TensorRT-LLMなど)を部品として使う側の管理レイヤーにあたる。GPUStackは複数GPU・複数ノードにまたがるクラスタ管理、リソーススケジューリング、どの推論エンジンをどう構成するかの自動選択、ロードバランシング、認証・監視、統一APIゲートウェイなどを担う。Kubernetesにおけるコンテナランタイムとオーケストレータの関係に近い。

## Kubernetesとの関係

登場時のコンセプトは、Kubernetesのような複雑なクラスタリングソフトウェアを個別にインストール・管理しなくても、組織が自前のGPU群の上でLLM環境を構築できるようにすることだった。バージョン2.0ではKubernetesクラスタ自体もGPUStackが管理対象に含められるようになっている。

## 類似ツールとの違い

- LM Studio・LocalAIは単一マシン上でのみ動作するのに対し、GPUStackは複数GPUをまたいで統一クラスタを構成できる点が異なる
- [[ollama|Ollama]]のモデルライブラリとのモデル互換性を持ちつつ、認証・アクセス制御などエンタープライズ向け機能を追加で提供する

## 出典

- [GitHub - gpustack/gpustack](https://github.com/gpustack/gpustack)
- [Overview - GPUStack](https://docs.gpustack.ai/2.0/overview/)
- [Introducing GPUStack: An open-source GPU cluster manager for running LLMs - Medium](https://medium.com/@gpustack.ai/introducing-gpustack-an-open-source-gpu-cluster-manager-for-running-llms-0f0a3cb104a7)
- [GitHub - gpustack/gpustack (README)](https://raw.githubusercontent.com/gpustack/gpustack/main/docs/overview.md)
