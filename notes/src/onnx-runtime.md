---
created: 2026-08-14 23:00
updated: 2026-08-14 23:00
---
# ONNX Runtime

#machine-learning

Microsoftが開発している、[[onnx|ONNX]]形式のモデルを実行するための高性能な推論・学習エンジン。ONNXはモデルの計算グラフを記述するフォーマットに過ぎず、実際にそのグラフを解釈してハードウェア上で計算を実行する役割をONNX Runtimeが担う。

## アーキテクチャ

ONNX Runtimeはモデルの実行を次の流れで行う。

1. ONNXモデルのグラフを、ONNX Runtime内部のインメモリグラフ表現に変換する。
2. 実行プロバイダに依存しない最適化を適用する。
3. 利用可能な実行プロバイダ(Execution Provider)に基づいてグラフを複数のサブグラフに分割し、各サブグラフを対応する実行プロバイダに割り当てる。

## 実行プロバイダ(Execution Provider)

CPU・GPU・FPGA・専用NPUなど多様なハードウェア上でONNXモデルを実行するためのプラグイン機構。

- 各EP(Execution Provider)は`GetCapability()`というインターフェースを通じて、自身が実行可能なノード/サブグラフをONNX Runtimeに報告する。デフォルト実装では、EPが持つカーネルレジストリと照合してノードごとに判定する。
- デフォルトの実行プロバイダはCPU向けで、より専門的で効率的な実行プロバイダにオフロードできない演算子のフォールバック先として機能する。
- この仕組みにより、ハードウェア固有ライブラリの詳細を抽象化し、CPU・GPU・FPGA・専用NPUといった異なるプラットフォームをまたいでDNN実行を最適化できる。

## 出典

- [ONNX Runtime Architecture](https://onnxruntime.ai/docs/reference/high-level-design.html)
- [Execution Providers | microsoft/onnxruntime | DeepWiki](https://deepwiki.com/microsoft/onnxruntime/6-execution-providers)
- [ONNX Runtime Execution Providers](https://onnxruntime.ai/docs/execution-providers/)
