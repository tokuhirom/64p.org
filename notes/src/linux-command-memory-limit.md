---
created: 2026-08-19 10:59
updated: 2026-08-19 10:59
---
# Linuxでコマンド実行時にメモリ上限を設定する方法

Linuxで、あるコマンドの実行だけにメモリ使用量の上限を設けたいときの手段。主に`systemd-run`（[[cgroups]]ベース）と`ulimit`（POSIXリソースリミット）の2種類がある。

## systemd-run（cgroup、モダンな方法）

```sh
systemd-run --scope -p MemoryMax=512M --user mycommand arg1 arg2
```

- [[cgroups|cgroup]] v2ベースでハードな上限を強制でき、超過するとOOM killerがそのcgroup内のプロセスをkillする。
- `--user`を付けるとユーザーセッションのスコープで動く（root不要）。システム全体に効かせたい場合は`sudo systemd-run --scope -p MemoryMax=512M command`。
- `MemorySwapMax=`でスワップ込みの上限も別途指定可能。
- `-p CPUQuota=50%`のようにCPU等の他のリソース制限とも組み合わせられる。
- Docker等のコンテナと同じcgroupの仕組みを使っているため、制限が確実に効く。

## ulimit（シェル組み込み、伝統的な方法）

```sh
bash -c 'ulimit -v 524288; exec mycommand'   # 512MB（KB単位）
```

- `-v`は仮想メモリ（アドレス空間）の上限、`-m`は常駐メモリの上限（Linuxでは実質無効化されていることが多い）。
- 現在のシェルおよび子プロセスに効くが、cgroupほど厳密ではなく、mmapの使い方次第で回避されるケースもある。

## 使い分け

今どきは`systemd-run`の方がcgroupベースで確実に効き、Docker等のコンテナと同じ仕組みなので推奨される。`ulimit`は軽量なスクリプトでサッと制限したい場合向け。

## 出典

- [Controlling Process Resources with Linux Control Groups - iximiuz Labs](https://labs.iximiuz.com/tutorials/controlling-process-resources-with-cgroups)
- [Limiting Process Resource Consumption in Unix - Baeldung on Linux](https://www.baeldung.com/linux/limit-resource-consumption)
- [How to Use cgroups to Limit Process Resources on Ubuntu](https://oneuptime.com/blog/post/2026-03-02-how-to-use-cgroups-to-limit-process-resources-on-ubuntu/view)

#linux
