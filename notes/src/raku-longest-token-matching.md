---
created: 2026-08-11 18:58
updated: 2026-08-11 18:58
---
# Longest Token Match (LTM)

[[raku-rakudo-perl6|Raku]]の正規表現/文法(grammar)における、単一パイプ`|`での分岐選択ルール。「最初にマッチした分岐」ではなく、宣言的な基準でランク付けした上で最有力候補を採用する。

## `|` と `||` の違い

- `|`: LTM(Longest Token Match)。書かれた順序に関係なく、宣言的な基準で最も有力な分岐を選ぶ。
- `||`: 昔ながらの時系列的な選択。上から順に試し、最初にマッチした分岐をそのまま採用する(Perl 5の`|`に近い挙動)。

## ランキングの基準

単純に「マッチした文字列が一番長い分岐が勝つ」わけではない。Rakudoでの実際のランキングは

```
(prefix_len desc, litlen desc, declaration index asc)
```

という順序で行われる。すなわち、

1. 宣言部(各分岐の中で曖昧さなく静的に決まる先頭部分)の長さが長い分岐を優先
2. 同点ならリテラル部分の長さが長い分岐を優先
3. それでも同点なら、ソースコード上で先に書かれた分岐を優先

分岐が実際にどこまでマッチするか(バックトラック込みの最終結果)ではなく、パース時点で分岐の「見込み」を評価して選ぶ、という宣言的な性質がポイント。

## Protoルールのフラット化

同名の`rule`/`token`定義(protoルール)は、実行時に1つの巨大なLTMアルタネーションへと「フラット化」される。これにより、たとえば言語設計時に変数名`forest_density`が`for`ループの構文と字面上衝突しても、宣言的な最長トークンマッチで曖昧性を解消できる。

## mutsu(Rust製Raku実装)での扱い

[[raku-rakudo-perl6|mutsu]]でもこのLTMランキングロジックをRakudo準拠で実装する作業が進められている(ADR-0022)。`|`を使った分岐は複数の実装経路(バックトラッキング版・単純キャプチャ版・キャプチャなしプローバー版)を持つため、それぞれでランキング基準を揃える必要がある。

#raku #regex #grammar

## 出典

- [Day 9 – Longest Token Matching | Raku Advent Calendar](https://perl6advent.wordpress.com/2012/12/09/day-9-longest-token-matching/)
- [| | Raku Documentation](https://docs.raku.org/syntax/%7C)
- [Mixed | and || in regexes (trap?) · Issue #1141 · Raku/doc](https://github.com/Raku/doc/issues/1141)
