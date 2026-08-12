---
created: 2026-08-12 23:23
updated: 2026-08-12 23:51
---
# Kata Containers

VMの持つセキュリティ上の分離性と、コンテナの持つ速度・軽量性を両立させることを目指すコンテナランタイム。コンテナ1個ごとに軽量VMを立ち上げ、その中でコンテナプロセスを動かす。OCIランタイム仕様・Kubernetesのcontainer runtime interface(CRI)双方に対応している。 #virtualization

## 成り立ち

2017年、OpenStack Foundationの主導で、IntelのClear Containersプロジェクトと、HyperのrunV技術を統合する形で発足。2017年12月にpilotプロジェクトとなり、OpenStack Foundationにとって最初のtop-level Open Infrastructureプロジェクトとして承認された。OpenStack Foundation配下ではあるが、独自の技術ガバナンス・コントリビューター基盤を持つ独立したプロジェクトとして運営されている。

## 動作の仕組み

コンテナ(OCIイメージ由来のrootfs)ごとに専用の軽量VMを起動し、その中でコンテナプロセスを実行する。ハイパーバイザーは特定の実装に固定されておらず、[[firecracker|Firecracker]]・[[cloud-hypervisor|Cloud Hypervisor]]・[[qemu|QEMU]]など複数のVMMをバックエンドとして選択できる。Firecracker利用時は、containerdのdevmapperスナップショッタでコンテナのrootfsをdevice mapperスナップショットとして扱い、[[virtio|virtio]] blockデバイスとしてVMにホットプラグする構成を取る。

## [[firecracker-containerd|firecracker-containerd]]との違い

どちらもFirecrackerをバックエンドにコンテナへVM分離を与える点は共通するが、Kata ContainersはOCI/CRI互換のコンテナランタイムそのものとして複数のVMM・複数のコンテナランタイム統合先を横断的にサポートするのに対し、firecracker-containerdはAWSが開発しているcontainerd専用のFirecracker統合という位置づけの違いがある。

## [[microvm-ecosystem|コンテナ向け軽量VM技術]]の中での位置づけ

複数のVMMを横断的にバックエンドとして選べる、OCI/CRI互換のコンテナランタイム統合レイヤー。

## 出典

- [Kata Containers Confirmed as First New Top-Level Open Infrastructure Project by OpenStack Foundation](https://katacontainers.io/blog/kata-containers-confirmed-as-first-new-top-level-open-infrastructure-project-by-openstack-foundation/)
- [Kata Containers: Build and configure Firecracker | CloudKernels](https://cloudkernels.github.io/posts/kata-build-configure-fc/)
- [kata-containers/docs/how-to/how-to-use-kata-containers-with-firecracker.md](https://github.com/kata-containers/kata-containers/blob/main/docs/how-to/how-to-use-kata-containers-with-firecracker.md)
