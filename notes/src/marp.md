---
created: 2026-08-09
updated: 2026-08-09
---
# Marp

Markdown Presentation Ecosystemの略。CommonMark準拠のMarkdownに`---`区切りを加えた記法でスライドを書けるツール群。コア部分はMarpitというHTML/CSSスライド生成フレームワークで、プラグインによる機能拡張が可能。MITライセンスのOSS。

#marp #presentation #markdown

## ツール構成

- **Marp CLI**: MarkdownをPDF/HTML/PPTX/画像に変換するコンバータ
- **Marp for VS Code**: VS Code拡張機能。エディタ内でプレビューしながら編集できる
- **Marp Core**: レンダリングエンジン本体

## 特徴

- **フォーマット間の再現性を重視**: PDF/PPTX/HTMLに変換しても見た目が変わらないように設計されている
- 画像配置・数式・自動スケーリングなどの拡張構文をサポート
- テーマはCSSで定義する

## [[slidev]]との違い

[[slidev]]がVue.jsベースのWebアプリとして動き、ライブコーディング（Monaco Editor埋め込み）やVueコンポーネント埋め込みなど「インタラクティブなWebスライド」寄りなのに対し、Marpは**VS Code拡張やCLIでの変換に軸足**があり、静的なPDF/PPTX/HTML出力の再現性を重視している。よりシンプルで軽量な用途（VS Code上でサクッと書いて即PDF化、など）に向く。

## 出典

- [Marp 公式サイト](https://marp.app/)
- [What's Marp | GitHub](https://github.com/marp-team/marp/blob/main/website/docs/introduction/whats-marp.md)
- [github.com/marp-team/marp](https://github.com/marp-team/marp)
