---
created: 2026-08-15 21:31
updated: 2026-08-15 21:31
---
# Generic Go to Go(論文, 2022)

Stephen Ellis・Shuofei Zhu・Nobuko Yoshida・Linhai Songによる論文「Generic Go to Go: Dictionary-Passing, Monomorphisation, and Hybrid」。OOPSLA 2022で発表され、Proceedings of the ACM on Programming Languagesに掲載された。Go 1.18が実際に採用した[[go-generics-gc-shape-stenciling|GC Shape Stenciling(ハイブリッド方式)]]を、[[dictionary-passing|辞書渡し]]・[[monomorphization|単態化]]という2つの純粋な方式と並べて実測・比較分析した論文。

## 検証内容

5種類の異なる翻訳系(コンパイル方式)を比較ベンチマークした。

- Go 1.18本体(ハイブリッド方式、[[go-generics-gc-shape-stenciling|GC Shape Stenciling]])
- 既存の[[monomorphization|単態化]]実装2種
- 論文が独自に提案する辞書渡し翻訳
- erasure(型消去)による翻訳

## Go 1.18のハイブリッド方式に対する指摘

論文はGo 1.18の実装([[go-generics-gc-shape-stenciling|GC Shape Stenciling]])を「[[monomorphization|単態化]]とコールグラフに基づく[[dictionary-passing|辞書渡し]]の組み合わせ」と分析した上で、以下の課題を指摘した。

- コードの肥大化
- コンパイル速度の低下
- 対応できる言語機能のカバレッジが限定的であること

## 提案と成果

これらの課題に対し、論文は独自の「呼び出し地点ベース(call-site based)の辞書渡し翻訳」を提案し、その正当性を新規に考案した一般的なbisimulation up to技法によって証明した。この提案により、Go 1.18の表現力の制限を克服しつつ、コンパイル時間の短縮とコードサイズの削減を両立できる可能性を示した。

なお[[go-generics-gc-shape-stenciling|GoジェネリクスのGC Shape Stenciling]]のノートで触れた「命令数がGo 1.18とほぼ同等(703 vs 674)」「型ネストが深いケースで純粋単態化だとバイナリが6.3MBに膨らむ」といった実測値は、この論文のベンチマーク結果に基づく。

## [[generics-implementation-strategies|ジェネリクスの実装方式]]の中での位置づけ

[[monomorphization|単態化]]・[[dictionary-passing|辞書渡し]]・[[go-generics-gc-shape-stenciling|ハイブリッド方式]]の3方式を実測ベースで横並び比較した、実証研究にあたるノート。

## 出典

- [Generic Go to Go: Dictionary-Passing, Monomorphisation, and Hybrid (arXiv:2208.06810)](https://arxiv.org/abs/2208.06810)
- [Generic go to go | PACMPL (ACM Digital Library)](https://dl.acm.org/doi/abs/10.1145/3563331)

#golang #generics #compiler-design
