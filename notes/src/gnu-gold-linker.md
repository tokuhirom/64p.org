---
created: 2026-08-16 18:19
updated: 2026-08-16 18:19
---
# GNU gold(リンカ)

GNU binutilsに含まれる、ELF形式専用のリンカ。Ian Lance TaylorがGoogleの小規模チームとともにC++でゼロから書き起こし、2008年3月にGNU binutilsへ統合された(binutils 2.19で初リリース)。 #linker #build

## 開発動機・特徴

従来の`ld`(BFDリンカ)は、a.out・COFFなど多様なオブジェクト形式をサポートするためBFDという抽象化レイヤーを介している。goldはELFのみに対応範囲を絞ることでBFD層を排除し、高速化を実現した。特にC++で書かれた大規模アプリケーションのリンク処理の高速化が主目的で、Taylorの研究発表によれば`ld`比で2〜5倍高速とされる。

対応アーキテクチャはx86、ARM、PowerPCなど複数。ライセンスはGPLv3。

## 現在の状況

開発は停滞しており、2025年2月リリースのbinutils 2.44でデフォルトのソース配布から除外され、別パッケージに切り出された。binutilsのリリースノートでは「ボランティアが開発・保守を引き継がない限り、最終的に削除される」非推奨扱いとされている。背景としてGoogle社内の関心が[[mold-linker|mold]]やLLVM lldといった後発の高速リンカ側へ移行したことが挙げられている。

## 出典

- [Binutils - GNU Project](https://www.gnu.org/software/binutils/)
- [Gold (linker) - Wikipedia](https://en.wikipedia.org/wiki/Gold_(linker))
- [Striking gold in binutils - LWN.net](https://lwn.net/Articles/274859/)
- [Exploring GNU Gold Linker - Baeldung on Linux](https://www.baeldung.com/linux/gnu-gold-linker)
