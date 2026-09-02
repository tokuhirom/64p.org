---
created: 2026-09-02 19:13
updated: 2026-09-02 20:35
---
# CNCF

Cloud Native Computing Foundation。Linux Foundation傘下の非営利財団で、2015年に[[kubernetes|Kubernetes]] 1.0のリリースと同時に設立された。Kubernetesを「seed technology」としてGoogleが寄贈したのが出発点で、設立メンバーにはGoogle・[[coreos|CoreOS]]・Mesosphere・Red Hat・Twitter・Huawei・Intel・Cisco・IBM・Docker・VMwareなどが名を連ねる。

ミッションは「クラウドネイティブコンピューティングをユビキタスにすること」。特定ベンダーに依存しない中立的な場を用意して、そこにインフラの重要コンポーネントをホストする、というのが基本的な役割。

2026年時点で228プロジェクト、720のメンバー企業、32.9万人以上のコントリビューターを抱える。 #kubernetes #devops #cloud-native

## 「ベンダー中立の受け皿」という機能

CNCFの実質的な価値は、**単一企業が持っているOSSを、その企業が方針転換しても壊れない場所に移す**ことにある。[[etcd]]（CoreOS → Red Hat買収を経てCNCFへ移管）、[[opentofu|OpenTofu]]（[[terraform|Terraform]]のライセンス変更を受けたフォークの受け皿）、[[fluentd|Fluentd]]、[[prometheus|Prometheus]]（SoundCloud発）、[[backstage|Backstage]]（Spotify発）などは、いずれも「作った会社の外」に居場所を得た例。

ホストされるとCNCFのCLA・行動規範・ガバナンス要件が適用され、メンテナが複数組織にまたがることが求められる。ライセンス変更のような一社判断ができなくなる代わりに、採用する側は「この技術は突然梯子を外されないか」を判断しやすくなる。

## プロジェクトの成熟度レベル

CNCFプロジェクトは Sandbox / Incubating / Graduated の3段階を持つ。これは Crossing the Chasm でいう Innovators / Early Adopters / Early Majority に対応させて設計されている。

| レベル | 位置づけ | 目安 |
|---|---|---|
| **Sandbox** | 実験的・初期段階。失敗もありうるし破壊的変更も予想される | 2組織以上から計3人以上のメンテナ、Apache 2.0（または承認済みライセンス） |
| **Incubating** | 実験段階を脱し安定性を示し始めた段階。TOCが採用状況を積極的に評価し始める | 3社以上の独立した本番採用実績、健全なコミット流量とコミッター数 |
| **Graduated** | 高度に成熟し広く採用され、本番環境での実績が実証済み | 上記に加えセキュリティ監査、OpenSSF (旧CII) Best Practices Badge など |
| **Archived** | 非アクティブ、または使用が推奨されない | — |

昇格の実務としては、TOCスポンサーが決まってから最低3ヶ月の期間、5〜7名のインタビュー可能な採用者、2週間のパブリックコメント期間、そしてTOCの2/3スーパーマジョリティ投票が必要になる。

段階は「品質のランク」というより**賭けてよい度合いのランク**として読むのが実用的。Sandboxは「面白いが自分で面倒を見る覚悟が要る」、Graduatedは「本番で使っている会社が大量にいる」というシグナルになる。既存ノートで言えば[[cilium|Cilium]]（2023年Graduated）、[[etcd]]（2020年Graduated）、[[fluentd|Fluentd]]（2019年Graduated）、[[prometheus|Prometheus]]（2018年Graduated、Kubernetesに次ぐ2番目）が卒業組で、[[k0s]]や[[hyperlight|Hyperlight]]、[[holmesgpt|HolmesGPT]]（2025年採択）はSandbox、[[backstage|Backstage]]はIncubating。

## ガバナンス

- **Governing Board** — マーケティング、事業監督、予算
- **Technical Oversight Committee (TOC)** — 技術ビジョンの策定と技術的リーダーシップ。プロジェクトの受け入れ・昇格の投票主体
- **End User Technical Advisory Board** — エンドユーザー企業の声を代表する
- **TAG (Technical Advisory Group)** — Security、Observability、Network など領域別の専門家グループ。プロジェクトのレビューやガイダンス策定を担う
- **Ambassadors** — コミュニティでの普及活動

## Landscape

[CNCF Landscape](https://landscape.cncf.io/) は、クラウドネイティブ領域のプロダクトを機能カテゴリ別に一枚の図に並べた地図。CNCFホストプロジェクトだけでなく商用製品も載っており、企業はPull Requestで自社を追加できる。「この領域にどんな選択肢があるか」を俯瞰するのに使われる一方、その情報密度の高さ自体がクラウドネイティブ領域の選択肢の多さと認知負荷の象徴としてしばしば言及される。

## 認証プログラム

CNCFはプロジェクトのホスト以外に、製品・人材の認証も運営している。

- **Certified Kubernetes Conformance** — ベンダーの[[kubernetes|Kubernetes]]配布物が必要なAPIを備えているかを適合テストで検証する。90以上の認定オファリングがある。[[k3s]]や[[k0s]]が「CNCF認証済み」を掲げているのはこれ
- **Certified Kubernetes AI Conformance** — AIワークロード向けの新しい適合プログラム
- **KCSP / KCNTP** — サービスプロバイダ・トレーニングパートナーの認定
- 個人向け資格 — CKA / CKAD / CKS など

## KubeCon

CNCFの旗艦カンファレンス。第1回は2015年11月にサンフランシスコで開催され、その後CNCFへ寄贈された。ソフトウェアプロジェクトではなく「コミュニティカンファレンス」が財団に寄贈されたという点で珍しい経緯を持つ。現在は北米・欧州・中国・日本などで年に複数回開催される。

## 出典

- [Who We Are - CNCF](https://www.cncf.io/about/who-we-are/)
- [Cloud Native Computing Foundation - Wikipedia](https://en.wikipedia.org/wiki/Cloud_Native_Computing_Foundation)
- [Project Lifecycle and Process - CNCF Contributors](https://contribute.cncf.io/projects/lifecycle/)
- [cncf/toc - GitHub](https://github.com/cncf/toc/blob/main/process/README.md)
- [Certified Kubernetes Software Conformance - CNCF](https://www.cncf.io/training/certification/software-conformance/)
- [Why CNCF TAGs are the core of cloud native innovation - CNCF](https://www.cncf.io/blog/2025/11/04/why-cncf-tags-are-the-core-of-cloud-native-innovation-and-where-to-find-them-at-kubecon-atlanta/)
