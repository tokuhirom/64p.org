---
created: 2026-09-26 07:54
updated: 2026-09-26 08:03
---
# Kubernetesのカスタムリソース（CRD）

CustomResourceDefinition (CRD) を登録すると、[[kubernetes|Kubernetes]] APIに独自の型（Kind）を追加できる。登録した瞬間から `kubectl get/apply/delete` やwatchが組み込みリソースと同じように使える。実体は「スキーマ付きのJSONを[[etcd]]に保存し、REST APIで出し入れする仕組み」。 #kubernetes #infrastructure

## CRDとコントローラは別物

用語の関係は[[kubernetes-extension-terms]]に整理。


- CRD単体はただのデータ置き場。オブジェクトを作っても何も起きない。
- 現実に何かを起こすのは[[kubernetes-controller|コントローラ]]（[[kubernetes-operator|Operator]]）で、CRを watch して「望ましい状態（spec）」に「実際の状態」を近づけるreconcileループを回し、結果を `status` に書き戻す。
- なので「何でも登録できるか」の答えは、データとしてはJSONで書けるものなら大体何でも可。何を起こせるかはコントローラ次第で、クラスタ外の物理世界でも構わない（後述のピザ）。

## カスタムリソースで管理するメリット

### Kubernetes APIの機能がタダで付いてくる

CRDを登録するだけで組み込みリソースと同じ機能が使える。認証・認可・永続化・CLIを自作しなくてよい。

| 機能 | うれしさ |
|---|---|
| CRUD・watch | 変更検知の仕組みを書かなくていい |
| kubectl対応 | `get`/`describe`/`edit`/`--watch` がそのまま使える |
| RBAC | 「作れるが消せない」などの権限を既存の仕組みで書ける |
| 監査ログ | 誰がいつ何を変えたかが残る |
| バリデーション | スキーマ・[[common-expression-language\|CEL]]・Admission Webhookで不正値をはじける |
| Finalizer | 削除前の後始末（外部リソースの削除など）をフックできる |
| バージョニング | `v1alpha1` → `v1` の移行と変換の仕組み |
| Discovery・JSON Patch・Dashboard | APIとして発見でき、部分更新でき、UIにも出る |

### 宣言的に管理できる

- ユーザーは `spec`（望ましい状態）を書くだけで手順は書かない。
- [[kubernetes-controller|コントローラ]]がreconcileし続けるので、手で壊されても元に戻る（自己修復・ドリフト修正）。
- 結果は `status` に出るので状態確認の方法が統一される。

### 複雑なものを1枚のYAMLに抽象化できる

```yaml
apiVersion: example.com/v1
kind: Database
metadata:
  name: my-database
spec:
  engine: PostgreSQL
  version: "14"
  replicas: 3
```

これだけでStatefulSet・PVC・Service・バックアップJobなどが作られる、という形にできる。運用知識をコントローラ側に閉じ込め、利用者にはシンプルな入口だけ見せる。これが[[kubernetes-operator|Operator]]の価値。

### 既存エコシステムに乗る

- Argo CD / FluxのようなGitOps、Helm、kustomizeで他のマニフェストと同じように扱える。
- アプリもDBも証明書もクラウドリソースも、同じkubectlとYAMLで扱えるという統一感が一番大きい。

## 向かないケース・導入時の注意

公式ドキュメントでは、宣言的APIに当てはまらないものは独立したAPIサーバーにすることを勧めている。宣言的APIの特徴は:

- 小さなオブジェクトが比較的少数
- アプリやインフラの設定を表す
- 更新頻度が低い
- 人間が読み書きする
- 主な操作がCRUDで、オブジェクトをまたぐトランザクションが不要

逆に次のようなものは向かない:

- 「これやって」と頼んで同期的に結果を待つRPC的な操作、IDを返して別途ステータスを聞きに行く操作
- 1オブジェクト数kB超、または数千個以上のオブジェクト（サイズ上限は後述の「制約」参照）
- 毎秒数十リクエストのような高頻度アクセス
- エンドユーザーのデータ（画像・個人情報など）
- CRUDで表せない操作、オブジェクトとしてモデル化しにくいもの

### ConfigMapとの使い分け

- **ConfigMap** — `mysql.cnf` のような既存フォーマットの設定ファイルを丸ごと入れ、Pod内のプログラムがファイルや環境変数として読むだけの場合。設定変更時にDeploymentのローリングアップデートで反映したい場合。
- **カスタムリソース** — kubectlのトップレベルで扱いたい、変更をwatchして他のオブジェクトを作る自動化をしたい、`spec`/`status` の慣習に乗りたい、複数リソースをまとめて抽象化したい、ドメイン固有のバリデーションが欲しい場合。

### 導入時のコスト

- コントローラという新しいコードがクラスタ内で動くので、それ自体の監視・トラブルシュートが必要になる。暴走するとクラスタの安定性に影響する。
- データは[[etcd]]に入るので、バックアップ・リストア計画とストレージ負荷を考える。
- 誰が作成・変更できるかのRBAC設計、spec内の機密情報の扱いを考える。

