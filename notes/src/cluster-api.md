---
created: 2026-08-14 08:09
updated: 2026-09-02 19:13
---
# Cluster API (CAPI)

Kubernetesクラスタ自体のライフサイクル（作成・アップグレード・運用）を、Kubernetes流の宣言的APIで管理するためのサブプロジェクト。[[cncf|CNCF]]のCluster Lifecycle Special Interest Group（SIG）配下にある。

## 発想

Kubernetesがコンテナ（Pod）を宣言的なYAMLとコントローラのreconcileループで管理するのと同じパターンを、「クラスタそのもの」の管理に適用したもの。Kubernetesのバージョン、ノード数、マシンタイプ、ネットワーキングなどの「望ましい状態」をYAMLで定義し、CAPIのコントローラが実環境をその定義に近づけ続ける（reconcile）。

## management clusterというアーキテクチャ

CAPIは「他のKubernetesクラスタを作成・管理するための専用Kubernetesクラスタ（management cluster）」を用意し、そこでCAPIのコントローラ群を動かす。management clusterが単一のコントロールプレーンとなり、配下の複数の「workload cluster」群（＝実際にワークロードが載るクラスタ）を管理する構造になっている。

## プラガブルなプロバイダー機構

インフラストラクチャプロバイダー・ブートストラッププロバイダー・コントロールプレーンプロバイダーという3種類のプラグインを差し替えることで、AWS・Azure・GCP・VMware・ベアメタルなど多様な基盤に対応する。

## [[kubernetes-on-oxide|Oxide Computer]]でのCAPOx

Oxide向けのインフラストラクチャプロバイダーは「CAPOx（Cluster API Provider Oxide）」と呼ばれ、Oxideプラットフォーム上でのKubernetesクラスタの宣言的な作成・管理をCluster APIの枠組みで実現する。同じくOxide向けの[[kubernetes-on-oxide|Rancher Node Driver]]や[[kubernetes-on-oxide|Omni Infrastructure Provider]]とは別の、独立したプロビジョニング手段として提供されている。

## [[kubernetes]]の中での位置づけ

宣言的管理の対象をPodなどのワークロードから「クラスタそのもの」に一段引き上げる拡張機構。[[kubernetes-cloud-controller-manager|CCM]]や[[container-storage-interface|CSI]]が既存クラスタの中でインフラと連携するのに対し、こちらはクラスタの作成・削除自体を扱う。

## 出典

- [Getting started with Kubernetes Cluster API (CAPI) - Spectro Cloud](https://www.spectrocloud.com/blog/getting-started-with-kubernetes-cluster-api-capi)
- [Efficient kubernetes cluster management with CAPI | SUSE Communities](https://www.suse.com/c/rancher_blog/kubernetes-cluster-management-building-infrastructure-agnostic-clusters-with-cluster-api/)

#kubernetes
