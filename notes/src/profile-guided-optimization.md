---
created: 2026-08-11 22:44
updated: 2026-08-11 22:44
---
# Profile-Guided Optimization (PGO)

コンパイラが静的なヒューリスティックだけに頼るのではなく、実行時に採取したプロファイルデータを最適化判断の材料に使う手法。分岐予測、インライン化、ループ展開、コードレイアウト(基本ブロックの配置)などの判断を、実際の実行挙動に基づいて行えるようになる。

## 基本的な流れ

1. プロファイル収集用にコンパイルする(GCCなら`-fprofile-generate`、LLVM/Clangなら`-fprofile-instr-generate`)
2. 代表的なワークロードでプログラムを実行し、プロファイルデータを採取する
3. 採取したプロファイルを使って再ビルドする(`-fprofile-use`/`-fprofile-instr-use`)

## プロファイル収集方式

- **計装(instrumentation)ベース**: コンパイラが分岐・呼び出し・switch-caseの各エッジにカウンタを挿入し、実行時にその頻度を記録する。GCCは終了時に`.gcda`ファイルへ出力する。正確だが、計装自体にオーバーヘッドがある。
- **サンプリングベース(SamplePGO/AutoFDO)**: [[linux-perf|perf_events]]のような既存のハードウェアパフォーマンスカウンタを使い、外部プロファイラでサンプリングする方式。計装なしで低オーバーヘッドにプロファイルを取れる。

## 実装例

GCC・LLVM/Clangのほか、rustc、Go(1.20以降)などの主要コンパイラ/ツールチェーンがPGOをサポートしている。

## 効果の実例(Go, JSON パーサーのベンチマーク)

Daniel LemireがGoのPGOをJSONパーサーで検証した記事では、3種類のJSONファイルを使ったベンチマークで以下のような結果が報告されている。

- 最良ケースで4.7%の高速化(`canada.json`のプロファイルを`canada.json`自身のベンチマークに使った場合)
- 一般的には2〜3%程度の改善
- 興味深い点として、プロファイルの取り方によって「汎化」のしやすさが異なる。`twitter.json`のプロファイルは他のファイルに対しても2.8〜3.1%の改善をもたらした一方、`canada.json`のプロファイルは自分自身にしか効かなかった

これは、PGOが「代表的な入力でプロファイルを取れば自動的に速くなる」という単純な話ではなく、プロファイルの取り方(どの入力を使うか)次第で最適化が特定のワークロードに過学習しうる、という実務上の注意点を示している。

#performance #compiler #profiling

## 出典

- [Profile-guided optimization in Go - Daniel Lemire's blog](https://lemire.me/blog/2026/08/09/profile-guided-optimization-in-go/)
- [Proposal: profile-guided optimization - Go](https://go.googlesource.com/proposal/+/master/design/55022-pgo.md)
- [How To Build Clang and LLVM with Profile-Guided Optimizations - LLVM](https://llvm.org/docs/HowToBuildWithPGO.html)
- [Profile-guided Optimization - The rustc book](https://doc.rust-lang.org/rustc/profile-guided-optimization.html)
