---
created: 2026-09-26 08:01
updated: 2026-09-26 08:01
---
# Kubernetesのコントローラ（制御ループ・reconcile）

クラスタの状態をwatchし、「実際の状態（current state）」を「望ましい状態（desired state）」に近づける変更を行い続けるループ。[[kubernetes|Kubernetes]]の動作はほぼ全部これの組み合わせでできている。 #kubernetes #infrastructure

## 公式ドキュメントのたとえ: サーモスタット

- 設定温度 = 望ましい状態
- 室温 = 実際の状態
- サーモスタットが暖房をON/OFFして室温を設定温度に近づける = コントローラの動作

この「差分を見て埋める」1回分の処理を **reconcile**（突き合わせ）と呼び、それを繰り返すのが **制御ループ（control loop）** / reconcileループ。

## spec と status

- コントローラは最低1種類のリソースを追跡し、その `spec` フィールドを望ましい状態として読む。
- 実際にやったことの結果は `status` に書き戻す。
- ユーザーは `spec` を書くだけ、`status` はコントローラが書く、という役割分担。

## 例: Jobコントローラ

- 新しい `Job` オブジェクトをwatchする（望ましい状態）
- 仕事を実行する `Pod` を作る（コンテナを自分で動かすわけではなく、API server経由で他のコンポーネントに任せる）
- 終わったら `Job` の `status` を更新する

「あるリソースを望ましい状態として読み、別のリソースを作って実現する」という分離が基本形。DeploymentコントローラもJobコントローラもPodを作るが、ラベルで自分の管理対象を区別しているので干渉しない。

## 2つの制御方式

1. **API server経由**（大半）— JobコントローラのようにKubernetesのオブジェクトを作って間接的に実現する。
2. **外部を直接操作** — クラスタ外のシステムを直接叩く。ノードを増やすオートスケーラーや、[[kubernetes-cloud-controller-manager|Cloud Controller Manager]]のようにクラウドのAPIを叩くもの。

## どこで動いているか

- Deployment / Job / ReplicaSet などの組み込みコントローラは **kube-controller-manager** の中でまとめて動く。
- クラウド連携系は[[kubernetes-cloud-controller-manager|cloud-controller-manager]]に分離されている。
- 自作のコントローラは普通のPodとしてクラスタ内で動かす。[[kubernetes-custom-resource|カスタムリソース]]と組み合わせたものが[[kubernetes-operator|Operator]]。

## 設計上のポイント

- 巨大な1つのループではなく、それぞれが1つの側面を担当する小さなコントローラを多数動かす。
- クラスタは常に変化しているので、完全に安定した状態に到達しないこともある。コントローラが動いて有用な変更を続けていればそれでよい、という考え方。
- 同じパターンをクラスタそのものに適用したのが[[cluster-api|Cluster API]]。

## [[kubernetes-extension-terms]]の中での位置づけ

Kubernetesを動かす仕組みの中核。CRDは「型」、コントローラは「それを動かす処理」、Operatorは「その組み合わせ方の一パターン」という関係。

## 出典

- [Controllers | Kubernetes](https://kubernetes.io/docs/concepts/architecture/controller/)
