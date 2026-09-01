---
created: 2026-09-01 20:12
updated: 2026-09-01 20:12
---
# Orca

複数のAIコーディングエージェント(Claude Code、Codex、OpenCodeなど)を並列に走らせるためのデスクトップアプリ。開発元のStably AI(Y Combinator出資のスタートアップ)はこれをIDEではなく **ADE (Agent Development Environment)** と呼んでいる。人間がエディタでコードを書く場所ではなく、エージェントに仕事を割り振って結果を検証する場所、という位置づけ。

- リポジトリ: [stablyai/orca](https://github.com/stablyai/orca) — MITライセンス、TypeScript(Electron)製
- macOS / Windows / Linux 対応。`brew install --cask stablyai/orca/orca`、Arch Linuxは `yay -S stably-orca-bin`
- キャッチコピーは "The AI Orchestrator for 100x builders"

## Parallel Worktrees

中核機能。タスクごとに本物の git worktree を自動作成し、それぞれが独立したディレクトリ・エージェントターミナル・ブラウザタブを持つ。エージェント同士が同じ作業ツリーを踏み合わないよう、環境を物理的に隔離するアプローチ。

1つのプロンプトを複数のエージェントに同時に投げ、出てきた差分を見比べて良かったものだけをマージする、という使い方ができる。エージェントの出力が非決定的であることを前提に、「1回の実行を丁寧に見る」のではなく「複数回の実行から選ぶ」方向に倒した設計。

25以上のCLIエージェントに対応する。Claude Code、Codex、Cursor CLI、GitHub Copilot、Gemini、Cline、OpenCode、Amp、Gooseなど。

## Design Mode付き内蔵ブラウザ

Chromiumベースのブラウザを内蔵していて、表示中のUI要素をクリックするとそのHTML・CSS・切り抜いたスクリーンショットをそのままエージェントへのプロンプトに差し込める。フロントエンドの手直しを「この要素をこうして」と指示する形で回せる。

## その他の機能

- GitHub / Linear連携(PR・Issue・プロジェクトボードをアプリ内で扱う)
- SSHリモートworktree — 手元のGUIから、リモートマシン上でエージェントを走らせる
- iOS / Androidのコンパニオンアプリ。外出先からエージェントの様子を見て指示を返せる
- WebGLベースのターミナル(Ghostty系)によるペイン分割

## [[herdr]]との違い

同じ「複数エージェントの並列運用」を扱うため代替として名前が挙がるが、解いている問題は別。

| | Orca | [[herdr]] |
|---|---|---|
| 形態 | GUIデスクトップアプリ | ターミナル内で動く単一バイナリ(tmux代替) |
| 主眼 | タスクごとの環境隔離(worktree自動生成)と差分比較 | 常駐サーバーによるセッション永続化とペイン状態の可視化 |
| リモート | SSHリモートworktree | SSH越しにそのまま使える。切断してもエージェントは走り続ける |

「実装作業はOrca、サーバー上の長時間タスクはherdr」のような使い分けや、役割が重なるのでどちらか一方に寄せる、といった評価が見られる。ターミナル中心の運用ならherdr、Codex Desktop Appのような操作感を求めるならOrca、という整理がわかりやすい。

#ai-agent #claude-code #git

## 出典

- [stablyai/orca - GitHub](https://github.com/stablyai/orca)
- [Orca とは｜AI コーディングエージェントを並列で使い倒す Agent IDE の用途と使いこなし - FIXIT](https://fixit.co.jp/tips/orca-agent-ide-guide/)
- [herdr とは｜AI エージェントを常駐させる tmux 代替。使い方と Orca / cmux との違い - FIXIT](https://fixit.co.jp/tips/herdr-agent-multiplexer/)
- [Orca 実践ガイド: Claude Code や Codex を並列運用する ADE の使いこなし術 - TECHSCORE BLOG](https://blog.techscore.com/entry/2026/07/15/080000)
- [Orca vs Herdr: task isolation or live terminal control - max_tokens](https://maxtokens.ai/posts/orca-herdr-agent-worktrees/)
