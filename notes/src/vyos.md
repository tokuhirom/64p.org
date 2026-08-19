---
created: 2026-08-19 12:20
updated: 2026-08-19 12:20
---
# VyOS

Debian GNU/Linuxをベースにした、オープンソースのネットワークOS(NOS)。ルーティング・ファイアウォール・NAT・VPNなど、従来は高価な専用ネットワーク機器でしか使えなかった機能をソフトウェアとして提供する。[[opensource-router-os|オープンソースのルーター/ファイアウォールOS]]の1つ。

## 特徴

- 標準的なamd64/i586/ARMのx86ハードウェアや仮想マシン上で動作し、クラウド環境でもルーター・ファイアウォールとして利用できる。
- OSPF・BGP・MPLSなど、エンタープライズ向けルーティングプロトコルに標準対応。
- 設定はCisco IOS風のCLIコマンドで行い、単一の統一された設定ツリーとして扱える（設定のコミット/ロールバックが可能）。
- ビジネスモデルは「ビルド済みバイナリの有償配布 + サポート + カスタム開発」で、ソースコード自体はオープン。

## [[opensource-router-os]]の中での位置づけ

x86ハードウェア/VM上で動く汎用ルーターOSの中で、エンタープライズ向けルーティングプロトコル(OSPF/BGP/MPLS)への標準対応とCisco IOS風CLIが特徴。[[pfsense|pfSense]]/[[opnsense|OPNsense]]がFreeBSDベースでWebGUI中心なのに対し、VyOSはDebianベースでCLI中心。

- ルーティング機能の実装には[[frrouting|FRRouting (FRR)]]をバックエンドとして利用している。

## 出典

- [VyOS公式サイト](https://vyos.io/)
- [About — VyOS 1.4.x (sagitta) LTS](https://docs.vyos.io/en/1.4/introducing/about.html)
- [VyOS: The Open Source Router/Firewall - LinkedIn](https://www.linkedin.com/pulse/vyos-open-source-routerfirewall-mohammed-salameh)
- [FRR — VyOS 1.5.x (circinus) LTS documentation](https://docs.vyos.io/en/1.5/configuration/system/frr.html)

#networking
