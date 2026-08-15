---
created: 2026-08-15 21:31
updated: 2026-08-15 21:31
---
# Featherweight Go(論文, 2020)

Robert Griesemer(Go言語の共同開発者)・Raymond Hu・Wen Kokke・Julien Lange・Ian Lance Taylor・Bernardo Toninho・Philip Wadler・Nobuko Yoshidaによる論文。OOPSLA 2020(SPLASH 2020内)で発表され、Proceedings of the ACM on Programming Languages (PACMPL) Vol. 4, OOPSLA号に掲載された。Featherweight Javaに着想を得て、Goへジェネリクスを追加する設計を形式的に定義し、その健全性を証明した。

[[go-generics-gc-shape-stenciling|GoジェネリクスのGC Shape Stenciling]]が実装として採用される2年前に、その理論的な裏付けを与えた論文にあたる。

## FGとFGG

論文は2段階のミニ言語を定義する。

- **FG(Featherweight Go)**: 構造体・インターフェース・メソッドを持つGoの中核部分だけを取り出した最小限の形式モデル。ジェネリクスは含まない。
- **FGG(Featherweight Generic Go)**: FGに型パラメータ(ジェネリクス)を追加した拡張モデル。

論文はFGGのプログラムを[[monomorphization|単態化]]によってFGへ変換するコンパイル手法を定義し、この変換が型安全性を保つこと(健全性: well-typedなFGGプログラムが単態化後も型エラーを起こさないこと)を形式的に証明した。

## Featherweight Javaとの対比

Featherweight Javaが基礎とするJavaの型システムはnominal typing(名前による部分型付け。`implements`などで明示的に宣言された関係のみ部分型と認める)であり、ジェネリクスはerasure(型消去。実行時に型パラメータの情報が失われる)で実装される。対してGoの型システムはstructural typing(構造的部分型付け。必要なメソッド群を満たしていれば暗黙にインターフェースを実装したことになる)であり、この論文はそれに[[monomorphization|単態化]]によるジェネリクスを組み合わせた場合の形式的性質を扱っている。

## 意義

単態化は実務上(C++・Rustなど)広く使われてきた実装方式だが、この論文は「構造的部分型付けを持つ言語に対して単態化が型安全に機能する」ことを厳密に形式化・証明した最初期の仕事の一つとされる。Go 1.18のジェネリクス実装([[go-generics-gc-shape-stenciling|GC Shape Stenciling]])が単態化を実装の一部として採用する上での理論的裏付けとなった。

## [[generics-implementation-strategies|ジェネリクスの実装方式]]の中での位置づけ

[[go-generics-gc-shape-stenciling|GoジェネリクスのGC Shape Stenciling]]が使う[[monomorphization|単態化]]パートの型安全性を、実装に先立って形式的に保証した理論的基礎。

## 出典

- [Featherweight Go (arXiv:2005.11710)](https://arxiv.org/abs/2005.11710)
- [Featherweight go | PACMPL (ACM Digital Library)](https://dl.acm.org/doi/10.1145/3428217)

#golang #generics #compiler-design #type-theory
