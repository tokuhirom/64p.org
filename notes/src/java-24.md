---
created: 2026-08-19 22:56
updated: 2026-08-19 23:01
---
# Java 24

2025年3月リリースの非LTS版。[[java-23|Java 23]]で予告された`sun.misc.Unsafe`廃止プロセスが次の段階に進んだほか、後に[[java-25|Java 25]]/[[java-26|Java 26]]で正式化・強化される機能の実験的導入が集中している。

## sun.misc.Unsafeメモリアクセス、デフォルトが「警告」に(JEP 498)

[[java-23|JEP 471]](非推奨予告)を受け、Java 24からはメモリアクセスメソッド使用時にデフォルトで警告が出るようになった(`--sun-misc-unsafe-memory-access=warn`相当)。まだ動作は継続する。

## [[compact-object-headers|Compact Object Headers]]、実験的機能として導入(JEP 450)

HotSpotのオブジェクトヘッダサイズを、64bitアーキテクチャで96〜128bitから64bitへ削減する機能。`-XX:+UnlockExperimentalVMOptions`が必要な実験段階で導入された。ヒープサイズ削減・デプロイ密度向上・データ局所性向上を狙う。[[java-25|Java 25]]で正式機能(JEP 519)に、[[java-27|Java 27]]でデフォルト有効化(JEP 534)される見込み。

## Windows 32bit x86ポート削除(JEP 479)

Java 21で削除予定として非推奨化されていたWindows 32bit x86向けビルドサポートを、このバージョンで実際に削除した。JDK 21から一気に最新版へ移行するチームがこのタイミングで初めて気づくケースが多いと指摘されている。

## Project LeydenのAOTキャッシュ導入(JEP 483)

[[project-leyden|Project Leyden]]によるAOTキャッシュがJEP 483として導入された。詳細はProject Leyden側のノートを参照。

## 出典

- [JEP 498: Warn upon Use of Memory-Access Methods in sun.misc.Unsafe - OpenJDK](https://openjdk.org/jeps/498)
- [JEP 450: Compact Object Headers (Experimental) - OpenJDK](https://openjdk.org/jeps/450)
- [JEP 479: Remove the Windows 32-bit x86 Port - OpenJDK](https://openjdk.org/jeps/479)
- [G1 Isn't the Only Default That Changed: A Java 25→26 Migration Reality Check - Java Code Geeks](https://www.javacodegeeks.com/2026/08/g1-isnt-the-only-default-that-changed-a-java-25%E2%86%9226-migration-reality-check.html)

#java #openjdk
