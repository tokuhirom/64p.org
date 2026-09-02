---
created: 2026-08-19 19:11
updated: 2026-09-02 19:13
---
# Rego(ポリシー言語)

Open Policy Agent(OPA)向けに設計された宣言型のポリシー言語。JSON/YAMLなど構造化データに対する認可判定・設定検証・データフィルタリングのルールを記述する。[[cncf|CNCF]]プロジェクトであるOPA自体はGo実装で、アプリケーションからは構造化データ(入力)を渡してOPAに問い合わせ、Regoポリシーとの評価結果として決定を受け取る形で使う。ポリシーの意思決定ロジックをアプリケーションコードから分離できる点が主眼。

## Datalogを基盤とする設計

RegoはDatalog(Prologのサブセットで、データベースクエリエンジンに使われる問い合わせ言語)を基盤とし、JSONのような階層的なドキュメントモデルを扱えるよう拡張したもの。Datalogのセマンティクスにより評価は決定的で必ず停止する。宣言型言語なので、「どう計算するか」ではなく「クエリが何を返すべきか」を書く。

## 基本文法

```rego
package example

default allow := false

allow if {
    input.user == "alice"
    input.method == "GET"
}
```

- ルールは`package`という名前空間の中に定義する。
- `default allow := false`によりデフォルト拒否(未定義時はfalse)とするのが定番パターン。
- `import`で他パッケージのデータ・ルールを参照できる。
- 条件を満たさないルールは`false`ではなく**undefined**(未定義)になるという評価モデルを持つ。

## 用途の広さ

Kubernetes admission control、Terraformプラン検証、APIゲートウェイでの認可、インフラのコンプライアンスチェックなど、アプリケーション認可に留まらない汎用ポリシーエンジンとして使われる。ConftestはRego/OPAポリシーをOSSの設定ファイル(JSON/YAML/HCL等)に適用するCLIツール。

## [[cedar|Cedar]]との違い

[[cedar]]はアプリケーションの認可(principal/action/resource)に用途を絞ったRust実装の言語で、安全性・実行速度・形式検証性を重視する設計。対してRego/OPAは汎用性を優先しており、表現力は高いが実行時例外や非決定性のリスクも指摘されている。ベンチマークではCedarがRegoより高速という報告がある一方、OPAはCNCFプロジェクトとしてコミュニティ・実績の規模が大きい。

## 出典

- [Policy Language | Open Policy Agent](https://www.openpolicyagent.org/docs/policy-language)
- [Open Policy Agent (OPA) Rego Language Tutorial](https://spacelift.io/blog/open-policy-agent-rego)
- [Policy as Code: OPA's Rego vs. Cedar](https://www.permit.io/blog/opa-vs-cedar)
- [OPA vs Cedar vs Zanzibar: 2025 Policy Engine Guide](https://www.osohq.com/learn/opa-vs-cedar-vs-zanzibar)

#security
