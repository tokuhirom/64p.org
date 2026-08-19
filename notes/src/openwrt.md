---
created: 2026-08-19 12:20
updated: 2026-08-19 12:20
---
# OpenWrt

ルーター・アクセスポイント・レジデンシャルゲートウェイなど、組み込みネットワーク機器向けのLinuxディストリビューション。静的なファームウェアではなく、パッケージ管理システム(opkg/apk)でアプリケーションを追加・削除できる柔軟な構成が特徴。[[opensource-router-os|オープンソースのルーター/ファイアウォールOS]]の1つ。

## 特徴

- 主要コンポーネントはLinuxカーネル・uClibc(またはmusl)・BusyBoxで、家庭用ルーターの限られたストレージ・メモリに収まるよう最適化されている。
- `/etc/config/`以下の統一設定システム(UCI: Unified Configuration Interface)と、Web UIの**LuCI**を備える。
- 3,000以上のパッケージが用意されており、対応機種であれば同じ構成を横展開しやすい。
- 元々はWi-Fiルーター向けだが、現在は有線ルーター・スマートフォン・ノートPC・x86 PCなど幅広いデバイスで動く。
- ベンダー純正ファームウェアの機能制限から解放され、機器を自由にカスタマイズできる点が主な利用動機。

## [[opensource-router-os]]の中での位置づけ

[[vyos|VyOS]]/[[pfsense|pfSense]]/[[opnsense|OPNsense]]が「汎用PC/VMをルーターにする」方向なのに対し、OpenWrtは「既存の小型ルーター機器のファームウェアを置き換える」方向のプロダクト。想定ハードウェアの規模が桁違いに小さい。

## 出典

- [OpenWrt - GNU/Linux Rapid Embedded Programming - O'Reilly](https://www.oreilly.com/library/view/gnu-linux-rapid-embedded/9781786461803/ch05s02.html)
- [OpenWrt - Linux distribution targeting embedded devices - LinuxLinks](https://www.linuxlinks.com/openwrt-linux-distribution-targeting-embedded-devices/)
- [What Is OpenWrt And Why Should I Use It For My Router? - MakeUseOf](https://www.makeuseof.com/tag/what-is-openwrt-and-why-should-i-use-it-for-my-router/)

#networking
