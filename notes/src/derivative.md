---
created: 2026-08-13 00:20
updated: 2026-08-13 00:20
---
# 微分

#math

関数の**瞬間の変化率**を取り出す操作。グラフでいえば、その点での接線の傾き。

## 定義 — 差分商の極限

区間での平均変化率（割線の傾き）は差分商 \(\frac{f(a+h) - f(a)}{h}\) で表せる。\(h\) を 0 に近づけると割線は接線に近づき、その極限が点 \(a\) での微分係数。

$$
f'(a) = \lim_{h \to 0} \frac{f(a+h) - f(a)}{h}
$$

各点にその微分係数を対応させた関数 \(f'(x)\) を**導関数**と呼ぶ。記法はラグランジュの \(f'(x)\) のほか、ライプニッツの \(\frac{dy}{dx}\)（「微小な \(y\) の変化 ÷ 微小な \(x\) の変化」という定義の形をそのまま残した記法）がよく使われる。

## 直感

「位置を微分すると速度、速度を微分すると加速度」が典型例。車の速度メーターが表示しているのは、まさに位置関数の瞬間の変化率。平均時速（区間の差分商）ではなく「今この瞬間」の値を極限で定義するのが微分のアイデア。

## 積分との関係

微分の逆演算が[[integral|積分]]（不定積分・原始関数を求める操作）。両者が互いに逆であることを述べるのが微積分学の基本定理で、詳細は[[integral]]側に書いた。

- 微分 = 瞬間の変化率（累積量 → 変化率）
- 積分 = 変化の累積（変化率 → 累積量）

## 応用

- **最適化** — 導関数が 0 になる点が極値の候補。機械学習の勾配降下法もこの延長
- **微分方程式** — 未知関数とその導関数の関係式。物理・工学のモデル記述の基本言語。[[laplace-transform|ラプラス変換]]は微分を代数演算に変えてこれを解く道具
- **近似** — 接線による一次近似（\(f(a+h) \approx f(a) + f'(a)h\)）、テイラー展開への入り口

## 出典

- [Defining the Derivative - Mathematics LibreTexts](https://math.libretexts.org/Bookshelves/Calculus/Calculus_(OpenStax)/03:_Derivatives/3.01:_Defining_the_Derivative)
- [Derivatives | Precalculus - Lumen Learning](https://courses.lumenlearning.com/precalculus/chapter/derivatives/)
