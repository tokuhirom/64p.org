---
created: 2026-08-18 21:51
updated: 2026-08-18 21:51
---
# Haskell

純粋関数型プログラミング言語。ラムダ計算をベースに、参照透過性（同じ入力に対して常に同じ出力、副作用なし）・不変性・遅延評価（non-strict semantics）を特徴とする、多相的で静的型付けの言語。1990年代に学術コミュニティの標準化プロジェクトとして生まれ、現在は Haskell Foundation が中心となってエコシステムを整備している。言語名は論理学者[[currying|ハスケル・カリー(Haskell Curry)]]に由来する。

## 言語の特徴

- **純粋性** — 関数は副作用を持たず、IO・状態変更などの「作用」は[[monad|モナド]](`IO`モナド、`State`モナドなど)で明示的に型として表現される。
- **遅延評価** — 式は必要になるまで評価されない。無限リストなどが自然に書ける一方、空間リーク（サンクの蓄積によるメモリ肥大化）はハマりどころとしてよく挙げられる。
- **強い静的型付け + 型推論** — Hindley-Milner型推論をベースに、明示的な型注釈なしでも多くのコードが型付けされる。型クラス(`Monad`, `Functor`, `Applicative`など)による多相性がコアの抽象化機構で、実装は[[dictionary-passing|辞書渡し]]方式([[generics-implementation-strategies|ジェネリクス実装戦略]]の一つ)。
- **代数的データ型とパターンマッチ** — `data`宣言でデータ構造を定義し、パターンマッチで分解する。

## 処理系・ツールチェイン

- **GHC (Glasgow Haskell Compiler)** — 事実上唯一の主要実装。ネイティブコード生成のほかLLVMバックエンドも選択可能で、x86/AArch64/PowerPC/s390x/RISC-V/WASMをサポート。現行の安定版系列は9.6系で、GHC 9.14が2026年前半のリリースに向けてリリース候補段階にある。
- **Cabal** / **Stack** — パッケージ管理・ビルドツール。**Hackage**がパッケージリポジトリ、**Stackage**が動作確認済みパッケージセットのキュレーション。
- **GHCi** — 対話的REPL。

## 実用面

Webアプリ、CLIツール、コンパイラ・言語処理系など「正しさ」が重視される領域で採用例がある。分散VCSの[[darcs|Darcs]]もHaskellで実装されている。Haskell FoundationはSerokellと提携し、Haskell習熟度を標準化する認定プログラムも開始している。

#haskell #functional-programming

## 出典

- [Haskell Language 公式サイト](https://www.haskell.org/)
- [HaskellWiki: Introduction](https://www.haskell.org/haskellwiki/introduction)
- [What's Coming for Haskell in 2026](https://slicker.me/haskell/haskell-2026.html)
- [Glasgow Haskell Compiler 公式](https://www.haskell.org/ghc/)
- [GHC version support — haskell-language-server](https://haskell-language-server.readthedocs.io/en/latest/support/ghc-version-support.html)
