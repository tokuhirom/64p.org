# Xoshiro256**

David BlackmanとSebastiano Vignaが2018年に設計した疑似乱数生成器(PRNG)。Xorshift系列(XORとビットシフトの組み合わせで状態を更新するLFSRベースの高速な生成器群)の精神的後継にあたる。名前は各ラウンドを構成する3つの基本操作、XOR・SHIft・ROtateに由来する。

## 仕組み

256bit(64bit×4ワード)の内部状態を持つ。各ラウンドで、状態配列の各ワードを別のワードとXORし、シフトした値を次の要素にXORし、最後のワードをローテートする、という操作を経て次の状態に遷移する。状態遷移関数自体はGF(2)上で線形だが、出力段に非線形なスクランブル関数(名前の"**"は出力に2回の乗算を使うスクランブル方式を表す)を挟むことで、単純な代数攻撃を防いでいる。

## 周期と並列化

周期は2^256 − 1。2^128刻みでジャンプ可能なため、独立した部分系列を多数切り出して並列計算に使える点は[[philox|Philox]]と共通するが、Philoxが「カウンタ+鍵」から無記憶に出力を計算するのに対し、Xoshiro256**は状態を逐次更新しながらジャンプ操作で系列を分割する設計。

## [[pseudorandom-number-generator|疑似乱数生成器]]の中での位置づけ

[[mersenne-twister|Mersenne Twister]]の後継世代の一つで、[[pcg|PCG]]と並び高速・高品質・小さな状態サイズを両立する現代的なPRNG。設計思想はXorshift系列の発展形(XOR+shift+rotate)であり、LCG+permutationの[[pcg|PCG]]、カウンタベースの[[philox|Philox]]とはアプローチが異なる。

#random

## 出典

- [Xoshiro256** - RandomGen](https://bashtage.github.io/randomgen/bit_generators/xoshiro256.html)
- [A PRNG shootout](https://prng.di.unimi.it/)
- [Open-Source PRNG Algorithm Libraries: Xoshiro vs PCG vs SplitMix vs Mersenne Twister | Pi Stack](https://www.pistack.xyz/posts/2026-06-19-prng-algorithm-libraries-xoshiro-pcg-splitmix-mersenne-twister/)
