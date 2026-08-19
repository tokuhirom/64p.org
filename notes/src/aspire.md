---
created: 2026-08-19 10:57
updated: 2026-08-19 10:57
---
# Aspire

Microsoftが開発している、分散アプリケーションの設計・実行・デプロイのためのCLIツール(旧称: .NET Aspire)。[aspire.dev](https://aspire.dev/)。

## 特徴

- **AppHost**と呼ばれる単一のコード定義で、サービス・データベース・コンテナ・依存関係をまとめて管理するコード優先アプローチ。開発環境から本番環境まで同じモデルを使う。
- 元々は.NET専用だったが、現在はC#に限らずPython・Node.js・Java・Goなど複数言語をまたいだポリグロット構成にも対応している。
- ローカル実行(`aspire run`)からテスト、Azure/AWS/[[kubernetes|Kubernetes]]などへの本番デプロイまで一貫して同じモデルで扱える。
- OpenTelemetryを標準搭載し、ログ・トレース・メトリクス・ヘルスチェックを開発者用ダッシュボードで統一管理する組み込みオブザーバビリティを持つ。
- PostgreSQL・MongoDB・Redis・RabbitMQ・Azure Service Busなど、よく使うDB/キャッシュ/メッセージブローカーとの統合をデフォルトで提供する。
- GitHub CopilotやClaudeなどAIアシスタントに、アプリケーションのコンテキスト・実行中のリソース・テレメトリデータを渡す機能も持つ。

## コード優先 vs 宣言的YAML

「コード優先」は[[kubernetes|Kubernetes]]の宣言的YAMLと対比される設計思想。

- **Kubernetes**: サービス構成をDeployment/Service等のYAMLマニフェストで宣言的に書く。クラスタがそのYAMLを見て実行状態を収束させる、インフラ起点のアプローチ。
- **Aspire**: サービス構成をYAMLではなくAppHostのC#コードとして書く。「このプロジェクトとこのRedisとこのPostgresを繋げる」といったトポロジーを型付きコードとして表現し、`aspire run`一発でローカルに一括起動する。コンパイル時の型チェックやIDE補完が効く、開発者起点のアプローチ。

Aspireはあくまで開発時のオーケストレーション・DXツールという位置づけで、本番運用のクラスタ管理そのものはKubernetesの役目のまま。AspireにはKubernetes向けデプロイマニフェスト(YAML)を生成する機能もあり、「開発中はコードで書いて、デプロイ時にYAMLへ書き出す」橋渡し役になっている。むしろ`docker-compose.yml`の内容をC#コードで書けるようにした、というイメージの方が近い。

## 位置づけ

マイクロサービス構成のアプリを立ち上げる際の「サービス発見・依存管理・可観測性」を一括で面倒見てくれる、Microsoft製のオーケストレーションツール。単一のコンテナオーケストレーターというよりは、開発時の複数サービス起動・接続・監視をまとめる開発者体験(DX)ツールという位置づけ。

## 出典

- [Aspire公式サイト](https://aspire.dev/)
- [What is .NET Aspire? - Mehmet Ozkaya](https://mehmetozkaya.medium.com/what-is-net-aspire-ab76cfe67872)
- [Aspirational .NET: What Is .NET Aspire? - CODE Magazine](https://www.codemag.com/Article/2403071/Aspirational-.NET-What-Is-.NET-Aspire)
- [.NET Aspire 1: What is .NET Aspire? - Dave Brock](https://www.daveabrock.com/2025/06/24/net-aspire-1-net-aspire/)
- [Deploy your first Aspire app · Aspire公式ドキュメント](https://aspire.dev/get-started/deploy-first-app/)
- [Understanding .NET Aspire Orchestration - ITNEXT](https://itnext.io/understanding-net-aspire-orchestration-460b50b7da46)
- [Migrate from Docker Compose - Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/aspire/get-started/migrate-from-docker-compose)
- [Kubernetes integration - Microsoft Learn](https://learn.microsoft.com/dotnet/aspire/deployment/kubernetes-integration)
