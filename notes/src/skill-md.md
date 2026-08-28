---
created: 2026-08-28 18:20
updated: 2026-08-28 18:20
---
# SKILL.md

`SKILL.md` は、コーディングエージェントに「特定タスクの手順書」を渡すためのファイル形式。ディレクトリ名がスキル名になり、その中に `SKILL.md` を置く。エージェントは起動時に全スキルの `description` だけを読んでおき、プロンプトと関連しそうなときに本体を読み込む(プログレッシブディスクロージャ)。Anthropicが Claude Code の Agent Skills として始めた形式だが、2025年末に OpenAI Codex が採用してからは複数のエージェント間で共通に使えるデファクトになっている。

`AGENTS.md` や `CLAUDE.md` が「常に読まれるプロジェクト全体の前提」なのに対し、`SKILL.md` は「必要になったときだけ読まれるタスク固有の手順」という住み分け。長いリファレンスを置いても、使われるまでコンテキストを消費しない。 #llm #claude-code #ai-agent

## 探索パス

問題は、どのディレクトリを探索するかがエージェントごとに違うこと。

| ツール | プロジェクト | 個人/グローバル |
|---|---|---|
| Claude Code | `.claude/skills/<name>/SKILL.md` | `~/.claude/skills/<name>/SKILL.md` |
| opencode | `.opencode/skills/`, `.claude/skills/`, `.agents/skills/` | `~/.config/opencode/skills/`, `~/.claude/skills/`, `~/.agents/skills/` |
| GitHub Copilot CLI | `.github/skills`, `.claude/skills`, `.agents/skills` | `~/.copilot/skills`, `~/.agents/skills` |
| Codex | `.agents/skills/` | `$HOME/.agents/skills/`, `/etc/codex/skills/` |

- **Claude Code だけが `.agents/skills` を読まない**。逆に **Codex だけが `.claude/skills` を読まない**。opencode と Copilot CLI は両方読むので何も考えなくてよい。
- Claude Code のプロジェクトスキルは、起動ディレクトリからリポジトリルートまでの各階層の `.claude/skills/` を読む。起動ディレクトリより下のネストしたスキルは起動時にはロードされず、そのサブディレクトリ内のファイルを読み書きした時点で有効になる(モノレポでパッケージごとにスキルを持たせられる)。
- Codex も同様に cwd → 親 → リポジトリルートの順に `.agents/skills` を辿る。
- Copilot CLI の個人スキルに `~/.claude/skills` は含まれない(プロジェクト側の `.claude/skills` は読む)。
- Codex はスキル対応の初期実装(2025年12月)で `~/.codex/skills/` を使っており、これも引き続き動く。現行のドキュメントが挙げているのは `.agents/skills` 系。

## 1つの実体を全ツールから見せる

実体を `.agents/skills/` に置き、`.claude/skills/` からシンボリックリンクを張ると4ツール全部から見える。Claude Code は「`<skill-name>` エントリがシンボリックリンクなら追跡してリンク先の `SKILL.md` を読む。同じ実体が複数経路から到達可能でも1回しかロードしない」と明記している。

```sh
# プロジェクト
mkdir -p .agents/skills/my-skill .claude/skills
ln -s ../../.agents/skills/my-skill .claude/skills/my-skill

# 個人
mkdir -p ~/.agents/skills/my-skill ~/.claude/skills
ln -s ~/.agents/skills/my-skill ~/.claude/skills/my-skill
```

逆向き(実体を `.claude/skills` に置いて `.agents/skills` からリンク)でも成立するが、`.agents/` の方がベンダー中立な名前なので、チームで共有するリポジトリではこちらを実体にする方が据わりがよい。Copilot しか使わないなら `.github/skills` 一択でよい。

## frontmatter の方言

`name` と `description` は4ツールとも必須で共通。ここから先は方言なので、複数エージェントで共有するスキルには極力書かない方がいい。

- Claude Code: `allowed-tools`(許可するツール)、`disable-model-invocation`(モデルからの自動起動を止めてユーザー呼び出し専用にする)など
- Codex: frontmatter を増やさず、`agents/openai.yaml` という別ファイルで UI 表示・呼び出しポリシー・ツール依存を指定する
- opencode: 認識するのは `name` / `description` / `license` / `compatibility` / `metadata` のみ。独自項目は `metadata` の下に入れる

## 標準化の動き

[[agent-plugins]](Vercel・OpenAI・Amazon・Cursor・Microsoft・Googleによるベンダー中立なパッケージ仕様)も `skills/` ディレクトリを構成要素に含んでおり、`SKILL.md` を軸にした配布形式に収束しつつある。ただし Agent Plugins は「パッケージ形式」の標準であって、上記のような各クライアントの探索パスの違いを解消するものではない。

スキルの実例としては[[grill-me]]や、[[dashboard-as-agent-skill|ダッシュボードをスキルとして切り出す]]発想、[[hackathon-coding-agent-skills|ハッカソンで主催者がデプロイ手順をスキルとして配る]]事例などがある。

## 出典

- [Extend Claude with skills - Claude Code Docs](https://code.claude.com/docs/en/skills)
- [Agent Skills - opencode](https://opencode.ai/docs/skills/)
- [Adding agent skills for GitHub Copilot CLI - GitHub Docs](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills)
- [Build skills - OpenAI Codex](https://developers.openai.com/codex/skills)
- [OpenAI are quietly adopting skills, now available in ChatGPT and Codex CLI - Simon Willison](https://simonwillison.net/2025/Dec/12/openai-skills/)
