---
created: 2026-08-15 09:30
updated: 2026-08-15 09:30
---
# Proxylity UDP Gateway

AWS上でUDPのrequest/responseパターンをサーバーレスに処理するためのゲートウェイ製品。HTTP APIをAPI Gatewayで受けるのと同様に、UDPパケットを受けてLambda等にディスパッチする仕組みを提供する（CloudFormationでリソースを定義する）。

## WireGuardオープンエンドポイント機能

2026年6月3日の発表で追加された機能。

- 従来のWireGuardリスナーは、接続を許可する各ピアの公開鍵をCloudFormationテンプレートに事前登録する必要があり、未知の鍵からのハンドシェイクは拒否されていた。
- `AllowUnknownPeers`プロパティを有効化すると、事前登録なしに任意の[[wireguard|WireGuard]]クライアントからの接続を受け入れられるようになる。TLSと同様に「トランスポート層は暗号化するが、認証はアプリケーション層に委ねる」モデル。
- `UnknownPeerPreSharedKey`プロパティを設定すると、未知のピアにも事前共有鍵(PSK)の提示を要求できる。共有APIキーに近い、緩いが実質的な認証ゲートとして機能する。
- 想定用途は、事前登録が現実的でない大規模・不特定多数のデバイスフロート（IoTデバイス群など）。

## Lambda非同期呼び出し機能

同じ発表で追加された、UDP Gateway側のLambda呼び出しモードの拡張。

- 従来はLambda destinationを同期呼び出し(`RequestResponse`)で扱っていた。ゲートウェイはパケットバッチを配信し、関数の完了を待ってから、戻り値をもとにクライアントへ応答を返していた。
- `UseAsyncInvoke`引数を指定すると、Lambdaの`Event`（非同期）呼び出しモードに切り替わる。ゲートウェイはパケットバッチを配信すると即座にHTTP 202を受け取り、関数の完了を待たずに処理を終える。
- 長時間実行のワークフロー（デバイスプロビジョニング、多段階の検証処理など）のように、即座のレスポンスが不要な処理の起動に向く。

## 2機能の組み合わせ

WireGuardオープンエンドポイントとLambda非同期呼び出しを組み合わせると、「未登録・未認証に近いWireGuardクライアントからパケットを受信 → 長時間バックエンドワークフローを起動 → 即座に処理を返す」という構成が可能になる。

## 出典

- [Now Available: Open WireGuard Endpoints and Async Lambda - Proxylity](https://proxylity.com/articles/now-available-open-wireguard-endpoints-and-async-lambda.html)

#aws #wireguard #networking #serverless
