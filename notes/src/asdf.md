---
created: 2026-09-07 23:35
updated: 2026-09-07 23:35
---
# asdf

複数の言語ランタイム・CLIツールのバージョンをプロジェクトごとに切り替える、プラグイン方式のバージョンマネージャ。nvm・rbenv・pyenv・gvmのような言語ごとのツールを1つのCLIに統合することを狙ったもので、公式のキャッチコピーは "The Multiple Runtime Version Manager"。[@HashNuke](https://github.com/HashNuke)が作り、現在はコミュニティでメンテされている。MITライセンス、[asdf-vm/asdf](https://github.com/asdf-vm/asdf)は25.6k star（2026-09時点）。

## 基本の考え方

- **プラグイン方式** — asdf本体はツールの取得方法を知らない。`asdf plugin add nodejs`のようにプラグインを入れると、そのプラグインが`list-all`・`download`・`install`といったスクリプトを提供してインストールを担当する。プラグインの作成は`asdf-plugin-template`から始められる。
- **`.tool-versions`** — プロジェクトルートに置く1枚のファイルに、使うツールとバージョンをまとめて書く。

  ```
  nodejs 20.11.0
  ruby 3.3.0
  ```

- **既存の設定ファイルも読む** — `.nvmrc`・`.node-version`・`.ruby-version`といった言語ごとの慣習的なバージョンファイルも認識するので、移行しやすい。
- **shim方式** — `~/.asdf/shims`に各コマンドのshimを置き、実行のたびにshimがカレントディレクトリから`.tool-versions`を辿ってバージョンを解決する。bash/zsh/fish/elvishに対応し、GitHub Actionも提供されている。

## Goによる書き直し（0.16.0）

長らくbashスクリプトの集合体だったが、2025年1月30日リリースの**v0.16.0**でGoに書き直された。88本のPRにまたがる作業で、より速く・シンプルで・メンテしやすいコードベースにすることが目的。

- Bashスクリプト群から**単一バイナリ**になった。
- 0.15.0比で操作が2〜7倍速くなった。
- 言語の変更に起因するもの、コードの単純化のためのもの、UX改善のためのものと、複数の理由で破壊的変更が入っている。ディレクトリ構成も大きく変わった。0.16.0の旧bashコードには移行を促す警告が仕込まれた。
- プラグインと既存のバージョンデータについては後方互換が保たれており、そのままアップグレードできる。

## shim方式のコスト

asdfの設計上の特徴であり弱点でもあるのがshim。コマンドを叩くたびにshimを経由してバージョン解決が走るため、呼び出しのオーバーヘッドが積み重なる。この点を主要な差分として打ち出しているのが後発の[[mise]]で、shimではなくプロンプト・ディレクトリ移動のタイミングでPATH自体を書き換え、以降は実体パスを直接叩く方式を取っている（miseもエディタ向けにshimは用意している）。

もう一つ指摘されるのがプラグインの信頼性で、asdfのプラグインは操作のたびにシェルコードを実行するためメンテナを信頼する必要がある。[[aqua]]や[[mise]]はレシピ／レジストリからバイナリを直接ダウンロードする方式でこの信頼を減らしている。

## 後発ツールとの互換関係

- [[mise]]はasdfの`.tool-versions`を読め、asdfプラグインもサポートする（Rustでの再実装であり、asdf CLI自体は使わない）。`nodejs`/`golang`のような旧来のツール名も認識する。
- [[aqua]]はプラグインではなくYAMLのレジストリでツール定義を集中管理する方式で、asdfとは設計が異なる。

## [[cli-version-managers]]の中での位置づけ

この領域の原点にあたるツール。`.tool-versions`とプラグインという2つの発明が後発ツールの前提になっており、[[mise]]は`.tool-versions`とasdfプラグインの両方に互換性を持たせている。一方で「shimを毎回通す」「プラグインがシェルコードを実行する」という設計が、[[mise]]（PATH書き換え）や[[aqua]]（レジストリ方式・外部コマンドを実行しない）が差別化する出発点になっている。

## 出典

- [asdf 公式サイト](https://asdf-vm.com/)
- [asdf-vm/asdf - GitHub](https://github.com/asdf-vm/asdf)
- [Release v0.16.0 - asdf-vm/asdf](https://github.com/asdf-vm/asdf/releases/tag/v0.16.0)
- [Asdf Has Been Re-Written in Golang - Stratus3D](http://stratus3d.com/blog/2025/02/03/asdf-has-been-rewritten-in-go/)
- [Comparison to asdf | mise-en-place](https://mise.jdx.dev/dev-tools/comparison-to-asdf.html)

#cli #golang #devops
