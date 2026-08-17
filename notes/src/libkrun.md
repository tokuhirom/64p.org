---
created: 2026-08-17 20:23
updated: 2026-08-17 20:23
---
# libkrun

[[kvm|KVM]](Linux)または[[hypervisor-framework|Hypervisor.framework]](macOS/ARM64)を通じて、プロセスを[[microvm|microVM]]単位で隔離するための動的ライブラリ。ホストプロセスのメモリ空間に最小限のVMM(Virtual Machine Monitor)を組み込み、C APIとして公開することで、microVM相当の強いセキュリティ境界をコンテナ並みの軽さで得ることを狙う。 #virtualization #rust #container

## 設計

- 実装は主にRustで、C APIを公開。ホストアプリケーションはこのAPIを呼ぶだけで軽量microVMを作成・管理できる
- 外部ハイパーバイザーに依存しない自己完結型のVMM
- エミュレートするデバイスは[[virtio|virtio]]系のみに絞り込み、起動の速さとメモリフットプリントの小ささを実現
- [[firecracker|Firecracker]]・[[rust-vmm|rust-vmm]]・[[cloud-hypervisor|Cloud Hypervisor]]のコードを取り込んで構築されている
- AMD SEV/SEV-ES/SEV-SNP対応版、Intel TDX対応版も別途提供されており、機密コンピューティング(Confidential Computing)用途も見据えている

## エコシステム

- **crun**の`krun`ハンドラ — [[crun|crun]]がコンテナ・機密ワークロードを仮想化ベースで隔離する際のバックエンドとして使う
- **krunkit** — macOS上でGPU対応の軽量VMを実行
- **muvm** — GPUアクセラレーション付きmicroVMの起動
- **Microsandbox** — AIエージェント向けサンドボックスとして採用、平均100ms未満の起動を謳う

## 現状

mainブランチはlibkrun 2.0系で、1.x系とAPI/ABIの後方互換性はない。2.0のAPIはまだ開発中。セキュリティ連絡先が`libkrun-security@redhat.com`であることから、Red Hat関連のプロジェクトと見られる。

## [[microvm-ecosystem|コンテナ向け軽量VM技術]]の中での位置づけ

[[firecracker|Firecracker]]・[[cloud-hypervisor|Cloud Hypervisor]]・[[crosvm|crosvm]]と並ぶVMM実装の一つ。他のVMMが「別プロセスとして起動しコンテナランタイムから呼び出される」のに対し、libkrunはライブラリとしてホストプロセスに直接組み込まれる点が異なる。

## 出典

- [GitHub - libkrun/libkrun](https://github.com/libkrun/libkrun)
- [libkrun/README.md at main · libkrun/libkrun](https://github.com/libkrun/libkrun/blob/main/README.md)
- [containers/libkrun | DeepWiki](https://deepwiki.com/containers/libkrun)
- [crun/krun.1.md at main · containers/crun](https://github.com/containers/crun/blob/main/krun.1.md)
