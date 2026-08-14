---
created: 2026-08-14 11:43
updated: 2026-08-14 11:43
---
# Business Source License

#license #source-available

MariaDB社が考案したsource-availableライセンス。SPDX識別子は`BUSL-1.1`（[[bsl|Boost Software LicenseのBSL]]と衝突するため）。「一定期間は商用利用を制限するが、期日が来たら自動的にオープンソースライセンスへ変わる」時限式が最大の特徴。MariaDB社のMaxScaleで実運用が始まり、"Business Source License"はMariaDB社の商標。

## 仕組み

デフォルトでは**本番利用（production use）を禁止**した上で、ライセンサーが3つのパラメータを埋めて運用する。

- **Additional Use Grant**: 本番利用を部分的に許可する追加条項。「自社の競合となるマネージドサービスとしての提供以外はすべて可」のように書くのが典型で、実質的な制限内容はここで決まる
- **Change Date**: 公開から**最長4年**以内に設定する期日。各バージョンごとに設定される
- **Change License**: Change Date到来後に適用されるライセンス。**GPLv2以降と互換**のオープンソースライセンスでなければならない

つまり最新バージョンだけがsource-availableで、古いバージョンは順次OSS化されていく。「競合ベンダーには最新版を使わせないが、コミュニティにはいずれ全部渡す」という妥協点の設計。

## オープンソースではない

本番利用の制限がある間はOpen Source Definitionを満たさないため、OSI承認ライセンスではなくsource-availableに分類される。MariaDB社自身も「proprietaryとopen sourceの中間の妥協」と位置づけている。

## 採用例

- **MariaDB MaxScale**: 本家。MariaDB Serverとの接続プロキシ
- **CockroachDB** (2019): Apache 2.0から移行
- **[[hashicorp|HashiCorp]]** (2023年8月): [[terraform|Terraform]]・[[vault|Vault]]など全製品をMPL 2.0からBUSL 1.1へ変更。「HashiCorpと競合する製品への組み込み・ホスティング」を禁じるAdditional Use Grantが曖昧だと批判され、Terraformから**[[opentofu|OpenTofu]]**（Linux Foundation傘下）、Vaultから**[[openbao|OpenBao]]**がフォークされた
- **SurrealDB**、**EMQX** など

[[sspl|SSPL]]同様、ライセンス変更が大型フォークを誘発した事例（OpenTofu）を生んでいる。

## [[software-licenses|ソフトウェアライセンス]]の中での位置づけ

コピーレフトの拡張である[[agpl|AGPL]]/[[sspl|SSPL]]とは別系統のsource-available。競合排除を「公開義務の重さ」ではなく「本番利用制限＋時限式OSS化」で実現するアプローチ。

## 出典

- [Business Source License 1.1 | MariaDB](https://mariadb.com/bsl11/)
- [Business Source License 1.1 | HashiCorp](https://www.hashicorp.com/en/bsl)
- [HashiCorp adopts Business Source License | HashiCorp Blog](https://www.hashicorp.com/en/blog/hashicorp-adopts-business-source-license)
- [HashiCorp Adopts Business Source License for All Products - InfoQ](https://www.infoq.com/news/2023/08/hashicorp-adopts-bsl/)
- [Business Source License - Wikipedia](https://en.wikipedia.org/wiki/Business_Source_License)
- [Business Source License 1.1 | SPDX](https://spdx.org/licenses/BUSL-1.1.html)
