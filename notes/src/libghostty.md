---
created: 2026-08-26 08:34
updated: 2026-08-26 08:34
---
# libghostty

[Ghostty](https://ghostty.org/)ターミナルエミュレータのコア機能を、他アプリから埋め込み利用できるようC ABIのライブラリとして切り出すプロジェクト。作者のMitchell Hashimotoが2025年9月に公開したブログ記事「[Libghostty Is Coming](https://mitchellh.com/writing/libghostty-is-coming)」で発表された。クロスプラットフォーム・最小依存で、Zigで書かれている。

## 動機: ターミナルエミュレーションの車輪の再発明問題

ターミナルエミュレーションは見た目以上に複雑な問題だが、VS Codeのようなエディタ内蔵ターミナルやCIのビルドログ表示など、本業がターミナル実装ではないアプリが世の中に数百と独自実装を抱えている。それらの多くは「不完全・バグあり・遅い」状態になりがちで、libghosttyはGhosttyの実運用で鍛えられたコアを共有基盤として提供することで、この車輪の再発明を業界全体でなくすことを目指している。

## 第一弾: `libghostty-vt`

現状(2026年8月時点)でリリースされているのは`libghostty-vt`のみ。制御シーケンスのパースと端末状態管理に特化した、libcすら不要なゼロ依存ライブラリ。Ghosttyの本体コードから直接切り出されているため、以下をそのまま継承している。

- SIMD最適化されたパーサ
- フルUnicode対応
- Kitty graphics protocol・tmux control modeとの互換性

`libghostty-vt`を使った最小構成のターミナルエミュレータ実装例として[ghostling](https://github.com/ghostty-org/ghostling)がGhosttyプロジェクト自身から公開されている。

## 今後のロードマップ

入力処理・GPUレンダリング・GTKウィジェット・Swiftフレームワークなど、残りのレイヤーは今後追加予定。つまり現時点では「VTパーサ＋状態管理」という一番面倒で間違えやすい部分だけが先に切り出された段階で、フルスタックのターミナル実装が丸ごと不要になる段階にはまだ達していない。

## 考えたこと

libghosttyがよく出来すぎていて、今後「ターミナルをゼロから実装する」というモチベーションが薄れていく世界観になっていくのかもしれない、と思った。ただし現状は`libghostty-vt`(パーサ＋状態管理)のみが公開された段階で、レンダリングや入力処理などは未着手のため、この予感が実際にどこまで当たるかは今後のリリース次第。

## 出典

- [Libghostty Is Coming – Mitchell Hashimoto](https://mitchellh.com/writing/libghostty-is-coming)
- [libghostty API docs](https://docsmith.aigne.io/docs/ghostty/en/libghostty-ed730d)
- [Ghostty and libghostty: The Terminal Core Quietly Reshaping the Ecosystem — Webteractive](https://webteractive.co/blog/ghostty-and-libghostty-the-terminal-core-quietly-reshaping-the-ecosystem)
- [GitHub - ghostty-org/ghostling](https://github.com/ghostty-org/ghostling)

#terminal #zig
