---
created: 2026-08-14 11:36
updated: 2026-08-14 11:36
---
# Consul

#hashicorp #distributed-systems #service-mesh

HashiCorpが開発するサービスディスカバリ・ヘルスチェック・KVストア・サービスメッシュを提供する分散システム。

## アーキテクチャ

- ノードはクライアントエージェントとサーバーエージェントに分かれる。クライアントはリクエストをサーバーへ転送するのみで、状態を持つのはサーバー側。
- サーバーエージェント間の状態変更(サービスカタログ・KVストアなど)は[[raft|Raft]]合意アルゴリズムを通じて複製され、一貫性を保つ。
- クラスタのメンバーシップ管理(ノードの生死判定など)にはSerfというgossipベースのプロトコルを使う。Raftによる強い一貫性のレイヤーとは別に、ゆるいメンバーシップ管理のレイヤーが分離されている。

## サービスメッシュ

Consul Connectモードでは各サービスにサイドカープロキシ(典型的にはEnvoy)を配置し、mTLSでトラフィックを暗号化する。どのサービス同士が通信を許可されるかは「intention」という単位で定義する。

## ライセンス変遷

2023年8月にHashiCorpの全製品がMPL 2.0からBUSL 1.1へ変更された際、Consulも対象になった。詳細は[[bsl|BSL]]を参照。

## 出典

- [Consul | HashiCorp Developer](https://developer.hashicorp.com/consul)
- [Service mesh | Consul | HashiCorp Developer](https://developer.hashicorp.com/consul/docs/use-case/service-mesh)
- [Consul (software) - Wikipedia](https://en.wikipedia.org/wiki/Consul_(software))
