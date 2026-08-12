---
created: 2026-08-12 09:46
updated: 2026-08-12 09:46
---
# シャノンエントロピー

#information-theory #security

Claude Shannon が情報理論で導入した、確率変数の不確実性（＝その値を知ったときに得られる情報量の期待値）の尺度。確率変数 X が各値 x を確率 p(x) で取るとき、

```
H(X) = -Σ p(x) log₂ p(x)
```

で定義され、単位はビット。起こりにくい事象ほどエントロピーへの寄与が大きく、全ての結果が等確率のとき最大、結果が確定しているとき 0 になる。操作的には「X を記述・伝達するのに平均で必要なビット数」つまり**最適な圧縮率**と解釈できる。

## シークレット検出への応用

文字列に対して文字の出現分布からエントロピーを計算すると、「ランダムらしさ」の指標になる。APIキーやトークンのようなランダム生成された文字列は文字の分布が一様に近くエントロピーが高いのに対し、自然言語や普通の識別子は偏りがあり低くなる。[[gitleaks]] はこの性質を正規表現と組み合わせて、シークレット候補のスコアリングに使っている。

ただし、自然言語でもエントロピーが高めの文字列は珍しくなく、誤検知が多いという限界がある。後継の [[betterleaks]] はエントロピーの代わりに [[byte-pair-encoding|BPE]] トークン化の圧縮効率（Token Efficiency）を使うことで、CredData データセットでの recall をエントロピーの 70.4% から 98.6% に改善したと報告している。

## 出典

- [Shannon's information theory | Collège de France](https://www.college-de-france.fr/en/agenda/lecture/information-and-complexity/shannon-information-theory)
- [Information Theory Series: 1 — Entropy and Shannon Entropy](https://rendazhang.medium.com/information-theory-series-1-entropy-and-shannon-entropy-a20a2101108e)
- [Betterleaks: Open-source secrets scanner - Help Net Security](https://www.helpnetsecurity.com/2026/03/19/betterleaks-open-source-secrets-scanner/)
