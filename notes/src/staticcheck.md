---
created: 2026-08-15 07:03
updated: 2026-08-15 07:06
---
# staticcheck

#golang #linter

Dominik Honnef氏が開発しているGo向けの静的解析ツール（linter）。公式には「state of the art linter for the Go programming language」を謳う。リポジトリは`dominikh/go-tools`（インポートパスは`honnef.co/go/tools`）、MITライセンス、GitHubスターは約6.8k。個人・企業スポンサーの支援で開発が継続されている。

- 150以上のチェックを搭載し、バグ・パフォーマンス問題・不必要に複雑なコード・スタイル違反を検出する。
- 誤検知の少なさを重視した設計で、CIに組み込んでも偽陽性で落ちにくいことを売りにしている。
- 使い方は`go vet`などと同様のインターフェースで`staticcheck ./...`とシンプル。
- [[golangci-lint]]にも同梱されており、golangci-lint経由で使われることも多い。

## チェックのカテゴリ

チェックIDのプレフィックスでカテゴリが分かれている。

- **SA** (staticcheck): 正しさに関するチェック。例: SA1000（不正な正規表現）、SA1012（nilの`context.Context`を渡している）、SA2000（goroutine内での`WaitGroup.Add`呼び出し）。
- **S** (simple): 不必要に複雑なコードの簡略化提案。例: S1012（`time.Now().Sub(x)`→`time.Since(x)`）。
- **ST** (stylecheck): スタイルガイド系の指摘。例: ST1001（ドットインポート非推奨）、ST1005（エラー文字列の先頭大文字）。
- **QF** (quickfix): gopls統合向けの自動リファクタリング。例: QF1009（`==`でなく`time.Time.Equal`を使う）。

## その他

- バージョニングは`2022.1`のような年ベースの形式。
- 同じリポジトリに、構造体のメモリレイアウトを表示・最適化する`structlayout`系ツール（structlayout / structlayout-optimize / structlayout-pretty）も含まれている。

## [[go-tooling|Goの開発ツーリング]]の中での位置づけ

静的解析・lint系。[[go-vet|go vet]]より広範なチェックを提供する代表的なサードパーティlinterで、単体でも[[golangci-lint]]経由でも使われる。

## 出典

- [Staticcheck 公式ドキュメント](https://staticcheck.dev/docs/)
- [Checks - Staticcheck](https://staticcheck.dev/docs/checks/)
- [dominikh/go-tools - GitHub](https://github.com/dominikh/go-tools)
