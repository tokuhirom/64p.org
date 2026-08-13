---
created: 2026-08-09 13:26
updated: 2026-08-13 15:04
---

# Raku / Rakudo / Perl 6

#raku #rust #perl

## 概要と関係性

- **Perl 6**: 2000年にLarry Wallが発表した、Perl 5を置き換える新言語の開発コードネーム。
- **Raku**: Perl 6の現在の正式名称。2019年10月に改名された。
- **Rakudo**: Rakuの主要実装（コンパイラ）。「Raku」という名称自体もRakudoに由来する（後述）。

つまり「Raku」＝言語仕様の名前、「Rakudo」＝それを実装したコンパイラ、という関係。

## 歴史

- 2000年7月19日、Larry Wallが「State of the Onion 2000」で、Perlの「historical warts（歴史的なイボ）」を取り除く新言語構想を発表。「easy things should stay easy, hard things should get easier」を方針に掲げた。
- コミュニティから361件のRFC（Request for Comments）を募り、それをもとに設計文書「Apocalypses」を作成するという開発プロセスを取った。
- 2015年12月25日（クリスマス）、Perl 6 v1.0（通称「6.c / Christmas」）がリリース。
- Perl 6はPerl 5との後方互換性を目指さず、「fix the language rather than fix the user」という思想で言語仕様を根本から作り直した。この設計思想の違いから両者は事実上の別言語となり、2019年10月に「Perl 6」から「Raku」への改名が正式決定された（Larry Wall本人も承認）。
  - 「Raku」という名前は、実装であるRakudoに由来し、Rakudoは日本語の「駱駝道（らくだどう、Way of the Camel）」の短縮形。camelはPerlのマスコット（ラクダ本 = Camel Book）にちなむ。

## Rakudoとその実装コンポーネント

- **Rakudo**は現在Rakuの唯一のアクティブな実装。GitHub: `rakudo/rakudo`。
- **MoarVM**（Metamodel On A Runtime）: Rakudo向けに開発された専用VM。JITコンパイルや型特化などの最適化を持つ、レジスタベースのバイトコードインタプリタ。現在ほとんどのRakuユーザーがこのバックエンドを使用。
- **NQP**（Not Quite Perl 6）: RakudoとMoarVMの間の中間言語・コンパイラツールチェーン。Rakudo自体もNQPを使って実装されている（自己ホスト的な構造）。
- 他にJVM、JavaScriptバックエンドも存在するが、MoarVMが主流。

## 言語機能の特徴

- **Gradual typing**: 動的型付けをベースに、任意で静的型注釈を追加できる。
- **Grammar（文法）**: Perlの正規表現を拡張した「rules」により、PEGやANTLR相当のパーサーを言語内蔵で書ける。エンジンの実装方式は[[regex-engine-backtracking-vs-nfa|バックトラッキング型とNFA/DFA型]]を参照。
- **マルチディスパッチ**: 同名関数を引数の型・値でオーバーロードできる（例: `multi fact(0) { 1 }`）。
- **Sigil不変性**: `@`, `$`などのシジルが変数アクセス時に変化しない設計で、複雑なデータ構造を簡潔に扱える。
- **遅延評価**: `0..Inf`のような無限リストも安全に扱える。
- **Roles**: クラス継承ではなく合成（composition）でコードを再利用する仕組み（Rubyのmixin相当）。

## 現在の状況

- 最新の安定版言語仕様は6.d「Diwali」（2020年10月24日リリース）。
- 「公式実装」という概念はなく、公式テストスイートに合格すれば「Raku」を名乗れる、という仕様ベースの認定方式。
- 開発はGitHub、IRC、メーリングリストで継続中。

## エコシステム

Webサービス構築用のライブラリ群として[[cro|Cro]]がある。

## mutsu — 自作のRaku実装

Rust製のRakuインタプリタ「[mutsu](https://github.com/tokuhirom/mutsu)」を自分（tokuhirom）で開発している。

- Rakuソースをパース→AST→バイトコードにコンパイルし、自作VM上で実行するアーキテクチャ（bytecode VM）。
- 公式テストスイート [Roast](https://github.com/Raku/roast) の1,464ファイル中1,433ファイルをパスする水準（開発が速く進んでいるため変動する）。
- クラス・ロール・継承、多重ディスパッチ、grammar/regex、gather/take、Promise（`start`/`await`）、enum、subset型、MAINサブによるCLI引数パースなど、主要機能を幅広くサポート。
- Zefパッケージマネージャを`mzef`として同梱し、mise・Docker・ソースビルドでインストール可能。
- 0.21.0からは[[cro|Cro]]::HTTPをバンドルしており、HTTPサーバが書ける（[[mutsu-cro-http-experiment|動作実験]]）。
- サイト（[tokuhirom.github.io/mutsu](https://tokuhirom.github.io/mutsu/)）は[[wasm|WebAssembly]]化したmutsu自身で動いており、チュートリアルやプレイグラウンドを提供している。
- まだ本番用途には非推奨（not yet suitable for production use）。RakuASTは未完成、コンパイル時診断の一部が未実装など既知の制限あり。

## 出典

- [Raku (programming language) - Wikipedia](https://en.wikipedia.org/wiki/Raku_(programming_language))
- [Larry Wall Approves Re-Naming Perl 6 To Raku - Slashdot](https://developers.slashdot.org/story/19/10/12/2134246/larry-wall-approves-re-naming-perl-6-to-raku)
- [Rakudo - Wikipedia](https://en.wikipedia.org/wiki/Rakudo)
- [MoarVM - A VM for NQP and Rakudo](https://www.moarvm.org/)
- [GitHub - rakudo/rakudo](https://github.com/rakudo/rakudo)
- [GitHub - tokuhirom/mutsu](https://github.com/tokuhirom/mutsu)
