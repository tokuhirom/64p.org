---
created: 2026-08-14 09:06
updated: 2026-08-14 09:07
---
# Valkey

2024年3月の[[redis|Redis]]のライセンス変更（BSD → RSALv2/SSPLv1）を受けて、数日のうちにRedis 7.2からフォークされたインメモリKVS。Linux Foundation傘下でBSD-3-Clauseライセンスを維持しており、AWS・Google Cloud・Oracle・Ericsson・Snapなどの企業がTechnical Steering Committeeに参加している。 #infrastructure #cache

## 経緯

- Redis社のライセンス変更直後、元Redisコントリビュータ（AWSのMadelyn Olsonら）が「placeholderkv」の名でフォークを開始し、すぐにLinux Foundationへ寄贈されてValkeyと命名された
- クラウド各社がRedisをマネージドサービスとして提供していたため、SSPLの「サービス提供にはソース公開が必要」という条項を避ける動機が強かった
- Fedora・AlpineなどのLinuxディストリビューションがredisパッケージをvalkeyに置き換え、AWSもElastiCache / MemoryDBでValkey対応を追加した

## リリースの歩み

- **Valkey 8.0（2024年9月）** — フォーク後最初のメジャーリリース。I/Oの非同期マルチスレッド化でスループットを大幅に改善し、100万RPS超を謳った
- **Valkey 8.1（2025年4月）** — メモリ効率・レイテンシ改善
- **Valkey 9.0（2025年10月）** — フォーク元からの最大の乖離。クラスタモードでの複数論理データベース対応、atomic slot migration（キー単位でなくスロット単位のアトミックな移行でリバランスを堅牢化）、hashフィールド単位のTTL、公式モジュール（JSON・Bloomフィルタ・ベクトル検索）。2,000ノードのクラスタで10億RPSを実証したとしている

なおRedis側も2025年5月のRedis 8でAGPLv3を追加してOSIライセンスに復帰したが、Valkeyはそのまま独立プロジェクトとして継続しており、機能面でも互いに独自進化を始めている。

## [[in-memory-kvs|インメモリKVS]]の中での位置づけ

「BSDライセンスのままのRedis」として始まり、9.0でクラスタ機能を中心に独自色を強めたフォーク。ベンダー中立のガバナンス（Linux Foundation + 複数社のTSC）が本家との一番の違い。

## 出典

- [Valkey](https://valkey.io/)
- [Linux Foundation Launches Open Source Valkey Community](https://www.linuxfoundation.org/press/linux-foundation-launches-open-source-valkey-community)
- [Valkey 9.0: innovation, features, and improvements - Valkey Blog](https://valkey.io/blog/introducing-valkey-9/)
- [Valkey 9.0 Delivers Performance and Resiliency for Real-Time Workloads - Linux Foundation](https://www.linuxfoundation.org/press/valkey-9.0-delivers-performance-and-resiliency-for-real-time-workloads)
- [Forking Ahead: A Year of Valkey - Linux Foundation](https://www.linuxfoundation.org/blog/a-year-of-valkey)
