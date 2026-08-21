---
created: 2026-08-17 20:26
updated: 2026-08-21 21:23
---
# Hypervisor.framework

Appleが提供するmacOS向けの低レベル仮想化API。サードパーティ製カーネル拡張(kext)なしに、CPU・メモリの仮想化機能をユーザー空間から利用できるようにする。[[kvm|KVM]]のmacOS版に相当する、仮想化スタックの最下層。 #virtualization #macos

## API

- `hv_vm_create`でVMを作成、`hv_vm_map`でゲストにメモリを割り当て、`hv_vcpu_create`/`hv_vcpu_run`でvCPUを生成・実行するという、意図的にミニマルな一連のC API群
- デバイスエミュレーションは一切提供しない。VMM実装者が[[virtio|virtio]]等のデバイスモデルを自前で用意する必要がある
- 利用には`com.apple.security.hypervisor`エンタイトルメントが必要
- Intel Mac・Apple Silicon Mac双方に対応しており、Intel Mac時代のDocker Desktopなどの仮想化基盤としても使われてきた

## [[kvm|KVM]]との比較

KVMがioctl呼び出しでカーネルのデバイスファイルを操作する設計であるのに対し、Hypervisor.frameworkはクリーンなC関数群として提供される。低レベル・ミニマルという設計思想は共通しており、[[libkrun|libkrun]]・[[crosvm|crosvm]]・[[cloud-hypervisor|Cloud Hypervisor]]など、KVMベースのVMMをmacOSへ移植する際のバックエンドとしてよく使われる。

## Virtualization.frameworkとの違い

Appleはより高レベルのAPIとして[[virtualization-framework|Virtualization.framework]]も別途提供している。Hypervisor.frameworkがCPU/メモリ仮想化のみを扱う低レベルAPIであるのに対し、Virtualization.frameworkはデバイスモデルやゲストOSブートまで含めてmacOS/Linuxの仮想マシンを丸ごと作成できる高レベルAPI。libkrunのような軽量VMMは、デバイスモデルを自前で持つため低レベルなHypervisor.frameworkの方を土台として選ぶ。

## 出典

- [Hypervisor | Apple Developer Documentation](https://developer.apple.com/documentation/hypervisor)
- [Arm VMM with Apple's Hypervisor Framework](https://www.whexy.com/en/posts/simpple_01)
- [Bring Your Own VM - Mac Edition - XPN InfoSec Blog](https://blog.xpnsec.com/bring-your-own-vm-mac-edition/)
