---
created: 2026-08-09 23:30
updated: 2026-08-11 08:02
---
# TDD (Test-Driven Development / テスト駆動開発)

#software-engineering #testing

1990年代後半、Kent Beckが[[extreme-programming|Extreme Programming]]の一部として考案した開発手法。2003年の著書『Test-Driven Development: By Example』で体系化された。

## Kent Beck自身による「Canon TDD」(2023年12月, 原典の再定義)

Kent Beckは2023年、自身のニュースレター「Tidy First?」に[「Canon TDD」](https://newsletter.kentbeck.com/p/canon-tdd)という記事を書いた。理由は「TDDではないものを批判する人があまりに多いから」("If you're going to critique something, critique the actual thing" — 批判するなら本物を批判せよ)。全員がこう書くべきという処方箋ではなく、TDDが実際に何であるかを定義し直した文章。

Beckが示す**カノニカルな5ステップ**:

1. **Test List**: 実装の詳細には触れず、対応すべき振る舞いのバリエーション・エッジケースを一覧化する
2. **Write One Test**: リストから1つだけ選び、setup・invocation・assertionを備えた具体的で実行可能なテストを1つ書く（インターフェース設計の意思決定はここで発生する）
3. **Make It Pass**: そのテストと、これまでの全テストが通るようにコードを変更する。途中で見つかった新しいケースはリストに追加する
4. **Optionally Refactor**: テストが通っている状態で、任意で実装の設計を改善する
5. **Repeat**: リストが空になるまで2〜4を繰り返す

ゴールは「今まで動いていたものは動き続ける。新しい振る舞いは期待通り動く。システムは次の変更に備えられた状態になる」こと。

## Martin Fowlerによる整理(bliki)

3ステップの**Red-Green-Refactor**として説明される。「①次に追加したい機能のテストを書く → ②テストが通るまで実装コードを書く → ③新旧コード両方をリファクタリングして構造を整える」。効用は2つ。

- テストが先にあるので必然的にSelfTestingCode(自己テスト可能なコード)になる
- テストを先に設計することで、インターフェースと実装の分離を強制される(良い設計の要素)

Fowlerが挙げる典型的な失敗は「リファクタリングのステップを省略すること」。省くとテストはあってもコードは汚いままの断片の寄せ集めになる。

## t-wada(和田卓人)氏によるCanon TDDの日本語訳・解説

t-wada氏はBeckの"Canon TDD"を翻訳し、[「【翻訳】テスト駆動開発の定義」](https://t-wada.hatenablog.jp/entry/canon-tdd-by-kent-beck)として自身のブログで公開した。その中で強調しているのが**「意味の希釈(semantic diffusion)」**によってTDDの意味が曖昧になってしまった、という指摘。「テストを先に書くこと」「事前にたくさんテストを書いておくこと」という理解は誤解であり、TDDは**「明確な開始条件と終了条件を持つプログラミングのワークフロー」**であるとしている。

さらにt-wada氏は3つの近接概念を明確に区別する。

| 概念 | 内容 |
|---|---|
| 自動テスト (Automated Testing) | テストコードを書くこと(タイミングは問わない) |
| テストファーストプログラミング (Test-First) | 実装前にテストを書くこと |
| テスト駆動開発 (TDD) | 意図的な設計分析を含む、上記5ステップ全体のワークフロー |

t-wada氏は、世間で語られる「TDDのメリット」の多くは実は「自動テスト」そのものの効能であり、TDD固有の効能ではない、と指摘している点が重要。

## [[architecture-decision-record]]との関係

[[sakpilot]]ではE2Eテスト戦略がADR(`docs/adr/0001-e2e-testing-strategy.md`)として記録されている例がある。TDD自体はADRとは独立した実装ワークフローの話だが、テスト戦略の意思決定をADRとして残す、という運用は両者を組み合わせた例と言える。

## 出典

- [Canon TDD - by Kent Beck (newsletter.kentbeck.com)](https://newsletter.kentbeck.com/p/canon-tdd)
- [Test Driven Development - Martin Fowler's bliki](https://www.martinfowler.com/bliki/TestDrivenDevelopment.html)
- [【翻訳】テスト駆動開発の定義 - t-wadaのブログ](https://t-wada.hatenablog.jp/entry/canon-tdd-by-kent-beck)
- [Notes on "Test-Driven Development by Example" by Kent Beck](https://stanislaw.github.io/2016-01-25-notes-on-test-driven-development-by-example-by-kent-beck.html)
