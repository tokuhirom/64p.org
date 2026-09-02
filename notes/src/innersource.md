---
created: 2026-09-02 20:17
updated: 2026-09-02 20:17
---
# InnerSource

オープンソースの開発手法・文化を、組織の内側（社内・グループ企業内）に閉じた形で適用する実践。コード自体はプロプライエタリのままだが、開発の進め方だけをOSS流にする。

#software-engineering #devops

## 用語の由来

Tim O'Reillyが2000年に "the use of open source development techniques within the corporation" として使ったのが最初とされる。

概念として広まり始めたのは2015年で、PayPalのオープンソースプログラムを率いていたDanese Cooperが強く提唱した。彼女は「PayPalがOSSエコシステムにうまく参加するには、その前に社内でオープンな協業を学ぶ必要がある」と気づき、その文脈でInnerSourceを推進した。同年にコミュニティ **InnerSource Commons (ISC)** が設立され、2020年に非営利法人として法人化されている。

## 中核となる3つのプラクティス

1. **オープンな協業** — 開発成果物（コード・設計・議論）を社内の全従業員がアクセスできる状態に置き、組織境界を越えて意欲のある人が貢献できるようにする。
2. **オープンなコミュニケーション** — 議論を公開・文書化・アーカイブし、非同期に行う。結果として議事録を書かなくてもドキュメントが残る（passive documentation）。
3. **品質保証** — contributor（貢献者）と committer（マージ権限者）を分離し、コードレビューを必ず挟む。

3つ目の「contributorとcommitterの分離」がポイントで、社内だからといって誰でも直接pushできるようにするのではなく、OSSと同じくPull Requestとレビューを経由させる。

## 解こうとしている問題

典型的には次のような状況。

- チームAが必要な機能が、チームBの持つコンポーネントの中にある
- チームBはその機能を作る余裕も動機もない（自分たちのロードマップが優先）
- 結果、チームAはフォークするか、車輪の再発明をするか、政治的にエスカレーションするしかない

InnerSourceは、ここで「チームAがチームBのリポジトリにPRを送る」という第4の選択肢を成立させるための仕組みづくりだと言える。逆に言うと、技術的な話はほとんどなく、**組織の力学とインセンティブ設計の問題**を扱っている。

## 効果とされているもの

市場投入までの時間短縮、コスト削減、コード品質の向上、知識共有の促進、従業員のモチベーション向上、部門サイロを越えた協業の促進など。採用企業としてはGoogle・Microsoft・IBM・SAP・PayPal・Walmartなどが挙げられる。

## 成立条件

うまくいく前提条件として整理されているもの。

- **プロダクト面** — モジュール化されていること、ステークホルダーが複数いること
- **プロセス面** — バザール型の開発、ツールの標準化
- **組織面** — 経営層の支持、透明性、マネジメント側の動機づけ

「ステークホルダーが複数いる」が特に重要で、1チームしか使わないコンポーネントをInnerSource化しても意味がない。

## [[platform-engineering|Platform Engineering]]との関係

方向性が対照的で、対比すると分かりやすい。

- **Platform Engineering** — 運用の専門性をプラットフォームチームに集約し、開発者からは抽象化して隠す（[[golden-path|Golden Path]]を敷く）
- **InnerSource** — 逆に境界を開き、利用者側が提供者側のコードに手を入れられるようにする

排他的ではなく、実際には併用される。プラットフォームチームがボトルネックになったとき、[[backstage|Backstage]]のプラグインやGolden Pathのテンプレートをプロダクトチーム側からPRで改善してもらう、という形でInnerSourceが効いてくる。ISCの[[innersource-patterns|パターン集]]にも、社内プロジェクトを発見可能にする "InnerSource Portal" という[[developer-portal|開発者ポータル]]そのもののパターンが含まれている。

## 書籍

InnerSource Commonsが無料で公開しているもの。

- **Getting Started with InnerSource** (Andy Oram) — 入門。PayPalの事例
- **Adopting InnerSource** (Danese Cooper, Klaas-Jan Stol / Tim O'Reilly序文) — 複数社のケーススタディ。失敗談も含む
- **Understanding the InnerSource Checklist** (Silona Bonewald) — 導入手順のチェックリスト
- **Managing InnerSource Projects** (Daniel Izquierdo, José Manrique López) — インフラ整備とメトリクス
- **InnerSource Patterns** — → [[innersource-patterns]]

## 出典

- [Inner source - Wikipedia (English)](https://en.wikipedia.org/wiki/Inner_source)
- [InnerSource Commons](https://innersourcecommons.org/)
- [Books - InnerSource Commons](https://innersourcecommons.org/learn/books/)
- [Adopting InnerSource (PDF)](https://paypal.github.io/InnerSourceCommons/assets/files/AdoptingInnerSource.pdf)
- [The Rise of InnerSource - Bosch Open Source](https://opensource.bosch.com/stories/the-rise-of-innersource/)
