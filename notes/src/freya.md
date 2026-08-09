---
created: 2026-08-09
updated: 2026-08-09
---
# Freya (freyaui.dev) — Rust製クロスプラットフォームGUIライブラリ

Rustでクロスプラットフォームのネイティブ（非Web）GUIアプリを作れるライブラリ。 #rust #gui

## 概要

- 公式サイト: https://freyaui.dev/
- GitHub: https://github.com/marc2332/freya （約3,000スター、活発に開発中）
- 作者: marc2332 (Marc Espín)
- ライセンス: MIT
- レンダリングエンジンは **Skia**

## Dioxusとの関係

- v0.1〜0.3は [Dioxus](https://dioxuslabs.com/) のコア機能をベースに実装されていた
- v0.4以降は独自のリアクティブコアに置き換え、Dioxusから部分的にインスパイアされつつも独立した実装になっている

## 主な機能

- Button、Switch、Slider、Calendar、ColorPickerなど豊富な組み込みコンポーネント
- 色・サイズ・位置などに対応したスムーズなアニメーション
- カーソル管理・テキスト選択付きのリッチテキスト編集
- Ropeベースの編集とtree-sitterによるシンタックスハイライトを備えたコードエディタ
- マルチページ対応のルーティング
- WebView埋め込み、PTY対応のターミナル機能
- コンポーネントをリアルタイム検査できる開発者ツール

## 所感

同じRust製ネイティブGUIという文脈では [[gpui]]（Zed製、GPU駆動）とも比較対象になる。Freyaはコードエディタ・ターミナル・WebView埋め込みなど「開発者向けツールを作る」ための機能セットが特に手厚く、VSCode的なアプリケーションを作る用途に向いていそうな作り。

## 出典

- [Freya - GUI Library for Rust](https://freyaui.dev/)
- [GitHub - marc2332/freya](https://github.com/marc2332/freya)
