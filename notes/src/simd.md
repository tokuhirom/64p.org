---
created: 2026-08-09 22:22
updated: 2026-08-20 11:03
---
# SIMD

Single Instruction, Multiple Data の略。1つの命令で複数のデータ要素に対して同時に同じ演算を行う並列処理方式。 #simd

## 仕組み

通常のスカラー演算は「1命令で1データ」を処理するのに対し、SIMDは専用のベクトルレジスタを使い、まとめて複数データを処理する。例えば256bitのベクトルレジスタなら、32bit浮動小数点数8個や16bit整数16個を一度に格納・演算できる。

## 効果的なケース

同じ演算を独立した複数のデータ要素に繰り返し適用する処理（"embarrassingly parallel"なデータ並列性）で効果を発揮する。1命令で複数データを同時処理する原理上、この形に当てはまるほど性能が伸びる。

- 数値計算・行列演算(線形代数の要素ごとの演算)
- 画像・音声・信号処理(ピクセル単位のフィルタ処理など)。信号処理では8〜16倍程度のスピードアップが報告されている
- 機械学習の内積・畳み込みなどのテンソル演算
- コンパイラの自動ベクトル化(auto-vectorization)が効くのも、単純なカウントループ(`for (i=0; i<n; i++) a[i] = ...`)のような形に限られる

## 効果が出にくいケース

以下のような条件があると、コンパイラは自動ベクトル化を諦めて（安全側に倒して）スカラーコードのままにすることが多い。

- **ループ内データ依存**: `i+1`番目の計算が`i`番目の結果に依存する場合(漸化式、prefix sumなど)。いわゆるloop-carried dependencyがあるとベクトル化できない
- **データ依存の分岐**: 要素ごとに異なる処理経路を取る条件分岐。SIMDは「同じ命令列を全レーンに適用する」前提のため、分岐があると素直にはベクトル化できない(マスク処理で回避できる場合はある)
- **ポインタ経由の間接アクセス・エイリアシング**: 配列が重複している可能性があるとコンパイラは安全側に倒す(C/C++では`__restrict__`で解消できる場合がある)
- **不規則なメモリアクセス**: 連続アクセス(`a[i]`)でなく間接インデックス(`a[idx[i]]`)のような場合は効果が薄い。アンアラインアクセスも性能低下の要因になる
- ループ内に関数呼び出しが多い場合も自動ベクトル化は失敗しがちで、手動でのSIMD命令記述(intrinsics)が必要になることが多い

## 主な実装

- x86: SSE (Streaming SIMD Extensions) / AVX
- ARM: NEON

[[apache-arrow|Apache Arrow]]は連続したメモリレイアウトのカラムナーフォーマットのため、SIMDによるベクトル化演算と相性が良い。また[[project-panama|Project Panama]]のVector APIは、SIMD命令を活用したベクトル演算をJavaから扱うためのAPI。

## 出典

- [Single Instruction, Multiple Data (SIMD) in .NET | Medium](https://antao-almada.medium.com/single-instruction-multiple-data-simd-in-net-393b8cf9a90)
- [SIMD: Definition, Techniques & Examples | StudySmarter](https://www.studysmarter.co.uk/explanations/computer-science/computer-organisation-and-architecture/simd/)
- [What Is Single Instruction, Multiple Data (SIMD)? | ITU Online](https://www.ituonline.com/tech-definitions/what-is-single-instruction-multiple-data-simd/)
- [Auto-Vectorization and SPMD - Algorithmica](https://en.algorithmica.org/hpc/simd/auto-vectorization/)
- [Exploiting Data Level Parallelism – Computer Architecture](https://www.cs.umd.edu/~meesh/411/CA-online/chapter/exploiting-data-level-parallelism/index.html)
- [Retrofitting Control Flow Graphs in LLVM IR for Auto Vectorization](https://arxiv.org/pdf/2510.04890)
