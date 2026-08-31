---
created: 2026-08-31 19:13
updated: 2026-08-31 19:13
---
# JMESPath

「ジェームズパス」と読む、JSONのためのクエリ言語。JSONドキュメントに式を適用して別のJSONドキュメントへ変換する。評価に失敗しない限り結果は必ず妥当なJSONになる(structured data in, structured data out)。 #json #dsl #cli #aws

XMLに対するXPath、HTMLに対するCSSセレクタに相当する立ち位置をJSONで担うもの、と考えると分かりやすい。

## 仕様とコンプライアンステストがあるのが最大の特徴

JMESPathには公開されたABNF文法による言語仕様と、実装が満たすべきコンプライアンステストスイートがある。このため Python / Go / JavaScript / Rust / PHP / C# / Java など複数言語の実装が同じ挙動を保証できる。

同種のJSONクエリ記法であるJSONPathが、長らく仕様が緩く実装ごとの方言が乱立した(のちに2024年2月にRFC 9535として標準化された)のとは対照的な設計方針。

## 採用例

「SDKやCLIに組み込んで、サーバ応答から必要な部分を抜き出す」用途で広く使われている。

- AWS CLIの`--query`オプション
- boto3のpaginatorの`.search()`
- Azure CLIの`--query`オプション
- Ansibleの`json_query`フィルタ
- n8nなどのワークフローツール

```sh
aws ec2 describe-instances \
  --query 'Reservations[].Instances[].{Id:InstanceId,Type:InstanceType}'
```

## 構文

以下のデータを例にする。

```json
{"people": [{"name": "a", "age": 30, "tags": ["x", "y"]},
            {"name": "b", "age": 25, "tags": ["z"]}]}
```

### 識別子・インデックス・スライス

```
people[0].name        → "a"
people[-1].name       → "b"       負のインデックスは末尾から
people[0:2]           → 先頭2件    [start:stop:step] のPython風スライス
```

### プロジェクション(射影)

JMESPathの中核概念。`[*]`や`[]`の右側に書いた式が各要素に対して評価され、結果がリストとして集められる。

```
people[*].name        → ["a", "b"]              リストプロジェクション
people[*].tags        → [["x","y"], ["z"]]
people[].tags[]       → ["x","y","z"]           [] はフラット化プロジェクション
*.name                                          オブジェクトプロジェクション(値に対して射影)
```

### フィルタプロジェクション

```
people[?age > `28`].name          → ["a"]
people[?name == 'a']
people[?contains(tags, 'z')]
```

比較演算子は`==` `!=` `<` `<=` `>` `>=`。ただし順序比較(`<` `<=` `>` `>=`)は数値にしか使えない。

### マルチセレクト

新しい構造を組み立てる。

```
people[*].{n: name, a: age}   → [{"n":"a","a":30}, {"n":"b","a":25}]   ハッシュ
people[*].[name, age]         → [["a",30], ["b",25]]                   リスト
```

### パイプ `|`

プロジェクションをそこで打ち切る。JMESPathで一番引っかかりやすい箇所。

```
people[*].name[0]     → プロジェクションが継続するため各 name に [0] が適用されて []
people[*].name | [0]  → "a"   パイプで射影を確定させてからインデックスを取る
```

### リテラル

- `` `...` `` バッククォートは任意のJSONリテラル(`` `28` ``、`` `"foo"` ``、`` `{"a":1}` ``)
- `'...'` シングルクォートは生文字列リテラル(`` `"foo"` ``の糖衣構文)

### 組み込み関数

- 数値: `abs` `avg` `ceil` `floor` `max` `min` `sum`
- 文字列: `join` `starts_with` `ends_with` `to_string`
- 配列: `length` `reverse` `sort` `contains`
- オブジェクト: `keys` `values` `merge`
- その他: `map` `type` `to_number` `to_array` `not_null`

`&expr`という式参照を引数に取る高階関数がある。

```
sort_by(people, &age)[0].name   → "b"
max_by(people, &age).name       → "a"
map(&name, people)              → ["a", "b"]
```

## jqとの違い

| | JMESPath | jq |
| --- | --- | --- |
| 位置づけ | 埋め込み用のクエリ言語(仕様＋多言語ライブラリ) | 単体のCLI兼処理系 |
| 表現力 | 抽出・整形に特化。常にJSON→JSON | 算術・文字列補間・正規表現・再帰・ユーザ定義関数・ストリーミング |
| 移植性 | 仕様とテストスイートで実装間の互換が担保される | 実質jqの単一実装(gojqなどの互換実装はある) |

本家仕様には算術演算子すらなく、`a + b`が書けない。この割り切りが、あらゆる言語のSDKに安全に組み込める移植性を生んでいる。逆に、手元で自由にJSONをこねる用途にはjqの方が向く。

## JMESPath Community

本家(jmespath.org)の仕様策定・ライブラリ更新が停滞したことを受けて、JMESPath Communityという非公式のコミュニティが仕様をフォークして前進させている。JEPと呼ばれる提案を整理し、標準と拡張を区別しつつ複数実装を揃える方針を取っている。

議論・実装されている主な追加機能:

- ルート参照`$` — 元の入力ドキュメントのルートを参照する。JSONPathやXPathの同種のトークンに着想を得たもの
- `let()`による字句スコープ — プロジェクションの内側からルートを参照したい場合などに使う
- `group_by()`
- 算術演算子 — 比較演算子より優先度が高く、`.`によるサブ式の区切りより優先度が低い

Pythonなら本家の`jmespath`に対して`jmespath-community`、Goなら`jmespath-community/go-jmespath`といった形で並立している。AWS CLIなどが使っているのは本家系なので、どちらの方言で書いているかは意識する必要がある。

## 出典

- [JMESPath](https://jmespath.org/)
- [JMESPath Tutorial](https://jmespath.org/tutorial.html)
- [JMESPath Specification](https://jmespath.org/specification.html)
- [JMESPath Libraries](https://jmespath.org/libraries.html)
- [RFC 9535: JSONPath: Query Expressions for JSON](https://www.rfc-editor.org/info/rfc9535/)
- [JSONPath: from blog post to RFC in 17 years (IETF Blog)](https://www.ietf.org/blog/jsonpath-rfc/)
- [jmespath-community · GitHub](https://github.com/jmespath-community)
- [The future of JMESPath · jmespath/jmespath.site#94](https://github.com/jmespath/jmespath.site/issues/94)
- [Root Reference · jmespath-community/jmespath.spec Discussion #18](https://github.com/jmespath-community/jmespath.spec/discussions/18)
- [group_by() function · jmespath-community/jmespath.spec Discussion #96](https://github.com/jmespath-community/jmespath.spec/discussions/96)
