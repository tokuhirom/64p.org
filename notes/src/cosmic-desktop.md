---
created: 2026-08-09 22:48
updated: 2026-08-10 16:57
---
# COSMIC (デスクトップ環境)

[[system76|System76]]が開発する、Rustで書かれたWaylandネイティブのデスクトップ環境。Component-Oriented System for Integrated Modular Computingの略。 #linux #rust

## 特徴

- Rustで一から書かれたWaylandコンポジタで、コアパッケージ・アプリケーション・`libcosmic`などの基盤ライブラリを含めて約27コンポーネントに分割された、モジュラーで組み合わせ可能な設計。コンポーネント単位での置き換え・拡張が可能。
- パフォーマンス向上とフリーズ低減を狙っており、自動タイリング機能なども備える。

## 配布状況

[[pop-os|Pop!_OS]] 24.04 LTS以降にネイティブ搭載されるほか、Arch、Fedora、[[nixos|NixOS]]、openSUSE Tumbleweed、Gentoo、CachyOS、Garuda、Enterprise Linux 9/10、postmarketOS、Slackware.uk、AerynOSなど幅広いディストリビューションでサポートされている。

## 開発状況(2026年)

- COSMIC Epoch 1.3.0でフロストガラス風の視覚効果、AMD/Intel/NVIDIA各GPUに対応したGPUモニタリング機能強化、Waylandプロトコル準拠の改善などが追加された。
- COSMIC Epoch 1.4.0が2026-07-22にリリースされ、ゲームのフルスクリーンモード対応やフラクショナルスケーリング時のポインタ精度など、`cosmic-comp`に対する13件の安定性修正が行われた。
- ロードマップとして、複数PC間でアプリ・デスクトップ設定・dotfilesをエンドツーエンド暗号化で同期する「COSMIC Sync」が2026年内に計画されている。

## 出典

- [COSMIC desktop - Wikipedia](https://en.wikipedia.org/wiki/COSMIC_desktop)
- [COSMIC 1.3 Released: System76's Rust Linux Desktop Gains Frosted Glass and GPU Tools](https://www.linuxcompatible.org/story/cosmic-13-released-system76s-rust-linux-desktop-gains-frosted-glass-and-gpu-tools/)
- [System76 Releases COSMIC Epoch 1.4.0 with Stability Fixes and Compositor Updates](https://www.linuxcompatible.org/story/system76-releases-cosmic-epoch-140-with-stability-fixes-and-compositor-updates/)
