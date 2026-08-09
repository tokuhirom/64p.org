---
created: 2026-08-09
updated: 2026-08-09
---
# Project Leyden

JVMの起動時間・ウォームアップ時間の改善を目指すOpenJDKプロジェクト。ランタイム情報をキャッシュし、2回目以降の起動を高速化するアプローチを取る。

## AOTキャッシュの仕組み

作業を実行時から「トレーニング実行」という一回限りの事前工程に前倒しする。JEP 483は既存のClass Data Sharing (CDS)をパース以上の範囲に拡張するもので、トレーニング実行後にクラスを完全にロード・リンク済みの状態で `.aot` キャッシュファイルに保存する。以降の起動では、これらのクラスに対する再パース・再検証・再リンクが不要になり即座に利用できる。

## 効果

AOTキャッシュにより起動時間が0.65秒(ベースライン比41%改善)、あるSpring Bootアプリでは1.1秒から0.27秒(約4倍高速化)という例が報告されている。

## 制約

AOTキャッシュは可搬性がない。特定のJDK・JARファイル・設定の組み合わせに紐付いており、いずれかが変わるとキャッシュの再生成が必要になる。

## 進捗

- JDK 24: JEP 483でAOTキャッシュ導入
- JDK 25: JEP 514でさらに強化
- JDK 26: JEP 516 (Ahead-of-Time Object Caching with Any GC) 導入予定

## 出典

- [Improve Java startup with Project Leyden | IBM Developer](https://developer.ibm.com/articles/java-project-leyden/)
- [Project Leyden's AOT Code Cache | Java Code Geeks](https://www.javacodegeeks.com/2026/03/project-leydens-aot-code-cache-how-java-is-solving-its-cold-start-problem-without-graalvm.html)
- [Project Leyden & JDK 26: Bringing AOT Caching to ZGC](https://softwaremill.com/project-leyden-and-jdk-26-bringing-aot-caching-to-zgc/)
