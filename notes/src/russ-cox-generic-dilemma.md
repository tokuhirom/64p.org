---
created: 2026-08-15 21:56
updated: 2026-08-15 21:56
---
# The Generic Dilemma(Russ Cox, 2009)

Goの開発者の一人であるRuss Coxが2009年に書いたブログ記事「[The Generic Dilemma](https://research.swtch.com/generic)」で提示した、汎用データ構造(generics)を言語処理系に実装する際の根本的なトレードオフ。当時のGoにはまだジェネリクスがなく、後年[[go-generics-gc-shape-stenciling|GoジェネリクスのGC Shape Stenciling]]が採用されるまでの約13年間、Go開発チームの設計判断の背景として繰り返し参照されることになった。

## 3つのアプローチ

Coxは既存言語が採ってきた3つのアプローチをそれぞれ欠点付きで整理した。

- **Cのアプローチ(ジェネリクスなし)**: 言語自体に複雑性を加えない代わりに、プログラマが型ごとにコードを書き直す・`void*`とキャストで済ませるなどの手間を強いられる。
- **C++のアプローチ(コンパイル時特殊化)**: [[monomorphization|単態化]]によって型ごとにコードを複製する。冗長なコード生成によりコンパイルが遅くなり、良いリンカによる重複排除がなければバイナリも肥大化する。命令キャッシュの効率低下という実行時の副作用もある。
- **Javaのアプローチ(暗黙のボクシング)**: [[java-generics-type-erasure|型消去(erasure)]]とボクシング/アンボクシングにより、実行時間が遅くなる。

## 結論: 三択のジレンマ

Coxはこれを一文に凝縮した。

> do you want slow programmers, slow compilers and bloated binaries, or slow execution times?
> (遅いプログラマ、遅いコンパイラと肥大化したバイナリ、遅い実行時のどれが欲しいのか)

記事はこの3つの悪い結果すべてを回避する実装方式があるのかを読者に問いかける形で締めくくられており、当時は明確な解答を提示していない。Go 1.18で採用された[[go-generics-gc-shape-stenciling|GC Shape Stenciling]]は、[[monomorphization|単態化]]と[[dictionary-passing|辞書渡し]]を折衷することでこのジレンマを部分的に回避しようとする試みとして位置づけられる。

## [[generics-implementation-strategies|ジェネリクスの実装方式]]の中での位置づけ

[[monomorphization|単態化]]・[[dictionary-passing|辞書渡し]]という2つの実装方式のトレードオフを最初に言語化した、議論の出発点となる記事。

## 出典

- [The Generic Dilemma - research!rsc](https://research.swtch.com/generic)

#golang #generics #compiler-design
