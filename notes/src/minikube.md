---
created: 2026-08-14 08:20
updated: 2026-08-14 08:20
---
# minikube

ローカルマシン上に[[kubernetes|Kubernetes]]クラスタを立てるためのツール。Kubernetesプロジェクト公式のサブプロジェクト（`kubernetes/minikube`、サイトは sigs.k8s.io 配下）として開発されている。「手元でKubernetesを触ってみる」ための定番の入り口。 #kubernetes

## 特徴

- **ドライバー機構** — クラスタの実体をVM・コンテナ・ベアメタルのいずれでも動かせる。docker / podman / kvm2 / virtualbox / hyperv / qemu / vfkit / none（ベアメタル）など多数のドライバーから選ぶ。コンテナ系（docker）は軽く起動も速い一方、kvm2などVM系はVMを丸ごと起動するぶん重いが、ホストとの分離度は高い
- **アドオン機構** — `minikube addons enable ingress` のように、ingress・dashboard・metrics-server・registryなどをコマンド一発で追加できる
- **Kubernetesバージョン選択** — 最新版に加えて6つ前までのマイナーバージョンを指定でき、特定バージョンでの検証がしやすい
- **マルチノード** — `minikube start --nodes 3` のように複数ノードのクラスタも作れる
- クロスプラットフォーム（Linux / macOS / Windows）、複数コンテナランタイム（containerd / CRI-O / docker）、GPU（NVIDIA / AMD / Apple）対応

## kind・k3d との比較

ローカルKubernetes環境の選択肢としては kind・k3d がよく比較対象になる。

- **minikube** — ドライバーの選択肢が多く、非Docker環境（VM・ベアメタル）でも動く。歴史が長くドキュメントが充実
- **kind**（Kubernetes in Docker）— DockerコンテナをノードとしてupstreamのKubernetesを動かす。マルチノードクラスタの構築が容易で、CIやオペレーター/CRDのテスト用途に向く
- **k3d** — 軽量ディストリビューション[[k3s]]をDockerコンテナ内で動かすラッパー。起動が速くフットプリントが小さい

## [[kubernetes]]の中での位置づけ

ローカル開発・学習用途の公式ツール。[[k3s]]がコンポーネントを差し替え・同梱した軽量「ディストリビューション」であるのに対し、minikubeはupstreamのKubernetesそのものをローカルに立てるための「環境構築ツール」という違いがある。

## 出典

- [minikube documentation](https://minikube.sigs.k8s.io/docs/)
- [Local Kubernetes Tools Compared: Kind vs. Minikube vs. k3d - ARMO](https://www.armosec.io/blog/best-local-kubernetes-tools/)
- [Kind vs Minikube vs k3d: Best Local Kubernetes in 2026 - Reintech](https://reintech.ai/blog/kind-vs-minikube-vs-k3d-local-kubernetes-comparison)
