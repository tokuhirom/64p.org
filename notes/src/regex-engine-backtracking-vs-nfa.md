---
created: 2026-08-09
updated: 2026-08-09
---
# 正規表現エンジンの実装方式: バックトラッキング型とNFA/DFA型

正規表現エンジンの実装は大きく2系統に分かれる。どちらを採用するかで、表現力とマッチング速度の保証がトレードオフになる。

## バックトラッキング型

Henry Spencerが先駆けとなり、Perl・PCRE・Pythonなどに広く採用された方式。深さ優先探索でマッチを試み、失敗したら直前の状態に戻ってやり直す（バックトラック）。後方参照(backreference)や先読み・後読み(lookaround)など表現力の高い構文を実装しやすい一方、パターンと入力の組み合わせによっては指数関数的に時間がかかる「catastrophic backtracking」（[[redos|ReDoS]]の原因）を起こしうる。

## NFA/DFA型（Thompson construction系）

Ken Thompsonが考案したNFA構築法（[[thompson-construction|Thompson construction]]）に基づき、NFAをDFAに変換するか、NFAを並行シミュレートすることでマッチングを行う方式。RE2、Rustの`regex`クレート、Goの`regexp`パッケージなどが採用している。後方参照や汎用lookaroundは表現できないというトレードオフと引き換えに、入力サイズに対して線形時間でのマッチングを保証できる（ReDoSが原理的に起こらない）。

## Perl 5とRakuの場合

- **Perl 5**: バックトラッキング型。表現力は高いが、書き方次第でReDoSの温床になりうる。
- **[[raku-rakudo-perl6|Raku]]**: 文法的にはPerlの血統を継ぐバックトラッキング型のエンジンだが、grammarの`token`/`rule`宣言子は暗黙に`:ratchet`(`:r`)修飾子を持ち、一度マッチした箇所へのバックトラックを禁止する。フルバックトラック可能な`regex`宣言子と、バックトラックなしで高速・失敗も早い`token`/`rule`を書き分けられる設計になっており、Perl 5と比べてバックトラック起因の性能問題を抑えやすい。

#regex #raku #perl

## 出典

- [Perl's regex engine uses a non-deterministic finite automata [NFA] - Hacker News](https://news.ycombinator.com/item?id=10210133)
- [old-design-docs/S05-regex.pod at master · Raku/old-design-docs](https://github.com/Raku/old-design-docs/blob/master/S05-regex.pod)
- [Grammars | Raku Documentation](https://docs.raku.org/language/grammars)
