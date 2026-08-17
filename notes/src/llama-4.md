---
created: 2026-08-16 13:30
updated: 2026-08-17 18:32
---
# Llama 4

Metaが2025年4月5日にリリースした、Llamaシリーズ初の[[moe|Mixture-of-Experts(MoE)]]アーキテクチャモデル。ネイティブなearly fusionによるマルチモーダル(テキスト+画像)対応。Scout・Maverick・Behemothの3サイズで構成される。[[open-weight-llm-moc|オープンウェイトLLM MOC]]の一員。

## Scout / Maverick / Behemoth

| モデル | アクティブ/総パラメータ | エキスパート数 | 特徴 |
| --- | --- | --- | --- |
| Scout | 17B / 109B | 16 | iRoPEアーキテクチャで最大1000万トークンのコンテキスト長。Gemma 3・Gemini 2.0 Flash-Lite・Mistral 3.1をベンチマークで上回るとMetaは主張 |
| Maverick | 17B / 400B | 128 | 単一のNVIDIA H100 DGXホストに収まる設計。GPT-4o・Gemini 2.0 Flashを上回り、DeepSeek V3と推論・コーディングで競合。実験版チャットモデルはLMArenaでELO 1417 |
| Behemoth | 288B / 約2兆 | 16 | Scout/Maverickへ知識蒸留するための「教師モデル」。プレビューのみでSTEM系ベンチマークはGPT-4.5・Claude Sonnet 3.7・Gemini 2.0 Proを上回るとされていた |

## ライセンス

Llama 4 Community License Agreement。月間アクティブユーザー7億人超の企業はMetaへの個別ライセンス申請が必要(許諾するか否かはMetaの裁量)。「Built with Llama」の明示、派生モデル名の先頭に「Llama」を含める義務などの条項がある。Apache/MIT系の他モデルと比べ、制約が多いオープンウェイトライセンス。

## Behemothは正式リリースされずに凍結、後継は「Llama 5」ではなく「Muse」

Behemothは2026年8月時点でも正式リリースされないまま事実上凍結している。2兆パラメータ規模でのMoEルーティング・chunked attentionに技術的課題があり、リリースに見合う効果が得られないとMetaが判断したと報じられている。

「Llama 5」は正式には存在しない。2026年4月発足の「Meta Superintelligence Labs」がフロンティアモデル開発の軸をLlamaブランドから**Muse**系列へ転換し、2026年8月10日にオープンウェイトモデル**Muse Glimmer**(30Bパラメータ、Apache 2.0、利用制限・収益しきい値なし)を公開した。より大きなクローズドモデル「Muse Spark 1.2」から蒸留されたモデルで、コンシューマー向けハードウェアでのローカル・常時稼働エージェント用途を意図している。Muse Spark自体の重みも「近々」オープンソース化予定とMeta Superintelligence責任者Alexandr Wang氏が言及している。

## [[open-weight-llm-moc|オープンウェイトLLM]]の中での位置づけ

初期のLlamaシリーズ(dense)からMoEへ転換した世代。ライセンスがLlama Community Licenseという独自の条件付きライセンスである点が、Apache 2.0系のQwen・Mistral・DeepSeek・gpt-ossなどと大きく異なる。Metaの開発リソースは2026年後半時点でMuse系列に移りつつあり、Llama 4が実質的な最終世代になる可能性がある。

## 出典

- [Llama 4 herd (Meta公式)](https://ai.meta.com/blog/llama-4-multimodal-intelligence/)
- [Llama 4 License Agreement (Meta公式)](https://www.llama.com/llama4/license/)
- [Llama 4 release date 2026 (fazm.ai)](https://fazm.ai/t/llama-4-release-date-2026)
- [Meta's Muse Glimmer open-weight AI (CNBC)](https://www.cnbc.com/2026/08/10/meta-muse-glimmer-open-weight-ai.html)
- [Meta's new Glimmer AI model (TechCrunch)](https://techcrunch.com/2026/08/10/metas-new-glimmer-ai-model-offers-a-hint-at-zuckerbergs-personal-intelligence-vision/)
- [Zuck rekindles open-weights Llama drama with Muse Glimmer (The Register)](https://www.theregister.com/ai-and-ml/2026/08/10/zuck-rekindles-open-weights-llama-drama-with-muse-glimmer/5285666)

#llama #meta #llm #open-weight
