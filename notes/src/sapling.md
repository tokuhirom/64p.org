---
created: 2026-08-18 16:44
updated: 2026-08-18 20:32
---
# Sapling

CLIコマンド名は`sl`。Metaが開発・社内利用しているソース管理システム。使いやすさとスケーラビリティを重視して設計されている。CLIはもともと[[mercurial|Mercurial]]をベースにしており、UIや機能の多くをMercurialから継承している。

## 背景

Metaのmonorepoをエンジニアリング組織の成長に耐えられるようスケールさせるための取り組みとして10年ほど前に開始され、その後Git互換の独自VCSとして育てられてきた。クライアント部分は2022年にOSS公開された。

## 主な特徴

- **スタック型コミット（stacked commits）** — コミットを積み上げていくワークフローが基本。途中のコミットを`amend`すると、その上に積まれた子コミット群を自動的にrestack（追従）してくれる。
- **Smartlog / Interactive Smartlog (ISL)** — リポジトリ内のコミットをツリー表示するコマンド・Web UI。PRやブックマークの情報も併記され、ドラッグ&ドロップでrebaseできるなどブラウザベースの操作が可能。
- Git/[[mercurial|Mercurial]]ユーザーにとって基本概念はなじみやすく、コミットスタックの操作や誤操作からの復旧が大幅に簡単になっているとされる。
- Meta社内では専用サーバーと仮想ファイルシステムを組み合わせ、数千万規模のファイル・コミット・ブランチを持つリポジトリまでスケールする設計だが、その高度な機能を支えるサーバー側は現時点では一般公開されていない。

## 現状

外部での採用はMetaの外ではあまり広がっていない、という指摘がある。クライアント自体はOSSだが、スケーラビリティを支える高度な機能の多くが非公開の専用サーバーに依存しているため、社外の開発者にとっての実用性は限定的という評価がある。

## [[distributed-vcs-alternatives|Gitに代わる分散バージョン管理システム]]の中での位置づけ

Gitのデータモデルをそのまま使いつつUI/UXだけを作り直す「Git互換レイヤー系」の一つ。スタック型ワークフロー・履歴書き換えの容易さを志向する点で[[jujutsu|Jujutsu]]と目的意識が近いが、SaplingはMercurial由来のCLI・ワークフローを直接引き継いでいる点が異なる。diffビューアの[[hunk-cli|hunk]]もGit/Jujutsu/Saplingの3つに対応しており、Sapling環境では自動検出してネイティブのrevsetを使う機能を持つ。

#git #vcs

## 出典

- [GitHub - facebook/sapling](https://github.com/facebook/sapling)
- [Sapling SCM | Sapling](https://sapling-scm.com/docs/introduction/)
- [Sapling: Source control that's user-friendly and scalable | Meta Engineering](https://engineering.fb.com/2022/11/15/open-source/sapling-source-control-scalable/)
- [Interactive smartlog (ISL) | Sapling](https://sapling-scm.com/docs/addons/isl/)
- [Is Meta's Sapling the Future of Version Control? | Medium](https://medium.com/@benneighbour/is-metas-sapling-the-future-of-vcs-3d106fcebce0)
