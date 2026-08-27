---
created: 2026-08-15 15:14
updated: 2026-08-27 21:59
---
# Protocol Buffers

Googleが開発した言語非依存・プラットフォーム非依存の構造化データシリアライズ形式(通称protobuf)。XMLやJSONのようにデータをやり取りするための仕組みだが、より小さく・速く・シンプルであることを目指している。

## 仕組み

- `.proto`ファイルに、言語非依存のインターフェース定義言語(IDL)でメッセージのスキーマを定義する。
- `protoc`コンパイラが`.proto`から各言語向けのコードを生成し、そのコードを使ってシリアライズ/デシリアライズを行う。
- シリアライズ結果はテキストではなくバイナリ形式で、XML/JSONのようなテキストベース形式に比べてコンパクトかつシリアライズ/デシリアライズが高速。
- C++, C#, Dart, Go, Java, Kotlin, Objective-C, Python, Rust, Ruby など多数の言語向けにコード生成をサポートする(proto3ではPHPも追加)。

## 用途

Google社内でサーバー間通信・ディスクへのデータ永続化の両方で最も広く使われているデータ形式。[[grpc|gRPC]]はデフォルトのIDL兼シリアライズ形式としてProtocol Buffersを採用しており、[[onnx|ONNX]]もモデルのシリアライズ形式としてProtocol Buffersを使っている。

## スキーマフリー形式との違い

[[messagepack|MessagePack]]や[[cbor|CBOR]]がスキーマなしで自己記述的にデータをエンコードするのに対し、Protocol Buffersは`.proto`スキーマに基づいてフィールド名自体を省略してエンコードする。ペイロードはより小さく・パースも速くなる一方、外部にスキーマ定義がないとデータの意味を復元できない。

## 出典

- [Overview | Protocol Buffers Documentation](https://protobuf.dev/overview/)
- [Protocol Buffers: Google's Data Interchange Format | Google Open Source Blog](https://opensource.googleblog.com/2008/07/protocol-buffers-googles-data.html)
- [Protocol Buffers - Wikipedia](https://en.wikipedia.org/wiki/Protocol_Buffers)

#protocol #serialization
