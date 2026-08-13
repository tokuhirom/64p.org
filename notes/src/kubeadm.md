---
created: 2026-08-14 08:33
updated: 2026-08-14 08:39
---
# kubeadm

[[kubernetes|Kubernetes]]公式のクラスタ・ブートストラップツール。`kubeadm init` と `kubeadm join` という2つのコマンドを、クラスタ構築のベストプラクティスの「fast path」として提供する。 #kubernetes

- **`kubeadm init`** — 最初のノードでコントロールプレーンを立ち上げる。証明書の生成、kube-apiserverなどコントロールプレーンコンポーネントのstatic Pod化、[[etcd]]のセットアップまでを行う
- **`kubeadm join`** — bootstrap tokenを使ってワーカーノード（またはコントロールプレーンの追加ノード）をクラスタに参加させる

## スコープの割り切り

kubeadmは「minimum viable cluster」を立ち上げることだけに責任を持つ。マシンのプロビジョニングはスコープ外で、[[cni|CNI]]プラグイン（ネットワーク）のインストールもユーザーが後から行う。この割り切りによってオンプレ・クラウドVM・ベアメタル・ラップトップのどこでも動き、kubespray・[[cluster-api|Cluster API]]・[[minikube]]・[[kind|kind]]といった上位ツールが土台として使える部品になっている（kindがnode imageコンテナ内で各ノードをブートストラップするのに使っているのもkubeadm）。

kubeadmで構築したクラスタはKubernetesのConformanceテストを通る。

## 出典

- [Kubeadm | Kubernetes](https://kubernetes.io/docs/reference/setup-tools/kubeadm/)
- [How to Bootstrap Kubernetes Clusters with kubeadm - OneUptime](https://oneuptime.com/blog/post/2026-02-02-kubernetes-kubeadm-cluster-bootstrap/view)
