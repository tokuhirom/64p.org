---
created: 2026-08-27 16:34
updated: 2026-08-27 16:34
---
# 非対話型確認プロトコル(CLIにおける破壊的操作の安全機構)

AIエージェントが操作するCLIで、削除・デプロイ・本番変更のような破壊的操作をどう安全に確認させるかという設計パターン。[[ai-friendly-cli-design|AI friendlyなCLIの作り方]]の中でも触れた「対話プロンプトを排除する」を掘り下げたもの。

## 問題: 対話的確認プロンプトはエージェントを無力化する

`(y/n)`のような対話的確認プロンプトは、人間には安全弁として機能するが、AIエージェントは応答できず、入力待ちのままハングして実行が止まる。"An agent cannot type 'y' at a confirmation prompt. If your CLI hangs waiting for input, the agent's workflow is dead."という指摘が象徴的。単純に確認プロンプトを消すと今度は安全性が失われるため、確認そのものを「非対話的に構造化された形」へ作り替える必要がある。

## 構成要素

### 1. dry-run/check系フラグで変更内容を事前提示する

実際の変更を加えずに影響をプレビューする。理想的には自然言語の説明ではなく、構造化された差分(JSON diff等)で提示する。

実例としてAnsibleには2段階のフラグがある。

```sh
ansible-playbook nginx.yml --syntax-check   # 構文検証のみ、実行しない
ansible-playbook nginx.yml --check --diff   # dry-run。実際に変更される内容を差分表示
```

### 2. 非対話バイパスフラグで明示的にスキップさせる

`--yes`/`--force`/`--no-confirm`などのフラグで確認プロンプトを完全に迂回できるようにする。TTYでない場合に自動でこのモードへ倒す設計と、常に明示的なフラグを要求する設計の両方がある。

Hugging Faceの`hf` CLIでは、エージェントモードで削除などの破壊的操作を実行しようとすると対話プロンプトを出さずに即座に失敗し、エラーメッセージに"Use --yes to skip confirmation"という具体的な修正案を含める。エージェントは次に何をすべきかをエラー文面から機械的に読み取れる。

### 3. 2段階の非対話確認プロトコル(Arcjetのパターン)

`--yes`による全面バイパスだけでは、エージェントの誤った判断や幻覚をそのまま実行してしまうリスクが残る。Arcjetが提案するのは以下の2段階構成。

1. 通常実行時はまず`confirmation_required`状態を構造化(JSON)で返し、実際の変更は行わない。
   ```json
   {
     "status": "confirmation_required",
     "confirmCommand": "arcjet rules update ... --confirm"
   }
   ```
2. 人間(または上位のオーケストレーター)がその内容を確認した上で、明示的に`--confirm`フラグを付けて同じコマンドを再実行して初めて変更が適用される。

`--yes`が「常に確認をスキップする」フラグなのに対し、こちらは「今回提示された具体的な変更内容に対して確認する」という一回性の承認に近い。

### 4. 冪等性(idempotency)でリトライの二重実行を防ぐ

エージェントはタイムアウトや通信エラーで同じコマンドを再実行することがある。確認プロトコルと組み合わせて、操作自体を冪等にしておく必要がある。

- Hugging Face `hf` CLIの`--exist-ok`: 既にリポジトリが存在する場合、作成コマンドを失敗させずno-opにする。
- 汎用的なパターンとして`--idempotency-key`引数を持たせ、同じキーでの再実行はサーバー側でキャッシュされた結果をそのまま返し、実際の処理を二重に適用しない。

### 5. 環境検出で挙動を切り替える

TTY判定に加えて、`CLAUDECODE`のようなエージェント固有の環境変数を検出し、出力形式や確認フローを切り替える設計もある(`hf` CLIの例: 人間向けはANSI色付き整形表、エージェント向けはTSV形式でフル値・トークン軽量)。

### 6. 意味づけされた終了コード(semantic exit code)

`0`=成功、`1〜2`=修正可能なエラー、`3〜125`=アプリケーション固有のエラー、といった分類をすることで、エージェントが標準出力を解析せず終了コードだけで次のアクションを機械的に決定できるようにする。

## より広い文脈: 多層防御の一部として

CLI側の確認プロトコルは唯一の防衛線ではなく「defense in depth」の一層と位置づけられる。上位層として、エージェントに発行する認証情報自体をタスク単位でスコープ制限する(カレンダー読み取りエージェントにCRM書き込み権を持たせない等)、セッション満了で自動失効させる、といった認可レベルでの制御と組み合わせるべきという指摘もある。

## 出典

- [Designing a CLI for AI Agents - Arcjet](https://blog.arcjet.com/designing-a-cli-for-ai-agents/)
- [Keep the Terminal Relevant: Patterns for AI Agent Driven CLIs - InfoQ](https://www.infoq.com/articles/ai-agent-cli/)
- [Designing the hf CLI as an agent-optimized way to work with the Hub - Hugging Face](https://huggingface.co/blog/hf-cli-for-agents)
- [Writing CLI Tools That AI Agents Actually Want to Use - DEV Community](https://dev.to/uenyioha/writing-cli-tools-that-ai-agents-actually-want-to-use-39no)
- [How to manage API keys, tokens, and secrets for AI agents - WorkOS](https://workos.com/blog/ai-agent-secrets-management)

#cli #ai-agent
