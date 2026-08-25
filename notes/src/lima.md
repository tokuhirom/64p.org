---
created: 2026-08-25 17:41
updated: 2026-08-25 17:41
---
# Lima

macOS上でLinux仮想マシンを手軽に動かすためのOSSツール。「LInux MAchines」の略。[lima-vm/lima](https://github.com/lima-vm/lima)。ファイル共有・ポートフォワーディングを自動でセットアップし、`limactl start`だけでLinux VM内のシェルにアクセスできる状態を作る。もともとはcontainerd/nerdctlをMacユーザーに広めることが目的だったが、Docker・Podman・Kubernetesなど他のコンテナランタイムでも使われる。[[colima|Colima]]はLimaを土台にした、Docker互換ランタイムに特化したラッパー。

## VMバックエンド(vmType)

- **QEMU** — Linuxホストではデフォルト。エミュレーションも含め幅広いアーキテクチャに対応でき、`vmType: qemu`かつ異なるCPUアーキテクチャを指定すればクロスアーキテクチャVM(Intel-on-ARM/ARM-on-Intel)も動かせる。
- **vz** — macOS 13.5以降ではこちらがデフォルト。Appleの[[virtualization-framework|Virtualization.framework]]を直接利用するバックエンドで、QEMUより高速。

## ファイル共有・ポートフォワーディング

ファイル共有にはReverse SSHFS、virtio-9p-pci(QEMUのデフォルト)、[[virtio|virtiofs]](vzのデフォルト)のいずれかが使われる。ポートフォワーディングは通常SSH経由だが、vzバックエンド＋systemd v256以降のゲスト(Ubuntu 24.10+等)ではAF_VSOCKを使った通信に切り替わり、従来の仮想ネットワーク経由より高速になる。vzNATというネットワーク方式もvzゲスト限定でさらに高速。

## 出典

- [Lima: Linux Machines | Lima](https://lima-vm.io/docs/)
- [GitHub - lima-vm/lima](https://github.com/lima-vm/lima)
- [VM types | Lima](https://lima-vm.io/docs/config/vmtype/)
- [Port Forwarding | Lima](https://lima-vm.io/docs/config/port/)

#virtualization #macos
