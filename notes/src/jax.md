---
created: 2026-08-20 15:07
updated: 2026-08-20 15:07
---
# JAX

Googleが開発するPython製の数値計算ライブラリ。公式には「アクセラレータ指向の配列計算とプログラム変換のためのライブラリ、高性能数値計算と大規模機械学習向け」と説明されるが、JAX自身のREADMEでは「リサーチプロジェクトであり、Googleの公式プロダクトではない」と明記されている。 #ai #machine-learning #python

## 設計: 合成可能な関数変換

中核は合成可能な関数変換群。

- `grad`: NumPy/Python関数への自動微分。reverse-mode/forward-modeいずれにも対応し、任意階まで合成できる
- `jit`: XLAによるJITコンパイル
- `vmap`: 自動ベクトル化
- `pmap`: 複数アクセラレータへのSPMD並列実行

これらの変換は自由に組み合わせられる。`jax.numpy`がNumPy互換のAPIを提供しつつ、微分可能・JITコンパイル可能にする。ただしJAXの配列(`jax.Array`)はNumPyと異なり不変(immutable)。

## 対応ハードウェア

CPU・NVIDIA GPU・Google TPUが中心。AMD GPU・Apple GPU・Intel GPUにも対応が進むが、サポート度合いは異なる。

## 採用状況

Google DeepMindが多数のJAXベースライブラリを公開・運用しており(Haiku、Optax、Penzai、mctx、jax_privacyなど)、DeepMind内での研究基盤として使われ続けている。2026年も0.10.x→0.11.xと月次ペースでリリースが継続中。

## [[pytorch|PyTorch]]との比較

JAXの強みはTPU性能と、関数型設計に基づく大規模並列学習における合成可能性。弱みはコミュニティの小ささと、動的な制御フローでのXLAコンパイルオーバーヘッド。PyTorchはHugging Face Transformers等LLMエコシステムでの優位性、eager実行によるプロトタイピングの速さ、`torch.compile`によるGPU性能改善が強み。これらの評価は各解説記事の見解であり、一次情報での裏取りはXLA/vmap/pmap等の技術仕様部分に限られる。

## [[deep-learning-frameworks|深層学習フレームワーク]]の中での位置づけ

[[pytorch|PyTorch]]と並ぶ学習(training)フレームワークの一つ。関数変換ベースの設計とXLAコンパイルによるTPU性能が差別化点。

## 出典

- [jax-ml/jax - GitHub](https://github.com/jax-ml/jax)
- [jax - PyPI](https://pypi.org/project/jax/)
- [awesome-jax - GitHub](https://github.com/n2cholas/awesome-jax)
- [google-deepmind/dm-haiku - GitHub](https://github.com/google-deepmind/dm-haiku)
- [JAX vs PyTorch - geekflare.com](https://geekflare.com/dev/jax-vs-pytorch/)
- [ML Framework Comparison 2026 - heytensor.com](https://heytensor.com/research/ml-framework-comparison-2026.html)
