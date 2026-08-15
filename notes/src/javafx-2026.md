---
created: 2026-08-15 20:49
updated: 2026-08-15 20:49
---
# JavaFXの現状(2026年)

## 経緯

2017年、OracleはJavaFXをJDK本体から分離し、公式サポートを事実上打ち切った。以降は**Gluon**社を中心としたコミュニティが**OpenJFX**プロジェクトとして開発を継続してきた。レンダリングパイプラインの近代化やクロスプラットフォーム対応は、この間のコミュニティ投資によって維持されてきたものが大きい。

2026年、OracleのJavaOneで「**Java Verified Portfolio (JVP)**」プログラムが発表され、JavaFXの**商用サポートが復活**した。JDK 17/21/25/26などLTS版に対して、Oracleのプレミアサポート契約者向けに追加費用なしでJavaFX込みの保証が提供されるようになった。

## リリースサイクル

- JDK本体と同じ半年ごとのリリースケイデンスに乗っている。JavaFX 25/26はJDK 26と同時にGA(2026年3月)。
- JavaFX 27は現在RDP1(安定化フェーズ)で、2026年9月リリース予定。masterブランチは既にJavaFX 28向けに開いている。
- 旧LTS系統(21, 17, 8)にも定期的にセキュリティ・安定性パッチが継続配布されている(2026年4月のCritical Patch Updateなど)。

## 採用動向

「レガシーSwingアプリの移行先」という消極的な位置づけだけでなく、科学計算やデータ可視化系の**新規開発**でも選択肢として語られるようになってきている。AI活用アプリにおける可視化ニーズの高まりも追い風とされる。Zeiss Meditec AGなど、エンタープライズでの採用事例も挙げられている。

Oracleの商用サポート復活により、企業導入時にネックとなりがちだった「長期的にメンテされるか」という懸念が和らいだ、という指摘もある。

## 考えたこと

2017年にOracleに切り離されてからずっと「もう終わったUIフレームワーク」という印象を持っていたが、実際にはGluon主導のコミュニティが地道に開発を続けており、2026年にOracleが商用サポートという形で"公式に"戻ってきたというのは意外だった。JDK本体と足並みを揃えた半年サイクルのリリースが今も続いている点からも、プロジェクトとしては死んでいないことがわかる。

## 出典

- [Announcing the Oracle Java Verified Portfolio including Helidon and reintroduction of JavaFX Commercial Support](https://blogs.oracle.com/java/announcing-jvp)
- [Oracle's Java Verified Portfolio and JavaFX: What It Actually Means](https://foojay.io/today/the-javafx-revival/)
- [JavaFX 26 Today - Inside.java](https://inside.java/2026/03/25/javaone-javafx/)
- [JavaFX 26: Engineering Baseline and Selection Boundaries for Desktop UI](https://neatguycoding.com/posts/2026-05-18-javaone-2026-javafx-26-today/)
- [OpenJFX 26 Release Notes - Gluon](https://gluonhq.com/products/javafx/openjfx-26-release-notes/)
- [JavaFX - Wikipedia](https://en.wikipedia.org/wiki/JavaFX)

#java #javafx #ui
