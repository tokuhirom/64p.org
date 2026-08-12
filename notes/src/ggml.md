---
created: 2026-08-12 13:02
updated: 2026-08-12 13:02
---
# ggml

#machine-learning #cpp

Georgi Gerganov氏が2022年から開発している、機械学習推論向けのC/C++製テンソル演算ライブラリ。名前は開発者のイニシャル「GG」+「ML」に由来する。llama.cppやwhisper.cpp、[[transcribe-cpp|transcribe.cpp]]など、C/C++で書かれたローカル推論エコシステム全体を支える計算基盤になっている。

## 特徴

- **計算グラフベースの実行**: 演算を一度定義し、複数回実行できる計算グラフ抽象を持つ。中核データ構造`ggml_tensor`は最大4次元のn次元配列とメタデータを表し、実際の計算はグラフのcompute呼び出しまで遅延される。
- **メモリ効率**: コンテキストベースのメモリ確保とカスタムアロケータにより、メモリ使用量を細かく制御できる。
- **ハードウェア抽象化**: BLAS、CUDA、HIP/ROCm、OpenCL、Metalなど複数のバックエンドをプラガブルに切り替えられる仕組みを持つ。
- **量子化サポート**: float型に加え、複数の圧縮フォーマット（量子化型）をサポートする型システムを持つ。
- 軽量・移植性・組み込みやすさを重視した設計で、C/C++で書かれている。

## GGUFフォーマットとの関係

当初モデルの保存には独自の「GGML」フォーマットが使われていたが、モデルアーキテクチャごとに専用のロードコードが必要で、メタデータもハードコードされたり別ファイルに分かれていたりと脆弱だった。llama.cppが数十のアーキテクチャと複数の量子化方式に対応するよう成長した2023年8月、後方互換性のない、より高機能な後継フォーマットとして**GGUF**（GGML Universal Format）が導入された。GGUFはモデルのロードに必要な情報（トークナイザーを含む）を単一ファイルに完結させる設計で、数か月のうちにローカルLLM配布の事実上の標準になった。量子化は1.5bit〜8bit整数まで複数段階をサポートする。

## 出典

- [GGML Tensor Library | ggml-org/llama.cpp | DeepWiki](https://deepwiki.com/ggml-org/llama.cpp/4-ggml-tensor-library)
- [GGML Core Architecture | ggml-org/llama.cpp | DeepWiki](https://deepwiki.com/ggml-org/llama.cpp/4.1-ggml-core-architecture)
- [ggml-org/ggml | DeepWiki](https://deepwiki.com/ggml-org/ggml)
- [GGUF File Format Explained (llama.cpp)](https://apxml.com/courses/practical-llm-quantization/chapter-5-quantization-formats-tooling/gguf-format)
