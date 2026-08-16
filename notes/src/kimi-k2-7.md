---
created: 2026-08-16 12:48
updated: 2026-08-16 12:48
---
# Kimi K2.7 Code

Moonshot AIが2026年6月12日にリリースした、[[kimi-k2-6|Kimi K2.6]]のアーキテクチャ(1兆パラメータMoE、アクティブ320億、Modified MITライセンス)を継承しつつコーディング能力に特化してファインチューンした後継モデル。K2.6が汎用モデルであるのに対し、K2.7 Codeはコーディング専用という位置づけ。[[open-weight-llm-moc|オープンウェイトLLM MOC]]の一員。

## アーキテクチャ・仕様

- 1兆パラメータMoE、アクティブパラメータ320億/トークン。384エキスパート中8個+共有1個を選択するルーティング。
- コンテキスト長256K。
- 通常版`kimi-k2.7-code`と高速版`kimi-k2.7-code-highspeed`(短文脈で最大260 tok/s)の2種類を提供。
- K2.6比で推論トークン使用量を約30%削減。

## ライセンス

K2.6と同じくModified MIT License。重み自体がオープン(ラッパーコードだけでなく)。

## ベンチマーク

Moonshot公表の6ベンチマーク全てでK2.6を上回り、あるツール使用ベンチマークではClaude Opus 4.8をも上回ったとされる。最も伸びが大きかったのはKimi Code Bench v2で、K2.6の50.9から62.0へ(+21.8%)向上した。

## 料金

入力$0.95/百万トークン(キャッシュヒット時$0.19)、出力$4.00/百万トークン。HighSpeed版は全ティアで通常版の2倍の料金。

## [[open-weight-llm-moc|オープンウェイトLLM]]の中での位置づけ

[[kimi-k2-6|Kimi K2.6]]と同じ1兆パラメータMoE/Modified MITライセンスを継承した、コーディング特化バリアント。汎用性より特定タスク(コーディング)の性能・トークン効率を優先する立ち位置。

## 出典

- [Moonshot AI Releases Kimi K2.7 Code: A Coding Model Reporting 21.8% on Kimi Code Bench v2 Over K2.6 (MarkTechPost)](https://www.marktechpost.com/2026/06/12/moonshot-ai-releases-kimi-k2-7-code-a-coding-model-reporting-21-8-on-kimi-code-bench-v2-over-k2-6/)
- [Kimi K2.7 Code Review (eesel AI)](https://www.eesel.ai/blog/kimi-k2-7-code-review)

#kimi #moonshot-ai #llm #open-weight #coding
