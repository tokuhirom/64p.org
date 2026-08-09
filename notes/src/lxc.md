---
created: 2026-08-09
updated: 2026-08-09
---
# LXC (Linux Containers)

Linuxカーネルのコンテナ機能(cgroups・namespaces)をユーザ空間から操作するためのAPI・ツール群。軽量な仮想化技術のひとつ。 #linux #kernel

## 仕組み

Linuxカーネルの`cgroups`(リソース制御)と`namespaces`(プロセス・ファイルシステム・IPC・ネットワークなどの隔離)を利用し、ハイパーバイザー型の仮想化より少ないオーバーヘッドでコンテナを実現する。

## システムコンテナという性質

カーネルはホストと共有しつつ、コンテナ内はほぼ独立したLinux環境として動作する「システムコンテナ」を作れるのが特徴。initプロセスから丸ごと1つのOS環境を動かせる点で、単一アプリケーションの実行に特化したDockerなどの「アプリケーションコンテナ」とは性質が異なる。

## 位置づけ

最も初期のコンテナ技術の一つで、現在もLXD(LXCをベースにしたコンテナ/VM管理システム)などで使われている。

## 出典

- [Linux Containers - LXC - イントロダクション](https://linuxcontainers.org/ja/lxc/introduction/)
- [LXC (Linux Containers)とは？軽量仮想化の魅力](https://nakaterux.hatenablog.com/entry/2024/07/06/090204)
- [15分で分かるLXC（Linux Containers）の仕組みと基本的な使い方 | さくらのナレッジ](https://knowledge.sakura.ad.jp/2108/)
