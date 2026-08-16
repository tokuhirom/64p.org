---
created: 2026-08-16 23:36
updated: 2026-08-16 23:36
---
# Tailscale Funnel

[[tailscale|Tailscale]]の機能の1つで、ローカルで動いているサービス・ファイル・ディレクトリを、tailnet内だけでなくインターネット全体に公開する仕組み。ファイアウォールのポート開放やNAT設定なしに、ラズパイ上のWebサイトやローカルのwebhook開発、開発中のWebアプリなどをそのまま外部公開できる。コマンドは`tailscale funnel 3000`のようにシンプルで、ローカルの3000番ポートを1コマンドで公開できる。

## 動作の仕組み

Funnelを有効にすると、Tailscaleが`node名.tailnet名.ts.net`というホスト名に対するパブリックDNSレコードを、Tailscaleのリレーサーバー(Funnelサーバー)向けに設定する。外部からそのURLへのアクセスが来ると、Funnelサーバーがリクエストを受け、TLSで暗号化された接続を通じて手元のデバイスへTCPプロキシする。インターネット上のクライアントが直接手元のマシンに接続することはなく、常にTailscaleのリレー経由になる。TLS証明書は自動発行され、常時TLS暗号化必須。リッスンできるポートは443・8443・10000の3つに限定される。

## Tailscale Serveとの違い

似た機能に**Tailscale Serve**があるが、こちらはtailnet内(自分のTailscaleネットワークに参加しているデバイス・メンバーのみ)にしか公開されない。FunnelはServeを拡張し、tailnetの外・Tailscaleを使っていない一般のインターネットユーザーにも公開する点が異なる。同じポート番号をServeとFunnelで同時に使うことはできない。

#vpn #networking

## 出典

- [Tailscale Funnel · Tailscale Docs](https://tailscale.com/docs/features/tailscale-funnel)
- [Tailscale Funnel: Securely Expose Local Services to the Internet](https://tailscale.com/blog/introducing-tailscale-funnel)
- [Reintroducing Serve and Funnel: even simpler sharing with your tailnet (or the world!)](https://tailscale.com/blog/reintroducing-serve-funnel)
- [Tailscale Serve · Tailscale Docs](https://tailscale.com/docs/features/tailscale-serve)
