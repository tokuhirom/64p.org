---
created: 2026-08-09
updated: 2026-08-09
---
# lefthook

#git #perl

Git hooks(pre-commit等)を管理するツール。このリポジトリでもnotesのfrontmatter(`created`/`updated`)自動付与のために導入している(後述)。

## 概要

- 開発元は [Evil Martians](https://evilmartians.com/)（Rails周りで有名なコンサル企業）。Go製で、単一の依存フリーバイナリとして配布される。
- Ruby gem、npm、Go、Python、Swift、Homebrew、各種Linuxパッケージマネージャー(deb/rpm/apk/pacman)、Wingetなど、多様なパッケージマネージャー経由でインストールできる。
- ライセンスはMIT。GitHub star数は8.6k程度(2026-08時点)。
- 公式サイトのキャッチコピーは "Fast. Powerful. Simple." の3語。

## 主な特徴

- **設定はYAML1枚**: リポジトリルートの`lefthook.yml`にhook名(`pre-commit`, `commit-msg`, `pre-push`など)ごとにコマンドを書く。
- **並列実行**: 複数のジョブ(lintやtestなど)を並列で走らせて高速化できる。
- **glob/ファイルフィルタ**: `glob: "*.rb"`のように、変更されたファイルの種類ごとにコマンドを分けて実行できる。ステージされたファイルのみ(`{staged_files}`)、変更ファイル全体(`{all_files}`)などをプレースホルダで渡せる。
- **Docker対応**: コマンドをDockerコンテナ内で実行することも可能。
- **単一バイナリ**: Node.jsやRubyのランタイムに依存しない(Huskyのようにnpmパッケージとして入れることもできるが、本体はGo製バイナリ)。

## Huskyなど類似ツールとの違い

- npmエコシステム限定の[Husky](https://typicode.github.io/husky/)と違い、言語非依存で使える。
- `pre-commit`(Pythonのpre-commit framework)と比較されることが多いが、lefthookは設定がYAML1枚で完結し、並列実行やDocker実行など「速度」寄りの機能を前面に出しているのが特徴。

## このリポジトリでの使い方

`mise.toml`でバージョン固定して導入している。

```toml
[tools]
lefthook = "2.1.10"
```

```sh
mise install
mise exec -- lefthook install
```

`lefthook.yml`の設定:

```yaml
pre-commit:
  commands:
    notes-dates:
      glob: "notes/src/*.md"
      run: perl update-note-dates.pl {staged_files}
```

`notes/src/*.md`がステージされたときだけ`update-note-dates.pl`を実行し、以下を行っている。

1. 新規ノートなら`created`/`updated`、既存ノートなら`updated`のみをYAML frontmatterに書き込む。
2. `regen-index.pl`を実行してHTMLを再生成。
3. 生成物(`notes/`, `index.html`, `talks/index.html`)を`git add`してコミットに含める。

ファイルのmtimeには依存せず、frontmatter自体を正として日付を管理している。新規clone時やCI環境ではmtimeが信用できない(checkout時刻になってしまう)ため、この設計にしている。

## 出典

- [Lefthook 公式サイト](https://lefthook.dev/)
- [evilmartians/lefthook - GitHub](https://github.com/evilmartians/lefthook)
- [Ditch Husky: Speed Up Git Hooks with Lefthook - DEV Community](https://dev.to/recca0120/ditch-husky-speed-up-git-hooks-with-lefthook-hkm)
