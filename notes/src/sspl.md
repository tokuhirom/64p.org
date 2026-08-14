---
created: 2026-08-14 09:59
updated: 2026-08-14 12:02
---
# SSPL

#license #source-available #copyleft

Server Side Public License。MongoDB社が2018年10月に作成したライセンス。[[agpl|AGPLv3]]をベースに第13条を全面的に書き換えたもので、クラウドベンダーが自社ソフトをマネージドサービスとして「タダ乗り」提供することへの対抗が目的。

## 第13条: Offering the Program as a Service

AGPLの第13条が「改変版をネットワーク経由で使わせるならそのプログラムのソースを提供せよ」であるのに対し、SSPLの第13条は:

- **改変の有無を問わず**、プログラムの機能を第三者にサービスとして提供すること自体がトリガーになる
- 公開義務の範囲がプログラム本体にとどまらず、サービス提供に使うスタック全体に及ぶ。条文には管理ソフトウェア・UI・API・自動化ソフト・監視ソフト・バックアップ・ストレージ・ホスティングソフトウェアまで列挙されており、これら「Service Source Code」をすべてSSPLで公開しなければならない

事実上、クラウドベンダーが自社の運用基盤ごとオープンにしない限りマネージドサービス化できない設計であり、「ライセンス料を払って商用ライセンスを買え」へ誘導するための実質的な禁止条項と受け止められている。

## OSI非承認

- MongoDBは2018年10月に[[osi|OSI]]へ承認申請したが、レビューで「特定の利用分野（サービス提供）への差別でありOpen Source Definitionに反する」との批判が強く、2019年に申請を取り下げた
- OSIはその後「SSPLはオープンソースライセンスではない」と明確に表明しており、source-availableライセンスに分類される
- この結果、Debian・Fedora・RHELはMongoDBをリポジトリから削除した

## 採用と、それが誘発したフォーク

- **MongoDB** (2018): AGPLv3から移行。SSPLの本家
- **[[elasticsearch|Elasticsearch]]/Kibana** (2021): Apache 2.0からSSPL/Elastic Licenseのデュアルへ → AWSが**[[opensearch|OpenSearch]]**をフォーク。2024年9月にAGPLv3を追加してOSI承認ライセンスに復帰
- **[[redis|Redis]]** (2024): BSDからRSALv2/SSPLv1のデュアルへ → **[[valkey|Valkey]]**がフォーク。2025年5月のRedis 8でAGPLv3を追加して復帰

ElasticもRedisも最終的にAGPLv3併用でオープンソースに戻っており、「SSPL単独はコミュニティの離反（フォーク）コストが大きすぎる」という前例になりつつある。

## [[software-licenses|ソフトウェアライセンス]]の中での位置づけ

AGPLよりさらに強い網羅的[[copyleft|コピーレフト]]を狙った拡張だが、OSI非承認のためオープンソースではなくsource-availableに分類される。時限式でOSS化する[[business-source-license|BSL]]とは別系統のsource-availableライセンス。

## 出典

- [Server Side Public License (SSPL) | MongoDB](https://www.mongodb.com/legal/licensing/server-side-public-license)
- [Server Side Public License FAQ | MongoDB](https://www.mongodb.com/legal/licensing/server-side-public-license/faq)
- [MongoDB withdraws SSPL from the OSI's approval process - Packt](https://www.packtpub.com/en-us/learning/how-to-tutorials/mongodb-withdraws-controversial-server-side-public-license-from-the-open-source-initiatives-approval-process/)
- [Server Side Public License - Wikipedia](https://en.wikipedia.org/wiki/Server_Side_Public_License)
- [Elasticsearch Is Open Source. Again! | Elastic Blog](https://www.elastic.co/blog/elasticsearch-is-open-source-again)
