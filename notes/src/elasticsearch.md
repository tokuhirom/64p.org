---
created: 2026-08-14 11:32
updated: 2026-08-14 12:02
---
# Elasticsearch

#search #database #lucene

Apache Luceneをベースにした分散型の検索・分析エンジン。Java製。ドキュメント指向でデータをJSON形式のまま保存し、転置インデックス(inverted index)を使うことでテキスト本体を直接走査せず高速な全文検索を実現する。

## アーキテクチャ

- クラスタはノードの集合、インデックスはシャード(shard)に分割される。各シャードの実体はそれぞれ独立したLuceneインデックス。
- Luceneのインデックスはセグメント(segment)という不変(immutable)な単位で構成され、書き込みのたびに新規セグメントが作られ、バックグラウンドで定期的にマージされていく。
- シャードはレプリカを持て、ノード障害時の可用性と読み取りのスループット向上に使われる。

## 用途

- 全文検索(サイト内検索・ECサイト検索など)
- ログ・メトリクス分析、observability。Logstash(データ収集・変換)・Kibana(可視化)と組み合わせた「ELK Stack」という呼び方が定着している
- 近年はベクトル検索を組み込み、LLMを使ったRAG(Retrieval-Augmented Generation)のバックエンドとしても使われる

## ライセンス変遷

2021年にApache 2.0からSSPL/Elastic Licenseのデュアルライセンスへ移行し、これを機にAWSが[[opensearch|OpenSearch]]としてフォークした。2024年9月にAGPLv3を選択肢へ追加し、[[osi|OSI]]承認ライセンスへ「復帰」している。経緯の詳細は[[sspl|SSPL]]・[[agpl|AGPL]]・[[software-licenses|ソフトウェアライセンス]]を参照。

## 出典

- [What is Elasticsearch? How It Works & Complete Guide (2026) | Knowi](https://www.knowi.com/blog/what-is-elastic-search/)
- [ElasticSearch Architecture: A Comprehensive Guide | DEV Community](https://dev.to/wadee_sami_4562c11ecf8066/elasticsearch-architecture-a-comprehensive-guide-12me)
- [Elasticsearch Is Open Source. Again! | Elastic Blog](https://www.elastic.co/blog/elasticsearch-is-open-source-again)
