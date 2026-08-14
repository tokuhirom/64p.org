---
created: 2026-08-14 11:36
updated: 2026-08-14 11:36
---
# Terraform

#iac #hashicorp

HashiCorpが開発する宣言的IaC(Infrastructure as Code)ツール。HCL(HashiCorp Configuration Language、JSONでの記述も可)でインフラのあるべき状態を記述し、実際のクラウド上のリソースをその状態に同期させる。

## アーキテクチャ

- **Provider**: クラウド・SaaS・各種APIとやりとりするプラグイン。個々のリソースタイプ・データソースはproviderが実装する。設定内で使用するproviderを宣言し、Terraformがそれをインストールして利用する。
- **State**: デプロイ済みリソースの実際の状態を追跡するstateファイル。`backend`ブロックで保存先(ローカル・S3・Terraform Cloudなど)を指定する。`plan`はこのstateと設定の差分を計算し、`apply`で実インフラへ反映する。

## ライセンス変遷

2023年8月にMPL 2.0からBUSL 1.1(Business Source License)へ変更され、これを機に**OpenTofu**(Linux Foundation傘下)としてフォークされた。経緯の詳細は[[bsl|BSL]]・[[software-licenses|ソフトウェアライセンス]]を参照。

## 出典

- [Terraform overview | Terraform | HashiCorp Developer](https://developer.hashicorp.com/terraform/docs)
- [Providers - Configuration Language | Terraform | HashiCorp Developer](https://developer.hashicorp.com/terraform/language/providers)
- [Terraform (software) - Wikipedia](https://en.wikipedia.org/wiki/Terraform_(software))
