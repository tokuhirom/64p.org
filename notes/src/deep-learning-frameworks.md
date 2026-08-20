---
created: 2026-08-20 15:07
updated: 2026-08-20 15:07
---
# 深層学習フレームワーク

機械学習・深層学習の学習(training)を担う代表的なPythonフレームワークの見取り図。それぞれの技術的な深掘りは各ノートを参照。 #moc #ai #machine-learning

- [[pytorch|PyTorch]] — Meta発、現在はPyTorch Foundation(Linux Foundation傘下)が運営。Eager実行+`torch.compile`によるJITコンパイルが特徴で、研究実装での採用シェアが最も高い
- [[jax|JAX]] — Google発の関数変換ベースのライブラリ。`grad`/`jit`/`vmap`/`pmap`の合成可能な変換とXLAコンパイルにより、TPU上での大規模並列学習に強み
- [[keras|Keras]] — 特定の学習エンジンそのものではなく、TensorFlow/JAX/PyTorch/OpenVINOをバックエンドとして切り替えられる高水準API

推論・デプロイに軸足を置く周辺技術としては[[mojo|Mojo]]・[[max|MAX]](Modular社)、[[vllm|vLLM]]、[[onnx|ONNX]]などがある。
