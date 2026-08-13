---
created: 2026-08-13 22:36
updated: 2026-08-14 01:23
---
# SIEM (Security Information and Event Management)

#security

OS・データベース・アプリケーション・ネットワーク機器・セキュリティ製品など、IT環境の様々なソースからログ・イベントデータを集約し、相関分析して脅威の兆候を検知するためのソフトウェア／プラットフォーム。単体のログでは見えない攻撃の兆候を、複数ソースにまたがる相関ルールで浮かび上がらせ、優先度付きのアラートとして[[soc|SOC]]のアナリストに提示するのが基本的な役割。

## 主な機能

- **ログ収集・正規化** — 多様なフォーマットのログを一元的に収集し、検索・分析可能な形に正規化する
- **相関分析・アラート** — 定義したルールや分析に基づきイベント同士を関連付け、セキュリティインシデントの可能性が高いものをアラートとして上げる
- **コンプライアンス支援** — 監査用のログ保全やレポート生成を自動化し、各種規制対応を支援する

近年はUEBA (User and Entity Behavior Analytics) による異常行動の検出や、機械学習ベースの分析を取り込んだ製品が増えており、検知後の対応を自動化するSOAR (Security Orchestration, Automation and Response) と統合される構成も一般的。

## 位置づけ

エンドポイント層を深く見る[[edr|EDR]]に対し、SIEMは環境全体のログを横断的に見る広さが持ち味で、両者は補完関係にある。SIEMのアラートをすり抜けた脅威を能動的に探す活動が[[threat-hunting|脅威ハンティング]]であり、その際のデータ基盤としてもSIEMが使われる。ログ分析基盤としての性質上、大量データの高速集計が求められ、分析用DB（[[clickhouse|ClickHouse]]等）が下回りに使われることもある。

## [[security-operations|セキュリティ運用]]の中での位置づけ

環境全体のログを横断的に相関分析する「広さ」担当の検知基盤。エンドポイントを深く見るEDRと補完関係にある。

## 出典

- [What is SIEM? | IBM](https://www.ibm.com/think/topics/siem)
- [What Is SIEM? | Microsoft Security](https://www.microsoft.com/en-us/security/business/security-101/what-is-siem)
- [Security information and event management - Wikipedia](https://en.wikipedia.org/wiki/Security_information_and_event_management)
