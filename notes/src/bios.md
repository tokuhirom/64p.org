---
created: 2026-08-13 22:06
updated: 2026-08-13 22:06
---
# BIOS

Basic Input/Output Systemの略、「基本入出力システム」。パソコンの電源投入直後にマザーボード上のROM/フラッシュメモリから最初に実行されるファームウェア。OSが起動する前段階を担当する。 #hardware

## 主な役割

- **POST (Power-On Self-Test)** — CPU・メモリ・キーボードなど主要ハードウェアの自己診断。
- **ハードウェアの初期化** — 各種デバイスを使える状態にセットアップする。
- **ブートローダーの起動** — 起動デバイス(HDD/SSD・USBメモリ・CDなど)からOSの起動プログラムを見つけて実行し、制御をOSに引き渡す。
- **起動デバイスの順序制御** — どのドライブから優先的に起動するかをBIOS設定画面で指定できる。

## [[uefi|UEFI]]との関係

近年の多くのPCでは、BIOSに代わり後継規格の[[uefi|UEFI]](Unified Extensible Firmware Interface)が使われている。UEFIはBIOSと同じ役割(起動前のハードウェア初期化とOSへの引き渡し)を担うが、GUI対応・2TB超のディスクからの起動・[[uefi|Secure Boot]]など、BIOSの制約を解消した拡張版にあたる。ただし慣習的に、UEFI搭載機でも設定画面が「BIOS設定」と呼ばれ続けていることが多く、両者は現在でも同義語的に使われがちである。

オープンソースのファームウェア実装として[[coreboot]]があり、BIOS/UEFIの置き換えを標榜している。

## 出典

- [BIOS（Basic Input Output System）とは何ですか？BIOSとUEFIの違いは何ですか？](https://premioinc.com/ja/blogs/blog/what-is-bios-basic-input-output-system-bios-vs-uefi)
- [BIOS(Basic Input/Output System)とは？意味をわかりやすく簡単に解説](https://xexeq.jp/blogs/media/it-glossary231)
- [Basic Input/Output System - Wikipedia](https://ja.wikipedia.org/wiki/Basic_Input/Output_System)
- [BIOSとは？基本入出力システムの役割と仕組みを解説](https://it-notes.stylemap.co.jp/hardware/what-is-bios-a-guide-to-the-basic-input-output-system/)
