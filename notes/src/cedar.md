---
created: 2026-08-19 19:09
updated: 2026-08-19 19:11
---
# Cedar(ポリシー言語)

AWSが開発したオープンソースの認可ポリシー言語。Amazon Verified Permissionsの基盤になっており、「principal(誰が)・action(何を)・resource(何に対して)」の組(PARXモデル: principal, action, resource, contextの略)に対して`permit`/`forbid`ルールを書き、各リクエストを1件ずつステートレスに評価する。

## 特徴

- **secure-by-default**: 明示的な`permit`ポリシーがなければ暗黙的に拒否される。
- RBAC・ABAC・ReBACのいずれのパターンも表現できる表現力を持つ。
- ポリシーは形式検証(analyzable)可能で、必ず停止し副作用を持たない設計。
- 実行時性能を重視しており、リアルタイム認可判定を想定した設計。

## ポリシー例のイメージ

```
permit (
    principal,
    action == Action::"Read",
    resource
) when {
    principal.department == resource.owner.department
};
```

## point-in-time認可という制約

Cedarは「今のリクエスト単体」を評価する設計であり、過去のイベント履歴を踏まえた判定(例: 「直前に承認イベントがあったか」「直近1時間の呼び出し回数」)はスコープ外。この制約を補うため、Cedarを拡張してイベント履歴に基づく時制条件を扱えるようにしたのが[[dogwood|Dogwood]]。

## Open Policy Agent(OPA)/Regoとの違い

Conftestが使うOPA/[[rego|Rego]]とは別系統・無関係のプロジェクト。OPAはCNCFプロジェクトでGo実装、RegoはKubernetes admission control・Terraformプラン検証・インフラのコンプライアンスチェックまで幅広く使える汎用ポリシー言語。対してCedarはRust実装で、アプリケーションの認可(principal/action/resource)に用途を絞り、安全性(必ず停止・副作用なし)と実行速度、形式検証性を重視した設計になっている。ベンチマークではCedarがRegoの42〜60倍高速という報告もある。

## 出典

- [What is Cedar? | Cedar Policy Language Reference Guide](https://docs.cedarpolicy.com/)
- [Amazon Verified Permissions and Cedar policy language terms and concepts](https://docs.aws.amazon.com/verifiedpermissions/latest/userguide/terminology.html)
- [Policy as Code: OPA's Rego vs. Cedar](https://www.permit.io/blog/opa-vs-cedar)
- [OPA vs Cedar vs Zanzibar: 2025 Policy Engine Guide](https://www.osohq.com/learn/opa-vs-cedar-vs-zanzibar)

#security #aws
