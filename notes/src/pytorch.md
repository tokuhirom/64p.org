---
created: 2026-08-20 15:07
updated: 2026-08-20 15:07
---
# PyTorch

Metaが開発したオープンソースの深層学習フレームワーク。2022年9月にLinux Foundation傘下の独立組織「PyTorch Foundation」に移管され、AMD・AWS・Google Cloud・Meta・Microsoft Azure・NVIDIAなどが加盟する形で運営されている。 #ai #machine-learning #python

## 設計

Eager実行(命令を逐次実行)を基本としつつ、`torch.compile`でJITコンパイルしカーネルを融合して高速化できる。動的計算グラフにより柔軟なモデル記述が可能で、PyTorch 2.x以降もEagerファーストの開発体験を維持しながらグラフコンパイルの利点を追加している。

## 最新バージョン(2026年8月時点)

最新安定版は2.13.0(2026-07-08リリース、3,328コミット・526人のコントリビューター)。FlexAttentionのApple Silicon(MPS)対応(疎パターンでSDPA比最大約12倍高速)、InductorのCuTeDSLバックエンド追加、`nn.LinearCrossEntropyLoss`によるGPUメモリ削減、分散学習向け新通信バックエンド`torchcomms`、Python 3.15(free-threaded 3.15t含む)対応などが含まれる。2026年はリリース頻度が四半期ごとから隔月ペースに増加している。

## エコシステム・採用状況

Linux Foundationの調査によれば、モデル学習領域の63%がPyTorchを採用、AI研究実装の70%以上がPyTorchを使用(2024年時点データ)。[[vllm|vLLM]]、Ray、DeepSpeed、Helion、safetensorsなど周辺プロジェクトもPyTorch Foundation傘下で拡大中。

## [[deep-learning-frameworks|深層学習フレームワーク]]の中での位置づけ

[[jax|JAX]]と並ぶ学習(training)フレームワークの一つで、研究・産業双方でのデファクトスタンダード的地位にある。

## 出典

- [PyTorch 2.13 Release Blog](https://pytorch.org/blog/pytorch-2-13-release-blog/)
- [Release PyTorch 2.13.0 - GitHub](https://github.com/pytorch/pytorch/releases/tag/v2.13.0)
- [PyTorch Grows as the Dominant Open Source Framework for AI and ML: 2024 Year in Review](https://pytorch.org/blog/2024-year-in-review/)
- [Meta Transitions PyTorch to the Linux Foundation](https://www.linuxfoundation.org/press/press-release/meta-transitions-pytorch-to-the-linux-foundation)
- [PyTorch Conference North America - LF Events](https://events.linuxfoundation.org/pytorch-conference-north-america/)
