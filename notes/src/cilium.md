---
created: 2026-08-13 08:33
updated: 2026-08-14 08:21
---
# Cilium

Docker/[[kubernetes|Kubernetes]]などのコンテナプラットフォーム上で、アプリケーションサービス間のネットワーク接続を透過的に保護するオープンソースソフトウェア。土台は[[bpf|eBPF]]で、Linuxカーネル内で動的にネットワーキング・セキュリティロジックを挿入できるこの技術により、アプリケーションコードやコンテナ設定を変更することなくポリシーの適用・更新ができる。 #networking #kubernetes #security

## 主な機能

- **ネットワーキング**: オーバーレイネットワーク・ネイティブルーティングなど柔軟なルーティングオプションを提供。eBPFベースの分散ロードバランシングにより、従来iptablesベースだったkube-proxyを置き換えられる
- **セキュリティ(Network Policy)**: IPアドレスへの依存から脱却し、ID・ラベルベースのセキュリティモデルを実現。Kubernetes標準のNetworkPolicy(L3/L4)に加え、CiliumNetworkPolicyとしてL7(HTTPメソッド/パスフィルタ、DNSベースのegress、FQDNポリシー)まで対応する
- **Hubble(Observability)**: 完全に分散されたネットワーク可視化プラットフォーム。ノードごとにフローをキャプチャし、Hubble relayでクラスタ全体に集約、CLI/UIで閲覧できる。サービス依存関係マップ・HTTPフロー・DNS問題の検出・レイテンシ分析が可能
- **[[service-mesh|Service Mesh]]**: サイドカーを使わない設計が特徴。L3/L4はeBPFで処理し、L7が必要な場合のみノードレベルのEnvoyを使う。WireGuardやIPsecによる透過的暗号化、SPIFFE/SPIRE連携によるmTLSもサポートする

## エコシステムでの位置づけ

CNCFのプロジェクトとして2023年にGraduated(卒業)ステータスに到達している。Google Kubernetes Engine(GKE Autopilot)のデフォルトCNI、Amazon EKSの推奨CNI、Azure AKSの組み込みオプションとして採用されるなど、主要クラウドのマネージドKubernetesに組み込まれている。動作にはLinux 5.4以降が必要(本番運用では5.15以降が推奨)。

## 出典

- [docs.cilium.io - Cilium & Hubble overview](https://docs.cilium.io/en/stable/overview/intro/)
- [How to Deploy Cilium CNI for eBPF-Powered Kubernetes Networking](https://oneuptime.com/blog/post/2026-01-07-ebpf-cilium-kubernetes-networking/view)
- [How to Implement Cilium Service Mesh](https://oneuptime.com/blog/post/2026-01-27-cilium-service-mesh/view)
- [Architecture - KodeKloud](https://notes.kodekloud.com/docs/Prep-Course-Cilium-Certified-Associate-CCA-Certification/Cilium-Overview/Architecture/page)
