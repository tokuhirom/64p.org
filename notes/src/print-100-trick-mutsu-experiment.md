---
created: 2026-08-15 10:04
updated: 2026-08-15 10:04
---
# mutsuで「ループなしで1〜100を印字」を動かす実験

[[print-100-trick|1000/999²の小数展開を使って1〜100を連番出力するトリック]]を、自作Rakuインタプリタ[mutsu](https://github.com/tokuhirom/mutsu)（[[raku-rakudo-perl6|mutsu]]）で再現できるか試した記録。

#raku #mutsu #experiment #math

## 目的

Gaucheの多倍長有理数演算で成立するこのトリックが、Rakuの数値タワー（`Int`/`Rat`/`FatRat`）でも同様に動くかを確認する。

## 環境

- mutsu 0.21.0（miseでグローバルインストール: `~/.local/share/mise/installs/github-tokuhirom-mutsu/0.21.0/bin/mutsu`）

## 試行錯誤

最初はGaucheの有理数演算に倣って`FatRat`（Rakuの任意精度有理数型）で組んだ。

```raku
my $x = FatRat.new(1000, 999**2) * FatRat.new(10**303, 1);
my $n = $x.floor.Str;
$n = ('0' x (3 - $n.chars % 3) % 3) ~ $n;
for $n.comb(3) -> $g { print "$g "; }
```

これは動いたが、`FatRat`が実は不要と気づいた。Rakuの`Int`はデフォルトで多倍長整数なので、`1000 * 10^303`をそのまま`999²`で整数除算（`div`、floor除算）すればよい。

```raku
my $digits = ((1000 * 10**303) div 999**2).Str;
$digits = '0' x (-$digits.chars % 3) ~ $digits;
say $digits.comb(3).head(100).join(' ');
```

さらにゼロパディングを手計算せず`sprintf`の幅指定に任せれば1行に収まる。

```raku
say sprintf("%0303d", (1000 * 10**303) div 999**2).comb(3).head(100).join(' ');
```

## 実行結果

```console
$ mutsu print100.raku
001 002 003 004 005 006 007 008 009 010 ... 097 098 099 100
```

3桁ずつのグループが`001`から`100`まで途切れなく並んだ（さらに先の`101`まで正しく続くことも別途確認済み）。

## 読み取れること

- mutsu上でRakuの`Int`は最初から多倍長（bignum）であり、`FatRat`を持ち出さなくても整数の`div`だけで元のトリックを再現できる。Gauche版が有理数演算(`/`)を使っていたのに対し、Rakuでは`10^303`倍を先にIntの乗算に織り込めるため整数除算1回で済む。
- `div`は正の被除数・除数に対しては`floor`と同じ結果になるため、明示的な`.floor`呼び出しは不要。
- `sprintf`の幅指定（`%0303d`）でゼロ埋めを任せられるので、桁数を手動計算するコードが消せる。

## 躓いた点

`substr`で先頭から30文字を単純に切り出すと、ゼロパディングをしていない生の数字列は3の倍数境界からズレており、`001,002,...`ではなく`100,200,300,...`のようにズレたグループ化に見えてしまった。ゼロパディングして総桁数を3の倍数に揃えることで解決した。
