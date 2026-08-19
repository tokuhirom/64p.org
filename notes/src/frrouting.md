---
created: 2026-08-19 12:20
updated: 2026-08-19 12:20
---
# FRRouting (FRR)

Linux/UnixプラットフォームでBGP・OSPF・RIP・IS-IS・PIM・LDP・BFD等の主要ルーティングプロトコルを実装する、オープンソースのIPルーティングプロトコルスイート。GPLv2ライセンス。[[opensource-router-os|オープンソースのルーター/ファイアウォールOS]]と隣接する、ルーティングプロトコル実装そのものに特化したソフトウェア。

## 特徴

- Quaggaプロジェクトから派生。長年Quaggaの開発に携わってきたメンバーが集まり、その基盤を発展させる形で立ち上げられた。
- 安価なSBCから商用グレードのルーターまで幅広いハードウェアで動作し、フルインターネットルーティングテーブルも扱える。
- 設定スタイルがCisco IOSに似ており、ネットワークエンジニアにとって習得しやすい。
- Linuxカーネルの開発スタイルに倣った開発体制を採用。
- 単体のルーターOSというより、ルーティングデーモン群(プロトコルスタック)として他のLinuxディストリビューションやツールに組み込んで使われることが多い。

## [[opensource-router-os]]の中での位置づけ

VyOS/pfSense/OPNsense/OpenWrtが統合された「OS/ファームウェア」であるのに対し、FRRoutingは単体のルーティングプロトコルスタック(デーモン群)。実際、VyOSはルーティング機能の実装にFRRoutingを利用している。

## 出典

- [FRRouting公式サイト](https://frrouting.org/)
- [FRRouting User Guide - FRRouting](https://docs.frrouting.org/en/latest/index.html)
- [GitHub - FRRouting/frr](https://github.com/frrouting/frr)
- [FRR — VyOS 1.5.x (circinus) LTS documentation](https://docs.vyos.io/en/1.5/configuration/system/frr.html)

#networking
