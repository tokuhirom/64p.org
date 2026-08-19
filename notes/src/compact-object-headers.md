---
created: 2026-08-19 23:01
updated: 2026-08-19 23:01
---
# Compact Object Headers

HotSpot JVMのオブジェクトヘッダを、64bitアーキテクチャで従来の96bit(12バイト)から64bit(8バイト)へ圧縮する機能。ヒープ上の全オブジェクトに付くヘッダを縮めるため、多数の小さいオブジェクトを扱うアプリケーションほど恩恵が大きい。[[java-24|Java 24]]で実験導入(JEP 450)、[[java-25|Java 25]]で正式機能化(JEP 519)、[[java-27|Java 27]]でデフォルト有効化(JEP 534)という3段階を踏んで進化してきた。

## 従来のオブジェクトヘッダ構造(96bit)

- **Mark Word(64bit)**: 識別ハッシュコード(31bit) + GC年齢(4bit) + タグビット(2bit) + 未使用領域(27bit)
- **Class Word(32bit)**: 圧縮クラスポインタ(compressed class pointer)

## Compact Object Headersでの新構造(64bit)

Mark WordとClass Wordを64bit1本に統合する。

| 要素 | ビット数 |
|---|---|
| クラスポインタ | 22bit |
| 識別ハッシュコード | 31bit |
| [[project-valhalla\|Valhalla]]向け予約領域 | 4bit |
| GC年齢 | 4bit |
| Self Forwarded Tag | 1bit |
| タグビット | 2bit |

## Narrow Klass Pointer(22bit化)の仕組み

クラス情報領域を1,024バイト単位のブロックに分割する。4GB分のクラス情報空間を1,024バイト単位で表現すると4,194,304ブロックとなり、$2^{22} = 4{,}194{,}304$なので22bitで足りる。実際のポインタへ復元する際は、22bitのブロック番号を左に10bitシフトして32bitポインタに戻す。

## Self Forwarded Tag

従来のGC実装は、オブジェクトを移動した際にMark Wordを移動先アドレスへのポインタで置き換えていた(forwarding pointer)。しかしCompact Object Headersではその64bit全体にクラスポインタなど他の情報も詰まっているため、Mark Wordを丸ごとポインタで上書きするとクラス情報を失ってしまう。代わりに1bitの新フラグを立てて「自己参照(転送済み)状態」であることだけを示す方式に変更されている。

## 性能への効果

SPECjbb2015ベンチマークでヒープ使用量22%減・CPU時間8%減。GC回数はG1・Parallel双方で15%減少したとの報告がある。AmazonはJDK 17/21へのバックポート版を含め、数百の本番サービスに導入した結果、リグレッションなしで最大30%のCPU削減を確認したとしている。

## 既知の制約・非互換

- Java 26以降、レガシーなStack Locking(旧来のロック実装モード)を再度有効化できなくなった。
- Java 27以降、Compressed Class Pointers(`-XX:-UseCompressedClassPointers`)を無効化できなくなった。Compact Object HeadersはCompressed Class Pointersの仕組みに依存しているため。
- ヘッダ構造には[[project-valhalla|Project Valhalla]]の値型対応を見越して4bitの予約領域が確保されている。

## 出典

- [JEP 450: Compact Object Headers (Experimental) - OpenJDK](https://openjdk.org/jeps/450)
- [JEP 519: Compact Object Headers - OpenJDK](https://openjdk.org/jeps/519)
- [JEP 534: Compact Object Headers by Default - OpenJDK](https://openjdk.org/jeps/534)
- [Compact Object Headers in Java (JEP 519) - HappyCoders](https://www.happycoders.eu/java/compact-object-headers/)
- [Java 25 Integrates Compact Object Headers with JEP 519 - InfoQ](https://www.infoq.com/news/2025/06/java-25-compact-object-headers/)

#java #openjdk #jvm
