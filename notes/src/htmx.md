---
created: 2026-08-12 19:37
updated: 2026-08-12 20:41
---
# htmx

HTMLの属性だけでAJAX・[[websocket|WebSocket]]・DOM更新を宣言的に扱えるようにするJavaScriptライブラリ。「モダンブラウザの機能に、JavaScriptを書かずHTMLから直接アクセスできるようにする」ことを掲げる。依存ライブラリなしの約2,500行のJSで、現行バージョンは2.x系。作者はCarson Gross。 #web #javascript

## 仕組み

`hx-get`/`hx-post`などのカスタム属性をHTML要素に書くと、イベント発火時にHTTPリクエストが飛び、**サーバーが返したHTMLフラグメントがDOMの指定箇所にスワップされる**。SPAのようにJSONを返してクライアント側でレンダリングするのではなく、サーバーがHTMLを返すのが根本的な違い。

```html
<button hx-post="/clicked" hx-trigger="click" hx-target="#parent-div">
  Click Me!
</button>
```

## 設計思想: ハイパーメディア駆動

Roy Fieldingの本来の[[restful|REST]]、特に[[hateoas|HATEOAS]](Hypertext As The Engine Of Application State)に沿った「ハイパーメディア駆動」アーキテクチャを標榜する。アプリケーションの状態遷移をクライアント側のJS状態管理ではなくハイパーテキスト(HTML)自体に担わせることで、元来のWebプログラミングモデルに留まったまま動的なUIを作れる、という主張。挙動がHTML要素の属性として書かれる「locality of behavior」も重視している。

作者らによる書籍[『Hypermedia Systems』](https://hypermedia.systems/)がこの思想を体系的に説明しており、日本語訳[『ハイパーメディアシステム──htmxとRESTによるシンプルで軽やかなウェブ開発』](https://www.amazon.co.jp/dp/4297149451?tag=tokuhirom-22)(技術評論社)も出ている。

## 限界・向いていないケース

作者Carson Gross自身がエッセイ「When Should You Use Hypermedia?」で適用範囲を整理している。

向いているのは、テキスト・画像主体でCRUD中心のUI。エッセイではSaaSのContexteがReactからhtmxへ移行してコードベースを67%削減した事例が挙げられている。逆に向いていないと明言されているのは:

- **複雑・動的な依存関係を持つUI** — 代表例はスプレッドシート。セル間の依存がユーザー入力で任意に生まれるようなUIは「サーバーがHTMLを返す」モデルに落とし込めない
- **オフライン動作** — レンダリングをサーバーに依存する構造上、オフラインファーストは現実的でない
- **高頻度なUI状態更新** — マウス移動追跡のような頻度ではサーバーラウンドトリップは実用にならない
- **Reactエコシステム前提のコンポーネントライブラリが必須の場合**

要するに「アプリの状態遷移がページ・部分HTMLの粒度で表現できるか」が分水嶺。

## 感想

肌感としては、「ちょっと動的なサイト」ぐらいまでならhtmxでいけるが、一般的なSPAで作るようなアプリケーションになると無理があると思っている。

## 歴史

前身は2013年にCarson Grossが作ったintercooler.js。jQuery依存だった同ライブラリを依存ゼロで書き直したものがhtmx。SPAフレームワークの複雑さへの反動もあって2020年代にSNSで広く知られるようになった。

サーバー側は何でもよい(HTMLを返せさえすればよい)ため、SSR中心のフレームワークとの相性がよく、[[topcoat|Topcoat]]のようにhtmx連携を組み込みで持つフレームワークもある。

## 出典

- [htmx公式ドキュメント](https://htmx.org/docs/)
- [When Should You Use Hypermedia? - htmx.org essays](https://htmx.org/essays/when-to-use-hypermedia/)
- [Htmx - Wikipedia](https://en.wikipedia.org/wiki/Htmx)
- [SE Radio 671: Carson Gross on HTMX](https://se-radio.net/2025/06/se-radio-671-carson-gross-on-htmx/)
- [Hypermedia Systems (書籍サイト)](https://hypermedia.systems/)
