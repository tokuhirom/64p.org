---
created: 2026-09-16 04:51
updated: 2026-09-16 04:51
---
# herdr plus

[[herdr]]のワークスペース構築を宣言的なTOMLに落とすためのプラグイン。Cloudmanic Labs製、MITライセンスで無料。herdr 0.7.0以降が必要で、`herdr plugin install cloudmanic/herdr-plus`で入る。

herdr本体はエージェントのPTYを束ねるマルチプレクサに徹しており、「どのタブでどのエージェントを起動するか」の組み立ては手作業になる。そこを埋める位置づけで、機能は**Projects**と**Quick Actions**の2つ。

## Projects — tmuxinator相当のワークスペーステンプレート

タブ・ペイン構成をTOMLで宣言しておくと、フルスクリーンのfuzzyブラウザから選ぶだけでワークスペースが丸ごと立ち上がる。設定は herdr のプラグイン設定ディレクトリ配下の`projects/`に1プロジェクト1ファイルで置く。

```toml
name = "Options Cafe"
description = "The main options.cafe monorepo"
working_dir = "~/Development/options-cafe/options.cafe"

[[tabs]]
name = "claude"
command = "claude --dangerously-skip-permissions --chrome"

[[tabs]]
name = "lazygit"
command = "lazygit"
```

発想自体はtmuxinatorやteamocilと同じだが、タブの`command`にエージェントCLIをそのまま置けるのが今の文脈での意味。「このリポジトリを開く = Claude Codeとlazygitとdev serverが所定の配置で立つ」を1キーにできる。

## git worktreeとして開ける

プロジェクトブラウザ上で`Enter`は通常のワークスペース、**`ctrl+g`で同じプロジェクトをgit worktreeとして開く**。ブランチ名の入力は任意で、

- 空にすると`worktree/...`が自動生成される
- `/`を含まない名前には`[worktree]`の`branch_prefix`が付く
- `/`を含む名前はそのまま使われる

さらに`worktree.created` / `worktree.opened`イベントにフックして、worktreeが作られた/開かれた瞬間にプロジェクトのタブレイアウトを流し込む設定もある(レイアウトごとにon/off可)。設定は`worktrees/`サブディレクトリ。

## Quick Actions — パラメータ付きのfuzzyランチャ

よく叩く一発コマンドのfuzzyランチャで、**起動したディレクトリで実行される**。`quick-actions/`に置く。アクションは3タイプ。

- `command` — ただのシェルコマンド
- `select` — 選択肢を出して`{{.Value}}`に埋める
- `form` — 入力を求めてテンプレートに埋める

```toml
name = "Open Repo"
type = "select"
command = "open https://github.com/cloudmanic/{{.Value}}"

[[options]]
label = "Herdr Plus"
value = "herdr-plus"
```

`select`/`form`があるので、引数が毎回少し違ってシェルのエイリアスにしづらかったコマンドを登録先にできる。シェル関数との実質的な差はこの部分。

## リポジトリ同梱の`.herdr-plus/`

グローバル設定とは別に、リポジトリ直下の`.herdr-plus/`ディレクトリに置いたアクションは、そのリポジトリにいるときだけ候補に出る。リポジトリ固有の操作をチームに配れる。

## [[herdr]]の中での位置づけ

herdr本体はマルチプレクサとしての役割に絞り、周辺機能はプラグインに出す設計になっている。ペイン内にブラウザを出す[[herdr-browser]]と同じく、herdr plusもその一つ。

特に効くのがworktree連携で、[[orca|Orca]]との比較で「herdrはセッション永続化が主眼、Orcaはタスクごとのworktree自動生成による環境隔離が主眼」と整理される差分を、本体の機能追加ではなくプラグイン側から埋めにきている格好になる。エージェントを並列で走らせると各タスクを別worktreeに隔離したい要求は必ず出るので、そこがプラグインで足せる。

なおherdr本体はRust製だが、herdr plusはGo製(Windowsでビルドする場合はGoツールチェーンがPATHに必要)。プラグインは別バイナリとして動くため、実装言語は本体と揃っていなくてよい。

#claude-code #tmux #git

## 出典

- [herdr plus — Supercharge herdr.](https://herdrplus.com/)
- [herdr plus ドキュメント](https://herdrplus.com/docs/)
- [GitHub - cloudmanic/herdr-plus](https://github.com/cloudmanic/herdr-plus)
- [Plugins | herdr](https://herdr.dev/docs/plugins/)
