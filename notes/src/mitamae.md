---
created: 2026-08-19 15:26
updated: 2026-09-08 15:08
---
# mitamae

[[itamae|Itamae]]の代替実装(alternative implementation)。[[mruby]]で駆動する、高速・軽量・単一バイナリの構成管理ツール。MITライセンス。

## 3つの設計目標

READMEが挙げる特徴はそのまま設計上の割り切りになっている。

- **Fast** — ローカル実行に最適化されている。他ツールが1操作ごとにシェルコマンドやSSH接続を経由するのに対し、mitamaeは可能な限り[[mruby]]ライブラリのC関数で処理する。
- **Simple** — Chef Server、Berkshelf、Data Bags、RubyGemsのいずれも不要。coreは本質的な機能だけを提供する。
- **Single Binary** — バイナリ1つを転送すれば動く。MRI(標準Ruby処理系)のインストールも不要。

## 使い方

GitHub Releasesからプラットフォーム向けのバイナリを落として実行するだけ。

```sh
curl -O -L https://github.com/itamae-kitchen/mitamae/releases/latest/download/mitamae-x86_64-linux
chmod +x ./mitamae-x86_64-linux
./mitamae-x86_64-linux help
```

レシピは[[itamae|Itamae]]/Chef風のRuby DSL。

```ruby
# recipe.rb
package 'nginx' do
  action :install
end

service 'nginx' do
  action [:enable, :start]
end
```

```sh
mitamae local recipe.rb
mitamae local recipe.rb --log-level=debug  # 何が実行されているか詳しく見る
```

`directory`, `file`, `template`, `package`, `service`, `user`, `group`, `link`, `execute`, `git`, `http_request`, `remote_file`, `remote_directory`, `local_ruby_block`, `gem_package`といったリソース、Definitions(独自リソース定義)、Including Recipes、Node Attributesの仕様は本家Itamaeに準拠しており、[Itamaeのwiki](https://github.com/itamae-kitchen/itamae/wiki)がそのままドキュメントとして使える。

## Itamaeとの差分

mitamae独自の機能(いずれ本家へポートしたい、とREADMEに書かれているもの)。

- `not_if` / `only_if` にコマンド文字列ではなくブロックを渡せる
- `file` / `remote_file` / `template` に `atomic_update` 属性がある
- `run_command` が `--log-level debug` または `log_output: true` でログをストリームする

## mrubyであることの制約

DSLの土台がMRIではなく[[mruby]]なので、Chefのレシピをそのまま持ってくると詰まる箇所がある。READMEの移行表から主なもの。

| Chef | mitamae |
|:---|:---|
| `ruby_block` | `local_ruby_block` を使う |
| `shell_out!` | `run_command`(`Open3.capture3`や`system`でも可) |
| `Chef::Log.*` | `MItamae.logger.*` |
| `Digest::*.hexdigest` | `sha1sum`などのコマンドで代用 |
| `cookbook_file` | `source`でパスを指定した`remote_file`/`template` |
| `directory` の `recursive true` | mitamaeでは`recursive`がデフォルト |

使えるmruby機能はビルドに組み込まれたmrbgemの範囲に限られる。ERB・JSON・YAML・Dir::glob・Etc・Tempfile・Shellwords・open3・URIあたりはmrbgemとして同梱されている。

## リモートサーバーへの適用

mitamaeにはSSHで入って適用するモード(`itamae ssh`相当)がない。バイナリとレシピをサーバーへ配ってから現地で実行する、という前提の設計になっている。READMEが挙げる方法は2つ。

- **rsync + ssh** — 数台程度なら、rsyncで送ってsshで叩く。これを行うツールとして[hocho](https://github.com/sorah/hocho)がある。SSH越しではあるが、操作ごとにSSH接続を張る`itamae ssh`よりはるかに速い。
- **デプロイツール** — 台数が増える場合は、各サーバーにエージェントを置き、オブジェクトストレージからバイナリとレシピを取得して実行させる。AWS CodeDeployなどが例として挙げられている。

つまり「push型かpull型か」をツール自身が決めず、配布の仕組みは外部に委ねている。

## 実際の利用例

- [ruby/ruby-infra-recipe](https://github.com/ruby/ruby-infra-recipe) — RubyCIサーバーのプロビジョニング
- [ruby/git.ruby-lang.org](https://github.com/ruby/git.ruby-lang.org) — Rubyのgitサーバー
- 個人のdotfilesでローカル環境構築に使う例も多い

## プラグイン

`mitamae-plugin-*`という命名でリソースを追加できる。`cron`、`runit_service`、`deploy_revision`などChefにあってcoreにないリソースはプラグインで補う。Itamae用プラグインでmitamaeに対応しているものもある。

## 対応プラットフォーム

[[serverspec|Serverspec]]と同じ基盤ライブラリ(Specinfra、mitamae側はmruby-specinfra)を使っているため、Serverspecがサポートするすべてのアーキテクチャ・OS向けにバイナリが配布されている。

## [[configuration-management-tools|構成管理ツール]]の中での位置づけ

[[itamae|Itamae]]をmrubyで書き直し、単一バイナリ配布・高速化を実現した派生実装。シンプルさを追求する路線をさらに推し進め、リモート実行の責務すら外部ツールに逃がしている。

#infrastructure-as-code #ruby #mruby

## 出典

- [GitHub - itamae-kitchen/mitamae](https://github.com/itamae-kitchen/mitamae)
- [mitamae README (raw)](https://raw.githubusercontent.com/itamae-kitchen/mitamae/master/README.md)
- [GitHub - eagletmt/mitamae](https://github.com/eagletmt/mitamae)
- [Itamae Wiki](https://github.com/itamae-kitchen/itamae/wiki)
