---
created: 2026-08-18 20:36
updated: 2026-08-18 21:51
---
# Darcs

正式には再帰頭字語で「Darcs Advanced Revision Control System」。David Roundyが開発した分散バージョン管理システムで、[[haskell|Haskell]]で実装されている（実装言語としてはやや珍しい選択だが移植性は高く、Haskellコミュニティの標準的なRCSとなっている）。開発陣は正確性の検証に力を入れており、Haskellの表現力の高い型システムで一部の性質を保証しつつ、QuickCheckによるランダム化テストで他の性質を検証している。

## パッチをファーストクラスの概念として扱う

Darcsはツリー（ファイルの状態）ではなく、**変更（パッチ）そのもの**を第一級のオブジェクトとして扱う。あるリポジトリの特定バージョンは、空のツリーに対するパッチの組み合わせに過ぎず、パッチの操作自体が中心的な関心事になる。

これは「パッチ代数（patch algebra）」という形式的な体系で記述されており、パッチ間の依存関係や、2つのパッチ集合（ブランチ）を正しくマージするために必要なパッチスタック上の基本操作を定義する。この代数の法則により、マージの結果は最終的に適用されたパッチの集合だけで決まり、適用順序には依存しないことが保証される。

## 歴史

2002年6月、David RoundyがGNU archの新しいパッチフォーマットを設計しようとした議論から発展。Arch自体へのコード反映には至らなかったが、この過程で「パッチの理論」が着想された。当初C++で試作された後、2002年秋にHaskell版が書かれ、2003年4月に公開された。

## 既知の弱点: 指数時間マージ問題

Darcs 1のマージアルゴリズムには、コンフリクトのサイズに対して計算時間が指数的に増大するケースがあり、わずか2行の変更をマージするのに数時間かかることもあった。

- 新しい理論により、パッチの可換・マージにおける最悪計算量が指数時間から多項式（二次）時間に改善された。
- Darcs 2.10では、指数時間マージを引き起こす状況を避ける`darcs rebase`機能が導入された。
- 根本的なパッチ理論の問題を完全に解決するには長い時間がかかる見込みだが、作業は継続している。以降のバージョンで発生頻度は大きく減少したものの、再帰的なコンフリクトのマージに失敗するバグは依然として残っている。

## 後継・関連ツールへの影響

[[pijul|Pijul]]は「Darcsのアイデアをよりソリッドにした後継」と位置づけられることが多いが、単純な書き直しではない。Pijulのパッチ理論はDarcsとは異なる数学的基盤に基づいており、上記の指数時間マージ問題を計算量のレベルで解消している。また[[jujutsu|Jujutsu]]も、コンフリクトをファーストクラスのオブジェクトとして扱うという設計思想の一部をDarcs/Pijul系統から取り入れているとされる。

## [[distributed-vcs-alternatives|Gitに代わる分散バージョン管理システム]]の中での位置づけ

コミットではなく「パッチ」を基本単位に据える独自系統の分散VCS。Git・Mercurial・Sapling・Jujutsuがいずれもツリー(ファイルの状態)を主軸に置くのに対し、Darcs/Pijulはパッチの可換性を理論的支柱とする点で異質な設計を取る。

#git #vcs

## 出典

- [Darcs - Wikipedia](https://en.wikipedia.org/wiki/Darcs)
- [Darcs - Frequently Asked Questions (Performance)](https://darcs.net/FAQ/Performance)
- [Darcs - Frequently Asked Questions (Conflicts)](https://darcs.net/FAQ/Conflicts)
- [Understanding Darcs/Patch theory and conflicts - Wikibooks](https://en.wikibooks.org/wiki/Understanding_Darcs/Patch_theory_and_conflicts)
- [Pijul Manual - Why Pijul](https://pijul.org/manual/why_pijul.html)
- [history_of_vcs/08_darcs.md](https://github.com/CuriousCurmudgeon/history_of_vcs/blob/master/08_darcs.md)
