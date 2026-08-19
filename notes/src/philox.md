# Philox

カウンタベース(counter-based)方式の疑似乱数生成器(PRNG)。2011年にJohn Salmonら(D. E. Shaw Research)が発表した[Random123](https://www.deshawresearch.com/resources_random123.html)ライブラリに含まれる生成器の一つ。

## 仕組み

一般的なPRNGが内部状態を逐次更新しながら次の乱数を作るのに対し、Philoxは「カウンタ」と「鍵(key)」という2つの値だけを状態として持ち、それを暗号学的ハッシュに似た(が弱い)ブロック暗号風の関数に通して直接出力を得る。カウンタは乱数を1つ生成するたびに1ずつインクリメントされ、鍵は生成される数列そのものを決定する。異なる鍵を使えば別々の(統計的に独立とみなせる)数列が得られる。

暗号用途には向かないとされる一方、GPU上でCrush系の統計検定に耐える生成器としては最速級と言われている。

## 並列計算との親和性

カウンタ方式であるため、必要な乱数の個数が分かっていれば生成サイクルの任意の位置に直接ジャンプできる。`jumped`メソッドで2^128個生成した状態相当に一気に進める、といった操作も可能。[[mersenne-twister|Mersenne Twister]]や[[pcg|PCG]]、[[xoshiro256]]のように状態を逐次更新する系列だとストリームの分割・並列化が難しいのに対し、Philoxはインデックスさえ決まれば各スレッド/GPUコアが独立に計算できる。

この特性から、GPU/大規模並列計算との親和性が高く、TensorFlowのデフォルト乱数生成器として採用されている。NumPyの`numpy.random.Philox`などでも利用可能。

## [[pseudorandom-number-generator|疑似乱数生成器]]の中での位置づけ

状態を持たず「カウンタ+鍵→出力」という無記憶な設計思想を取る点で、[[mersenne-twister|Mersenne Twister]]・[[pcg|PCG]]・[[xoshiro256]]といった状態逐次更新型の系列とは根本的に異なるアプローチ。並列化のしやすさを最優先する用途(GPU計算、分散シミュレーション)で選ばれる。

#random #parallel-computing

## 出典

- [Philox counter-based RNG — NumPy Manual](https://numpy.org/doc/stable/reference/random/bit_generators/philox.html)
- [Philox Counter-based RNG - RandomGen](https://bashtage.github.io/randomgen/devel/bit_generators/philox.html)
