---
created: 2026-08-09
updated: 2026-08-09
---
# deck (k1LoW)

k1LoW氏が開発した、MarkdownからGoogle Slidesを生成・更新するCLIツール。Go言語製、MITライセンス。

#deck #presentation #markdown #google-slides #go

## 特徴

- **コンテンツとデザインの分離**: Markdownでコンテンツを書き、デザイン(テーマ・レイアウト)はGoogle Slides側で管理する
- **ワークフロー**: `deck new`でプレゼンテーションIDを取得 → Markdownで編集 → `deck apply`でGoogle Slidesに反映 → `deck open`でブラウザ表示
- **ウォッチモード**: ファイル変更を自動監視し、即座にGoogle Slidesへ反映
- 対応記法: CommonMark + GitHub Flavored Markdown（太字・斜体・コード・リスト・表・画像・ブロッククォート・HTMLインライン要素など）

## [[markdown-presentation-tools]]の中での位置づけ

[[slidev]]や[[marp]]がHTML/PDF/PPTXなど自己完結した出力を生成するのに対し、deckは**既存のGoogle SlidesというGUIプラットフォームにMarkdownで内容を流し込む**という異なるアプローチを取る。共同編集やコメント機能などGoogle Slidesのエコシステムをそのまま使いたい場合に向く。

## 出典

- [GitHub - k1LoW/deck](https://github.com/k1LoW/deck)
