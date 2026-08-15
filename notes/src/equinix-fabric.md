---
created: 2026-08-15 23:23
updated: 2026-08-15 23:23
---
# Equinix Fabric

Equinix社が提供するソフトウェア定義インターコネクションサービス。Equinixのデータセンター(IBX)に1本の物理ポートを引き込むだけで、そのポート経由でクラウド事業者・ネットワーク事業者・他企業など多数の相手先へダイナミック(オンデマンド)にL2/L3の専用接続を張れる。

## 特徴

- **単一ポートから多接続**: 物理配線を都度引き直す代わりに、Equinix Customer Portal・REST API・Terraformから仮想的な接続(Virtual Connection)を作成・変更・削除できる。
- **グローバル規模**: 60以上のメトロ(都市圏)にまたがるEquinixのデータセンター間で、数千の事業者・顧客・パートナーに接続可能。
- **インターネットを迂回**: 専用L2ネットワーク上で低遅延・プライベートな接続を提供し、パブリックインターネットを経由しないことでセキュリティリスクを低減する。
- **Fabric Cloud Router (FCR)**: 物理インフラなしでハイブリッド/マルチクラウドのルーティングを簡素化する、完全仮想のL3ルーティングサービス。
- **従量課金**: セルフサービスでプロビジョニングし、使った分だけ課金される「as-a-service」モデル。

## 前身: Equinix Cloud Exchange Fabric (ECX Fabric)

もともとは「Equinix Cloud Exchange Fabric (ECX Fabric)」という名称で、クラウド接続に特化したプラットフォームだった。接続対象がクラウドだけでなく事業者間接続一般に拡張されたことで「Equinix Fabric」に改称された。

代表的なユースケースとして、AWS Direct ConnectやAzure ExpressRoute、GCPのPartner Interconnectといったクラウド事業者の専用線接続先として、物理的な相互接続をEquinix Fabric経由で仲介する使われ方が多い。

## 出典

- [Equinix Fabric®](https://www.equinix.com/products/digital-infrastructure-services/equinix-fabric)
- [Equinix Fabric FAQs | Equinix Product Documentation](https://docs.equinix.com/fabric/fabric-faqs/)
- [Get Software Defined Interconnection with Equinix Fabric](https://www.equinix.com/product-solutions/connectivity/fabric)
- [What Is Equinix Fabric Network Infrastructure? - WWT](https://www.wwt.com/article/speed-performance-and-pie-using-equinix-fabric-for-agile-connectivity)
- [Changing the Way Digital Business Connects - The Equinix Blog](https://blog.equinix.com/blog/2020/12/08/changing-the-way-digital-business-connects/)

#network #datacenter #cloud
