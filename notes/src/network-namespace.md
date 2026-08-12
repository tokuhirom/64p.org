# Network Namespace (netns)

Linuxカーネルの機能で、プロセスグループごとに独立したネットワークスタックを持たせる分離技術。カーネル内部では各namespaceインスタンスが`struct net`で表現される。プロセス・ファイルシステム・IPCなどを分離する他のnamespace種別と並ぶ、Linux namespaces機構の一種。[[cgroups]]によるリソース制御と組み合わせて[[lxc|LXC]]などの軽量仮想化の基盤にもなっている。 #network #linux #kernel

## namespaceごとに独立して管理されるもの

- ネットワークインターフェース（lo, eth0など）
- ルーティングテーブル（IPv4/IPv6）
- iptables/nftablesのファイアウォール設定
- netfilterの接続追跡状態
- Unixドメインソケットの名前空間
- ポート番号空間（0-65535）
- `/proc/net/`以下のビュー

初期化時に`pernet_operations`フックを通じて、各サブシステムがper-namespace状態を初期化する。

## 管理コマンド: ip netns

```sh
ip netns add ns1                        # 名前空間を作成
ip netns exec ns1 <cmd>                  # 名前空間内でコマンド実行
ip link set <iface> netns ns1            # 既存インターフェースを移動
ip netns del ns1                         # 削除
```

## veth pairによる接続

異なるnamespace同士やnamespaceとホストを繋ぐ標準的な手段が**veth pair**（仮想Ethernetペア）。片方に入れたフレームがもう片方から出てくる「パイプ」のように振る舞う。ペアの一端をnamespace Aに、もう一端をnamespace Bやホストに配置して接続する。[[linux-virtual-network-lab|実際に構築した例]]では、veth pairで複数のnamespaceを[[linux-bridge|Linuxブリッジ]]に接続した。

## unprivileged user namespaceとの組み合わせ

`unshare --user --map-root-user --net`のようにuser namespaceと組み合わせることで、sudoなしでもnetwork namespaceを作成・操作できる。ただし作成したnamespaceはホストの実NICには触れられない。

## 出典

- [Network Namespaces - Linux Kernel Internals](https://kernel-internals.org/net/net-namespaces/)
- [Linux Network Namespaces: Isolate Network Stacks | Command in Line](https://www.commandinline.com/linux-network-namespaces-guide/)
