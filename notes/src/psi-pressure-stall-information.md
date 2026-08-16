---
created: 2026-08-16 10:27
updated: 2026-08-16 10:27
---
# PSI(Pressure Stall Information)

CPU・メモリ・IOという主要リソースにかかる負荷(競合)を、タスクが実行を待たされている時間の割合として定量化するLinuxカーネルの機能。負荷が実際に問題化する前の「兆候」の段階で検出できるのが特徴。2018年、Facebook(現Meta)のJohannes Weinerが自社のフリート管理上の課題を解決するために開発し、Linux 4.20でマージされた。

## 何を測るか

PSIが計測するのは「タスクがリソース不足で実行をストール(停止・遅延)している時間の割合」。CPU使用率のような「利用量」ではなく「不足による待たされ具合」を見る点が従来のリソースメトリクスと異なる。

## some / full の違い

各リソースについて2種類の指標がある。

- **some** — 少なくとも1つのタスクがそのリソース待ちでストールしている時間の割合。この状態でもCPUは他の生産的な処理を進めている可能性がある。
- **full** — アイドルでない全てのタスクが同時にストールしている時間の割合。CPUサイクルが実質的に無駄になっている状態で、スラッシングに近い深刻な状況を示す。

## 出力フォーマット

`/proc/pressure/{cpu,memory,io}` に以下の形式で出力される。

```
some avg10=0.00 avg60=0.00 avg300=0.00 total=0
full avg10=0.00 avg60=0.00 avg300=0.00 total=0
```

- `avg10`/`avg60`/`avg300` — 直近10秒・60秒・300秒の移動平均ウィンドウにおけるストール時間の割合(%)。
- `total` — 累積ストール時間(マイクロ秒単位)。短期的なレイテンシスパイクの検出に使う。

なお`cpu`ファイルには`full`行がない(単一CPUコア上で全タスクが同時にCPU待ちになることは構造上あり得ないため)。

## トリガー(poll監視)

`/proc/pressure/`配下のファイルに対して、しきい値を書き込んだ上で`poll()`/`select()`することで、しきい値超過時にイベント通知を受け取れる。トリガーの書式は`<some|full> <ウィンドウ内の累積ストール時間(us)> <ウィンドウ幅(us)>`(例: 500ms窓内で100msストールしたら通知)。トリガーごとに専用のファイルディスクリプタが必要。

## [[cgroups]]との連携

`CONFIG_CGROUPS=y`かつcgroup v2がマウントされている環境では、システム全体だけでなく各cgroupサブディレクトリにも`cpu.pressure`/`memory.pressure`/`io.pressure`が自動生成され、同じ形式でコンテナ・サービス単位の負荷を監視できる。これによりコンテナオーケストレーション基盤側でリソース逼迫を検知し、ロードシェディングや低優先度ジョブの退避、OOM Killerによる強制終了より早い段階での対処(oomdなど)が可能になる。

## 出典

- [PSI - Pressure Stall Information — The Linux Kernel documentation](https://docs.kernel.org/accounting/psi.html)
- [Tracking pressure-stall information - LWN.net](https://lwn.net/Articles/759781/)
- [Getting Started with PSI (Facebook)](https://facebookmicrosites.github.io/psi/docs/overview)
- [Linuxカーネル最新情報ウォッチ 第64回 プレッシャー(圧力)を計測するPSIとは？ - gihyo.jp](https://gihyo.jp/article/2026/08/linux_containers-0064)

#linux #kernel #cgroups #performance
