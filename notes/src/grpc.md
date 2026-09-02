---
created: 2026-08-15 14:40
updated: 2026-09-02 19:13
---
# gRPC

Googleが開発したオープンソースのRPC(Remote Procedure Call)フレームワーク。クライアントが別マシン上のサーバーのメソッドを、あたかもローカルオブジェクトのように直接呼び出せるようにする。[[protocol-buffers|Protocol Buffers]]をデフォルトのインターフェース定義言語(IDL)兼シリアライズ形式とし、[[http2|HTTP/2]]上で動作する。

## 出自: GoogleのStubbyの後継

Googleは2001年頃から、社内のマイクロサービス群を接続するための汎用RPC基盤Stubbyを内部で運用していた。Stubbyは1秒あたり数百億リクエストというインターネットスケールを捌けるRPC層だったが、公開された標準に基づいておらず、Google社内インフラに強く結合していたため外部公開には向かなかった。

HTTP/2やSPDY、QUICといった公開標準の登場でStubbyと同等の機能(多重化・ストリーミング等)が標準技術でも実現可能になったことを受け、2015年3月にStubbyの後継として開発・オープンソース化されたのがgRPCである。2017年2月には[[cncf|Cloud Native Computing Foundation(CNCF)]]にプロジェクトとして受け入れられた。

## サービス定義とProtocol Buffers

`.proto`ファイルでサービスのメソッドとメッセージ構造を宣言的に定義する。

```proto
service HelloService {
  rpc SayHello (HelloRequest) returns (HelloResponse);
}
```

`protoc`(または`buf`などのツール)がこの定義から各言語のクライアント/サーバースタブコードを生成する。対応言語はJava、Go、Python、Ruby、C++、C#、Dart、Kotlin、Node.js、Objective-C、PHP、Rust、Swiftなど多数。契約(スキーマ)を先に定義してからコードを生成する契約ファースト(contract-first)なアプローチであり、REST + [[openapi|OpenAPI]]のようにエンドポイントを実装してから後付けでスキーマを書く流れとは逆になる。

## 4つのRPCパターン

HTTP/2のストリーム機能を活かし、単発の呼び出しだけでなくストリーミングも標準でサポートする。

1. **Unary RPC** — 通常の関数呼び出しに近い、1リクエスト1レスポンス
2. **Server streaming RPC** — 1つのリクエストに対しサーバーがメッセージのストリームを返す
3. **Client streaming RPC** — クライアントがメッセージ列を送り、サーバーが最後に1つのレスポンスを返す
4. **Bidirectional streaming RPC** — クライアント・サーバー双方が独立した読み書きストリームで自由にやり取りする

## HTTP/2に依存する部分

gRPCはHTTP/2の多重化(1コネクション上で複数リクエスト/レスポンスを並行して流せる)とヘッダー圧縮を前提にしている。これにより上記のストリーミングパターンや、後述のtrailerによるステータス伝達が可能になる。

- **デッドライン/タイムアウト** — クライアントがRPC完了を待つ上限時間を指定でき、超過すると`DEADLINE_EXCEEDED`エラーで打ち切られる
- **メタデータ** — 認証情報などキー・バリュー形式の付加情報をリクエスト/レスポンスに載せられる
- **エラーハンドリング** — クライアントとサーバーはそれぞれ独立にRPCの成否を判定するため、サーバー側で成功していてもクライアント側はタイムアウト等で失敗と判断することがある

## RESTとの違い

- **ペイロード** — gRPCはデフォルトでProtocol Buffersによるバイナリシリアライズ、RESTは通常JSON(テキスト)
- **スキーマ** — gRPCは`.proto`による契約ファースト、RESTは[[openapi|OpenAPI]]等を後付けすることが多い
- **通信方式** — gRPCはHTTP/2ベースで双方向ストリーミングを標準サポート、RESTはリクエスト/レスポンス型が基本
- **ブラウザからの直接呼び出し** — ブラウザはHTTP/2フレームを細粒度制御できないため、素のgRPCをブラウザから直接話すことができない。この制約への対応が[[grpc-web|gRPC-Web]]

## [[microservices|マイクロサービス]]の中での位置づけ

サービス間通信(east-west trafficとも呼ばれる内部通信)のプロトコルとして採用されることが多い。[[netflix-graph-query-grpc|Netflixの分散グラフDB]]のクエリ層もgRPCをエントリポイントに採用している。

## 出典

- [What is gRPC? Introduction - gRPC](https://grpc.io/docs/what-is-grpc/introduction/)
- [gRPC Core concepts - gRPC](https://grpc.io/docs/what-is-grpc/core-concepts/)
- [About gRPC - gRPC](https://grpc.io/about/)
