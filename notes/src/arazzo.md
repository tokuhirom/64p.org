---
created: 2026-08-15 16:32
updated: 2026-08-15 16:32
---
# Arazzo Specification

[[openapi|OpenAPI Initiative]](Linux Foundation傘下)がコミュニティ主導で策定する、複数のAPI呼び出しの並び順と依存関係を「ワークフロー」として記述するための、プログラミング言語非依存の仕様。最新バージョンはArazzo Specification 1.0.0。

## 何を解決するか

OpenAPI(やAsyncAPI)は個々のエンドポイントの入出力は定義できるが、「あるAPIの呼び出し結果を別のAPIの入力として使う」といった複数API呼び出しをまたぐ順序・依存関係までは表現できない。Arazzoはこのギャップを埋める、OpenAPIを補完するレイヤー。

## ドキュメント構造

トップレベルのArazzoオブジェクトが以下を宣言する。

- バージョン・メタデータ
- 参照元となる[[openapi|OpenAPI]](やAsyncAPI)の記述ファイルのリスト
- 1つ以上の`workflow`(ワークフロー)。各ワークフローは入力(inputs)・順序付きのステップ(steps)・成功条件・後続ステップが参照できる出力(outputs)を持つ
- 再利用可能なコンポーネント

## 記述例

公式リポジトリのサンプル([petstoreのクーポン適用ワークフロー](https://github.com/OAI/Arazzo-Specification/blob/main/examples/1.0.0/pet-coupons.arazzo.yaml))から一部抜粋。「ペットを検索する」→「そのペット向けのクーポンを検索する」→「クーポンを適用して注文する」という3ステップのワークフローを表現している。

```yaml
arazzo: 1.0.0
info:
  title: Petstore - Apply Coupons
  version: 1.0.0
sourceDescriptions:
  - name: pet-coupons
    url: ./pet-coupons.openapi.yaml
    type: openapi
workflows:
  - workflowId: apply-coupon
    summary: Apply a coupon to a pet order.
    steps:
      - stepId: find-pet
        description: Find a pet based on the provided tags.
        operationId: findPetsByTags
        parameters:
          - name: pet_tags
            in: query
            value: $inputs.my_pet_tags
        successCriteria:
          - condition: $statusCode == 200
        outputs:
          my_pet_id: $response.body#/0/id
      - stepId: find-coupons
        description: Find a coupon available for the selected pet.
        operationId: getPetCoupons
        parameters:
          - name: pet_id
            in: path
            value: $steps.find-pet.outputs.my_pet_id
        successCriteria:
          - condition: $statusCode == 200
        outputs:
          my_coupon_code: $response.body#/couponCode
      - stepId: place-order
        description: Place an order for the pet, applying the coupon.
        workflowId: place-order
        parameters:
          - name: pet_id
            value: $steps.find-pet.outputs.my_pet_id
          - name: coupon_code
            value: $steps.find-coupons.outputs.my_coupon_code
        outputs:
          my_order_id: $outputs.workflow_order_id
    outputs:
      apply_coupon_pet_order_id: $steps.place-order.outputs.my_order_id
```

ポイント:

- `sourceDescriptions`で、このワークフローが参照する既存のOpenAPI定義ファイル(`pet-coupons.openapi.yaml`)を紐付ける。ステップ内の`operationId`はそのOpenAPI定義の`operationId`を指す
- 各ステップは`stepId`で識別され、デフォルトでは配列の順番通りに逐次実行される
- `$inputs.xxx`・`$steps.<stepId>.outputs.xxx`・`$response.body#/...`のようなランタイム式(runtime expression)で、ワークフロー入力・前ステップの出力・レスポンスボディの値を後続ステップの`parameters`に渡せる
- `successCriteria`でステップの成功条件(例: `$statusCode == 200`)を明示できる
- 3つ目のステップ`place-order`は`operationId`の代わりに`workflowId: place-order`を指定しており、単一APIオペレーションではなく**別のワークフローを呼び出す**ことでステップの再利用を実現している(この例では同一ファイル内の`place-order`ワークフローを参照)

## ユースケース

- 対話的な「生きた」APIドキュメント、ドキュメント自動生成
- 機能的なユースケースに基づいたSDK・コード生成
- テストケースの自動化、規制コンプライアンスチェックの自動化
- LLM(AIエージェント)によるAPIの決定論的な呼び出し

## [[spectral|Spectral]]でのサポート

[[spectral|Spectral]]は`spectral:arazzo`という組み込みルールセットでArazzo v1.0のlintに対応している。

#openapi #api

## 出典

- [Arazzo Specification – OpenAPI Initiative](https://www.openapis.org/arazzo-specification)
- [The Arazzo Specification – A Deep Dive - Swagger Blog](https://swagger.io/blog/the-arazzo-specification-a-deep-dive/)
- [Arazzo Specification (GitHub: OAI/Arazzo-Specification)](https://github.com/OAI/Arazzo-Specification)
- [pet-coupons.arazzo.yaml (公式サンプル)](https://github.com/OAI/Arazzo-Specification/blob/main/examples/1.0.0/pet-coupons.arazzo.yaml)
