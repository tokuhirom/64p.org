---
created: 2026-08-12 23:14
updated: 2026-08-12 23:14
---
# microVM

デバイスモデルを最小限まで削ぎ落とした軽量な仮想マシン、およびそれを実現する仕組み。伝統的なVMが持つカーネルレベルの分離を保ちつつ、コンテナ並みの起動速度・リソース効率を狙う。 #virtualization

## 特徴

- 起動時間はミリ秒〜数百ミリ秒程度（伝統的なVMは秒〜分単位）
- 1台あたりのメモリオーバーヘッドが数MiB程度と小さい
- レガシーなデバイスエミュレーション・幅広いハードウェアサポートなど、クラウドワークロードに不要な機能を削ぎ落とし、アタックサーフェスと起動時間を削減している
- 各microVMは専用のカーネル・専用のメモリ空間・仮想化されたデバイスを持ち、コンテナのようなカーネル共有はしない

## 代表的な実装

- [[firecracker|Firecracker]] — AWSが開発。AWS Lambda/Fargateを支える
- [[cloud-hypervisor|Cloud Hypervisor]] — Intel主導、Rust製。rust-vmmプロジェクトの成果を活用

## 用途

サーバーレス実行環境やAIエージェント向けサンドボックスなど、マルチテナントで多数の短命なワークロードを高速に隔離・起動する必要がある場面で採用される。[[hypeman|Hypeman]]はFirecracker/Cloud Hypervisor/QEMU/Apple Virtualization.frameworkを切り替え可能な形で統一的に扱うランタイム。

## 出典

- [What is a microVM? - Koyeb](https://www.koyeb.com/blog/what-is-a-microvm)
- [What is AWS Firecracker? The microVM technology, explained | Northflank](https://northflank.com/blog/what-is-aws-firecracker)
