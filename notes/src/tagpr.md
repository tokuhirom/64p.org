---
created: 2026-08-15 06:58
updated: 2026-08-15 06:58
---
# tagpr

[Songmu/tagpr](https://github.com/Songmu/tagpr) は、GitHub Actions上で動くリリース自動化ツール。「マージするだけでリリースが完了する」ワークフローを実現する。作者はSongmu氏(日本人のGo開発者)。

## 仕組み

1. リリース対象ブランチ(通常main)へのpushを検知し、前回リリース以降の差分を検査する
2. 差分があれば、次バージョン用の「リリース候補PR」を自動作成する(CHANGELOGやバージョンファイルの更新を含む)
3. mainブランチが更新されるたびに、このリリース候補PRも自動で追従・更新される
4. このPRをレビューしてマージすると、マージコミットに自動でタグを打ち、GitHub Releaseを生成する

## セットアップ

`.github/workflows/tagpr.yml`に以下のようなワークフローを置くだけ。

```yaml
name: tagpr
on:
  push:
    branches: ["main"]
jobs:
  tagpr:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
      issues: read
    steps:
    - uses: actions/checkout@v6
    - uses: Songmu/tagpr@v1
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

リポジトリ設定で「Allow GitHub Actions to create and approve pull requests」を有効にしておく必要がある。

設定は`.tagpr`(gitconfig形式)で管理し、初回実行時に自動生成される。主なオプション:

- `tagpr.releaseBranch` — リリース対象ブランチ
- `tagpr.versionFile` — バージョンを記録するファイル(カンマ区切りで複数指定可)
- `tagpr.vPrefix` — タグに`v`接頭辞を付けるか
- `tagpr.changelog` — CHANGELOGの自動生成有無
- `tagpr.majorLabels` / `tagpr.minorLabels` — バージョン判定に使うラベル

## バージョニング

デフォルトはSemVer。リリースPRに付いたラベルで次バージョンを決定する。

- `tagpr:major` / `tagpr/major`ラベル → メジャーバージョン上昇
- `tagpr:minor` / `tagpr/minor`ラベル → マイナーバージョン上昇
- ラベルなし → パッチバージョン上昇

個々のマージ済みPRに`major`/`minor`ラベルが付いていれば、それがリリース候補PR側にも自動で継承される。Dependabotが付けたラベルは常に無視されるため、依存関係更新PRのマージで意図しないバージョン上昇が起きるのを防いでいる。

オプションでCalendar Versioning(`tagpr.calendarVersioning`)に切り替えることもできる。この場合ラベルは無視され、`YYYY.MM0D.MICRO`形式(例: `v2026.1203.0`)のバージョンが使われる。

## release-pleaseとの違い

Google製の[release-please](https://github.com/googleapis/release-please)がConventional Commits規約に基づいてバージョンを自動判定するのに対し、tagprはPRラベルベースでバージョンを制御する。tagprはリリース内容が常にPRという形で可視化され、レビュー・承認を経てからリリースされる点が特徴。

## 出典

- [Songmu/tagpr - GitHub](https://github.com/Songmu/tagpr)
- [tagpr - GitHub Marketplace](https://github.com/marketplace/actions/automate-pull-request-generation-and-tagging-for-releases-using-tagpr)

#github-actions #go #release-automation
