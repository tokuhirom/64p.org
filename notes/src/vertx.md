---
created: 2026-08-19 23:15
updated: 2026-08-19 23:15
---
# Vert.x

Eclipse Vert.xは、JVM上でリアクティブ(スケーラブルかつ障害に強い)なアプリケーションを構築するためのツールキット。Springのようなフルスタックフレームワークではなく、必要なモジュールだけを組み合わせて使う軽量な作りで、内部の隠れた自動処理(「魔法」)が少ないのが特徴。

## コアコンセプト

- **イベントループ**: 従来のスレッド・パー・リクエスト方式の限界を超えるため、少数の「イベントループ」スレッドで多数のワークロードを多重化する。I/Oはすべて非ブロッキングで、ブロッキング待ちの間に他のタスクを処理できる。内部は[Netty](https://netty.io/)ベースで、Multi-Reactorパターンの実装。
- **Verticle**: Vert.xアプリケーションの基本的なデプロイ単位。1つのVerticleは基本的に1つのイベントループスレッド上で動く。
- **EventBus**: Verticle同士がメッセージパッシングで通信するための分散イベントバス。1対1、リクエスト/レスポンス、Pub/Subの各パターンをサポートする。
- **非同期プログラミングモデル**: コールバック、Future/Promise、RxJava、Kotlinコルーチンなど複数のスタイルから選べる。

## 特徴

- JVM上で動く言語なら何でも使えるポリグロット対応(Java, Kotlin, Groovy, Scalaなど)。
- HTTP/TCP、ファイルシステム、HTTP/2、Linux上のドメインソケットなど低レベル機能をコアモジュールが提供し、その上にリアクティブなDBクライアント・メッセージング・Webスタック・マイクロサービス向けエコシステムが乗る。
- GitHub上で4.x系と5.x系を並行メンテナンス中(2026年8月時点)。

## [[project-loom|Project Loom]](仮想スレッド)との対比

Vert.xの少数イベントループ+非同期APIというアプローチは、[[project-loom|Project Loom]]の仮想スレッドが実現する「スレッド・パー・リクエストのプログラミングスタイルをOSスレッドの制約なしに実現する」アプローチとは異なる解決策。どちらも「多数の同時接続をスレッド枯渇なしに捌く」という同じ課題への異なるアプローチと言える。前者は非同期コールバック/Future流のコードスタイルを要求し、後者は同期的に見えるコードのまま(ブロッキング風に書ける)スケールさせる。

## 出典

- [Eclipse Vert.x 公式サイト](https://vertx.io/)
- [Intro to reactive | Eclipse Vert.x](https://vertx.io/docs/intro-to-reactive/)
- [GitHub - eclipse-vertx/vert.x](https://github.com/eclipse-vertx/vert.x)
- [Going Beyond Spring: Exploring Vert.x for Reactive Java Development | HackerNoon](https://hackernoon.com/going-beyond-spring-exploring-vertx-for-reactive-java-development)
