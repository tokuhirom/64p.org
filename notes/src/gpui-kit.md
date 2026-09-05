---
created: 2026-09-04 18:06
updated: 2026-09-05 14:53
---
# GPUI Kit

#rust #gui

[[gpui|GPUI]]の上に載るUIコンポーネント集からスタートし、Rustデスクトップアプリケーション用のフレームワークへと再構成されたプロジェクト。香港の証券会社Longbridgeが開発し、自社の株取引デスクトップアプリ「Longbridge Pro」を初日からこれで作っている。ライセンスはApache-2.0、バージョンは0.6.0(2026年9月時点)、GitHub Starsは約13,900。

もともとは`gpui-component`という名前のリポジトリ・クレートだったが、`longbridge/gpui-kit`にリネームされた(旧URLはリダイレクトされる)。ドキュメントサイトは<https://gpui-kit.com>。

## 3層構造

「アプリケーションが依存するのは`gpui-kit`ひとつだけ」という設計で、下の層をまとめて再エクスポートする。

```text
gpui-kit             アプリケーションが依存する唯一のクレート
├── gpui-base        スタイルを持たない振る舞い・状態・インフラ
├── gpui-shell       Rustホストに載るJavaScript拡張
└── gpui-component   完成されたstyled UIシステム
```

| | 用途 |
| --- | --- |
| `gpui-component` | 完成済みのスタイル付きコンポーネント。テーマ機能付きの既定値で素早くアプリを作る |
| `gpui-base` | 未スタイルの振る舞いとインフラ。自前のデザインシステムを作りたい場合 |
| `gpui-shell` | Rustホストが読み込むJavaScriptランタイム。出荷後に拡張したい場合。ケイパビリティは1つずつ明示的に許可する |

## 機能

- 60以上のUIコンポーネント(フォーム・ナビゲーション・オーバーレイ・フィードバック・レイアウト)
- データテーブル: 仮想スクロール、列の固定・リサイズ、ソート、セル選択。数十万行を扱う
- 可変高の要素にも対応した仮想リスト
- コードエディタ: Tree-sitterによるハイライトと[[lsp|LSP]]の診断・補完・ホバー。20万行でも性能が安定するとされる
- Dockレイアウト: リサイズ可能なパネル、ドラッグ可能なタブ、ネストした分割、シリアライズ可能なTiles
- Markdown/HTMLのネイティブレンダリング、チャート
- WebView埋め込み([[gpui-wry]]は本リポジトリの`crates/webview`)
- macOS/Windows/Linux対応。ただしメニューまわりは差が大きく、専用の作法がいる([[gpui-kit-cross-platform-menu|GPUI Kitでのクロスプラットフォームなメニュー]])

## GPUI本体の取り込み方

[[gpui|GPUI]]の公式クレートがcrates.ioで0.2.2(2025-10-22)から更新されていないため、Longbridgeは`gpui-pre`という自前のスナップショットクレート(`zed@5b055fa`時点、といったコミットを固定して公開するもの)をcrates.ioに出し、`gpui-kit`側でそれをピンしている。

```toml
gpui = { package = "gpui-pre", version = "0.3.1" }
gpui_platform = { package = "gpui-pre-platform", version = "0.3.1", features = ["font-kit", "x11", "wayland", "runtime_shaders"] }
```

そのためアプリケーション側のCargo.tomlにGPUI本体を書く必要がない。GPUIのバージョン追従の面倒をフレームワーク側が引き受ける構造になっている。

## 同名の別プロジェクト「gpuikit」

