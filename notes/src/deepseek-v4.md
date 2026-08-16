---
created: 2026-08-16 13:30
updated: 2026-08-16 13:30
---
# DeepSeek V4

DeepSeekが2026年4月24日にプレビュー公開したモデル。その後正式版として`DeepSeek-V4-Flash-0731`(2026年7月31日)、`DeepSeek-V4-Pro-0813`(2026年8月13日)が旧プレビュー版を置き換える形でリリースされている。V4-Pro/V4-Flashの2バリアント構成。[[open-weight-llm-moc|オープンウェイトLLM MOC]]の一員。

## ライセンス

MIT(報道ベース。Hugging Face公式ブログには明記なし)。

## アーキテクチャ

- V4-Pro: 総パラメータ1.6T、アクティブ49B。V4-Flash: 総パラメータ284B、アクティブ13B。共にMoE構成。
- ハイブリッド注意機構を採用: Compressed Sparse Attention(CSA、4倍圧縮率でlightning indexerが圧縮ブロックからトップkを選択)とHeavily Compressed Attention(HCA、128倍圧縮率ですべての圧縮ブロックへ密な注意)を組み合わせ、長文脈での効率を改善している。
- thinking/non-thinkingのハイブリッド切り替えと、reasoning_effort(low/high/max)の指定に対応。

## コンテキスト長

V4-Pro・V4-Flashともに1,000,000トークン(1M)を公式にサポート。

## DeepSeek V3系列からの進化点

V4-Pro(1M文脈設定)はDeepSeek-V3.2比で、単一トークン推論FLOPsが27%減、KVキャッシュサイズが10%程度(グループ化クエリ注意比較では約2%との記載もあり)まで削減されたと公式ブログに記載されている。ツール呼び出しをまたいだ推論の保持など、エージェント能力も大きく強化された。

## ベンチマークについて(要検証・数値に食い違いあり)

Hugging Face公式ブログの記載値: SWE-bench Verified 80.6%(V4-Pro-Max)、Terminal Bench 2.0 67.9、MCPAtlas Public 73.6、Toolathlon 51.8。

一方、別の二次情報源では「DeepSeek V4-Pro-0813がSWE-bench Verifiedで96.40%、Claude Opus 5に次ぐ2位」との記載があるが、これは異なるモデルバリアント・異なる測定条件による可能性が高く、公式値の80.6%と大きく食い違う。裏取りできておらず、数値を引用する際は注意が必要。同様に「R&Dコーディングタスクでpass rate 67%、Claude Sonnet 4.5(47%)を上回りClaude Opus 4.5(70%)に迫る」との報道も一次情報で確認できていない。

## [[open-weight-llm-moc|オープンウェイトLLM]]の中での位置づけ

V4-Proは1.6兆総パラメータで、[[kimi-k3|Kimi K3]](2.8兆)に次ぐ規模。MITライセンスで商用利用の制約がほぼない点はQwen・Mistral・gpt-ossと同じ陣営。V4-Flashは284Bとより軽量な選択肢として併存する。

## 出典

- [DeepSeek-V4 (Hugging Face Blog)](https://huggingface.co/blog/deepseekv4)
- [DeepSeek-V4-Pro-0813 (Hugging Face)](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813)
- [DeepSeek-V4-Flash-0731 (Hugging Face)](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731)
- [DeepSeek open sources V4-Flash (Open Source For You)](https://www.opensourceforu.com/2026/08/deepseek-open-sources-v4-flash/)
- [DeepSeek V4 (morphllm)](https://www.morphllm.com/deepseek-v4)

#deepseek #llm #open-weight
