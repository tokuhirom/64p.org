# 微分方程式

#math

未知の**関数**とその導関数（[[derivative|微分]]）の間の関係を記述した方程式。普通の方程式の解が「数」なのに対し、微分方程式の解は「関数」になる。「変化のルール（変化率）から挙動そのもの（関数）を復元する」問題であり、物理・工学でのモデル記述の基本言語。

## 例

- **指数増殖** — \(\frac{dy}{dt} = ky\)（増加率が現在量に比例）。解は \(y = Ce^{kt}\)。人口増加・放射性崩壊・複利
- **ニュートンの冷却法則** — \(\frac{dy}{dt} = k(A - y)\)（温度差に比例して冷める）
- **減衰振動** — \(m\frac{d^2x}{dt^2} + c\frac{dx}{dt} + kx = f(t)\)。バネ・ダンパー系や RLC 回路がこの形

## 分類

- **常微分方程式（ODE）** — 未知関数が1変数で、通常の導関数だけを含む。1次元の力学系のモデルに多い
- **偏微分方程式（PDE）** — 未知関数が多変数で、偏導関数を含む。熱・波動・流体・電磁気・量子力学など、空間的な広がりを持つ系のモデルに多い
- **階数（order）** — 含まれる導関数の最高階。上の冷却法則は1階、減衰振動は2階
- **線形/非線形** — 未知関数とその導関数について線形かどうか。線形なら解の重ね合わせが効き、理論が整っている

## 解き方

- **解析的に解く** — 変数分離などの求積法（[[integral|積分]]に帰着させる）、[[laplace-transform|ラプラス変換]]（微分を代数演算に変えて機械的に解く）、[[fourier-transform|フーリエ変換]]（偏微分方程式向き）など。ただし解析解が求まるのは限られたクラスだけ
- **数値的に解く** — オイラー法・ルンゲクッタ法などで数値解を計算する。実務ではこちらが主流

## 出典

- [Differential Equations - Definitions - Paul's Online Notes (Lamar University)](https://tutorial.math.lamar.edu/classes/de/definitions.aspx)
- [Classification of differential equations - University of Victoria](https://web.uvic.ca/~tbazett/diffyqs/classification_section.html)
- [Definitions and important facts regarding ODEs and PDEs - UBC](https://phas.ubc.ca/~berciu/TEACHING/PHYS312/LECTURES/FILES/defs.pdf)
