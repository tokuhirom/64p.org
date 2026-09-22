---
created: 2026-09-22 01:06
updated: 2026-09-22 01:06
---
# herdrのソケットAPI

[[herdr]]が稼働中のセッションを外部から検査・操作させるために公開しているローカルAPI。[[herdr-plugins|プラグイン機構]]やCLIの下にあるレイヤで、スクリプト・独自ツール・エージェントがここを叩く。

## 3つのレイヤ

ドキュメントは用途別に3レイヤを提示していて、「レイヤは同じコントロール面を共有する(The layers share the same control surface)」とされている。

| レイヤ | 用途 |
| --- | --- |
| Agent skill | エージェントにペイン内からherdrの使い方を教える → [[herdr-agent-skill]] |
| CLIラッパー | シェルスクリプト、単純なオーケストレーション、人間によるデバッグ |
| 生のソケットAPI | 独自ツール、プロトコルクライアント、イベント購読者 |

「ほとんどの自動化はCLIラッパーから始めるべきで、生のソケットAPIはリクエスト/レスポンスを直接制御したい場合や、長寿命のイベント購読が必要な場合にだけ使う」という方針。[[herdr-plugins|プラグイン]]も基本はCLI(`HERDR_BIN_PATH`)経由が推奨で、ソケットを直接叩くのは一段深い選択肢という位置づけになる。

## プロトコル

改行区切りJSON(ndjson)。1行1リクエストで、レスポンスは同じ`id`を返す。

```json
{"id":"req_1","method":"ping","params":{}}
{"id":"req_1","result":{"type":"pong"}}
```

エラーは`error`に`code`と`message`が入る。

```json
{"id":"req_1","error":{"code":"not_found","message":"pane not found"}}
```

JSON-RPCではなく、独自のリクエスト/レスポンス形式。

## ソケットのパスと解決順

トランスポートはUnixではドメインソケット、Windowsでは名前付きパイプ。

```
~/.config/herdr/herdr.sock
~/.config/herdr/sessions/<name>/herdr.sock
```

どのソケットに繋ぐかは次の順で決まる。

1. CLIの`--session <name>`
2. 環境変数`HERDR_SOCKET_PATH`
3. 環境変数`HERDR_SESSION=<name>`
4. デフォルトセッションのソケット

herdrが管理するペインには`HERDR_SOCKET_PATH` / `HERDR_ENV=1` / `HERDR_WORKSPACE_ID` / `HERDR_TAB_ID` / `HERDR_PANE_ID`が注入される。呼び出し側が渡した環境変数と衝突した場合はherdr側の値が優先される。

なおドキュメントには認証機構の記述が見当たらない。ローカルソケット前提の設計に見える。

## メソッド

ドット記法で領域ごとに分かれている。網羅は`herdr api schema`に任せて、系統だけ挙げると、

- `server.*` — `ping`、`server.stop`、`server.reload_config`、エージェントマニフェストの再読み込み
- `workspace.*` / `tab.*` — 作成・一覧・フォーカス・リネーム・移動・クローズ
- `pane.*` — 分割・移動・ズーム・リサイズなどのレイアウト系に加えて、`pane.send_text` / `pane.send_keys` / `pane.read` / `pane.wait_for_output`といった入出力系
- `agent.*` — `agent.list` / `agent.read` / `agent.prompt` / `agent.wait` / `agent.start`など、エージェント単位の操作
- `layout.*` — `layout.export` / `layout.apply`
- `worktree.*` — `worktree.list` / `create` / `open` / `remove`
- `plugin.*` — プラグインのリンク・有効化・アクション実行・ペイン開閉
- `events.subscribe` / `events.wait` / `session.snapshot`

`pane.read`のソースには`visible` / `recent` / `recent-unwrapped` / `detection`があり、「今画面に出ているもの」と「最近の出力」を区別して読める。`pane.send_keys`はherdrのキー文字列(`enter`、`esc`、`ctrl+h`、`shift+tab`、`f1`、`minus`など)を受け付ける。

## スキーマはCLIから出せる

```sh
herdr api schema                              # サマリ
herdr api schema --json                       # 完全なJSON Schema
herdr api schema --output herdr-api.schema.json
```

バイナリに同梱されたスキーマが出るので、バージョンとズレない。リクエスト・成功レスポンス・エラーレスポンス・発火するイベント・購読イベントが対象。

## イベント購読

`events.subscribe`で購読すると、最初のレスポンスが購読の確認になり、以降はイベントが push されてくる(接続は開いたまま)。

```json
{"id":"sub_1","method":"events.subscribe","params":{"subscriptions":[
  {"type":"pane.agent_status_changed","pane_id":"w1:p1","agent_status":"blocked"}
]}}
```

購読時点でフィルタを指定できるのがポイントで、上の例は「このペインのエージェントがblockedになったときだけ」という絞り込み。1回だけ待つ`events.wait`もある。

イベントは`workspace.*` / `tab.*` / `pane.*` / `layout.updated` / `worktree.*`の系統。エージェント運用で使いたくなるのはこのあたり。

- `pane.agent_detected` — ペイン内でエージェントが検出された
- `pane.agent_status_changed` — 作業中・アイドル・入力待ちなどの状態が変わった
- `pane.output_matched` — 出力が指定パターンにマッチした
- `pane.exited` — プロセスが終了した
- `worktree.created` / `worktree.opened` / `worktree.removed`

[[herdr-plus|herdr plus]]がworktree作成時にレイアウトを流し込んでいるのは、この`worktree.created`を[[herdr-plugins|プラグイン機構]]の`[[events]]`から拾っているもの。

## エージェントの状態を外から報告できる

herdr本体はペインの出力からエージェントの状態を自動検出するが、ソケットAPI経由で**外部から状態を申告する**こともできる。herdrが知らない自作のエージェントやバッチ処理をサイドバーに乗せたい場合の口。

```json
{"id":"req_1","method":"pane.report_agent","params":{
  "pane_id":"w1:p1","source":"custom:docs","agent":"docs-bot",
  "state":"working","message":"building docs"}}
```

`state`は`idle` / `working` / `blocked` / `done` / `unknown`。ほかに`pane.report_agent_session`でセッションIDを紐付けたり、`pane.report_metadata`で表示用のタイトルや状態ラベル、TTLを渡したりできる。

サイドバーの見せ方自体も`agent.view.set`で宣言的に制御でき、`eq` / `in` / `exists` / `all` / `any` / `not`のフィルタと、`attention`や`state_change_seq`などでのソートを指定した「ビュー」を登録できる。

## ペインへの画像描画

`pane.graphics.*`でペインに画像を重ねられる。`pane.graphics.info`で能力(セルサイズ、ピクセルマウス対応、レイヤ上限16など)を取得し、`pane.graphics.set`にbase64のPNGと配置を渡す静的描画と、専用ソケットを開いてフレームごとにヘッダ＋生バイト列を流す`pane.graphics.stream`がある。形式は`png` / `rgb` / `rgba` / `bgra`。

[[herdr-browser]]がペイン内にChromiumのスクリーンキャストをライブ表示できているのは、この層があるため。

#claude-code #tmux

## 出典

- [Socket API | herdr](https://herdr.dev/docs/socket-api/)
- [Plugins | herdr](https://herdr.dev/docs/plugins/)
