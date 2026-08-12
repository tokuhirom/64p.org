---
created: 2026-08-12 18:54
updated: 2026-08-12 18:54
---
# Linuxだけで作る仮想ネットワークラボ

[[vlan|VLAN]]や[[vxlan|VXLAN]]を実際に構築して遊ぶのに物理機材は不要。Linuxカーネル自体が両方をネイティブ実装しているので、network namespaceを使えばマシン1台で完結する。さらにunprivileged user namespaceを使えばsudoすら不要（後述）。 #network #linux

## レベル1: ipコマンドだけでVLAN

netnsを「仮想PC」、VLANフィルタリングを有効にしたLinuxブリッジを「L2スイッチ」に見立てる。

```sh
# 「スイッチ」を作る（VLANフィルタリング有効）
sudo ip link add br0 type bridge vlan_filtering 1
sudo ip link set br0 up

# 「PC」を作って veth ケーブルでスイッチに接続
sudo ip netns add pc1
sudo ip link add veth1 type veth peer name eth0 netns pc1
sudo ip link set veth1 master br0 up

# veth1 をVLAN 10のアクセスポートにする
sudo bridge vlan add dev veth1 vid 10 pvid untagged
sudo bridge vlan del dev veth1 vid 1
```

同様にpc2をVLAN 10、pc3をVLAN 20に繋ぐと、「同じスイッチに刺さっているのにpc1↔pc2はpingが通り、pc3には通らない」というVLANの本質をそのまま体験できる。`tcpdump -e vlan`でタグ付きフレームも観察できる。

## レベル2: VXLANもipコマンドで

```sh
sudo ip link add vxlan100 type vxlan id 100 dstport 4789 \
    local 192.168.0.1 remote 192.168.0.2 dev eth0
```

netns 2つ（または実マシン2台・VPS 2台）の間でこれを張り、`tcpdump -i eth0 udp port 4789`すると、EthernetフレームがまるごとUDPに包まれて飛ぶ様子（MAC over UDP）が実際に見える。

## sudoなしで試す: unprivileged user namespace

上記のラボはすべて`sudo`前提で書いたが、**unprivileged user namespace**の中では一般ユーザーが（そのnamespace内限定の）rootになれるので、sudoなしで丸ごと動かせる。

```sh
unshare --user --map-root-user --net --mount bash
```

これで入ったシェルの中では`ip link add`（bridge/veth/vxlanいずれも）、`ip netns add`（`--mount`を付けた上で`mount -t tmpfs tmpfs /run`しておく）、`ip netns exec`などが全部素で通る。上のVLANラボ（pc1/pc2をVLAN 10、pc3をVLAN 20に収容してpingが遮断されることの確認）を丸ごとこの中で実行して動作することを確認した（Pop!_OS、kernel 6.18）。

制約:

- namespace内に閉じているので、**ホストの実NICは触れない**。実マシン2台間でVXLANを張るような実験にはやはり実NICへの権限が必要
- ディストリによってはunprivileged usernsが制限されている（Ubuntuは23.10でAppArmorによる制限を導入し、24.04からデフォルト有効。`sysctl kernel.apparmor_restrict_unprivileged_userns`で確認できる）

sudoなし縛りの他の選択肢としては、QEMUのユーザーモードネットワーキングでVMを立ててその中でrootになる（ホスト権限不要）、rootlessコンテナ（podman + slirp4netns）などがある。

## レベル3: containerlab + FRRでEVPN/VXLANファブリック

leaf-spine構成でBGP EVPNをコントロールプレーンにしたVXLANまでやるなら、containerlabが定番。トポロジをYAMLで書くと、FRRouting（オープンソースのルーティングスイート）のコンテナ群をvethで配線した仮想ネットワークが一発で立ち上がる。お手本リポジトリ:

- [martimy/clab_vxlan_frr](https://github.com/martimy/clab_vxlan_frr) — マルチキャスト方式・EVPN方式など複数のVXLANシナリオ
- [darnodo/VXLAN-EVPN](https://github.com/darnodo/VXLAN-EVPN) — spine 1台 + leaf 2台の最小EVPNラボ

## その他の選択肢

- **Open vSwitch** — Linux標準ブリッジより本格的な仮想スイッチ。OpenStackなどが実際に使っている
- **GNS3 / EVE-NG** — Cisco IOSなどベンダーOSのイメージを動かすエミュレータ。「実機のCLI操作」の練習向けだが、イメージ入手にライセンスの壁がある

学習の順序としては、レベル1→2を生のipコマンドでやって仕組みを掴んでから、containerlabでEVPNに進むのがよさそう。

## 出典

- [Networking Lab: Setting Up a VLAN Using a Linux Bridge - iximiuz Labs](https://labs.iximiuz.com/courses/computer-networking-fundamentals/simple-vlan)
- [Introduction to Linux interfaces for virtual networking - Red Hat Developer](https://developers.redhat.com/articles/2026/04/03/introduction-to-linux-interfaces-for-virtual-networking)
- [What Is ContainerLab? The Complete 2026 Guide - NetPilot](https://www.netpilot.io/blog/what-is-containerlab)
- [Understanding AppArmor User Namespace Restriction - Ubuntu Community Hub](https://discourse.ubuntu.com/t/understanding-apparmor-user-namespace-restriction/58007)
