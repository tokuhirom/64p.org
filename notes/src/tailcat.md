---
created: 2026-08-27 21:56
updated: 2026-08-27 21:59
---
# Tailcat

[[tailscale|Tailscale]]のオープンソースコンポーネント([[wireguard|WireGuard]]のユーザースペース実装、magicsock、DERPリレー等)だけを取り出し、[netcat](https://en.wikipedia.org/wiki/Netcat)のように使えるCLIツール/Goライブラリにしたもの。Tailscale社が2026年8月のTailscaleUpカンファレンスでOSS公開した。"Tailscale without Tailscale, by Tailscale" と自称している。

Tailscale本体との最大の違いは、**コントロールプレーン(コーディネーションサーバー)を一切使わない**こと。tailnetへの参加もTailscaleアカウントも不要で、2台のマシン間の接続に必要なメタデータ(接続トークン)はDNS TXTレコード・口頭・Slackなど好きな方法でband外にやり取りする。root/管理者権限も不要で、OSのルーティングテーブルやDNS設定を変更しない。

## 仕組み

利用するTailscale由来のコンポーネント:

- **WireGuard**: 全トンネルトラフィックを暗号化するユーザースペース実装。カーネルのTUN/TAPデバイスを使わない。
- **magicsock**: [[nat|NAT]]越えを担う転送層。STUNによるエンドポイント探索とUDPホールパンチングを行う。
- **Netstack ([[gvisor|gVisor]])**: プロセス内で完結するユーザースペースTCP/IPスタック。これによりOS側のネットワーク設定なしにTCP接続の待受・発信ができる。
- **DERPリレー**: 直接P2P接続ができない場合のフォールバック経路。ランデブーのための中継チャネルにもなる。

### 接続トークン(ConnBlob)

サーバーは起動時に`tc`プレフィックス+base64エンコードされた[[cbor|CBOR]]からなる**接続トークン**を発行する。中身はサーバーのWireGuard公開鍵と、DERPリージョン情報(デフォルトDERPマップ中のリージョンIDを指す小さい整数、または埋め込み済みのDERPサーバーメタデータそのもの)。整数リージョンIDのみのトークンは約50バイトと短い。

### 接続確立の流れ

1. サーバーが鍵ペア(生成 or ロード)を用意し、DERPリレーに接続してトークンを表示。
2. クライアントがトークンをパースしてサーバーの公開鍵とDERPリージョンを知り、自分の鍵ペアを生成して同じDERPリレーに接続。
3. クライアントがDERP経由で"Meow"pingを送り(自分の公開鍵を含む)、サーバーが応答として"Meowed"を返してピアとして登録。
4. 両者がWireGuardピアとして設定され、通常のWireGuardハンドシェイクが(最初はDERP越しに)進行、トンネルが確立。
5. 並行してdiscoプロトコルによるUDPホールパンチングを試み、成功すればDERPリレーから直接P2P経路に格上げされる。失敗時はDERPが引き続きフォールバックとして機能する。
6. クライアントがサーバーのTCPポートにダイヤルすると、[[gvisor|gVisor]]のTCP/IPスタックが両側で接続をハンドリングし、サーバー側はポートに応じたハンドラ(localhostへのフォワード・stdoutへのパイプ・SSHセッションなど)にディスパッチする。

## 使い方の例

```sh
# stdin/stdoutをパイプ
$ tailcat
# 🐈 Server listening with new address: tcomFwWCC...

$ echo hello | tailcat tcomFwWCC...

# ローカルポートを公開
$ tailcat --serve=8080,8443

# 認証なしSSHサーバー
$ tailcat --serve=no-auth-ssh
$ tailcat ssh tcXXXXXXXXX

# 疎通確認(直接経路になるまでping)
$ tailcat ping --until-direct <token>

# トンネル越しのSOCKS5プロキシ
$ tailcat socks <token> curl http://server.tailcat:8081/
```

## 鍵管理

- **エフェメラル鍵(デフォルト)**: 実行のたびに新しい鍵をメモリ上に生成し、プロセス終了とともに破棄される。共有したアドレスはその1回限りで二度と使えなくなる安全な既定動作。
- **保存鍵**: `tailcat genkey`でディスクに鍵を保存し、再起動をまたいでアドレスを固定できる。反面、過去にそのアドレスを共有した相手は誰でも将来のサーバーに接続できてしまうため、`--allow=nodekey:...`でクライアントを制限するのが定石。

保存鍵と`--allow`を組み合わせると、SSHデーモンにパケットが届く前にWireGuardレベルでクライアントを認証する「ポートを一切開けない保護されたSSHサーバー」を構築できる。トークンはDNS TXTレコードとして公開でき、`tailcat ssh my-server.example.com`のようにドメイン名で到達できる。

## [[tailscale|Tailscale]]との関係

TailscaleはWireGuardベースの仮想プライベートネットワーク(tailnet)を、コーディネーションサーバーによる鍵配布・NAT越え支援・DNS管理で成立させるサービス。Tailcatはこのうちコーディネーションサーバー(コントロールプレーン)を丸ごと外し、データプレーン(magicsock・WireGuard・DERP)だけを2点間の使い捨て接続に流用したもの。tailnetのようなメッシュネットワークは作らず、常に1対1の接続。

#vpn #networking

## 出典

- [tailscale/tailcat: like netcat, but over Tailscale's data plane, without Tailscale's control plane](https://github.com/tailscale/tailcat)
