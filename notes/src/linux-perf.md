---
created: 2026-08-11 22:28
updated: 2026-08-11 22:44
---
# perf(Linuxパフォーマンス解析ツール)

Linuxカーネルに組み込まれたプロファイリング/パフォーマンス解析ツール。もともと「Performance Counters for Linux (PCL)」として開発され、現在は「perf_events (LPE)」とも呼ばれるカーネルサブシステム上に構築されている。

## できること

CPUのパフォーマンスモニタリングユニット(PMU)が持つハードウェアカウンタ(サイクル数、実行命令数、キャッシュミス、分岐ミス予測など)に加えて、ソフトウェアカウンタ・tracepoint・kprobe/uprobe(動的トレーシング)も統一的なインターフェースで扱える。`strace`と異なり、対象プログラムへのパフォーマンスへの影響が小さいとされる。

## 主なサブコマンド

- `perf stat`: プログラム実行中のパフォーマンスカウンタを集計して表示する。
- `perf record`: サンプリングデータを収集し`perf.data`ファイルに保存する。デフォルトはサイクルイベントを1000Hz(1秒間に1000サンプル)でサンプリング。
- `perf report`: `perf record`で記録したサンプルを関数別のオーバーヘッドとして表示する。
- `perf top`: `top`コマンドのように、CPU時間を消費している関数をリアルタイムに表示する。
- `perf annotate`: 命令レベルでサンプル分布を表示し、ボトルネックをアセンブリ単位で特定する。

```sh
perf stat dd if=/dev/zero of=/dev/null count=1000000
perf record ./program
perf report
```

## フレームグラフとの連携

`perf record`/`perf report`で得たスタックトレースは、Brendan Greggの[[flame-graph|フレームグラフ]]の入力データとしてよく使われる。複数サンプルに共通するコールパスを折り畳んで表示することで、ボトルネックを直感的に可視化できる。

## コンパイラ最適化への利用

`perf record`で採取したサンプリングベースのプロファイルは、[[profile-guided-optimization|Profile-Guided Optimization(PGO)]]のSamplePGO/AutoFDOという方式で、コンパイラの最適化判断(インライン化・コードレイアウトなど)にそのまま使うこともできる。

#linux #performance #profiling

## 出典

- [perf: Linux profiling with performance counters](https://perfwiki.github.io/main/)
- [Introduction - perf: Linux profiling with performance counters](https://perfwiki.github.io/main/tutorial/)
- [Linux perf Examples - Brendan Gregg](https://www.brendangregg.com/perf.html)
