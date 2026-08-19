---
created: 2026-08-19 14:27
updated: 2026-08-19 14:27
---
# systemd-oomd

systemdに同梱されているユーザースペースのOOM (Out Of Memory) デーモン。[[cgroups|cgroup]] v2と[[psi-pressure-stall-information|PSI]] (Pressure Stall Information) を使い、カーネル空間で本来のOOM killerが発動する前に、プロセスをkillしてシステムの応答性を保つ。[[earlyoom]]と目的は同じだが、PSIベースで「どれだけタスクがリソース待ちで遅延しているか」を見て判断する点が異なる。

## 動作原理

- cgroup単位でPSIの`memory.pressure`とswap使用率を定期的にポーリングする。
- 監視対象になるのは、systemdのUnit設定で`ManagedOOMSwap=kill`または`ManagedOOMMemoryPressure=kill`が指定されたcgroupのみ（デフォルトの`auto`では監視対象にならない）。
- 判定基準は2種類:
  - **swapベース**: メモリとスワップの使用率が両方とも`SwapUsedLimit`（デフォルト90%）を超えるとkill対象を探す。
  - **PSIベース**: cgroupの`memory.pressure`が`DefaultMemoryPressureLimit`（デフォルト60%、10秒ウィンドウでの遅延割合）を`DefaultMemoryPressureDurationSec`（デフォルト30秒）継続して超過するとkill対象を探す。
- kill候補の中からリソース使用量が最大のcgroup/プロセスを選んで終了させる。

## 必要要件

- 統一cgroup階層（cgroup v2）
- メモリアカウンティング有効化（`DefaultMemoryAccounting=true`が推奨）
- PSI対応カーネル（Linux 4.20以降）
- swapの有効化が強く推奨される（swapがないとPSIが反応する前に一気にOOMへ突入しやすいため）

## 設定ファイル: oomd.conf

`[OOM]`セクションの主なオプション:

| オプション | デフォルト値 | 意味 |
|---|---|---|
| `SwapUsedLimit=` | 90% | メモリ+スワップ使用率がこの値を超えたら動作開始 |
| `DefaultMemoryPressureLimit=` | 60% | cgroupのメモリ圧力(10秒ウィンドウ内の遅延割合)の閾値 |
| `DefaultMemoryPressureDurationSec=` | 30秒 | 閾値超過がこの秒数継続したら発動 |
| `PrekillHookTimeoutSec=` | 0(無効) | kill前フックの完了を待つ時間 |

## Unit側の設定 (systemd.resource-control)

`.service`/`.slice`等のUnitファイルで指定する:

- `ManagedOOMSwap=auto|kill` — swapベース監視の対象にするか。ルートスライス(`-.slice`)に`kill`を設定するのが定石。
- `ManagedOOMMemoryPressure=auto|kill` — PSIベース監視の対象にするか。
- `ManagedOOMMemoryPressureLimit=` — Unit単位で`DefaultMemoryPressureLimit`を上書き。システムスライスは60%、ユーザーサービスは40%など用途で調整することが推奨される。
- `ManagedOOMPreference=none|avoid|omit` — kill候補選択時の優先度。`avoid`は他に選択肢がなければ選ばれる、`omit`は候補から完全除外。

## earlyoomとの違い

| | systemd-oomd | [[earlyoom]] |
|---|---|---|
| 判定基準 | PSI (memory.pressure) + swap使用率 | available memory + free swap の割合 |
| 監視粒度 | cgroup単位 | プロセス単位(oom_score) |
| 依存 | systemd, cgroup v2, PSI対応カーネル(4.20+) | なし(依存最小・軽量) |
| 設定 | Unit単位でopt-in方式(`ManagedOOM*=kill`) | コマンドラインオプションで全体設定 |

systemdディストリビューション(Fedora Workstation/Server等)では標準で有効化されていることが多い。

## 出典

- [systemd-oomd.service(8) — Arch manual pages](https://man.archlinux.org/man/systemd-oomd.service.8.en)
- [oomd.conf(5) — Arch manual pages](https://man.archlinux.org/man/oomd.conf.5.en)
- [systemd.resource-control(5) — Arch manual pages](https://man.archlinux.org/man/systemd.resource-control.5.en)
