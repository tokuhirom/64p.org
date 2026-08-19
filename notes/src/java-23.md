---
created: 2026-08-19 22:56
updated: 2026-08-19 22:56
---
# Java 23

2024年9月リリースの非LTS版。[[java-version-updates|Javaバージョンごとのアップデート]]の中では、`sun.misc.Unsafe`廃止プロセスの起点として位置づけられる。

## sun.misc.Unsafeメモリアクセスメソッドの非推奨化(JEP 471)

`sun.misc.Unsafe`のメモリアクセス系メソッド(`getInt`/`putLong`など)を、将来の削除に向けて非推奨化した。Java 22までに[[project-panama|Foreign Function & Memory API]]など標準の代替APIが揃ったことを受けた措置。

- JEP 471時点ではデフォルトの挙動は変わらず(警告なしで動作する"allow"モード)。あくまで「将来消す」という予告。
- 実際にデフォルトが「警告」に変わるのは[[java-24|Java 24]](JEP 498)、「例外送出」に変わるのは[[java-26|Java 26]]から。
- 直接`Unsafe`を呼ぶアプリコードは少なくても、シリアライゼーションライブラリなど依存先が内部で使っているケースが多く、影響範囲を把握しづらい点が指摘されている。

## 出典

- [JEP 471: Deprecate the Memory-Access Methods in sun.misc.Unsafe for Removal - OpenJDK](https://openjdk.org/jeps/471)
- [Java's Unsafe is Finally Going Away - foojay.io](https://foojay.io/today/unsafe-is-finally-going-away-embracing-safer-memory-access-with-jep-471/)
- [G1 Isn't the Only Default That Changed: A Java 25→26 Migration Reality Check - Java Code Geeks](https://www.javacodegeeks.com/2026/08/g1-isnt-the-only-default-that-changed-a-java-25%E2%86%9226-migration-reality-check.html)

#java #openjdk
