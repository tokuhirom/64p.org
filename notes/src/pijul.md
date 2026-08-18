---
created: 2026-08-18 20:36
updated: 2026-08-18 20:36
---
# Pijul

Rustで実装された分散バージョン管理システム。GitやDarcsのようなワークフローを模倣できるが、両者と異なり「数学的に健全なパッチ理論（sound theory of patches）」に基づいて設計されている点が特徴。

## コミット単位ではなく「パッチ」が基本単位

Gitが各コミット時点での**ファイルの状態**を追跡するのに対し、Pijulは**変更（パッチ）そのもの**を基本単位として追跡する。パッチは独立した可換（commutative）オブジェクトとして設計されており、適用する順序が結果に影響しない。この可換性によって、コンフリクト解消・バグ修正・cherry-pick・rebaseといった操作を、パッチの「適用（apply）」と「取り消し（unapply）」という共通の2コマンドだけで一貫して扱えるとされる。

理論的な基盤はSamuel MimramとCinzia di Giustoによる「パッチの理論」（バージョン管理を圏論的な pushout として捉える理論）に、リポジトリを効率的に表現するためのアルゴリズム的工夫を加えたもの。

## [[darcs|Darcs]]との関係

Pijulは「Darcsのアイデアをよりソリッドにした後継」と位置づけられることが多いが、Darcsの単純な書き直しではない。パッチ理論そのものが異なり、アルゴリズムの計算量も異なる。

- Darcsのパッチ理論は「パッチ」を中心に、可換(commutation)と反転(inversion)という2つの基本操作で構成される。
- Pijulの理論はパッチに加えてファイルも中心概念に据え、パッチ同士の「マージ」操作を持つ。
- Darcsには、コンフリクトのマージ処理が指数時間かかってしまうケースがあるという既知の弱点があった。Pijulはこの点を改善し、速度面でも指数的に高速、さらにブランチのサポートも備える。

## コンフリクトの扱い

コンフリクトを内部表現として明示的に持ち、その振る舞いを理論的に裏付けた上で、高速なデータ構造で処理する設計になっている。この点は[[jujutsu|Jujutsu]]が「コンフリクトをファーストクラスのオブジェクトとして扱う」と説明していた設計とも通じる。

## [[distributed-vcs-alternatives|Gitに代わる分散バージョン管理システム]]の中での位置づけ

コミットではなく「パッチ」を基本単位に据える独自系統の分散VCSで、[[darcs|Darcs]]の後継にあたる。Git・Mercurial・Sapling・Jujutsuがいずれもツリー(ファイルの状態)を主軸に置くのに対し、Darcs/Pijulはパッチの可換性を理論的支柱とする点で異質な設計を取る。[[jujutsu|Jujutsu]]はコンフリクトのファーストクラス化という発想の一部をこの系統から取り入れているとされる。

#git #vcs

## 出典

- [Pijul — A Distributed Version Control System](https://pijul.org/)
- [Pijul - Model](https://pijul.org/model/)
- [Pijul — FAQ](https://pijul.org/faq)
- [Pijul - The Mathematically Sound Version Control System Written in Rust](https://initialcommit.com/blog/pijul-version-control-system)
- [Part 2: Merging, patches, and pijul](https://jneem.github.io/pijul/)
