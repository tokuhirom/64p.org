---
created: 2026-08-12 19:30
updated: 2026-08-12 19:30
---
# Linux標準ブリッジ

Linuxカーネルのbridgeモジュールが実装するソフトウェアL2スイッチ。接続されたインターフェース（veth, tapなど）間でEthernetフレームを転送する、カーネル組み込みの機能。仮想マシン・コンテナ・network namespace間の接続によく使われる。[[linux-virtual-network-lab|VLANラボの実験]]でも「L2スイッチ」役として使った。 #network #linux

## 管理コマンド: brctl vs iproute2

- **brctl**（bridge-utilsパッケージ）— 旧来のコマンド。VLANサポートがなく非推奨。
- **iproute2** — 現在の標準。`ip link`でブリッジの追加・削除・オプション設定を行い、`bridge`コマンドでFDB（MACアドレステーブル）・MDB・VLAN設定を表示・操作する。

```sh
ip link add br0 type bridge
ip link set br0 up
```

## STP (Spanning Tree Protocol)

カーネル2.4/2.6系列以降、STPの基本サポートを内蔵している。BPDU（Bridge Protocol Data Unit）を交換してルートブリッジを選出し、ループになる経路のポートをブロックする。RSTPには非対応。

```sh
ip link set br0 type bridge stp_state 1
```

## VLANフィルタリング

カーネル3.8で導入された機能。それ以前はVLANごとに別々のブリッジを用意する必要があったが、VLANフィルタリングにより単一のブリッジで複数の[[vlan|VLAN]]を扱えるようになった。

```sh
ip link set br0 type bridge vlan_filtering 1
bridge vlan add dev veth1 vid 10 pvid untagged   # アクセスポート
bridge vlan add dev veth4 vid 10 tagged          # トランクポート
```

## [[open-vswitch|Open vSwitch]]との違い

Linux標準ブリッジは単一ホスト内の単純なL2転送を主眼にした軽量な実装。Open vSwitchが持つような、複数サーバーにまたがる仮想化環境向けの動的エンドポイント管理・OpenFlowによるリモート制御・[[vxlan|VXLAN]]等のトンネリング統合機能は持たない。

## 出典

- [An introduction to Linux bridging commands and features - Red Hat Developer](https://developers.redhat.com/articles/2022/04/06/introduction-linux-bridging-commands-and-features)
- [Ethernet Bridging — The Linux Kernel documentation](https://docs.kernel.org/networking/bridge.html)
- [(Vlan-aware) Bridges on Linux – SDN Clinic](https://blog.sdn.clinic/2018/12/vlan-aware-bridges-on-linux/)
