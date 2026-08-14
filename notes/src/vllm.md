---
created: 2026-08-10 21:06
updated: 2026-08-14 09:34
---
# vLLM

LLM(大規模言語モデル)の推論・サービングを高速化するために設計されたオープンソースのライブラリ。カリフォルニア大学バークレー校のSky Computing Labによって開発された。 #llm #machine-learning

## 特徴

- 独自のメモリ管理技術「PagedAttention」を採用。OSのメモリページング(仮想メモリ)の概念からヒントを得たアルゴリズムで、KV-Cache(Attention計算の中間結果を保持するメモリ領域)を効率的に管理する
- 従来の手法ではKV-Cacheの60〜80%が無駄になっていたのに対し、vLLMはこの無駄を4%未満に抑え、ほぼ最適なメモリ使用を実現している
- スループットはHuggingFace Transformersと比較して最大24倍、HuggingFace Text Generation Inferenceと比較して最大3.5倍向上する

## 使い方

`vllm serve <モデル名>` のようなコマンド一発で、指定したモデル(HuggingFaceのモデルIDやローカルパス)をダウンロード・GPUにロードした上で、`localhost:8000`などでOpenAI互換のHTTP APIサーバを起動する。起動後はOpenAI公式のPythonクライアントや`curl`から、OpenAIのChat Completions API(`/v1/chat/completions`)などと同じスキーマでリクエストを投げられる。内部的にはリクエストを受けるとPagedAttentionベースのスケジューラが複数リクエストをバッチング・KV-Cache管理しながら推論を実行し、ストリーミング応答にも対応する。

## 分散推論

モデルが1枚のGPUに載らない場合は、以下の2段階で分散させる。

- **Tensor Parallelism**: 1台のマシン内に複数GPUがあれば、モデルの重みをGPU間で分割し各層の計算を並列に分担する(Megatron-LM方式のアルゴリズム)。例えば1台に4GPUあれば`tensor_parallel_size=4`と指定する
- **Pipeline Parallelism**: モデルが1台のマシンにも収まらない場合、Tensor Parallelismと組み合わせて使う。モデルを層ごとにブロック分割し、各ブロックを別々のノードに配置する。例えば2ノード×8GPU=16GPUなら`tensor_parallel_size=8`(ノード内)・`pipeline_parallel_size=2`(ノード間)と設定する

実装上、単一ノード内の分散はPython の multiprocessing で済むが、複数ノードにまたがる場合はRayが必要になる。GPU間の通信コストが性能に直結するため、ノード内はNVLinkなどの高帯域インターコネクト、ノード間はInfiniBandのような高速ネットワークが実質的に必要になる。

## 関連

- [[mojo|Mojo]]の開発元Modular社も、同様にLLM推論・サービングを担う「MAX」という推論プラットフォームを開発している。
- [[gpustack|GPUStack]]はvLLMを推論エンジンの一つとしてプラガブルに組み込み、複数GPUのクラスタ管理を行う。vLLM自身がノード間分散推論の機構(Ray連携等)を持つ一方、GPUStackはそれらを複数ノードへどう配置・運用するかを統括するオーケストレーション層にあたる。

## 出典

- [vLLMとPagedAttention：LLM推論の革新的技術 - Qiita](https://qiita.com/Maki-HamarukiLab/items/79ba83db3824c8d28da2)
- [LLM推論高速化の鍵「vLLM」とは？ | テクフリ](https://freelance.techcareer.jp/articles/wp/detail/25576/)
- [vLLMとPagedAttentionについて語るスレ - Sun wood AI labs.2](https://hamaruki.com/vllm-pagedattention-llm-inference/)
- [OpenAI-Compatible Server — vLLM](https://docs.vllm.ai/en/v0.8.3/serving/openai_compatible_server.html)
- [serve - vLLM](https://docs.vllm.ai/en/stable/cli/serve/)
- [Distributed Inference and Serving — vLLM](https://docs.vllm.ai/en/v0.9.0/serving/distributed_serving.html)
- [Distributed Inference with vLLM | vLLM Blog](https://vllm.ai/blog/2025-02-17-distributed-inference)
