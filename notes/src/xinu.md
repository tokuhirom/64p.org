---
created: 2026-08-10 19:06
updated: 2026-08-10 19:06
---
# Xinu

Xinu(Xinu Is Not Unix、再帰的頭字語)は、Douglas Comerが1980年代にPurdue大学の教育用に開発した組み込みシステム向けのオペレーティングシステム。 #operating-system #embedded

## 特徴

携帯電話やMP3プレーヤーのような組み込み環境向けに設計された、小さく洗練されたOS。動的なプロセス生成、動的メモリ割り当て、ネットワーク通信、ローカル/リモートファイルシステム、シェル、デバイス非依存のI/O機能をサポートする。

名前にUnixが入っているが、Unixのソースコードを知らずに書かれており、互換性も目指していない。一部Unixと同名のシステムコールを持つが、意味論(セマンティクス)は異なる。

## 対応ハードウェア

DEC PDP-11/VAX、Motorola 68k(Sun-2/Sun-3、AT&T UNIX PC)、Intel x86、PowerPC G3、MIPS、ARM、AVR(Arduinoのatmega328pなど)と幅広い移植実績がある。

## 教育用OSとしての位置づけ

Linuxのような汎用OSと異なり、組み込み・リアルタイム処理という特化した領域を扱う。OS設計の原理を教える大学の授業教材として広く使われており、開発者Douglas Comer自身の著書『Operating System Design: The Xinu Approach』が定番のテキストになっている。

## 出典

- [Xinu - Wikipedia](https://en.wikipedia.org/wiki/Xinu)
- [Xinu – A small, elegant operating system | Hacker News](https://news.ycombinator.com/item?id=17734837)
- [Comprehensive Analysis of Xinu: A Case Study in Embedded OS Architecture | Medium](https://medium.com/@einstenkhaled/comprehensive-analysis-of-xinu-a-case-study-in-embedded-os-architecture-f6d982f55986)
