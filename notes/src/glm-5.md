---
created: 2026-08-16 13:30
updated: 2026-08-16 13:30
---
# GLM-5.2 / GLM-5.3

中国のZhipu AI(国際ブランド名Z.ai)が開発するGLMシリーズの最新世代。GLM-5.2は2026年6月13〜16日リリース、GLM-5.3は2026年8月14日リリース。[[open-weight-llm-moc|オープンウェイトLLM MOC]]の一員。

## 系譜

GLM(2022年5月発表の自己回帰的空白充填モデル)→GLM-4-Plus(2024年8月)→GLM-4.5/4.5 Air(2025年7月)→GLM-5(2026年2月12日)→GLM-5.1(2026年4月7日オープンソース化)→GLM-5.2(2026年6月)→GLM-5.3(2026年8月)。Zhipu AIは2025年に国際ブランド名を「Z.ai」に変更し、2026年1月8日に香港証券取引所へ上場した。

## GLM-5.2

- ライセンス: MIT、地域制限なし。自己ホスティング・ファインチューニング・商用利用可能。
- アーキテクチャ: MoE構成、総パラメータ約744B、アクティブパラメータ約40B/トークン。
- コンテキスト長: 1,000,000トークン(前世代GLM-5.1の200,000トークンから大幅拡張)。単一レスポンスは最大131,072トークンまで。
- ベンチマーク: Terminal-Bench 2.1で81.0、SWE-bench Proで62.1。複数の長期コーディングベンチマークでGPT-5.5を上回り、コストは約1/6と報道されている。
- 料金: 入力$1.40/出力$4.40(百万トークンあたり)。
- 重み公開先: Hugging Face `zai-org/GLM-5.2`、ModelScope。

## GLM-5.3

GLM-5.2と**同一の約744Bベースモデルを再学習せず**、ポストトレーニング(強化学習等)のみを大規模化して性能を向上させたモデル。アーキテクチャ・パラメータ数はGLM-5.2から変更なし。改善点はコーディング(特に長時間タスク)とサイバーセキュリティ分野で、Terminal-Bench 3.0は4.6から28.3へ向上した。

**注意**: API/GLM Coding Planでは提供開始済みだが、モデルの重み自体は本ノート執筆時点(リリース直後)で未公開。Z.aiは安全性評価完了後、約2週間後に重みを公開予定と表明している。GLM-5.3を「オープンウェイト」として扱うのは重み公開後になる。

## [[open-weight-llm-moc|オープンウェイトLLM]]の中での位置づけ

総パラメータ744Bは[[deepseek-v4|DeepSeek V4-Pro]](1.6T)や[[kimi-k2-6|Kimi K2.6]](1T)よりやや軽量で、[[mistral-large-3|Mistral Large 3]](675B)に近い規模。ライセンスはMITで制約が緩く、ベースモデルを固定したままポストトレーニングだけで版を重ねる開発サイクル(GLM-5.2→5.3)は他モデルにあまり見られない特徴。

## 出典

- [Zhipu AI Releases GLM-5.2 (datanorth.ai)](https://datanorth.ai/news/zhipu-ai-releases-glm-5-2)
- [Zhipu AI GLM-5.2 open source MIT (Pandaily)](https://pandaily.com/zhipu-ai-glm-5-dot-2-open-source-mit-jun2026)
- [GLM-5.2 Open Source Release (Stable-Learn)](https://stable-learn.com/en/glm-5-2-open-source-release/)
- [GLM-5.2 Open Weights LLM (go-to-agency.com)](https://go-to-agency.com/en/blog/glm-5-2-open-weights-llm)
- [Z.ai Launches GLM-5.3 With Frontier Coding (Unite.AI)](https://www.unite.ai/z-ai-launches-glm-5-3-with-frontier-coding-and-a-cyber-capability-that-outgrew-its-training/)
- [Z.ai ships GLM-5.3 without retraining the base model (MarkTechPost)](https://www.marktechpost.com/2026/08/14/z-ai-ships-glm-5-3-without-retraining-the-base-model-better-at-complex-coding-and-long-horizon-tasks/)
- [Z.ai (Wikipedia)](https://en.wikipedia.org/wiki/Z.ai)

#glm #zhipu-ai #llm #open-weight
