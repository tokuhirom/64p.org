---
created: 2026-08-14 08:25
updated: 2026-08-19 09:51
---
# Kubernetes

コンテナオーケストレーター。Googleが社内クラスタ管理システム[[google-borg|Borg]]の知見をもとに2014年に公開し、CNCF設立時の最初のホストプロジェクトとなった。2010年代後半のオーケストレーション競争（vs Docker Swarm, [[apache-mesos|Apache Mesos]]）を制し、コンテナ基盤の事実上の標準になっている。

このノートはKubernetes関連ノートを束ねるハブノート。 #kubernetes #infrastructure #moc

## ローカル・軽量環境

- [[minikube]] — upstreamのKubernetesをローカルに立てる公式ツール。多様なドライバー（VM/コンテナ/ベアメタル）を選べる
- [[k3s]] — 単一バイナリの軽量ディストリビューション。エッジ・IoT・ホームラボ向けで、本番でも使われる
- [[kind|kind]] — Kubernetes本体のテスト用に生まれた、Dockerコンテナをノードとするクラスタツール。CI・使い捨てクラスタ向き
- [[k0s]] — Mirantis製の単一バイナリ・依存関係ゼロを掲げるディストリビューション。upstreamへの忠実さを重視
- [[microk8s|MicroK8s]] — Canonical製のsnap配布ディストリビューション。アドオン機構を持ち、Ubuntu上での運用に強い

## アーキテクチャ・拡張機構

- [[cluster-api]] — Kubernetesクラスタ自体をKubernetesのリソースとして宣言的に管理する仕組み
- [[kubernetes-cloud-controller-manager]] — クラウドプロバイダー固有の制御ループを本体から分離したコンポーネント
- [[container-storage-interface]] — ストレージベンダーがプラグインを書くための標準インターフェース
- [[cni|CNI]] — Podネットワークを実装するプラグインの標準インターフェース。ストレージにおけるCSIのネットワーク版にあたる
- [[etcd]] — クラスタの全状態を保存するプライマリデータストア
- [[kubeadm]] — クラスタを手作業で組む際の公式ブートストラップツール。kind・Cluster APIなど上位ツールの土台でもある

## 事例

- [[kubernetes-on-oxide]] — Oxide Computerのオンプレクラウド基盤へのKubernetes統合の取り組み

## 前史・周辺

- [[apache-mesos]] — two-level schedulingを特徴とするクラスタマネージャ。オーケストレーション競争でKubernetesと争い、2025年にApache Attic入りした
- [[google-borg|Borg]] — Kubernetesの源流となったGoogle社内のクラスタ管理システム
