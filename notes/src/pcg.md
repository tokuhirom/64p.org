# PCG (Permuted Congruential Generator)

線形合同法(LCG)を状態遷移関数として使い、出力段に「permutation(並べ替え)」処理を加えることでLCGの弱点を補う設計の疑似乱数生成器(PRNG)。[PCG, A Family of Better Random Number Generators](https://www.pcg-random.org/index.html)として公開されている。

## 仕組み

単純なLCGは下位ビットの周期が短い・統計的な規則性が現れやすいといった弱点を持つ。PCGはLCGの生の出力をそのまま返すのではなく、下位ビットを捨てたうえで追加のpermutation関数を通して出力することで、内部状態よりもはるかにランダムに見える出力を作る。

## 状態サイズと性能

状態サイズは典型的に64bitと、[[mersenne-twister|Mersenne Twister]](624×32bit)や[[xoshiro256]](256bit)と比べて小さい。32bit出力の生成速度でMersenne Twisterの2〜5倍(35Gb/s超 vs MTの13〜27Gb/s)というベンチマークが報告されており、Mersenne TwisterからPCGへ置き換えることでシミュレーションの実行時間が20〜40%短縮された事例もある。

[[philox|Philox]]と同様、暗号強度は主張しない「medium-strength」の生成器に分類される。

## [[pseudorandom-number-generator|疑似乱数生成器]]の中での位置づけ

[[mersenne-twister|Mersenne Twister]]の弱点(状態サイズの大きさ、LinearComp検定の失敗)を踏まえた後継世代の一つ。設計思想は「LCG+出力permutation」というシンプルなもので、[[xoshiro256]](XOR+shift+rotate)や[[philox|Philox]](カウンタベース)とは異なるアプローチで高速・高品質を両立している。

#random

## 出典

- [PCG, A Family of Better Random Number Generators](https://www.pcg-random.org/index.html)
- [Permuted congruential generator — Grokipedia](https://grokipedia.com/page/Permuted_congruential_generator)
- [Open-Source PRNG Algorithm Libraries: Xoshiro vs PCG vs SplitMix vs Mersenne Twister | Pi Stack](https://www.pistack.xyz/posts/2026-06-19-prng-algorithm-libraries-xoshiro-pcg-splitmix-mersenne-twister/)
