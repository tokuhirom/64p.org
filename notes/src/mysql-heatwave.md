---
created: 2026-08-13 08:59
updated: 2026-08-15 19:06
---
# MySQL HeatWave

Oracleが提供する[[mysql|MySQL]]向けの完全マネージドクラウドサービス。OLTP（トランザクション処理）とOLAP（分析処理）を単一サービス内で統合し、従来はETLで別の分析基盤（Snowflake、BigQueryなど）にデータを移す必要があった構成を不要にする、というのが売り。

#database #mysql #cloud #oracle

## アーキテクチャ

2つのコンポーネントから構成される。

- **DB System**: MySQL Enterprise Editionが動くクラウドベースのコンピュートインスタンス。暗号化・データマスキング・DBファイアウォールなどのセキュリティ機能を持つ。
- **MySQL HeatWave Cluster**: インメモリのアクセラレータ。1つ以上のHeatWaveノードで構成され、分析・ML・GenAI・ベクトルストア・Lakehouse機能を提供する。

DB System側でのデータ変更は暗号化された通信で自動的にHeatWave Clusterへ伝播し、常に最新データに対してクエリできる。Object Storage上のデータも自動的に取り込まれる。

技術的な設計特性としては、インメモリのハイブリッド列形式（列指向のクエリ効率と行指向の更新効率を両立）、ノード・コア単位でデータを分割する大規模並列処理、プッシュベースのベクトル化クエリ処理などがある。

## 主な機能領域

1. **HeatWave（分析アクセラレータ）**: MySQLの分析クエリをアプリケーション側の変更なしに高速化するインメモリクエリアクセラレータ。
2. **HeatWave Lakehouse**: Object Storage上の最大0.5ペタバイトのデータを、MySQL DBにコピーせずにクエリ可能。
3. **HeatWave ML**: データ移動なしでのインデータベース機械学習。
4. **HeatWave GenAI / Vector Store**: PDF・PPT・DOC・HTMLなどの非構造化データを自動でパース・チャンク分割・ベクトル埋め込みし、インデータベースLLMによる意味検索やRAGを実現する。ベクトル処理は最大512ノードにスケールアウトし、メモリ帯域で実行される。
5. **Autopilot**: ML技術を用いたクエリ最適化・自動チューニング機能。

## ライセンス

「MySQL」本体と「HeatWave」は別物として扱う必要がある。

- **MySQL Community Edition**: GPLv2（オープンソース）
- **MySQL Enterprise Edition**: Oracleの商用プロプライエタリライセンス
- **HeatWave**: オープンソースではなくOracleのプロプライエタリ製品。単体のダウンロード可能なソフトウェアとしては提供されておらず、Oracle Cloud Infrastructure (OCI)・AWS・Microsoft Azure上の完全マネージドサービスとしてのみ利用できる。オンプレミス版は存在しない（オンプレミスのMySQLと接続するハイブリッド構成は可能だが、HeatWave Cluster自体はクラウド専用）。

課金は個別のライセンス購入ではなく、サブスクリプション/従量課金（pay-as-you-go）モデルに組み込まれている。DB System（MySQLインスタンス部分）はOCPU・ストレージ単位の課金、HeatWave Clusterはノード単位の追加課金という構成。

ベクトル検索やML機能などHeatWave固有の機能は、MySQL Community版はもちろんEnterprise版にも存在しない、HeatWaveだけの独自機能。Community/Commercial版でも[[mysql-vector|VECTOR型]]自体は使えるが、値の格納・シリアライズができるのみで、類似度計算(`DISTANCE()`関数)やANN検索インデックスはHeatWave限定。

## パフォーマンス面の主張

Oracle公式によれば、類似検索（vector similarity search）においてDatabricksより15倍、Google BigQueryより18倍、Snowflakeより30倍高速だとされている。Oracle自身のベンチマークである点には留意。

## 出典

- [Overview of MySQL HeatWave Service](https://docs.oracle.com/en-us/iaas/mysql-database/doc/overview-mysql-heatwave-service.html)
- [MySQL :: HeatWave User Guide :: 1.1 About MySQL HeatWave](https://dev.mysql.com/doc/heatwave/en/mys-hw-about-heatwave.html)
- [MySQL :: HeatWave User Guide :: 7.7.1 About MySQL HeatWave Vector Store](https://dev.mysql.com/doc/heatwave/en/mys-hw-genai-vector-store-overview.html)
- [MySQL :: HeatWave User Guide :: 1.4 Supported Cloud Platforms](https://dev.mysql.com/doc/heatwave/en/mys-hw-supported-cloud-platforms.html)
- [MySQL HeatWave GenAI | Oracle](https://www.oracle.com/mysql/genai/)
- [What is HeatWave SQL and How is it Licensed?](https://redresscompliance.com/what-is-heatwave-sql-and-how-is-it-licensed/)
- [MySQL HeatWave Pricing on OCI & AWS | Oracle Europe](https://www.oracle.com/europe/heatwave/pricing/)
- [Is Oracle Finally Killing MySQL? - Percona](https://www.percona.com/blog/is-oracle-finally-killing-mysql/)
