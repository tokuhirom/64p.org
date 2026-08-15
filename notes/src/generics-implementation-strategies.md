---
created: 2026-08-15 21:28
updated: 2026-08-15 21:28
---
# ジェネリクスの実装方式

言語処理系がジェネリクス(総称型)をコンパイラ・ランタイムレベルでどう実現するかには、大きく分けて2つの極と、それらを折衷したハイブリッド方式がある。

- [[monomorphization|単態化(monomorphization)]] — 型ごとにコードを複製する方式。C++・Rustで採用。実行速度は速いがバイナリサイズが肥大化しやすい。
- [[dictionary-passing|辞書渡し(dictionary passing)]] — コードは1本にまとめ、型ごとの違いを実行時に「辞書」として渡す方式。Haskellの型クラスで採用。バイナリサイズは小さいが実行時オーバーヘッドがある。
- [[go-generics-gc-shape-stenciling|GoジェネリクスのGC Shape Stenciling]] — GCから見た型の形状(shape)が同じ型同士で機械語本体を共有しつつ、型固有の違いは辞書経由で渡すハイブリッド方式。Go 1.18で採用。

この3方式のトレードオフは、Russ Coxが2009年に「Generic Dilemma」として整理した「遅いプログラマ・肥大化したバイナリ・遅い実行時のどれを選ぶか」という問いに遡る(詳細は[[go-generics-gc-shape-stenciling|GoジェネリクスのGC Shape Stenciling]]を参照)。

#generics #compiler-design #moc
