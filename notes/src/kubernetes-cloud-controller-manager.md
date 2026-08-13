---
created: 2026-08-14 08:09
updated: 2026-08-14 08:09
---
# Cloud Controller Manager (CCM)

クラウド固有の制御ロジックを埋め込んだKubernetesのコントロールプレーンコンポーネント。クラスタをクラウドプロバイダーのAPIと連携させる役割を担い、「クラスタ内部だけで完結するコンポーネント」と「クラウド基盤と対話するコンポーネント」を分離するために存在する。

## 目的

CCMが登場する以前は、各クラウドベンダー向けの連携コードがKubernetes本体（kube-controller-manager）に直接組み込まれていた（in-tree cloud provider）。これをプラグイン機構として切り出すことで、クラウドベンダーがKubernetes本体のリリースサイクルとは独立した速度で自社向け機能をリリースできるようになった。

## 主に持つコントローラ

- **Node Controller** — クラウド上に新しいサーバーが作られたことを検知し、対応するKubernetesのNodeオブジェクトを更新する。クラウドAPIから得た一意な識別子や、リージョン・利用可能なCPU/メモリなどのラベル・アノテーションを付与する
- **Route Controller** — ノード間通信のため、クラウドプロバイダー側のネットワークルートを設定する
- **Service Controller** — `type: LoadBalancer`のServiceに対応して、クラウド側のロードバランサーを管理する

## [[kubernetes-on-oxide|Oxide Computer]]での実装

Oxide向けのCCMは、OxideインスタンスとKubernetesのNodeオブジェクトの同期（Node Controller相当）と、Oxideの Floating IPを使ったLoadBalancerサービスの実現（Service Controller相当）を担当している。ロードバランサーは記事執筆時点でProxyモードで実装されている。

## 出典

- [Cloud Controller Manager | Kubernetes](https://kubernetes.io/docs/concepts/architecture/cloud-controller/)
- [Developing Cloud Controller Manager | Kubernetes](https://kubernetes.io/docs/tasks/administer-cluster/developing-cloud-controller-manager/)

#kubernetes
