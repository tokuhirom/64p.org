---
created: 2026-08-19 22:56
updated: 2026-08-19 23:01
---
# Java 27

2026年9月リリース予定の非LTS版(2026年8月時点では開発中)。[[java-26|Java 26]]で入った改善を土台に、2つの大きな「デフォルトを切り替える」JEPがターゲット確定している。

## G1を全環境のデフォルトGCに(JEP 523)

コマンドラインでGCを明示指定しなかった場合、プロセッサ数や搭載物理メモリに関わらず常にG1が選ばれるようにする。[[java-26|Java 26]]のJEP 522によるスループット改善で、G1の最大スループットがSerial GCに近づいたことが背景。GC自体をコマンドラインで明示指定しているアプリケーションや、制約された環境で実行していないアプリケーションには影響しない。Serial GCが削除されるわけではなく、引き続き選択可能。2026年5月にJDK 27ターゲットとして確定した。

## [[compact-object-headers|Compact Object Headers]]をデフォルト有効に(JEP 534)

[[java-24|Java 24]]で実験導入(JEP 450)、[[java-25|Java 25]]で正式機能化(JEP 519)されたCompact Object Headersを、デフォルトで有効化する。これにより`-XX:+UseCompactObjectHeaders`フラグの明示指定が不要になる。

## 出典

- [JEP 523: Make G1 the Default Garbage Collector in All Environments - OpenJDK](https://openjdk.org/jeps/523)
- [JEP targeted to JDK 27: 523: Make G1 the Default Garbage Collector in All Environments - Inside.java](https://inside.java/2026/05/26/jep523-target-jdk27/)
- [JEP 534: Compact Object Headers by Default - OpenJDK](https://openjdk.org/jeps/534)
- [G1 Isn't the Only Default That Changed: A Java 25→26 Migration Reality Check - Java Code Geeks](https://www.javacodegeeks.com/2026/08/g1-isnt-the-only-default-that-changed-a-java-25%E2%86%9226-migration-reality-check.html)

#java #openjdk
