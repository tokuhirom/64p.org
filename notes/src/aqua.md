---
created: 2026-09-07 23:35
updated: 2026-09-07 23:35
---
# aqua

宣言的なCLIバージョンマネージャ。[Shunsuke Suzuki](https://github.com/suzuki-shunsuke)が開発しているGo製の単一バイナリで、Windows/macOS/Linuxで動く。チーム・プロジェクト・CIの間でCLIツールのバージョンを揃えることを目的にしている。公式サイトは[aquaproj.github.io](https://aquaproj.github.io/)。

[[asdf]]や[[mise]]と同じ領域のツールだが、**プラグインでシェルコードを実行させない**という設計方針と、**セキュリティ機能の充実**が特徴。

## レジストリ方式

aquaはツールの定義（どのGitHub Releasesのどのアセットがどのプラットフォーム向けか、実行ファイルはどこか）を**レジストリ**というYAMLで持つ。中心にあるのが公式の[aqua-registry](https://github.com/aquaproj/aqua-registry)（Standard Registry）で、これを参照するのが基本。

```yaml
registries:
  - type: standard
    ref: v4.155.1

packages:
  - name: helm/helm@v3.7.0
  - name: golangci/golangci-lint
    version: v1.42.1
    registry: standard
```

- 設定ファイルはカレントディレクトリから上へ`.aqua.yaml` / `aqua.yaml` / `.aqua/`を探す。
- レジストリの`ref`はブランチ名ではなくタグかコミットハッシュで指定する。aquaはrefを不変のものとして扱うため。
- パッケージのバージョンは`name@version`のインライン形式でも`version:`でも書けるが、インライン形式のほうがRenovateのような自動更新ツールと相性が良い。
- 標準レジストリの他に、ローカルのYAML（`type: local`）や任意のGitHubリポジトリ（`type: github_content`）もレジストリにできる。
- v2.44.0以降は`import_dir`と`import: aqua/*.yaml`で定義を複数ファイルに分割できる（設定が巨大な1枚になるのを避ける）。

## lazy install

aquaは`AQUA_ROOT_DIR/bin`にシンボリックリンクを置き、これをPATHに通す。リンク先のコマンドが実行された時点で、必要なら**その場でインストールしてから実行する**（lazy install）。事前に`aqua i`を全部走らせておく必要がない。

主なコマンドは`aqua g`（レジストリから選んで設定を生成）、`aqua i`（インストール）、`aqua up`（レジストリとパッケージの更新）、`aqua update-checksum`（チェックサムの更新）。

## セキュリティ機能

aquaが特に力を入れているのがここ。

- **外部コマンドを実行しない** — `go install`と`go build`を除いて、aquaはインストール過程で外部コマンドを実行しない。プラグインのシェルスクリプトが走る[[asdf]]方式と対照的で、悪意あるコードの実行経路を減らしている。
- **チェックサム検証** — `aqua-checksums.json`にダウンロードしたアーティファクトのチェックサムを記録し、検証する。
- **Policy as Code** — `aqua-policy.yaml`。secure by defaultで、標準レジストリ以外のレジストリの利用は明示的な許可を必要とする。
- **署名・provenanceの検証** — [[sigstore|Cosign]]、[[slsa|SLSA provenance]]、GitHub Artifact Attestations、Minisignに対応。

レジストリ自体がサプライチェーンの信頼境界になるという整理で、中央管理された標準レジストリを提供し、それ以外はデフォルトで拒否する、というのが基本方針になっている。 #supply-chain-attack

## [[mise]]との関係

miseはaquaのレジストリを`aqua`バックエンドとして取り込んでいる。aqua CLI自体は不要で、レジストリのエントリだけを使ってRust側の実装がダウンロードと検証を行う。miseの[レジストリ](https://mise.jdx.dev/registry.html)で「おすすめの取得元」がaquaになっているツールは多い。

## [[cli-version-managers]]の中での位置づけ

[[asdf]]がプラグインのシェルコードにツール定義を持たせるのに対し、aquaは中央のYAMLレジストリに寄せ、インストール経路から任意コード実行を締め出した。3つの中では最もサプライチェーンセキュリティに寄った設計。[[mise]]はこのレジストリを`aqua`バックエンドとして取り込んでいるので、両者は競合というより層が違う。ツール定義を中央に置く点は、publisher自身に署名付きで宣言させる[[packslip]]と対照的。

## 出典

- [aqua 公式サイト](https://aquaproj.github.io/)
- [Configuration | aqua](https://aquaproj.github.io/docs/reference/config/)
- [Security | aqua](https://aquaproj.github.io/docs/reference/security/)
- [aquaproj/aqua-registry - GitHub](https://github.com/aquaproj/aqua-registry)

#cli #golang #security #devops
