---
created: 2026-09-07 23:35
updated: 2026-09-07 23:35
---
# Packslip

バイナリを配布するツールのメンテナが、**署名付きのリリースマニフェスト**を一緒に公開するための仕様。[[mise]]の作者Jeff Dickeyが作っており、MITライセンス、サイトは[packslip.dev](https://packslip.dev/)。キャッチフレーズは「何が出荷されたのか、自分のプラットフォームにはどのファイルが合うのか、どう検証すればいいのかを、利用者に伝える」。

## 解こうとしている問題

GitHub Releasesにtarballを並べる従来のやり方では、利用者側が

- **ファイル名を推測する**（`foo_1.2.3_linux_amd64.tar.gz`なのか`foo-v1.2.3-x86_64-unknown-linux-gnu.tar.gz`なのか）
- **チェックサムを検証しても、そのチェックサムファイル自体に署名者の裏付けがない**
- 展開後に実行ファイルがどこにあるのかも推測する

という状態になる。[[aqua]]のレジストリや各種パッケージマネージャのレシピは、この「推測」を第三者が肩代わりして中央で管理する解き方だが、Packslipは**publisher自身がリリースの一部としてメタデータを署名付きで出す**という解き方をする。

## マニフェストの中身

リリースのメタデータを[[sigstore]]のバンドル形式でくるみ、署名者の署名を添える。

- **subject** — ファイルのdigest（SHA256）。
- **predicate** — プロジェクト名、バージョン、アーティファクトの説明、実行ファイルのパス。
- **プラットフォーム情報** — OS・アーキテクチャ・libc。
- **resources** — manページ、シェル補完、[[sbom|SBOM]]など。

フォーマットはバージョン1で、stableとされている。用語としては、リリースを記述するのが**manifest**、それに署名の証跡を組み合わせたものが**bundle**、実際にダウンロードされるビルドが**artifact**。

## 署名の方式

2通りある。

- **鍵ベース** — Ed25519の秘密鍵で署名する（[minisign](https://github.com/jedisct1/minisign)形式の公開鍵で検証）。
- **keyless** — GitHub Actionsなどのワークフローのアイデンティティで署名する（OIDC証明書）。[[sigstore]]の考え方そのもの。

publisher側の導入は、リリース作成前にGitHub Actionのステップを1つ足すか、CLIでローカルにマニフェストを生成するだけ。どのアーティファクトか・実行ファイルはどこか・付随リソースは何かを設定に書くと、リリースファイルと一緒に配布される。

## 検証とポリシー（mise側の実装）

miseはこれを`packslip`バックエンドとして使う。

```sh
mise use packslip:github.com/jdx/hk
```

展開前に、bundleの署名（リポジトリのアイデンティティまたは設定された鍵に対して）・マニフェストの構造とプロジェクト/バージョンの一致・署名者の継続性とrelease-ageポリシー・アーティファクトのdigestとサイズとロックファイルのチェックサム、を順に検証する。検証済みマニフェストは`.mise-packslip.json`として残る。

### 署名者の継続性（pinning）

miseは受け入れた署名者を2箇所に記録する。

- `packslip/pins.toml`（ローカルの状態） — 過去に受け入れた署名者、署名方式、vendorかrepackagerか、provenanceリンクの有無、リリース一覧の継続性。
- `mise.lock`（プロジェクト） — プロジェクトが約束した署名者・attestorと、プラットフォームごとのアーティファクトURL・チェックサム。

方式が変わった、vendorの立場が変わった、provenanceリンクが失われた、といった変化は継続性チェックに引っかかりインストールを拒否しうる。keyless署名の場合、継続性はワークフローのパスをtag/branch refを除いて比較するので、ワークフローのバージョンを上げるだけなら信頼し直しは不要だが、パス自体を変えると必要になる。

`mise packslip pins`で受け入れ済みのアイデンティティを一覧でき（再検証や新たな信頼付与はしない）、署名者のローテーションには`mise packslip forget`を使う。`pins.toml`を消せばローカルの継続性はリセットされるがロックファイルの約束は消えない。インストール失敗の常套手段にすべきではない、と明記されている。

### stamper

リリースを独立に承認して承認リストを公開する、レジストリやレビューサービスのような存在。

```toml
[settings.packslip]
stampers = [
  "stamps.example.com=/path/to/stamper.pub",
  "reviews.example.com=https://github.com/example/reviews/",
]
```

stamperを設定すると、信頼するホストの少なくとも1つからyankされていない承認を得たバージョンだけがリスト・インストールの対象になる。ただし**vendorによる撤回はstamperの承認より優先される**。stamperがvendorのbundleをミラーすることもでき、その場合も検証はvendorの署名に対して行われる。

ツール単位では`trust = "vendor"`でstamper要求を免除したり、`minimum_release_age`で「公開から一定期間経ったバージョンだけ」に絞ったりできる（transparency-logのタイムスタンプで判定する）。

## 補完とスキルの配布

マニフェストのresourcesを使って、**そのバージョンに対応するシェル補完とエージェント用スキル**を配れるのが面白いところ。

- 補完はzsh/bash/fish/PowerShell。プロジェクトごとにアクティブなバージョンに自動で追従するので、バージョンを切り替えるたびに入れ直す必要がない。
- スキルは`SKILL.md`と付随ファイルを含むディレクトリ（[[skill-md|SKILL.md]]の形式）。ツールのインストール時にデフォルトで取得され、バージョンごとに違う内容を持てる。

publisherは静的な補完ファイル、CLIの仕様（miseが補完に変換する）、生成コマンドのいずれかを宣言できる。miseは性能のため静的なものを優先する。

## サプライチェーン系の仕組みの中での位置づけ

[[slsa|SLSA]]や[[in-toto]]が「ビルドの来歴を証明する」層、[[sigstore]]が「鍵を持たずに署名する」層だとすると、Packslipは「**リリースの中身のカタログを署名付きで配る**」層にあたる。中央レジストリ（[[aqua]]や各ディストリのパッケージ）を経由せずに、publisherから利用者へ直接、検証可能な形でメタデータを届ける。

## [[cli-version-managers]]の中での位置づけ

[[asdf]]のプラグイン、[[aqua]]のレジストリに続く3つめの「ツール定義を誰が持つか」の答え。第三者（プラグイン作者・レジストリメンテナ）ではなくpublisher本人がリリースの一部として署名付きで出す、という点が違う。今のところ主な実装は[[mise]]の`packslip`バックエンド。

## 出典

- [Packslip 公式サイト](https://packslip.dev/)
- [packslip | mise-en-place](https://mise.jdx.dev/dev-tools/backends/packslip.html)
- [Packslip Verification and Policy | mise-en-place](https://mise.jdx.dev/dev-tools/packslip-verification.html)
- [Packslip Completions and Skills | mise-en-place](https://mise.jdx.dev/dev-tools/packslip-resources.html)

#security #supply-chain-attack #signing #cli
