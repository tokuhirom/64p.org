---
created: 2026-08-14 11:39
updated: 2026-08-14 11:39
---
# HashiCorp製品群

#moc #hashicorp

HashiCorpが開発するインフラ運用系ツール群を見渡すハブノート。2024年にIBMがHashiCorpを買収し、現在はIBM傘下。

## インフラ運用ツール

- [[terraform|Terraform]] — 宣言的IaC(Infrastructure as Code)。HCLでインフラのあるべき状態を記述し、クラウド上の実リソースと同期させる
- [[consul|Consul]] — サービスディスカバリ・KVストア・サービスメッシュ。Raftで一貫性を保つ
- [[vault|Vault]] — シークレット管理・暗号化・PKI。static/dynamic secretsとIDベースのアクセス制御
- [[nomad|Nomad]] — コンテナ/非コンテナを問わず扱えるワークロードオーケストレーター。サービスネットワーキングはConsul、シークレット管理はVaultへ委譲する設計

## ライセンス変更とそれが誘発したフォーク

2023年8月、HashiCorpは全製品をMPL 2.0からBUSL 1.1([[bsl|BSL]])へ変更した。これを機にLinux Foundation傘下で2つのフォークが生まれている。

- [[opentofu|OpenTofu]] — Terraformのフォーク
- [[openbao|OpenBao]] — Vaultのフォーク

背景にある[[bsl|BSL]]/[[software-licenses|ソフトウェアライセンス]]全体の潮流については別ノートを参照。
