---
created: 2026-08-09
updated: 2026-08-09
---
# Project Loom

Javaの軽量並行処理を実現するOpenJDKプロジェクト。仮想スレッド(virtual threads)と構造化並行性(structured concurrency)が中核。

## 仮想スレッド(Virtual Threads)

OSスレッドに紐付かない軽量なスレッド。JVMが管理し、スレッド・パー・リクエストのプログラミングスタイルをOSスレッドの制約なしに実現できる。スループットに影響を与えずに数百万の仮想スレッドを生成できる。基盤にはContinuations(実行フローの中断・再開を可能にする低レベル機構)がある。

- JDK 19でプレビュー導入(JEP 425)
- JDK 21で正式機能化

## 構造化並行性(Structured Concurrency)

`StructuredTaskScope` を通じて提供される、協調タスク(多くの場合は仮想スレッド)をサブタスクの集合として一括で管理するAPI。スレッド間の親子関係を捉えたスレッドダンプ(構造化された観測性)も提供する。

- JDK 19でプレビュー導入(JEP 428)
- Java 25で刷新、2026年(JDK 26)も小さな変更でプレビュー継続

## 出典

- [What the Heck Is Project Loom for Java? | Okta Developer](https://developer.okta.com/blog/2022/08/26/state-of-java-project-loom)
- [Project Loom: Structured Concurrency in Java | Rock the JVM](https://rockthejvm.com/articles/structured-concurrency-in-java)
- [Java Innovation Projects - Dev.java](https://dev.java/future/innovation/)
