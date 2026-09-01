---
created: 2026-09-01 23:36
updated: 2026-09-01 23:36
---
# OpenSpec

AIコーディングエージェント向けの[[spec-driven-development|spec駆動開発]]フレームワーク。Fission AI（Y Combinator出資）が開発しており、MITライセンス、npmパッケージは`@fission-ai/openspec`、リポジトリは[Fission-AI/OpenSpec](https://github.com/Fission-AI/OpenSpec)。公式サイトは[openspec.dev](https://openspec.dev/)。

「コードを生成するのは安くなったが、正しさは依然として高い」という問題意識から、実装の前に「何を作るか」をMarkdownの仕様として書き、それをエージェントの永続的なコンテキストとして使わせる。

## ディレクトリ構成

リポジトリ内に`openspec/`を作り、そこに仕様レイヤーを持つ。中身はすべてプレーンなMarkdownで、Gitにチェックインしてコードと一緒に管理する。

| パス | 役割 |
| --- | --- |
| `openspec/specs/` | システムが現在どう動くかを記述する spec library（信頼できる現状の記録） |
| `openspec/changes/` | 個々の変更。`proposal.md` / `design.md` / `tasks.md` と仕様の差分がセットで入る |
| `openspec/changes/archive/` | 完了した変更 |

## spec delta

OpenSpecを特徴づけているのが、変更を**現状の振る舞いに対する差分（spec delta）**として書く点。機能ごとに独立した完結した仕様ファイルを維持するのではなく、「今こう動いているものを、こう変える」を提案として書き、実装が終わってarchiveする際にspec libraryへマージして現状の記録を更新する。既存コードベースへの変更をそのまま表現できるため、ブラウンフィールド優先を掲げる根拠になっている。

## ワークフロー

`/opsx:explore`のようなスラッシュコマンドで各段階を回す。

1. **explore** — 問題を整理し、コードベースを把握する（設計の壁打ち相手）
2. **propose** — `proposal.md` / `specs/` / `design.md` / `tasks.md` を作る
3. **apply** — 仕様からタスクを実装する
4. **verify** — 実装が仕様と一致するか確認する
5. **archive** — 完了した変更をspec libraryへ記録する

Claude Code・Cursor・GitHub Copilot・Codex・Windsurf・Gemini・Amazon Q Developer・JetBrains Junieなど30以上のエージェント/IDEに対応するツール非依存の設計。

## インストール

Node.js 20.19.0以上が必要。

```sh
npm install -g @fission-ai/openspec@latest
openspec init
```

npm以外にpnpm / bun / yarn / nixにも対応している。匿名の利用統計（コマンド名とバージョンのみ）を送信するが、`OPENSPEC_TELEMETRY=0`または`DO_NOT_TRACK=1`で無効化できる。

## [[spec-kit|GitHub Spec Kit]]との違い

| | OpenSpec | [[spec-kit|Spec Kit]] |
| --- | --- | --- |
| 進め方 | フェーズゲートを強制しない、流動的 | `constitution → specify → plan → tasks → implement`の逐次進行 |
| 仕様の書き方 | 現状に対する差分（delta）として書き、archive時に本体へマージ | 機能ごとに独立した仕様ファイルを維持 |
| 想定する現場 | ブラウンフィールド（既存コードベース）優先 | グリーンフィールド、強いガードレールが欲しい場合 |

「fluid not rigid / iterative not waterfall / easy not complex / brownfield-first」という4原則を掲げ、Spec Kitより軽量である点を自らの位置づけとしている。既存コードに手を入れるならOpenSpec、ゼロから固い規律で進めるならSpec Kit、というのが各種比較記事の共通見解。

## 出典

- [OpenSpec公式サイト](https://openspec.dev/)
- [Fission-AI/OpenSpec - GitHub](https://github.com/Fission-AI/OpenSpec)
- [Launch YC: OpenSpec: The Spec Framework for Coding Agents](https://www.ycombinator.com/launches/Pdc-openspec-the-spec-framework-for-coding-agents)
- [OpenSpec vs Spec Kit - Hashrocket](https://hashrocket.com/blog/posts/openspec-vs-spec-kit-choosing-the-right-ai-driven-development-workflow-for-your-team)
- [Spec Kit vs OpenSpec - intent-driven.dev](https://intent-driven.dev/knowledge/spec-kit-vs-openspec/)
- [OpenSpec - a lightweight AI-driven spec framework - Dan Clarke](https://www.danclarke.com/openspec/)

#llm #ai-agent #spec駆動開発 #claude-code
