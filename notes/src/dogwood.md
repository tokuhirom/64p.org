---
created: 2026-08-19 19:09
updated: 2026-08-19 19:09
---
# Dogwood(ポリシー言語)

AWSが2026年8月にオープンソース公開した、[[cedar|Cedar]]を拡張する時制(temporal)ポリシー言語。AIエージェントによる一連のツール呼び出し(シーケンス)を、過去のイベント履歴を踏まえて認可判定できるようにする。Amazon Bedrock AgentCoreに統合されている。

## Cedarとの関係

構文的に有効なCedarポリシーはそのままDogwoodポリシーとしても有効という、完全な後方互換性を持つ。Cedarが「今のリクエスト単体」を評価する[[cedar|point-in-time認可]]に特化しているのに対し、Dogwoodはアクションの連鎖を評価する「sequence認可」を追加する。理論的基盤はMetric First-Order Temporal Logic (MFOTL)という時相論理。

## temporal構文

- `formerly within <期間> <Action>::<request|response>{ ... }` — 指定期間内に該当イベントが過去に発生したか
- `count_within(<期間>, ...)` — 期間内のイベント発生回数
- `count_distinct_within(var, <期間>, ...)` — 期間内の異なる値の個数(多様性制限)
- `sum_within(var, <期間>, ...)` — 期間内の値の合計(累積額制限など)

通常の`when { ... }`条件と`when temporal { ... }`条件は`&&`で併用できる。

例(承認後のみ売却を許可):

```
permit ( principal, action == AgentCore::Action::"SellShares", resource )
when temporal {
    formerly within 1h AgentCore::Action::"ApproveSale"::response{
        input.stock: context.input.stock,
        input.shares: context.input.shares,
        output.approved: true
    }
};
```

## 想定ユースケース

- 承認後のみ実行を許可する依存関係
- 時間窓内の操作回数制限(レート制限)
- 送金先の多様性制限(同時間内に異なる受取人への送金は最大N件、など)
- 累積額の急増防止(スパイク検知)
- 機密情報アクセス後の外部通信禁止のような順序制約

## 設計上の注意点

並行・非同期のツール呼び出しによる制限回避を防ぐため、レート制限は`response`イベントではなく`request`イベント基準で書くべきとされている。`response`基準だと、応答が返る前に複数リクエストを同時発行することで制限を回避されうる。

## 現状

リファレンス実装(Rust製のライブラリ・CLI)として`dogwood-policy`組織がGitHubで公開しているが、タイムスタンプの真正性・イベント認証・トレース管理などのセキュリティ面が未整備なため、本番利用は非推奨とされている。ライセンスはApache 2.0。今後は絶対時間窓への対応、liveness検証(「〜すべき」の表現)、マルチエージェント間の協調ルール表現が計画されている。

[[ai-agent-api-authorization-governance|AIエージェント時代のAPI認可ガバナンス]]で論じられる「実行時の強制力を持つ対策」の一つの実装として位置づけられる。

## 出典

- [Introducing Dogwood: runtime verification for AI agents | AWS Open Source Blog](https://aws.amazon.com/blogs/opensource/introducing-dogwood-runtime-verification-for-ai-agents/)
- [GitHub - dogwood-policy/dogwood](https://github.com/dogwood-policy/dogwood)
- [AWS Open-Sources Dogwood, Extending Cedar to Govern Sequences of Agent Tool Calls - InfoQ](https://www.infoq.com/news/2026/08/aws-dogwood-agent-policy/)
- [Control agent behaviors and cost beyond a single action | AWS ML Blog](https://aws.amazon.com/blogs/machine-learning/control-agent-behaviors-and-cost-beyond-a-single-action-new-capabilities-in-amazon-bedrock-agentcore/)
- [dogwood/cedar agent policyについてのまとめ - Zenn](https://zenn.dev/exwzd/articles/20260813-dogwood-agent-policy)

#security #aws #ai
