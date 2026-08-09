---
created: 2026-08-09 16:08
updated: 2026-08-09 16:08
---
# Skia

Googleが管理しているオープンソースの2Dグラフィックスライブラリ。 #graphics

## 概要

- C++製の汎用2D描画エンジン。テキスト・図形・画像の描画を、プラットフォーム固有のグラフィックスAPI（DirectX、Metal、Vulkan、OpenGLなど）の違いを吸収した共通APIで扱える
- ライセンス: New BSD

## 沿革

- 2004年、Mike ReedとCary ClarkがNorth Carolina州Chapel Hillで Skia Inc を設立
- 2005年、Googleが買収
- 2008年、BSDライセンスでオープンソース公開

## 採用プロダクト

- Google Chrome / ChromeOS
- Android（標準の2D描画エンジン）
- Flutter（UIレンダリングの中核）
- Mozilla Firefox / Thunderbird
- LibreOffice、Avalonia（.NET製UIフレームワーク）など

## このサイトでの登場文脈

新興のRust GUIフレームワークでも、安定した2D描画バックエンドとしてよく採用されている。

- [[freya]] — レンダリングエンジンとしてSkiaを採用
- [[rust-gui-libraries]] — FloemがVello/Skia/tiny-skiaを選択可能なレンダラーとして紹介

## 出典

- [Skia](https://skia.org/)
- [About Skia | Skia](https://skia.org/about/)
- [Skia Graphics Engine - Wikipedia](https://en.wikipedia.org/wiki/Skia_Graphics_Engine)
- [GitHub - google/skia](https://github.com/google/skia)
