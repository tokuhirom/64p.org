---
created: 2026-08-16 13:30
updated: 2026-08-16 13:30
---
# Mistral Large 3

フランスのMistral AIが2025年12月2日にリリースしたモデル(モデルID: `mistral-large-2512`、末尾は2025年12月を示す)。小型dense勢の「Ministral」(14B/8B/3B)とともに発表された「Mistral 3」ファミリーの最上位モデル。NVIDIA H200 GPU 3,000基でゼロから学習された。[[open-weight-llm-moc|オープンウェイトLLM MOC]]の一員。

## ライセンス

Apache 2.0。商用・個人利用ともに制限なし。

## アーキテクチャ

- スパースMixture-of-Experts(MoE)。総パラメータ675B、アクティブパラメータ41B/トークン。
- Mistral公式は「Mixtral以来初めての自社MoEモデル」と位置づけている。前世代のMistral Large 2はdenseアーキテクチャだったため、MoEへの転換は大きな変化。
- ネイティブに画像理解へ対応するマルチモーダルモデル。40以上の言語に対応する多言語性能が強化された。
- コンテキスト長は複数の技術解説サイトが256Kトークンと報告しているが、公式ブログ本文では確認できていない(要検証)。

## ベンチマーク

Mistral公式ブログの記載によれば、LMArena(OSS・非推論モデル部門)で2位、LMArena全体(OSSモデル部門)で6位。Large 3自体の推論特化版は「近日公開予定」とされ、記事執筆時点では詳細なベンチマーク数値は限定的。

## [[open-weight-llm-moc|オープンウェイトLLM]]の中での位置づけ

675B/41BアクティブのMoEで、[[gpt-oss|gpt-oss-120b]]や[[qwen3-8-27b|Qwen3.8-27B]]よりは大きく、[[kimi-k2-6|Kimi K2.6]]や[[deepseek-v4|DeepSeek V4-Pro]]の1兆パラメータ級よりは小さい中間的な規模。ライセンスはApache 2.0で制約が緩い。

## 出典

- [Introducing Mistral 3 (Mistral AI公式)](https://mistral.ai/news/mistral-3/)
- [Mistral Large 3: The 675B Open-Weight MoE Model Developer Guide (DEV Community)](https://dev.to/jangwook_kim_e31e7291ad98/mistral-large-3-the-675b-open-weight-moe-model-developer-guide-250a)
- [Mistral Large 3: An Open-Source MoE LLM Explained (IntuitionLabs)](https://intuitionlabs.ai/articles/mistral-large-3-moe-llm-explained)

#mistral #llm #open-weight
