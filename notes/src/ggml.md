---
created: 2026-08-12 13:02
updated: 2026-08-21 21:10
---
# ggml

#machine-learning #cpp

Georgi Gerganov氏が2022年から開発している、機械学習推論向けのC/C++製テンソル演算ライブラリ。名前は開発者のイニシャル「GG」+「ML」に由来する。[[llama-cpp|llama.cpp]]やwhisper.cpp、[[transcribe-cpp|transcribe.cpp]]など、C/C++で書かれたローカル推論エコシステム全体を支える計算基盤になっている。

## 特徴

- **計算グラフベースの実行**: 演算を一度定義し、複数回実行できる計算グラフ抽象を持つ。中核データ構造`ggml_tensor`は最大4次元のn次元配列とメタデータを表し、実際の計算はグラフのcompute呼び出しまで遅延される。
- **メモリ効率**: コンテキストベースのメモリ確保とカスタムアロケータにより、メモリ使用量を細かく制御できる。
- **ハードウェア抽象化**: [[blas|BLAS]]、CUDA、HIP/ROCm、OpenCL、Metalなど複数のバックエンドをプラガブルに切り替えられる仕組みを持つ。
- **[[llm-quantization|量子化]]サポート**: float型に加え、複数の圧縮フォーマット（量子化型）をサポートする型システムを持つ。
- 軽量・移植性・組み込みやすさを重視した設計で、C/C++で書かれている。

## GGUFフォーマットとの関係

モデルの保存・配布用フォーマットである[[gguf|GGUF]]は、ggmlの後継フォーマットとして生まれた。詳細は[[gguf|GGUFのノート]]を参照。

## 出典

- [GGML Tensor Library | ggml-org/llama.cpp | DeepWiki](https://deepwiki.com/ggml-org/llama.cpp/4-ggml-tensor-library)
- [GGML Core Architecture | ggml-org/llama.cpp | DeepWiki](https://deepwiki.com/ggml-org/llama.cpp/4.1-ggml-core-architecture)
- [ggml-org/ggml | DeepWiki](https://deepwiki.com/ggml-org/ggml)
