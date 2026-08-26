---
created: 2026-08-27 08:11
updated: 2026-08-27 08:11
---
# OpenScreen

画面録画から製品デモ動画への編集までを行う、無料・オープンソースのデスクトップアプリ。"Record your screen, ship a demo" がスローガンで、[Screen Studio](https://screen.studio/)の代替を目指している。 #electron #rust

## 概要

- GitHub: [getopenscreen/openscreen](https://github.com/getopenscreen/openscreen)
- ライセンス: MIT
- 対応OS: Windows、macOS、Linux
- 100%無料（個人・商用利用とも）、ウォーターマークなし、サブスクリプションなし

## 主な機能

- **録画**: ウィンドウ単位/全画面録画、マイク＋システム音声の同時録音、Webカメラのオーバーレイ（PinP、形状指定可）
- **編集**: 自動/手動ズーム（深度・時間・イージング・位置をピクセル単位で調整可）、オンデバイスの自動字幕生成（アップロード不要）、Claude/OpenAI等のAPIを使うAI編集アシスタント、テキスト・矢印・画像アノテーション、12言語以上のUI対応
- **書き出し**: MP4/GIF、GPUアクセラレーション（macOS: Metal、Windows: D3D11、Linux: Vulkan）

## 技術スタック

[[electron]] + TypeScriptのフロントエンド、Rust製の複数crateがバックエンド。ビルドはVite/Biome、テストはPlaywright/Vitest。

## 経緯

元々は Siddharth Vaddem 氏が個人開発していたプロジェクト（`siddharthvaddem/openscreen`）で、v1.5.0後にアーカイブされた。開発は本人の承認のもと `getopenscreen` organization に移行し、MITライセンスのまま継続している。`EtienneLescot/openscreen`という独立フォークも同様の経緯で存在する。

なお `chromium/openscreen` は全くの別プロジェクト（Open Screen Protocol/Castプロトコル関連のライブラリ）で無関係。

現在も「actively maintained」だが、開発途上のため粗さや破壊的変更もあり得るとされている。

## 出典

- [GitHub - getopenscreen/openscreen](https://github.com/getopenscreen/openscreen)
- [Download for Windows, macOS & Linux | OpenScreen](https://getopenscreen.com/download/)
