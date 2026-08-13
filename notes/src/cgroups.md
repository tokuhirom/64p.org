---
created: 2026-08-11 09:41
updated: 2026-08-14 08:25
---
# cgroups（control groups）

Linuxカーネルの機能で、プロセスをグループ化し、そのグループ単位でCPU・メモリ・ディスクI/Oなどのリソースの制限・優先順位付け・アカウンティング（利用量計測）・制御（凍結など）を行う仕組み。コンテナ技術の基盤の一つ。

## 起源

- 2006年、Google社のエンジニア（主にPaul MenageとRohit Seth）が「process containers」という名前で開発を開始。彼らは社内で巨大な共有Linuxクラスタを運用しており、これが後の[[google-borg|Borg]]・[[kubernetes|Kubernetes]]へと繋がっていく。
- カーネルに既にあった`cpusets`という仕組みを応用する形で開発された。
- 2007年後半、Linuxカーネル内での「container」という語の多義性による混乱を避けるため「control groups（cgroups）」に改称。
- 2008年1月リリースのLinuxカーネル2.6.24でメインラインにマージされた。

## 主要な機能

1. **リソース制限** — メモリ・I/O帯域幅・CPU割り当てなどの上限設定
2. **優先順位付け** — CPU・ディスクI/Oの利用シェア調整
3. **アカウンティング** — リソース使用量の測定・追跡
4. **制御** — プロセスグループの凍結・チェックポイントなど

## 代表的なコントローラ（サブシステム）

`cpu`（CPU時間制限・優先度）、`memory`（メモリ使用量制限）、`blkio`（ブロックデバイスI/O制限）、`cpuset`（CPU/メモリノード割り当て）、`devices`（デバイスアクセス制御）、`freezer`（プロセスの一時停止/再開）など。

## cgroups v1 と v2

| 項目 | v1 | v2 |
|---|---|---|
| 階層構造 | 複数の独立階層が可能 | 単一統一階層のみ |
| スレッド管理 | スレッド単位で区別可能 | プロセス単位のみ |
| インターフェース | 複雑で冗長 | シンプルで統一的 |
| マージ時期 | 2007年（カーネル2.6.24） | 2016年（Linux 4.5） |

## 活用例

[[lxc|LXC]]・Docker・Kubernetesにおけるコンテナのリソース制限の基盤、systemdによる全プロセスの自動cgroup階層配置、[[incus|Incus]]・Firejail・libvirtなど多数のツールで採用されている。

## 出典

- [Cgroups - Wikipedia (English)](https://en.wikipedia.org/wiki/Cgroups)
- [The History of Containers - Red Hat](https://www.redhat.com/en/blog/history-containers)
- [Understanding the new control groups API - LWN.net](https://lwn.net/Articles/679786/)

#linux #kernel
