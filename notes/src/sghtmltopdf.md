---
created: 2026-08-14 19:39
updated: 2026-08-14 19:51
---
# sghtmltopdf

Rust製のHTML-to-PDF変換ツール。[wkhtmltopdf](https://github.com/wkhtmltopdf/wkhtmltopdf)/[wicked_pdf](https://github.com/mileszs/wicked_pdf)の後継として個人開発者が開発している。 #rust #ruby

## 前身: wkhtmltopdf / wicked_pdf

wkhtmltopdfはQtWebKitベースのHTML-to-PDF変換ツールで、2023年にSSRF等のセキュリティ脆弱性と依存関係の陳腐化を理由にアーカイブされた。wicked_pdfはRailsのActionView DSLからwkhtmltopdfを呼び出すためのRuby gemラッパー。

## 実装

[[servo|Mozilla Servo]]プロジェクト由来のパーサー群をコンポーネントとして採用している。

- HTML解析: [[html5ever]]
- CSS解析: [[cssparser]]
- セレクタマッチング: selectorsクレート
- Ruby連携: magnus gem + FFI

## wkhtmltopdfからの改善点

- **CSS3対応**: wkhtmltopdfはCSS3対応が早期に止まっていたが、Flexbox・Grid・カスタムプロパティ・margin boxesに対応
- **改ページ処理**: 表のヘッダー行をページをまたいで繰り返し表示できる(wkhtmltopdfは非対応)
- **性能**: メモリ消費が大幅に削減され、2万行の表の描画が約2.4秒(wkhtmltopdfは14.6秒)
- **スケーラビリティ**: 大規模文書向けのストリーミング出力モード、Docker経由のHTTPサーバーデプロイに対応
- **セキュリティ**: リモートアセット読み込みをデフォルト無効化、RubygemsへのTrusted Publishingでの配布

Rails連携ではwicked_pdfと同様の構文を維持しつつ、ストリーミングやリモートサーバー方式(マイクロサービス構成向け)を追加している。

## 出典

- [wkhtmltopdf, wicked_pdf の思い出と、後継としての sghtmltopdf の開発 - waka's diary](https://waka.hatenablog.com/entry/2026/08/10/122338)
