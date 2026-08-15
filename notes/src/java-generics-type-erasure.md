---
created: 2026-08-15 21:56
updated: 2026-08-15 21:56
---
# Javaジェネリクスの実装方式(型消去)

Javaはジェネリクス(総称型)を**型消去(type erasure)**という方式で実装している。コンパイル時に型パラメータを取り除いてしまうため、`List<Integer>`と`List<String>`は実行時には**まったく同一のバイトコード**になる。[[generics-implementation-strategies|ジェネリクスの実装方式]]という観点では、型ごとにコードを複製する[[monomorphization|単態化]]とも、型情報を実行時に辞書として渡す[[dictionary-passing|辞書渡し]]とも異なる第3の道で、型情報そのものを消してしまう点が特徴。

## コンパイラが行う変換

1. 型パラメータを境界型で置き換える。境界のない`<T>`は`Object`に、`<T extends Number>`のように上限境界があればその境界型に置き換える。
2. 型安全性を保つため、必要な箇所にキャストを挿入する。
3. ポリモーフィズムを保つため、ブリッジメソッド(bridge method)を生成する。

プリミティブ型はジェネリクスの型引数に取れないため、`int`は`Integer`にボクシングされる。生成されたバイトコードにはジェネリクスの型情報が残らないため、リフレクションで`List<Integer>`から`Integer`を取得することはできない。

## 採用理由: 後方互換性

Java 5でジェネリクス導入にあたり、既存の何百万行ものコード・バイナリとの互換性を壊さない方式として選ばれた妥協案。型消去によって新しいクラスが一切生成されないため、ジェネリクス導入によるランタイムオーバーヘッドは(ボクシングを除けば)実質ゼロという利点もある。

## Russ Coxによる評価

[[russ-cox-generic-dilemma|The Generic Dilemma]](2009)は、Javaのこのアプローチを「暗黙のボクシングによる実行時オーバーヘッド」の実例として名指ししている。単態化(C++)・型消去+ボクシング(Java)という当時の2つの代表例を並べ、両方の欠点を避ける第3の道があるかを問いかけた記事。

## 将来: Project Valhallaによる特化

[[project-valhalla|Project Valhalla]]では値型(value type)の導入に合わせて、コレクションをプリミティブ値向けに特化させる**generic specialization**が検討されている。ただし参照型ジェネリクスへの完全な reified generics(実行時に型情報を保持する方式)の導入は、20年分の既存バイトコードとの互換性維持が難しく、可能性は低いとされる。

## 出典

- [Type Erasure - Dev.java](https://dev.java/learn/generics/type-erasure/)
- [Java's Type Erasure: The Generics Compromise That Haunts Us Today - Java Code Geeks](https://www.javacodegeeks.com/2026/01/javas-type-erasure-the-generics-compromise-that-haunts-us-today.html)
- [Project Valhalla (Java language) - Wikipedia](https://en.wikipedia.org/wiki/Project_Valhalla_(Java_language))
- [Hacker News: reified generics discussion](https://news.ycombinator.com/item?id=44861598)

#java #generics #compiler-design
