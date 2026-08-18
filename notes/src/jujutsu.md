---
created: 2026-08-18 16:30
updated: 2026-08-18 20:36
---
# Jujutsu (jj)

コマンド名は`jj`。Googleのエンジニア Martin von Zweigbergk が中心となって開発している、Gitと互換性のある次世代バージョン管理システム。Google公式のサポート製品ではなく、コミュニティ主体で開発されている。ライセンスはApache 2.0のOSS。

## Gitとの互換性

`jj`はGitと同じ`.git`ディレクトリをストレージ層としてそのまま読み書きする。そのため`jj`で作成したコミットは実体としては通常のGitコミットであり、GitHubへのpush・PR作成・CI・ブランチ保護なども普段通り機能する。チーム内で自分だけ`jj`を使い、他のメンバーは通常の`git`コマンドを使い続ける、という移行リスクゼロの併用が可能とされている。

## Gitとの設計上の違い

- **ワーキングコピー自体がコミット** — Gitのようなstaging area（index）やstashという概念がなく、作業ディレクトリの変更は常に「現在のコミット」として扱われる。
- **コンフリクトがファーストクラスのオブジェクト** — マージ・rebase時のコンフリクトをコミットの一部として記録でき、後から柔軟に解消できる。Gitのようにマージが失敗して作業が止まる、という状態にならない。
- **完全な操作ログ（operation log）** — ほぼ全ての操作をundoできる。
- **自動rebase** — 履歴の途中のコミットを書き換えると、その子孫コミットが自動的に追従してrebaseされる。

設計思想としては、Git（データモデル・速度）、[[mercurial|Mercurial]]（匿名ブランチ、indexのないシンプルなCLI、revset、強力な履歴書き換え）、[[pijul|Pijul]]/[[darcs|Darcs]]（コンフリクトのファーストクラス化）の要素を組み合わせたものとされている。

## エコシステムでの対応状況

diffビューアの[[hunk-cli|hunk]]はGit/Jujutsu/[[sapling|Sapling]]に対応しており、jj環境では自動検出してネイティブのrevsetを使う機能を持つ。こうしたツール側の対応が進んでいることからも、Git互換VCSとして一定の認知が進んでいることがうかがえる。

## [[distributed-vcs-alternatives|Gitに代わる分散バージョン管理システム]]の中での位置づけ

Gitのデータモデルをそのまま使いつつUI/UXだけを作り直す「Git互換レイヤー系」の一つ。同系統の[[sapling|Sapling]]がMercurial由来のスタック型ワークフローを引き継ぐのに対し、JujutsuはMercurial・[[pijul|Pijul]]/[[darcs|Darcs]]など複数のツールの要素を組み合わせた独自設計という違いがある。

#git #vcs

## 出典

- [jj-vcs/jj - Jujutsu—a version control system](https://github.com/jj-vcs/jj)
- [Jujutsu (jj): Git-Compatible Version Control [2026]](https://www.kunalganglani.com/blog/jujutsu-jj-git-version-control)
- [Jujutsu (jj) is Google's GIT compatible VCS - hitechist](https://hitechist.com/jujutsu-jj-is-googles-git-compatible-vcs/)
- [Jujutsu (jj), a git compatible VCS - Tony Finn](https://tonyfinn.com/blog/jj/)
