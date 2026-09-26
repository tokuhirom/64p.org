---
created: 2026-09-26 08:01
updated: 2026-09-26 08:01
---
# Kubernetes Operator（Operatorパターン）

[[kubernetes-custom-resource|カスタムリソース]]と[[kubernetes-controller|コントローラ]]を組み合わせて、特定のアプリケーション（とその構成要素）を管理するKubernetesの拡張。「人間の運用者（operator）がサービスを管理するときに持っている知識」をコードにして自動化する、というのが名前の由来。 #kubernetes #infrastructure

## 構成要素

- **カスタムリソース** — 管理対象の設定を表す独自の型（例: `SampleDB`）
- **コントローラ** — そのカスタムリソースをwatchしてreconcileする。Kubernetes APIのクライアントとしてPodで動く
- Kubernetes本体のコードは一切変更しない。

公式ドキュメントのSampleDBの例では、Operatorが次をやる:

- ストレージ用のPersistentVolumeClaimを作る
- DBインスタンスをStatefulSetで動かす
- 初期設定をJobで流す
- 定期的にバックアップ用のPodを動かす
- DBのバージョンアップを自動で行う

ユーザー側はこれだけ:

```sh
kubectl get SampleDB                   # 設定済みのDB一覧
kubectl edit SampleDB/example-database # 設定を変える
```

## Operatorで自動化されがちなこと

- アプリケーションのデプロイ
- バックアップの取得・リストア
- スキーマ移行を伴うアップグレード
- Kubernetes外のAPIをServiceとして公開する
- 障害のシミュレーション（耐障害性テスト）
- 分散アプリケーションのリーダー選出

## 実装フレームワーク

- kubebuilder（Go）
- Operator Framework（Operator SDK）
- Kopf（Python）
- Java Operator SDK
- KubeOps（.NET）
- kube-rs（Rust）
- Metacontroller（webhookベース）

## 歴史

2016年にCoreOSが提唱した。

## 「コントローラ」と「Operator」の違い

- コントローラ: 制御ループ一般。Deployment/Jobなどの組み込みのものも含む。
- Operator: カスタムリソース + それ専用のコントローラで、特定アプリの運用知識を詰め込んだもの。いわば「コントローラの使い方の一パターン」。
- 厳密な線引きがあるわけではなく、カスタムリソース用のコントローラなら何でもOperatorと呼ばれることも多い（ピザを注文するコントローラなど、[[kubernetes-custom-resource]]参照）。

## [[kubernetes-extension-terms]]の中での位置づけ

CRDとコントローラの組み合わせ方の一パターン。用語としては一番上位（CRD・CR・コントローラをすべて含む）。

## 出典

- [Operator pattern | Kubernetes](https://kubernetes.io/docs/concepts/extend-kubernetes/operator/)
- [Introducing Operators - CoreOS (archive)](https://web.archive.org/web/20170129131616/https://coreos.com/blog/introducing-operators.html)
