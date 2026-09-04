---
created: 2026-08-09 15:29
updated: 2026-09-04 18:06
---
# GPUI

#rust #gui

コードエディタ[Zed](https://zed.dev/)の開発元(Zed Industries)が作った、Rust製のGPUアクセラレーションGUIフレームワーク。ライセンスApache-2.0。immediate modeとretained modeのハイブリッド設計。まだpre-1.0で開発中で、バージョン間で破壊的変更が頻繁に入る。

## 設計の特徴

macOSはMetal、WindowsはDirectWriteなど、プラットフォーム固有の技術でレンダリングをGPUに直接投げ、120FPSを目標にした高フレームレートを狙う。以下の三層構造で構成されている。

- エンティティによる状態管理
- `Render`トレイトによる宣言的UI(View)
- 低レベルな命令型UI(Element)制御

## Zedとの関係

元々Zed内部の一部として開発されており、現在もソースツリーはZed本体のリポジトリの`crates/gpui`に置かれている。音楽プレイヤー・動画編集ツール・ファイルエクスプローラ・AIコーディングターミナルなど、Zed以外のアプリでも採用が広がっている(GitHubの[awesome-gpui](https://github.com/zed-industries/awesome-gpui)にまとめられている)。Zed本体のGitHub Starsは約88,300。

## コード自体の開発は活発

`crates/gpui`へのコミットはほぼ連日入っており、開発そのものは止まっていない。2026年9月初旬の例を挙げると、`TouchDragEvent` APIの追加、長押しジェスチャの認識、`gpui_web`(wasm32ターゲット向けのwebプラットフォーム実装)のIME周り、hitbox/hoverまわりのAPI追加など。レンダリングバックエンドもbladeからwgpuへの移行が進んでいる。

## crates.ioでのリリースは止まっている

一方で、crates.ioの公式`gpui`クレートは**0.2.2(2025-10-22)で更新が止まっている**(2026年9月時点で約11か月)。つまり停止しているのは「Zedの外のユーザーに汎用フレームワークとして配る」側の営みであって、フレームワークの開発ではない。「ZedはGPUIの開発を止めた」という言われ方をするのはこの文脈。

結果として、crates.ioにはZedのソースをスナップショットして再配布する非公式クレートが複数並ぶ状態になっている。

| クレート | 誰が出しているか | 最新(2026-09時点) |
| --- | --- | --- |
| `gpui` | Zed Industries(公式) | 0.2.2 / 2025-10-22 |
| `gpui-unofficial` | iamnbutler。Zedのリリースタグごとに自動publish | 1.19.0-pre / 2026-09-02 |
| `gpui-pre` | Longbridge。特定コミットのスナップショット | 0.3.3 / 2026-09-03 |
| `gpui-ce` | コミュニティフォーク | 0.2.2 / 2026-08-28 |

他にも`bezel-gpui-platform`、`open-gpui-platform`、`guic-gpui-platform`、`fc-gpui-platform`、`boltz-gpui-platform`といったフォーク由来の再配布が存在する。GPUIを外部から使う場合、まずどのディストリビューションに乗るかを選ぶところから始まる。

## 外部利用者向け開発の位置づけ

Zedメンテナーのmaxdeviantは[GitHub Discussion #9877](https://github.com/zed-industries/zed/discussions/9877)(2024年)で、「UIクレートは現状Zed専用で、汎用ライブラリとして切り出す具体的な計画は今のところない」と述べている。

2026年2月頃の[GitHub Discussion #30515「Please extract GPUI」](https://github.com/zed-industries/zed/discussions/30515)等では、GPUI本流の開発がZed外部ユーザーのニーズを優先しない方向にあり、Zed本体で直接使わないコード(トレイ対応やWayland周りのタッチイベント対応など)はアップストリームにマージされにくくなっていることが議論されている。同時期のHacker Newsのスレッドでも、Zed側の「2026年はビジネスに直結する仕事に集中する必要があり、Zedのユースケースに直接関係ないものは後回しにする」という趣旨の発言が引用されている。Zed開発者自身が、Zed本体で不要な機能追加はコミュニティフォークの[gpui-ce](https://github.com/gpui-ce/gpui-ce)(GPUI Community Edition)への提出を案内するようになっている。

gpui-ceのフォーク作成者(iamnbutler)は、GPUIがZedのニーズに特化して作られているため、Zed Industriesがコミュニティ専用の作業に工数を割くのを正当化するのは難しい、という実務的な理由を説明している。gpui-ce自体は2025年12月に作られた当初こそメンテナー対応の滞りが指摘されていたが、2026年9月時点ではGitHub Stars約1,000、コミットもほぼ連日入っている。`Sync/zed 20260903`のように定期的にアップストリームを同期しつつ、Windowsでのwgpu surface対応やWaylandのアイコン対応といった「Zed本体には要らない機能」を取り込んでいる。READMEでは「今はほぼAPI互換だが、これから変えていく」と明言している。

## GPUI上に載るUIツールキット

GPUI自体は`div`とtailwind風のスタイルAPIを提供する低レベルな層なので、ボタン・テーブル・ダイアログといった完成されたコンポーネントは別のクレートが担う。代表的なのが[[gpui-kit|GPUI Kit]](旧gpui-component、Longbridge製)。

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
- [gpui-ce - crates.io](https://crates.io/crates/gpui-ce)
- [gpui-unofficial - GitHub](https://github.com/iamnbutler/gpui-unofficial)
- [Zed also stopped GPUI development for... - Hacker News](https://news.ycombinator.com/item?id=47003569)
