---
created: 2026-08-16 11:43
updated: 2026-08-16 11:43
---
# Feedly RSS Builder

RSSフィードのないWebサイトを、Feedly上で「フィード化したい記事セクションをページのプレビュー上でクリックして選択する」ことでフォロー可能にする機能。2021年12月14日に公開された。[[fivefilters-feed-creator|FiveFilters Feed Creator]]や[[rss-bridge]]のCssSelector/XPathブリッジが人間がセレクタ文字列やclueを手書きで与えるのに対し、Feedly RSS Builderはプレビュー上での直接クリックという、より対話的(interactive)な形で対象ノードを人間に選ばせる点が特徴。

## 使い方

1. フォローしたいサイトのURLを入力するとプレビューが開く。
2. ページをスクロールして「最新記事一覧」のようなセクションを探す。
3. フィード化したい記事をクリックして選択。
4. 「Build RSS feed」をクリックして生成し、既存または新規のフィードへ追加。

## 対象プラン

Pro+プラン(最大25フィード作成可)、Enterpriseプラン(最大100フィード作成可)限定の機能。無料プランでは使えない。

## 制限事項

- Facebook/Instagramなどソーシャルメディアは非対応。
- JavaScriptで動的にコンテンツを描画するサイトは非対応。
- リンク構造が不明確なサイトは非対応。
- Safariでは動作しない。Webアプリ限定で、モバイルアプリからは利用できない。

## 他アプローチとの比較

同じ「フィードのないサイトをフィード化する」問題に対し、人間がどこまで介在するかという軸で並べると以下のようになる。

| 手法 | 対象ノードの選び方 |
|---|---|
| [[html-content-extraction\|Arc90/Readability系アルゴリズム]] | 完全自動(ヒューリスティックなスコアリング) |
| FiveFilters Feed Creator | 人がテキストの手がかり(clue)を文字列で指定 |
| RSS-BridgeのCssSelector/XPathブリッジ | 人がCSSセレクタ/XPathを手書き |
| Feedly RSS Builder | 人がプレビュー上で要素を直接クリック選択 |

## 出典

- [Easily follow websites that don't have RSS feeds | Feedly](https://feedly.com/new-features/posts/easily-follow-websites-that-don-t-have-rss-feeds)
- [How can I access the RSS Builder? - Feedly Documentation](https://docs.feedly.com/article/594-how-can-i-access-the-rss-builder)

#rss
