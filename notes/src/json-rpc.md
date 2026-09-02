---
created: 2026-09-02 22:30
updated: 2026-09-02 22:30
---
# JSON-RPC

JSONをペイロードに使う、ステートレスで軽量なRPCプロトコル。仕様が極めて短く、トランスポート非依存（同一プロセス内・ソケット・HTTP・メッセージキューなど何の上でも動く）なのが特徴。 #protocol

現行は **2.0**。2010-03-26に公開され、2013-01-04を最後に更新が止まっている（＝それだけ枯れている）。[[lsp|LSP]]・[[dap|DAP]]・[[mcp|MCP]]といった「エディタ／AIアプリと外部プロセスを繋ぐ」系のプロトコルは、いずれもこのJSON-RPC 2.0を土台にして、その上にドメイン固有のメソッドを定義する構成をとっている。

## メッセージの3種類

### Request

```json
{"jsonrpc": "2.0", "method": "subtract", "params": [42, 23], "id": 1}
```

- `jsonrpc` — 文字列 `"2.0"` 固定
- `method` — 呼ぶメソッド名。`rpc.` で始まる名前は仕様の拡張用に予約されている
- `params` — 引数。**配列なら位置指定、オブジェクトなら名前指定**（大文字小文字を区別する）。省略可
- `id` — 文字列・数値・null。レスポンスと対応づけるための識別子

### Notification

`id` を持たないRequestがNotification。**サーバーは返答してはならない**。返答がないということはエラーも受け取れないので、失敗しても気づけない性質のものにだけ使う。LSPの `textDocument/didChange` や `$/cancelRequest` がこれにあたる。

```json
{"jsonrpc": "2.0", "method": "update", "params": [1, 2, 3]}
```

### Response

```json
{"jsonrpc": "2.0", "result": 19, "id": 1}
{"jsonrpc": "2.0", "error": {"code": -32601, "message": "Method not found"}, "id": "1"}
```

`result` と `error` は**どちらか一方だけを含まなければならない**（両方入れてはいけない）。`id` はリクエストのものをそのまま返す。リクエストの `id` すら読み取れなかった場合（パースエラーなど）は `null` を入れる。

## 標準エラーコード

| コード | 意味 |
|---|---|
| -32700 | Parse error — 不正なJSONを受け取った |
| -32600 | Invalid Request — JSONとしては読めるがRequestオブジェクトになっていない |
| -32601 | Method not found — そのメソッドが存在しない |
| -32602 | Invalid params — 引数が不正 |
| -32603 | Internal error — サーバー内部のJSON-RPCエラー |
| -32000 〜 -32099 | Server error — 実装側が自由に定義してよい範囲 |

`-32768` 〜 `-32000` が予約領域で、そのうち上記以外は将来の仕様のために空けてある。プロトコル固有のエラーはこの範囲外か、-32000〜-32099に置く（例: LSPの `ServerNotInitialized` = `-32002`）。

## バッチ

Requestを配列にまとめて一度に送れる。レスポンスも配列で返るが、**順序は保証されない**（`id` で対応づける）。Notificationはレスポンス配列に含まれない。全部Notificationだった場合はレスポンス自体を返さない。

```json
[
  {"jsonrpc": "2.0", "method": "sum", "params": [1,2,4], "id": "1"},
  {"jsonrpc": "2.0", "method": "notify_hello", "params": [7]},
  {"jsonrpc": "2.0", "method": "get_data", "id": "9"}
]
```

## トランスポートを規定しない、ということ

仕様はメッセージの**形**だけを決めていて、それをどう運ぶかは決めていない。ここが実運用上の落とし穴で、ストリーム（stdio・TCP）に流す場合は「どこまでが1メッセージか」を自前で決める必要がある。

LSPとDAPはどちらも、HTTPライクな `Content-Length` ヘッダ方式でこれを解決している。

```
Content-Length: 52\r\n
\r\n
{"jsonrpc":"2.0","id":1,"method":"shutdown"}
```

MCPのstdioトランスポートは違うアプローチで、**1行1メッセージ（改行区切りJSON）**にしている。同じJSON-RPC 2.0でもフレーミングは互換ではない。

## 出典

- [JSON-RPC 2.0 Specification](https://www.jsonrpc.org/specification)
- [JSON-RPC - Wikipedia](https://en.wikipedia.org/wiki/JSON-RPC)
- [Language Server Protocol Specification - 3.17 (Base Protocol)](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/)
- [MCP Specification - Transports](https://modelcontextprotocol.io/specification/2025-06-18/basic/transports)
