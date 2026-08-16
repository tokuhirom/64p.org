---
created: 2026-08-16 13:34
updated: 2026-08-16 13:34
---
# Intel 8051

Intelが1980年に発表した8bitシングルチップマイクロコントローラ。前身のIntel 8048(MCS-48ファミリ)の後継として設計された。アーキテクトはJohn H. Wharton。1チップに8bit CPU、4KB ROM、128バイトRAM、16bitタイマー2基、全二重UART、32本のI/Oラインを集積した。Intel公式の企業史ページでは「世界で最も売れたマイクロコントローラシリーズ」と位置づけられ、発売後10年で1億個を販売、自動車のABSから楽器・玩具まで幅広く採用され「事実上の世界標準」になったと説明されている。Intel自身は2007年3月に生産を終了した。

## アーキテクチャ

8bit ALU/アキュムレータを持つハーバードアーキテクチャで、プログラムメモリとデータメモリが物理的に分離(16bitアドレスバス×2)。内部RAMは128バイト(8052は256バイト)、Special Function Register(SFR)は0x80–0xFF、外部コード/データメモリはMOVX命令経由で各64KBまでアクセス可能、256bitのビットアドレッサブル領域を持つ。汎用レジスタR0–R7は4バンク切替式で割込み処理のオーバーヘッドを抑える設計。オリジナルはNMOSだが、後にCMOS版(80C51)で低消費電力化された。

## 生き残っている理由

Intelは早期からセカンドソース戦略を積極採用し、AMD・Fujitsu・OKI・Philips/Signetics・Siemensなど20社以上に設計をライセンスし、各社が完全互換品を製造した。Intel撤退後もシリコンIPコア(VHDL/Verilog実装、FPGA/ASIC組込み用)として存続し続けている。32bitコアより小型・低消費電力であること、教育機関の入門コースで標準的に使われ続けていること、枯れた実績とツールチェーン資産の蓄積が理由として挙げられる。

## 現在の採用状況

- **Microchip(旧Atmel/SST)**: AT89C51/AT89S51シリーズ。2010年にMicrochipが買収したSSTの旧80C51事業を継続し、NXPがEOL(生産終了)にした80C51系品のピン互換代替品(SST89V/SST89E)を今も供給している。
- **Silicon Labs**: C8051Fシリーズ(一部NRND=新規設計非推奨)を持ちつつ、8051コアをEFM8シリーズに継承。C8051F020は2027年3月まで、C8051F931は2026年10月まで生産継続予定。
- **NXP**: 「8-Bit Legacy MCUs」カテゴリとして80C51系を維持しているが、大半は生産終了表示で、現行品はP89CV51RD2FBCなど一部に限られる。
- **STC Micro(中国)**、**WCH/南京沁恒**(CH551/552/554など格安USB内蔵8051互換MCU)、**Infineon**(XC800)、**Analog Devices(旧Maxim/Dallas)**(DS80シリーズ)、**Cypress**(PSoC 3のCY8C3xxxxに8051コア採用)も現行/近年まで供給。

市場規模については市場調査サイト間で数値が大きく矛盾し方法論も不明なため、具体的な数値は載せない。確実な一次情報としては、Intel公式が「発売後10年で1億個販売」「20社以上が互換品を製造」と述べている点のみ。

## [[riscv-design-criticism|RISC-Vの設計批判]]における位置づけ

dmitry.grのブログ記事「RISC-V: They Should Have Known Better」は、RISC-Vが安価な使い捨てマイクロコントローラ市場を手中にするだろうと予測しつつ、それは「ISA設計が優れているからではなく、それにもかかわらず」であり、Armがライセンス料を要求するのに対しRISC-Vの仕様は無償で無料ライセンスのコアも存在する、というコスト面の優位性を理由としている。8051を上回るのは「非常に低いハードル」だとも述べている。

ただしこれは一ブロガーの意見であり、RISC-Vが8051から市場シェアを奪いつつあることを定量的に裏付ける出荷統計等の一次情報は見つかっていない。WCHなど一部ベンダーが安価なRISC-Vコアを展開している事実はあるが、8051からのシェア移行を示す具体的数値は確認できなかった。

## 出典

- [Intel公式タイムライン: The 8051 Microcontroller](https://timeline.intel.com/1980/the-8051-microcontroller)
- [Wikipedia: Intel MCS-51](https://en.wikipedia.org/wiki/Intel_MCS-51)
- [Wikipedia: Intel 8051](https://en.wikipedia.org/wiki/Intel_8051)
- [Microchip IR: Continue Manufacturing 8051/80C51 MCUs (2012)](https://ir.microchip.com/news-events/press-releases/detail/851/microchip-to-continue-manufacturing-805180c51-microcontrollers-that-are-100-compatible-with-nxps-end-of-life-mcus)
- [Silicon Labs: Proven 8051 Technology, Brilliantly Updated](https://pages.silabs.com/8051-core-efm8.html)
- [NXP: 8-Bit Legacy MCUs](https://www.nxp.com/products/processors-and-microcontrollers/legacy-mpu-mcus/8-bit-legacy-mcus:8-BIT-LEGACY-MCUS)
- [dmitry.gr: RISC-V: They Should Have Known Better](https://dmitry.gr/?r=06.%20Thoughts&proj=12.%20RV)

#cpu-architecture #mcu
