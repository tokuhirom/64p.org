---
created: 2026-08-09
updated: 2026-08-09
---
# Incus

[[lxc|LXC]](コンテナ)とQEMU(仮想マシン)の両方を統一的に扱えるマネージャー/ハイパーバイザー。[[lxd|LXD]]から分岐(フォーク)したプロジェクト。 #linux

## LXDからのフォークの経緯

- LXDはStéphane Graberによって作られ、長年Linux Containersプロジェクトの一部として開発されてきた。
- 2023年、CanonicalがLXDの全コントリビューターに対し、Canonicalへコード全権を譲渡するCLA(Contributor License Agreement)への署名を要求し、LXDをLinux Containers傘下から引き離して自社の管理下に置いた。
- これを受けて、SUSE所属の開発者Aleksa SaraiがLXDの元リード開発者の支援を得て、LXDのフォークとして2023年8月にIncusを立ち上げた。
- 2023年8月7日にLinux Containersプロジェクトの正式メンバーとなり、2023年10月に最初のリリース(0.1)、2024年4月4日に長期サポート版(6.0 LTS)がリリースされた。

## 特徴

- CLAを伴わない、完全にコミュニティ主導のオープンソースプロジェクト(Apache 2.0ライセンス)。
- Debian stable、Fedora、openSUSE、NixOSなど各種ディストリビューションに既に取り込まれている。

## 出典

- [Linux Containers - Incus - Introduction](https://linuxcontainers.org/incus/)
- [Linux Containers Forks LXD Project As "Incus" - Phoronix](https://www.phoronix.com/news/Linux-Containers-LXD-Incus)
- [Incus Project: A Breakaway from Canonical's LXD](https://linuxiac.com/incus-project-lxd-fork/)
- [GitHub - lxc/incus](https://github.com/lxc/incus)
