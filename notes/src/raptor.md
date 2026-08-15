---
created: 2026-08-15 17:41
updated: 2026-08-15 17:41
---
# Raptor

[[raku-rakudo-perl6|Raku]]の構文のうちPerl5に近い部分をサブセットとして採用した言語処理系。Go言語で実装されている。GitHubユーザー`xyzzyapps`による個人プロジェクトで、Reddit r/rakulangへの投稿"Announcing Raptor: a Perl5 subset of Raku"をきっかけに知った。

## 概要

- リポジトリ: [xyzzyapps/raptor](https://github.com/xyzzyapps/raptor)（ホームページ: [xyzzyapps.github.io/raptor](https://xyzzyapps.github.io/raptor/)）
- 実装言語: Go
- ライセンス: Artistic License 2.0
- リポジトリ作成日: 2026-08-13

## コンセプト

READMEでは「Post-LLM パラダイム」向けに設計した言語ランタイムと位置づけている。LLMのコンテキストウィンドウ効率を意識し、トークン密度が高く簡潔な構文を志向している。

採用しているPerl5由来の構文要素:

- `$`/`@`/`%`のシジル記法
- 動的型付け、`Nil`
- 組み込み演算子
- postfix if/forなどのステートメント修飾子
- リファレンス/デリファレンス、label/goto

一方、Rakuの`class`/`has`/`is`によるオブジェクト指向のボイラープレートは採用していない。

Design by Contract志向の機能も持つ。

```
subset Positive where { $_ > 0 };
my Positive $balance = 100;  # OK
# $balance = -10;            # エラー
```

- `subset ... where { ... }`による述語型
- `PRE`/`POST`/`INVARIANT`キーワード
- 変数代入のたびに動的述語を評価する継続的不変量チェック
- QuickCheck的なプロパティベース型ファジング
- UFCS（統一関数呼び出し構文）
- C互換構造体メモリ

リポジトリには、実行系（`raptor/`ディレクトリ）とは別に`moarvm-go/`ディレクトリがあり、[[raku-rakudo-perl6|MoarVM]]（バイトコードエミッタ、メタモデル、Raku文法エンジンなど）のGoによるホスト実装が含まれている。`raptor/`側にはCharmbraceletベースのTUIエンジン、TAP v13テストプロデューサー、WebAssembly対応、Gitベースパッケージマネージャなども同梱されている。

参考文献としてRobert Bruce Findlerの契約プログラミング論文、Liquid Types論文などがREADMEに挙げられている。

## 出典

- [xyzzyapps/raptor - GitHub](https://github.com/xyzzyapps/raptor)
- Reddit r/rakulang "Announcing Raptor: a Perl5 subset of Raku"（投稿本文・コメントは未確認）

#raku #perl #golang #compiler
