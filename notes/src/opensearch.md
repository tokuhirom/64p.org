---
created: 2026-08-14 11:32
updated: 2026-08-14 11:32
---
# OpenSearch

#search #database #lucene #aws

[[elasticsearch|Elasticsearch]]/KibanaがSSPL/Elastic Licenseへ移行したことを受けて、AWSが2021年にApache 2.0ライセンスのままフォークした検索・分析エンジン。Elasticsearchと同じくApache Luceneをベースとする。

## ガバナンス

2024年9月、AWSはOpenSearchをLinux Foundation傘下に設立された「OpenSearch Software Foundation」へ移管した。SAP・Uberがpremier memberとして参加するなど、単一ベンダー主導からベンダーニュートラルな体制への転換が図られている。

## Elasticsearchとの技術的な違い

- セキュリティ: OpenSearchはRBAC・フィールドレベルセキュリティ・監査ログ・保存時暗号化などを標準で無償提供する。Elasticsearchはこれらの多くを有償のPlatinum階層に置いている。
- ベクトル検索: OpenSearchはFaissをサポートし最大16,000次元まで扱える。Elasticsearchは4,096次元までだが、BBQ量子化やGPUアクセラレーションで独自の強みを持つ。
- クエリ: Elasticsearchはscripted query・span query・geo query・fuzzy・"more like this"など専門的なクエリを維持。OpenSearchはjoinクエリ・geospatial(XY)検索・term-levelフィルタに注力。
- パフォーマンス: 2026年3月のTrail of Bitsによるベンチマークでは"Big 5"ワークロードでOpenSearch 2.17.1が総合的に高速という結果が出た一方、Elastic側はログ分析ワークロードでOpenSearchより40〜140%速いと主張している。
- 価格: Amazon OpenSearch ServiceはElastic Cloudに比べて概ね30〜50%安いとされる。

## ライセンス変遷の経緯

詳細は[[sspl|SSPL]]・[[software-licenses|ソフトウェアライセンス]]を参照。

## 出典

- [OpenSearch vs Elasticsearch Compared: Performance, Features & Cost (2026) | daily.dev](https://app.daily.dev/posts/opensearch-vs-elasticsearch-compared-performance-features-cost-2026--vufwqexwq)
- [Elasticsearch vs OpenSearch 2026: Key Differences | SigNoz](https://signoz.io/comparisons/elasticsearch-vs-opensearch/)
- [Linux Foundation Announces OpenSearch Software Foundation to Foster Open Collaboration in Search and Analytics](https://www.linuxfoundation.org/press/linux-foundation-announces-opensearch-software-foundation-to-foster-open-collaboration-in-search-and-analytics)
- [AWS brings OpenSearch under the Linux Foundation umbrella | TechCrunch](https://techcrunch.com/2024/09/16/aws-brings-opensearch-under-the-linux-foundation-umbrella/)
