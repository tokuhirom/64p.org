---
created: 2026-10-09 13:50
updated: 2026-10-09 13:50
---
# celld

#deno #cloudflare #self-hosted

Denoチームが作っている、Cloudflare Workersのプログラミングモデルをセルフホストできるようにするシステム。Rust製の1バイナリで、外部依存はオブジェクトストレージのみ。[[deno-joins-cloudflare]]の発表で言及された。

## 設計

- 土台はCloudflare Workersのプログラミングモデル。最初から分散アプリケーションを構築でき、スケーリングがアプリごとのインフラ構築ではなくプログラミングモデルに組み込まれている、というのがRyan Dahlの強調点。
- 運用は「多数のcelldインスタンス + 1つのオブジェクトストレージバケット」。アプリごとに別のインフラプロジェクトを立てなくても、多数のサービスを含められる。
- [[durable-objects]]に焦点を当てている。AIエージェントの実行基盤として、安価なサーバーレス実行・永続状態・WebSocket・JavaScriptの高水準インターフェースが有用、という理由。

## 経緯

- Deno Deployの運用で、複数のパブリッククラウド、複数のデータベース、複雑に絡んだサービスに苦労した経験が出発点（Cloudflare側の記事より）。
- Denoチームは2026年8月にcelldを公開。Cloudflare Workers/DOの互換実装を目指していて、Cloudflareにとっては歓迎すべきものだったとKenton Vardaは述べている。
- 今後はcelldのコードとアイデアが`workerd`にマージされる予定。

## 出典

- [Deno blog: Deno is joining Cloudflare](https://deno.com/blog/cloudflare)
- [Cloudflare blog: Deno is joining Cloudflare](https://blog.cloudflare.com/deno-joins-cloudflare/)
