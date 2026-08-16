---
created: 2026-08-16 11:28
updated: 2026-08-16 11:28
---
# FiveFilters Feed Creator

[FiveFilters.org](https://www.fivefilters.org/)が提供する、RSSフィードを持たないWebページから独自のフィード(RSS/JSON)を生成するサービス。<https://createfeed.fivefilters.org/>でホスト型サービスとして提供されている。現在は「Feed Control」というプラットフォームの一部という位置づけ。[[rss-bridge]]と同じく「フィードのないサイトをフィード化する」問題を扱うツールだが、アプローチが異なる。

## 仕組み

対象ページのURLと、拾いたいリンクを見分けるための手がかり(clue)を与えると、そのページのHTMLからリンクを抽出してフィード化する。仕組み上、サイトがリニューアルされてHTML構造が変わると生成済みフィードが壊れることがある。

- セレクタや除外ワード・URLパターンによる絞り込みが可能。
- 複数フィードのマージ・フィルタリング(既存フィードに対しても適用可)。
- フルテキスト展開: リンク先記事の全文を取得してフィードに含める機能もある(後述のFull-Text RSSと同系の抽出技術がベースにあると見られる)。
- 新しいバージョンでは自動(AI)による項目検出、JavaScript実行後のDOM検出、Slack/Discord/Webhook通知にも対応。

## 無料版の制限

- 生成フィードは最大5件まで。
- 除外できる要素タイプは3種まで。
- キャッシュは2時間。

将来的にセルフホスト版の提供も予告されている(2026年時点)。

## 関連ツール: Full-Text RSS

同じFiveFiltersが開発・販売する[[html-content-extraction|本文抽出]]ツール。部分的な内容しか含まないRSSフィードを、各記事本文を取得して全文フィードに変換する。PHP製でAGPLライセンス。最新版は有償配布だが、新バージョンが出ると旧バージョンがGitHubにパブリックドメイン相当で公開される仕組みを取っている。サイトごとの抽出ルールを持ち、ルールがないサイトはヒューリスティックで本文を検出する。

## 出典

- [Feed Creator (RSS Generator) · FiveFilters.org](https://createfeed.fivefilters.org/)
- [Feed Creator Intro | FiveFilters.org Docs](https://help.fivefilters.org/feed-creator/)
- [Quick start | FiveFilters.org Docs](https://help.fivefilters.org/feed-creator/quick-start.html)
- [How to Use FiveFilters to Create RSS Feeds for Any Web Page - MakeUseOf](https://www.makeuseof.com/create-rss-feeds-fivefilters/)
- [Full-Text RSS Intro | FiveFilters.org Docs](https://help.fivefilters.org/full-text-rss/)
- [GitHub - Coool/full-text-rss-fivefilters](https://github.com/Coool/full-text-rss-fivefilters)

#rss #self-hosted
