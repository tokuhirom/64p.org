---
created: 2026-08-15 21:26
updated: 2026-08-15 21:26
---
# SpiderMonkeyのJITティア(IonMonkey/WarpMonkey)

[[spidermonkey|SpiderMonkey]]が搭載してきたJavaScript JITコンパイラの世代。TraceMonkey・JägerMonkey・IonMonkey・WarpMonkeyと複数世代にわたって置き換えられてきており、現行の最上位ティアがWarpMonkey。

## 世代の変遷

初期のTraceMonky・JägerMonkeyを経て、次世代の全メソッドJITとして**IonMonkey**が導入された。IonMonkeyはSSA形式の中間表現を持つwhole-method JITで、型特殊化(type specialization)を行う。バイトコードとInline Cacheのデータを Ion MIR (Mid-level Intermediate Representation) に変換し、最適化を経てIon LIR (Low-level Intermediate Representation) へ下げ、レジスタ割り当てを行った上でネイティブコードを生成する、というパイプライン構造を持つ。

## WarpMonkeyへの移行(Firefox 83)

**Warp**（コードベース上の名称はWarpMonkeyで、旧IonMonkeyを置き換えた）は2020年11月リリースのFirefox 83で導入された。従来のIonBuilderは「Type Inference (TI)」と呼ばれるグローバルな型推論システムに依存していたが、Warpはこれをやめ、Baseline InterpreterとBaseline JITが実行時に収集する**CacheIR**のデータのみに基づいて最適化するようになった。これにより複雑な全域型推論システムが不要になり、全JITティア間で一貫した最適化情報を共有できるようになった。

新たに導入された最適化として**Trial Inlining**があり、呼び出し元ごとに関数を特殊化してインライン化する。この最適化は再帰的に適用でき、複数の呼び出し元からの呼び出しに対しても最適なコード生成が可能。

## 効果

Mozilla発表の数値として:

- Google Docsの読み込み時間が20%高速化
- Speedometerベンチマークで10〜12%の改善
- メモリ使用量が8%削減
- ガベージコレクションのスイープ時間が大幅短縮

これらはオフスレッド処理の増加と再コンパイル回数の減少によって実現したとされている。

#javascript #jit #compiler #firefox

## 出典

- [Warp: Improved JS performance in Firefox 83 – Mozilla Hacks](https://hacks.mozilla.org/2020/11/warp-improved-js-performance-in-firefox-83/)
- [IonMonkey - MozillaWiki](https://wiki.mozilla.org/IonMonkey)
- [IonMonkey - Wikipedia](https://en.wikipedia.org/wiki/IonMonkey)
