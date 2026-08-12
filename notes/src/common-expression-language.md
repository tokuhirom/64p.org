---
created: 2026-08-12 09:46
updated: 2026-08-12 13:38
---
# CEL (Common Expression Language)

#dsl #kubernetes #google #security

Google が作ったオープンソースの式評価言語。チューリング完全ではない小さな式言語で、データのバリデーションやポリシー・制約の記述に使われる。`resource.name.startsWith("projects/") && request.time < timestamp("2027-01-01T00:00:00Z")` のような、C系の見慣れた文法の1行の式を安全に評価する用途に特化している。

## 設計上の特徴

- **非チューリング完全**: ループや再帰がなく、必ず停止する。ユーザー入力の式をサーバー内で直接評価しても安全。
- **高速・予測可能**: ナノ秒〜マイクロ秒オーダーでの評価を想定した設計で、実行コストが予測可能。
- **事前パースと型チェック**: 式を事前にパース・型検査してから繰り返し評価できる。
- 実装は cel-go / cel-cpp / cel-java など。

## 主な採用例

- **Kubernetes**: v1.25 から導入され、CRDのバリデーションルール（v1.29でGA）や ValidatingAdmissionPolicy の記述に使われる。webhookを立てずに kube-apiserver 内で直接バリデーションを実行できるのが利点。
- **Google Cloud**: IAM Conditions などポリシー条件の記述。
- **Envoy**: [[rbac|RBAC]]ポリシーの条件式。
- **[[betterleaks]]**: シークレットスキャンのルール定義内で、検出したシークレットの検証ロジックを記述するのに使われている。

## 出典

- [cel.dev - Common Expression Language](https://cel.dev/)
- [Kubernetes CRD Validation Using CEL | Google Open Source Blog](https://opensource.googleblog.com/2023/11/kubernetes-crd-validation-using-cel.html)
- [Common Expressions For Portable Policy and Beyond | Google Open Source Blog](https://opensource.googleblog.com/2024/06/common-expressions-for-portable-policy.html)
- [Common Expression Language in Kubernetes](https://kubernetes.io/docs/reference/using-api/cel/)
