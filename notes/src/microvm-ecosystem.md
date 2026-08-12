---
created: 2026-08-12 23:25
updated: 2026-08-12 23:27
---
# コンテナ向け軽量VM技術

コンテナのカーネル共有による分離の弱さを、VMレベルの分離で補おうとする一群の技術。[[microvm|microVM]]という土台技術の上に、それをコンテナのエコシステム(OCIイメージ・containerd・Kubernetes)と繋ぐレイヤーが複数存在する。

#virtualization #moc

## 土台: VMM(Virtual Machine Monitor)

- [[microvm|microVM]] — デバイスモデルを最小化した軽量VMという概念そのもの。なぜ起動が速いかを解説
- [[firecracker|Firecracker]] — AWS製。AWS Lambda/Fargateを支えるmicroVM実装
- [[cloud-hypervisor|Cloud Hypervisor]] — Intel主導・Rust製。[[rust-vmm|rust-vmm]]由来でFirecrackerの実装を参考にしている
- [[rust-vmm|rust-vmm]] — Firecracker/crosvm/Cloud Hypervisorが共有する、Rust製VMM部品(クレート)群

## コンテナエコシステムとの統合レイヤー

FirecrackerなどのVMMは素のカーネル+rootfsしか扱えないため、OCIイメージ/containerd/Kubernetesと繋ぐには別レイヤーが必要になる。

- [[kata-containers|Kata Containers]] — OpenStack Foundation発。OCI/CRI互換のコンテナランタイムとして、Firecracker/Cloud Hypervisor/QEMUなど複数のVMMを横断的にバックエンドとして選べる
- [[firecracker-containerd|firecracker-containerd]] — AWS製。containerd専用のFirecracker統合プラグイン
- [[hypeman|Hypeman]] — Kernel社製。OCIイメージのpull・実行をDocker互換CLIで扱えるようにした、マルチハイパーバイザー対応のランタイム

## 出典

各ノートの出典セクションを参照。
