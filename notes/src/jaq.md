---
created: 2026-08-31 19:20
updated: 2026-08-31 19:20
---
# jaq

Michael Färber (01mf02)によるRust製の[[jq]]クローン。ライセンスはExpat(MIT)。 #json #rust #cli

## 設計の三本柱

「正確性(correctness)・性能(performance)・シンプルさ(simplicity)」を掲げている。

**正確性** — jqより正確で予測可能な実装を目指す、と明記されている。jaqが他のjq実装と最も違うのは、作者がjq言語に**表示的意味論(denotational semantics)を与える論文を書いたうえで、その意味論を実装している**点。jqには公式の言語仕様が存在せず事実上の実装依存になっているという問題に、形式的な意味論の側から取り組んでいる。

- [Denotational Semantics and a Fast Interpreter for jq](https://arxiv.org/abs/2302.10576) (2023) — jq言語のサブセットに構文と表示的意味論を与え、それを拡張した意味論をjaqとして実装したことを述べた論文
- [A formal specification of the jq language](https://arxiv.org/abs/2403.20132) (2024) — より広いサブセットを対象にした形式仕様。更新(update)の新しい解釈方法を提案し、予測可能かつ高速な実行を可能にしている

**性能** — 開発の発端はjq 1.6の起動時間(約50ms)の改善で、jaqはjq 1.6のおよそ30倍速く起動する。README掲載のベンチマークでは、jaq 3.0が20項目で最速、[[gojq]]が6項目、jq 1.8.1が5項目で最速という結果になっている(全項目で勝っているわけではない)。

**シンプルさ** — 実装を小さく保つことを目標に挙げている。`jaq-core`はマルチスレッド環境でも安全に使え、JSON以外の任意のデータ型を扱えるライブラリとして設計されている。

## 対応フォーマット

JSONに加えてYAML・CBOR・TOML・XMLを扱える。jq本体はJSONのみ、[[gojq]]はJSONとYAMLなので、この点ではjaqが一番広い。

## [[json-query-languages]]の中での位置づけ

[[jq]]の言語を共有する再実装のひとつ。[[gojq]]が「Goへの組み込みと本家バグの修正」を軸にするのに対し、jaqは「起動の速さと、意味論から導かれた挙動の一貫性」を軸にしている。

## 出典

- [GitHub - 01mf02/jaq: A jq clone focussed on correctness, speed, and simplicity](https://github.com/01mf02/jaq)
- [jaq manual - Michael Färber](https://gedenkt.at/jaq/manual/)
- [Denotational Semantics and a Fast Interpreter for jq (arXiv:2302.10576)](https://arxiv.org/abs/2302.10576)
- [A formal specification of the jq language (arXiv:2403.20132)](https://arxiv.org/abs/2403.20132)
- [ITP: jaq -- A jq clone focussed on correctness, speed, and simplicity (Debian Bug #1057177)](https://bugs.debian.org/1057177)
