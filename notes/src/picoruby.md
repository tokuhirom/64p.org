---
created: 2026-08-17 08:19
updated: 2026-08-17 08:19
---
# PicoRuby

ワンチップマイコン向けの、最も軽量なRuby実装。Raspberry Pi PicoやESP32のような、リソースが極めて限られた組み込み環境で動作するように設計されている。

## 技術仕様

- バイナリサイズは256KB未満のROM、64KB未満のRAMに収まる
- 対象マイコンの例: Raspberry Pi Pico（Arm Cortex-M0+, 264KB RAM, 2MB Flash）、Raspberry Pi Pico 2 W（Arm Cortex-M33, 520KB RAM, 4MB Flash, CYW43無線モジュール搭載）

## 開発の経緯・体制

蓮見洋志氏（@hasumikin）が開発。Ruby Association Grant Programの支援を受けており、まつもとゆきひろ氏（Matz）がメンターを務める。RubyConf 2021やRubyKaigi Takeout 2021でも発表されている。

## 技術的な位置づけ

内部的にはmruby/cのVMと、mruby互換のコンパイラ（PicoRubyコンパイラ）を組み合わせている。組み込み向けRuby実装の系譜としては以下のように整理できる。

- **mruby** — 組み込み向けの軽量Ruby実装（まつもとゆきひろ氏らが開発）
- **mruby/c** — 島根県松江市のオープンソースラボが中心となり開発している、mrubyのVMをさらに省リソース化した実装
- **PicoRuby** — mruby/cのVMとmruby互換コンパイラを組み合わせ、ワンチップマイコンでも動くレベルまで軽量化した実装

## 主なプロジェクト・応用例

- **R2P2**（Ruby on Raspberry Pi Pico）— Raspberry Pi Pico上で動くシェルシステム
- **R2P2-ESP32** — ESP32への移植版
- **PicoRuby.wasm** — WebAssembly（WASI）ランタイム版
- **PRK Firmware** — Raspberry Pi Picoを使った自作キーボードのファームウェア

## 出典

- [Introduction | PicoRuby](https://picoruby.org/)
- [GitHub - picoruby/picoruby](https://github.com/picoruby/picoruby)
- [💎 PicoRuby: Bringing Ruby to Microcontrollers and the Edge of IoT](https://medium.com/@german.gimenez.silva/picoruby-bringing-ruby-to-microcontrollers-and-the-edge-of-iot-95ca8848a822)
- [組み込みRubyの世界（mruby / mruby/c / PicoRuby / PRK Firmware） - Zenn](https://zenn.dev/nanananano/articles/3e83e05594a862)
- [Porting PicoRuby to Another Microcontroller: ESP32 - RubyKaigi 2025](https://rubykaigi.org/2025/presentations/Y_uuu.html)

#ruby #組み込み
