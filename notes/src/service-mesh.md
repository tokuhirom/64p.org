---
created: 2026-08-13 09:29
updated: 2026-08-13 09:29
---
# Service Mesh

マイクロサービス間の通信を管理するインフラ層。各サービスがリトライ・サーキットブレーカー・mTLS・ロードバランシングなどの通信ロジックを自前で実装する代わりに、それらをネットワーク層に集約する。 #networking #kubernetes #security

## アーキテクチャの2方式

### サイドカー方式(従来型)

各アプリケーションPodにプロキシ(多くはEnvoy)を並走させ、全トラフィックをそのプロキシ経由にする。

- **Istio**: 機能が豊富で成熟している一方、リソース消費と運用の複雑さがトレードオフになる。詳細は[[istio-ambient-mesh|Istio Ambient Mesh]]を参照
- **Linkerd**: Rust製の自前プロキシを使い、Kubernetes専用・ミニマル志向で設計されている。中規模負荷(5,000 RPS/service未満)ではIstioよりオーバーヘッドが小さいとされる。初めてService Meshを導入するならLinkerdから始め、必要に応じてIstioへ移行するのが定石とされている

### サイドカーレス方式

- **Istio Ambient Mesh**: ノード単位のDaemonSetである`ztunnel`がL4処理を担い、L7が必要な場合のみオプションの`waypoint proxy`(Envoy)を挟む。詳細は[[istio-ambient-mesh]]
- **[[cilium|Cilium]] Service Mesh**: L3/L4は[[bpf|eBPF]]で処理し、L7が必要な時だけノードレベルのEnvoyを使う。WireGuard/IPsecによる透過的暗号化、SPIFFE/SPIRE連携のmTLSもサポートする

両者とも、サイドカー方式の「Pod毎にプロキシを起動する」オーバーヘッドを避け、ノード単位の共有プロキシ/eBPFでコストを下げる方向性は共通している。

## 主な提供機能

- **mTLS**による相互認証・暗号化。SPIFFE/SPIREのようなID基盤と連携することも多い
- リトライ・タイムアウト・サーキットブレーカーなどの耐障害性機能
- カナリアリリースやA/Bテスト用のトラフィックルーティング
- 可観測性(メトリクス・分散トレーシング・アクセスログの自動収集)

## コントロールプレーン/データプレーン

- **データプレーン**: 実際にトラフィックを中継するプロキシ層(サイドカーEnvoy、ztunnel、eBPFプログラムなど)
- **コントロールプレーン**: ポリシーや証明書を配布・管理する層(Istioなら`istiod`)

## 出典

- [Kubernetes Service Mesh Comparison 2026: Istio vs Linkerd vs Cilium](https://reintech.io/blog/kubernetes-service-mesh-comparison-2026-istio-linkerd-cilium)
- [Istio vs Linkerd: We Run Both in Production - Here's What Won (2026)](https://tasrieit.com/blog/istio-vs-linkerd-service-mesh-comparison-2026)
- [How to Understand Istio Architecture (Control Plane vs Data Plane)](https://oneuptime.com/blog/post/2026-02-24-how-to-understand-istio-architecture-control-plane-vs-data-plane/view)
