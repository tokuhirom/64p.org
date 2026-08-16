---
created: 2026-08-16 11:28
updated: 2026-08-16 11:28
---
# Webページの本文抽出(主要コンテンツ抽出)

HTMLページからナビゲーション・広告・フッタなどのボイラープレートを除き、記事本文だけを機械的に取り出す技術。個別サイトのDOM構造をあらかじめ知らなくても、ヒューリスティックなスコアリングで「たぶん本文だろう」というブロックを当てる点が特徴。RSSを持たないサイトのフィード化([[rss-bridge]]や[[fivefilters-feed-creator|FiveFilters]])や、部分フィードを全文フィードに変換する処理([[fivefilters-feed-creator|Full-Text RSS]])、ブラウザのリーダービュー機能の基盤になっている。

## Arc90 Readabilityアルゴリズム

2010年にArc90社が開発したアルゴリズム。DOMツリーを走査し、`p`/`div`などのタグや`class`/`id`名(`content`/`article`/`entry`のような語には加点、`footer`/`banner`のような語には減点)に基づいて各ノードにスコアを付与し、親ノードへスコアを伝播させて、最終的に最もスコアの高い領域を本文として抜き出すヒューリスティック手法。

このアルゴリズムはMozillaに引き継がれ、`Readability.js`としてFirefoxのリーダービュー機能の中核になっている。各種言語への移植も多い。

## 日本発の自作事例: ExtractContent

サイボウズ・ラボの中谷秀洋氏が、Webページの自動カテゴライズシステム「Pathtraq」のために2007年に公開したRuby実装。「本文を当てる」のではなく「本文以外を除外する」アプローチを取る点が特徴。

- `div`/`td`で囲まれた範囲を初期のテキストブロックとして分割。
- 句読点の数をベーススコアとし、リンク以外のテキスト長の割合、ブロックの出現位置(前半ほど高スコア)、アフィリエイト/フォーム/フッタ特有の語といった素性でスコアを加減点。
- リンクリストと判定されたブロックは除外方向に調整。
- スコアの高い連続ブロックを「大ブロック」としてクラスタ化し、最もスコアの高いクラスタを本文とする。

はてなもこのアプローチをJavaScriptに移植した`extract-content-javascript`を2009年に公開し、はてなブックマークのFirefox拡張内部で使っていた。ブログのテンプレート(サイト種別)に依存せず、HTML変更にも強い一方、構文解析ベースの手法に比べると精度は落ち、処理負荷も高めという特性がある。

## 現代の実装

- **Trafilatura**(Python) — ベンチマークで高いF1/適合率を示す、汎用コンテンツ抽出パイプライン。ブラウザ不要で軽量。
- **readability-lxml**(Python) — Firefox Reader View系譜のミニマルなHTMLクリーナー。再現率(recall)が高い。
- **Newspaper4k**(Python) — NLP機能も持つニュース記事処理ライブラリ。
- Postlightの**Mercury Parser**はNTT DataによるPostlight買収後、事実上開発終了。

## 出典

- [Extracting significant content from a web page using Arc90 Readability algorithm - Medium](https://medium.com/@kamendamov/extracting-significant-content-from-a-web-page-using-arc90-readability-algorithm-636e2c1951e7)
- [GitHub - masukomi/arc90-readability](https://github.com/masukomi/arc90-readability)
- [Webページの本文抽出 (nakatani @ cybozu labs)](https://labs.cybozu.co.jp/blog/nakatani/2007/09/web_1.html)
- [(開発者様向け) JavaScript での本文抽出ライブラリ extract-content-javascript を公開しました - はてなブックマーク開発ブログ](https://bookmark.hatenastaff.com/entry/2009/10/07/000000)
- [GitHub - hatena/extract-content-javascript](https://github.com/hatena/extract-content-javascript)
- [GitHub - kanjirz50/python-extractcontent3](https://github.com/kanjirz50/python-extractcontent3)
- [Trafilatura vs. Readability vs. Newspaper4k - contextractor.com](https://www.contextractor.com/trafilatura-vs-readability-vs-newspaper/)

#rss #self-hosted
