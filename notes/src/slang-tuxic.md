---
created: 2026-08-11 19:52
updated: 2026-08-11 19:52
---
# Slang::Tuxic

[[raku-rakudo-perl6|Raku]]のモジュールで、サブルーチン呼び出し時に**サブ名と開き括弧の間に空白を許可する**構文拡張。[[raku-slang|slang機構]]を使って実装されている。

## 通常のRakuとの違い

```raku
foo(3, 5);   # OK(通常の構文)
foo (3, 5);  # NG(空白があるとパースエラー)
```

`use Slang::Tuxic;`すると、そのスコープ内で以下のように空白入りの呼び出しが可能になる。

```raku
use Slang::Tuxic;

foo 3, 5;      # 15（通常の呼び出し）
foo(3, 5);     # 15（括弧あり）
foo (3, 5);    # 15（空白許可）

42.fmt('\-%d-');    # -42-
42.fmt ('\-%d-');   # -42-（メソッド呼び出しでも同様）
```

## 既知の制限

READMEでは、この空白許可が曖昧さを生む場面があると明記されている。

- リストをサブに渡す場合の曖昧性
- `if`/`while`などのキーワード直後の括弧との衝突

Perlや他の言語に慣れたユーザー向けの互換性オプションという位置づけ。

#raku #dsl

## 出典

- [Raku Land - Slang::Tuxic](https://raku.land/zef:raku-community-modules/Slang::Tuxic)
- [GitHub - raku-community-modules/Slang-Tuxic](https://github.com/raku-community-modules/Slang-Tuxic)
