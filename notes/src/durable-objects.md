---
created: 2026-10-09 13:50
updated: 2026-10-09 13:50
---
# Durable Objects

#cloudflare #javascript #distributed-systems

Cloudflare Workers上の状態を持つコンピュート単位。Ryan Dahlの言い方では「SQLiteを備えた分散シングルトン」（[[deno-joins-cloudflare]]のCloudflare側記事より）。

## 特徴

- 個別にアドレス可能な小さなサーバーで、各オブジェクトが専用のリレーショナルデータベース（SQLite）を持つ。
- JavaScriptの実行はシングルスレッドで、WebSocketを扱え、SQLiteには同期的にアクセスできる。
- シャーディングの単位として使える。例: チャットアプリでチャンネルごとに1つのDOを割り当てると、データとWebSocket接続がチャンネル単位で分散する。
- DOの上にQueues、KV、Durable Execution（Workflow API）、Gitストレージ（例: durable-git）などを構築できる、とRyanは述べている。
- 料金が安いのはトリックではなく、独自アーキテクチャによる効率化の結果、というのがKenton Vardaの説明。

## ローカルとセルフホスト

- OSSの`workerd`でもDOは動くが、単一インスタンスのみ。ローカルテストには十分だがスケールしない。
- Cloudflare本番のルーティングは数百拠点・多数の外部依存・SREチームの運用が前提で、そのままセルフホストには向かない。
- [[celld]]はこの隙間を埋める、DOに焦点を当てたセルフホスト実装として作られた。

## 出典

- [Cloudflare blog: Deno is joining Cloudflare](https://blog.cloudflare.com/deno-joins-cloudflare/)
- [Deno blog: Deno is joining Cloudflare](https://deno.com/blog/cloudflare)
