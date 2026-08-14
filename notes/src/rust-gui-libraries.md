---
created: 2026-08-09 16:01
updated: 2026-08-14 09:59
---
# Rust GUI ライブラリ一覧

Rust製のGUIライブラリ・フレームワークをまとめておく。個別に深掘りしたものは別ノート([[gpui]]、[[freya]])に切り出し、ここからリンクする。他言語との対比は[[go-gui-libraries|Go版]]も参照。 #rust #gui

## 比較表

| 名前 | 開発元 | スター数 | レンダリング方式 | 対応プラットフォーム | ライセンス |
| --- | --- | --- | --- | --- | --- |
| [egui](https://github.com/emilk/egui) | Emil Ernerfeldt | 30k+ | Immediate mode | Web(Wasm)/デスクトップ/Android/ゲームエンジン組込 | MIT/Apache-2.0 |
| [Iced](https://github.com/iced-rs/iced) | iced-rs | 31.2k | Elm Architecture(宣言型)、wgpu/tiny-skia | Windows/macOS/Linux/Web | MIT |
| [Slint](https://github.com/slint-ui/slint) | SixtyFPS GmbH | 23.4k | 独自DSL(`.slint`)をコンパイル | 組込(RaspberryPi/STM32等)/デスクトップ/モバイル/Web | デュアル(GPLv3 or 商用) |
| [Dioxus](https://github.com/DioxusLabs/dioxus) | DioxusLabs | 38.6k | React/Solid/Svelte的なシグナルベース | Web/デスクトップ/モバイル/SSR | MIT/Apache-2.0 |
| [Xilem](https://github.com/linebender/xilem) | Linebender(Druidチーム後継) | 5.5k | Masonryベースの反応型UI(実験的) | ネイティブ(Vello/wgpu) | Apache-2.0 |
| [Floem](https://github.com/lapce/floem) | Lapceチーム | 4.2k | fine-grained reactivity、Vello/Skia/tiny-skia | Windows/macOS/Linux | MIT |
| [Makepad](https://github.com/makepad/makepad) | Rik Arendsら | 6.5k | 独自DSL+GPUレンダリング | ネイティブ/Web(WebGL)/iOS/Android | MIT |
| [[freya]] | marc2332 | 約3,000 | Skia(元はDioxusベース) | クロスプラットフォーム(非Web) | MIT |
| [[gpui]] | Zed Industries | (Zed本体で約88,300) | GPUアクセラレーション、immediate/retainedハイブリッド | macOS/Windows等(pre-1.0) | Apache-2.0 |

※スター数は調査時点(2026年8月)のスナップショット。

## 各ライブラリの補足

### egui
即座に画面を組める手軽さが特徴のimmediate mode GUI。フレーム毎にレイアウトを再計算する設計で、デバッグUIやツール系アプリ向き。AccessKitによるアクセシビリティ対応あり。

### Iced
Elm Architecture(State/Message/View/Update)を採用した宣言型GUI。Krakenの元Cryptowatchチームが開発。型安全なAPIとasync対応が特徴だが、ドキュメントに不足があるとの指摘がある([boringcactusのサーベイ](https://www.boringcactus.com/2025/04/13/2025-survey-of-rust-gui-libraries.html)参照)。

### Slint
`.slint`という独自DSLでUIを定義し、コンパイル時に最適化する組込機器フレンドリーな設計。Rust以外にC++/JavaScript/Pythonからも利用可能。ライセンスが[[gplv3|GPLv3]]または商用ライセンスという点は他のMITライセンス系ライブラリと毛色が異なる。

### Dioxus
React/Solid/Svelteのいいとこ取りを謳うシグナルベースの状態管理を持つフルスタックフレームワーク。Web/デスクトップ/モバイル/SSRを単一コードベースでカバーする。[[freya]]はDioxusの代替レンダラー(Skiaベース)としてREADME内で言及されている。

### Xilem
かつてRust公式GUIの本命と目されていた[Druid](https://github.com/linebender/druid)がsunset(開発終了)した後継として、同じLinebenderチームが開発。ウィジェットツールキットMasonryを基盤に、Vello/wgpu/Parley/AccessKitなどLinebender製コンポーネント群を組み合わせる。まだ実験的段階。

### Floem
コードエディタ[Lapce](https://lapce.dev/)と同じチームが開発。fine-grained reactivity(SolidJS的な、仮想DOMを介さない細粒度の再描画)が特徴。

### Makepad
独自のライブUI DSLとGPUレンダリングパイプラインを持つ。Web(WebGL)やiOS/Android/tvOSまで幅広くカバーする。

## 出典

- [A 2025 Survey of Rust GUI Libraries - boringcactus](https://www.boringcactus.com/2025/04/13/2025-survey-of-rust-gui-libraries.html)
- [The Rust GUI Landscape in 2026: Picking Your Framework - Wren Learns Rust](https://wrenlearnsrust.com/posts/2026-03-11-rust-gui-landscape-2026.html)
- [egui - GitHub](https://github.com/emilk/egui)
- [Iced - GitHub](https://github.com/iced-rs/iced)
- [Slint - GitHub](https://github.com/slint-ui/slint)
- [Dioxus - GitHub](https://github.com/DioxusLabs/dioxus)
- [Xilem - GitHub](https://github.com/linebender/xilem)
- [Floem - GitHub](https://github.com/lapce/floem)
- [Makepad - GitHub](https://github.com/makepad/makepad)
