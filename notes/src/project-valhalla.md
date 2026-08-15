---
created: 2026-08-09 21:16
updated: 2026-08-15 21:56
---
# Project Valhalla

Javaのオブジェクトモデルを拡張するOpenJDKプロジェクト。オブジェクト指向の抽象化とプリミティブ型のパフォーマンス特性を組み合わせることを目標とする。構文の簡潔化など軽量な言語機能を扱う[[project-amber|Project Amber]]とは役割が異なる。

## 背景

従来のJavaでは、オブジェクトは常に参照型(ヒープに確保され、ポインタ経由でアクセスされる)だった。Project Valhallaはここに**値型(value type)**を導入し、プリミティブ型並みの性能(インライン化・ボクシング回避)を持つオブジェクトを作れるようにする。

## JEP 401 (Value Classes and Objects)

Project Valhallaの中核となるJEP。

- プレビュー機能として **JDK 28** (2027年3月予定)でOpenJDK本流に統合される見込み(2026年6月時点)
- 変更規模は197,000行以上、1,816ファイルに及ぶ大規模なもの
- プレビュー機能のためデフォルトでは無効(オプトインが必要)

## タイムライン

- 現行の最新版: JDK 26
- JDK 27: 2026年9月予定
- JDK 28: 2027年3月予定(JEP 401プレビュー搭載見込み)

## Generic Specialization

値型の導入に合わせて、コレクションをプリミティブ値向けに特化させる**generic specialization**も構想されている。ただし現行の[[java-generics-type-erasure|型消去(type erasure)]]による参照型ジェネリクスへの、完全なreified generics(実行時に型情報を保持する方式)の導入は、既存バイトコードとの互換性維持が難しく可能性は低いとされる。

## 出典

- [Project Valhalla — OpenJDK公式](https://openjdk.org/projects/valhalla/)
- [Java's Project Valhalla finally lands a preview in JDK 28 — The Register](https://www.theregister.com/devops/2026/06/15/javas-project-valhalla-finally-lands-a-preview-in-jdk-28/5255557)
- [Java's Plans for 2026 - Inside Java Newscast #104](https://inside.java/2026/01/08/newscast-104/)
- [Project Valhalla (Java language) - Wikipedia](https://en.wikipedia.org/wiki/Project_Valhalla_(Java_language))
