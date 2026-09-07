---
created: 2026-09-07 23:30
updated: 2026-09-07 23:30
---
# mise

Jeff Dickey（[@jdx](https://github.com/jdx)）が開発しているRust製の開発環境マネージャ。読みは「ミーズ」。ツールのバージョン管理・環境変数・タスクランナー・マシンのセットアップを`mise.toml`1枚に集約する。MITライセンス、GitHubは[jdx/mise](https://github.com/jdx/mise)（33.6k star、2026-09時点）、リポジトリのタグラインは "dev tools, env vars, task runner"。

名前はフランス語の料理用語「mise en place」（下ごしらえ、あるべきものをあるべき場所に）から。料理を始める前に材料を揃えるのと同じように、`mise.toml`がそのプロジェクトで作業を始めるために必要なツール・設定・コマンドを記述する、という発想。

## rtxからの改名

もともと`rtx`という名前だった。2024年1月に`mise`へ改名されている。作者いわく`rtx`は暫定のつもりの名前でそのまま定着してしまったもので、もっとユーザーが少ないうちに変えるべきだった、とのこと。移行では`.rtx.toml` → `mise.toml`、`RTX_*` → `MISE_*`、`.rtx`/`.config/rtx` → `.mise`/`.config/mise`といったリネームが必要だった。

改名と同時に、単なるポリグロットのバージョンマネージャから「開発環境のフロントエンド」へとスコープを広げ、タスクランナーと環境変数管理を取り込んでいる。

## 守備範囲

現在のmiseは4つの領域をカバーする。

1. **開発ツール** — ランタイムやCLIツールのインストールと、プロジェクトごとのバージョン選択。
2. **環境変数** — プロジェクト固有の変数、dotenvの読み込み、Python virtualenvの有効化など。
3. **タスク** — build/test/lintなどのコマンドに名前を付け、依存関係を持たせる。
4. **マシンのセットアップ（bootstrap）** — システムパッケージ・dotfiles・サービスの宣言。

全部入れる必要はなく、ツール1個・タスク1個から始めて同じファイルに足していける、という段階的な導入を推している。

## mise.toml

```toml
[tools]
node = "24"

[env]
NODE_ENV = "development"

[tasks.hello]
description = "Check that task execution works"
run = "echo hello from mise"
```

主なコマンド。

- `mise use node@24` — インストールしつつ`mise.toml`にバージョンを書く。
- `mise install` — 設定に書かれたツールを入れる。
- `mise exec`（`mise x`） — シェルを汚さずに特定バージョンでコマンドを実行する。
- `mise run <task>` — タスクを実行する（プロジェクトのツールと環境を読み込んだ状態で）。

## activate方式とshim方式

ツールをPATHに載せる方法が2つある。

- **`mise activate`** — シェルのrcに`eval "$(mise activate zsh)"`のような行を入れ、プロンプトが出るたびにPATHと環境変数を更新する。ツールの実体パスが直接PATHに乗るので、以降の呼び出しはmiseを経由しない。対話シェルではこちらが推奨。
- **shim** — `~/.local/share/mise/shims`にコマンドのエントリポイントを置き、実行時にバージョンを解決する。エディタやIDEのように「安定した実行ファイルパス」を要求する相手に使う。activateの機能の一部が使えない。

どちらも入れず`mise exec` / `mise run`で明示的に包む運用も可能。

## asdfとの違い

[asdf](https://asdf-vm.com/)の後発互換として始まった経緯があり、比較されることが多い。

- **解決のタイミング** — asdfは呼び出しのたびにshimを通してバージョンを解決する。miseはプロンプトやディレクトリ移動のタイミングでPATHを更新し、以降は実体パスを直接叩く。この差が体感速度に効く。
- **Rust実装** — asdfのshell実装に対しmiseはRustで書き直されている。
- **`.tool-versions`互換** — asdfの`.tool-versions`を読める。`nodejs`/`golang`といった旧来のツール名も認識する（ネイティブのTOMLでは`node`/`go`）。ただし完全なエミュレーションではない。同じディレクトリに両方あれば`mise.toml`が優先される。
- **プラグインへの依存が少ない** — asdfのプラグインは操作のたびにシェルコードを実行するため、メンテナを信頼する必要がある。miseは多くのツールを組み込みバックエンドで直接ダウンロードでき、その信頼を必要としない。

## バックエンドとレジストリ

miseは「どこからバイナリを取ってくるか」をバックエンドとして抽象化している。asdfやvfoxのプラグインも使えるが、それらのCLI自体は使わずRustで再実装している。

- **署名付きマニフェスト**: packslip
- **キュレーションされたレシピ**: aqua（aquaレジストリのエントリを使う。aqua CLIは不要）
- **リリースアセット**: github / gitlab / forgejo
- **直接ダウンロード**: http / s3
- **言語のパッケージ**: cargo / go / npm / pipx / gem / dotnet / spm
- **バイナリのエコシステム**: conda / pkgx
- **プラグイン定義**: vfox / asdf
- **非推奨**: ubi

`node`や`python`のような一般的なツールは[レジストリ](https://mise.jdx.dev/registry.html)にショートハンドが登録されていて、`mise use node@24`のように書けばおすすめの取得元が選ばれる。レジストリに無いツールもバックエンドを明示すれば使える。

### packslip

比較的新しい仕組みで、ツールのメンテナが署名付きのリリースマニフェストを公開し、mise側がそれを検証してインストールする。

```sh
mise use packslip:github.com/jdx/hk
```

miseは公開者の署名・要求したプロジェクトとバージョン・選ばれたダウンロードのdigestとサイズを検証してから展開する。署名は鍵ベース（minisign形式）とkeyless（OIDC証明書）の両方に対応し、リリースを独立に承認するstamperサービスとも連携できる。Packslip自体を別途インストールする必要はない。

## mise.lock

`mise.toml`の要求（`node = "24"`のような幅のある指定）が実際にどのバージョンに解決されたかを記録するロックファイル。対応バックエンドではアーティファクトのURL・チェックサム（SHA256またはBlake3）・検証メタデータ、プラットフォームごと（`macos-arm64`, `linux-x64`など）の情報も残る。

```toml
[settings]
lockfile = true
```

`mise.toml`と`mise.lock`の両方をコミットすれば、他のマシンやCIで同じバージョンが入る。CIでは`MISE_LOCKED=1`にすると、現在のプラットフォーム向けのエントリがロックファイルに無い場合にインストールを失敗させられる。

## 環境変数

`[env]`テーブルでプロジェクト固有の環境変数を宣言する。`mise exec`・タスク・activate済みの対話シェルに供給される。

- `_.file` — dotenv/JSON/YAML/TOMLのファイルから読み込む（配列で複数可）。
- `_.source` — bashスクリプトを実行してexportされた変数を取り込む。
- `_.path` — PATHに追加するディレクトリ。相対パスは`config_root`基準。
- `redact = true` — タスク出力でのマスク。値にはTeraテンプレートや`${VAR:-default}`のようなシェル風展開も使える。

なお[direnv](https://direnv.net/)との併用は現在**非サポート**扱いになっている。両者ともディレクトリ移動時に環境を書き換えるため、どのPATHエントリを追加・復元・削除するかでシェルフックが食い違う。`use mise`（`.envrc`からmiseを呼ぶ）方式のドキュメントは残っているが非推奨で、mise単体でのactivateが推奨されている。

## タスク

`make`の代わりに使える軽いタスクランナー。定義方法は2通り。

```toml
[tasks.hello]
description = "Check that task execution works"
run = "echo hello from mise"

[tasks.check]
depends = ["format", "test"]
```

もう一つは`mise-tasks/`ディレクトリに置くファイルタスクで、普通のスクリプトの先頭に`#MISE`コメントでメタデータを書く。

```bash
#!/usr/bin/env bash
#MISE description="Check that task execution works"
echo "hello from a file task"
```

短いコマンドはTOML、複雑になってきたらファイルへ、という使い分けが案内されている。`depends`の前提タスクは**並列に走りうる**ので、順序を保証したければ`run`を配列にする。`mise run <task>`はシェルのactivateなしでも動き、設定されたツールのインストールと環境の読み込みを先に済ませてくれる。タスクには`MISE_CONFIG_ROOT`・`MISE_PROJECT_ROOT`（monorepoで有用）・`MISE_TASK_NAME`が渡る。

## bootstrap

マシンそのもののセットアップを宣言する領域。システムパッケージ（apk/apt/AUR/dnf/pacman/brew/mas）、Linuxのユーザーとグループ、systemd/launchdのサービス、Docker Composeのプロジェクト、リポジトリのclone、dotfilesなどを`mise.toml`に書いて`mise bootstrap`で適用する。

dotfilesについてはsymlink・生成（テンプレート）に加えて、2026.9.2で追加された自動双方向同期のtrackモードがある。詳細は[[mise-dotfiles]]を参照。

## このリポジトリでの使い方

64p.orgでは[[lefthook]]のバージョン固定に使っている。

```toml
[tools]
lefthook = "2.1.10"
```

```sh
mise install
mise exec -- lefthook install
```

## 出典

- [mise-en-place 公式ドキュメント](https://mise.jdx.dev/)
- [jdx/mise - GitHub](https://github.com/jdx/mise)
- [Comparison to asdf | mise-en-place](https://mise.jdx.dev/dev-tools/comparison-to-asdf.html)
- [Backends | mise-en-place](https://mise.jdx.dev/dev-tools/backends/)
- [mise.lock Lockfile | mise-en-place](https://mise.jdx.dev/dev-tools/mise-lock.html)
- [direnv | mise-en-place](https://mise.jdx.dev/direnv.html)
- [rtx -> mise rename - jdx/mise Discussion #1338](https://github.com/jdx/mise/discussions/1338)

#mise #cli #rust #devops
