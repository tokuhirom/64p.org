---
created: 2026-08-21 10:59
updated: 2026-08-21 10:59
---
# OpenBLAS

BLAS(Basic Linear Algebra Subprograms、基本線形代数サブルーチン)のオープンソース実装。行列積・内積などの線形代数演算を、CPUアーキテクチャごとに手作業でチューニングしたアセンブリレベルの最適化カーネルで高速に実行する。

## 由来

テキサス大学のKazushige Goto氏が開発した**GotoBLAS**(のちGotoBLAS2)が源流。GotoBLASの開発が止まった後、それをベースに継続開発する形で生まれたのがOpenBLASで、現在は`OpenMathLib/OpenBLAS`としてGitHub上でメンテナンスされている。BSD-3-Clauseライセンス。

## 特徴

- 実行時にCPUを検出し、CPU種別ごとに用意されたチューニング済みカーネルの中から最適な実装を選択する
- x86/x86-64(Intel/AMD)、ARM/ARM64、MIPS、PowerPC、RISC-V、LoongArch64、SPARC、IBM Z、WebAssemblyなど幅広いアーキテクチャに対応。Sapphire RapidsやZen5世代のCPUも対象に含まれる
- マルチスレッド対応
- BLASの上位にあたる線形代数パッケージ**LAPACK**の最適化実装も同梱している

## 使われ方

NumPy/SciPyなど科学計算系Pythonライブラリの線形代数バックエンドとして広く使われている。pip・Homebrew・MacPortsでNumPyをインストールすると、デフォルトでOpenBLASが使われることが多い(他の選択肢としてIntel MKLやAppleのAccelerateなどがある)。機械学習・数値計算・HPC分野全般で、行列演算高速化の定番ライブラリの一つ。

[[ggml]]も複数のBLAS実装をプラガブルなバックエンドとして切り替えられる仕組みを持っており、OpenBLASはそこで選択肢になりうる実装の一つ。

## 出典

- [OpenBLAS : An optimized BLAS library](https://www.openblas.net/)
- [GitHub - OpenMathLib/OpenBLAS](https://github.com/OpenMathLib/OpenBLAS)
- [openblas: Optimized BLAS libraries - HPC@UMD](https://hpcc.umd.edu/software/packages/openblas/)
- [BLAS and LAPACK — NumPy v2.6.dev0 Manual](https://numpy.org/devdocs/building/blas_lapack.html)
