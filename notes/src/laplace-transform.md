---
created: 2026-08-13 00:03
updated: 2026-08-13 00:03
---
# ラプラス変換

#math #signal-processing #control-theory

時間領域の関数 \(f(t)\) を複素変数 \(s\) の関数に写す積分変換。

$$
F(s) = \int_0^\infty f(t)\, e^{-st}\, dt, \qquad s = \sigma + j\omega
$$

一番のご利益は、**時間領域での微分・積分が、s領域では「\(s\) を掛ける／\(s\) で割る」という代数演算になる**こと。微分方程式が代数方程式に変換されるので、「変換 → 代数的に解く → 逆変換」という手順で常微分方程式が機械的に解ける。初期条件も変換の時点で自然に式へ組み込まれる。

## 直感: 「減衰因子つきフーリエ変換」

[[fourier-transform|フーリエ変換]]との関係で捉えるのが分かりやすい。

- フーリエ変換は \(e^{-j\omega t}\) を掛けて積分するが、信号が絶対可積分でない（発散する）と収束しない
- そこで先に減衰因子 \(e^{-\sigma t}\) を掛けて収束させてからフーリエ変換する、というのがラプラス変換。2つの因子をまとめたのが \(e^{-st}\)（\(s = \sigma + j\omega\)）
- \(\sigma = 0\) とおけば（両側変換では）フーリエ変換そのものに一致する。つまりラプラス変換はフーリエ変換の一般化で、フーリエ変換が存在しない関数にも適用できる

減衰をどこまで強くすれば収束するかが**収束域（ROC: Region of Convergence）**で、\(\mathrm{Re}(s) > a\) の右半平面になる。

## 主な応用

- **制御理論** — システムの入出力関係を伝達関数 \(G(s)\) で表す。分母多項式の根（極）の位置で安定性が判定できる（極がすべて左半平面にあれば安定）
- **電気回路** — L や C を含む回路方程式（微積分方程式）が、インピーダンス \(sL\), \(1/(sC)\) を使った代数計算になる
- **微分方程式の求解** — 上述のとおり

## 歴史

名前の由来は Pierre-Simon Laplace。1814年頃の確率論の研究（母関数）が源流。工学で実用化したのは Oliver Heaviside の「演算子法（operational calculus）」で、微分演算子を代数的に扱う手法として回路解析に使われた。当初は数学的正当化が曖昧だったが、後にラプラス変換として厳密に基礎づけられ、第二次大戦後に工学の標準ツールになった。

## 逆変換・周辺

- **逆変換** — 理論上は Bromwich 積分（複素積分）

  $$
  f(t) = \frac{1}{2\pi i} \lim_{T\to\infty} \int_{\gamma - iT}^{\gamma + iT} e^{st} F(s)\, ds
  $$

  だが、実務では部分分数分解して変換表を引くのが普通。
- **z変換** — 離散時間版の対応物。\(z = e^{sT}\) の置換で繋がっており、デジタル信号処理・デジタル制御でのラプラス変換の役割を担う。

## 出典

- [Laplace transform - Wikipedia](https://en.wikipedia.org/wiki/Laplace_transform)
- [The Intuition behind the Laplace Transform - Medium](https://medium.com/intuition/the-intuition-behind-the-laplace-transform-8432c3bceb37)
- [Relation between Laplace Transform and Fourier Transform - Tutorialspoint](https://www.tutorialspoint.com/signals_and_systems/relation_between_laplace_transform_and_fourier_transform.htm)
