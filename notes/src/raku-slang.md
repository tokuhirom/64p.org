---
created: 2026-08-11 19:52
updated: 2026-08-11 19:52
---
# Raku の slang 機構

[[raku-rakudo-perl6|Raku]]のコンパイラが、実行時にGrammar(構文)を差し替えて言語自体を拡張できる仕組み。

## 概念

Rakuのソースコードは、実際には複数の「サブ言語(sublanguage)」を組み合わせたものとして解釈される。メインのRaku構文、Pod(ドキュメント)構文、文字列補間構文、正規表現構文などがそれぞれ独立したサブ言語であり、これを短縮して「slang」と呼ぶ。

コンパイル時変数`$*LANG`から、現在アクティブな各サブ言語の実装(Grammar/Actionsオブジェクト)を参照できる。モジュール作者は、既存のGrammarに新しい構文ルールを追加したroleを作り、それを`$*LANG`にミックスインすることで、`use`したスコープ内だけ構文を拡張できる。

## 用途

ユーザー定義のドメイン特化言語(DSL)をRakuコード中にシームレスに埋め込むために使われる。例えば[[slang-tuxic|Slang::Tuxic]]は、サブルーチン呼び出しの構文を拡張するモジュール。

## 関連ツール

Elizabeth Mattijsenによる`Slangify`モジュールは、slang作成・有効化の内部実装を抽象化し、Rakuのバージョンが変わってもモジュール作者が一貫したインターフェースでslangを作れるようにするもの。

#raku #grammar #dsl

## 出典

- [Slangs | Raku Documentation](https://docs.raku.org/language/slangs)
- [Slangify](https://slangify.org/)
