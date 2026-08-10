---
created: 2026-08-10 15:29
updated: 2026-08-10 16:34
---
# Currying(カリー化)

複数の引数を受け取る関数を、「1つの引数を受け取って関数を返す関数」の連鎖に変換する手法。例えば`add(1, 2)`のように2つの引数を一度に受け取る関数を、`add(1)(2)`のように引数を1つずつ渡していく形に変換すること。

## 定義

複数の引数をとる関数を、「もとの関数の最初の引数」を受け取り、戻り値として「もとの関数の残りの引数を取って結果を返す関数」を返すような関数に変換すること。

## 由来

論理学者ハスケル・カリー(Haskell Curry)にちなんでクリストファー・ストレイチーが命名したが、実際に考案したのはMoses SchönfinkelとGottlob Frege。

## 用途

Haskell、[[scala3|Scala]]、JavaScriptなど関数型プログラミングの文脈でよく使われる技法で、部分適用(一部の引数だけ先に渡して新しい関数を作ること)と組み合わせて使われることが多い。

#functional-programming

## 出典

- [カリー化 - Wikipedia](https://ja.wikipedia.org/wiki/%E3%82%AB%E3%83%AA%E3%83%BC%E5%8C%96)
- [プログラミング/カリー化 - Wikibooks](https://ja.wikibooks.org/wiki/%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0/%E3%82%AB%E3%83%AA%E3%83%BC%E5%8C%96)
- [カリー化と部分適用 - Zenn](https://zenn.dev/luma/articles/introduction-currying-and-partial-apply)
- [カリー化 - JavaScript.info](https://ja.javascript.info/currying-partials)