紛らわしいことに、[iamnbutler/gpuikit](https://github.com/iamnbutler/gpuikit)(crates.ioでは`gpuikit`)という別のUIツールキットも「gpui-kit」を名乗っている。元Zed社員のNate Butlerが個人で開発しているもので、SwiftUIとWeb系コンポーネントライブラリの概念的な統合を目指すと謳っている。GitHub Starsは約158、バージョンは0.8で、リリースごとに破壊的変更が入るpre-1.0の段階。

こちらはGPUI本体として、同じくNate Butlerが公開しているZedのリリースタグごとの自動publish版`gpui-unofficial`を参照する。

```toml
gpui = { package = "gpui-unofficial", version = "1.14" }
gpui_platform = { package = "gpui-platform-gpui-unofficial", version = "1.14", features = ["font-kit"] }
gpuikit = "0.8"
```

showcaseがGitHub Pages上に置かれていて、ネイティブで動かすのと同じバイナリをwasmビルドしたものをブラウザから触れる(<https://nate.rip/gpuikit/>)。

規模・実績の面では、単に「gpui-kit」と言った場合はLongbridge版を指すことがほとんど。

## どのディストリビューションに乗るか

[[gpui|GPUI]]まわりは公式クレートが止まっている影響で選択肢が分岐している。用途別の整理。

- **デスクトップアプリを作りたい** → GPUI Kit。実運用の実績があり、コンポーネントが揃っていて、何よりGPUI本体のバージョン追従を肩代わりしてくれる。
- **GPUIそのものを低レベルに触りたい、Zed本流に入らない機能(トレイ対応やWayland周りなど)が要る** → [gpui-ce](https://github.com/gpui-ce/gpui-ce)。`cargo add gpui-ce`だけで始められ、コミュニティ側の要望を受け入れる方針。
- **公式の`gpui` 0.2.2** → 選ばない。2025-10-22から更新が止まっている間に、アップストリームでは`gpui`/`gpui_platform`の分割やwgpu移行が済んでいる。READMEの通りに書いても最新のアップストリームとは別物になる。

crates.ioのダウンロード数(2026-09-04時点)。

| クレート | 最新 | total | recent |
| --- | --- | --- | --- |
| `gpui-component` | 0.6.0 | 102,230 | 45,191 |
| `gpui-kit`(傘クレート) | 0.6.0 | 400 | 400 |
| `gpui-ce` | 0.2.2 | 7,763 | 6,424 |
| `gpui-unofficial` | 1.19.0-pre | 4,199 | 2,931 |
| `gpuikit` | 0.8.0 | 257 | 167 |
| `gpui`(公式) | 0.2.2 | 252,104 | 140,284 |

`gpui-kit`のダウンロードが小さいのは傘クレートが最近できたばかりだからで、実体は`gpui-component`の方に出ている。新規に書き始めるなら`gpui-kit`、既存コードがあるなら`gpui-component`のままでよい。公式`gpui`の25万は歴史的な蓄積。

### 系統は混ぜられない

一番の落とし穴。参照しているGPUIの再配布元が系統ごとに違う。

```text
gpui-kit (Longbridge)  →  gpui-pre
gpuikit  (Nate Butler) →  gpui-unofficial
gpui-ce                →  gpui-ce 自身
```

Rustではパッケージが違えば同じ`struct`でも別の型になるので、これらを混在させることはできない。「GPUI Kitのテーブルを使いつつgpui-ceのトレイ対応も欲しい」はコンパイルが通らない。最初にどの系統に乗るかを決める必要がある。gpui-ceは「今はほぼAPI互換だが、これから変えていく」と明言しているため、この分断は今後広がる方向。

### そもそもGPUIを選ぶか

Zedのようなエディタ的なもの、大量の行を高速に描くものを作るならGPUI Kitは有力で、Tree-sitter+[[lsp|LSP]]付きのコードエディタコンポーネントがそのまま使えるのは[[rust-gui-libraries|他のRust GUIライブラリ]]にない強み。一方で普通のGUIツールなら、pre-1.0で破壊的変更が頻繁・公式クレートが止まっている・エコシステムが系統ごとに分断している、という前提を許容できるかどうかで判断することになる。

## 出典

- [longbridge/gpui-kit - GitHub](https://github.com/longbridge/gpui-kit)
- [GPUI Kit ドキュメント](https://gpui-kit.com/)
- [gpui-kit - crates.io](https://crates.io/crates/gpui-kit)
- [gpui-pre - crates.io](https://crates.io/crates/gpui-pre)
- [iamnbutler/gpuikit - GitHub](https://github.com/iamnbutler/gpuikit)
- [gpuikit showcase](https://nate.rip/gpuikit/)
- [iamnbutler/gpui-unofficial - GitHub](https://github.com/iamnbutler/gpui-unofficial)
- [gpui-component - crates.io](https://crates.io/crates/gpui-component)
- [gpui-ce - crates.io](https://crates.io/crates/gpui-ce)
