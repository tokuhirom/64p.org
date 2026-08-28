---
created: 2026-08-10 22:46
updated: 2026-08-28 18:20
---
# grill-me

Claude Code用の[[skill-md|Agent Skill]]の一つ。Matt Pocock氏が開発し、「Skills For Real Engineers」に含まれるスキル。 #claude-code

## 仕組み

わずか数行の指示文で構成されるシンプルなスキルで、AIに対して「あらゆる側面について徹底的に質問を投げかけ、設計の意思決定ツリーを枝分かれの先まで辿り、各質問に推奨回答も提示する」よう指示する。曖昧な計画・設計案から、隠れた前提や未決定事項をあぶり出し、実装可能なレベルまで詰めていくのが狙い。

## 使い方

- `/grill-me` コマンドを使い、ざっくりした要件やアイデアを渡す
- AIが一度に1つずつ質問を投げかけ、選択肢とAIのおすすめ回答を提示する
- ユーザーが回答を重ねていくことで要件・設計が固まっていく(対話は通常15〜24往復程度)
- コード自体から分かることはAIが自分でコードベースを調べて済ませ、人間には聞かない

## 特徴

通常のPlanモード(計画→実装の一方向)と違い、AIとの対話を通じて段階的に計画を構築していく感覚に近い。対話履歴自体がそのまま実装計画となり、シームレスに実装フェーズへ移行できる。

## 出典

- [grill-me スキルがめちゃ良いので布教したい - Zenn](https://zenn.dev/ryonakae/articles/8783c6b3ead2cb)
- [grill-me | Skills Marketplace · LobeHub](https://lobehub.com/ja/skills/svyatov-agent-toolkit-grill-me)
- [grill-me のインストールと使い方 - Agent Skills Finder](https://agentskillsfinder.com/skills/grill-me)
