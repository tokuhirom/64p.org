---
created: 2026-08-10 23:33
updated: 2026-08-10 23:33
---
# Apache Druid

リアルタイム分散分析用のデータベース。大規模なストリーミングデータの取り込みと、低レイテンシなOLAPクエリ・インタラクティブ分析を実現することに特化している。 #database #olap

## 開発の経緯

2011年から開発が始まり、現在はApache Software Foundationのライセンス下でオープンソースとして開発が続いている(Apacheトップレベルプロジェクト)。

## 特徴

- 列指向(カラムナー)のデータストアで、必要な列だけを高速に検索できる
- 分散型アーキテクチャで、1秒未満のクエリ応答時間を実現
- 1日に数兆件規模のイベント処理が可能なスケーラビリティ
- データの自動集計、ペタバイト級データへの対応、高可用性
- ダウンタイムなしの継続運用やデータレプリケーションを前提とした設計

## アーキテクチャ(3層構成)

- **データノード層**: Middle Manager/IndexerがKafkaなどからデータを取り込み、処理後に「セグメント」としてディープストレージ(S3・GCSなど)に保存。Historicalノードがディープストレージからセグメントを自ノードのディスクに展開して保持する
- **クエリノード層**: RouterとBrokerがクエリを受け付け、各ノードの結果をマージして返却する
- **管理層**: CoordinatorとZooKeeperがメタデータやタスクの管理を担う

## ユースケース

Webやモバイルの行動分析、不正検知、ネットワークパフォーマンス監視、サーバーメトリクス監視、ビジネスインテリジェンス/OLAPなど、大量のイベントデータをリアルタイムに解析する用途に向いている。

## 開発状況(2026年8月時点)

活発に開発が続いている。v37.0.0が2026年5月8日にリリースされ、29人のコントリビューターによる255件以上の新機能・バグ修正・パフォーマンス改善が含まれた。直前のv36.0.0は2026年2月9日リリースで、数ヶ月おきのペースでメジャーバージョンがリリースされ続けている。

## 出典

- [Druidとは？機能や特徴・製品の概要まとめ - Findy Tools](https://findy-tools.io/products/druid/597)
- [大規模データ分析DB Druid | Kenta Kozuka](https://kentakozuka.com/post/%E5%A4%A7%E8%A6%8F%E6%A8%A1%E3%83%87%E3%83%BC%E3%82%BF%E5%88%86%E6%9E%90db-druid/)
- [爆速データウェアハウスなApache Druidを試す](https://ex-ture.com/blog/2020/02/19/lets-try-apache-druid/)
- [Download | Apache® Druid](https://druid.apache.org/downloads/)
- [Releases · apache/druid - GitHub](https://github.com/apache/druid/releases)
