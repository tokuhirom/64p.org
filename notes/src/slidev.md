---
created: 2026-08-09
updated: 2026-08-09
---
# Slidev

開発者向けのMarkdownベースのプレゼンテーションツール。`---`区切りでスライドを1ページずつMarkdownで記述する。内部はVue.jsベースのWebアプリとして動作し、Node.js/npmエコシステム上で開発・ビルドする。開発は Vue.js コアチームの Anthony Fu (antfu) らが中心。

#slidev #presentation #markdown #vue

## 特徴

- **コード表示に強い**: シンタックスハイライトにShikiを使用し、精度の高いハイライトが得られる
- **ライブコーディング**: Monaco Editorをスライド内に埋め込み、実際にコードを編集・実行しながら発表できる
- **Vueコンポーネントの埋め込み**: スライド内に直接インタラクティブなデモを組み込める
- **テーマ機構**: テーマはnpmパッケージとして配布・切り替え可能
- **エクスポート**: PDF/PNG/PPTXへの書き出し、プレゼンの録画、プレゼンター用ノート表示に対応
- **ホットリロード**: 編集内容が即座にブラウザへ反映される

## 向いている用途

PowerPointやKeynoteのようなGUIツールと異なり、プレーンテキスト(Markdown)でスライドを書くためGitでの差分管理・レビューがしやすい。技術カンファレンスや社内LTなど、コードを多用する発表資料をGit管理下で素早く作りたい場合に向く。逆にデザイン重視の非エンジニア向け資料作成にはあまり向かない。

## 出典

- [Slidev 公式サイト](https://sli.dev/)
- [GitHub - slidevjs/slidev](https://github.com/slidevjs/slidev)
- [Why Slidev | Slidev](https://sli.dev/guide/why)
- [Slidev 101: Coding presentations with Markdown | Snyk](https://snyk.io/blog/slidev-101-coding-presentations-with-markdown/)
