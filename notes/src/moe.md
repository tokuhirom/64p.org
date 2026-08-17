---
created: 2026-08-17 18:32
updated: 2026-08-17 18:32
---
# Mixture-of-Experts (MoE)

LLMのフィードフォワード層を、単一の巨大なネットワークではなく複数の「エキスパート」ネットワークに分割し、トークンごとに学習可能なルーターが一部のエキスパートだけを選んで計算させるアーキテクチャ。dense(密結合)モデルと対比される。

## 仕組み

各トークンについてルーターがエキスパートごとのルーティングスコアを計算し、上位k個(top-k)のエキスパートだけを活性化して出力を重み付き合成する。数式で書くと`MoE(x) = Σ g_i(x) E_i(x)`(g_iはルーターが選んだエキスパートにのみ非ゼロの重みを与えるゲート関数)。

## 総パラメータ数とアクティブパラメータ数

MoEモデルを語る際は2つの数字が区別される。

- **総パラメータ数**: チェックポイントに保存されている全エキスパートを含めた数。
- **アクティブパラメータ数**: 1トークンの計算で実際に使われるエキスパートのみの数。

たとえば[[kimi-k3|Kimi K3]]は896個のルーティングエキスパートのうちトークンごとに16個だけを選択する。総パラメータ数が兆単位でも、アクティブパラメータ数ははるかに小さく抑えられる設計が2026年時点のオープンウェイト陣営で主流になっている([[open-weight-llm-moc|オープンウェイトLLM MOC]]参照)。

## メリットと課題

- 保存パラメータ数を増やしても1トークンあたりの計算量(FLOPs)は増やさずに済むため、計算コストを抑えたままモデル容量を増やせる。
- 一方でルーティング・トークン移動・メモリアクセスのオーバーヘッドがあり、アクティブパラメータ数が同じでも実際のレイテンシはdenseモデルと同じにはならない。
- ルーターが一部のエキスパートに偏ってトークンを送ると、そのエキスパートだけが過学習し他が使われなくなる問題があるため、補助損失やルーティングバイアスなどのロードバランシング機構が併用される。

## 採用例

[[llama-4|Llama 4]]、[[glm-5|GLM-5]]、[[mistral-large-3|Mistral Large 3]]、[[gpt-oss|gpt-oss]]、[[deepseek-v4|DeepSeek V4]]、[[kimi-k2-6|Kimi K2.6]]、[[kimi-k2-7|Kimi K2.7 Code]]、[[kimi-k3|Kimi K3]]など、2026年時点の主要なオープンウェイトLLMの多くがMoEを採用している。対照的に[[qwen3-8-27b|Qwen3.8-27B]]はdense構成を選んでいる。

## 出典

- [What is mixture-of-experts (MoE), and how does it differ from a dense LLM? (Sebastian Raschka)](https://sebastianraschka.com/faq/docs/mixture-of-experts.html)
- [Mixture-of-Experts (MoE) LLMs (Cameron R. Wolfe)](https://cameronrwolfe.substack.com/p/moe-llms)

#machine-learning #llm
