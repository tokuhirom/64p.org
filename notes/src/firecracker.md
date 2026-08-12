---
created: 2026-08-12 23:14
updated: 2026-08-12 23:25
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

## OCIイメージは直接扱えない

FirecrackerはVMMであり、扱うのはカーネルイメージとrootfsのブロックデバイスイメージ(ext4等)のみ。OCIイメージという概念自体を解釈する機能は持たない。OCIイメージをFirecracker上で動かすには、事前にレイヤーをrootfsのext4イメージへ変換するレイヤーが別途必要になる。代表的なアプローチ:

- 手動変換 — コンテナのrootfsをtar化し、空のext4イメージへ展開する
- Weave Ignite — OCIイメージのrootfsをそのままVMのrootfsとして起動する
- [[firecracker-containerd|firecracker-containerd]] — containerdのプラグインとしてFirecrackerをコンテナの分離レイヤーに使う
- [[kata-containers|Kata Containers]] — containerdのdevmapperスナップショッタで、コンテナのrootfsをvirtio blockデバイスとしてVMにホットプラグする

[[hypeman|Hypeman]]は、この「OCIイメージ→VM rootfs変換」レイヤーを自前で実装し、Docker互換の使い勝手を提供している。

## [[microvm-ecosystem|コンテナ向け軽量VM技術]]の中での位置づけ

[[cloud-hypervisor|Cloud Hypervisor]]と並ぶ、土台となるVMM実装の一つ。

## 出典

- [Announcing the Firecracker Open Source Technology | AWS Open Source Blog](https://aws.amazon.com/blogs/opensource/firecracker-open-source-secure-fast-microvm-serverless/)
- [GitHub - firecracker-microvm/firecracker](https://github.com/firecracker-microvm/firecracker)
- [What is AWS Firecracker? The microVM technology, explained | Northflank](https://northflank.com/blog/what-is-aws-firecracker)
- [GitHub - arcboxlabs/oci2rootfs](https://github.com/arcboxlabs/oci2rootfs)
- [GitHub - weaveworks/ignite](https://github.com/weaveworks/ignite)
- [Kata Containers: how-to-use-kata-containers-with-firecracker.md](https://github.com/kata-containers/kata-containers/blob/main/docs/how-to/how-to-use-kata-containers-with-firecracker.md)
