---
created: 2026-08-16 11:24
updated: 2026-08-16 11:28
---
# RSS-Bridge

フィード(RSS/Atom)を提供していないウェブサイト向けに、フィードを生成するPHP製の自己ホスト型ウェブアプリケーション。プロジェクトはShaarli作者のsebsauvageが発起し、現在はコミュニティ(2024年時点のメンテナは@dvikanと@Mynacol)が引き継いで開発している。

## 仕組み

サイトごとの取得ロジックは「bridge」という単位で実装されており、本体には447個ものbridgeが同梱されている(YouTube・TikTok・Mastodonなど主要SNS/プラットフォーム専用のもの多数)。

- 任意サイトをCSSセレクタやXPathでスクレイピングして汎用的にフィード化するbridge(CssSelector/XPath)もある。
- FeedMerge/FeedReducerというbridgeで、複数フィードの統合や絞り込みも可能。

## 動作要件・デプロイ

- PHP 7.4以上、データベース不要。ZIP展開だけでも動く。
- Docker公式イメージ/docker-compose、nginx+php-fpmでの手動構築、Scalingo/Cloudron/PikaPodsのワンクリックデプロイなど複数の手段がある。
- PHPウェブアプリとして動かす他、CLIモード(キャッシュクリア等)にも対応。

## キャッシュ

サイト側からのIP制限・BAN対策として、ファイル/SQLite/Memcached/Nullから選べるキャッシュバックエンドを持つ。bridgeごとにキャッシュ期間を変えられる。

## 出力フォーマット

Atom/RSS標準に加え、HTML・JSON・Plaintext・MRSS(メディア対応)・Sfeed(タブ区切り)など多様な形式に対応。

## ライセンス

ソースコードはパブリックドメイン(UNLICENSE)。依存ライブラリはMIT。

## 類似ツール

「フィードのないサイトをフィード化する」問題を扱う点で[[fivefilters-feed-creator|FiveFilters Feed Creator]]と同種。RSS-Bridgeは自分でホストするOSS+bridge集合であるのに対し、FiveFiltersはホスト型サービス(将来セルフホスト版も予定)という違いがある。RSS-BridgeのCssSelector/XPathブリッジは手動でセレクタを指定する方式で、サイト構造を自動判定する[[html-content-extraction|本文抽出アルゴリズム]]とはアプローチが異なる。

## 出典

- [RSS-Bridge/rss-bridge (GitHub)](https://github.com/RSS-Bridge/rss-bridge)
- [rss-bridge.org](https://rss-bridge.org/)

#rss #self-hosted #php
