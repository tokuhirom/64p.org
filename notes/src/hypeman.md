---
created: 2026-08-12 23:14
updated: 2026-08-21 21:23
---
# Hypeman

[Kernel](https://www.kernel.sh)社（"Crazy fast, open source infra for AI agents to access the Internet"を掲げる企業）が開発する、OCIコンテナイメージを[[microvm|microVM]]上で動かすマルチハイパーバイザーランタイム。Go製、MITライセンス。2025年10月にリポジトリ作成、star数310（2026年8月時点）。 #virtualization #go

## コンセプト

コンテナ（OCIイメージ）を、Dockerのような名前空間分離ではなくVM上で動かす。VMベースにすることでカーネルレベルの分離を確保しつつ、Docker互換のCLI体験(`run`/`exec`/`stop`/`ps`/`logs`/`pull`)を提供する。

## 対応ハイパーバイザー

- Linux: [[cloud-hypervisor|Cloud Hypervisor]]、[[firecracker|Firecracker]]、[[qemu|QEMU]]（[[kvm|KVM]]必須）
- macOS: Apple Silicon上の[[virtualization-framework|Virtualization.framework]]（Rosetta経由でlinux/amd64イメージも実行可）

## 主な機能

- **Standby/restore**: VMをディスクにスナップショットしてミリ秒単位で再開できる
- **組み込みIngress**: TLS終端・サブドメインルーティング対応のリバースプロキシを内蔵
- **GPUパススルー**: vGPU/VFIOデバイス対応
- **リモートAPI**: JWT認証されたサーバーと別CLIクライアントによるリモート操作
- **リモートレジストリへのpush**: キャッシュ済みイメージをAWS ECR/Docker Hub/ghcrなど任意のOCIレジストリへdocker流の一時的な認証情報貸与方式でエクスポート可能

## 位置づけ

Firecracker/Cloud HypervisorのようなVMM(Virtual Machine Monitor)単体を、Docker的な使い勝手のCLI/APIで統一的に扱えるようにするレイヤー。開発元がAI agent向けインフラ企業であることから、サンドボックス実行環境としての用途が想定されると見られる（README上に明記はないため推測）。

## [[microvm-ecosystem|コンテナ向け軽量VM技術]]の中での位置づけ

VMMを直接扱わず、OCIイメージのpull・実行というDocker互換の使い勝手を提供する統合レイヤーの一つ。

## 出典

- [GitHub - kernel/hypeman](https://github.com/kernel/hypeman)
- [Kernel](https://www.kernel.sh)
