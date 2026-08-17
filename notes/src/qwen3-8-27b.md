---
created: 2026-08-16 12:48
updated: 2026-08-17 18:32
---
# Qwen3.8-27B

Alibaba傘下のQwen Teamが2026年8月14日にリリースした、27.78Bパラメータのdense(非[[moe|MoE]])モデル。Hugging Faceに`Qwen/Qwen3.8-27B`(および[[llm-quantization|量子化]]版`Qwen/Qwen3.8-27B-FP8`)として公開されており、ライセンスはApache 2.0。[[open-weight-llm-moc|オープンウェイトLLM MOC]]の一員。

## アーキテクチャ

- 64層のdense構成(MoEではない)。Gated DeltaNetとGated Attentionを組み合わせた設計。
- ネイティブなvision-language対応で、画像・動画を直接理解できるマルチモーダルモデル。
- チャットテンプレートでthinking(推論過程を出す)/no-thinking(即答)を切り替え可能。thinkingを使う場合もreasoning_effortをxhigh(デフォルト)/medium/lowの3段階で調整できる。

## コンテキスト長

ネイティブで262,144トークン、YaRNによる拡張で最大1,000,000トークンまで扱える。ホスト版(Alibaba提供のAPI/サービス)ではデフォルトで1Mコンテキストが有効になるとの情報がある。

## Qwen3.5系列との関係

Qwen3.5をアーキテクチャ基盤とした後継モデル。Qwen3.6-27B→Qwen3.7-Plus→Qwen3.8という連番で進化しており、Qwen公式のベンチマークでは同世代の中で最も能力が高いモデルと位置づけられている。コーディング・専門的作業・研究・長時間稼働のエージェントタスクで前世代からの伸びが大きいとされる。

## ベンチマークについて(要検証)

Qwen公式評価(Claude Codeハーネス使用、temperature 1.0/top-p 0.95/256Kコンテキスト)として、SWE-bench Pro・OSWorld・Terminal-Bench・DeepSWE・NL2Repo-Benchなどでの数値がいくつかのサイトで報告され、一部項目(SWE-bench Pro、QwenSWEBench、LiveCodeBench v6、OSWorld、AndroidWorld)でClaude Opus 4.6 Maxを上回ったとされる一方、Terminal-BenchやNL2Repo-BenchではOpus優位との報告もある。ただしこれらの数値の出典はlocal-ai-zone.github.io・lovableapp.org・emergent.sh・nxcode.ioなどの二次的なサイトが中心で、Qwen公式のリリースノート/テクニカルレポートで直接確認できていない。正確な数値を引用する際はQwen公式ソースでの裏取りが必要。

## AMDでのDay 0サポート

AMDはリリース当日にQwen3.8-27Bのローカル実行サポートを発表した。AMD Ryzen AI Max+ 395で最大24.5 tokens/sec、AMD Radeon AI PRO R9700(単体)で最大51.8 tokens/secという初期テスト結果が報告されている。

## [[open-weight-llm-moc|オープンウェイトLLM]]の中での位置づけ

27.78Bのdenseモデルで、比較的軽量(単一GPU〜ハイエンドPCで動く規模)なライセンス緩め(Apache 2.0)な選択肢。[[kimi-k3|Kimi K3]]や[[kimi-k2-6|Kimi K2.6]]のような兆パラメータ級MoEとは対照的な「小さくても賢い」路線に位置する。

## 出典

- [Qwen/Qwen3.8-27B (Hugging Face)](https://huggingface.co/Qwen/Qwen3.8-27B)
- [Qwen/Qwen3.8-27B-FP8 (Hugging Face)](https://huggingface.co/Qwen/Qwen3.8-27B-FP8)
- [Run Qwen 3.8 27B on AMD Ryzen AI Max Agentic PCs and Radeon GPUs (AMD Blog)](https://www.amd.com/en/blogs/2026/run-qwen-3-8-27b-on-amd-ryzen-ai-max-and-radeon-graphics-cards-day-0.html)
- [AMD Stock Rises Over 3% as AI Model Qwen3.8 27B Gets Day 0 Support (TipRanks)](https://www.tipranks.com/news/amd-stock-rises-over-3-as-ai-model-qwen3-8-27b-gets-day-0-support)

#qwen #alibaba #llm #open-weight
