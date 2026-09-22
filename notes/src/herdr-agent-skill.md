---
created: 2026-09-22 01:06
updated: 2026-09-22 01:06
---
# herdrのagent skillファイル

[[herdr]]がエージェント向けに配布している、herdr自身の操作方法を教えるMarkdownの指示書。[[herdr-socket-api|ソケットAPI]]の3レイヤのうち、一番上の「Agent skill」レイヤに相当する。

「エージェントがherdrを操作するためのものがskillで、エージェントが人間にherdrを教えるためのものがguide」(The skill is for an agent operating Herdr; the guide is for an agent teaching a human)と役割が整理されている。

## 入手方法

```sh
herdr --skill
```

バイナリに同梱された、そのリリースに対応するコピーが出力される。GitHub上のタグ付きパスからも取れる(`herdrdev/herdr`の`skills/herdr/SKILL.md`)。

グローバルに入れる場合は、

```sh
npx skills add herdrdev/herdr --skill herdr -g
```

入れたうえでherdrの中からエージェントを起動する(`herdr claude`のように)。

## 何をできるようになるか

skillを読んだエージェントは、自分が置かれているherdrセッションを操作できるようになる。

- ワークスペース・タブ・ペイン、そして**隣のエージェント**を検査する
- フォーカスを奪わずにペインを分割してコマンドを走らせる
- ペインの出力や最近のログを読む
- サーバーの起動、テストの完了、**別のエージェントの完了**を待つ
- 兄弟ペインに補助エージェントを起動する

「隣のエージェントを見る」「別のエージェントの完了を待つ」「補助エージェントを起動する」あたりが、単なるターミナル操作と違う部分。エージェントがマルチプレクサ越しに他のエージェントを観測・起動できるので、herdrがオーケストレーションの土台になる。

## `HERDR_ENV=1`によるガード

skillの安全弁はここ。エージェントは操作の前に環境変数`HERDR_ENV=1`が設定されているかを確認し、**設定されていなければ中断して「herdr管理下のペインで動いていない」と伝える**よう指示されている。

`HERDR_ENV=1`が立っているのは、herdrが管理するペインの中で動いている場合だけ。つまり「ローカルのherdrソケットに話しかけて構わない文脈かどうか」の判定を、この環境変数1つに集約している。skillを読んだエージェントがherdrの外で動いているときに、無関係なセッションを操作しに行かないための作り。

## 考えたこと

[[herdr-plugins|プラグイン機構]]が「CLI全体がプラグインAPI」という方針を採っているのと、このskillは同じ思想の延長にある。専用のSDKやツール定義を用意するのではなく、**すでにあるCLIを説明する文書を配る**ことでエージェント向けのインターフェイスを済ませている。MCPサーバーのようにプロトコルを立てる方向とは対照的なアプローチで、CLIが十分に整っているならこれで足りる、という判断に見える。

#claude-code #tmux #ai-agent

## 出典

- [Agent skill file | herdr](https://herdr.dev/docs/agent-skill/)
- [Socket API | herdr](https://herdr.dev/docs/socket-api/)
