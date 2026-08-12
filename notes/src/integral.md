---
created: 2026-08-13 00:20
updated: 2026-08-13 00:20
---
# 積分

#math

「細かく刻んで足し合わせる」操作の極限。歴史的・概念的に別物だった2つの顔（定積分と不定積分）があり、それが微積分学の基本定理で結ばれている。

## 定積分 — 総量を求める

曲線 \(y = f(x)\) と x軸に挟まれた領域の面積を求めるのが出発点。区間 \([a, b]\) を \(n\) 個の細い短冊に切り、各短冊を「幅 \(\Delta x\) × 高さ \(f(x_i)\)」の長方形で近似して全部足したものが**リーマン和**。短冊を無限に細くした極限が定積分。

$$
\int_a^b f(x)\, dx = \lim_{n \to \infty} \sum_{i=1}^{n} f(x_i)\, \Delta x
$$

\(\int\) という記号自体が Sum の S を縦に伸ばしたもの（ライプニッツ由来）。面積に限らず「密度を足し合わせて質量」「速度を足し合わせて移動距離」など、*変化する量 × 微小区間の総和*はすべてこの形になる。

## 不定積分 — 微分の逆演算

「[[derivative|微分]]すると \(f(x)\) になる関数 \(F(x)\)（**原始関数**）を探す」操作。たとえば \(x^2\) を微分すると \(2x\) なので、\(2x\) の原始関数は \(x^2 + C\)（\(C\) は積分定数）。こちらは面積とは無関係に見える、純粋に代数的な逆問題。

## 微積分学の基本定理

一見無関係なこの2つが実は同じものだ、というのが**微積分学の基本定理**。\(f\) が \([a, b]\) 上で連続なら、その任意の原始関数 \(F\) について

$$
\int_a^b f(x)\, dx = F(b) - F(a)
$$

「無限個の長方形を足す」という極限計算が、「原始関数を1つ見つけて端点の差を取る」だけで済む。ニュートンとライプニッツの最大の発見で、積分が実用的な計算手段になった理由。[[derivative|微分]]は「瞬間の変化率」、積分は「変化の累積」で、互いに逆向きの操作になっている。

## 積分変換への接続

関数に核（カーネル）を掛けて積分することで別の領域の関数に写す操作を積分変換と呼ぶ。[[fourier-transform|フーリエ変換]]や[[laplace-transform|ラプラス変換]]（→ [[frequency-domain-transforms]]）は、\(\int f(t)\, e^{-st}\, dt\) のような形でまさに定積分を道具として使っている。

## 出典

- [Riemann sum - Wikipedia](https://en.wikipedia.org/wiki/Riemann_sum)
- [The Fundamental Theorem of Calculus - Mathematics LibreTexts](https://math.libretexts.org/Bookshelves/Calculus/Calculus_(OpenStax)/05:_Integration/5.03:_The_Fundamental_Theorem_of_Calculus)
- [M1M1: The Riemann Integral and the Fundamental Theorem of Calculus - Imperial College](https://www.ma.ic.ac.uk/~ajm8/M1M1/integ.pdf)
