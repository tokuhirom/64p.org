---
created: 2026-08-12 23:14
updated: 2026-08-12 23:36
---
# Cloud Hypervisor

Rust製のオープンソースVMM(Virtual Machine Monitor)。最小限のハードウェアエミュレーションでモダンなクラウドワークロードを動かすことに特化している。[[kvm|KVM]]およびMicrosoft Hypervisor(MSHV)上で動作し、x86-64・AArch64をサポート。Linux Foundation傘下のプロジェクト。 #virtualization #rust

## [[rust-vmm|rust-vmm]]との関係

rust-vmmプロジェクト（仮想化用のRust製クレートを各プロジェクト間で共有・再利用する取り組み）の理念を採用しており、コードの大部分は[[firecracker|Firecracker]]やcrosvmの実装をベースにしている。

## 特徴

- CPU・メモリ・デバイスのホットプラグに対応
- Windows/Linux両方のゲストOSを実行可能
- vhost-userによるデバイスオフロード
- 起動時間は約200ms
- Intelエンジニアが中心となりつつ、MicrosoftやArmなど他組織からの継続的なコントリビューションもある

## 用途

[[microvm|microVM]]型のVMMとして、[[hypeman|Hypeman]]など複数ハイパーバイザーを切り替え可能なランタイムの選択肢の一つに採用されている。

## [[microvm-ecosystem|コンテナ向け軽量VM技術]]の中での位置づけ

[[firecracker|Firecracker]]と並ぶ、土台となるVMM実装の一つ。

## 出典

- [GitHub - cloud-hypervisor/cloud-hypervisor](https://github.com/cloud-hypervisor/cloud-hypervisor)
- [Introduction - Cloud Hypervisor](https://www.cloudhypervisor.org/docs/prologue/introduction/)
- [Rust-Based Cloud Hypervisor Heads to Linux Foundation - The New Stack](https://thenewstack.io/rust-based-cloud-hypervisor-heads-to-linux-foundation/)
