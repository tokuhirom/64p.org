---
created: 2026-08-20 15:07
updated: 2026-08-20 15:07
---
# MAX

[[mojo|Mojo]]の開発元Modular社(Chris Lattner創業)が開発するAI推論(inference)実行基盤。AIモデルをGPU・CPU・NPU・カスタムASICなど多様なハードウェア上で、ハードウェアごとの書き換えなしに高速・効率的に動かすことを目的とする。 #ai #machine-learning

## 構成

MAX Engine(推論エンジン)とMAX Serving(サービング基盤)から構成される。モデルグラフの定義やカスタムopの記述には[[mojo|Mojo]]が使われる。同様にLLM推論・サービングを担う[[vllm|vLLM]]と競合領域にある。

## ライセンス

2025年5月のModular Platform 25.3で、MAX AI Kernels・MAX Serving・Mojo標準ライブラリなど45万行超がApache 2.0でオープンソース化された。2026年8月のModCon 2026では、デバイス使用制限のないsource-availableモデルへライセンスが移行し、オープンなアライアンスプログラムが開始された。

## 対応ハードウェア

NVIDIA/AMD GPU、CPU、AWS Trainium、Google TPU、Qualcomm Cloud AI 100/Dragonfly、Apple SiliconのGPU(M1以降)まで対応が拡大している。NVIDIA CUDAへのベンダーロックインなしに多様なハードウェアを扱えることを明確な差別化点として訴求している。

## Qualcommによる買収

開発元のModular社は2026年6月にQualcommによる買収が発表され、7月末に完了した(買収の詳細は[[mojo|Mojo]]を参照)。買収後の2026年8月のModCon 2026では、console.modular.com で本番向けクラウドサービス(MAX Serverless/専用デプロイ)がGAし、MiniMax M3などのモデルが稼働している。

## 出典

- [Qualcomm to Acquire Modular](https://www.qualcomm.com/news/releases/2026/06/qualcomm-to-acquire-modular)
- [Modular Launches AI Stack, Adds GPU Support - EE Times](https://www.eetimes.com/modular-launches-ai-stack-adds-gpu-support/)
- [Modular 26.5: Mojo 1.0 is here](https://www.modular.com/blog/modular-26-5-mojo-1-0-is-here)
- [Qualcomm, Modular, AMD Open Sourced at ModCon 2026 - ServeTheHome](https://www.servethehome.com/qualcomm-modular-amd-open-sourced-at-modcon-2026/)
- [ModCon Announcements - Modular Blog](https://www.modular.com/blog/modcon-announcements)
- [What is Modular - Modular Docs](https://docs.modular.com/intro/)
- [MAX: A high-performance AI serving and modeling framework](https://www.modular.com/open-source/max)
