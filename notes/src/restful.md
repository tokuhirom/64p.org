---
created: 2026-08-11 08:07
updated: 2026-08-11 08:07
---
# RESTful（REST: Representational State Transfer）

Roy Fieldingが2000年にカリフォルニア大学アーバイン校で提出した博士論文 *"Architectural Styles and the Design of Network-based Software Architectures"* の第5章で定義されたアーキテクチャスタイル。FieldingはHTTP仕様の主要著者の一人でもある。

## RESTを構成する制約

1. **Client-Server** — 関心の分離。"Separation of concerns is the principle behind the client-server constraints"。UIとデータ保管の関心を分ける。
2. **Stateless（ステートレス）** — "each request from client to server must contain all of the information necessary to understand the request"。サーバはセッション状態を持たず、可視性・信頼性・スケーラビリティを高める。
3. **Cache（キャッシュ）** — レスポンスをキャッシュ可能／不可能と明示的・暗黙的にラベル付けし、ネットワーク効率とレイテンシを改善。
4. **Uniform Interface（統一インターフェース）** — システム全体を単純化する中核制約。以下4つのサブ制約から成る。
   - リソースの識別
   - 表現を通じたリソースの操作
   - 自己記述的メッセージ
   - **アプリケーション状態のエンジンとしてのハイパーメディア（HATEOAS）**
5. **Layered System（階層化システム）** — "each component cannot 'see' beyond the immediate layer"。プロキシ・キャッシュなど中間層を可能にする。
6. **Code-On-Demand（コードオンデマンド）** — 唯一のオプション制約。クライアントへコード（アプレット・スクリプト）をダウンロードさせ実行する。

## FieldingによるHATEOASの強い主張（2008年のブログ記事）

Fieldingは2008年、"REST APIs must be hypertext-driven" という記事で、世間の「REST API」を名乗るものの多くが単なるRPCに過ぎないと批判した。

- 真のREST APIは「アプリケーション状態のエンジンがハイパーテキストによって駆動される」必要があり、これが欠けていればRESTfulとは呼べないと明言。
- 固定的なリソース名・階層構造を仕様書などの帯域外情報で定義し、URI構造自体に意味を持たせるAPIは、クライアント・サーバ間を過度に結合させてしまう問題があると指摘。
- HATEOASにより、クライアントは事前知識なしにレスポンス内のリンク（アフォーダンス）から次の操作を判断でき、サーバ側の内部実装変更がクライアントに影響しない、長期的な進化可能性を実現できると主張している。

## 出典

- [Fielding Dissertation: Chapter 5 - Representational State Transfer (REST)](https://roy.gbiv.com/pubs/dissertation/rest_arch_style.htm)
- [REST APIs must be hypertext-driven - Roy Fielding's blog (2008)](https://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven)
- [Roy Fielding - Wikipedia (English)](https://en.wikipedia.org/wiki/Roy_Fielding)

#software-engineering #protocol
