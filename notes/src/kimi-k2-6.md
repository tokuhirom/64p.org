---
created: 2026-08-16 12:48
updated: 2026-08-17 18:32
---
# Kimi K2.6

Moonshot AIが2026年4月20日にHugging Faceで重みを公開した汎用モデル。1兆パラメータのネイティブマルチモーダル[[moe|MoE]]で、トークンあたり320億のアクティブパラメータを持つ。[[open-weight-llm-moc|オープンウェイトLLM MOC]]の一員で、コーディング特化の後継[[kimi-k2-7|Kimi K2.7 Code]]、上位フラッグシップの[[kimi-k3|Kimi K3]]と同系列。

## アーキテクチャ・仕様

- 1兆パラメータMoE、アクティブパラメータ320億/トークン。ネイティブでINT4[[llm-quantization|量子化]]。
- コンテキスト長262,144トークン。
- Agent Swarmアーキテクチャを搭載し、最大300サブエージェント・4,000協調ステップまで並列実行できる。長時間稼働するコーディングエージェントや、自然言語からのフロントエンド生成を主眼に設計されている。

## ライセンス

Modified MIT License。月間アクティブユーザー1億人超、または月商2,000万ドル超の製品では「Kimi K2.6」ブランドの表示が必須という条項が付く。

## ベンチマーク

HLE-Full(ツール使用あり)で54.0を記録し、同時期のGPT-5.4(52.1)、Claude Opus 4.6(53.0)、Gemini 3.1 Pro(51.4)を上回ったと報告されている。

## 料金

kimi.com/モバイルアプリは無料。APIは入力$0.95/百万トークン、出力$4.00/百万トークン。

## [[open-weight-llm-moc|オープンウェイトLLM]]の中での位置づけ

1兆パラメータMoEの汎用モデル。[[kimi-k3|Kimi K3]]より1世代前・軽量寄りのフラッグシップで、[[kimi-k2-7|Kimi K2.7 Code]]の派生元。ライセンスはModified MIT(大規模利用時にブランド表示義務あり)。

## 出典

- [Moonshot AI Releases Kimi K2.6 With Long-Horizon Coding Agent Swarm Scaling to 300 Sub-Agents and 4000 Coordinated Steps (MarkTechPost)](https://www.marktechpost.com/2026/04/20/moonshot-ai-releases-kimi-k2-6-with-long-horizon-coding-agent-swarm-scaling-to-300-sub-agents-and-4000-coordinated-steps/)
- [What is Kimi K2.6? (Verdent)](https://www.verdent.ai/guides/what-is-kimi-k2-6)

#kimi #moonshot-ai #llm #open-weight
