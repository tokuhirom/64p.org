---
created: 2026-08-10 22:46
updated: 2026-09-07 02:33
---
# grill-me

Claude Code用の[[skill-md|Agent Skill]]の一つ。Matt Pocock氏が開発し、「Skills For Real Engineers」(`mattpocock/skills`)に含まれるスキル。ざっくりした計画・設計案をAIに質問攻めにさせて、隠れた前提や未決定事項をあぶり出し、実装可能なレベルまで詰めていくのが狙い。 #claude-code

## 2ファイル構成

現在のリポジトリでは、入口の`grill-me`と本体の`grilling`に分かれている。

`skills/productivity/grill-me/SKILL.md`は実質ディスパッチャで、中身はこれだけ。

```markdown
---
name: grill-me
description: A relentless interview to sharpen a plan or design.
disable-model-invocation: true
---

Call the Skill tool with "grilling".
```

`disable-model-invocation: true`が付いているので、AIが勝手に発動することはなく、ユーザーが`/grill-me`と打ったときだけ起動する。実際の指示文は`skills/productivity/grilling/SKILL.md`側にある。

## 設計ツリーとfrontier

`grilling`の指示の中心にあるのが、決定を**design tree**(設計ツリー)として捉える考え方。ある決定は、その下にぶら下がる別の決定へと枝分かれしていく。

その上で、質問を**round**(ラウンド)単位で投げる。

- **frontier** = 前提となる決定がすでに片付いている決定の集合。つまり「まだ聞いていない答えを推測しなくても、いま聞ける質問」。
- 1ラウンドでfrontier全体をまとめて聞き、ユーザーの回答を待つ。
- 回答が返るとツリーの状態が変わり、frontierが外側へ押し広げられて、依存していた質問が解禁される。再計算して次のラウンドへ。
- 同じラウンド内の未解決の質問に答えが依存する質問は、そのラウンドではなく**後のラウンド**に属する。

frontierが空になった時点、つまり設計ツリーの全ての枝を辿り終えた時点でセッション完了。「暗黙のうちに仮定したまま」の箇所を残さない。そしてユーザーが「共通理解に達した」と確認するまでは実装に着手しない。

## 出力フォーマット

質問は番号付きで、AIの推奨回答(`➡️`)とセットで提示される。フォーマットまでSKILL.mdで指定されている。

```
❓ **Q1** - **<question title>**: <question body, might be multiple paragraphs, including multiple choices>

➡️ <your recommended answer>

---

❓ **Q2** - **<question title>**: <question body, might be multiple paragraphs, including multiple choices>

➡️ <your recommended answer>
```

## 事実調査はAI、意思決定は人間

指示文にはっきり書かれている役割分担。

- **事実(facts)を見つけるのはAIの仕事であり、決してユーザーの仕事ではない**。frontierの質問が環境(ファイルシステム・ツール等)からの事実を必要とするなら、サブエージェントを飛ばして自分で調べる。自分で調べられることを人間に聞かない。
- ただしサブエージェントの完了待ちでブロックはしない。走っている調査は「未解決の前提」扱いなので、その下流の質問だけが待ち、残りのfrontierは今すぐ聞く。
- **決定(decisions)はユーザーのもの**。一つ一つ提示して回答を待つ。

## 使い方

- 新しい会話で`/grill-me`を起動し、ざっくりした要件やアイデアを渡す。「まだ仕様は固まっていないが真面目に検討する価値のあるアイデア」が対象で、曖昧なままでよい。
- ファイルもワークスペースの成果物も作らない。思考を明確にするだけのステートレスなスキルで、対象はコードでなくてもよい。
- ドキュメント側では「受け身にならないこと」が強調されている。40問に「賛成、賛成、賛成」と答え続けると、意思決定が実質存在しない計画が出来上がる。ピントの外れた質問には押し返す、分からないことは「分からない」と言う、というのは失敗ではなく想定された使い方。
- スコープの境界を決めるのはユーザー側。200問を超えるような長丁場になった場合は、生産的な探索というよりスコープが大きすぎるサインとされている。
- プロトタイプを作らないと答えられない類の「grillできない質問」も存在する。

## 特徴

通常のPlanモード(計画→実装の一方向)と違い、AIとの対話を通じて段階的に計画を構築していく感覚に近い。対話履歴自体がそのまま実装計画となり、シームレスに実装フェーズへ移行できる。

## 出典

- [skills/productivity/grill-me/SKILL.md - mattpocock/skills](https://github.com/mattpocock/skills/blob/main/skills/productivity/grill-me/SKILL.md)
- [skills/productivity/grilling/SKILL.md - mattpocock/skills](https://github.com/mattpocock/skills/blob/main/skills/productivity/grilling/SKILL.md)
- [docs/productivity/grill-me.md - mattpocock/skills](https://github.com/mattpocock/skills/blob/main/docs/productivity/grill-me.md)
- [grill-me スキルがめちゃ良いので布教したい - Zenn](https://zenn.dev/ryonakae/articles/8783c6b3ead2cb)
