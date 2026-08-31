---
created: 2026-08-31 19:20
updated: 2026-08-31 19:20
---
# jq

JSONを加工するためのコマンドラインツール兼、純粋関数型のドメイン特化言語。作者はStephen Dolan、2012年10月の初リリース。「sed for JSON data」と自称している通り、テキストに対するsed/awkの立ち位置をJSONで担う。実装はC(初期はHaskellで書かれていたのちCへ移植された)、ライセンスはMIT。`libjq`というCのAPIも提供しており、他のプログラムに組み込める。 #json #cli #dsl

## フィルタが値のストリームを変換する

jqの中心概念は「フィルタ」。フィルタは入力を1つ受け取り、**0個以上**の値を出力する。この「0個以上」がjqの言語設計の肝で、`.[]`が配列を要素のストリームに展開したり、`select()`が条件に合わない入力に対して何も出さなかったり(=フィルタリング)、`empty`が常に何も出さなかったりするのが、すべて同じ規則で説明できる。

フィルタは`|`で繋いでパイプラインを作る。`,`で繋ぐと同じ入力を複数のフィルタに流して出力を連結する。

以下、手元のjq 1.7で実行して確認した例。入力は`d.json`:

```json
{"people": [{"name": "a", "age": 30, "tags": ["x", "y"]},
            {"name": "b", "age": 25, "tags": ["z"]}]}
```

```sh
$ jq -c '.people[].name' d.json
"a"
"b"                                  # 2つの独立した出力(配列ではない)

$ jq -c '[.people[] | select(.age > 28) | .name]' d.json
["a"]                                # [] で囲むとストリームを配列に集める

$ jq -c '.people | map({n: .name, a: .age})' d.json
[{"n":"a","a":30},{"n":"b","a":25}]

$ jq -c '[.people[] | .tags[]]' d.json
["x","y","z"]                        # 二重の展開でフラット化になる
```

`?`は「エラーを握り潰す」演算子(`try`の短縮形)、`//`は左辺が`false`/`null`のときに右辺を返す代替演算子。

```sh
$ jq -c '.missing // "default"' d.json
"default"
$ jq -c '.people[0].nope?' d.json
null
```

## reduce / foreach

ストリームを畳み込む。`reduce`は最終結果だけを、`foreach`は途中経過を各ステップ出力する。

```sh
$ jq -c 'reduce .people[].age as $x (0; . + $x)' d.json
55
$ jq -c '[foreach .people[].age as $x (0; . + $x)]' d.json
[30,55]
```

ユーザ定義関数は`def`で書ける。再帰も書けるため、jqの言語自体はチューリング完全。

```sh
$ jq -c 'def double: . * 2; .people[0].age | double' d.json
60
```

## パス式と更新

jqが単なる抽出ツールと一線を画すのが**パス式**。`path()`は値ではなくそこへ至る経路を返し、`getpath`/`setpath`/`delpaths`や更新演算子`|=`はこのパスの上で動く。

```sh
$ jq -c 'path(.people[0].name)' d.json
["people",0,"name"]
$ jq -c '.people[0].age |= . + 1 | .people[0]' d.json
{"name":"a","age":31,"tags":["x","y"]}
```

`|=`の左辺には「パスとして評価できる式」しか書けない、という制約があり、これがjqを学ぶうえでの最初の壁になりやすい。

## その他のよく使う機能

- `to_entries` / `from_entries` / `with_entries` — オブジェクトとキーバリュー配列の相互変換
- `group_by` / `sort_by` / `unique_by` / `min_by` / `max_by`
- `@base64` `@uri` `@csv` `@tsv` `@html` `@sh` などのフォーマット文字列
- `limit(n; expr)` / `first(expr)` / `inputs` — ストリームの制御と複数入力の読み込み
- `INDEX(stream; key)` / `IN` / `JOIN` などのSQLライクな演算子
- `import` / `include` によるモジュールシステム
- `--stream` — 巨大なJSONを`[パス, 値]`のイベント列としてストリーミング処理する(全体をメモリに載せない)

```sh
$ echo '{"a":[1,2]}' | jq -c --stream '.'
[["a",0],1]
[["a",1],2]
[["a",1]]
[["a"]]
```

## 数値の扱い

jqの数値はIEEE754倍精度が基本。1.7以降、変更されないリテラルはそのままの表記が保存されるが、演算を挟むと精度が落ちる。

```sh
$ echo '{"n": 10000000000000000001}' | jq '.n'
10000000000000000001                 # リテラルはそのまま
$ echo '{"n": 10000000000000000001}' | jq '.n + 0'
1e+19                                # 演算すると倍精度になる
```

1.8.0でdecimal number literalによる精度保持が入っている。任意精度整数演算そのものを求めるなら[[gojq]]を使う手がある。

## メンテナンスの歴史

jqは長い停滞期間を経験している。既存メンテナが力尽きて反応しなくなった一方、個人アカウント配下のリポジトリだったためメンテナを追加する手段がなく、身動きが取れない状態が続いた。この状況を解消するために`jqlang` GitHub Organizationが作られ、Stephen Dolanがリポジトリを移管した。

- **1.7** (2023-09-06) — 5年ぶりのリリース。新organization・新メンテナ体制での最初のリリース。GitHub ActionsによるCI/CD整備、`JQ_COLORS`による色設定など
- **1.7.1** (2023-12-13) — ヒープバッファオーバーフローなどのセキュリティ修正
- **1.8.0** (2025-06-01) — decimal number literal、`trim`/`ltrim`/`rtrim`、`@urid`フォーマットなど。バージョン番号体系を`1.X.Y`のセマンティックバージョニングへ変更
- **1.8.1** (2025-07-01) — 1.8.0で見つかったセキュリティ・性能・ビルドの問題の修正
- **1.8.2** (2026-06-20) — 16件のセキュリティ脆弱性修正。Windows arm64やDocker arm/v7のビルド追加

## 別実装

jqの言語は複数の再実装を生んでいる。

- [[gojq]] — Go実装。任意精度整数、YAML入出力、C非依存の可搬性
- [[jaq]] — Rust実装。起動の速さと意味論の厳密さを重視
- jqjq — jq自身でjqを実装したセルフホスト実装

## [[json-query-languages]]の中での位置づけ

[[jmespath|JMESPath]]がSDK組み込み用に表現力を絞った「仕様先行」の言語であるのに対し、jqは表現力を優先した単体の処理系。算術・正規表現・再帰・ユーザ定義関数・ストリーミングまで揃っており、手元でJSONを自由にこねる用途では圧倒的に強い。反面、公式の言語仕様書は存在せず、事実上jq本体の実装が仕様になっている。

## 出典

- [jq](https://jqlang.org/)
- [jq Manual](https://jqlang.org/manual/)
- [Releases · jqlang/jq](https://github.com/jqlang/jq/releases)
- [Jq (programming language) - Wikipedia](https://en.wikipedia.org/wiki/Jq_(programming_language))
- [About the jq's release process (Was: Is jq is still alive/maintained ?) · jqlang/jq#2305](https://github.com/jqlang/jq/issues/2305)
- [Define jqlang/jq <-> stedolan/jq relationship · jqlang/jq#2594](https://github.com/jqlang/jq/issues/2594)
