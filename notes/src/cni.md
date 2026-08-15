---
created: 2026-08-14 08:39
updated: 2026-08-15 14:40
---
# CNI (Container Network Interface)

Linuxコンテナのネットワーク設定を行うための、ベンダー中立な標準インターフェース仕様と基本プラグイン群。[[coreos|CoreOS]]がコンテナランタイムrktのプラグイン機構として提唱したものが原型で、2017年5月にCNCFの10番目のホストプロジェクトになった。[[kubernetes|Kubernetes]]のほか、[[apache-mesos|Mesos]]・Cloud Foundryなどでも採用されている。 #networking #kubernetes

## Kubernetesとの関係

Kubernetesは「全Podが一意なIPを持ち、NATなしで相互に通信できる」というネットワークモデルを定義するだけで、その実装は持たない。実装はCNIプラグインに委ねられていて、kubeletがPodを作るときにプラグインを呼び出し、以下を任せる。

- **IPAM** — PodへのIPアドレスの割り当て
- **インターフェース作成とルーティング** — Podのネットワークインターフェースを作り、ノードをまたぐPod間でパケットが届くようにする

[[kubeadm]]でクラスタを組んだ直後にCNIプラグインのインストールが必要なのは、この「モデルと実装の分離」のため。

## 主なプラグイン

- **Flannel** — CoreOS発のシンプルなオーバーレイネットワーク。NetworkPolicyなどの高度な機能はないが軽量で、[[k3s]]のデフォルト
- **Calico** — L3ルーティングベースでオーバーレイなしでも動く。NetworkPolicyによるセキュリティ制御が充実
- **[[cilium|Cilium]]** — eBPFでカーネルレベルにネットワーキングを実装し、iptablesを迂回する。L7（HTTP/[[grpc|gRPC]]/Kafka）レベルのポリシーまで扱える

## DockerのCNMとの対比

同時期にDockerはlibnetworkによる「CNM（Container Network Model）」という別のプラグインモデルを提唱していたが、KubernetesはCNIを採用した。コンテナネットワークの標準を巡る2陣営の競争があった。

## 出典

- [CNCF Hosts Container Networking Interface (CNI) - CNCF](https://www.cncf.io/blog/2017/05/23/cncf-hosts-container-networking-interface-cni/)
- [The Container Networking Landscape: CNI from CoreOS and CNM from Docker - The New Stack](https://thenewstack.io/container-networking-landscape-cni-coreos-cnm-docker/)
- [Comparing Kubernetes CNI Plugins - OneUptime](https://oneuptime.com/blog/post/2026-02-20-kubernetes-cni-comparison/view)
