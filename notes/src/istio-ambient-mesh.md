---
created: 2026-08-13 09:29
updated: 2026-08-13 09:29
---
# Istio Ambient Mesh

2022年に発表された[[service-mesh|Service Mesh]]実装Istioの新データプレーンモード。従来のサイドカー方式(全アプリケーションPodにEnvoyプロキシを並走させる方式)に対し、サイドカーなしでService Meshの機能を提供する。 #networking #kubernetes #security

## データプレーンの構成

L4処理とL7処理を分離し、必要な場合のみL7プロキシを経由させる構成になっている。

- **ztunnel(per-nodeのL4プロキシ)**: ノードごとに1つ動くDaemonSetとして展開される共有エージェント。トラフィックのルーティングにeBPFプログラム(istio-cniコンポーネントに組み込まれる)を使い、従来のiptablesベースのルーティングに比べて性能・柔軟性で優位とされる
- **waypoint proxy(オプションのL7プロキシ)**: Envoy製のプロキシで、アプリケーションPodの外で動作する。アプリケーションから独立してデプロイ・アップグレード・スケールできる

## コントロールプレーン

`istiod`がコントロールプレーンとして残り、ztunnel・waypoint proxy双方の設定・証明書管理を担う。サイドカー方式と共通のコンポーネント。

## サイドカー方式との違い

サイドカー方式は「全部乗せ」でL4/L7の機能を1つのサイドカープロキシに詰め込むのに対し、Ambient MeshはL4(ztunnel)とL7(waypoint proxy)を分離し、L7が不要なワークロードではztunnelのみで済ませることでリソース消費を抑える設計になっている。

## 出典

- [Istio / Introducing Ambient Mesh](https://istio.io/latest/blog/2022/introducing-ambient-mesh/)
- [Istio / Sidecar or ambient?](https://istio.io/latest/docs/overview/dataplane-modes/)
- [How to Deploy Istio Ambient Mesh (Sidecar-less Mode)](https://oneuptime.com/blog/post/2026-01-07-istio-ambient-mesh-sidecarless/view)