## 定義の例（公式ドキュメントのCronTab）

```yaml
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: crontabs.stable.example.com   # <plural>.<group> でなければならない
spec:
  group: stable.example.com
  versions:
    - name: v1
      served: true
      storage: true
      schema:
        openAPIV3Schema:
          type: object
          properties:
            spec:
              type: object
              properties:
                cronSpec: {type: string}
                image: {type: string}
                replicas: {type: integer}
  scope: Namespaced
  names:
    plural: crontabs
    singular: crontab
    kind: CronTab
    shortNames: [ct]
```

## 制約

- **名前**: `metadata.name` は `<plural>.<group>` 形式。groupはドメイン名風（`stable.example.com`）。
- **structural schema必須**: `apiextensions.k8s.io/v1` ではOpenAPI v3の構造的スキーマが必須。スキーマにないフィールドは保存前にpruning（黙って削除）される。任意のJSONを入れたい部分には `x-kubernetes-preserve-unknown-fields: true` を付ける。
- **バリデーション**: スキーマに加え、[[common-expression-language|CEL]]でフィールド間の制約をkube-apiserver内で書ける（webhook不要）。
- **サイズ**: etcdのリクエストサイズ上限がデフォルト1.5MiB（`--max-request-bytes`）なので、1オブジェクトはそれ以下に収める必要がある。エンコードやメタデータのオーバーヘッドもあるので、ギリギリを狙うのは危ない。大きなデータ・高頻度に書き換わるデータの置き場には向かない。
- **CRDを消すと中身も消える**: CRDを削除するとAPIエンドポイントが消え、そのCRDのカスタムオブジェクトも全部削除される。作り直しても空から。

## 変わった使い方の例: ピザを注文する

「宣言 → reconcile」の形に当てはまれば、クラスタ外の現実世界の状態も扱えることを示すネタ実装がいくつかある。いずれもDomino'sのAPIを叩いて本当に注文する。

- **rudoi/cruster-api** — kubebuilder製。`PizzaOrder` リソースを作るとコントローラが実際に発注し、`kubectl get pizzaorders` でPREP → BAKE → QUALITY CHECK → DELIVEREDの進捗を追える。誤発注防止の `placeOrder` フラグ、支払い情報はSecret参照。米国限定・ピザのみ。作者いわく実際の注文は1回。
- **cirocosta/pizza-controller** — `PizzaCustomer`（住所など）/ `PizzaStore`（店舗とメニュー）/ `PizzaOrder` の3種のCRD。`kubectl get pizzacustomer` で最寄り店舗、`kubectl get pizzastore store-123 -o yaml` でメニューが見られる。

```yaml
kind: PizzaOrder
apiVersion: ops.tips/v1
metadata:
  name: ma-pizza
spec:
  yeahSurePlaceThisOrder: true
  storeRef: {name: store-123}
  customerRef: {name: you}
  payment:
    creditCardSecretRef: {name: cc}
  items:
    - ticker: 10SCREEN
      quantity: 1
```

- **Crossplaneのprovider** — Crossplane公式ブログで、Provider作りの題材としてDomino's APIのproviderを作ってピザを注文している。Crossplaneがクラウドリソースを扱うのと全く同じ構造。

ほかにMinecraftサーバーを `MinecraftServer` リソースとして宣言するOperatorなどもある（こちらはPodを立てるので比較的まっとう）。

## 考えたこと

- ピザの例が面白いのは、reconcileモデルの汎用性を端的に示している点。「外部APIの向こうにある状態」を宣言的に管理するという意味では、[[cluster-api|Cluster API]]がクラスタそのものをリソース化しているのと同じ発想。
- 逆に言うと、CRDは「kubectlで扱えるスキーマ付きKVS」としても使えてしまうが、etcdのサイズ上限や書き込み負荷を考えると、汎用DB代わりにするものではない。
- CRDやOperatorを試すなら[[kind]]で使い捨てクラスタを立てるのが手軽。

## [[kubernetes-extension-terms]]の中での位置づけ

「型を追加する」部分だけを担う。単体ではデータ置き場で、動作はコントローラが担う。

## 出典

- [Extend the Kubernetes API with CustomResourceDefinitions | Kubernetes](https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definitions/)
- [Custom Resources | Kubernetes](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/)
- [Future of CRDs: Structural Schemas | Kubernetes](https://kubernetes.io/blog/2019/06/20/crd-structural-schema/)
- [System limits | etcd](https://etcd.io/docs/v3.3/dev-guide/limit/)
- [rudoi/cruster-api - GitHub](https://github.com/rudoi/cruster-api)
- [cirocosta/pizza-controller - GitHub](https://github.com/cirocosta/pizza-controller)
- [kubectl create pizza | ops.tips](https://ops.tips/notes/kubernetes-pizza/)
- [Providers 101: Ordering Pizza with Kubernetes and Crossplane](https://blog.crossplane.io/providers-101-ordering-pizza-with-kubernetes-and-crossplane/)
- [JamesLaverack/kubernetes-minecraft-operator - GitHub](https://github.com/JamesLaverack/kubernetes-minecraft-operator)
