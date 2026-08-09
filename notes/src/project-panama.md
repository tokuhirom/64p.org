---
created: 2026-08-09 21:23
updated: 2026-08-09 22:22
---
# Project Panama

Javaとネイティブコードの連携を改善するOpenJDKプロジェクト。中核はForeign Function & Memory (FFM) API。

## Foreign Function & Memory (FFM) API

Javaプログラムからネイティブ関数を呼び出し、ネイティブメモリを直接管理できるAPI。従来のJava Native Interface (JNI)より安全かつ効率的にこれらの操作を行える。

- JDK 19でプレビュー導入
- JDK 22で正式機能化(2024年3月)

## jextract

Cのヘッダファイル(`.h`)をパースし、FFM APIを使ったJavaコードを自動生成するコマンドラインツール。ネイティブライブラリのヘッダで記述された関数・構造体へアクセスするためのJavaバインディングを生成する用途で、FFM APIと組み合わせて使われることが多い。2026年もjextractの改善が計画されている。

## 関連: Vector API

[[simd|SIMD]]命令を活用したベクトル演算をJavaから扱うためのAPI。Panamaの一部として開発が進められており、JDK 26で11回目のインキュベーションを迎える予定。

## 出典

- [Java Foreign Function & Memory API (Project Panama) | Medium](https://medium.com/@kaustubh.saha/java-foreign-function-memory-api-project-panama-ebbc29f5daaf)
- [Project Panama and jextract - Inside.java](https://inside.java/2020/10/06/jextract/)
- [Guide to Java Project Panama | Baeldung](https://www.baeldung.com/java-project-panama)
- [Java Innovation Projects - Dev.java](https://dev.java/future/innovation/)
