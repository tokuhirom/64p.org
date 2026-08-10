---
created: 2026-08-10 16:49
updated: 2026-08-10 16:49
---
# NAT (Network Address Translation)

インターネットプロトコルによるネットワークにおいて、パケットヘッダに含まれるIPアドレスを別のIPアドレスに変換する技術。家庭用・業務用を問わず、インターネット接続用のルーターや無線LANアクセスポイントで標準的に使われている。

## 仕組み

NATは「NATテーブル」を持ち、変換前後のIPアドレスの対応を記録する。これにより戻ってきたパケットを、元のリクエスト元に正しく返却できる。

## 種類

- **Source NAT** / **Destination NAT**の2種類に大別される
- IPアドレスに加えてポート番号も変換するものは**NAPT**(Network Address Port Translation。IPマスカレードとも呼ばれる)と呼ぶ
- STUNプロトコルによる分類では、**Full Cone NAT**・**Restricted Cone NAT**・**Port Restricted Cone NAT**・**Symmetric NAT**の4種類がある

## NAT越え(NAT traversal)

NAT配下の端末同士がP2P通信する際の課題。TCPは3ウェイハンドシェイクの都合上hole punchingができないためUDPが使われる(UDP hole punching)。ポートをランダムに割り当てる**Symmetric NAT**は特に通過が難しく、その場合はサーバー中継が確実な手段となる。

[[tailscale]]はSTUNによる発見やDiscoプロトコル、レース戦略などを組み合わせて直接P2P接続を優先的に確立し、Symmetric NATなどでどうしても直接接続できない場合は[[wireguard|WireGuard]]の暗号化パケットをそのまま中継する専用リレーサーバー(DERP)にフォールバックする。

[[l2tp-ipsec|L2TP/IPsec]]はNAT越え(NAT-T)がやや不安定になりがちで、ファイアウォールでUDPポートがブロックされると接続できないことがある。

#networking

## 出典

- [ネットワークアドレス変換 - Wikipedia](https://ja.wikipedia.org/wiki/%E3%83%8D%E3%83%83%E3%83%88%E3%83%AF%E3%83%BC%E3%82%AF%E3%82%A2%E3%83%89%E3%83%AC%E3%82%B9%E5%A4%89%E6%8F%9B)
- [NATとは？アドレス変換の仕組みや必要性、NAPTとの違いを解説 - baremetal blog](https://baremetal.jp/blog/2023/09/08/1298/)
- [ネットワーク アドレス変換 (NAT) とは - チェック・ポイント・ソフトウェア](https://www.checkpoint.com/jp/cyber-hub/network-security/what-is-network-address-translation-nat/)
- [NATを越えろ - くるむテックブログ](https://kuniiskywalker.github.io/2020/05/15/NAT%E3%82%92%E8%B6%8A%E3%81%88%E3%82%8D/)
- [NAT Traversalって知ってますか - Cerevo TechBlog](https://tech-blog.cerevo.com/adventcalendar2016/advent24/)
