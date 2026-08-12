---
created: 2026-08-12 23:36
updated: 2026-08-12 23:42
---
# KVM (Kernel-based Virtual Machine)

LinuxカーネルにビルトインされたCPU仮想化機能。CPUが持つハードウェア仮想化支援機能(Intel VT-x / AMD-V)を、`/dev/kvm`というデバイスファイル経由でユーザー空間のプログラムに使わせる。2007年、Linuxカーネル2.6.20にマージされた。 #virtualization #linux

## KVM単体ではVMは動かない

KVMは**デバイスのエミュレーションを一切やらない**。ディスクI/O、ネットワークアダプタ、画面出力、USB、PCIデバイス、ファームウェア(BIOS相当)——これらはすべてKVMの管轄外で、QEMUや[[firecracker|Firecracker]]、[[cloud-hypervisor|Cloud Hypervisor]]のような「ユーザー空間のVMM」側が担当する。KVMが提供するのは「CPUを仮想的に走らせる」部分だけ。

## `/dev/kvm`とioctlインターフェース

VMMと`/dev/kvm`の間のやり取りはioctl呼び出しで行われる。

- `KVM_CREATE_VM` — VM用のファイルディスクリプタを作る
- `KVM_CREATE_VCPU` — 仮想CPU(1つのLinuxスレッドとして実装される)を割り当てる
- `KVM_SET_USER_MEMORY_REGION` — ゲストの物理メモリをVMのアドレス空間にマップする
- `KVM_RUN` — 実際にゲストCPUをホストCPU上で直接実行させる

VMMが`KVM_RUN`を呼ぶと、ゲストのコードがホストCPU上でほぼネイティブ速度で直接実行される。ゲストがI/Oを起こすなど「VM exit」が発生するとKVMから制御がVMM側に戻り、VMM側がそのデバイス動作をエミュレートしてからまたKVMに実行を戻す、というループになっている。

## なぜカーネル内蔵なのか

カーネルの一部として動くことで、Linuxが既に持っているプロセススケジューラ・メモリ管理・デバイスドライバの資産をそのまま仮想化にも使い回せる、という設計になっている。

## 実際に動かしてみる

QEMU等を使わず`/dev/kvm`のioctlを直接叩いて最小限のVMを起動する実験を[[kvm-hello-world-experiment|kvm-hello-world実験]]で行った。「VM exit」がどう発生し、ユーザー空間のVMMがどう処理するかを手を動かして確認できる。

## このシリーズの文脈での位置づけ

[[firecracker|Firecracker]]・[[cloud-hypervisor|Cloud Hypervisor]]・[[crosvm|crosvm]]は、いずれもこの「KVMというCPU仮想化の土台」の上に、自前のデバイスモデル(ミニマルなvirtioデバイス群など)を実装したVMMという位置づけになる。[[rust-vmm|rust-vmm]]の`kvm-ioctls`/`kvm-bindings`クレートは、この`/dev/kvm`のioctl呼び出しをRustから安全に扱うためのラッパー。

## [[microvm-ecosystem|コンテナ向け軽量VM技術]]の中での位置づけ

[[firecracker|Firecracker]]・[[cloud-hypervisor|Cloud Hypervisor]]・[[crosvm|crosvm]]が共通して依拠する、Linuxカーネル側のCPU仮想化基盤。

## 出典

- [Kernel-based Virtual Machine - Wikipedia](https://en.wikipedia.org/wiki/Kernel-based_Virtual_Machine)
- [What is KVM? | Red Hat](https://www.redhat.com/en/topics/virtualization/what-is-KVM)
- [Using the KVM API - LWN.net](https://lwn.net/Articles/658511/)
- [The Definitive KVM API Documentation](https://docs.kernel.org/virt/kvm/api.html)
- [From Emulation to Virtualization: How QEMU and KVM Work Together](https://medium.com/@kuldeepranjan39/virtualization-d677d8390d31)
