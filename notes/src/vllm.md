---
created: 2026-08-10 21:06
updated: 2026-08-10 21:06
---
# vLLM

LLM(大規模言語モデル)の推論・サービングを高速化するために設計されたオープンソースのライブラリ。カリフォルニア大学バークレー校のSky Computing Labによって開発された。 #llm #machine-learning

## 特徴

- 独自のメモリ管理技術「PagedAttention」を採用。OSのメモリページング(仮想メモリ)の概念からヒントを得たアルゴリズムで、KV-Cache(Attention計算の中間結果を保持するメモリ領域)を効率的に管理する
- 従来の手法ではKV-Cacheの60〜80%が無駄になっていたのに対し、vLLMはこの無駄を4%未満に抑え、ほぼ最適なメモリ使用を実現している
- スループットはHuggingFace Transformersと比較して最大24倍、HuggingFace Text Generation Inferenceと比較して最大3.5倍向上する

## 出典

- [vLLMとPagedAttention：LLM推論の革新的技術 - Qiita](https://qiita.com/Maki-HamarukiLab/items/79ba83db3824c8d28da2)
- [LLM推論高速化の鍵「vLLM」とは？ | テクフリ](https://freelance.techcareer.jp/articles/wp/detail/25576/)
- [vLLMとPagedAttentionについて語るスレ - Sun wood AI labs.2](https://hamaruki.com/vllm-pagedattention-llm-inference/)
