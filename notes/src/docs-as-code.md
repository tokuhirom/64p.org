---
created: 2026-09-02 19:50
updated: 2026-09-02 19:50
---
# Docs as Code

ドキュメントをコードと同じツール・同じワークフローで書くべきだ、という考え方。Write the Docsコミュニティによる定義は「Documentation as Code (Docs as Code) refers to a philosophy that you should be writing documentation with the same tools as code」。docs-like-code とも呼ばれる。

#documentation #devops

## 構成要素

- **バージョン管理** — Git。ドキュメントをコードと同じリポジトリ、または同じ管理体系に置く
- **プレーンテキストの軽量マークアップ** — Markdown / reStructuredText / AsciiDoc
- **Issue tracker** — ドキュメントの不備をコードのバグと同じ形で管理する
- **コードレビュー** — Pull Requestとレビューのプロセスをドキュメントにも適用する
- **自動テスト** — リンク切れ、ビルド、スタイルガイドのlint
- **静的サイトジェネレータ** — MkDocs / Sphinx / Docusaurus / Antora など。ソースファイルから成果物をビルドして配信する

## なぜ効くのか

最大の効果は**開発者を書き手として巻き込めること**。Write the Docsは「開発者がしばしばドキュメントの初稿を書くようになる」「ドキュメントを含まない新機能のマージをブロックできる」という点を挙げている。ドキュメントが別システム（Wikiなど）にあると、機能開発とドキュメント更新が別の作業になって後回しになるが、同じPRの中にあれば「開発中に書く」動機が働く。

テクニカルライター側から見ると、開発者の作業フローの内側に入っていけるという利点がある。

## 出自

Anne Gentleの著書『[Docs Like Code: Write, review, test, merge, build, deploy, repeat](https://www.amazon.co.jp/dp/1387081322?tag=tokuhirom-22)』（2017年）が概念を広めた。Write the Docsのガイドは Eric Holscher とコミュニティによるもの。

## [[backstage|Backstage]] TechDocs という実装例

Spotifyが2020年に公開したTechDocsは、Docs as Codeを開発者ポータルに統合した実装。

Spotifyが抱えていた問題は「エンジニアが仕事に必要な技術情報を見つけられない」ことだった。チームごとにConfluence・Google Docs・README・独自サイトとバラバラのツールを使っていて、発見不可能かつ信頼性も判断できない状態になっていた。

TechDocsのやり方は単純で、エンジニアがコードと同じ場所にMarkdownを置き、CIでMkDocsがドキュメントサイトを生成し、Backstage内で一元的にレンダリングする。その上で、オーナー情報・GitHub issue・Slackチャンネル・Stack Overflowタグといったメタデータで静的ドキュメントを補強する。更新日時と貢献者を表示して「信頼していい情報か」のシグナルを出す設計も入っている。

指針として掲げられたのは「エンジニアを stuck から unstuck へ、速く」。結果としてTechDocsは130以上あるプラグインのひとつでありながら、Backstageのトラフィックの約20%を占めるまでになった。

[[golden-path|Golden Path]] tutorial がTechDocs上で管理されているのも同じ流れで、「推奨経路」がコードと同じレビュー対象になっている。

## 限界と課題

- **Gitの学習コスト** — 技術レベルの異なるライターのチームがGitを実用的に使いこなすのは簡単ではない。ブランチ戦略やPRレビューは、ビジュアルエディタに慣れた書き手には直感的でない
- **ライターと開発者の間の壁** — 「テクニカルライターにコードを書けと言うか、開発者に文章を書けと言うか」のどちらかを要求する構図になりやすい
- **プロセスのオーバーヘッド** — ドキュメントの小さな修正でもPRを開き、レビュー承認を待ち、無関係なテストの通過を待つことになる。ドキュメント専用のマージゲートやビルドチェックを用意する余力がないとこれが効いてくる
- **開発者向けを超えた規模での限界** — README的なものを超えて、数千トピックを技術ライター・プロダクトチーム・外部貢献者が保守する大規模ドキュメントポータルになると、検索・ローカライズ・アナリティクス・アクセス制御のための追加ツールが必要になる

## 出典

- [Docs as Code - Write the Docs](https://www.writethedocs.org/guide/docs-as-code/)
- [Announcing TechDocs: Spotify's docs-like-code plugin for Backstage](https://backstage.io/blog/2020/09/08/announcing-tech-docs/)
- [Docs Like Code: an Interview with Anne Gentle - RedMonk](https://redmonk.com/kfitzpatrick/2023/05/30/docs-like-code-an-interview-with-anne-gentle/)
- [Docs as code is a broken promise - thisisimportant.net](https://thisisimportant.net/posts/docs-as-code-broken-promise/)
- [When Docs as Code Reaches Its Limits (And What Teams Do Next) - ClickHelp](https://clickhelp.com/clickhelp-technical-writing-blog/when-docs-as-code-reaches-its-limits-and-what-teams-do-next/)
