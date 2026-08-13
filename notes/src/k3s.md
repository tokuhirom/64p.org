---
created: 2026-08-14 08:20
updated: 2026-08-14 08:25
---
# k3s

Rancher Labs（現SUSE）が開発した軽量[[kubernetes|Kubernetes]]ディストリビューション。CNCFの適合性認証（conformant）を受けた完全なKubernetesでありながら、100MB未満の単一バイナリとして配布され、コマンド一発でインストールできる。 #kubernetes

名前の由来: Kubernetesの略記「K8s」（10文字）に対し、「半分のメモリフットプリント」を目指したので5文字ぶんの「K3s」。K8sと違って元になる長い正式名称はない。

## アーキテクチャ

通常のKubernetesがetcd・kube-apiserver・kubeletなど多数のプロセス・依存物で構成されるのに対し、k3sはコントロールプレーン全コンポーネントを単一バイナリ・単一プロセスに封じ込め、証明書配布のようなクラスタ運用の面倒ごとも自動化している。ロールは server（コントロールプレーン）と agent（ワーカー）の2つだけ。

同梱されるもの:

- コンテナランタイム: containerd（cri-dockerdも選択可）
- ネットワーク: Flannel（CNI）、CoreDNS、kube-router（NetworkPolicy）
- Ingress / LB: [[traefik|Traefik]]、ServiceLB
- ストレージ: local-path-provisioner
- iptables・socatなどのユーティリティ

## データストア: kine

デフォルトのデータストアは[[etcd]]ではなく**sqlite3**。「kine」というシムがetcd APIをSQLに変換することで、sqlite3のほかMySQL・PostgreSQLもバックエンドにできる。HA構成ではembedded etcdまたは外部データストアを使う。etcdの運用負担を避けられるのがシングルノード・小規模構成での利点。

## ユースケース

エッジ、IoT、ARMボード、CI、開発環境、エアギャップ環境、ホームラボなど、リソースが限られていたり運用をシンプルにしたい場面が主戦場。2026年時点でエッジのKubernetesデプロイの35%以上がk3sという調査もある。

派生ツールとして、k3sをDockerコンテナ内で動かす**k3d**があり、ローカル開発用途で[[minikube]]や[[kind|kind]]と並ぶ選択肢になっている。

## [[kubernetes]]の中での位置づけ

「フル機能のKubernetesを、構成を割り切ることで軽く・運用しやすくする」ディストリビューション。upstreamそのものをローカルに立てる[[minikube]]とは役割が異なり、こちらは本番（特にエッジ）でもそのまま使われる。

## 出典

- [K3s - Lightweight Kubernetes](https://docs.k3s.io/)
- [k3s-io/k3s - GitHub](https://github.com/k3s-io/k3s)
- [What is k3s? Lightweight Kubernetes in a Single Binary - Civo](https://www.civo.com/academy/kubernetes-introduction/introduction-to-k3s)
- [K3s and K0s: Lightweight Kubernetes for Edge and Development - dasroot.net](https://dasroot.net/posts/2026/04/k3s-k0s-lightweight-kubernetes-edge-development/)
