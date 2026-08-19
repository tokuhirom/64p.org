---
created: 2026-08-20 00:23
updated: 2026-08-20 00:23
---
# pasta (Pack A Subtle Tap Abstraction)

[[podman|Podman]]のrootlessコンテナ向けに使われる、ユーザー空間ネットワークツール。「Pack A Subtle Tap Abstraction」の略で、[passt](https://passt.top/passt/about/)プロジェクト(Plug A Simple Socket Transport)が提供する。旧来の`slirp4netns`の後継として位置づけられ、Podman 4.4.1から利用可能になり、Podman 5.3以降はrootlessコンテナのデフォルトネットワークツールになっている。 #container #linux #network

## 仕組み

対象のnetwork namespace内にtapデバイスを作り、そこへの入出力をホスト側のL4ソケット(TCP/UDP)にマッピングすることで通信を成立させる。CAP_NET_RAWのようなケーパビリティを必要としない。

ローカルのTCP/UDP通信については、tapデバイスを経由せず直接L4ソケット同士を`splice(2)`(TCP)や`recvmmsg`/`sendmmsg`(UDP)でつなぐバイパス経路を持ち、パフォーマンスを稼いでいる。対応プロトコルはTCP・UDP・ICMP/ICMPv6 echo。

## slirp4netnsとの違い

`slirp4netns`はNAT越しに独自のネットワーク設定を作るのに対し、pastaは**ホストのIPアドレス・ルート・MTUをそのままコンテナのnamespaceに反映**する(ホストのL2/L4状態をコンテナのL3 namespaceに「貼り付ける」イメージ)。NATを挟まない分パフォーマンスが高く、IPv6サポートや設定のシンプルさでも優位とされる。

## 設定

`containers.conf(5)`の`[network]`セクションの`pasta_options`キーでデフォルトオプションを設定できる。

## 出典

- [passt - Plug A Simple Socket Transport](https://passt.top/passt/about/)
- [passt(1) manpage](https://passt.top/builds/latest/web/passt.1.html)
- [Podman 5.8: Rootless Networking with Pasta](https://sanj.dev/post/podman-pasta-vs-slirp4netns-networking/)
- [Use Pasta Networking with Podman on Oracle Linux](https://docs.oracle.com/en/learn/ol-podman-pasta-networking/)
- [podman-network — Podman documentation](https://docs.podman.io/en/stable/markdown/podman-network.1.html)
