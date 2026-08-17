---
created: 2026-08-17 17:13
updated: 2026-08-17 17:13
---
# Ratatoskr

[kan/ratatoskr](https://github.com/kan/ratatoskr) は、Cloudflare Workers + D1上で動く個人向けセルフホスト型RSSリーダー。名前は北欧神話でユグドラシルの木を往き来してメッセージを運ぶリスに由来する。2026年8月15日作成、MITライセンス。

## 目的

最優先事項は「livedoor Reader / Fastladderの『流れるように読める』操作感をWebで再現する」こと。機能の豊富さより、キー入力から次の記事表示までの遅延をゼロにすることを重視している。PCとスマートフォン間で購読状態を同期する想定。

## 設計方針

3つの核となる方針がある。

- **既読管理**: 記事ごとの既読フラグではなく、フィードごとに「最大entry id」を1つ保持するウォーターマーク方式。IDが単調増加するため、複数端末間の競合解決が`Math.max`だけで完結する。
- **パフォーマンス**: 起動時に想定規模(50〜150フィード)の記事本文を全件ローカル先読みし、記事送り時のネットワーク遅延をゼロにする。
- **書き込み**: 既読・ピン・レート変更はローカル(IndexedDB)に即時反映し、サーバへの送信は非同期・冪等なoutboxパターン経由で行う。

## 技術スタック

- バックエンド: Cloudflare Workers、D1、Cron Triggers
- フロントエンド: Vue 3 + TypeScript + Vite、Pinia、Tailwind CSS v4
- ローカル永続化: IndexedDB
- 認証: Cloudflare Access

## 現状

現在はM0(足場構築)段階で、フィード読み込み自体はまだ未実装。ロードマップは`docs/ROADMAP.md`にあり、デプロイ手順はM9で整備予定とのこと。

## 関連

「RSSフィードを閲覧しやすくする」問題を扱う点は共通するが、[[rss-bridge|RSS-Bridge]]や[[feedly-rss-builder|Feedly RSS Builder]]が「フィードのないサイトをフィード化する」問題を扱うのに対し、Ratatoskrは既存フィードを速く・快適に読むためのリーダー自体という別の問題を扱う。

## 出典

- [kan/ratatoskr (GitHub)](https://github.com/kan/ratatoskr)

#rss #self-hosted #cloudflare-workers
