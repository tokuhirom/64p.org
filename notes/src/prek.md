---
created: 2026-09-05 09:53
updated: 2026-09-05 09:53
---
# prek

Rust製のGit hookマネージャー。Pythonで書かれた[pre-commit](https://pre-commit.com/)のドロップイン代替として設計されている。作者はj178。 #rust #git #cli

pre-commitの`.pre-commit-config.yaml`をそのまま読めるので、`pre-commit`コマンドを`prek`に置き換えるだけで移行できる、というのが基本的な立ち位置。CPython、FastAPI、Apache Airflow、Godot Engine、Home Assistantなどで使われている。

## 特徴

- **単一バイナリ・ランタイム依存なし** — Pythonランタイムを必要としない。インストール経路はインストーラスクリプト(Linux/macOS/Windows)、Homebrew/Scoop/Winget/MacPorts/Conda、pip/uv/pipx、npm/pnpm/bun、cargo、Nix、GitHub Releasesと幅広い。
- **hook環境をリポジトリから切り離して共有** — pre-commitがhookリポジトリごとに環境を作るのに対し、prekはツールチェーンをhook間で共有する。インストール時間とキャッシュサイズが減る。キャッシュのデフォルトは`~/.cache/prek`。
- **並列実行** — リポジトリのfetchとhook環境のセットアップを並列化し、hook自体も優先度に従って並列実行できる。
- **組み込みhook** — `pre-commit-hooks`のよく使われるhookをRustで再実装しており、設定を変えなくても自動でそちらのfast pathが走る。`repo: builtin`でオフラインでも使える。
- **`language_version`のsemver対応** — 指定したバージョンのツールチェーンを自動でインストールする。Python環境の構築には[[uv]]を使う。対応言語はPython、Node.js、Bun、Go、Rust、Ruby。
- **TOML設定** — YAMLの`.pre-commit-config.yaml`に加えて、ネイティブ形式の`prek.toml`が書ける。既存設定からの変換ユーティリティもある。
- **workspace(モノレポ)対応** — サブプロジェクトごとに設定を置いたまま1コマンドで実行できる。同じディレクトリ深さにある独立プロジェクトは並列実行される。
- **hook groups** — hookに`groups: ['ci']`のようなタグを付け、`prek run --group ci` / `--require-group` / `--no-group`で実行対象を選択できる。
- **ファイルマッチ** — 正規表現に加えてglobのリストとしても書ける。
- **CLI** — `prek list`でhook一覧、`prek util identify`でファイルタイプ判定、`prek update`にタグフィルタ・dry-run・cooldownなどがある。実行対象の絞り込みは`--glob` / `--directory` / `--files`、事前確認は`--dry-run`。
- ランタイムのダウンロードは展開前にチェックサム検証される。

## Makefileの代わりに使うという発想

pre-commit系のツールは`local`リポジトリとして任意のコマンドをhookに定義できるので、もともとタスクランナーの器として使える。

```yaml
repos:
  - repo: local
    hooks:
      - id: test
        name: run tests
        entry: pytest
        language: system
        pass_filenames: false
        always_run: true
```

こう書いておけば`prek run test`が`make test`相当になる。prek固有の要素として効いてくるのは以下。

- hook groupsで「lint系」「CI用」「フォーマット系」を1つの設定ファイル内で束ねられる。Makefileのターゲット群に相当する構造が作れる。
- ツールチェーンのインストールまで面倒を見るので、Makefileだと自分で書くことになる「まず依存を入れる」部分が設定に畳み込まれる。
- git hook・CI・ローカル実行が同じ定義を共有する。Makefileとpre-commit設定に同じlintコマンドを二重に書く、という重複が消える。

一方でmake本来の機能を置き換えるものではない。

- ファイルのタイムスタンプ依存関係を見た**増分ビルド**はない。「ターゲットが依存より古いときだけ再ビルドする」というmakeの中核部分は守備範囲外。
- タスクへの**引数渡し**ができない(`make deploy ENV=prod`のようなもの)。
- hookは「変更ファイルのリストを受け取って処理する」モデルが前提なので、汎用タスクにするには`pass_filenames: false`と`always_run: true`を都度書く必要がある。
- 公式ドキュメントもcode hooks frameworkとして位置づけており、汎用タスクランナーを名乗ってはいない。

つまり射程は「ビルドシステムとしてのmake」ではなく、「タスクランナーとして雑に使われているMakefile」の方。

## [[lefthook]]との違い

どちらも単一バイナリのGit hookマネージャーだが、モデルが違う。

- lefthookは`lefthook.yml`に自分でコマンドを書く汎用hookランナー。実行するツールの用意は利用者側の責任。
- prekはpre-commitのエコシステム(`repos:`で外部リポジトリのhookを引いてきて、環境構築ごと任せる)をそのまま使うための互換実装。既存のpre-commit資産があるかどうかで選択が変わる。

## 出典

- [j178/prek — GitHub](https://github.com/j178/prek)
- [prek 公式ドキュメント](https://prek.j178.dev/)
- [Differences from pre-commit — prek docs](https://prek.j178.dev/diff/)
- [Proposal: Hook `groups` + `prek run --group/--no-group` (j178/prek issue #1385)](https://github.com/j178/prek/issues/1385)
