---
created: 2026-09-01 23:36
updated: 2026-09-01 23:40
---
# spec駆動開発 (Spec-Driven Development)

コードではなく**仕様（spec）を第一級の成果物として扱い、コードはそこからのビルド出力とみなす**開発手法。`.c`ファイルをコンパイルしてバイナリを得るのと同じ関係を、Markdownの仕様書とソースコードの間に置く、という比喩でよく説明される。

[[vibe-coding]]に代表されるLLMを使った開発の失敗モード——エージェントが一見もっともらしいコードを出すが、意図から徐々にずれていき、存在しないAPIを呼び、プロジェクトが大きくなるほど破綻する——への対処として、2025年に立ち上がった。「コードを生成するのは安くなったが、正しさは依然として高い」というのが共通の問題意識にあたる。

## 従来のドキュメント駆動との違い

仕様書を先に書くこと自体は新しくないが、spec駆動開発では仕様が「書いて終わりのドキュメント」ではなく**リポジトリ内に置かれ、エージェントが毎回参照する実行時のコンテキスト**である点が異なる。仕様はGitで管理され、コードと一緒にレビュー・更新される。人間側にとってはレビュー対象がコードから仕様に前倒しされる、という効果もある。

## 典型的なワークフロー

ツールによって細部は違うが、おおむね次の段階を踏む。

1. 何を作るかを自然言語で記述する（要件・ユーザーストーリー）
2. 技術的な設計に落とす
3. 依存関係を考慮した順序付きタスクに分解する
4. エージェントにタスクを実装させる
5. 実装が仕様と一致しているか検証し、仕様を確定させる

段階を厳密なゲートとして強制するか、緩く行き来できるようにするかが、ツールごとの思想の分かれ目になっている。

## 主な実装

- **[[spec-kit|GitHub Spec Kit]]** — `constitution`（プロジェクトの不可侵な原則）を最初に定め、`specify → plan → tasks → implement`と逐次的に進む。ガードレールが強い。
- **[[openspec|OpenSpec]]** — フェーズゲートを強制せず、現状の振る舞いに対する**差分（spec delta）**として変更を書く。既存コードベース（ブラウンフィールド）優先。
- **[[kiro|Kiro]]** — AWSがこの語を早期に打ち出したagentic IDE。2025年7月14日にパブリックプレビュー公開、2026年5月GA。仕様を「super-prompt」と位置づけ、spec → design → tasksという構成を採る。

2026年時点では主要なAIコーディングツールがそれぞれ独自のspec駆動の流儀を持っている状況で、上記のほかBMAD、Tessl、Google Antigravityなども挙げられる。

## [[skill-md|SKILL.md]]との関係

[[skill-md|SKILL.md]]や`AGENTS.md`が「エージェントにどう作業させるか（手順・規約）」を渡すのに対し、spec駆動開発の仕様は「何を作るか（プロダクトの意図）」を渡す。レイヤーが違うため併用される。

## 出典

- [spec-kit/spec-driven.md - GitHub](https://github.com/github/spec-kit/blob/main/spec-driven.md)
- [Diving Into Spec-Driven Development With GitHub Spec Kit - Microsoft for Developers](https://developer.microsoft.com/blog/spec-driven-development-spec-kit/)
- [Spec-driven development, Back to the Future?!](https://jeromevdl.medium.com/spec-driven-development-back-to-the-future-d71fde8d47cf)
- [Kiro: Your agentic IDE for spec-driven development - AWS re:Invent 2025](https://dev.to/kazuya_dev/aws-reinvent-2025-kiro-your-agentic-ide-for-spec-driven-development-dvt209-12gd)

#llm #ai-agent #spec駆動開発
