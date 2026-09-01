---
created: 2026-09-01 23:36
updated: 2026-09-01 23:36
---
# GitHub Spec Kit

GitHubが公開している[[spec-driven-development|spec駆動開発]]のためのツールキット。リポジトリは[github/spec-kit](https://github.com/github/spec-kit)。スラッシュコマンドを通じてエージェントに一連のMarkdown成果物を生成させ、それを起点に実装させる。

## 生成される4つの成果物

| ファイル | 内容 |
| --- | --- |
| `constitution.md` | プロジェクト全体の不可侵な原則 |
| `spec.md` | 要件とユーザーストーリー |
| `plan.md` | 技術設計 |
| `tasks.md` | 依存関係を考慮した順序付きタスクリスト |

## ワークフロー

Spec Kitの特徴は、段階を逐次的に進むことを前提にしている点にある。

1. `/constitution` — プロジェクトの原則を定める。以降のすべての判断がここに従う
2. `/specify` — 要件を記述する
3. `/plan` — 技術的な設計に落とす
4. `/tasks` — 実装可能な単位に分解する
5. `/implement` — タスクリストに沿ってエージェントに実装させる

加えて`/analyze`が品質ゲートとして働き、仕様・設計・タスク分解が`constitution`と矛盾していないか、タスクが元の仕様と整合しているかを検査する。

`constitution`を最初に置いて以降の工程を縛るという構成が、[[openspec|OpenSpec]]のような軽量なアプローチとの一番大きな違いになっている。ガードレールが強く、拡張のカタログも大きい一方、既存コードベースへの小さな変更を回すには手数が多い、という評価がされることが多い。

## [[openspec|OpenSpec]]との違い

[[openspec|OpenSpec]]側のノートに比較表がある。ゼロから作り始めて強い規律を敷きたい場合はSpec Kit、既存コードへの差分として変更を書きたい場合はOpenSpec、という使い分けで語られる。

## 出典

- [github/spec-kit - GitHub](https://github.com/github/spec-kit)
- [spec-kit/spec-driven.md](https://github.com/github/spec-kit/blob/main/spec-driven.md)
- [Diving Into Spec-Driven Development With GitHub Spec Kit - Microsoft for Developers](https://developer.microsoft.com/blog/spec-driven-development-spec-kit/)
- [Exploring spec-driven development with the new GitHub Spec Kit - LogRocket Blog](https://blog.logrocket.com/github-spec-kit/)
- [GitHub Spec Kit Workflow: A Practical Guide - Shiplight AI](https://www.shiplight.ai/blog/spec-driven-development-with-spec-kit)

#llm #ai-agent #spec駆動開発 #github
