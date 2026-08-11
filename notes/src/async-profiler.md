---
created: 2026-08-11 22:36
updated: 2026-08-11 22:36
---
# async-profiler

HotSpotベースのJVM向け低オーバーヘッド・サンプリングプロファイラ。JVMTIに依存せず、Safepoint bias問題を回避する設計になっている。

## Safepoint biasの回避

従来のJavaプロファイラの多くはJVMTIの`GetStackTrace`を使うが、これはJVMのセーフポイントでしかスタックを取得できず、実際にはホットではないコードパスが過剰に計測される「Safepoint bias」というバイアスが生じる。async-profilerはHotSpot固有のAPIである`AsyncGetCallTrace`と、Linuxの[[linux-perf|perf_events]]を組み合わせて使うことで、Javaスレッドだけでなく GC・JITコンパイラなどのネイティブスレッドも含めて、任意の地点でスタックを取得できる。

## プロファイリング対象

- CPU時間
- Javaヒープ上のメモリアロケーション
- ネイティブメモリ確保・リーク検出
- ロック競合
- キャッシュミス・ページフォルトなどのハードウェアパフォーマンスカウンタ

バイトコード計装やDTraceプローブのような侵襲的な手法を使わないため、Escape AnalysisやJITの最適化(アロケーション除去など)を妨げない。

## 使い方

```sh
asprof -d 30 -f flamegraph.html <PID>
```

対象PIDを30秒間プロファイリングし、結果をインタラクティブな[[flame-graph|フレームグラフ]]としてHTMLファイルに出力する。JFR(Java Flight Recorder)形式での出力にも対応する。

IntelliJ IDEAのProfilerも内部でasync-profilerを使用している。

#java #jvm #performance #profiling

## 出典

- [GitHub - async-profiler/async-profiler](https://github.com/async-profiler/async-profiler)
- [A Guide to async-profiler | Baeldung](https://www.baeldung.com/java-async-profiler)
