# Kubernetes

コンテナオーケストレーター。Googleが社内クラスタ管理システムBorgの知見をもとに2014年に公開し、CNCF設立時の最初のホストプロジェクトとなった。2010年代後半のオーケストレーション競争（vs Docker Swarm, [[apache-mesos|Apache Mesos]]）を制し、コンテナ基盤の事実上の標準になっている。

このノートはKubernetes関連ノートを束ねるハブノート。 #kubernetes #infrastructure #moc

## ローカル・軽量環境

- [[minikube]] — upstreamのKubernetesをローカルに立てる公式ツール。多様なドライバー（VM/コンテナ/ベアメタル）を選べる
- [[k3s]] — 単一バイナリの軽量ディストリビューション。エッジ・IoT・ホームラボ向けで、本番でも使われる

## アーキテクチャ・拡張機構

- [[cluster-api]] — Kubernetesクラスタ自体をKubernetesのリソースとして宣言的に管理する仕組み
- [[kubernetes-cloud-controller-manager]] — クラウドプロバイダー固有の制御ループを本体から分離したコンポーネント
- [[container-storage-interface]] — ストレージベンダーがプラグインを書くための標準インターフェース

## 事例

- [[kubernetes-on-oxide]] — Oxide Computerのオンプレクラウド基盤へのKubernetes統合の取り組み

## 前史・周辺

- [[apache-mesos]] — two-level schedulingを特徴とするクラスタマネージャ。オーケストレーション競争でKubernetesと争い、2025年にApache Attic入りした
