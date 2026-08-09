---
created: 2026-08-09
updated: 2026-08-09
---
# Nushell

コマンドの出力を単なるテキストではなく構造化データ(テーブル・レコード等)として扱う、Rust製のモダンなクロスプラットフォームシェル。`nu`と略される。 #shell #rust

## 特徴

- 全てのコマンド出力を配列・テーブル・レコード・数値・真偽値などの型付きデータとして扱い、パイプラインでフィルタ・ソート・変換操作を組み合わせやすくしている。
- JSON/CSV/SQL/Excelなどのフォーマットを扱うビルトインコマンドを備える。
- PowerShellのように「構造化シェル」に分類される(bash/zshなどのテキストベースシェルとの対比)。
- 従来のUnixシェル哲学(シンプルなコマンドをパイプで繋ぐ)を踏襲しつつ、型システムや関数型言語的な概念を取り入れており、リッチなプログラミング言語とフル機能シェルを一体化したものと位置づけられている。
- Windows/macOS/Linuxに対応。

## 出典

- [はじめに | Nushell (公式ドキュメント)](https://www.nushell.sh/ja/book/)
- [Nushellとは？特徴・インストール・基本コマンドを解説【入門】](https://www.issoh.co.jp/tech/details/10198/)
- [GitHub - nushell/nushell: A new type of shell](https://github.com/nushell/nushell)
