---
created: 2026-08-17 18:32
updated: 2026-08-19 17:09
---
# GGUF

[[ggml]]エコシステム([[llama-cpp|llama.cpp]]含む)で使われる、量子化済みモデルの配布・ロード用ファイルフォーマット。GGML Universal Formatの略。

## 背景

当初モデルの保存には独自の「GGML」フォーマットが使われていたが、モデルアーキテクチャごとに専用のロードコードが必要で、メタデータもハードコードされたり別ファイルに分かれていたりと脆弱だった。[[llama-cpp|llama.cpp]]が数十のアーキテクチャと複数の量子化方式に対応するよう成長した2023年8月、後方互換性のない、より高機能な後継フォーマットとしてGGUFが導入された。

## 特徴

- モデルのロードに必要な情報(トークナイザーを含む)を単一ファイルに完結させる設計。
- 数か月のうちにローカルLLM配布の事実上の標準になった。
- 量子化は1.5bit〜8bit整数まで複数段階をサポートする。

## 出典

- [GGML Tensor Library | ggml-org/llama.cpp | DeepWiki](https://deepwiki.com/ggml-org/llama.cpp/4-ggml-tensor-library)
- [GGUF File Format Explained (llama.cpp)](https://apxml.com/courses/practical-llm-quantization/chapter-5-quantization-formats-tooling/gguf-format)

#machine-learning #llm #cpp
