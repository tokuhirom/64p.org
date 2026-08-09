---
created: 2026-08-09
updated: 2026-08-09
---
# LXD

[[lxc|LXC]]をベースにした、Canonical(Ubuntu開発元)によるシステムコンテナ・仮想マシンの統合管理システム。 #linux

## 特徴

- 「システムコンテナ」と「仮想マシン」の2種類のインスタンスをサポートする。システムコンテナはホストカーネルの機能を使って仮想的なOS環境をシミュレートするのに対し、仮想マシンはホストのハードウェアを使いつつカーネル自体は仮想マシン側が提供する。
- 単一アプリケーションの実行に特化したDockerの「アプリケーションコンテナ」とは異なり、より完全なLinuxシステムを1つのコンテナ内で動かす用途に向く。
- シンプルなREST APIを中心に構築されており、単一マシンから大規模クラスタまでスケール可能。
- スナップショットのイメージ化・別ホストへのライブマイグレーション・コンテナごとのCPU/メモリ/IO負荷制限など、運用向けの機能を備える。

## Incusとの関係

2023年、CanonicalがLXDの全コントリビューターにCLA(Contributor License Agreement)署名を要求し、LXDをLinux Containersプロジェクトの傘下から引き離して自社管理下に置いた。これを受けて、コミュニティ主導のフォークとして[[incus|Incus]]が立ち上げられた。

## 出典

- [LXD | Canonical](https://canonical.com/lxd)
- [GitHub - canonical/lxd: Powerful system container and virtual machine manager](https://github.com/canonical/lxd)
- [Containers and VMs - LXD documentation](https://canonical.com/lxd/docs/latest/explanation/instances/)
