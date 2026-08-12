---
created: 2026-08-12 19:21
updated: 2026-08-12 19:21
---
# Open vSwitch (OVS)

Apache 2ライセンスで公開されているオープンソースのマルチレイヤ仮想スイッチ。仮想マシン環境で動作するソフトウェアスイッチで、L2（データリンク層）でイーサネットフレームを扱いつつ、OpenFlowにも対応している。[[linux-virtual-network-lab|Linux標準ブリッジ]]より本格的な仮想スイッチとして、OpenStackなどが実際に採用している。 #network #sdn

## アーキテクチャ

- **ovs-vswitchd** — スイッチ機能そのものを実装するデーモン。付随するLinuxカーネルモジュールと組み合わせてフローベースのスイッチングを行う（userspace実装のみでの動作も可能）。
- **ovsdb-server** — ovs-vswitchdが設定情報を取得するための軽量なデータベースサーバー。
- **カーネルモジュール/datapath** — 実際のパケット転送処理を担う層。
- **ovs-ofctl** — OpenFlowスイッチに対してクエリ・制御を行うユーティリティ。

OpenFlow 1.0とその多数の拡張をサポートしており、外部のSDNコントローラからフロールールを供給できる（あるいは手動でCLIから投入することも可能）。

## 主な機能

- VLAN（[[vlan|IEEE 802.1Q]]）対応
- [[vxlan|VXLAN]]、GRE、Geneveなど複数のトンネリングプロトコル対応
- NetFlow、IPFIX、sFlowによるトラフィック可視化
- QoS設定・ポリシング
- ネットワーク状態（L2学習テーブル、L3転送状態、ACLなど）のホスト間移行
- カーネルデータパスのハードウェアチップセットへのオフロード

実装形態も複数あり、古典的なカーネルモジュール版のほか、高性能だが設定が複雑なDPDK版、保守性に優れるeBPF版、従来ツールとの互換性を保ちながら高速化するAF_XDP版が存在する。

## 従来のLinuxブリッジとの違い

Linuxブリッジが単一ホスト内の単純なL2転送を主眼にしているのに対し、OVSは複数サーバーにまたがる仮想化環境を対象に設計されている。動的なエンドポイント管理、論理的な抽象化の維持、専用ハードウェアとの統合（オフロード）といった、大規模・動的な環境向けの要件に応える点が特徴。

## 主なユースケース

- **OpenStack** — Neutronのプラグインとして、VM間のネットワークを構成する標準的な仮想スイッチ
- **Kubernetes/コンテナ基盤** — CNIプラグイン経由でPod間ネットワークを構築
- **SDN環境** — 外部のSDNコントローラから直接OpenFlowで制御される構成
- **マルチテナントのトンネリング** — VXLAN等でコンピュートノード間をオーバーレイ接続
- **サービスチェーン** — 複数の仮想ネットワーク機能（VNF）間でトラフィックを転送

## 出典

- [Why Open vSwitch? — Open vSwitch documentation](https://docs.openvswitch.org/en/stable/intro/why-ovs/)
- [What is OVS? — Open vSwitch documentation](https://docs.openvswitch.org/en/latest/intro/what-is-ovs/)
- [Data centre networking: what is OVS? | Ubuntu](https://ubuntu.com/blog/data-centre-networking-what-is-ovs)
- [Open vSwitch (OVS) in Openstack | Medium](https://medium.com/@isaac2ngeno5/open-vswitch-ovs-in-openstack-85b71e5539e5)
