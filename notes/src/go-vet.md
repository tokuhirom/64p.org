---
created: 2026-08-15 07:06
updated: 2026-08-15 07:06
---
# go vet

#golang #linter

Goに標準搭載されている静的解析コマンド。「コンパイラは通るが疑わしい構造」（Printfのフォーマット文字列と引数の不一致など）を報告する。ヒューリスティックベースなので、すべての報告が本物の問題であることは保証されない（公式ドキュメントも「ガイダンスとして使うべき」としている）。

```sh
go vet ./...          # パッケージを検査
go tool vet help      # 利用可能なチェック一覧
go tool vet help printf  # 特定チェックの詳細
```

デフォルトで全チェックが実行される。`-printf=true`のように特定のチェックだけを明示すると、それ以外は無効になる。問題が見つかると非0で終了する。

## チェックの例（全31種）

- **printf**: フォーマット文字列と引数の整合性
- **copylocks**: ロック（`sync.Mutex`等）を値渡ししていないか
- **loopclosure**: ネストした関数からのループ変数参照
- **lostcancel**: `context.WithCancel`のcancel関数の呼び忘れ
- **unreachable**: 到達不能コード
- **structtag**: structタグの構文
- **stdversion**: go.modの`go` directiveより新しい標準ライブラリシンボルの使用（[[go-mod-go-directive|go directive]]と最小サポートバージョンの整合性チェックに使える）

## [[go-tooling|Goの開発ツーリング]]の中での位置づけ

追加インストール不要の標準ツールとしての最小限のlint。より広範なチェックは[[staticcheck]]（`go vet`と同様のインターフェースを持つ）や[[golangci-lint]]（govetを同梱）が担う。

## 出典

- [cmd/vet - pkg.go.dev](https://pkg.go.dev/cmd/vet)
