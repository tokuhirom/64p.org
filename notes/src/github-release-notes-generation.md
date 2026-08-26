---
created: 2026-08-26 14:22
updated: 2026-08-26 14:22
---
# GitHubの自動生成リリースノート

GitHubにはタグ間のマージ済みPRを元にリリースノートを自動生成する機能がある。リリース作成画面の「Generate release notes」ボタン、または`POST /repos/{owner}/{repo}/releases/generate-notes` APIから使える。`.github/release.yml`を置くことで、カテゴリ分けや除外ルールをカスタマイズできる。

## `.github/release.yml`の構造

ルート要素は`changelog:`で、その下に`exclude`(グローバル除外)と`categories`(カテゴリ分類)を書く。

```yaml
changelog:
  exclude:
    labels:
      - ignore-for-release
    authors:
      - bot-user
  categories:
    - title: 破壊的変更
      labels:
        - breaking-change
    - title: 新機能
      labels:
        - enhancement
        - feature
      exclude:
        labels:
          - experimental
    - title: バグ修正
      labels:
        - bug
    - title: その他
      labels:
        - '*'
```

### `changelog.exclude`(グローバル除外)

| キー | 内容 |
|---|---|
| `labels` | このラベルが付いたPRはリリースノートに一切載せない |
| `authors` | このユーザー/BotによるPRはリリースノートから除外(例: `dependabot`, `github-actions`など) |

### `changelog.categories`(カテゴリ分類)

配列で、上から順に評価される。PRは最初にマッチしたカテゴリに1つだけ分類される。

| キー | 必須 | 内容 |
|---|---|---|
| `title` | ✅ | カテゴリの見出し文字列 |
| `labels` | ✅ | マッチ対象のラベル配列。`'*'`は「他のどのカテゴリにもマッチしなかったPR」を拾うワイルドカード(キャッチオール) |
| `exclude.labels` | - | そのカテゴリからさらに除外したいラベル |
| `exclude.authors` | - | そのカテゴリから除外したいユーザー/Bot |

上の例の「新機能」カテゴリのように、カテゴリ単位で`exclude.labels`を指定すると、`enhancement`や`feature`ラベルが付いていても`experimental`ラベルも同時に付いているPRはそのカテゴリから外せる(他のカテゴリにマッチしなければ「その他」に落ちる)。

補足:
- カテゴリの`labels`が空配列`[]`だと、ラベルなしPRにマッチする挙動になる。
- `'*'`は必ずクォートすること。YAML上クォートなしだとエイリアス構文と衝突する。
- 集計対象はタグ間のマージコミット(PR)ベース。

## 出典

- [Automatically generated release notes - GitHub Docs](https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes)
