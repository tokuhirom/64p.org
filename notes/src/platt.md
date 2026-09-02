---
created: 2026-09-02 19:10
updated: 2026-09-02 19:10
---
# PlaTT

株式会社エーピーコミュニケーションズ（APC）が提供する、[[backstage]]ベースの開発者ポータル（IDP: Internal Developer Portal）製品。表記は「PlaTT」（"Pla" + "TT"）。素のBackstageに日本の現場向けの機能とエンタープライズ向け機能、そして導入・運用サポートを乗せて商用サービス化したもの。

#platform-engineering #devops

## 提供プラン

| プラン | 価格 | 対象 |
|---|---|---|
| マネージドプラン | 月額20万円（税別） | 〜50名程度の開発組織。カスタマイズ不可、標準プリセット機能のみ |
| ハイブリッドプラン | 月額20万円〜（要相談） | 50名以上の大規模組織。カスタマイズ可、新規プラグイン開発の依頼も可 |

## 機能

大半は[[backstage|Backstage]]由来。

- ソフトウェアカタログ（数千サービス規模の一元管理）
- TechDocsによる統合ドキュメンテーション（設計書・API仕様書をMarkdownで一元管理）
- ソフトウェアテンプレート（数クリックで標準化された環境を自動生成）
- 検索、Permission（ロールベースのアクセス制御）
- [[kubernetes]]・GitHub・Argo CDなどとの連携
- AIアシスタント、ドキュメント検索（RAG構成）などのプラグイン

## アーキテクチャ — 顧客テナントにデプロイする方式

一般的なSaaSと異なり、**Backstageのリソースを顧客自身のMicrosoft Azureテナント内にデプロイする**。その上でAPCは**Azure Lighthouse**による委任で顧客環境を管理する。

- ロール割り当てはContributor止まり（Admin権限は持たない）
- ストレージ内の顧客データは閲覧できないよう制限
- Managed Identityのアプリケーションには明示的にホワイトリスト方式で権限を付与

「ベンダーにクラウド基盤の特権を渡さずにマネージドサービスを受けられる」という構成になっており、IDP導入時にセキュリティ部門から出がちな懸念を回避する設計。プラットフォームチームはBackstage本体のバージョンアップ追従や運用管理から解放され、テンプレート作成や機能開発といった本来の仕事に集中できる、というのが売り文句。

## 周辺の取り組み

- **PlaTT伴走サービス** — 導入PoCを短期で回す支援メニュー。NTTコミュニケーションズの事例では、Backstage + 生成AIのFAQサービス（Azure上のRAG構成）を1週間で構築したとされる。
- **ちょこっとBackstage（chocotto-backstage）** — APCが2023年9月にOSSとしてGitHub公開した、コマンド一つでBackstageを試せるツール。PlaTTの入口的な位置づけ。

## 導入事例

- 日興アセットマネジメント — 金融向け[[devsecops|DevSecOps]]推進。開発者ポータル構築からテンプレート導入まで
- NTTコミュニケーションズ — [[platform-engineering|Platform Engineering]]推進の一環でBackstage + AIのPoC
- ソフトバンク — CNAP × Backstage

## 出典

- [開発者ポータル "PlaTT"シリーズ | エーピーコミュニケーションズ](https://www.ap-com.co.jp/platt/)
- [PlaTT Managed Serviceの仕組み - APC 技術ブログ](https://techblog.ap-com.co.jp/entry/2025/02/15/083524)
- [開発者ポータル立ち上げサービス for Backstage | エーピーコミュニケーションズ](https://www.ap-com.co.jp/cloudnative/developer_portal-backstage/)
- [日本初、コマンド一つで開発者ポータルを試せる「ちょこっとBackstage」をオープンソースとしてGitHubにて公開](https://www.ap-com.co.jp/pressrelease/post-10316)
- [Backstage導入効果がわかる事例一覧 - APC 技術ブログ](https://techblog.ap-com.co.jp/entry/2023/09/19/093000)
