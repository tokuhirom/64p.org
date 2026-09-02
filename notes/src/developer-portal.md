---
created: 2026-09-02 19:50
updated: 2026-09-02 19:54
---
# 開発者ポータル (Internal Developer Portal)

開発者が[[platform-engineering|Internal Developer Platform]]の機能を発見し、アクセスするためのインターフェース層。Gartnerの定義は「Internal developer portals serve as the interface through which developers can discover and access internal developer platform capabilities」。

#platform-engineering #devops #ai-agent

## Platform と Portal の混同問題

紛らわしいことに **Internal Developer Portal** と **Internal Developer Platform** はどちらも "IDP" と略される。多くの組織が両者を取り違え、「ポータルを買った／作った」ことを「プラットフォームを実装した」と勘違いする、という指摘がある。

区別としては、

- **Platform（プラットフォーム）** — 実際にインフラをプロビジョニングし、トイルを取り除く実体。オーケストレータやプロビジョニングエンジンを含む。**既製品として買えるものではなく、組み立てるもの**
- **Portal（ポータル）** — そのプラットフォームへの入口のひとつ。サービスカタログとUIを提供する。**既製品が存在する**（[[backstage|Backstage]]、Port、Cortex、Roadie、Red Hat Developer Hub など）

ポータル単体では、下にPlatform Orchestratorのような実行層がないと機能はかなり限定される。2026年時点の構成としては「実インフラを作るプロビジョニング／オーケストレーション層」と「それをカタログ化し統治するポータル層」の2層に分けて考えるのが一般的。

## エージェント時代の転換

2026年に入って、ポータルの設計前提そのものが揺れている。BackstageConでのRoadieのSam Nixonの発表によれば、同社のプラットフォーム上で**エージェントの操作と人間の操作の比率が100:1に達した**。人間の利用は横ばいのまま、エージェント側の活動が急増しているという。同社ではサポート要求とオンコールアラートの約80%を、エンジニアの介在なしにエージェンティックワークフローで解決できているとされる（Roadie1社の自社プラットフォーム上の数字であり、業界全体の統計ではない点は割り引く必要がある）。

この主張が正しいとすると、帰結は**UIがポータルの最重要部分ではなくなる**ということになる。100回のエージェント呼び出しに対して人間がテーブルを1回眺めるという比率なら、優先すべきは機械可読なデータの方になる。

同発表が「AIソフトウェアカタログ」に必要だとする条件は3つ。

1. **鮮度の高いメタデータグラフ** — 手動更新のYAMLではなく、プロバイダとプロセッサによる動的取得。GitHub・AWS・Kubernetes・Datadog・PagerDutyなどから自動で引く
2. **リレーション** — S3バケットとReactコンポーネントのような、資産どうしの接続が張られていること
3. **機械向けの配信形式** — [[mcp|MCP]]・CLI・API・ベクトルデータベース経由

[[backstage|Backstage]]本体も MCP Actions Backend を持つようになっており、Actions Registryに登録されたアクションを `catalog:create-component` のような名前空間付きのMCPツールとして公開できる。認証は静的トークン（外部アクセス向けの暫定手段）か、CIMD (Client ID Metadata Documents) によるOAuthが推奨で、Dynamic Client Registrationはdeprecated。ポータルのPermissionシステムがそのままエージェントのツール呼び出しの権限境界になる、という設計になっている。

## 考えたこと

エージェント時代の議論で面白いのは、[[backstage|Backstage]]の一番コストが高い部分（ReactフロントエンドとプラグインごとのカスタムUI）が、ちょうどエージェントには要らない部分だという点。「カタログをMCPで引ければいい」だけなら、必要なのはスキーマとデータストアと数本のツール定義になる。

同時に、条件1の「手書きYAMLではなく動的取得」は、これまでポータルが抱えていたカタログ腐敗（`catalog-info.yaml` が現実とずれていく）への回答でもある。つまりポータルの価値の重心が、**表示するUIから、鮮度を保つデータパイプラインへ**移りつつある、と読める。表示層が主戦場でなくなるなら、重量級のフロントエンドフレームワークを抱える理由は相対的に薄くなる。

## 出典

- [Internal developer platform vs internal developer portal vs PaaS - CNCF](https://www.cncf.io/blog/2023/12/08/internal-developer-platform-vs-internal-developer-portal-vs-paas/)
- [Internal Developer Platform vs. Internal Developer Portal: What's Up? - The New Stack](https://thenewstack.io/internal-developer-platform-vs-internal-developer-portal-whats-up/)
- [Internal Developer Portals - Humanitec](https://humanitec.com/internal-developer-portal)
- [MCP Actions Backend - backstage.io](https://backstage.io/docs/ai/mcp-actions/)
- [Agentic Backstage: How To Manage an AI Software Catalog - Sam Nixon, Roadie](https://tldrecap.fyi/posts/2026/backstagecon-europe/backstage-agentic-future/)
- [Agentic Backstage - YouTube (BackstageCon)](https://www.youtube.com/watch?v=8FXaQiiE9bg)
