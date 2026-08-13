---
created: 2026-08-13 19:36
updated: 2026-08-13 19:36
---
# マイクロサービス (Microservices)

#software-engineering #distributed-systems

アプリケーションを、疎結合で細粒度の独立したサービス群に分割し、それぞれが軽量なプロトコル（主にHTTP/REST、gRPCなど）で通信するアーキテクチャスタイル。各サービスは独立したプロセスとして動作し、多くの場合サービスごとに専用のデータベースを持つ。

## 主な特徴

1. **単一責務のコンポーネント** — 各サービスは特定のビジネス機能を1つだけ担う。[[domain-driven-design|DDD]]の「[[domain-driven-design|境界づけられたコンテキスト（Bounded Context）]]」に沿ってサービス境界を引くことが多い
2. **分散化** — サービス間の依存が少なく、疎結合
3. **耐障害性** — 1サービスの障害がシステム全体を止めない設計を目指す
4. **独立したスケーラビリティ** — チームごとに独立して開発・デプロイ・スケールできる
5. **技術的な自由度** — サービスごとに異なる言語・DB・実行環境を選べる（polyglot）

## モノリスとの対比（Martin Fowlerの整理）

Martin Fowlerの "Microservice Trade-Offs" によれば、モノリスは全体を一括デプロイする必要があるが、マイクロサービスは各サービスを独立してデプロイでき、単純なサービスほど障害を起こしにくい。一方で通信がネットワーク越し（[[restful|RESTful]]なHTTPリクエスト/レスポンス等）になるため、信頼性・セキュリティの面でモノリス内呼び出しより劣る場面がある。

Fowlerはこれを **"MicroservicePremium"**（マイクロサービス採用に伴う追加コスト）と呼び、十分複雑なシステムでなければ割に合わないと指摘している。

また "Monolith First" というエントリでは、成功しているマイクロサービス事例のほとんどは最初モノリスとして作られ、肥大化してから分割されたものであり、新規プロジェクトを最初からマイクロサービスで始めるべきではない、という立場を取っている。

## 代表的な関連パターン

[microservices.io](https://microservices.io/) で整理されているパターンの一部。

- **API Gateway** — クライアントからの単一窓口となり、複数サービスへのルーティングを担う
- **Service Discovery** — サービスインスタンスの動的な位置解決
- **Circuit Breaker** — 依存サービスの障害が連鎖しないよう遮断する
- **Saga** — サービス間にまたがる分散トランザクションの整合性を、ローカルトランザクションの連鎖と補償トランザクションで確保する

## 出典

- [What are Microservices? | TechTarget](https://www.techtarget.com/searchapparchitecture/definition/microservices)
- [Microservices - Wikipedia](https://en.wikipedia.org/wiki/Microservices)
- [Microservices Pattern: Microservice Architecture pattern | microservices.io](https://microservices.io/patterns/microservices.html)
- [Microservice Trade-Offs | Martin Fowler](https://martinfowler.com/articles/microservice-trade-offs.html)
- [bliki: Monolith First | Martin Fowler](https://martinfowler.com/bliki/MonolithFirst.html)
