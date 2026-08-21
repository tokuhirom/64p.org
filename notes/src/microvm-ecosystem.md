---
created: 2026-08-12 23:25
updated: 2026-08-21 21:23
---
# コンテナ向け軽量VM技術

コンテナのカーネル共有による分離の弱さを、VMレベルの分離で補おうとする一群の技術。[[microvm|microVM]]という土台技術の上に、それをコンテナのエコシステム(OCIイメージ・containerd・[[kubernetes|Kubernetes]])と繋ぐレイヤーが複数存在する。

#virtualization #moc

## さらに下の土台: カーネル側の仮想化基盤

- [[kvm|KVM]] — LinuxカーネルにビルトインされたCPU仮想化機能。デバイスエミュレーションは一切行わず、以下のVMM群がその役目を担う
- [[vm-exit|VM exit]] — ゲストが特権操作・I/Oを試みた瞬間にホストへ制御が戻る仕組み。KVMとVMM間の連携の核心

## I/Oインターフェースの標準: virtio

- [[virtio|virtio]] — ゲスト-ホスト間I/Oの準仮想化標準。フルデバイスエミュレーションより軽量で、以下のVMM群が共通して採用している

## 土台: VMM(Virtual Machine Monitor)

- [[microvm|microVM]] — デバイスモデルを最小化した軽量VMという概念そのもの。なぜ起動が速いかを解説
- [[firecracker|Firecracker]] — AWS製。AWS Lambda/Fargateを支えるmicroVM実装
- [[cloud-hypervisor|Cloud Hypervisor]] — Intel主導・Rust製。[[rust-vmm|rust-vmm]]由来でFirecrackerの実装を参考にしている
- [[rust-vmm|rust-vmm]] — Firecracker/crosvm/Cloud Hypervisorが共有する、Rust製VMM部品(クレート)群
- [[crosvm|crosvm]] — Google製。ChromeOS/Android向けに開発されたRust製VMM
- [[libkrun|libkrun]] — 別プロセスではなくライブラリとしてホストプロセスに組み込まれる、Firecracker/rust-vmm由来のVMM。crun/AIサンドボックス等の隔離バックエンドとして使われる
- [[qemu|QEMU]] — 2003年発。他のVMMと異なりmicroVM専用ではなく、幅広いアーキテクチャ・デバイスをフルエミュレートできる「何でも屋」

## コンテナエコシステムとの統合レイヤー

FirecrackerなどのVMMは素のカーネル+rootfsしか扱えないため、OCIイメージ/containerd/Kubernetesと繋ぐには別レイヤーが必要になる。

- [[kata-containers|Kata Containers]] — OpenStack Foundation発。OCI/CRI互換のコンテナランタイムとして、Firecracker/Cloud Hypervisor/[[qemu|QEMU]]など複数のVMMを横断的にバックエンドとして選べる
- [[firecracker-containerd|firecracker-containerd]] — AWS製。containerd専用のFirecracker統合プラグイン
- [[hypeman|Hypeman]] — Kernel社製。OCIイメージのpull・実行をDocker互換CLIで扱えるようにした、マルチハイパーバイザー対応のランタイム
- [[crackling|crackling]] — Encore社製。Linux上のFirecrackerとmacOS上の[[virtualization-framework|Virtualization.framework]]を統一APIで扱う抽象化レイヤー

## 出典

各ノートの出典セクションを参照。
