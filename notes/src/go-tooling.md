---
created: 2026-08-15 07:06
updated: 2026-08-15 07:06
---
# Goの開発ツーリング

#golang #moc

Goのモジュール管理・静的解析・エディタ統合まわりのノートを束ねるハブノート。

## モジュール・バージョン管理

- [[go-release-cycle|Goのリリースサイクルとサポートポリシー]] — 半年ごとのメジャーリリースと「直近2バージョンのみサポート」という大前提。他の多くの話の背景になる。
- [[go-mod-go-directive|go.modのgo directiveとtoolchain directive]] — ビルド最小バージョンの宣言（go）と開発用ツールチェーン指定（toolchain）の使い分け。OSSでは`go` directiveを1つ前のメジャーリリースに留めるべきという話。
- [[go-tool-directive|Go 1.24のtool directive]] — 開発ツールの依存をgo.modで管理する仕組み。`tools.go`ハックの置き換え。

## 静的解析・lint

- [[go-vet|go vet]] — 標準搭載の最小限の静的解析。追加インストール不要。
- [[staticcheck]] — 150以上のチェックを持つ代表的なサードパーティlinter。誤検知の少なさ重視。
- [[golangci-lint]] — 多数のlinter（staticcheck含む）を同梱して並列実行するアグリゲータ。事実上の標準。

## エディタ統合

- [[gopls]] — 公式のlanguage server。エディタでの補完・診断・リファクタリングを担う。
