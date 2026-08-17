---
created: 2026-08-17 18:32
updated: 2026-08-17 18:32
---
# Per-Layer Embedding (PLE)

GoogleがGemma 3n(2025年)で導入し、Gemma 4でも使われているアーキテクチャ上の工夫。各デコーダ層に小さな低次元の条件付けベクトルを供給する並列パスを追加しつつ、そのベクトル自体はGPU VRAM上のモデル本体メモリの外に置くことで、埋め込みパラメータのメモリコストを回避する。

## 仕組み

トークンごとに、トークンIDに基づく成分(専用の埋め込みルックアップテーブル)と、メイン埋め込みの学習済み射影によるコンテキスト依存成分を組み合わせて層ごとのベクトルを生成する。このPLEデータはモデルの実行時メモリ(GPU VRAM)の外で別途生成され、高速ストレージにキャッシュされたうえで、各層が実行されるタイミングで推論プロセスに加算される。

## メモリ効率への効果

PLEパラメータをGPUの高速だが希少なVRAMから、より大容量だがアクセスの遅いCPU RAM側へオフロードすることで、モデル品質を落とさずに実効メモリ使用量を削減できる。Gemma 3n E2Bモデルでは、生パラメータ数は約50億であるにもかかわらず、PLEキャッシュ機構により実効メモリ負荷は約19.1億パラメータ相当まで圧縮される。名目上「2B」を名乗れるのはこのため。

## 出典

- [Gemma 3n model overview (Google AI for Developers)](https://ai.google.dev/gemma/docs/gemma-3n)
- [Gemma 4 uses Shared KV cache and Per-layer Embeddings (Cameron R. Wolfe, X/Twitter)](https://x.com/cwolferesearch/status/2040487873854542324)
- [Gemma 4 Architecture Explained: Per-Layer Embeddings, Shared KV Cache, and Dual RoPE (Botmonster Tech)](https://botmonster.com/posts/gemma-4-architecture-per-layer-embeddings-shared-kv-cache-dual-rope/)

#machine-learning #llm
