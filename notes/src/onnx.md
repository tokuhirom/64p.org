---
created: 2026-08-14 22:57
updated: 2026-08-14 22:57
---
# ONNX (Open Neural Network Exchange)

#machine-learning

機械学習モデルを異なるフレームワーク間で相互運用可能にするためのオープンソースの共通フォーマット。2017年9月にFacebook(現Meta)とMicrosoftが共同で立ち上げ、その後Amazon・IBM・Intel・NVIDIAなど多数の組織がサポートに加わった。

PyTorch・TensorFlow・scikit-learnなど任意のフレームワークで学習したモデルをONNX形式にエクスポートすることで、別の推論エンジンに載せ替えられる。モデルのネットワーク構造(層・接続)とパラメータ(重み・バイアス)をフレームワーク非依存の形でシリアライズし、Linux・Windows・macOS・Android・iOSなど多様な実行環境をまたいで動かせる。

## 技術的な構成

- シリアライズ形式にはGoogleのProtocol Buffers (protobuf)を採用。
- モデルは計算グラフとして表現され、各ノードが演算子(operator)に対応する。
- 演算子は**opset(operator set)**という仕組みでバージョン管理される。opsetは`(domain, opset_version)`の組で一意に識別され、opset_versionはモデルの互換性を保ったまま演算子集合への変更を追跡するための単調増加整数。
- 2026年3月時点の安定版は1.21.0で、150以上の演算子が定義されている。

## 推論の実行

モデル自体はグラフ構造の記述にすぎず、実際の推論は**ONNX Runtime**などの推論エンジンが担う。ハードウェアに最適化された実行により、素のフレームワークでの推論より2〜5倍高速化されるケースがあるとされる。

## 用途

PyTorch等で学習したモデルを、エッジデバイスやモバイル、あるいは異なる言語のバックエンドから利用したい場合の橋渡しとしてよく使われる。

## 関連

ローカル推論向けの独自テンソル計算基盤である[[ggml]]・GGUFフォーマットとは異なり、ONNXは特定の推論エンジン実装を持たない「フレームワーク間の交換フォーマット」という位置づけが特徴。

## 出典

- [What is ONNX? Open Neural Network Exchange Guide | Ultralytics](https://www.ultralytics.com/glossary/onnx-open-neural-network-exchange)
- [Open Neural Network Exchange - Wikipedia](https://en.wikipedia.org/wiki/Open_Neural_Network_Exchange)
- [Open Neural Network Exchange (ONNX) Explained | Splunk](https://www.splunk.com/en_us/blog/learn/open-neural-network-exchange-onnx.html)
- [onnx/docs/IR.md at main · onnx/onnx](https://github.com/onnx/onnx/blob/main/docs/IR.md)
- [ONNX Concepts - ONNX 1.23.0 documentation](https://onnx.ai/onnx/intro/concepts.html)
