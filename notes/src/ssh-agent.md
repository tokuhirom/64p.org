---
created: 2026-08-14 12:25
updated: 2026-08-14 12:25
---
# ssh-agent

#ssh #security

OpenSSH付属のバックグラウンドプログラムで、SSH認証用の秘密鍵をメモリ上に保持・管理するツール。パスフレーズ付き秘密鍵を、SSH接続のたびに毎回入力させられる煩わしさを解消するために存在する。一度`ssh-add`でパスフレーズを入力して鍵を登録すれば、以降はagentが保持した鍵を使って認証をこなしてくれる、システム上の一種のシングルサインオンとして機能する。

## 仕組み

- 起動すると`SSH_AUTH_SOCK`環境変数が指すUNIXドメインソケットを公開する。`ssh`クライアントや`ssh-add`はこのソケット経由でagentと通信する。
- プロトコル自体は単純で、鍵の追加・削除、保持している鍵の一覧表示、メッセージへの署名、agent自体のロック/アンロックといった操作を提供する。
- 重要な設計上の特徴として、**秘密鍵そのものはソケット越しに一切送信されない**。署名が必要な操作（認証チャレンジへの署名など）はagentプロセスの内部で実行され、結果だけが呼び出し元に返される。鍵はディスクにも書き出されず、エクスポートもできない。
- なお、SSHセッション自体の通信暗号化には登録した鍵ペアは使われない。ハンドシェイク完了後に生成される一時的な対称鍵が使われ、登録鍵は認証時の署名操作にのみ用いられる。

## Agent Forwarding

`ssh -A`を使うと、ローカルのSSH agentソケットを接続先のリモートホストに転送できる。踏み台（bastion）サーバーを経由して多段SSHする際、各ホップでagentを起動し直さずにローカルの鍵を使い回せるので便利。

### セキュリティリスク

転送先のリモートホストでroot権限を持つ人物（あるいはそのホストを侵害した攻撃者）は、転送されてきたソケットに触れることで、こっそりローカルの秘密鍵の署名機能を呼び出せてしまう。鍵そのものが漏れるわけではないが、そのセッションが生きている間は「あなたになりすまして」別のマシンへ接続されうる。

対策として以下が挙げられる。

- Agent Forwardingを`~/.ssh/config`でデフォルト有効にせず、必要なときだけ`-A`オプションを付けて使う。
- `ssh-add -x` / `ssh-add -X`でagentをロック/アンロックし、不要な間は鍵を使えなくする。
- Secretive（macOSのSecure Enclave + Touch ID統合agent）のように、生体認証をセッションごとに要求するagentを使う。
- Agent Forwardingの代替として`ProxyJump`（`ssh -J bastion.example.com target.internal`）を使う。この方式では、ローカルのsshクライアント自身が複数ホップ分のハンドシェイクを行い、agentソケット自体をリモートホストに晒さずに済む。

## 出典

- [How to Use ssh-agent to Manage Private Keys | Linode Docs](https://www.linode.com/docs/guides/using-ssh-agent/)
- [Guide to ssh-agent | Baeldung on Linux](https://www.baeldung.com/linux/ssh-agent-guide)
- [ssh-agent(1) - Linux manual page](https://www.man7.org/linux/man-pages/man1/ssh-agent.1.html)
- [SSH Agent Explained - Smallstep](https://smallstep.com/blog/ssh-agent-explained/)
- [SSH Agent Man - How does SSH agent work? - Edwin Jones](https://edwinjones.me.uk/ssh-agent-man/)
