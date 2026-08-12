---
created: 2026-08-12 23:47
updated: 2026-08-12 23:47
---
# QEMU

汎用のマシンエミュレータ兼VMM(Virtual Machine Monitor)。x86・ARM・PowerPC・RISC-Vなど多数のCPUアーキテクチャをエミュレートでき、ホストと異なるアーキテクチャのバイナリもそのまま動かせる(QEMU user-mode emulation)。 #virtualization

## 成り立ち

2003年、Fabrice BellardがQEMUの開発を開始し、2005年のv0.7.1まで一人で開発した。BellardはFFmpegやTiny C Compilerの作者としても知られる。現在はPeter Maydellらを含むQEMUチームによって開発が続けられている。

## 動的バイナリ変換(TCG)

QEMUのコアには「Tiny Code Generator(TCG)」というJITコンパイラがあり、ゲストの命令列をホストのネイティブコードへ動的に変換・キャッシュしながら実行する(動的バイナリ変換)。これによりハードウェア仮想化支援機能なしでも任意のCPUアーキテクチャをソフトウェアだけでエミュレートできるが、ネイティブ実行に比べて一般に10倍程度遅くなるとされる。

## [[kvm|KVM]]との役割分担

[[kvm|KVM]]と組み合わせて使う場合、QEMUは「アクセラレータ」としてKVMを利用する。役割はきれいに分かれている。

- **KVM**: CPUの仮想化のみを担当。ディスク・ネットワーク・画面などのデバイスは一切エミュレートしない
- **QEMU**: ゲストから見えるあらゆるデバイスのエミュレーションを担当。ゲストがI/Oを起こして「VM exit」すると、KVMから制御がQEMUに戻り、QEMUがそのデバイス動作をソフトウェアでエミュレートしてから、また実行をKVMに戻す

ハードウェア仮想化支援がない環境や、KVMが対応していないアーキテクチャの組み合わせでは、QEMUは自身のTCGだけでCPUもソフトウェア的にエミュレートして動作する(KVM非使用モード)。

## [[microvm-ecosystem|コンテナ向け軽量VM技術]]の中での位置づけ

[[firecracker|Firecracker]]・[[cloud-hypervisor|Cloud Hypervisor]]・[[crosvm|crosvm]]と並ぶ、[[kvm|KVM]]を土台に使えるVMMの一つ。ただしQEMUはこれらと異なり2003年発でmicroVM専用に設計されたものではなく、幅広いデバイス・アーキテクチャをフルエミュレートする「何でも屋」という性格が強い。[[hypeman|Hypeman]]や[[kata-containers|Kata Containers]]は、対応VMMの選択肢の一つとしてQEMUも選べる。

## [[microvm-ecosystem|コンテナ向け軽量VM技術]]の中での位置づけ

[[firecracker|Firecracker]]・[[cloud-hypervisor|Cloud Hypervisor]]・[[crosvm|crosvm]]と並ぶ、[[kvm|KVM]]を使えるVMMの一つ。他の3つがmicroVM専用に設計されているのに対し、QEMUは幅広いアーキテクチャ・デバイスをフルエミュレートできる「何でも屋」という違いがある。

## 出典

- [QEMU - Wikipedia](https://en.wikipedia.org/wiki/QEMU)
- [Introduction — QEMU documentation](https://www.qemu.org/docs/master/system/introduction.html)
- [KVM vs QEMU: Architecture, Performance, and the Critical Difference](https://www.diskinternals.com/vmfs-recovery/kvm-vs-qemu/)
- [Virtualization Internals Part 4 - QEMU | Saferwall](https://docs.saferwall.com/blog/virtualization-internals-part-4-qemu/)
- [QEMU, a Fast and Portable Dynamic Translator | USENIX](https://www.usenix.org/legacy/event/usenix05/tech/freenix/full_papers/bellard/bellard.pdf)
