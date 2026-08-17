---
created: 2026-08-16 13:30
updated: 2026-08-17 18:32
---
# gpt-oss

OpenAIが2025年8月5日にリリースしたオープンウェイトモデル。gpt-oss-120bとgpt-oss-20bの2サイズで構成される。「2019年のGPT-2以来初のオープンウェイトモデル」という位置づけが複数の二次情報源で語られているが、この文言自体はOpenAI公式ページで直接確認できておらず、裏取り不十分な情報として扱う。[[open-weight-llm-moc|オープンウェイトLLM MOC]]の一員。

## ライセンス

Apache 2.0ライセンス + OpenAI独自の「gpt-oss usage policy」の両方が適用される。商用利用・改変・再配布は基本自由。

## アーキテクチャ

| 項目 | gpt-oss-120b | gpt-oss-20b |
| --- | --- | --- |
| 総パラメータ | 116.8B | 20.9B |
| アクティブパラメータ/トークン | 5.1B | 3.6B |
| 層数 | 36 | 24 |
| [[moe|MoE]]エキスパート数 | 128 | 32 |
| コンテキスト長 | 131,072トークン | 131,072トークン |
| チェックポイントサイズ | 60.8 GiB | 12.8 GiB |
| 必要メモリ目安 | 80GB | 16GB |

ネイティブMXFP4[[llm-quantization|量子化]]。alternating dense/locally banded sparse attention + grouped multi-query attentionを採用。学習にo3等OpenAI内部フロンティアモデルの知見を反映したRLを使用している。

## reasoning effort

システムプロンプトのキーワード("Reasoning: low/medium/high")で3段階の推論強度を切り替え可能。レベルを上げるとchain-of-thoughtの平均長が伸び、精度がスムーズにスケールすると報告されている。

## ベンチマーク(公式モデルカード、high設定)

- AIME 2024: gpt-oss-120b 95.8%(ツールなし)/96.6%(ツールあり)、gpt-oss-20b 92.1%/96.0%
- MMLU: gpt-oss-120b 90.0%、gpt-oss-20b 85.3%
- GPQA Diamond: gpt-oss-120b 80.1%、gpt-oss-20b 71.5%
- HLE: gpt-oss-120b 14.9%、gpt-oss-20b 10.9%
- HealthBench: gpt-oss-120b 57.6(o3にほぼ匹敵)、gpt-oss-20b 42.5
- SWE-Bench Verified: gpt-oss-120b 62.4%、gpt-oss-20b 60.7%
- Codeforces Elo: gpt-oss-120b 2622(ツールあり)、gpt-oss-20b 2516

いずれもo4-miniがわずかに上回る水準で、gpt-oss-120bはo3-miniを上回りo4-miniにほぼ匹敵する、との評もある。

## [[open-weight-llm-moc|オープンウェイトLLM]]の中での位置づけ

gpt-oss-20bは[[qwen3-8-27b|Qwen3.8-27B]]と並ぶ軽量級で、16GBメモリでも動作可能な扱いやすさが特徴。gpt-oss-120bは単一の高性能GPUで動く規模でありながら、o3-mini相当の性能を狙える。Apache 2.0ベースでライセンスの制約が緩い点も他の主要オープンウェイトモデルと共通。

## 出典

- [Introducing gpt-oss (OpenAI公式)](https://openai.com/index/introducing-gpt-oss/)
- [gpt-oss-120b & gpt-oss-20b Model Card (arXiv)](https://arxiv.org/html/2508.10925v1)
- [OpenAI gpt-oss 20b & 120b: Overview & Benchmarking Info (Fireworks AI)](https://fireworks.ai/blog/openai-gpt-oss)
- [Analysis of OpenAI's gpt-oss models (Artificial Analysis)](https://artificialanalysis.ai/articles/analysis-openai-gpt-oss-models)

#openai #llm #open-weight
