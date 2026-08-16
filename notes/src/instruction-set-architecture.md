# 命令セットアーキテクチャ(ISA)

CPUのプログラム可能なインターフェースを定義する抽象モデル。ソフトウェアがハードウェアとどう相互作用するかを規定し、命令・データ型・レジスタ・アドレッシングモード・仮想メモリ・メモリ一貫性機構などを含む。ARM自身の用語集も「プロセッサのハードウェアとその上で動くソフトウェアの間の抽象インターフェース」と定義しており、ハードウェアとソフトウェアの境界を成すという位置づけで一致する。

## 仕様と実装の違い

ISAはマイクロアーキテクチャ(特定プロセッサでの実装技法)と明確に区別される。異なるマイクロアーキテクチャが同一のISAを共有できる点が重要で、例えばIntel PentiumとAMD Athlonは内部設計が全く異なるが、ほぼ同一のx86 ISAを実装している。

## CISCとRISCの対立

「CISC」という語は「RISCに対する対比として遡及的に作られた」呼称。1970年代半ば、IBM Watson研究所のJohn CockeらによるIBM 801プロジェクトがRISC思想の先駆けとなり、1980年代前半にUC BerkeleyのDavid PattersonとDavid Ditzelが命令を単純化し固定長・レジスタ間演算中心の設計を提唱、論文"The Case for the Reduced Instruction Set Computer"(1980年)で"RISC"という語を作った。1980年代半ばにはDECの試算で「RISCの価格性能比はCISCの最大2倍」との評価が出て、SunがMotorola 68000からSPARCへ移行するなど業界に影響を与えた。

[[riscv-design-criticism|RISC-Vの設計批判]]で論じられている「オプション性」「命令エンコーディング」の問題は、いずれもこのRISC系ISA設計における一般的な論点(拡張の持たせ方、命令長の固定/可変)の具体例にあたる。

## オプショナルな命令セット拡張

ISAは「命令や機能を追加して拡張可能であり、拡張版の実装は拡張前のコードも実行できるが、拡張命令を使うコードは対応実装でしか動かない」という一般原則がある。実例:

- **x86**: SSE/AVXはCPUID命令でランタイム検出する拡張機能。
- **ARM**: NEON(SIMD拡張)はARMv7-A/RおよびArmv8-R AArch64でオプション扱い。
- **RISC-V**: ベース整数ISA(RV32I/RV64Iなど)にM(乗除算)・A(アトミック)・F/D(浮動小数点)などの標準拡張を任意に組み合わせるモジュール式設計。IMAFD一式は"G"と略称される。

## 命令エンコーディングのトレードオフ

固定長命令は「キャッシュラインや仮想メモリページ境界をまたぐかの判定が不要」など単純で高速化しやすい一方、x86は1〜15バイトの可変長命令(プレフィックス・opcode・ModRM・SIB・displacement・immediateの可変構成)で、スーパースカラ実行時の命令境界検出が課題となる。圧縮命令セットの例として、ARM Thumbは32ビット命令2個を1ワードにパックしデコード時に展開する方式、RISC-VのC拡張(16ビット圧縮命令)は32ビット命令と自由に混在させ、コードサイズを25〜30%削減する。

## 出典

- [Wikipedia: Instruction set architecture](https://en.wikipedia.org/wiki/Instruction_set_architecture)
- [ARM: What is Instruction Set Architecture (ISA)?](https://www.arm.com/glossary/isa)
- [Wikipedia: Complex instruction set computer](https://en.wikipedia.org/wiki/Complex_instruction_set_computer)
- [Patterson & Ditzel, "The Case for the Reduced Instruction Set Computer" (1980)](https://www.cs.utexas.edu/~fussell/courses/cs352h/papers/risc.pdf)
- [ARM: Neon](https://www.arm.com/technologies/neon)
- [RISC-V ISA Manual — Standard Extensions](https://docs.riscv.org/reference/isa/v2.2/riscv-spec.pdf)
- [RISC-V "C" Extension for Compressed Instructions](https://docs.riscv.org/reference/isa/unpriv/c-st-ext.html)
- [OSDev Wiki: x86-64 Instruction Encoding](https://wiki.osdev.org/X86-64_Instruction_Encoding)

#isa #cpu-architecture
