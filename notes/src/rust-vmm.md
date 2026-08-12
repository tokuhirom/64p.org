---
created: 2026-08-12 23:27
updated: 2026-08-12 23:47
---
# rust-vmm

VMM(Virtual Machine Monitor)を作るためのRust製部品(クレート)を共有するプロジェクト。[[kvm|KVM]] ioctlの呼び出し、VMのメモリ管理、virtioデバイスとのやり取りなど、複数のVMM実装で重複しがちな部分を共通クレートとして切り出し、車輪の再発明を防ぐことを目的とする。 #virtualization #rust

## 成り立ち

2018年12月、Amazon・Google・Intel・Red Hatの開発者が、VMM作成コードを共有する方法について議論したことから発足した。きっかけは、Rust製VMMである[[crosvm|crosvm]]（Google/ChromeOS発）と[[firecracker|Firecracker]]（AWS発）が、[[kvm|KVM]]呼び出しやメモリ管理まわりで似たようなコードを別々に持っていたこと。この重複を解消し、以後Rust製VMMを書く際に同じ実装を繰り返さずに済むようにする狙いがあった。

## 主なクレート

- `kvm-bindings` / `kvm-ioctls` — [[kvm|KVM]]カーネルヘッダへのRust FFIバインディングと、それをラップする機能
- `vm-memory` — VMのゲストメモリを扱うための共通トレイト。VMMの各コンポーネントが実装の詳細を知らずに物理メモリへアクセスできるようにする
- virtioデバイス関連クレートおよび`vhost`パッケージ — デバイスエミュレーション用
- Microsoft Hyper-V・Xenのハイパーコールインターフェース、Linuxカーネルローダーへの対応も含む

## ガバナンス

特定企業に閉じたプロジェクトではなく、Alibaba・AWS・Crowdstrike・Intel・Google・Linaro・Red Hatなどの企業から参加する開発者、および個人コントリビューターによる共同所有・共同運営の体制を取っている。

## 採用プロジェクト

[[firecracker|Firecracker]]・[[crosvm|crosvm]]に加え、[[cloud-hypervisor|Cloud Hypervisor]]もrust-vmmの理念を採用しており、実装コードの大部分がFirecrackerやcrosvmをベースにしている。[[qemu|QEMU]]のvirtiofsd実装や`vhost-device`なども取り込まれている。

## どこまで簡単にVMMを作れるか

rust-vmm公式が「rust-vmmクレート＋最小限の接着コード」で構成される`vmm-reference`という参照実装を公開している。これをforkして部品を組み替えれば、[[kvm|KVM]]ベースの最小限のVMMのたたき台はすぐ作れる。難しいのはKVM呼び出し自体よりも「どんなデバイスモデルにするか」の設計判断だという指摘もある。

一方で、Firecracker相当の製品に届くにはまだ距離がある。`vmm-reference`自体、デバイスのホットプラグ・VMの一時停止/再開・スナップショット・ライブマイグレーションを(少なくとも初期時点では)サポートしていないと明言している。加えてFirecrackerが持つjailerによるプロセス隔離やseccompフィルタでのシステムコール制限といったセキュリティハードニング、REST APIサーバー、豊富なテスト・ファジングは、rust-vmmのクレートを組み合わせただけでは付いてこず、Firecracker自身が長年かけて積み上げてきた部分になる。

## [[microvm-ecosystem|コンテナ向け軽量VM技術]]の中での位置づけ

[[firecracker|Firecracker]]・[[cloud-hypervisor|Cloud Hypervisor]]など、土台となる複数のVMM実装が共有する部品群。

## 出典

- [GitHub - rust-vmm/rust-vmm: The rust-vmm monorepo](https://github.com/rust-vmm/rust-vmm)
- [Building the virtualization stack of the future with rust-vmm | Opensource.com](https://opensource.com/article/19/3/rust-virtual-machine)
- [community/README.md at main · rust-vmm/community](https://github.com/rust-vmm/community/blob/main/README.md)
- [History of Cloud-hypervisor | Michael Zhao](https://medium.com/@michael2012zhao_67085/history-of-cloud-hypervisor-138568b2fc1f)
- [GitHub - rust-vmm/vmm-reference](https://github.com/rust-vmm/vmm-reference)
- [vmm-reference/docs/DESIGN.md](https://github.com/rust-vmm/vmm-reference/blob/main/docs/DESIGN.md)
