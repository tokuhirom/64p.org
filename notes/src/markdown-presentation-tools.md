---
created: 2026-08-09 21:31
updated: 2026-08-09 22:04
---
# Markdownベースのプレゼンテーションツール

PowerPointやKeynote、Google SlidesのようなGUI(WYSIWYG)スライド作成ツールに対し、スライドの中身をMarkdownのプレーンテキストで書き、それをレンダリングしてスライドとして表示・出力するツール群がある。

#presentation #markdown #moc

## 共通する思想

- **テキストなのでGit管理できる**: 差分がdiffで見え、レビュー・バージョン管理がしやすい
- **エディタで書ける**: マウス操作で図形を配置する代わりに、慣れたテキストエディタ・IDEでスライドを書ける
- **ページ区切りは`---`**: 多くのツールがMarkdown中の水平線(`---`)でスライドの区切りを表現する

## 主なツール

- [[slidev]] — Vue.jsベースのWebアプリとして動くツール。ライブコーディング(Monaco Editor埋め込み)やVueコンポーネント埋め込みなど、インタラクティブな「Webスライド」寄り
- [[marp]] — Marpit(HTML/CSSスライド生成フレームワーク)がコアの、CLI/VS Code拡張中心のツール。PDF/PPTX/HTML出力の再現性を重視
- [[deck-k1low|deck]] — k1LoW氏によるGo製CLI。MarkdownをGoogle Slidesに流し込むツールで、出力先が自己完結したファイルではなく既存のGoogle Slidesという点が他と異なる

SlidevとMarpは「コードを多用する技術発表資料を、Git管理下で素早く作りたい」というエンジニア向けの動機は共通するが、SlidevはWebアプリとしての表現力・インタラクティブ性、Marpは変換フォーマット間の一貫性という、それぞれ異なる軸を重視している。deckはさらに異なる軸で、Google Slidesのエコシステム（共同編集・コメントなど）をそのまま活かしたい場合に向く。
