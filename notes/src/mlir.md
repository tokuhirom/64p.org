---
created: 2026-08-19 09:24
updated: 2026-08-19 09:24
---
# MLIR

#compiler-design #llvm

Multi-Level Intermediate Representation。LLVMプロジェクトのサブプロジェクトとして開発されている、再利用可能・拡張可能なコンパイラ基盤。単一のIRしか持たないLLVM本体と異なり、**dialect**という拡張機構によって、ドメインや言語・ターゲットハードウェアごとに専用のIR(独自のop・型)を定義できる「ハイブリッドIR」である点が特徴。

## 生まれた背景

2017年にGoogleへ移りTensorFlowインフラチームを率いたChris Lattnerが中心となり、2018年4月のホワイトペーパーを起点に、Mehdi Amini・Uday Bondhugulaらと共に開発した。当時TensorFlowのエコシステムには、ほとんど何も共有しないグラフ表現・コンバータ・コード生成パスが乱立しており(TPU立ち上げの最中でもあった)、この断片化を解消する目的で作られた。2019年のEuroLLVM(European LLVM Developers' Meeting)で、Chris LattnerとTatiana Shpeismanの基調講演を通じて公開された。

## 目的

- ソフトウェアの断片化への対処(バラバラなIR・コンバータの乱立を防ぐ)
- CPU・GPU・TPU・ASICなど異種ハードウェア向けコンパイルの改善
- ドメイン固有コンパイラの構築コストの削減
- 既存コンパイラ同士の統合

## dialect

MLIRの中核概念。ユーザーが拡張可能な「opのエコシステム」を提供し、ニーズに応じたdialectを追加できる。代表例として、TensorFlowのデータフローグラフ表現、GPU向け(`gpu`・`nvvm`)、線形代数向け(`linalg`)、変換操作向け(Transform dialect)などがある。SSA(静的単一代入)ベースのIR設計とリージョンベースのネスト構造を採用しており、ソースレベルの意味論をできるだけ長く保持したまま、段階的に低レベルへlowering(下位変換)していける。

## 採用例

TensorFlowのグラフ最適化基盤として使われているほか、[[mojo|Mojo]]のコンパイラ基盤としても採用されており、CPU・GPU・TPU・ASICといった異種ハードウェアを単一の言語からターゲットにすることを可能にしている。

## 出典

- [MLIR Rationale - MLIR](https://mlir.llvm.org/docs/Rationale/Rationale/)
- [MLIR: A Compiler Infrastructure for the End of Moore's Law (arXiv)](https://arxiv.org/pdf/2002.11054)
- [MLIR (software) - Wikipedia](https://en.wikipedia.org/wiki/MLIR_(software))
- [What Is MLIR and Why Does It Exist? - DEV Community](https://dev.to/frodo/what-is-mlir-and-why-does-it-exist-4d78)
