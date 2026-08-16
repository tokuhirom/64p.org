---
created: 2026-08-17 08:23
updated: 2026-08-17 08:23
---
# mruby

組み込み用途向けの軽量なRuby実装。ISO標準Rubyの一部に準拠しつつ、メモリやストレージが限られた環境（IoTデバイスなど）で動作するように設計されている。C/C++プログラムへの組み込み（リンク・埋め込み）が可能で、ECサイト・モバイルアプリ・ゲームなど幅広い用途で使われる。

## 歴史

2012年、Rubyの作者であるまつもとゆきひろ氏（Matz）自身が主導する形でMRubyプロジェクトが開始された。2014年2月9日に最初の公開バージョンがリリースされた。

## 構成要素

- `mruby` — インタプリタ本体
- `mirb` — 対話的に実行できるシェル
- `mrbc` — Rubyプログラムをバイトコードにコンパイルするコンパイラ

## 出典

- [mruby - Lightweight Ruby](https://mruby.org/)
- [GitHub - mruby/mruby: Lightweight Ruby](https://github.com/mruby/mruby)
- [組み込みRubyの世界（mruby / mruby/c / PicoRuby / PRK Firmware） - Zenn](https://zenn.dev/nanananano/articles/3e83e05594a862)

## [[picoruby|PicoRuby]]との関係

[[picoruby|PicoRuby]]は[[mrubyc|mruby/c]]のVMとmruby互換のコンパイラを組み合わせて構成されている。mrubyはこの系譜の源流にあたる、組み込み向けRuby実装の最初の実装。

#ruby #組み込み
