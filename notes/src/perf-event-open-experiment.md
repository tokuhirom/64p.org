---
created: 2026-08-16 08:00
updated: 2026-08-16 08:00
---
# perf_event_open実験

[[linux-perf|perf]]が実際にどのシステムコールを使って計測しているのかを、`strace`で`perf stat`自体をトレースして観察した記録。

```sh
strace -f -e trace=perf_event_open /usr/lib/linux-tools/6.8.0-100-generic/perf stat ls
```

#linux #performance #profiling

## 観察結果

`ls`を1回実行しただけで`perf_event_open(2)`が何度も呼ばれていた。`task-clock`, `context-switches`, `page-faults`, `cycles`, `instructions`, `branches`, `branch-misses`など、計測したいイベント1つにつき1回呼ばれており、`man 2 perf_event_open`の「計測対象1つにつき1つのfdを作る」という説明と一致する。

```
perf_event_open({type=0xa, size=0x88, config=0xc2, ..., disabled=1, inherit=1,
  exclude_kernel=1, exclude_hv=1, enable_on_exec=1, exclude_guest=1, ...},
  1702198, -1, -1, PERF_FLAG_FD_CLOEXEC) = 21
```

## `EACCES`→リトライのペアが頻出する

多くのイベントで、同じ`attr`をほぼそのまま2回呼んでいるペアが見られた。

```
perf_event_open({..., (exclude_kernelなし) ...}) = -1 EACCES (Permission denied)
perf_event_open({..., exclude_kernel=1, ...}) = 22
```

1回目はカーネル空間も含めて計測しようとして権限不足で失敗し、2回目に`exclude_kernel=1`(ユーザー空間のみ計測)へフォールバックして成功している。原因はこのマシンの`/proc/sys/kernel/perf_event_paranoid`が`2`になっていること。

```
$ cat /proc/sys/kernel/perf_event_paranoid
2
```

`perf_event_paranoid`の値による制限(`man 2 perf_event_open`の該当箇所より):

| 値 | 意味 |
|---|---|
| -1 | 制限なし |
| 0 | rawトレースポイント含め計測可能、`CAP_PERFMON`/`CAP_SYS_ADMIN`なしでも可 |
| 1 | CPUイベントはユーザー空間・カーネル空間とも計測可能 |
| 2 | ユーザー空間の計測のみ許可(デフォルト、Ubuntuの既定値) |
| 3+ | (Ubuntu独自拡張)`CAP_SYS_PTRACE`もなければユーザー空間すら計測不可 |

sudoersに`perf`をNOPASSWDで登録していても、この制限自体は別軸(カーネルのsysctl)で効くため、非rootで`perf stat`を叩くとカーネル空間側のイベントは素通しでは取れず、`exclude_kernel=1`への自動フォールバックという形で観測できた。

## `type=0xa`の謎はPMUの動的タイプ番号

straceの出力で`type=0xa /* PERF_TYPE_??? */`のように`?`表示になっている箇所があった。straceが知っている固定の`PERF_TYPE_HARDWARE`などのenumには載っていない値のため。実体はカーネルが動的に採番するPMUタイプ番号で、`/sys/bus/event_source/devices/<pmu名>/type`で確認できる。

```
$ cat /sys/bus/event_source/devices/cpu_atom/type
10
$ cat /sys/bus/event_source/devices/cpu_core/type
4
```

`0xa = 10`、`0x4 = 4`と一致しており、`type=0xa`は「Atomコア(高効率コア)のPMUで計測せよ」という指定だったことが分かる。

## ハイブリッドCPUで両コア種別が個別に計測される

このマシンのCPUは13th Gen Intel Core i7-1355U(P-core/E-coreのハイブリッド構成)。`perf stat`の出力にも`cpu_atom/cycles/u`と`cpu_core/cycles/u`が両方現れ、後者は`<not counted>`だった。

```
           664,414      cpu_atom/cycles/u
     <not counted>      cpu_core/cycles/u                     (0.00%)
```

`perf`はハイブリッドCPUに対して`cpu_atom`・`cpu_core`それぞれ別のPMUとして`perf_event_open()`を呼んでおり、`ls`のような短命なプロセスがたまたまE-core(`cpu_atom`)側のスレッドで実行されたため、そちら側のカウンタしか値が付かなかったと考えられる。実際`perf_event_open`のトレース後半でも、`PERF_TYPE_HARDWARE`に`config=0xa<<32|PERF_COUNT_HW_CPU_CYCLES`(cpu_atom)と`config=0x4<<32|PERF_COUNT_HW_CPU_CYCLES`(cpu_core)の両方が呼ばれており、`config`の上位32bitにPMUタイプ番号をエンコードして「どちらのコア種別のカウンタか」を指定していることが確認できた。

## [[linux-perf|perf]]の中での位置づけ

perfコマンド自体が何をしているかという実装原理の裏取り実験。[[strace]]で`perf`自身をトレースするという、実験対象と観察ツールが入れ子になった構成になっている。

## 出典

- `man 2 perf_event_open`
- 上記のstrace出力・`/proc/sys/kernel/perf_event_paranoid`・`/sys/bus/event_source/devices/*/type`は本マシン上で実際に取得した一次情報
