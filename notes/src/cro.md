---
created: 2026-08-10 18:09
updated: 2026-08-13 15:04
---
# Cro

[[raku-rakudo-perl6|Raku]]でリアクティブな分散システム・Webサービスを構築するためのライブラリ群。単一の「フレームワーク」というより、必要な部分だけ組み合わせて使えるツールキット群として設計されている。公式サイトは「elegant reactive services in Raku」と謳っている。MoarVMおよびRakudoコンパイラのアーキテクトでもあるJonathan Worthingtonが作者。

#raku #web-framework

## アーキテクチャ

Cro の中核にあるのは、Rakuの`Supply`（非同期リアクティブストリーム）を使って実装された「非同期パイプライン」という概念。HTTPリクエスト処理などをこのパイプラインの合成として組み立てる。高レベルAPIで簡単なことは簡単に、パイプラインの合成で難しいことも可能にする、というPerl由来の設計思想（"easy things easy, hard things possible"）を踏襲している。

## 主な機能

- HTTP（HTTPS、HTTP/2.0を含む）、[[websocket|WebSocket]]のサポート
- ルーティング機能
- `Cro::WebApp`によるテンプレート機能
- `cro`コマンドラインツールによる開発用サーバー起動・テストの支援

## 動かしてみた

自作Rakuインタプリタmutsu（0.21.0でCro::HTTPをバンドル）でhello worldサーバを動かした記録が[[mutsu-cro-http-experiment]]にある。

## 出典

- [Cro - elegant reactive services in Raku](https://cro.raku.org/)
- [Cro - Getting started with Cro](http://cro.raku.org/docs/intro/getstarted)
- [Cro - Cro documentation](https://cro.raku.org/docs)
- [Day 2 – CRUD with Cro::HTTP, a tutorial – Raku Advent Calendar](https://raku-advent.blog/2019/12/02/crud-cro-http-tutorial/)
- [Raku Land - Jonathan Worthington](https://raku.land/cpan:JNTHN)
