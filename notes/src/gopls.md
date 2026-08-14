---
created: 2026-08-15 07:06
updated: 2026-08-15 07:06
---
# gopls

#golang #lsp

Goチームが開発している**公式のlanguage server**。「Go please」と発音する。[[lsp|LSP (Language Server Protocol)]]対応エディタにナビゲーション・補完・診断・リファクタリングなどのIDE機能を提供する。VS Code（公式Go拡張が自動でインストール・更新）、Vim/Neovim、Emacs、Helix、Zedなど幅広いエディタに対応。

```sh
go install golang.org/x/tools/gopls@latest
```

- リリースはセマンティックバージョニングで、3ヶ月ごとにマイナーリリース、月1回程度のパッチリリース。
- 実行環境としてサポートするのは[[go-release-cycle|Goのリリースポリシー]]に準じた直近2つのメジャーリリースのみ（解析対象のソースコード自体は任意のGoバージョンでよい）。
- ビルドシステムは`go`コマンドを公式サポート。Bazelもgo/packages driverを設定すれば非公式に動く。
- [[staticcheck]]のQF (quickfix) カテゴリのチェックはgopls統合向けの自動リファクタリングとして提供されている。

## [[go-tooling|Goの開発ツーリング]]の中での位置づけ

lint系ツールがCI・コマンドラインでの検査を担うのに対し、goplsはエディタ統合（LSP）を担う。

## 出典

- [Gopls: The language server for Go - go.dev](https://go.dev/gopls/)
