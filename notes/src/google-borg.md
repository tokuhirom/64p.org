---
created: 2026-08-14 08:24
updated: 2026-08-14 08:24
---
# Borg (Googleのクラスタ管理システム)

Googleが社内で運用してきたクラスタ管理システム。数万台規模のマシンからなるクラスタ（セル）上で、数千のアプリケーションの数十万規模のジョブを動かす。長年秘密にされていたが、EuroSys 2015の論文「Large-scale cluster management at Google with Borg」で詳細が公開された。 #infrastructure #google

## 特徴

- admission control・効率的なタスクパッキング・オーバーコミット・プロセスレベルの性能分離を伴うマシン共有を組み合わせて、高いリソース利用率を実現
- 検索・Gmailのような長時間稼働のレイテンシ重視サービスと、バッチジョブを同じクラスタに同居させる
- 障害からの復旧時間を最小化するランタイム機能で高可用性アプリケーションを支える

プロセスの分離には[[cgroups]]を使っている。そもそもLinuxのcgroups自体が、Googleのエンジニアが社内の巨大な共有クラスタ運用（＝Borgの世界）のために「process containers」として開発を始めたものという経緯がある。

## Borg → Omega → Kubernetes

論文「Borg, Omega, and Kubernetes」（ACM Queue, 2016）で、Google自身が3世代のコンテナ管理システムの教訓を整理している。

- **Omega** — Borgエコシステムのソフトウェアエンジニアリングを改善したいという動機から、原理原則に基づいてゼロから設計し直した後継。複数スケジューラなどOmegaの成果の多くは、のちにBorg本体へ還元された
- **[[kubernetes|Kubernetes]]** — Googleの第3のコンテナ管理システム。外部の開発者がLinuxコンテナに関心を持ち始めた時代に、オープンソースとして開発された

## 出典

- [Large-scale cluster management at Google with Borg - Google Research](https://research.google/pubs/large-scale-cluster-management-at-google-with-borg/)
- [Borg, Omega, and Kubernetes - ACM Queue](https://queue.acm.org/detail.cfm?id=2898444)
- [Borg (cluster manager) - Wikipedia](https://en.wikipedia.org/wiki/Borg_(cluster_manager))
