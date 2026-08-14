---
created: 2026-08-14 08:24
updated: 2026-08-14 11:36
---
# Traefik

Go製のクラウドネイティブなリバースプロキシ / ロードバランサー / Ingressコントローラー（MITライセンス）。Containous（現Traefik Labs）が開発している。 #networking #kubernetes

## 特徴: 動的なサービスディスカバリ

従来のリバースプロキシがルーティングを設定ファイルに手書きするのに対し、Traefikは「プロバイダー」からサービスを自動発見して自分の設定を動的に更新する。インフラの変化（コンテナの追加・削除など）を検知すると、再起動なしでルーティングに反映される。

- プロバイダー: [[kubernetes|Kubernetes]]（Ingress / Gateway API / CRD）、Docker、Docker Swarm、Nomad、Amazon ECS、[[consul|Consul]]、file、HTTPなど
- [[acme|ACME]]（[[lets-encrypt|Let's Encrypt]]）組み込みで、TLS証明書の取得・更新を自動化できる
- HTTP/2・HTTP/3・gRPC・WebSocket・TCP・UDP対応、ミドルウェアチェーンによる拡張、ビルトインのダッシュボード

## 使われどころ

- [[k3s]]のデフォルトIngressコントローラーとして同梱されている
- Docker Composeベースの自宅サーバー・小規模構成で、コンテナのラベルを書くだけでリバースプロキシ+自動TLSが手に入る手軽さから人気がある。Kubernetesの世界ではingress-nginxなどと並ぶ選択肢

## 出典

- [Traefik, The Cloud Native Application Proxy - Traefik Labs](https://traefik.io/traefik)
- [traefik/traefik - GitHub](https://github.com/traefik/traefik)
