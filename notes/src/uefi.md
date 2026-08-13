---
created: 2026-08-13 22:06
updated: 2026-08-13 22:06
---
# UEFI

Unified Extensible Firmware Interfaceの略。[[bios|BIOS]]の後継として開発されたファームウェア仕様で、コンピュータの電源投入時に最初に実行される。BIOSがIBM PC由来の独自アーキテクチャだったのに対し、UEFIはUnified EFI Forumという業界コンソーシアムにより仕様が管理されている。 #hardware

## GPTとEFIシステムパーティション

UEFIは従来のMBR(Master Boot Record)パーティションテーブルに加えて、2TB超のディスクにも対応する**GPT (GUID Partition Table)** をサポートする。ディスク上には**EFIシステムパーティション(ESP)**と呼ばれる専用領域が確保され、そこにブートローダーやOSカーネルなどの「UEFIアプリケーション」が格納される。

## ブートマネージャー

UEFI実装はブート設定をNVRAM変数として保持しており、電源投入時にその設定に基づいてOSローダーを実行する。BIOSがブートセクタの実行に依存していたのに対し、UEFIはブートマネージャーを備えることで、ブートセクタに依存しない柔軟なブート方式を提供する。

## Secure Boot

**Secure Boot**は、デジタル署名によって承認されたUEFIドライバー・OSブートローダーのみをロードする仕組み。プラットフォームキー(PK)とキー交換キー(KEK)による階層構造で信頼チェーンを管理し、ファームウェアから署名済みドライバー・カーネルモジュールまでの信頼を確立する。

## [[bios|BIOS]]との関係

UEFIはBIOSと同じ「起動前のハードウェア初期化とOSへの引き渡し」という役割を担うが、GUI対応・大容量ディスクからの起動・Secure Bootなど、BIOSの制約を解消した拡張版にあたる。ただし慣習的に、UEFI搭載機でも設定画面が「BIOS設定」と呼ばれ続けていることが多く、両者は現在でも同義語的に使われがちである。

## 出典

- [Unified Extensible Firmware Interface - Wikipedia (en)](https://en.wikipedia.org/wiki/UEFI)
- [Unified Extensible Firmware Interface - Wikipedia (ja)](https://ja.wikipedia.org/wiki/Unified_Extensible_Firmware_Interface)
- [UEFIについて調べてみた（SecureBoot編）](https://zenn.dev/jamoyazii/articles/d04d93155f7043)
- [26.11. Unified Extensible Firmware Interface (UEFI) セキュアブート | Red Hat Enterprise Linux 7](https://docs.redhat.com/ja/documentation/red_hat_enterprise_linux/7/html/system_administrators_guide/sec-uefi_secure_boot)
