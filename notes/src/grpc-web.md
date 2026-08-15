---
created: 2026-08-15 14:40
updated: 2026-08-15 14:40
---
# gRPC-Web

ブラウザ(JavaScript/TypeScript)から[[grpc|gRPC]]サービスを呼び出すためのプロトコル・クライアントライブラリ。素のgRPCをブラウザから直接話すことはできないため、その制約を回避する目的で作られた。

## なぜブラウザは素のgRPCを話せないか

gRPCはHTTP/2のフレームを細粒度に制御すること(トレーラーの送受信タイミングなど)を前提にしているが、ブラウザのHTTP APIにはその制御能力がない。特に、gRPCはレスポンスのステータスやエラー詳細をボディ末尾のHTTP/2トレーラーで返すが、ブラウザのFetch APIはレスポンストレーラーを長年仕様(`response.trailers`が`Promise<Headers>`として`WHATWG Fetch`仕様に存在)に含めていながら、2026年時点でも主要ブラウザのどれも実装していない。

## gRPC-Webプロトコルの妥協

上記制約に対応するため、gRPC-Webは素のgRPCと異なる調整を加えている。

- HTTP/1.1とHTTP/2の両方で動作する
- トレーラーをレスポンスボディの末尾に埋め込み、メッセージヘッダー内のビットで「これはトレーラーだ」と示す(HTTP/2トレーラーそのものは使わない)
- ブラウザのリクエストと、バックエンドのgRPC(HTTP/2)サーバーとの間の変換を行うプロキシ(Envoyなど)が必要になることが多い

## ストリーミング対応状況(2026年時点)

gRPC-Webはサーバーストリーミングのみ対応しており、クライアントストリーミング・双方向ストリーミングには未対応。仕様上、これらはブラウザにWHATWG Streams APIが十分に実装された時にサポートされる想定になっている。

- Fetch APIの`duplex: 'full'`オプション(双方向ストリーミングに必要)は一部のChromiumビルドでフラグ付き実験提供されているのみで、2026年初頭時点で安定版ブラウザには未搭載。Safari・Firefoxは未対応
- gRPC-Webのロードマップには、Fetch/Streams対応の強化(キャンセレーション対応含む)やService Workerでのランタイム対応強化が挙げられている
- 双方向通信が必要な場合はgRPC-Webの代わりにWebSocketの利用が案内されている

## Connect: プロキシ不要という解決策

Buf社が開発した**Connect**は、gRPC-Webが抱えていた「変換プロキシが必須」という問題への解決策として登場したRPCライブラリ群。1つのサーバー実装で以下3プロトコルを同時にネイティブサポートする。

1. gRPCプロトコル(既存のgRPCクライアント向け)
2. gRPC-Webプロトコル(ブラウザ向け、Envoyなどのプロキシなしで直接ネイティブサポート)
3. Connect独自プロトコル — HTTP/1.1・HTTP/2・HTTP/3で動作し、`curl`やブラウザの素のFetchなど標準的なHTTPツールからも扱える

クライアント側の`connect-web`(TypeScriptライブラリ)は、素のREST + fetchクライアントと遜色ない書き味のコードを生成する。プロトコルの切り替えは設定のトグル一つで済み、コード変更は不要。

## JSからの呼び出しは快適になったか

素のgRPC-Web + Envoyプロキシの構成に比べると、Connectの登場によりプロキシ運用の手間が減り、生成されるTypeScriptクライアントのDXも改善されている。ただし2026年時点でもクライアントストリーミング/双方向ストリーミングはブラウザのFetch API側の制約(duplex: 'full'が安定版ブラウザ未搭載)により本質的には未解決で、双方向通信が要る場面ではWebSocket等への切り替えが必要という状況は変わっていない。

## 出典

- [The state of gRPC in the browser - gRPC blog](https://grpc.io/blog/state-of-grpc-web/)
- [grpc-web roadmap - GitHub](https://github.com/grpc/grpc-web/blob/master/doc/roadmap.md)
- [Introduction - Connect](https://connectrpc.com/docs/introduction)
- [Connect-Web: It's time for Protobuf and gRPC to be your first choice in the browser - Buf blog](https://buf.build/blog/connect-web-protobuf-grpc-in-the-browser)
