---
created: 2026-08-10 16:44
updated: 2026-08-10 16:49
---
# Tailscale

離れた場所にあるデバイス同士を1つの仮想プライベートネットワーク(**tailnet**と呼ばれる)にまとめ、それぞれに固定の内部IPアドレスを割り当てて相互接続するサービス。ルーターのポート開放が不要で、グローバルIPを持たない環境でも接続できる点が、従来の手組みVPNとの大きな違い。

## 仕組み

- ベース層はオープンソースVPNプロトコル[[wireguard|WireGuard]](Goによるユーザースペース実装)
- 自分の所有する端末のみで構成される**peer-to-peer mesh network**を作り、複数端末が必要に応じて中継しながら複数経路を取りうる構成になる
- **[[nat|NAT]] traversal**: STUNによる発見、Discoプロトコルによるピア間発見、複数経路の中から最速のものを選ぶレース戦略などを組み合わせ、ポート開放なしに直接のP2P接続を優先的に確立する
- **DERP (Designated Encrypted Relay for Packets)**: symmetric NATやキャリアグレードNAT、制限の厳しいファイアウォールなどでP2P直接接続ができない場合のフォールバックとして、HTTPS経由でWireGuard暗号化パケットを中継する暗号化リレーサーバー群。DERPサーバー自体は復号を行わず、暗号文をそのまま中継するだけなのでエンドツーエンド暗号化は保たれる
- **MagicDNS**: 各ノードに安定したホスト名を割り当てる機能

## [[wireguard]]との関係

TailscaleはWireGuardプロトコルをそのまま使いつつ、鍵配布・NAT越え・DNSなど「WireGuardを手組みで使う際に面倒な部分」をコーディネーションサーバーとクライアントソフトウェアで肩代わりするサービス。WireGuard自体はプロトコル/実装であり、鍵交換やNAT越えの仕組みは利用者側で構築する必要がある。

#vpn #networking

## 出典

- [Tailscaleの仕組みから学ぶネットワークの基本 - Zenn](https://zenn.dev/digeon/articles/tailscale-remote-access-mechanism)
- [Tailscaleの安全性を解説 - issoh](https://www.issoh.co.jp/tech/details/5403/)
- [Tailscale encryption · Tailscale Docs](https://tailscale.com/kb/1504/encryption)
- [How Tailscale is improving NAT traversal (part 1)](https://tailscale.com/blog/nat-traversal-improvements-pt-1)
- [DERP servers · Tailscale Docs](https://tailscale.com/docs/reference/derp-servers)
