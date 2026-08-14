---
created: 2026-08-14 09:06
updated: 2026-08-14 11:26
---
# Valkey

2024年3月の[[redis|Redis]]のライセンス変更（BSD → RSALv2/[[sspl|SSPLv1]]）を受けて、数日のうちにRedis 7.2からフォークされたインメモリKVS。Linux Foundation傘下でBSD-3-Clauseライセンスを維持しており、AWS・Google Cloud・Oracle・Ericsson・Snapなどの企業がTechnical Steering Committeeに参加している。 #infrastructure #cache

## 経緯

- Redis社のライセンス変更直後、元Redisコントリビュータ（AWSのMadelyn Olsonら）が「placeholderkv」の名でフォークを開始し、すぐにLinux Foundationへ寄贈されてValkeyと命名された
- クラウド各社がRedisをマネージドサービスとして提供していたため、[[sspl|SSPL]]の「サービス提供にはソース公開が必要」という条項を避ける動機が強かった
- Fedora・AlpineなどのLinuxディストリビューションがredisパッケージをvalkeyに置き換え、AWSもElastiCache / MemoryDBでValkey対応を追加した

## リリースの歩み

- **Valkey 8.0（2024年9月）** — フォーク後最初のメジャーリリース。I/Oの非同期マルチスレッド化でスループットを大幅に改善し、100万RPS超を謳った
- **Valkey 8.1（2025年4月）** — メモリ効率・レイテンシ改善
- **Valkey 9.0（2025年10月）** — フォーク元からの最大の乖離。クラスタモードでの複数論理データベース対応、atomic slot migration（キー単位でなくスロット単位のアトミックな移行でリバランスを堅牢化）、hashフィールド単位のTTL、公式モジュール（JSON・Bloomフィルタ・ベクトル検索）。2,000ノードのクラスタで10億RPSを実証したとしている
- **Valkey 9.1（2026年5月）** — メモリ効率化が中心。小文字列(embstrエンコーディング)から冗長なポインタ(`robj->ptr`)を削除し、文字列は固定オフセットに置くことでアドレスを計算で求められるようにした。embstrのしきい値も64バイトから128バイトに引き上げ。ソート済みセット(スキップリストエンコーディング)では、メンバーのSDSを別途アロケートせずスキップリストノードに直接埋め込む変更も加えられた。結果として文字列キーのオーバーヘッドを平均26%・最大44%削減、ソート済みセットの短いメンバー(10〜40バイト)でも約6〜8.5バイト(11〜15%)削減したとしている。設定変更やコマンド変更は不要で、RDB/AOFの再ロード時に自動的に新しいエンコーディングが適用される

なおRedis側も2025年5月のRedis 8で[[agpl|AGPLv3]]を追加してOSIライセンスに復帰したが、Valkeyはそのまま独立プロジェクトとして継続しており、機能面でも互いに独自進化を始めている。

## [[in-memory-kvs|インメモリKVS]]の中での位置づけ

「BSDライセンスのままのRedis」として始まり、9.0でクラスタ機能を中心に独自色を強めたフォーク。ベンダー中立のガバナンス（Linux Foundation + 複数社のTSC）が本家との一番の違い。

## 出典

- [Valkey](https://valkey.io/)
- [Linux Foundation Launches Open Source Valkey Community](https://www.linuxfoundation.org/press/linux-foundation-launches-open-source-valkey-community)
- [Valkey 9.0: innovation, features, and improvements - Valkey Blog](https://valkey.io/blog/introducing-valkey-9/)
- [Valkey 9.0 Delivers Performance and Resiliency for Real-Time Workloads - Linux Foundation](https://www.linuxfoundation.org/press/valkey-9.0-delivers-performance-and-resiliency-for-real-time-workloads)
- [Forking Ahead: A Year of Valkey - Linux Foundation](https://www.linuxfoundation.org/blog/a-year-of-valkey)
- [Reduced memory overhead in Valkey 9.1 - Valkey Blog](https://valkey.io/blog/9.1-memory-efficiency/)
