---
created: 2026-08-19 17:09
updated: 2026-08-19 17:09
---
# llama.cpp

Georgi Gerganov氏が開発する、[[gguf|GGUF]]形式のモデルをCPU/GPUで動かすためのC/C++製LLM推論エンジン。計算基盤には同氏の[[ggml|ggml]]を使う。バイナリとモデルファイルを渡され、量子化・GPUオフロード・サンプリング・バッチ処理などのパラメータを利用者が細かく指定して使う、低レベル志向のツール。

## 特徴

- モデルのロード・[[llm-quantization|量子化]]・GPUオフロード・サンプリング・メモリ管理などを低レベルに制御できる。
- ロジット制御、文法制約サンプリング(grammar-constrained sampling)、シード指定など、生成の細部までチューニング可能。
- モデルハブや自動ダウンロード、プロセス管理のような高レベル機能は持たない。単一プロセスとして動作するため攻撃面が小さい。
- MITライセンスで、リポジトリ中心の開発体制を取っている。
- 新しいモデルアーキテクチャへの対応が速く、日次更新レベルでの追従がある。

## 上位ツールとの関係

[[ollama|Ollama]]・LM Studio・[[gpustack|GPUStack]]など、ローカルLLM実行を手軽にするツール群の多くが、内部の推論エンジンとしてllama.cppを利用している。llama.cppが低レベルのエンジン、それらのツールがその上に使いやすさの層を被せたクライアントという関係になる。詳細は[[ollama|Ollamaのノート]]を参照。

## 出典

- [Ollama vs. LM Studio vs. llama.cpp: Which Local AI Runtime Should You Use in 2026? - MachineLearningMastery.com](https://machinelearningmastery.com/ollama-vs-lm-studio-vs-llama-cpp-which-local-ai-runtime-should-you-use-in-2026/)
- [Ollama vs llama.cpp: What's the Difference - Atomic Chat](https://atomic.chat/blog/guides/ollama-vs-llamacpp)
- [Ollama vs. llama.cpp: a technical deep dive for developers - Rushi's](https://www.rushis.com/ollama-vs-llama-cpp-a-technical-deep-dive-for-developers/)

#machine-learning #llm #cpp
