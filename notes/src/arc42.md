---
created: 2026-08-17 17:44
updated: 2026-08-17 17:45
---
# arc42

ソフトウェアアーキテクチャのドキュメントを書くためのテンプレート。2005年にGernot StarkeとPeter Hruschkaが作成し、オープンソース・無料(商用利用可)で公開されている。

## 12セクション構成

各セクションは任意(オプション)で、プロジェクトの規模・性質に応じて取捨選択して使う。

1. **Introduction & Goals** — 要件と品質目標
2. **Constraints** — 規制・外部制約
3. **Context & Scope** — 外部システムとのインターフェース
4. **Solution Strategy** — 核となる方針
5. **Building Block View** — ソースコード構造・モジュール分割
6. **Runtime View** — 重要な実行時シナリオ
7. **Deployment View** — ハードウェア・インフラ・デプロイ構成
8. **Crosscutting Concepts** — 横断的な技術的決定事項
9. **Architectural Decisions** — 重要なアーキテクチャ決定([[architecture-decision-record|ADR]]的な位置づけ)
10. **Quality Requirements** — 品質ツリー・品質シナリオ
11. **Risks & Technical Debt** — 既知の課題・リスク([[technical-debt|技術的負債]])
12. **Glossary** — 用語集

## 特徴

- 技術・プロセスに依存しない設計で、アジャイルなチームにも向く。
- 他のアーキテクチャドキュメントテンプレート([[4-plus-1-view-model|4+1ビューモデル]]など)と比べてミニマルで、肥大化しにくい。
- テンプレート・実例集・Tips集(144個)が公式サイトで公開されている。

## 出典

- [arc42 - arc42](https://arc42.org/)
- [arc42 Documentation - arc42](https://arc42.org/documentation/)
- [GitHub - arc42/arc42-template](https://github.com/arc42/arc42-template)

#software-engineering
