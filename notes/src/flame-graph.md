---
created: 2026-08-11 22:36
updated: 2026-08-11 22:36
---
# フレームグラフ(Flame Graph)

プロファイラで収集したスタックトレース群を可視化する手法。2011年にBrendan Greggが考案し、2016年にCommunications of the ACM誌の記事「The Flame Graph」で発表された。CPUプロファイリングの標準的な可視化手法として、多くの言語・observabilityツールに採用されている。

## 軸と色の意味

- **X軸**: スタックプロファイルの母集団をアルファベット順にソートしたもの(時間経過ではない)。マージを最大化するための並び順で、横幅が広いフレームほどそのコードパスが頻繁に出現したことを示す。
- **Y軸**: スタック深度(一番下が呼び出し元、上に行くほど深い)。一番上のボックスがサンプリング時にCPU上で実行されていた関数。
- **色**: 基本的にはランダム(見分けやすくするため)か、種類ごとの色分け(暖色系など)に使われ、数値的な意味は持たないことが多い。

各ボックス(フレーム)はスタック上の1関数を表す。

## 種類

- CPU flame graph: CPUサイクル消費の可視化(最も一般的)
- Off-CPU flame graph: ブロッキング(待機)時間の分析
- Memory flame graph: メモリ確保をバイト数で可視化(慣習的に緑系)
- Differential flame graph: 2つのプロファイルを比較し、パフォーマンス回帰を検出
- AI/GPU flame graph: AI/GPUワークロードの分析

## 生成方法

[[linux-perf|perf]]の`perf record`/`perf report`で取得したスタックトレースをはじめ、各言語のプロファイラの出力から生成できる。オリジナル実装は`github.com/brendangregg/FlameGraph`(Perl + SVG + JavaScript製)で、インタラクティブなSVGを生成する。JVM向けには[[async-profiler|async-profiler]]がフレームグラフ出力を直接サポートしている。

#performance #profiling

## 出典

- [Flame Graphs - Brendan Gregg](https://www.brendangregg.com/flamegraphs.html)
- [Flame graph - Wikipedia](https://en.wikipedia.org/wiki/Flame_graph)
- [GitHub - brendangregg/FlameGraph](https://github.com/brendangregg/FlameGraph)
