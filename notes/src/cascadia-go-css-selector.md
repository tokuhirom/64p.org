---
created: 2026-08-20 13:06
updated: 2026-08-20 13:31
---
# cascadia(GoのCSSセレクタライブラリ)

[andybalholm/cascadia](https://github.com/andybalholm/cascadia)は、GoでCSSセレクタを実装したライブラリ。`golang.org/x/net/html`パッケージが生成するHTMLパースツリー(DOM木)に対して、CSSセレクタでノードを検索できるようにする。

## 主なAPI

- `Query(n, m)` — nの子孫からセレクタ`m`にマッチする最初のノードを返す(マッチしなければ`nil`)
- `QueryAll(n, m)` — マッチする全ノードをスライスで返す
- Goのコードを書かずにCSSセレクタの動作を試せる、パッケージの薄いラッパーであるコマンドラインツール`cascadia`も同梱

Webスクレイピングやスクレイピング用途のHTML解析でCSSセレクタ的にノードを抜き出したいGoプログラムでよく使われる。jQueryライクなAPIを提供する[goquery](https://github.com/PuerkitoBio/goquery)が内部でこのパッケージを利用している。他の類似ライブラリとの比較は[[go-css-selector-libraries|GoのCSSセレクタ/HTMLパースライブラリ]]を参照。

## 「Cascadia」という名前の衝突

「Cascadia」という名前は他にも複数の全く無関係なプロジェクト・概念で使われており紛らわしい。

- [Cascadia Code](https://github.com/microsoft/cascadia-code) — Microsoftが開発した、Windows Terminal/Visual Studio向けのプログラミング用モノスペースフォント。104種類のリガチャを搭載。
- [Cascadia](https://en.wikipedia.org/wiki/Cascadia_(bioregion)) — 太平洋岸北西部(ワシントン州・オレゴン州・ブリティッシュコロンビア州など)を指す地理・生態学的なバイオリージョン概念。行政区分ではなく流域を基準に定義される。

いずれも由来は「Cascade Range(カスケード山脈)」を連想させる語感で、直接の関係はない。

## 出典

- [andybalholm/cascadia (GitHub)](https://github.com/andybalholm/cascadia)
- [cascadia package (pkg.go.dev)](https://pkg.go.dev/github.com/andybalholm/cascadia)
