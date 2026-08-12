# JSLint

Douglas Crockford氏（JSONの考案者として知られる）が2002年に公開した、JavaScript向け静的解析ツール。最初期のJavaScriptリンターとされる。jslint.comのWebアプリケーションとして提供されたのが始まり。 #javascript

## 設定不可というオピニオン型設計

後発のリンターと違い、意図的に設定変更をほぼ許さない設計だった。Crockford氏の考える「正しいJavaScript」を強制するツールであり、この柔軟性のなさへの不満が[[jshint|JSHint]]のフォーク（2011年）、さらにカスタムルールを書けない制約への不満が[[eslint|ESLint]]の誕生（2013年）につながった。

## "Good, not Evil" ライセンス条項

ライセンスはMITベースだが「The Software shall be used for Good, not Evil.（本ソフトウェアは善のために使われるべきであり、悪のために使われてはならない）」という条項が追加されていた。この道徳的制約のためFree Software Foundationからは非フリーなライセンスと分類され、Google CodeでのホスティングやDebianリポジトリへの収録ができないという実害があった。

2011年にはIBMが「顧客がこの制約なしにJSLintを使えるようにしてほしい」と問い合わせ、Crockford氏が「IBMとその顧客・パートナー・手下（minions）がJSLintを悪のために使うことを許可する」と返答した逸話がある。2021年にUnlicense（FSF/OSI承認済み）へ移行し、長年のライセンス問題は解消された。

## [[javascript-linters-formatters|JavaScriptのリンター・フォーマッター]]の中での位置づけ

JSリンターの系譜の始祖。JSLint → [[jshint|JSHint]] → [[eslint|ESLint]]という流れの起点。

## 出典

- [JSLint - Wikipedia](https://en.wikipedia.org/wiki/JSLint)
- [JSHint - Wikipedia](https://en.wikipedia.org/wiki/JSHint)
