---
created: 2026-08-20 11:10
updated: 2026-08-20 11:10
---
# bootc

Red Hatが主導するオープンソースプロジェクト。OCI(Open Container Initiative)準拠のコンテナイメージをそのままブート可能なホストOSとして扱う。通常のアプリケーションコンテナがホストOSの上で動くのに対し、bootcイメージはLinuxカーネル・ブートローダー・デバイスドライバ・systemdなどのシステムサービス・ユーザースペースパッケージ一式を含み、それ自体がホストOSになる。 #linux #infrastructure #container

## 仕組み

- OS全体を1つのOCIイメージとして扱い、[[podman|Podman]]/Docker/buildkitなど既存のコンテナツールでContainerfile(Dockerfile)からビルドできる
- OSアップデートはこのイメージを新しいタグでpullし直すことに相当し、**トランザクショナル(アトミック)** に適用される。失敗時は直前の正常な世代へクリーンにロールバック可能
- 内部的には[[ostree|OSTree]]をバッキングモデルとして使っており、コンテナソースを使う場合`rpm-ostree upgrade`と`bootc upgrade`は実質的に等価な処理になる。ただしbootcは「システムの状態はコンテナイメージから来るべき」という立場を明確にとっており、将来的にはOSTreeへの依存を減らし`rpm-ostree`との互換性を打ち切る方向で開発が進んでいる

## 作者・位置づけ

[[ostree|OSTree]]の作者でもあるRed HatのエンジニアColin Waltersが開発。本人は「成功すれば(rpm-)ostreeの後継になる」と位置づけている。rpm-ostreeが「RPMパッケージ管理+OSTree」というRed Hat/Fedora独自路線だったのに対し、bootcは業界標準のOCIコンテナ形式を配布・更新のトランスポートとして採用することで、コンテナエコシステムの知見(レジストリ、署名、CI/CDパイプライン)をそのままOS更新に転用できるようにした点が異なる。

## 対応ディストリビューション

Fedora、CentOS Stream、RHEL、AlmaLinuxが公式のbootcベースイメージを提供している。デスクトップ向けディストリビューションのBluefinもbootcベース。非公式にDebian、Gentoo、Ubuntuなどの派生イメージも存在する。[[fedora-coreos|Fedora CoreOS]]やFedora Silverblue/KinoiteといったOSTree系イミュータブルディストリビューションと同じ設計思想(ルートファイルシステム読み取り専用、アプリはコンテナで動かす)を、コンテナイメージという単位でより汎用的に扱い直したものと位置づけられる。

## ユースケース

- エッジ環境でのリモートシステムの無人アップデート
- 大量の均一なホストを揃えるフリート管理
- OSイメージ全体をCI/CDパイプラインでビルド・テストする運用
- 設定ドリフト(構成のズレ)を防ぎたい環境

## 出典

- [bootc: Getting started with bootable containers | Red Hat Developer](https://developers.redhat.com/articles/2024/09/24/bootc-getting-started-bootable-containers)
- [Shape the Future of Linux: Contribute to bootc Open Source Project | Red Hat Developer](https://developers.redhat.com/blog/2025/07/23/shape-future-linux-contribute-bootc-open-source-project)
- [Bringing bootc to AlmaLinux | AlmaLinux OS](https://almalinux.org/blog/2024-09-02-bootc-almalinux-heliumos/)
- [Introduction - bootc](https://bootc-dev.github.io/bootc/)
- [Relationship with other projects - bootc](https://bootc.dev/bootc/relationships.html)
- [GitHub - bootc-dev/bootc](https://github.com/bootc-dev/bootc)
