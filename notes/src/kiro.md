---
created: 2026-09-01 23:40
updated: 2026-09-01 23:40
---
# Kiro

AWSが開発する、[[spec-driven-development|spec駆動開発]]を中心に据えたagentic IDE。2025年7月14日にパブリックプレビュー、2026年5月7日にGA。公式サイトは[kiro.dev](https://kiro.dev/)。「spec駆動開発」という語を早期に前面に押し出したツールであり、この分野の呼称が広まる契機のひとつになった。

## Specs

コードを書き始める前に、エージェントが要件・設計・タスクリストをリポジトリ内に書き出す。ユーザーはまず計画をレビューし、実装後もそれらのファイルはドキュメントとして残る。

| ファイル | 内容 |
| --- | --- |
| `requirements.md` | ユーザーストーリーと受け入れ基準 |
| `design.md` | 技術設計 |
| `tasks.md` | 実装タスクの一覧 |

要件は**EARS（Easy Approach to Requirements Syntax）**という形式記法で書かれる。`WHEN [条件・イベント] THE SYSTEM SHALL [期待される振る舞い]`というパターンに沿わせることで、トリガー・条件・アクションを曖昧さなく、テスト可能な形で表現する。素のユーザーストーリーでは書き落とされがちなエッジケースを受け入れ基準として明示させる狙いがある。

## Steering

`steering`はプロジェクトに関する永続的な知識をMarkdownで与える仕組みで、チームの規約・使うライブラリ・コーディング標準などを記述する。これらは毎回の対話に自動で読み込まれ、生成されるコード全体に影響する。[[skill-md|SKILL.md]]が「必要になったときだけ読まれるタスク固有の手順」なのに対し、steeringは常に読まれるプロジェクト全体の前提という位置づけで、`AGENTS.md`や`CLAUDE.md`に近い。

## Agent Hooks

ファイルの保存・作成・削除といったイベントをトリガーに、エージェントのアクションを自動実行する仕組み。設定は`.kiro/hooks/`配下のJSONで、トリガーイベント・マッチャーパターン・アクションを持つ。アクションは現在の会話にプロンプトを注入する形でエージェントの振る舞いを誘導する。GitHub Actionsに似ているが、CIではなくIDE内で発火し、実行主体がAIエージェントである点が異なる。

## モデルと料金

推論はAmazon Bedrock経由でAnthropicのClaudeを使う。仕様生成のような推論重視のタスクにはClaude Sonnet、スループット重視のコード生成にはAmazon Novaを使う、というようにタスク種別でモデルを切り替える構成。

料金はクレジット制で、無料枠が月50クレジット、Pro（$20/user、1,000クレジット）、Pro+（$40、2,000）、Pro Max（$100、5,000）、Power（$200、10,000）。追加クレジットは1つ$0.04。有料プランではClaude Opusなどのプレミアムモデルが選べる。

## 他のspec駆動ツールとの違い

[[spec-kit|GitHub Spec Kit]]や[[openspec|OpenSpec]]が既存のエディタ・エージェントの上に乗るツールキット／CLIであるのに対し、KiroはIDEそのものとして提供される。steeringやagent hooksのように、仕様以外のプロジェクト文脈や自動化までIDEの機能として統合している点が構成上の違いにあたる。

## 出典

- [Kiro公式サイト](https://kiro.dev/)
- [Introducing Kiro - Kiro Blog](https://kiro.dev/blog/introducing-kiro/)
- [Feature Specs - Kiro Docs](https://kiro.dev/docs/specs/feature-specs/)
- [Steering - Kiro Docs](https://kiro.dev/docs/steering/)
- [Hooks - Kiro Docs](https://kiro.dev/docs/hooks/)
- [Kiro IDE Developer Guide: Specs, Hooks, Agents & Pricing - Lushbinary](https://lushbinary.com/blog/kiro-ide-developer-guide-specs-hooks-agents-pricing/)

#llm #ai-agent #spec駆動開発 #aws
