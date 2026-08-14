---
created: 2026-08-14 12:28
updated: 2026-08-14 12:28
---
# ProxyJump

#ssh #network

OpenSSH 7.3で追加された、踏み台（bastion/jump host）を経由してSSH接続する機能。`ssh -J`オプション、または`~/.ssh/config`の`ProxyJump`ディレクティブで指定する。

```sh
ssh -J jump.example.com target.internal
```

## 仕組み

クライアントはまずジャンプホストへSSH接続し、そのトンネルを通してターゲットホストへの接続を確立する。ジャンプホスト自体は中継のみを行い、SSHセッションはクライアント〜ターゲット間でエンドツーエンドの暗号化が保たれる（ターゲット側からは「バスチョン経由で接続が来た」ように見えるが、通信内容自体はバスチョンを素通りする）。

これは[[ssh-agent]]の`ssh -A`によるAgent Forwardingとの重要な違いでもある。Agent Forwardingはリモートホストにagentソケット自体を転送するため、リモートホストの管理者に秘密鍵の署名機能を悪用されるリスクがあるが、ProxyJumpではローカルのsshクライアントが複数ホップ分の認証を行うだけで、agentソケットをリモートに晒さずに済む。

## ProxyCommandとの関係

ProxyJumpが導入される以前は、`ProxyCommand`を使って同様のことを実現していた。

```sh
ssh -o ProxyCommand="ssh -W %h:%p jump.example.com" target.internal
```

`ProxyCommand`は任意のコマンドを実行してターゲットへの接続を開くための汎用的な仕組みで、上記のように`ssh -W`（stdioをリモートホストへの単一接続に転送するオプション）と組み合わせることで踏み台越しの接続を実現していた。ProxyJumpは内部的にこの仕組みを使いつつ、より短く分かりやすい専用構文として提供されている。

## `~/.ssh/config`での設定

```
Host jump
    HostName jump.example.com
    User alice

Host target
    HostName target.internal
    User alice
    ProxyJump jump
```

## 複数ホップ

カンマ区切りで複数のジャンプホストを指定でき、左から右へ順にホップしていく。

```sh
ssh -J jump1.example.com,jump2.example.com target.internal
```

## 出典

- [Tutorial: How to Use SSH ProxyJump and SSH ProxyCommand - Teleport](https://goteleport.com/blog/ssh-proxyjump-ssh-proxycommand/)
- [SSH ProxyJump Explained (and a Better Alternative) - StrongDM](https://www.strongdm.com/blog/ssh-proxyjump)
- [SSH to remote hosts through a proxy or bastion with ProxyJump - Red Hat](https://www.redhat.com/en/blog/ssh-proxy-bastion-proxyjump)
