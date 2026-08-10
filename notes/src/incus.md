---
created: 2026-08-09 22:30
updated: 2026-08-10 16:57
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
- Debian stable、Fedora、openSUSE、[[nixos|NixOS]]など各種ディストリビューションに既に取り込まれている。

## 開発の活発さ([[lxd|LXD]]との比較)

GitHub APIで両リポジトリを比較(2026-08-09時点)。

| 指標 | Incus (`lxc/incus`) | LXD (`canonical/lxd`) |
|---|---|---|
| Stars | 5,882 | 4,809 |
| Forks | 472 | 1,036 |
| Open issues | 46 | 409 |
| 過去90日のコミット数 | 約1,951 | 約1,917 |
| コントリビューター数(概算) | 約597 | 約479 |

コミット数そのものはほぼ拮抗しているが、open issuesの滞留数はLXDの方が大きく、コントリビューター数・starsではIncusがやや上回る。リリース体制も異なり、Incusは単一のメインライン(7.x系)を月1ペースで継続リリースするのに対し、LXDは4.0/5.0/5.21など複数バージョン系列を並行メンテしている。

## 出典

- [Linux Containers - Incus - Introduction](https://linuxcontainers.org/incus/)
- [Linux Containers Forks LXD Project As "Incus" - Phoronix](https://www.phoronix.com/news/Linux-Containers-LXD-Incus)
- [Incus Project: A Breakaway from Canonical's LXD](https://linuxiac.com/incus-project-lxd-fork/)
- [GitHub - lxc/incus](https://github.com/lxc/incus)
