---
created: 2026-08-09 22:57
updated: 2026-08-13 19:36
---
# DDD (Domain-Driven Design / ドメイン駆動設計)

#software-engineering

2003年にEric Evansが著書『Domain-Driven Design: Tackling Complexity in the Heart of Software』で提唱したソフトウェア設計手法。複雑な業務ドメインを扱うソフトウェア開発において、技術的な複雑さよりも「ドメイン（業務領域）そのものの理解」に焦点を当てて設計する、という考え方が核。

Evans自身による2014年のリファレンス定義では、DDDとは以下を行うアプローチとされている。

1. コアドメイン（事業の核心部分）に集中する
2. ドメインの専門家とソフトウェア開発者が協働してモデルを探求する
3. 明示的に境界づけられたコンテキスト内で「ユビキタス言語」を話す

## ユビキタス言語 (Ubiquitous Language)

開発者・ドメイン専門家・ステークホルダー全員が共有する語彙。議論・ドキュメント・コードすべてで同じ用語を使うことで、認識のズレを防ぐ。

## 境界づけられたコンテキスト (Bounded Context)

Martin Fowlerが「DDDの戦略的設計の中心パターン」と位置づける概念。大きなドメインモデルを、それぞれ独自のユビキタス言語が通用する論理的な境界（コンテキスト）に分割する。「境界」とは要するに**「同じ単語が同じ意味で通用する範囲」**のこと。この境界は技術的な都合よりも、組織や人間のコミュニケーションが自然に区切れる場所（部署の境目など）に沿って引くべきだとされる。

### 具体例: 電力会社の「メーター」

Fowlerが挙げている例。ある電力会社では「メーター(meter)」という同じ単語が部署によって全く違う意味で使われていた。

- **送電部門**: 送電網と設置場所の接続点
- **顧客管理部門**: 送電網と顧客の契約上の接続点
- **設備保守部門**: 壊れたら交換できる物理的な機器そのもの

日常会話では「大体同じようなもの」で済むが、これを1つのソフトウェアの中で「Meter」という1つのクラス・1つのテーブルに無理やり統一しようとすると破綻する。保守部門が「このMeterを交換」と言った瞬間に、顧客管理部門の契約データとの整合性がおかしくなる、といった具合。DDDでは、こうした部門ごとの意味の違いを1つのモデルに押し込めず、**別々のBounded Contextとして設計し、必要な箇所だけ変換・連携する**アプローチを取る。

## 戦術的な構成要素（実装パターン）

- **Entity（エンティティ）**: 属性が変わっても持続する「identity（同一性）」で識別されるオブジェクト（例: 顧客）
- **Value Object（値オブジェクト）**: identityではなく属性そのもので特徴づけられ、基本的にimmutable（例: 金額、住所）
- **Aggregate（集約）**: 関連するEntity/Value Objectをまとめた単位。外部からのアクセスは必ず**Aggregate Root**という代表エンティティ経由に限定し、整合性を担保する
- **Domain Event（ドメインイベント）**: ドメイン内で起きた重要な出来事を表す

## 位置づけ

- OOP（オブジェクト指向）とは親和性が高く、Entity/Value ObjectはOOPのクラスのインスタンスとみなせる
- [[microservices|マイクロサービス]]アーキテクチャとも相性がよく、Bounded Contextがサービス分割の単位の指針になることが多い
- CQRSやイベントソーシングと組み合わせられることも多いが、DDD自体に必須ではない

## 批判・限界

複雑なドメインには有効だが、学習コストが高く、ドメイン専門家との継続的な協働を必要とするため、シンプルなアプリケーションにはオーバースペックとされる。

## 出典

- [Domain-Driven Design Reference (domainlanguage.com, Eric Evans)](https://www.domainlanguage.com/ddd/)
- [What is DDD, by Eric Evans](https://ddd.academy/blog/what-is-ddd-by-eric-evans)
- [Domain-Driven Design (DDD) | Redis Glossary](https://redis.io/glossary/domain-driven-design-ddd/)
- [bliki: Bounded Context (Martin Fowler)](https://martinfowler.com/bliki/BoundedContext.html)
- [bliki: DDD_Aggregate (Martin Fowler)](https://martinfowler.com/bliki/DDD_Aggregate.html)
