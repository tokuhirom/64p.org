---
created: 2026-08-16 13:34
updated: 2026-08-16 13:34
---
# OpenRISC

確立されたRISC原理に基づくオープンソースCPUコア群の開発プロジェクト。母体の**OpenCores**は1999年10月にDamjan Lampretが設立したオープンソースIPコア(VHDL/Verilog)のコミュニティで、当初からOpenRISC ISAがそのフラッグシッププロジェクトだった。最初の実装であるOR1200はLampretが2000年にVerilogで設計した。

2007年にORSoC(Marcus Erlandsson主導)がOpenCoresの商標・ポータル・コミュニティを取得し、2017年にはAndrea Borgaらがオランダの研究機関Nikhefの支援を受けOliscienceを設立、OpenCoresサイトの所有権を取得した。現在の公式サイトはopenrisc.ioで、Stafford Horneらが開発を主導している。

## アーキテクチャ

OpenRISC 1000は線形32bitまたは64bitアドレス空間を持つ3オペランド・ロードストア型RISCアーキテクチャ。命令長は32bit固定で32bit境界にアライン。基本命令セットORBIS32/64に加え、ベクタ/DSP拡張ORVDX64、浮動小数点拡張ORFPX32/64を持つ。汎用レジスタ数は仕様上「設定可能」(16または32)。仕様初版は2006年4月1日、大改訂版1.0は2012年12月14日公開。64bit版は2011年に仕様策定されたが、実装は確認されていない。

## 主な実装

- **OR1200** — Lampretによる最初のRTL実装(Verilog)。現在も広く使われるが活発な開発はされていない。
- **mor1kx** — Julius Baxterによる後継実装。CERN OHL v2ライセンスで、OR1200のドロップイン代替。マルチコア・アトミック命令に対応。
- 参照SoC: minSoC、OpTiMSoC、MiSoC。

## [[riscv-design-criticism|RISC-Vの設計批判]]との関係

Andrew Waterman(RISC-V仕様の共同設計者)のPhD論文(2016年)第2.6節「OpenRISC」で、RISC-V設計陣が2010年時点でOpenRISCを検討したことが明記されている。当時の欠点として「必須の分岐遅延スロット」「64bit未実装」を挙げつつ、「設計者の名誉のために言うと、これらは後に修正された(遅延スロットはオプション化、64bit版は仕様策定済み)」と認めた上で、次のように結論している。

> Ultimately, we thought it was best for our purposes to start from a clean slate, rather than modifying OpenRISC accordingly.
> (結局、我々の目的にはOpenRISCを改修するよりゼロから設計する方が良いと判断した)

その他の技術的理由として、ISAと実装の密結合、16bit即値による圧縮命令拡張の欠如、IEEE 754-2008非対応、条件コードの存在、L.RFE命令による古典的仮想化不可なども列挙されている。またAsanovićとPattersonの2014年テックレポート"Instruction Sets Should Be Free"では、「OpenRISCの完成には11年、RISC-Vは4年かかった」「OpenRISCは勢いを失った可能性がある」とも述べられている。

つまり「RISC-Vの設計者はOpenRISCを改修せずゼロから設計した」という[[riscv-design-criticism|dmitry.grの指摘]]は、RISC-V開発者自身の記述と事実として一致する。ただしRISC-V側は単純なNot Invented Here症候群ではなく、仮想化・浮動小数点・圧縮命令対応など複数の技術的欠陥を列挙した上での判断だったと主張しており、「事実」は一致するが「評価」は両者で異なる。

## 現在の採用状況

- Linuxカーネル: v3.1でOpenRISCサポートがマージ。
- glibc: v2.35(2022年2月)からOpenRISC公式対応。
- GCC: v9からアップストリームでネイティブ対応。
- musl/uClibc-ng/newlibも対応、Buildroot/OpenADKでビルド可能。
- RTOS: RTEMS(2014年GSoCで再整備)、NuttX、FreeRTOS、eCos、Zephyrに移植。

現状は研究・ホビイスト用途が中心で、具体的な商用チップでの大規模採用事例は確認できていない。

## 出典

- [Wikipedia: OpenRISC](https://en.wikipedia.org/wiki/OpenRISC)
- [Wikipedia: OpenCores](https://en.wikipedia.org/wiki/OpenCores)
- [OpenCores FAQ](https://opencores.org/howto/faq)
- [openrisc.io: Architecture](https://openrisc.io/architecture)
- [openrisc.io: Implementations](https://openrisc.io/implementations)
- [openrisc.io: Software](https://openrisc.io/software)
- [GitHub: openrisc/mor1kx](https://github.com/openrisc/mor1kx)
- [Andrew Waterman, PhD Thesis, UC Berkeley (2016), §2.6](https://people.eecs.berkeley.edu/~krste/papers/EECS-2016-1.pdf)
- [Asanović & Patterson, "Instruction Sets Should Be Free" (2014)](https://www2.eecs.berkeley.edu/Pubs/TechRpts/2014/Archive/EECS-2014-146.pdf)

#isa #cpu-architecture #open-source
