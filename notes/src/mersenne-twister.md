# Mersenne Twister

1997年に松本眞・西村拓士が発表した汎用疑似乱数生成器(PRNG)。名前は周期が2^19937 − 1というメルセンヌ素数(2^p − 1の形の素数)であることに由来する。

## 仕組み

内部状態として624個の32bit整数からなる配列を持つ。乱数を1つ要求されるたびに状態配列から1要素を取り出して出力用の変換を施し、624個出力し終えるごとに「twist」と呼ばれる操作で状態配列全体を更新する(アルゴリズム名の由来)。1回の生成コストはO(1)。

## 統計的品質と評価の変化

長らく「強いPRNG」(長い周期と統計的に一様な分布)の代表例として扱われ、Python3の`random`モジュールをはじめ多くの言語・環境の標準乱数生成器に採用されてきた。一方で、TestU01のLinearComp検定(80番・81番)には一貫して落ちることが知られており、線形性に起因する弱点を持つ。近年は[[pcg|PCG]]や[[xoshiro256]]など、より高速かつ統計的品質の高い後継世代への置き換えが進んでいる。

## 内部状態サイズと並列化

内部状態が624×32bit(約2,503バイト)と大きく、[[pcg|PCG]](典型64bit)や[[xoshiro256]](256bit)と比べてコピーコストが高い。状態を逐次更新する設計のため、[[philox|Philox]]のようにストリームの任意位置へ直接ジャンプすることはできず、並列計算での分割利用には工夫が要る。

## [[pseudorandom-number-generator|疑似乱数生成器]]の中での位置づけ

CBRNG以前の世代を代表する、状態逐次更新型PRNGの標準的な選択肢だった。現在は速度・状態サイズ・並列化のしやすさの面で[[pcg|PCG]]・[[xoshiro256]]・[[philox|Philox]]といった後継世代に置き換わりつつある。

#random

## 出典

- [Mersenne Twister — Wikipedia](https://en.wikipedia.org/wiki/Mersenne_Twister)
- [Open-Source PRNG Algorithm Libraries: Xoshiro vs PCG vs SplitMix vs Mersenne Twister | Pi Stack](https://www.pistack.xyz/posts/2026-06-19-prng-algorithm-libraries-xoshiro-pcg-splitmix-mersenne-twister/)
