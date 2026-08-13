---
created: 2026-08-13 12:59
updated: 2026-08-13 12:59
---
# dbt (data build tool)

ELT (Extract-Load-Transform) パイプラインの「T (変換)」部分を担うオープンソースのデータ変換フレームワーク。開発元はdbt Labs(旧Fishtown Analytics)。データの抽出・ロードは行わず、既にウェアハウスにロード済みのデータに対する変換処理に特化している。

#data-engineering #sql #rust

## 中核的な仕組み

- アナリストやエンジニアがSQLの`SELECT`文(またはPython DataFrame)でビジネスロジックを記述すると、dbtがそれをテーブルやビューとして具体化(materialize)し、DDLやトランザクション、スキーマ変更などのボイラープレートを自動処理する。
- モデル間の依存関係を`ref()`関数で表現すると、dbtがDAG(有向非巡回グラフ)を構築し、依存順に実行する。
- データ品質テストと自動ドキュメント生成の機能を持つ。
- バージョン管理・ブランチ・プルリクエスト・CI/CD・パッケージ管理といったソフトウェアエンジニアリングのプラクティスを、SQLしか書けないアナリストでもデータパイプラインに適用できるようにする、というのが最大の価値提案。

## 提供形態

- **dbt Core** — ローカル/CLIで使うOSS版。
- **dbt platform**(旧dbt Cloud) — スケジューリング・CI/CD・ドキュメントホスティング・監視をまとめたホスティングサービス。

## 最近の動向

- **dbt Fusion Engine** — 2025年5月にパブリックベータ公開された、Rustでゼロから書き直された新エンジン。SDF由来のSQL静的解析技術を組み込み、Python依存を排除している。大規模プロジェクト(1万モデル規模)でパース速度が最大30倍になるなど大幅に高速化された。
- **dbt 2.0** — 2026年6月にアルファ公開。dbt CoreをFusionと同じRustエンジン上に再構築し、「2エンジン時代」を終わらせるリリース。Apache 2.0ライセンスでOSSのまま維持する方針。
- **Fivetran + dbt Labs 合併** — 2025年10月に発表、2026年6月に完了した全株式交換の合併。CEOはFivetranのGeorge Fraser、社長はdbt LabsのTristan Handy。ELTの「E/L」(Fivetran)と「T」(dbt)を1社に統合し、AI向けデータ基盤としての立ち位置を狙う。dbt CoreはOSSのまま維持するとコミットしている。

## 出典

- [Introduction | dbt Docs](https://docs.getdbt.com/docs/introduction)
- [Meet the dbt Fusion Engine | dbt Developer Blog](https://docs.getdbt.com/blog/dbt-fusion-engine)
- [Fivetran and dbt Labs Complete Merger | Fivetran Press](https://www.fivetran.com/press/fivetran-dbt-labs-complete-merger-to-create-the-data-infrastructure-for-trusted-ai-agents)
- [What is Data Build Tool(dbt): Guide for Data Engineers | Hevo Data](https://hevodata.com/learn/what-is-data-build-tool-dbt/)
