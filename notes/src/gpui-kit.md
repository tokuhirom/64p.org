---
created: 2026-09-04 18:06
updated: 2026-09-04 18:06
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
- macOS/Windows/Linux対応

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

## 出典

- [longbridge/gpui-kit - GitHub](https://github.com/longbridge/gpui-kit)
- [GPUI Kit ドキュメント](https://gpui-kit.com/)
- [gpui-kit - crates.io](https://crates.io/crates/gpui-kit)
- [gpui-pre - crates.io](https://crates.io/crates/gpui-pre)
- [iamnbutler/gpuikit - GitHub](https://github.com/iamnbutler/gpuikit)
- [gpuikit showcase](https://nate.rip/gpuikit/)
- [iamnbutler/gpui-unofficial - GitHub](https://github.com/iamnbutler/gpui-unofficial)
