---
created: 2026-08-09
updated: 2026-08-09
---
# GPUI

#rust

コードエディタ[Zed](https://zed.dev/)の開発元(Zed Industries)が作った、Rust製のGPUアクセラレーションGUIフレームワーク。バージョン0.2.2、ライセンスApache-2.0。immediate modeとretained modeのハイブリッド設計。まだpre-1.0で開発中で、バージョン間で破壊的変更が頻繁に入る。

## 設計の特徴

macOSはMetal、WindowsはDirectWriteなど、プラットフォーム固有の技術でレンダリングをGPUに直接投げ、120FPSを目標にした高フレームレートを狙う。以下の三層構造で構成されている。

- エンティティによる状態管理
- `Render`トレイトによる宣言的UI(View)
- 低レベルな命令型UI(Element)制御

## Zedとの関係

元々Zed内部の一部として開発されていたが、現在はスタンドアロンのクレートとしてcrates.ioに公開されており、音楽プレイヤー・動画編集ツール・ファイルエクスプローラ・AIコーディングターミナルなど、Zed以外のアプリでも採用が広がっている(GitHubの[awesome-gpui](https://github.com/zed-industries/awesome-gpui)にまとめられている)。Zed本体のGitHub Starsは約88,300。

## 外部利用者向け開発の位置づけ

Zedメンテナーのmaxdeviantは[GitHub Discussion #9877](https://github.com/zed-industries/zed/discussions/9877)(2024年)で、「UIクレートは現状Zed専用で、汎用ライブラリとして切り出す具体的な計画は今のところない」と述べている。

2026年2月頃の[GitHub Discussion #30515「Please extract GPUI」](https://github.com/zed-industries/zed/discussions/30515)等では、GPUI本流の開発がZed外部ユーザーのニーズを優先しない方向にあり、Zed本体で直接使わないコード(トレイ対応やWayland周りのタッチイベント対応など)はアップストリームにマージされにくくなっていることが議論されている。Zed開発者自身が、Zed本体で不要な機能追加はコミュニティフォークの[gpui-ce](https://github.com/gpui-ce/gpui-ce)(GPUI Community Edition)への提出を案内するようになっている。gpui-ceのフォーク作成者(iamnbutler)は、GPUIがZedのニーズに特化して作られているため、Zed Industriesがコミュニティ専用の作業に工数を割くのを正当化するのは難しい、という実務的な理由を説明している。ただしgpui-ce自体も、PR#1マージ後にメンテナー対応が滞りがちという指摘もある。

## 出典

- [gpui - crates.io](https://crates.io/crates/gpui)
- [zed/crates/gpui - GitHub](https://github.com/zed-industries/zed/tree/main/crates/gpui)
- [GPUI: A Technical Overview - Medium](https://beckmoulton.medium.com/gpui-a-technical-overview-of-the-high-performance-rust-ui-framework-powering-zed-ac65975cda9f)
- [GPUI 2 is now in production — Zed's Blog](https://zed.dev/blog/gpui-2-on-preview)
- [awesome-gpui - GitHub](https://github.com/zed-industries/awesome-gpui)
- [Discussion about UI crate · Discussion #9877](https://github.com/zed-industries/zed/discussions/9877)
- [Please extract GPUI · Discussion #30515](https://github.com/zed-industries/zed/discussions/30515)
- [GPUI wish list · Discussion #20140](https://github.com/zed-industries/zed/discussions/20140)
- [gpui-ce/gpui-ce - GitHub](https://github.com/gpui-ce/gpui-ce)
- [Zed also stopped GPUI development for... - Hacker News](https://news.ycombinator.com/item?id=47003569)
