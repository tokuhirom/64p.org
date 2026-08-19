---
created: 2026-08-19 22:56
updated: 2026-08-19 22:56
---
# Java 25

2025年9月リリースのLTS(長期サポート)版。Java 21(前回のLTS、2023年9月)からのアップグレード先として位置づけられる。OracleのJava 21無料更新(NFTC)は2026年9月16日に終了予定で、それ以降も無償ライセンスで使い続けたいチームはこのバージョン以降への移行が事実上必須になる。

## Compact Object Headers、正式機能化(JEP 519)

[[java-24|Java 24]]でJEP 450として実験導入されたCompact Object Headersが、`-XX:+UseCompactObjectHeaders`オプションで有効化できる正式なプロダクト機能になった。ただしデフォルトはまだ無効。SPECjbb2015ベンチマークでヒープ使用量22%減・GCサイクル15%減・CPU時間8%減という実測値が報告されている。[[java-27|Java 27]]でデフォルト有効化(JEP 534)される見込み。

## Project LeydenのAOTキャッシュ強化(JEP 514)

[[project-leyden|Project Leyden]]のAOTキャッシュがJEP 514としてさらに強化された。

## 構造化並行性の刷新

[[project-loom|Project Loom]]の`StructuredTaskScope`(構造化並行性)がJava 25で刷新された。[[java-26|Java 26]]でも小さな変更を加えつつプレビューが継続している。

## 出典

- [JEP 519: Compact Object Headers - OpenJDK](https://openjdk.org/jeps/519)
- [Compact Object Headers in Java (JEP 519) - HappyCoders](https://www.happycoders.eu/java/compact-object-headers/)
- [JDK 21 approaches end-of-permissive license - Oracle blogs](https://blogs.oracle.com/java/jdk-21-approaches-end-of-permissive-license)
- [G1 Isn't the Only Default That Changed: A Java 25→26 Migration Reality Check - Java Code Geeks](https://www.javacodegeeks.com/2026/08/g1-isnt-the-only-default-that-changed-a-java-25%E2%86%9226-migration-reality-check.html)

#java #openjdk
