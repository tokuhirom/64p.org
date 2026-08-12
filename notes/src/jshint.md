# JSHint

Anton Kovalyov氏が2011年に[[jslint|JSLint]]をフォークして作ったJavaScriptリンター。フォークの動機は「JSLintは不快なほどオピニオン化していた（uncomfortably opinionated）」というもので、JSLintが許さなかったルールのカスタマイズをコミュニティ主導で可能にした。 #javascript

## ライセンス問題の継承と解消

フォーク元のJSLint由来のコードに「Good, not Evil」条項（詳細は[[jslint|JSLint]]参照）が残っていたため、JSHintも長年Free Software Foundationから非フリー扱いされていた。2020年8月に該当コードをすべて置き換えて完全なMITライセンスとなり、問題が解消された。

## [[javascript-linters-formatters|JavaScriptのリンター・フォーマッター]]の中での位置づけ

JSリンター系譜の中間世代。[[jslint|JSLint]]の「設定不可」への反発から生まれたが、独自ルールの追加はできず、その制約への不満から[[eslint|ESLint]]が生まれた。「設定可能」（JSHint）から「プラガブル」（ESLint）への進化の途中段階といえる。

## 出典

- [JSHint - Wikipedia](https://en.wikipedia.org/wiki/JSHint)
- [JSLint - Wikipedia](https://en.wikipedia.org/wiki/JSLint)
