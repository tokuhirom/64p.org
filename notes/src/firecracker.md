---
created: 2026-08-12 23:14
updated: 2026-08-12 23:14
---
# Firecracker

AWSが開発したオープンソースの[[microvm|microVM]]向けVMM(Virtual Machine Monitor)。LinuxのKVMを使って軽量な仮想マシンを作成・実行する。Apache License 2.0。 #virtualization #aws

## 性能

- microVMの起動時間は最短125ミリ秒
- 1VMあたりのメモリオーバーヘッドは5MiB未満
- 単一ホスト上で毎秒最大150台のmicroVMを作成可能

## 設計思想

不要なデバイスやゲスト向け機能を排除したミニマリストな設計。これによりメモリフットプリントとアタックサーフェスを削減しつつ、起動時間の短縮とハードウェア利用効率の向上を実現している。

## 用途

AWS LambdaおよびAWS Fargateを支える基盤技術として、月間数兆回規模の関数実行を処理している。サーバーレス関数に限らず、AIコードの実行サンドボックスなど幅広いワークロードでも採用が広がっている。[[cloud-hypervisor|Cloud Hypervisor]]の実装コードの一部はFirecrackerの実装を参考にしている。

## 出典

- [Announcing the Firecracker Open Source Technology | AWS Open Source Blog](https://aws.amazon.com/blogs/opensource/firecracker-open-source-secure-fast-microvm-serverless/)
- [GitHub - firecracker-microvm/firecracker](https://github.com/firecracker-microvm/firecracker)
- [What is AWS Firecracker? The microVM technology, explained | Northflank](https://northflank.com/blog/what-is-aws-firecracker)
