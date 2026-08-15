---
created: 2026-08-15 22:07
updated: 2026-08-15 22:07
---
# CockroachDB

水平スケール可能な分散SQLデータベース。Googleの分散データベースSpannerにインスパイアされて設計されている。 #distributed-systems #database

## 開発元と成り立ち

開発元のCockroach Labsは2015年、元Google社員のSpencer Kimball、Peter Mattis、Ben Darnellによって設立された。KimballとMattisはGoogle File Systemチーム、DarnellはGoogle Readerチームの出身で、在職中にBigtableやSpannerに触れた経験から「Google社外の企業向けにSpannerのようなものを作る」という着想を得たという。Google Ventures含む複数の投資家から資金調達し、2016年にオープンソースとして公開された。

## アーキテクチャ

SQLレイヤーの下に、ソート済み分散キーバリューストア（内部ストレージエンジンはPebble）を持つレイヤードアーキテクチャになっている。

- データは64MiB単位の「レンジ（Range）」に分割される。閾値を超えると自動的に2つに分割され、この処理が継続的に繰り返される
- 各レンジは複数ノードにレプリケートされ、[[raft|Raft]]合意アルゴリズムで一貫性を担保する。大量のレンジを効率的に扱うため、Raftを拡張した「MultiRaft」という仕組みを採用している
- [[mvcc|MVCC]]（マルチバージョン同時実行制御）と、クロック同期に完全には依存しないグローバルな順序付けのためのHybrid Logical Clocksを使用する
- シャーディング、データリバランス、レプリケーション、障害復旧を自動化しており、ディスク・マシン・ラック・データセンター単位の障害からも手動介入なしで復旧できる

## ライセンスの変遷

1. 〜2019年: Apache License 2.0（完全オープンソース）
2. 2019年（v19.2）〜2024年: [[business-source-license|Business Source License]]の「permissive版」に移行。他社が「Database Service」としてホスティング提供することのみ制限し、それ以外の利用（自社利用、組み込み等）は自由。BSLは各バージョンごとに一定期間（Change Date、当初3年）後にApache 2.0へ自動移行する設計だった
3. 2024年8月発表、同年11月（v24.3）〜: 完全にプロプライエタリ化。自社製の「Cockroach Community License (CCL)」に一本化し、無料の「Core」提供を終了。個人開発者・学生・研究者・年商1000万ドル未満の企業は引き続き無料利用可だが、それ以外は有償ライセンスが必要になった
4. この変更を受け、Oxide Computer Companyが旧BSL版（オープンソースとして利用可能な最終版）をフォークして独自にメンテナンスする方針を表明した

## 出典

- [Architecture Overview - CockroachDB](https://www.cockroachlabs.com/docs/v26.2/architecture/overview)
- [CockroachDB: An Enterprise Architecture Overview](https://www.cockroachlabs.com/blog/cockroachdb-enterprise-architecture/)
- [CockroachDB: A Deep Dive into a Distributed SQL Database That Never Goes Down](https://codestax.medium.com/cockroachdb-a-deep-dive-into-a-distributed-sql-database-that-never-goes-down-e30a51c9b9c1)
- [Google Funded the Democratization of Its Own Technology: The Origin Story of CockroachDB](https://www.stacksync.com/blog/google-funded-the-democratization-of-its-own-technology-the-origin-story-of-cockroachdb)
- [Report: Cockroach Labs Business Breakdown & Founding Story](https://research.contrary.com/company/cockroach-labs)
- [Cockroach Labs Adopts Permissive Version of Business Source License](https://www.opensourceforu.com/2019/06/cockroach-labs-changes-its-licensing-strategy-adopts-permissive-version-of-business-source-license/)
- [Why we're relicensing CockroachDB](https://changelog.com/news/why-were-relicensing-cockroachdb-EOaR)
- [Cockroach Labs Shifts from Open Core to Single Enterprise Model](https://www.bigdatawire.com/2024/08/19/cockroach-labs-shifts-from-open-core-to-single-enterprise-model/)
- [508 - Whither CockroachDB? / RFD / Oxide](https://rfd.shared.oxide.computer/rfd/0508)
- [After Cockroach Labs went proprietary, one customer took matters into its own hands](https://www.runtime.news/after-cockroach-labs-went-proprietary-one-customer-took-matters-into-its-own-hands/)
