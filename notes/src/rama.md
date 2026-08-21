---
created: 2026-08-22 07:26
updated: 2026-08-22 07:28
---
# rama

[plabayo/rama](https://github.com/plabayo/rama) はRust製のモジュール型サービスフレームワーク。ネットワークパケットの移動・変換を目的としており、クライアント・サーバー・プロキシ、あるいはそれらを組み合わせたシステムを構築するために使う。ベルギー・ゲント拠点のソフトウェアスタジオPlabayoが開発している。ライセンスはMIT / Apache 2.0のデュアルライセンス。

## 設計思想

「意図的に明示的（intentionally explicit）」であることが特徴。ネットワークスタックをservice・layer・transport・protocol・stateという要素の組み合わせとして構成し、システムの構造がコード上に可視化されるようにしている。ランタイムはTokio専用のasync-first設計。

## 対応プロトコル・機能

- トランスポート: TCP、UDP、Unixドメインソケット
- HTTP: HTTP/1・[[http2|HTTP/2]]のサーバー/クライアント、[[websocket|WebSocket]]、[[grpc|gRPC]]、FastCGI
- TLS: Rustls / BoringSSLによるTLS終端、動的証明書、mTLS、[[acme|ACME]]対応
- プロキシプロトコル: HTTP CONNECT、HTTPS CONNECT、SOCKS5、HAProxy PROXYプロトコル
- その他: DNS、テレメトリ、[[tls-fingerprinting|フィンガープリンティング]]など

## 想定用途

- セキュリティ分析向けのトラフィック検査
- Webサービス開発
- カスタムユーザーエージェントを持つクライアントのエミュレーション
- テスト用の接続制御
- 高性能なリバースプロキシ・APIゲートウェイの構築

本番環境でネットワークセキュリティ、データ抽出、APIゲートウェイ、ルーティングなどの用途で使われている実績があるとのこと。同じくリバースプロキシ用途で使われるGo製の[[traefik|Traefik]]とは異なり、rama自体はスタンドアロン製品ではなく、Rustコードでネットワークスタックを組み立てるためのライブラリ/フレームワークという位置づけ。

## 出典

- [GitHub - plabayo/rama](https://github.com/plabayo/rama)
- [rama - crates.io](https://crates.io/crates/rama)
- [Rama — server-side Rust // Lib.rs](https://lib.rs/crates/rama)
- [rama - Rust docs](https://ramaproxy.org/docs/rama/index.html)

#rust #networking #proxy
