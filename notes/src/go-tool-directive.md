---
created: 2026-08-15 06:51
updated: 2026-08-15 07:06
---
# Go 1.24のtool directive

#golang

Go 1.24（2025年2月）で、go.modに`tool` directiveが追加され、プロジェクトが開発時に使う実行可能ツール（linter、コードジェネレータなど）の依存をgo.modで直接管理できるようになった。

```
tool (
    github.com/example/tool v1.0.0
)
```

## それまでの回避策: tools.go

従来は`tools.go`のようなファイルを作り、ビルドタグで除外しつつツールのパッケージをブランクインポートする、という慣習的な回避策でツールのバージョンをgo.modに載せていた。tool directiveによりこのハックが不要になった。

## 使い方

```sh
# ツール依存を追加（requireに加えてtool directiveも書かれる）
go get -tool github.com/example/tool@latest

# go.modに登録されたツールを実行
go tool toolname [args]

# `tool`メタパターン: モジュール内の全ツールを指す
go get tool      # 全ツールをアップグレード
go install tool  # GOBINへインストール
```

`go run`や`go tool`で作られる実行ファイルはbuild cacheにキャッシュされるようになり、繰り返し実行が速くなった（その分キャッシュサイズは増える）。

## 注意点

ツール依存も通常の依存と同様にgo.modのバージョン解決に参加するため、ツール側のgo.modが新しすぎる`go` directiveを宣言していると、利用側モジュールがサポートできるGoの下限に影響する（詳細は[[go-mod-go-directive|go.modのgo directiveとtoolchain directive]]）。

また、ツール側がtool directive経由のインストールを推奨していない場合もある。例えば[[golangci-lint]]は、ローカルのGoバージョンに依存したテストされていないバイナリができること等を理由に、バイナリインストールを推奨しtool directive経由を「動作保証しない」としている。

## [[go-tooling|Goの開発ツーリング]]の中での位置づけ

モジュール管理系。開発ツールの依存管理をgo.modに統合する仕組みで、lint系ツールのインストール方法とも関わる。

## 出典

- [Go 1.24 Release Notes - go.dev](https://go.dev/doc/go1.24)
- [Managing dependencies: Tools - go.dev](https://go.dev/doc/modules/managing-dependencies#tools)
