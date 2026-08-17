---
created: 2026-08-12 13:02
updated: 2026-08-17 18:32
---
# transcribe.cpp

#machine-learning #speech-recognition #cpp

[[ggml|ggml]]（軽量テンソル演算ライブラリ）ベースの音声認識（ASR: Automatic Speech Recognition）推論エンジン。GitHub上で`handy-computer/transcribe.cpp`として公開されている。whisper.cppの直接的な後継・置き換えを目指すプロジェクトで、多くのユースケースでwhisper.cppとほぼそのまま置き換え可能とされる（既存の`.bin`ファイルとの互換性も含む）。

## 開発の背景

音声入力アプリ「Handy」の開発者cjpaisによる作品。Handyはこれまでwhisper.cppを推論エンジンとして使っていたが、次バージョンではtranscribe.cppに置き換わる予定という位置づけ。

## whisper.cppとの違い

whisper.cppはOpenAIのWhisperモデル専用の実装だったのに対し、transcribe.cppはWhisper以外の多数のASRモデルファミリーを横断的にサポートする、より汎用的な後継ライブラリという位置づけ。

## 特徴

- **対応モデル数**: 16種類以上のモデルファミリー、60以上のバリエーションに対応（[[gguf|GGUF]]形式）
  - Whisper（tiny〜large-v3-turbo、12バリエーション）に加え、Parakeet、Canary（NVIDIA製）、Moonshine、SenseVoice、Qwen3-ASR、GigaAM、Voxtralなど幅広くカバー
  - 話者分離（diarization）専用のSortformerにも対応
- **品質保証**: 公開している全モデルでWER（単語誤り率）を検証済み
- **GPUバックエンド**: Metal（Apple Silicon）、Vulkan、CUDA、TinyBLAS（GPU非搭載CPU向け最適化パス）に対応し、AMD/Intel/NVIDIA/Appleを横断してカバー
- **言語バインディング**: Python、JavaScript/TypeScript、Rust、Objective-C/Swiftの公式バインディングあり

## ビルド

```sh
cmake -B build && cmake --build build
```

Apple SiliconではMetalが自動有効化される。Vulkan（Linux/Windows）・CUDA・HIP/ROCmは対応オプションとして用意されている。量子化ツールのビルドには`-DTRANSCRIBE_BUILD_TOOLS=ON`フラグが必要。

## 出典

- [GIGAZINE記事](https://gigazine.net/news/20260811-transcribe-cpp/)
- [transcribe.cpp: An ASR Alternative to whisper.cpp](https://elsolitario.org/en/2026/07/19/transcribe-cpp-asr-library-ggml/)
- [GitHub - handy-computer/transcribe.cpp](https://github.com/handy-computer/transcribe.cpp)
- [GitHub - cjpais/Handy](https://github.com/cjpais/Handy)
