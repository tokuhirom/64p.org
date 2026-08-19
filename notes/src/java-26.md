---
created: 2026-08-19 22:56
updated: 2026-08-19 22:56
---
# Java 26

2026年3月17日リリースの非LTS版。「G1がJDK 26でデフォルトになった」と誤解されがちだが、G1はJava 9(JEP 248)からすでにデフォルトGCであり、Java 26で変わったのはG1自体の性能改善と、GC以外の複数のデフォルト値・非推奨化。

## G1 GC: 同期削減によるスループット改善(JEP 522)

第2のカードテーブルを導入し、最適化エンジンとアプリケーションスレッドの競合を減らした。ライトバリア命令数が50から12に削減され、実測で5〜15%のスループット向上が報告されている。オブジェクト参照フィールドを頻繁に書き換えるアプリケーションほど効果が大きい。この改善を土台に、[[java-27|Java 27]]でG1を全環境のデフォルトGCにするJEP 523が提案されている。

## G1のその他の変更

- ヒープリージョンの半分以上を占める巨大オブジェクト(参照を含むもの)を、従来のフルGC時のみでなく即座に回収できるようになった。
- GCオーバーヘッドがGCTimeLimit(デフォルト98%)を超え、空きヒープがGCHeapFreeLimit(デフォルト2%)未満の状態が5連続GCで続くとOutOfMemoryErrorを送出するようになった(Parallel GCと同じ挙動に統一。GCスラッシング防止が目的)。`-XX:-UseGCOverheadLimit`で無効化可能。
- Java 25で発生していたTransparent Huge Pages(THP)利用不可の不具合が修正された(Java 25.0.2にもバックポート済み)。

## sun.misc.Unsafeメモリアクセス、デフォルトが例外送出に

[[java-23|Java 23]](JEP 471で非推奨予告)→[[java-24|Java 24]](JEP 498でデフォルト警告)と進んできたプロセスの3段階目。Java 26からは未対応の操作がデフォルトで例外(`UnsupportedOperationException`)を送出するようになった(`--sun-misc-unsafe-memory-access=deny`相当)。

## Project LeydenのAOTキャッシュ、全GC対応に(JEP 516)

詳細は[[project-leyden|Project Leyden]]側のノートを参照。

## JVMフラグのデフォルト変更・非推奨化

- **InitialRAMPercentage**: 2007年から変わっていなかったデフォルト値1.5625(1/64)を0に変更。システムメモリが増えた現在では過大なヒープサイズにつながっていたため。`MinHeapSize`/`InitialHeapSize`と同様、JVMエルゴノミクスに委ねる挙動になった。
- **AlwaysActAsServerClassMachine / NeverActAsServerClassMachine**: 削除予定として非推奨化。元々はG1(サーバー向け)とSerial(クライアント向け)の選択を制御する役割だったが、[[java-27|Java 27]]でG1が全環境のデフォルトになるため区別自体が不要になる。
- **AggressiveHeap**: 特定ベンチマークを満たす目的で追加されたが透明性に欠けるとして、削除予定に。
- **MaxRAM**: JVMが物理RAMを正確に検出できるようになったため削除予定に。`-Xmx`/`-Xms`での明示指定が推奨。

## その他

- C2 JITコンパイラが30個以上のパラメータを持つメソッドもコンパイルできるようになり、C1へのフォールバックやインタプリタ実行を回避できるようになった。
- Serial GCのYoung世代のレイアウトが「eden→survivor」から「survivor→eden」に変更され、eden領域が世代末尾まで動的に拡張可能になった(過度なOutOfMemoryErrorの回避が狙い)。
- `java.lang.management.MemoryMXBean`に`getTotalGcCpuTime()`が追加されるなど、JMX周りの改善も入っている。

## 出典

- [Java 26 for DevOps - Inside.java](https://inside.java/2026/03/02/jdk-26-rn-ops/)
- [JEP 522: G1 GC: Improve Throughput by Reducing Synchronization - OpenJDK](https://openjdk.org/jeps/522)
- [Java 26 Is Here, And With It a Solid Foundation for the Future - hanno.codes](https://hanno.codes/2026/03/17/java-26-is-here/)
- [G1 Isn't the Only Default That Changed: A Java 25→26 Migration Reality Check - Java Code Geeks](https://www.javacodegeeks.com/2026/08/g1-isnt-the-only-default-that-changed-a-java-25%E2%86%9226-migration-reality-check.html)

#java #openjdk
