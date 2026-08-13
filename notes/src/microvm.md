---
created: 2026-08-12 23:14
updated: 2026-08-13 22:06
---
# microVM

デバイスモデルを最小限まで削ぎ落とした軽量な仮想マシン、およびそれを実現する仕組み。伝統的なVMが持つカーネルレベルの分離を保ちつつ、コンテナ並みの起動速度・リソース効率を狙う。 #virtualization

## 特徴

- 起動時間はミリ秒〜数百ミリ秒程度（伝統的なVMは秒〜分単位）
- 1台あたりのメモリオーバーヘッドが数MiB程度と小さい
- レガシーなデバイスエミュレーション・幅広いハードウェアサポートなど、クラウドワークロードに不要な機能を削ぎ落とし、アタックサーフェスと起動時間を削減している
- 各microVMは専用のカーネル・専用のメモリ空間・仮想化されたデバイスを持ち、コンテナのようなカーネル共有はしない

## なぜ起動が速いか

[[firecracker|Firecracker]]を例にすると、主に3つの要因が重なっている。

1. **BIOS・ブートローダーを省略した直接カーネルブート** — Linuxカーネル自体は[[bios|BIOS]]/ブートローダーを必須としない。「64-bit Linux Boot Protocol」を使い、16-bitリアルモードからではなくカーネルのprotected-modeエントリポイントへ直接ジャンプする。ACPIテーブルもカーネル起動に必要な最小限しか用意しない。
2. **最小限のデバイスモデル** — USB・PCIバス・レガシーデバイスなど不要なハードウェアエミュレーションを排除。Firecrackerが提供するデバイスは実質5種類のみ([[virtio|virtio]]-net、virtio-block、virtio-vsock、シリアルコンソール、最小限のキーボードコントローラ)。
3. **ミニマルなVMMコード** — 汎用ハイパーバイザーが持つ幅広いハードウェアサポートのコードパスを持たないため、実行すべきコード量自体が少ない。

これらにより、Firecrackerでは起動125ミリ秒未満・メモリオーバーヘッド5MiB未満を実現している。[[hypeman|Hypeman]]のstandby/restoreのような、起動済みVMのスナップショットからの復元（ミリ秒単位）を使えばさらに短縮できる。

## 代表的な実装

- [[firecracker|Firecracker]] — AWSが開発。AWS Lambda/Fargateを支える
- [[cloud-hypervisor|Cloud Hypervisor]] — Intel主導、Rust製。[[rust-vmm|rust-vmm]]プロジェクトの成果を活用

## 用途

サーバーレス実行環境やAIエージェント向けサンドボックスなど、マルチテナントで多数の短命なワークロードを高速に隔離・起動する必要がある場面で採用される。[[hypeman|Hypeman]]はFirecracker/Cloud Hypervisor/[[qemu|QEMU]]/Apple Virtualization.frameworkを切り替え可能な形で統一的に扱うランタイム。

## [[microvm-ecosystem|コンテナ向け軽量VM技術]]の中での位置づけ

コンテナ向け軽量VM技術群の土台となる概念そのもの。

## 出典

- [What is a microVM? - Koyeb](https://www.koyeb.com/blog/what-is-a-microvm)
- [What is AWS Firecracker? The microVM technology, explained | Northflank](https://northflank.com/blog/what-is-aws-firecracker)
- [firecracker/FAQ.md at main · firecracker-microvm/firecracker](https://github.com/firecracker-microvm/firecracker/blob/main/FAQ.md)
- [How AWS Firecracker works: a deep dive – Unixism](https://unixism.net/2019/10/how-aws-firecracker-works-a-deep-dive/)
- [firecracker/docs/rootfs-and-kernel-setup.md at main · firecracker-microvm/firecracker](https://github.com/firecracker-microvm/firecracker/blob/main/docs/rootfs-and-kernel-setup.md)
