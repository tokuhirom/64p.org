---
created: 2026-08-15 06:58
updated: 2026-08-15 06:58
---
# golangci-lint

#golang #linter

Go向けのlintランナー（アグリゲータ）。100以上のlinterを1つのバイナリに同梱し、並列実行してまとめて結果を出す。個々のlinter（staticcheck、govetなど）を個別にインストールする必要がない。Goエコシステムでは事実上の標準lintツール。GPLv3、GitHubスターは約19.3k。

- 高速: linterの並列実行に加え、Goのビルドキャッシュと解析結果のキャッシュを活用する。
- 設定は`.golangci.yml`（YAML）。デフォルト設定は誤検知（偽陽性）を抑える方向にチューニングされている。
- VS Code / GoLand / Vimなど主要エディタとの統合、JSON/Checkstyle/JUnit-XMLなど多様な出力形式に対応。

他言語での類似ポジションのツールに[[ruff|Ruff]]（Python）や[[biome|Biome]]（JavaScript）がある（多数のルールを単一の高速バイナリで実行するオールインワン型）。

## v2での大きな変更（2025年3月〜）

現行はv2系（2026年8月時点の最新はv2.12.2）。v1から設定フォーマットが大きく変わった。

- **formattersの分離**: `gofmt`/`gofumpt`/`goimports`/`gci`はlinterではなく独立した`formatters`セクションに移動。
- `linters-settings`は`linters.settings`と`formatters.settings`に再編。除外設定は`linters.exclusions`に統合。
- `enable-all`/`disable-all`は`default: all`/`default: none`に置き換え。`deadcode`や`golint`など古いlinter 12個が削除。
- `golangci-lint migrate`コマンドでv1設定を自動変換できる。ただし設定ファイル内のコメントは移行されないので手動確認が必要。

## インストールはバイナリ推奨（go install / tool directive は非推奨）

公式はバイナリインストール（install.sh、Homebrew等）を推奨しており、`go install`や[[go-tool-directive|go.modのtool directive]]経由のインストールは「動作保証しない」と明記している。理由:

- ローカルのGoバージョンに依存した、テストされていないバイナリが生成される。
- `go get -u`などで依存関係が予期せず更新されうる。
- tools patternやtool directiveでは、ツールの依存関係がプロジェクト本体の依存関係と相互に影響する。

どうしても`go tool`で管理したい場合は、専用のモジュールファイルまたは専用ディレクトリに隔離することが推奨されている。

## 出典

- [golangci-lint 公式サイト](https://golangci-lint.run/)
- [golangci/golangci-lint - GitHub](https://github.com/golangci/golangci-lint)
- [Migration guide - golangci-lint](https://golangci-lint.run/docs/product/migration-guide/)
- [Install (Local Installation) - golangci-lint](https://golangci-lint.run/docs/welcome/install/local/)
