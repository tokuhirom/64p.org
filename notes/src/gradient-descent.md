# 勾配降下法

#math #machine-learning

微分可能な関数の（局所）最小値を反復計算で探す最適化アルゴリズム。機械学習で損失関数を最小化するパラメータを求める際の基本手法。

$$
\theta_{t+1} = \theta_t - \eta \, \nabla f(\theta_t)
$$

勾配 \(\nabla f\) は[[derivative|微分]]係数の多変数版（各変数での偏微分を並べたベクトル）で、「その点で関数が最も急に増える方向」を指す。その**逆方向**に少しずつ進めば関数値が下がっていく、というのが全体のアイデア。霧の中で山を下るとき、足元の傾きだけを頼りに一番急な下り方向へ一歩ずつ進むのに例えられる。

## 学習率

ステップ幅を決める係数 \(\eta\) を**学習率**と呼ぶ。代表的なハイパーパラメータで、トレードオフがある。

- 小さすぎる — 収束までの反復回数が膨大になり学習が遅い
- 大きすぎる — 最小値を飛び越えて振動・発散する

## バリエーション

勾配を計算するときに使うデータ量で分類される。

- **バッチ勾配降下法** — 全訓練データで勾配を計算。正確だが1ステップが重い
- **確率的勾配降下法（SGD）** — 1サンプルだけで勾配を近似。1ステップが軽く、ノイズが局所解からの脱出に効くこともある
- **ミニバッチ勾配降下法** — 小さなサブセットで勾配を近似する折衷案。深層学習の実務ではこれが標準

学習率を自動調整する発展形として Momentum、AdaGrad、Adam などがある。

## 機械学習との関係

ニューラルネットワークの学習は「損失関数をパラメータで偏微分した勾配を誤差逆伝播法（backpropagation）で効率よく計算し、勾配降下法でパラメータを更新する」の反復。導関数が 0 になる点を解析的に解けない巨大な関数でも、勾配さえ計算できれば数値的に最小化へ向かえるのがポイント。

## 出典

- [What Is Gradient Descent? - Built In](https://builtin.com/data-science/gradient-descent)
- [What is Learning Rate in Machine Learning? - IBM](https://www.ibm.com/think/topics/learning-rate)
- [A Guide to Gradient Descent and Stochastic Gradient Descent - Medium](https://medium.com/munchy-bytes/navigating-the-learning-curve-gradient-descent-stochastic-gradient-descent-in-ml-e8ec03efa673)
