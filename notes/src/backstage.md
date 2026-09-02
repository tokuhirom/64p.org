---
created: 2026-09-02 19:10
updated: 2026-09-02 19:10
---
# Backstage

Spotifyが自社の開発者体験改善のために作り、2020年3月にOSSとして公開した「開発者ポータルを作るためのフレームワーク」。同年9月にCNCFへ寄贈され、2022年3月にSandboxからIncubatingへ昇格した。2026年時点でもIncubatingのままだが、Graduated入りに必要なセキュリティ監査が進行中。3,400社以上で使われている。

「完成した製品」ではなく**フレームワーク**である点が重要で、素のBackstageはReact + Node.jsのTypeScriptモノレポとして手元に生成され、そこにプラグインを足して自組織向けのポータルに仕立てていく。この「自分でビルドして運用する」コストの高さが、後述の商用ディストリビューションが多数存在する理由になっている。

#platform-engineering #devops

## 中核となる4機能

### Software Catalog

マイクロサービス・ライブラリ・データパイプライン・Webサイト・MLモデルなど、組織内のあらゆるソフトウェアを一元管理する。中核は各リポジトリに置く `catalog-info.yaml`（descriptor file）で、メタデータをコードと同じGitワークフローで保守し、マージされるとカタログが自動更新される。

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: my-service
  description: 注文処理サービス
spec:
  type: service
  lifecycle: production
  owner: team-orders
  system: ordering
```

エンティティの種類は `Component` / `API` / `Resource` / `System` / `Domain` / `Group` / `User` など。`System`・`Domain` で束ね、`Group`/`User` でオーナーシップを表現するので、「このサービスは誰のものか」「このAPIは何に依存しているか」が引ける。

descriptor fileはリポジトリルートに置くのが慣例だが必須ではない。登録は `/create` からの手動登録、ソフトウェアテンプレート経由の自動登録、静的設定の `catalog.locations` によるURL指定、外部システムとの連携（GitHub組織を丸ごとdiscoverするなど）から選べる。

### Software Templates（Scaffolder）

「新しいサービスを作る」を数クリックで完了させる仕組み。リポジトリ作成・CI設定・カタログ登録・初期コードまでをテンプレート化するので、[[platform-engineering|Golden Path]]を具体的な形にする道具になる。組織のベストプラクティスを「ドキュメントで啓蒙する」のではなく「デフォルトで通る道」に埋め込める。

### TechDocs

docs-as-codeアプローチのドキュメント機能。Markdownをリポジトリに置いておくとMkDocsでビルドされ、ポータル上でカタログのエンティティに紐づいて表示・検索できる。設計書やAPI仕様書がWikiとリポジトリに散らばる問題への回答。

### Search

カタログ・TechDocs・その他プラグインが提供するインデックスを横断検索する。

## プラグインエコシステム

[[kubernetes]]、GitHub、Argo CD、PagerDuty、Jenkins、SonarQubeなど、モダンなDevOpsツール連携のプラグインが150以上ある。フロントエンドプラグインとバックエンドプラグインに分かれており、自組織固有のツールに対しては自前でプラグインを書く。

## 商用ディストリビューション

素のBackstageを自前で運用し続けるのは相応の負担があるため、マネージド提供・エンタープライズ版が複数存在する。

- **Spotify Portal for Backstage** — 本家Spotifyによるマネージド版
- **Red Hat Developer Hub (RHDH)** — Red Hatのエンタープライズ向けディストリビューション。OpenShift Platform Plusに同梱、または単体
- **Roadie** — SaaS型。プラグインのキュレーション、セキュリティパッチ、サービス成熟度スコアカードなど
- **[[platt|PlaTT]]** — 日本のエーピーコミュニケーションズによるマネージドサービス

## [[platform-engineering|Platform Engineering]]の中での位置づけ

Platform Engineeringが掲げるInternal Developer Platform (IDP)のうち、Backstageが担うのは主に**ポータル層**（Internal Developer Portal）。実際に環境をプロビジョニングするのは[[terraform]]や[[kubernetes]]などの下回りで、Backstageはそれらへの入口とカタログ・ドキュメントを一枚のUIに束ねる役割を持つ。開発者の認知負荷を下げるというPlatform Engineeringの目的に対して、「散らばった情報とツールを一箇所に集める」側から攻めるアプローチと言える。

## 出典

- [What is Backstage? - backstage.io](https://backstage.io/docs/overview/what-is-backstage/)
- [Software Catalog - backstage.io](https://backstage.io/docs/features/software-catalog/)
- [backstage/backstage - GitHub](https://github.com/backstage/backstage)
- [Five Years In, Backstage Is Just Getting Started - The New Stack](https://thenewstack.io/five-years-in-backstage-is-just-getting-started/)
- [CNCF Backstage Documentary Highlights Project Evolution - CNCF](https://www.cncf.io/announcements/2026/03/25/cncf-backstage-documentary-highlights-project-evolution-from-development-to-global-open-source-standard-for-platform-engineering/)
- [Red Hat Readies Developer Hub, a Backstage Enterprise Distribution - The New Stack](https://thenewstack.io/red-hat-readies-developer-hub-a-backstage-enterprise-distribution/)
