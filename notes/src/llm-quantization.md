---
created: 2026-08-17 18:32
updated: 2026-08-17 18:32
---
# LLMの量子化

学習済みモデルの重み(や場合によってアクティベーション・KVキャッシュ)を、FP32/BF16のような高精度形式から、INT8・INT4・FP8・MXFP4のような低ビットの形式へ変換する技術。メモリ使用量削減と推論高速化が主目的で、モデル配布時の標準的な工程になっている。

## 目的

- **メモリ削減**: たとえば7BパラメータモデルはFP32で約28GB必要だが、INT8なら約7GBまで圧縮できる。
- **推論高速化**: GPUのメモリ帯域幅の制約が軽くなり、トークンあたりのレイテンシが下がる。H100 SXMではFP8/INT8がBF16/FP16(1,979 TFLOPS)の約2倍(3,958 TFLOPS/TOPS)の性能を出せる。

## 何を量子化するか

- **重み量子化**: 最も一般的で、安定性が高い。
- **アクティベーション量子化**: 外れ値の影響を受けやすく、重みより難しい。
- **KVキャッシュ量子化**: 推論時のメモリ削減のため別途行われることがある。

## 代表的な手法

- **GPTQ**: 3〜4ビット圧縮で精度損失を最小限に抑える手法。学習不要(post-training)。
- **AWQ**: 重みのうち重要な約1%をアクティベーション統計に基づいて保護しながら量子化する手法。エッジデバイス向け。
- **SmoothQuant**: 訓練不要でW8A8(重み・アクティベーションとも8bit)量子化を行う後処理手法。
- **MXFP4**: [[gpt-oss|gpt-oss]]や[[kimi-k3|Kimi K3]]がネイティブ量子化フォーマットとして採用している4bit浮動小数点形式。
- **[[gguf|GGUF]]**: [[ggml|ggml]]/llama.cppエコシステムで使われる、1.5bit〜8bit整数まで複数段階の量子化をサポートするファイルフォーマット。

## 精度とのトレードオフ

低ビット化は情報量の損失を伴うが、GPTQ・AWQ・FP8量子化などの現代的な手法は、元モデルとほぼ同じ精度を保ちながら推論効率を改善するところまで進化しており、多くの本番環境で量子化導入時の品質低下は無視できるレベルになっている。

## 採用例

[[kimi-k2-6|Kimi K2.6]]はネイティブでINT4量子化、[[gpt-oss|gpt-oss]]と[[kimi-k3|Kimi K3]]はMXFP4、[[qwen3-8-27b|Qwen3.8-27B]]はFP8版を配布している。埋め込みモデルの[[bekko-embedding|bekko-embedding]]はトークン埋め込みテーブルをint8量子化してファイルサイズを圧縮している。

## 出典

- [LLM quantization | LLM Inference Handbook (Modular)](https://handbook.modular.com/model-preparation/llm-quantization)
- [LLM Quantization: BF16 vs FP8 vs INT4 (AIMultiple)](https://research.aimultiple.com/llm-quantization/)

#machine-learning #llm
