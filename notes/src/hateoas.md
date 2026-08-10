---
created: 2026-08-11 08:09
updated: 2026-08-11 08:09
---
# HATEOAS（Hypermedia As The Engine Of Application State）

[[restful|REST]]の4つの「統一インターフェース制約」のうち最後の1つ。Roy Fieldingの2000年の博士論文で初めて言及された。

## 原典での定義

論文セクション5.1.5（Uniform Interface）で、REST全体を定義する4つのインターフェース制約の一つとして登場する。

> "REST is defined by four interface constraints: identification of resources; manipulation of resources through representations; self-descriptive messages; and, hypermedia as the engine of application state."

つまり、クライアントは事前に固定されたAPI仕様書やURI構造の知識に頼るのではなく、サーバーから返されるレスポンス（ハイパーメディア＝リンクなど）そのものから、次に取りうる操作（アフォーダンス）を発見しながら進んでいくべき、という制約。

## Richardson Maturity Model（成熟度モデル）とHATEOAS

HATEOASを段階的な指標として整理したのが、Leonard Richardson（書籍 *"RESTful Web Services"* の共著者）。2008年11月20日、QCon San Franciscoでの講演 *"Justice Will Take Us Millions Of Intricate Moves"* の第3幕（Act 3）で発表した「成熟度ヒューリスティック」が原型。

- **Level 0**: 単一のエンドポイントにPOSTだけを投げるRPCスタイル
- **Level 1**: リソースごとにURIを分ける
- **Level 2**: HTTPメソッド（GET/POST/PUT/DELETE等）を正しく使い分ける
- **Level 3**: HATEOAS対応。レスポンスにハイパーメディアリンクを含み、クライアントが動的に次のアクションを発見できる（このモデルの最上位段階）

## Fieldingによる軽視への批判

Fieldingは2008年、"REST APIs must be hypertext-driven" という記事で、世に「REST API」を名乗るものの多くがHATEOASを欠いた単なるRPCに過ぎないと批判している。固定的なリソース名・階層構造を仕様書などの帯域外情報で定義し、URI構造自体に意味を持たせるAPIは、クライアント・サーバ間を過度に結合させてしまう問題があると指摘した。

## 出典

- [Fielding Dissertation: Chapter 5 - Representational State Transfer (REST)](https://roy.gbiv.com/pubs/dissertation/rest_arch_style.htm)
- [Justice Will Take Us Millions Of Intricate Moves - Leonard Richardson (crummy.com, 2008 QCon)](https://www.crummy.com/writing/speaking/2008-QCon/)
- [Richardson Maturity Model - Martin Fowler](https://martinfowler.com/articles/richardsonMaturityModel.html)
- [Richardson Maturity Model - Wikipedia (English)](https://en.wikipedia.org/wiki/Richardson_Maturity_Model)
- [REST APIs must be hypertext-driven - Roy Fielding's blog (2008)](https://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven)

#software-engineering #protocol
