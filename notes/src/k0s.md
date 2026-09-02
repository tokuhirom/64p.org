---
created: 2026-08-19 09:51
updated: 2026-09-02 19:13
---
# k0s

Mirantisが開発する軽量[[kubernetes|Kubernetes]]ディストリビューション。[[cncf|CNCF]] Sandboxプロジェクトで、「Zero Friction Kubernetes」を標榜する。[[k3s]]と並んで軽量ディストリビューションの比較対象としてよく挙げられる。 #kubernetes

## アーキテクチャ

k0sも単一バイナリで配布される点はk3sと共通するが、コンポーネントの束ね方が異なる。k3sがコントロールプレーン全体を単一プロセスに統合するのに対し、k0sはバイナリの中にapiserver・etcd・kubelet・containerd・runcなど「本物の」各コンポーネントの実体を同梱し、起動時にそれぞれ個別プロセスとして展開する。iptablesなどの周辺ユーティリティも静的リンクで同梱しており、ホストOS側に必要な依存はカーネルのみ。

「100% upstream」を掲げており、Traefik・Flannel・ServiceLBのような独自コンポーネントを標準同梱するk3sより、素のKubernetesの挙動に忠実であることを重視している。

## ユースケース

Raspberry PiのようなIoTデバイスからベアメタルのデータセンターまで、幅広いインフラ規模を1つのディストリビューションでカバーすることを狙っている。CNCF認証済み(certified)のKubernetesディストリビューション。

## [[k3s]]との違い

- **k3s** — コントロールプレーンを単一バイナリ・単一プロセスに統合。Traefik/Flannel/ServiceLBなど独自コンポーネントを標準同梱し、軽量化のための取捨選択をしている。デフォルトデータストアはsqlite3([[k3s|kine]]経由)
- **k0s** — 単一バイナリ配布だが実行時のプロセスは分離されたまま。同梱コンポーネントは最小限に絞り、upstream Kubernetesへの忠実さを優先

## [[kubernetes]]の中での位置づけ

[[k3s]]・MicroK8sと同じく「軽量だが本番投入もできるディストリビューション」枠。この中でk0sは依存関係ゼロ・upstream忠実という運用面のシンプルさを最大の売りにしている。

## 出典

- [k0s | Kubernetes distribution for bare-metal, on-prem, edge, IoT](https://k0sproject.io/)
- [k0sproject/k0s - GitHub](https://github.com/k0sproject/k0s)
- [Understanding k0s: a lightweight Kubernetes distribution for the community - Mirantis](https://www.mirantis.com/blog/understanding-k0s-a-lightweight-kubernetes-distribution-for-the-community/)
- [What is Mirantis k0s, and how is it different from Rancher k3s - Kubevious](https://kubevious.io/blog/post/what-is-mirantis-k0s-and-how-it-compares-with-rancher-k3s/)
