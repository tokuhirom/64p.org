---
created: 2026-08-30 20:07
updated: 2026-08-30 20:07
---
# cohttpのパストラバーサル脆弱性 (2026)

OCamlのHTTPライブラリ [ocaml-cohttp](https://github.com/mirage/ocaml-cohttp) の `Cohttp.Path.resolve_local_file` に、パーセントエンコードされたトラバーサル文字列でdocrootの外に出られる[[path-traversal|パストラバーサル]]があった。2026年8月19日リリースの v6.3.0 で修正。

#security #ocaml

- **アドバイザリID**: OSEC-2026-16 (2026-08-20公開)、CVE-2026-82481 (2026-08-29公開)
- **深刻度**: CVSS v4.0 で 8.7 (High)
- **影響範囲**: cohttp 0.9.1 〜 6.2.2。cohttp-lwt / cohttp-mirage / cohttp-async が対象。cohttp-eio は独自のパス解決を持つため対象外
- **修正PR**: [mirage/ocaml-cohttp#1145](https://github.com/mirage/ocaml-cohttp/pull/1145)

## 修正前のコード

```ocaml
let resolve_local_file ~docroot ~uri =
  let path = Uri.(pct_decode (path (resolve "http" (of_string "/") uri))) in
  let rel_path =
    if String.length path > 0 then String.sub path 1 (String.length path - 1)
    else ""
  in
  Filename.concat docroot rel_path
```

内側から評価順を追うと次のようになる。

1. `Uri.resolve "http" (of_string "/") uri` — RFC 3986 のリファレンス解決。この中で `remove_dot_segments` が走る。ただし**パーセントエンコードされたままの文字列に対して**
2. `Uri.path` でパスを取り出す
3. `Uri.pct_decode` でデコード

`..%2f..%2fbuzz` を渡すと、手順1の時点では `%2f` がまだ `/` ではないため全体が1セグメントとして扱われ、`..` の除去がかからない。手順3でデコードされて `../../buzz` になり、`Filename.concat` の結果は `/foo/bar/baz/../../buzz` となる。OSVのsummaryもこの順序を「the function normalizes the URI path before percent decoding it」と記述している。

なお修正前の `.mli` のコメントは "It strips out .. characters so that the request will not escape the docroot" と書かれていた。

## 修正後のコード

```ocaml
let remove_dot_segments path =
  let rec go acc = function
    | [] -> List.rev acc
    | ("" | ".") :: rest -> go acc rest
    | ".." :: rest -> (
        match acc with [] -> go [] rest | _ :: tl -> go tl rest)
    | seg :: rest -> go (seg :: acc) rest
  in
  path |> String.split_on_char '/' |> go [] |> String.concat "/"

let normalise uri =
  uri |> Uri.path |> Uri.pct_decode |> remove_dot_segments

let resolve_local_file ~docroot ~uri =
  Filename.concat docroot (normalise uri)
```

処理順が「デコード → 分割 → ドットセグメント除去」に入れ替わった。詳しくは [[decode-then-normalize]]。

追加されたテストケースの一部。

```ocaml
(* docroot = "/foo/bar/baz" *)
("percent-encoded slash grandparent blocked",   "..%2f..%2fbuzz",                 "/foo/bar/baz/buzz");
("fully percent-encoded grandparent blocked",   "%2e%2e%2f%2e%2e%2fbuzz",         "/foo/bar/baz/buzz");
("double percent-encoded grandparent blocked",  "..%252f..%252fbuzz",             "/foo/bar/baz/..%2f..%2fbuzz");
("encoded space preserved",                     "/my%20file.txt",                 "/foo/bar/baz/my file.txt");
("encoded backslash traversal preserved verbatim", "/..%5c..%5cwindows",          "..\\..\\windows");
```

## `Cohttp.Path.normalise` の追加

同じPRで `normalise` が公開APIになった。`Cohttp.Request.uri` は絶対形式(absolute-form)やパーセントエンコードを正規化しないため、パスセグメントを見て認可判定しているサーバーでは判定を回避されうる。CHANGES.md に載っている使い方は次の通り。

```ocaml
let callback _conn req _body =
  let uri = Cohttp.Request.uri req in
  match String.split_on_char '/' (Cohttp.Path.normalise uri) with
  | "admin" :: _ when not (authorised req) -> Server.respond_not_found ()
  | _ ->
      let fname = Cohttp.Path.resolve_local_file ~docroot ~uri in
      Server.respond_file ~fname ()
```

`normalise` はデフォルトでは適用されない。CHANGES.md には「既存コードが現在のセマンティクスに依存している可能性があり、ローカルファイル解決と組み合わせない限り現状の挙動は安全であるため」と理由が書かれている。つまりバージョンを上げるだけでは認可判定側の回避は塞がらない。

## 同時に入った挙動変更

- `resolve_local_file` が空のパスセグメントを畳み込み、末尾のスラッシュを落とすようになった。`/dir//sub/` は `docroot/dir//sub/` ではなく `docroot/dir/sub` に解決される
- cohttp-mirage の静的ファイルサーバーが、ディレクトリ要求も含めて全リクエストのパスを正規化してから mirage-kv ストアを引くようになった。キーがパーセントデコードされるため、`/my%20file.txt` は `my%20file.txt` ではなく `my file.txt` を引く
- cohttp-mirage の `request_fn` コールバックが、リクエストURIを書き換えずに受け取るようになった

## タイムライン

| 日付 | 出来事 |
| --- | --- |
| 2026-08-14 | PR #1145 が公開リポジトリでopen |
| 2026-08-19 | v6.3.0 リリース |
| 2026-08-20 | PR #1145 マージ、OSEC-2026-16 公開 |
| 2026-08-22 | 著者による記事 → [[security-embargo-ai-era]] |
| 2026-08-29 | CVE-2026-82481 公開 |

クレジットは CHANGES.md によれば `@avsm and Sapphire Livingstone`、レビューが `@mdales @edwintorok @patricoferris`。

## 補足: サーバーヘッダを出さない

cohttp は本体側でレスポンスに `Server:` ヘッダを付けない(`cohttp-lwt/src/server.ml` は `Header.init ()` から組み立てる)。HTTPレスポンスヘッダからcohttpを使っているホストを識別することはできない。

## 出典

- [OSEC-2026-16 (osv.dev)](https://osv.dev/vulnerability/OSEC-2026-16)
- [Cohttp 6.3.0 released (OSEC-2026-16) - OCaml Discuss](https://discuss.ocaml.org/t/cohttp-6-3-0-released-osec-2026-16/18467)
- [mirage/ocaml-cohttp#1145: cohttp: urldecode before resolving path components for files](https://github.com/mirage/ocaml-cohttp/pull/1145)
- [ocaml-cohttp CHANGES.md](https://github.com/mirage/ocaml-cohttp/blob/main/CHANGES.md)
