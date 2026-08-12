# テイラー展開

#math

関数を、1点での[[derivative|微分]]係数の情報だけを使って多項式（冪級数）で表現する手法。

$$
f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!} (x-a)^n = f(a) + f'(a)(x-a) + \frac{f''(a)}{2!}(x-a)^2 + \cdots
$$

点 \(a\) を中心に展開したものをテイラー級数、特に \(a = 0\) を中心にしたものを**マクローリン級数**と呼ぶ。

## 直感 — 接線近似の高次版

[[derivative|微分]]による一次近似 \(f(a+h) \approx f(a) + f'(a)h\)（接線で代用する）の精度を、2次・3次…の項を足して上げていったもの。1次で「傾き」、2次で「曲がり具合」、と高階の導関数が形の情報を順に補っていき、次数を上げるほど元の関数に近づく。

## 剰余項と収束

有限次で打ち切った**テイラー多項式**と元の関数との差が剰余項 \(R_n(x)\)。剰余項が \(n \to \infty\) で 0 に収束する範囲でのみ、テイラー級数は元の関数に一致する。\(e^x\), \(\sin x\), \(\cos x\) は全実数で収束する代表例。

$$
e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots
$$

## 用途

- **数値計算** — 関数電卓やライブラリが \(\sin\) や \(e^x\) を計算する際の基礎（実装では精度最適化した多項式近似が使われるが、発想の原点）
- **物理の近似** — 「\(\theta\) が小さいとき \(\sin\theta \approx \theta\)」のような微小量近似は、テイラー展開を1次で打ち切ったもの
- **オイラーの公式** — \(e^{ix}\), \(\cos x\), \(\sin x\) のマクローリン級数を見比べると \(e^{ix} = \cos x + i \sin x\) が導ける。[[fourier-transform|フーリエ変換]]の核 \(e^{-i\omega t}\) の背後にある関係式

## 出典

- [Taylor and Maclaurin Series - UTSA](https://mathresearch.utsa.edu/wiki/index.php?title=Taylor_and_Maclaurin_Series)
- [Taylor's Theorem with Remainder and Convergence - Lumen Learning](https://courses.lumenlearning.com/calculus2/chapter/taylors-theorem-with-remainder/)
- [An introduction to Taylor series and their applications - Parabola (UNSW)](https://www.parabola.unsw.edu.au/sites/default/files/2025-04/vol61_no1_7.pdf)
