---
created: 2026-08-12 23:51
updated: 2026-08-12 23:51
---
# virtio

準仮想化(paravirtualization)デバイスの標準規格。ゲストOS側のデバイスドライバが「本物のハードウェアを模倣したフリ」をせず、最初から仮想環境向けに設計された軽量なプロトコルでホスト(VMM)と直接やり取りする。OASISが管理するオープン標準。 #virtualization

## 成り立ち

2007年、Rusty RussellがIBM研究所在籍時に、自身の`lguest`ハイパーバイザー向けに開発した。その後[[kvm|KVM]]の準仮想化I/Oデバイスの事実上の標準として広く採用されるようになった。

## なぜ必要か: フルデバイスエミュレーションとの対比

[[qemu|QEMU]]のようなVMMは、実在するNICやディスクコントローラ(例: Intel e1000)のレジスタ挙動までソフトウェアで再現する「フルデバイスエミュレーション」も可能だが、これはゲストのI/Oアクセスのたびに細かい互換性の再現が必要でオーバーヘッドが大きい。virtioは「どうせゲスト側もハイパーバイザー前提で動くなら、実機を装うのをやめて効率重視のインターフェースにしよう」という発想で設計されている。

## 仕組み: virtqueue

ゲストのドライバとホスト側のデバイス実装は、`virtqueue`と呼ばれる共有メモリ上のリングバッファを介して通信する。ゲストはバッファをキューに積み、ホストに「ドアベル」で通知する。処理が終わるとホストはゲストに割り込みで通知する。ポーリングを避けつつ、データコピーやトラップの回数を最小限に抑える設計になっている。

## 主なデバイス種別

virtio-net(ネットワーク)・virtio-blk(ブロックデバイス)・virtio-console(シリアルコンソール)・virtio-fs(ファイルシステム共有)・virtio-vsock(ホスト-ゲスト間ソケット通信)など。[[firecracker|Firecracker]]が提供する実質5種類のデバイスも、その大半がvirtioベース。

## rust-vmm/crosvmでの扱い

[[rust-vmm|rust-vmm]]はvirtioデバイス関連クレートを共通部品として提供しており、[[firecracker|Firecracker]]・[[cloud-hypervisor|Cloud Hypervisor]]・[[crosvm|crosvm]]など複数のVMMがそれを利用してvirtioデバイスを実装している。crosvmは各virtioデバイスを個別プロセスにforkする「process-per-device」設計を取っている。

## [[microvm-ecosystem|コンテナ向け軽量VM技術]]の中での位置づけ

[[firecracker|Firecracker]]・[[cloud-hypervisor|Cloud Hypervisor]]・[[crosvm|crosvm]]・[[qemu|QEMU]]が共通して採用する、ゲスト-ホスト間I/Oの標準インターフェース。[[microvm|microVM]]が高速に起動・動作できる理由の一つは、フルデバイスエミュレーションではなくvirtioのような軽量なI/Oに絞っていることにある。

## [[microvm-ecosystem|コンテナ向け軽量VM技術]]の中での位置づけ

[[kvm|KVM]]がCPU仮想化の土台であるのと同様に、virtioはI/O仮想化の共通土台。[[firecracker|Firecracker]]・[[cloud-hypervisor|Cloud Hypervisor]]・[[crosvm|crosvm]]・[[qemu|QEMU]]が共通して採用している。

## 出典

- [Virtual I/O Device (VIRTIO) Version 1.3 - OASIS](https://docs.oasis-open.org/virtio/virtio/v1.3/virtio-v1.3.html)
- [Virtio on Linux — The Linux Kernel documentation](https://docs.kernel.org/driver-api/virtio/virtio.html)
- [Virtio - KVM](https://www.linux-kvm.org/page/Virtio)
- [Virtqueues and virtio ring: How the data travels | Red Hat](https://www.redhat.com/en/blog/virtqueues-and-virtio-ring-how-data-travels)
