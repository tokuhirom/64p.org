---
created: 2026-08-14 11:39
updated: 2026-08-14 11:39
---
# Nomad

#hashicorp #orchestration

HashiCorpが開発するワークロードオーケストレーター。Docker以外にVM・生バイナリ・Javaアプリなど、コンテナ化されていないワークロードも含めてスケジューリング・自動化・スケーリングできる。

## アーキテクチャ

- クライアント・サーバー構成。サーバーがコントロールプレーンを形成する。
- 単一バイナリで完結しており、[[kubernetes|Kubernetes]]がetcdなど複数のコントロールプレーンコンポーネントに依存するのに対し、Nomadは外部依存なしで起動できる。
- Unix哲学の「一つのことをうまくやる」に沿って、サービスネットワーキングは[[consul|Consul]]、シークレット管理は[[vault|Vault]]という専用ツールへ責務を委譲する設計になっている。

## ライセンス変遷

2023年8月のHashiCorp全製品のBUSL 1.1化にNomadも含まれた。詳細は[[bsl|BSL]]を参照。

## 出典

- [What Is HashiCorp Nomad and How It Works | Bryan Krausen](https://krausen.io/blog/what-is-nomad/)
- [Nomad - Workload Orchestrator | HashiCorp](https://hashicorp.io/products/nomad.php)
