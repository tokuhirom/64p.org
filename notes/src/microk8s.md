---
created: 2026-08-19 09:51
updated: 2026-08-19 09:51
---
# MicroK8s

Canonicalが開発する[[kubernetes|Kubernetes]]ディストリビューション。Snapパッケージとして配布され、Ubuntuをはじめsnapが使えるLinuxディストリビューションにワンコマンドでインストールできる。 #kubernetes

## アーキテクチャ

- **kubelite** — API server・scheduler・controller-manager・kubelet・kube-proxyを1つのバイナリにまとめたデーモン(`daemon-kubelite`)。複数コンポーネントを1バイナリに統合する発想は[[k3s]]に近い
- **dqlite** — デフォルトのデータストア。「distributed SQLite」と呼ばれる軽量な分散データベースで、[[etcd]]を置き換える。小規模クラスタやエッジ向けに省リソースだが、HA構成(クォーラム)も組める。より大規模・標準Kubernetes互換を重視する場合はetcdバックエンドも選択可能
- containerdランタイム(`daemon-containerd`)、Flannelによるクラスタネットワーク(`daemon-flanneld`)、外部からのAPIサーバーアクセスを扱う`daemon-apiserver-proxy`などをsnap内に同梱

## 特徴

- `microk8s enable dns dashboard ingress` のようなアドオン機構があり、体験としては[[minikube]]に近い
- snapパッケージング由来の自動アップデート・ロールバック・サンドボックス化
- Ubuntu上での運用が最も摩擦が少ないとされ、Ubuntu環境ではこれが第一候補に挙がりやすい

## [[kubernetes]]の中での位置づけ

[[minikube]]寄りのアドオン機構による開発体験の良さと、[[k3s]]・[[k0s]]寄りの単一/マルチノードでの本番運用のしやすさの両方を兼ね備えており、ローカル開発ツールと軽量本番ディストリビューションの中間に位置する。特にUbuntu環境ではsnapとの親和性が強み。

## 出典

- [MicroK8s vs k3s vs Minikube - Canonical](https://microk8s.io/compare)
- [Internals - canonical/microk8s | DeepWiki](https://deepwiki.com/canonical/microk8s/8-internals)
- [Dqlite database - Canonical Kubernetes documentation](https://documentation.ubuntu.com/canonical-kubernetes/latest/snap/reference/dqlite/)
