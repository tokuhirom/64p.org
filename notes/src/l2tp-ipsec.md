---
created: 2026-08-09
updated: 2026-08-09
---
# L2TP/IPsec

VPN(仮想プライベートネットワーク)を構築するための通信プロトコルの組み合わせ。

## 仕組み

- **L2TP (Layer 2 Tunneling Protocol)**: レイヤー2(データリンク層)でトンネルを作るプロトコル。PPP接続をIPネットワーク上でカプセル化する。L2TP自体には暗号化機能がない。
- **IPsec (Internet Protocol Security)**: IPパケットレベルで暗号化・認証を行うプロトコル群。

L2TP単体では通信内容が平文で流れるため、実運用ではIPsec(主にESPプロトコル)と組み合わせて暗号化するのが一般的で、この組み合わせを「L2TP/IPsec」と呼ぶ。

## 特徴

- 使用ポート: UDP 500(IKE)、UDP 4500(NAT-T)、UDP 1701(L2TP)
- 認証方式: 事前共有鍵(PSK)方式か証明書方式が一般的
- Windows・macOS・iOS・Androidに標準でクライアントが組み込まれているため、追加ソフトなしで利用できる

## 弱点と後継

NATトラバーサル(NAT越え)がやや不安定になりがちで、ファイアウォールでUDPポートがブロックされると接続できないことがある。近年はより高速・シンプルな[[wireguard|WireGuard]]や、TCPも使える #openvpn 、IKEv2/IPsecへの移行が進んでいる。

## 出典

- [Determining the Correct Ports for IPSec/L2TP | Baeldung on Linux](https://www.baeldung.com/linux/ipsec-lt2p-ports)
- [What are Ports Used for IPsec? - zenarmor.com](https://www.zenarmor.com/docs/network-basics/what-are-ports-used-for-ipsec)

#vpn #ipsec #networking
