---
created: 2026-08-21 21:10
updated: 2026-08-21 21:10
---
# BLAS

Basic Linear Algebra Subprograms(基本線形代数サブルーチン)の略。ベクトル・行列演算のための関数群を定めたAPI仕様。1970年代に、線形代数の基本処理を共通のサブルーチン群として標準化する提案から始まった。

## 3つのレベル

処理対象の次元ごとに3段階のレベルに分かれている。

- **Level 1**(1979年策定): スカラー・ベクトル演算(内積、ベクトルのスカラー倍など)
- **Level 2**(1988年策定): 行列とベクトルの演算(行列・ベクトル積など)
- **Level 3**(1990年策定): 行列と行列の演算(行列積など)。データ移動に対して計算量が多く、キャッシュ効率を活かした最適化の効果が最も大きい

## API仕様と実装の分離

BLASは「関数のシグネチャや振る舞いを定めた仕様」であり、それ自体は特定の実装を指さない。リファレンス実装(Netlibが配布するFortran実装)のほか、CPUアーキテクチャに応じて手作業でチューニングされた高速な実装が複数存在する。[[openblas|OpenBLAS]]はその代表例で、[[gotoblas|GotoBLAS]]を源流に持つ。他にIntel MKL、ATLAS、BLISなどの実装もある。

## LAPACKとの関係

[[lapack|LAPACK]]など、より高度な線形代数アルゴリズムを提供するライブラリは、内部の計算処理をBLAS(特にキャッシュ効率の良いLevel 3)の呼び出しに委譲する形で設計されている。BLASの実装が速ければ、その上に乗るLAPACKやNumPyなどの計算も速くなる。

## 出典

- [BLAS (Basic Linear Algebra Subprograms) - netlib.org](https://www.netlib.org/blas/)
- [An updated set of basic linear algebra subprograms (BLAS) - ACM Transactions on Mathematical Software](https://dl.acm.org/doi/10.1145/567806.567807)

#math #performance
