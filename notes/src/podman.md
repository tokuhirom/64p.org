---
created: 2026-08-10 18:36
updated: 2026-08-19 18:05
---
# Podman

Red Hatが開発したオープンソースのコンテナ管理ツール。Dockerと互換のCLIを持ちながら、内部の設計は大きく異なる。 #container #linux

## デーモンレス

Docker Engineのような常駐デーモンを持たず、各コマンドが独立したプロセスとしてfork/execされる。デーモンが単一障害点・攻撃対象になりにくい。

## rootless対応

root権限なしで一般ユーザーとしてコンテナを起動できる。Dockerも後付けでrootlessモードを持つが、Podmanは標準でこの動作をサポートする。

## Pod単位の管理

[[kubernetes|Kubernetes]]の「Pod」と同様に、複数コンテナをまとめて同一のネットワーク名前空間・リソースを共有させる単位として扱える。Dockerには標準でこの概念がなく、Docker Composeが近い役割を担う。

## Dockerとの互換性

OCI(Open Containers Initiative)準拠のコンテナ・イメージ仕様に従っており、Dockerイメージともそのまま互換性がある。`alias docker=podman`とするだけでDockerコマンドの多くがそのまま使える。

## [[lxc|LXC]]/[[lxd|LXD]]系との違い

LXC/LXDが「システムコンテナ」(initプロセスから丸ごと1つのOS環境を動かす用途)を志向するのに対し、Podmanは Docker 同様、単一アプリケーションの実行に特化した「アプリケーションコンテナ」を扱う。

## 関連機能

- [[podman-auto-update|podman-auto-update]]: systemd管理下のコンテナのイメージを自動更新する標準機能。

## 出典

- [Podman とは？をわかりやすく解説 (Red Hat)](https://www.redhat.com/en/topics/containers/what-is-podman)
- [Podman使ってみた & Dockerとの違いは？ - Qiita](https://qiita.com/arinko_arintyu/items/10465fa0765f70e77b12)
- [Podmanの導入 ~ Dockerとの比較を添えて ~](https://zenn.dev/goal_a/articles/430d4f70328027)
