---
created: 2026-08-10 17:10
updated: 2026-08-13 22:28
---
# Neon

[[postgresql|PostgreSQL]]互換のサーバーレスクラウドデータベース。2021年にCEOのNikita Shamgunov、エンジニアのHeikki LinnakangasとStas Kelvichによって設立された。

#database #postgresql #serverless

[[sqlite|SQLite]]互換で同様にサーバーレス・エッジ指向の[[turso|Turso]]と比較されることがある。

## アーキテクチャ

Compute（クエリ処理）とStorage（データ永続化）を分離したクラウドネイティブ構成が特徴。ストレージ側はRust製のPageserverとSafekeepersというコンポーネントで構成される。AWS Auroraのアーキテクチャを参考にしたとされる。コア部分はApache 2.0ライセンスのOSSとして公開されている。

## 主な機能

- **Scale to zero**: 未使用時に自動でスリープし、コストを抑える。
- **オートスケーリング**: 負荷に応じて計算リソースを自動調整する。
- **ブランチ機能**: Gitのブランチのように、DBのスナップショットから瞬時にコピー環境（本番・ステージング・開発・テスト）を作成できる。
- 500ミリ秒以下でのDBスピンアップ、利用量に応じた従量課金。

## 買収

2025年5月14日、Databricksが約10億ドルでNeonを買収すると発表した。DatabricksのデータインテリジェンスサービスとNeonのサーバーレスPostgresを組み合わせ、AIエージェント向けのデータ基盤を強化する狙いとされる。

## 出典

- [Neon サーバーレス Postgres とは - Microsoft Learn](https://learn.microsoft.com/ja-jp/azure/partner-solutions/neon/overview)
- [NeonのStorage/Compute分離アーキテクチャの仕組みを解説 | ISSUE](https://i-ssue.com/topics/beb7cf3a-971d-428f-8b13-6e75c28f35b2)
- [What's Neon? ～クラウドネイティブを実現するOSS～ PostgreSQL Conference Japan 2023](https://www.postgresql.jp/sites/default/files/2023-11/B1_What_s_Neon.pdf)
- [Databricks、サーバレスPostgresを提供する「Neon」の買収を発表](https://www.publickey1.jp/blog/25/databrickspostgresneon.html)
- [Databricks to buy open source database startup Neon for $1B | TechCrunch](https://techcrunch.com/2025/05/14/databricks-to-buy-open-source-database-startup-neon-for-1b/)
