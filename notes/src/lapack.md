---
created: 2026-08-21 21:10
updated: 2026-08-21 21:10
---
# LAPACK

Linear Algebra PACKageの略。連立一次方程式・最小二乗問題・固有値問題・特異値分解(SVD)といった、数値線形代数でよく現れる問題を解くためのルーチン群を提供するライブラリ。Fortranで書かれている。

## 由来

1992年、旧来のLINPACK・EISPACKを置き換える形で開発が始まった。LINPACK・EISPACKは当時の共有メモリ型ベクトル計算機・並列計算機上で効率よく動作させることが難しく、その課題を解決するのがLAPACKの当初の目標だった。当初はFORTRAN 77で書かれていたが、バージョン3.2(2008年)からFortran 90に移行している。

## [[blas|BLAS]]との関係

LAPACKのルーチンは、可能な限り計算処理を[[blas|BLAS]]の呼び出しに委譲するように設計されている。データ移動を抑えるためにブロック化した行列演算(行列積など)を多用し、特にキャッシュ効率の良いLevel 3 BLASを積極的に活用することを前提に設計されている。そのため、LAPACKの実行速度は背後で使われるBLAS実装の速さに大きく依存する。[[openblas|OpenBLAS]]はBLASだけでなく、最適化されたLAPACK実装も同梱して配布している。

## 出典

- [LAPACK — Linear Algebra PACKage (netlib.org)](https://netlib.org/lapack/)
- [LAPACK - Wikipedia](https://en.wikipedia.org/wiki/LAPACK)

#math #performance
