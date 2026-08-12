---
created: 2026-08-12 23:29
updated: 2026-08-12 23:51
---
# crosvm

Googleが開発するRust製の[[microvm|軽量VM]]向けVMM(Virtual Machine Monitor)。元々はChromeOS上でLinux環境(Crostini)やAndroidゲスト(ARCVM)を動かすために開発されたが、現在はAndroidのTerminal App、Cuttlefish、Windowsなど複数の製品・プラットフォームで使われている。 #virtualization #rust

## セキュリティ設計: process-per-deviceモデル

- Main Processがゲストの初期化と中核のオーケストレーションを担当
- 各[[virtio|virtio]]デバイスは個別のDevice Processとしてforkされる(process-per-device)
- 各デバイスプロセスはMinijailでVFS/PID/User/Networkの名前空間分離により隔離され、そのデバイスに必要なシステムコールのみを許可する厳格なBPFフィルタが適用される

強い隔離とメモリ安全な実装によるセキュリティを重視した設計思想を持つ。

## 機能

io_uring・vhost、内部の非同期ランタイム(`cros_async`)を活用し、モダンなワークロード向けに最適化されている。virtio-fs/virtio-9pによるファイルシステム共有のほか、Console・RNG・Balloon・Vsock・TPM・Pmem・ビデオデコード/エンコードなど幅広い[[virtio|virtio]]デバイスに対応する。

## [[rust-vmm|rust-vmm]]との関係

[[firecracker|Firecracker]]と並び、rust-vmmプロジェクト発足のきっかけとなった2つのRust製VMMの一つ。[[kvm|KVM]]呼び出しやメモリ管理まわりでFirecrackerと似たコードを別々に持っていたことが、rust-vmmでのクレート共有につながった。

## [[microvm-ecosystem|コンテナ向け軽量VM技術]]の中での位置づけ

[[firecracker|Firecracker]]・[[cloud-hypervisor|Cloud Hypervisor]]と並ぶ、土台となるVMM実装の一つ。ChromeOS/Android向けという出自の点で、サーバーレス/クラウド向けの他2つとは主戦場が異なる。

## 出典

- [GitHub - google/crosvm](https://github.com/google/crosvm)
- [crosvm/README.md at main · google/crosvm](https://github.com/google/crosvm/blob/main/README.md)
- [crosvm - Rust](https://crosvm.dev/doc/crosvm/index.html)
