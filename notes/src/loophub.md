---
created: 2026-08-12 08:22
updated: 2026-08-12 08:22
---
# LoopHub

[jugyo](https://github.com/jugyo)氏による、ローカルマシン上のGitリポジトリ向けのGitHub風issue/PRハブ。Claude CodeやCodexなどのAIコーディングエージェントを複数タスクで並行実行し、統一UIから管理するためのツール。2026年8月に開発が始まった新しいプロジェクトで、MIT License。

## 何をするツールか

Issueにタスク記述と受け入れ基準を定義し、実装エージェントとは別のエージェントセッションが検証を担当する「独立レビュー」の仕組みを持つ。実装ごとに専用のGitワークツリーで隔離し、Execute(実装) → Verify(検証) → Merge(統合)というワークフローを自動化する。データはすべてローカルのSQLiteに保存され、リモートサービスには依存しない。

## インストールと要件

- Node.js ≥ 22.12.0、git
- [[herdr]](ターミナルマルチプレクサー)
- コーディングエージェントCLI(`claude`、`codex`など)

```sh
git clone <repo> loophub
cd loophub
npm install
npm link          # lh コマンドをPATHに配置
lh repo add ~/work/my-project --name me/my-project
npm run serve      # http://localhost:8730 でUI起動
```

## 主なコマンド

- `lh issue create --title "タイトル"` — issue作成
- `lh workflow start 1 --herdr` — ワークフロー開始
- `lh pr merge 3` — PRをマージ

## 位置づけ

[[hunk-cli|hunk]]が「AIエージェントの生成した差分をレビューする」側のツールであるのに対し、LoopHubは「複数のAIエージェントに並行してタスクを投げ、issue/PR運用のような形で管理する」オーケストレーション側のツール。実行状況の一覧表示という点では[[herdr]]とも重なる領域だが、herdrがターミナルマルチプレクサとして各エージェントのペインを束ねるのに対し、LoopHubはissue/PRという開発ワークフローの単位でタスクを管理する。

#claude-code #ai-agent

## 出典

- [GitHub - jugyo/loophub](https://github.com/jugyo/loophub)
