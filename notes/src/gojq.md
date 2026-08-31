---
created: 2026-08-31 19:20
updated: 2026-08-31 19:20
---
# gojq

itchynyによる[[jq]]のPure Go実装。CLIとして使えるほか、Goのライブラリとしてプログラムに組み込める。 #json #golang #cli

## 本家jqとの主な違い

**可搬性** — 本家jqはCで書かれておりCライブラリに依存する(数学関数の有無が環境のlibmに左右される)。gojqは純粋なGo実装なのでクロスコンパイルで単一バイナリを配れる。

**任意精度整数** — jqは大きい整数の演算で精度を落とすが、gojqは任意精度整数演算に対応する。ただし精度が保たれるのは加算・減算・乗算・剰余・除算(割り切れる場合)に限られ、数学関数を通すと浮動小数点に変換される。

**バグ修正** — 本家のissueとして報告されている挙動をgojq側で修正している。例えば`|= empty`による配列要素の削除(jq#2051)、`try`/`catch`の扱い(jq#1859, #1885, #2140)、末尾に改行のないファイルの扱い(jq#2374)、`@base64d`でバイナリ文字列をデコードできる件(jq#1931)など。

**文字列のインデックスアクセス** — `"abcde"[2]`が書ける(jqにはない)。

**YAML入出力** — `--yaml-input` / `--yaml-output`に対応する。jq本体にはない。

**オブジェクトキーの順序を保持しない** — これは意図的な設計上のトレードオフで、`keys_unsorted`や`--sort-keys`は未実装。入力のキー順を保ちたい用途には向かない。`--ascii-output`も性能上の理由で未実装。`$__loc__`など一部の機能も意図的に非対応。

## Goライブラリとしての利用

CLIより、むしろこちらが本命の使いどころ。「設定ファイルにjq式を書かせてGoアプリ内で評価する」といった用途に使える。

1. `gojq.Parse(string)`でクエリ文字列を`*Query`にパースする
2. `query.Run(input)`または`gojq.Compile(query, opts...)`でイテレータを得る
3. `iter.Next()`で結果を1つずつ取り出す

独自の構造体を渡す場合は、一度JSONにマーシャルしてから`any`にアンマーシャルして渡す必要がある。コンパイラオプションで拡張できる。

- `WithModuleLoader` — モジュールの読み込み
- `WithEnvironLoader` — 環境変数へのアクセス
- `WithVariables` — クエリ内で使う変数の注入
- `WithFunction` — ホスト側の独自関数の追加
- `WithInputIter` — `input`/`inputs`関数への入力供給

jqの言語はチューリング完全で`repeat(0)`のような無限イテレータも書けるため、外部から式を受け取る場合は`RunWithContext`でタイムアウトを設定することが推奨されている。

## [[json-query-languages]]の中での位置づけ

[[jq]]の言語をそのまま使いつつ、実装の性質(可搬性・組み込みやすさ・数値精度)を差し替えたもの。言語自体を学び直す必要はない。同じくjqの再実装である[[jaq]]が「起動の速さと意味論の厳密さ」を軸にしているのに対し、gojqは「Goエコシステムへの統合」と「本家のバグを直した挙動」を軸にしている。

## 出典

- [GitHub - itchyny/gojq: Pure Go implementation of jq](https://github.com/itchyny/gojq)
- [gojq package - github.com/itchyny/gojq - Go Packages](https://pkg.go.dev/github.com/itchyny/gojq)
