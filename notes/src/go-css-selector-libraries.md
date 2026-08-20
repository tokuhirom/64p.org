---
created: 2026-08-20 13:31
updated: 2026-08-20 13:31
---
# GoのCSSセレクタ/HTMLパースライブラリ

Goで「HTMLをパースしてCSSセレクタでノードを抜き出す」ためのライブラリ群。標準ライブラリの`golang.org/x/net/html`(トークナイザ/パースツリー生成)を土台に、その上でCSSセレクタや使いやすいAPIを提供するライブラリがいくつも存在する。

## 主なライブラリ

- [[cascadia-go-css-selector|cascadia]]([andybalholm/cascadia](https://github.com/andybalholm/cascadia)) — CSSセレクタエンジンそのもの。単体で使うより、他ライブラリの内部実装として使われることが多い。
- [goquery](https://github.com/PuerkitoBio/goquery)([PuerkitoBio/goquery](https://github.com/PuerkitoBio/goquery)) — jQuery風のAPIを提供するHTMLパーサー。内部でcascadiaのセレクタエンジンを利用している。
- [colly](https://github.com/gocolly/colly)([gocolly/colly](https://github.com/gocolly/colly)) — CSSセレクタでのパースに加え、並列クロール・リクエスト制御まで含む、より高機能なスクレイピングフレームワーク。
- [htmlquery](https://github.com/antchfx/htmlquery)([antchfx/htmlquery](https://github.com/antchfx/htmlquery)) — CSSセレクタではなくXPathでHTMLをクエリする。CSSセレクタ以外の選択肢が欲しい場合の代替。
- [soup](https://github.com/anaskhan96/soup)([anaskhan96/soup](https://github.com/anaskhan96/soup)) — PythonのBeautifulSoupのAPI(`Find`/`FindAll`/`HTMLParse`など)を意図的に模したライブラリ。

## GitHub star数比較(2026-08-20時点、GitHub API調べ)

| ライブラリ | ⭐ Star | 🍴 Fork | 最終push |
|---|---|---|---|
| colly | 25,436 | 1,857 | 2026-08-14 |
| goquery | 14,974 | 935 | 2026-08-17 |
| soup | 2,278 | 171 | 2026-08-01 |
| htmlquery | 781 | 81 | 2026-07-02 |
| cascadia | 755 | 69 | 2026-06-03 |

collyがGo製HTMLスクレイピング系では最もstarを集めており、直近のpushも新しく活発。cascadiaは単体でのstar数こそ最小規模だが、goquery(15k star)が内部で依存しているため実際の利用は間接的にもっと広い。「単体ライブラリ」というより「上位ライブラリの基盤コンポーネント」という位置づけが数字にも表れている。cascadia自体は2026-06-03が最終pushで、機能追加より安定運用フェーズに見える。

## 他言語の同種ライブラリ(参考)

同じ「HTMLパースツリーをCSSセレクタ/XPathで検索する」役割を担う、各言語のデファクトスタンダード。

| 言語 | ライブラリ | ⭐ Star(2026-08-20時点) |
|---|---|---|
| JavaScript(Node.js) | [Cheerio](https://github.com/cheeriojs/cheerio) — jQuery風API | 30,455 |
| Java | [jsoup](https://github.com/jhy/jsoup) — CSSセレクタ・XPath両対応 | 11,386 |
| Ruby | [Nokogiri](https://github.com/sparklemotion/nokogiri) | 6,276 |
| Python | [BeautifulSoup](https://www.crummy.com/software/BeautifulSoup/) | (本家はcode.launchpad.net配布のためGitHub star数の比較対象外) |

cascadia/goquery/soup/Cheerioはいずれも「jQuery風のAPI」を志向している点が共通している。

## 出典

- [Beautiful Soup Alternatives for Go](https://www.glukhov.org/developer-tools/automation-testing/beautiful-soup-alternatives-for-go/)
- [Best HTML Parsers: The Top 7 Libraries in 2026](https://brightdata.com/blog/web-data/best-html-parsers)
- [HTML-parsing-libraries comparison](https://github.com/luminati-io/HTML-parsing-libraries)
- GitHub API(`gh api repos/<owner>/<repo>`)による直接取得
