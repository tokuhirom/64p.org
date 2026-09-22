---
created: 2026-09-22 00:15
updated: 2026-09-22 01:06
---
# herdrのプラグイン機構

[[herdr]]本体はターミナルマルチプレクサとしての役割に絞られており、周辺機能はプラグインとして外に出す設計になっている。[[herdr-browser]]や[[herdr-plus|herdr plus]]はいずれもこの機構の上に乗っている。

プラグインの実体は、`herdr-plugin.toml`というマニフェストと、herdrが起動できるコマンドを置いたディレクトリ。herdrはそれを**別プロセスとして起動する**だけなので、Bash・JavaScript・Lua・Rust・PowerShellなど、マシンで実行できるものなら言語は問わない。

## SDKが無い — CLIそのものがAPI

この機構の一番の特徴。専用のプラグインSDKは存在せず、

> The entire Herdr CLI is the plugin API: every command in the CLI reference is available to a plugin, and anything you can run as `herdr ...` yourself a plugin can run too.

という方針になっている。プラグインは環境変数`HERDR_BIN_PATH`が指すherdrバイナリを呼び戻すことでherdrを操作する。Unixドメインソケットと Windows の名前付きパイプの差をherdr側が吸収してくれるため、プラグインの移植性はCLI経由の方が高い。

ホスト側(herdr)が責任を持つのは、インストール・マニフェスト検証・キーバインド・ペイン・イベント・呼び出しコンテキスト・ソケットアクセスといった土台の部分。

## マニフェストと拡張ポイント

```toml
id = "example.layout"
name = "Layout"
version = "0.1.0"
min_herdr_version = "0.7.0"
description = "Apply project layouts"
platforms = ["linux", "macos", "windows"]

[[build]]
command = ["npm", "ci"]

[[startup]]
command = ["node", "dist/restore.js"]

[[actions]]
id = "apply"
title = "Apply layout"
contexts = ["workspace"]
command = ["node", "dist/apply.js"]

[[events]]
on = "worktree.created"
command = ["herdr", "workspace", "list"]

[[panes]]
id = "board"
title = "Project board"
placement = "overlay"
command = ["herdr-board"]

[[link_handlers]]
id = "github-issue"
title = "Open GitHub issue"
pattern = "^https://github\\.com/[^/]+/[^/]+/(issues|pull)/[0-9]+$"
action = "apply"
```

必須フィールドは`id` / `name` / `version` / `min_herdr_version`。拡張ポイントは5種類。

- `[[startup]]` — セッション復元後に一度だけ走る初期化フック。常駐サービスの供給ではない(監視・再起動はされない)
- `[[actions]]` — キーバインドやUIから呼べるコマンド。`herdr plugin action invoke`で叩ける。config側からは`type = "plugin_action"`でキーに割り当てる
- `[[events]]` — herdrのイベントに反応するフック。`on = "worktree.created"`のように書く。[[herdr-plus|herdr plus]]がworktree作成時にレイアウトを流し込んでいるのはこれ
- `[[panes]]` — ペインとして開くTUI。`placement`に`overlay` / `popup` / `split` / `tab` / `zoomed`を指定できる
- `[[link_handlers]]` — ターミナル内のURLへの修飾クリックを正規表現でマッチさせ、アクションにルーティングする

`[[build]]`はインストール時に走るビルドコマンド。`platforms`で対象OSを絞れる。

## 文脈は環境変数で渡ってくる

プラグインのコマンドには、herdrから実行時の文脈が環境変数として注入される。

| 変数 | 内容 |
| --- | --- |
| `HERDR_BIN_PATH` | 呼び戻すherdrバイナリ |
| `HERDR_SOCKET_PATH` | ソケットAPIのパス |
| `HERDR_ENV=1` | herdr配下で動いている印 |
| `HERDR_PLUGIN_ID` / `HERDR_PLUGIN_ROOT` | 自分のIDとチェックアウト先 |
| `HERDR_PLUGIN_CONFIG_DIR` / `HERDR_PLUGIN_STATE_DIR` | 設定と状態の置き場 |
| `HERDR_PLUGIN_CONTEXT_JSON` | 呼び出し文脈のJSON |
| `HERDR_WORKSPACE_ID` / `HERDR_TAB_ID` / `HERDR_PANE_ID` | 取れる場合のみ |

ほかに、アクションには`HERDR_PLUGIN_ACTION_ID`、イベントフックには`HERDR_PLUGIN_EVENT`と`HERDR_PLUGIN_EVENT_JSON`、ペインには`HERDR_PLUGIN_ENTRYPOINT_ID`が渡る。

## 下位レイヤとしてのソケットAPI

CLIの下には、稼働中のherdrを直接叩く[[herdr-socket-api|ソケットAPI]]がある。改行区切りJSON(ndjson)で1行1リクエスト、レスポンスは同じ`id`を返す。

```json
{"id":"req_1","method":"ping","params":{}}
{"id":"req_1","result":{"type":"pong"}}
```

トランスポートはUnixではドメインソケット、Windowsでは名前付きパイプ。デフォルトは`~/.config/herdr/herdr.sock`で、名前付きセッションは`~/.config/herdr/sessions/<name>/herdr.sock`。

ドキュメントは「ほとんどの自動化はCLIラッパーから始めるべきで、生のソケットAPIはリクエスト/レスポンスを直接制御したい場合や、長寿命のイベント購読が必要な場合にだけ使う」としている。さらに上のレイヤとして、エージェントにherdrの操作方法を教える[[herdr-agent-skill|agent skillファイル]]がある。

## インストールと開発

```sh
# GitHubから入れる。リポジトリに複数プラグインがあればサブディレクトリまで指定
herdr plugin install owner/repository
herdr plugin install owner/repository/subdir

# ローカル開発用。ビルドコマンドをスキップする
herdr plugin link /path/to/plugin
```

インストールはクローン → プレビュー表示 → ビルドコマンド実行 → 登録、という流れ。これらのCLIはherdrサーバーが起動していなくてもレジストリに書き込み、次回起動時に読み込まれる。

躓きやすい点。

- コマンドは**argv配列**で、シェル展開は行われない
- **自動更新の仕組みが無い**。更新したければ入れ直す
- 認証情報はチェックアウト先ではなく`HERDR_PLUGIN_CONFIG_DIR`に置く。GitHubからの再インストールでチェックアウトは置き換わるため

## サンドボックスは無い

プラグインは自分の権限でそのまま動く普通のコードで、herdr CLIの全機能を呼べる。ドキュメントも「herdrはプラグインが何をするかをレビューもサンドボックス化もしない。サードパーティのプラグインは作者から来るものであってherdrから来るものではないので、各自で検証し、自己責任で動かすこと」と明言している。エディタ拡張やシェルスクリプトと同じ姿勢で読んでから入れるべき、という位置づけ。

#claude-code #tmux

## 出典

- [Plugins | herdr](https://herdr.dev/docs/plugins/)
- [Socket API | herdr](https://herdr.dev/docs/socket-api/)
- [herdr/docs/.../plugins.mdx - GitHub](https://github.com/herdrdev/herdr/blob/master/docs/versions/0.8.0/website/src/content/docs/plugins.mdx)
- [A practical guide to Herdr plugins - Flavio Copes](https://flaviocopes.com/herdr-plugins/)
