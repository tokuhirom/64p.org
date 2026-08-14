---
created: 2026-08-14 09:06
updated: 2026-08-14 12:02
---
# Redis

2009年にSalvatore Sanfilippo（antirez）が開発したインメモリデータ構造ストア。antirezがリアルタイムアクセス解析サービスLLOOGGを作る中で、MySQLでは追いつかない書き込み・参照パターンを捌くために生まれた。「REmote DIctionary Server」の略。 #infrastructure #cache

## データ構造サーバー

[[memcached]]が値をただのバイト列として扱うのに対し、Redisは最初からlist・set・sorted set・hashといったデータ構造をサーバー側に持つ「data structures server」として設計された。ランキング（sorted set）、キュー（list）、Pub/Subなど、キャッシュを超えた用途に使われるのはこのため。Luaスクリプティングも組み込まれており、そこでは[[messagepack|MessagePack]]が採用されている。

## アーキテクチャ

- コマンド実行はシングルスレッドのイベントループ。ロックが不要でデータ構造操作がアトミックになる。6.0以降はI/Oスレッドを持ち、8.x系ではI/Oスレッド活用でさらにスループットを伸ばしている
- 揮発キャッシュ専用ではなく、RDB（スナップショット）とAOF（追記ログ）の2方式の永続化を持つ
- レプリケーション、フェイルオーバー管理のSentinel、シャーディングのRedis Clusterを備える

## ライセンス変遷とValkeyフォーク

1. **2009〜2024年**: BSD-3-Clauseのオープンソース
2. **2024年3月（Redis 7.4）**: Redis社がRSALv2 / [[sspl|SSPLv1]]のデュアルライセンスに変更。どちらも[[osi|OSI]]承認ライセンスではなく、これを機にAWS・Googleらがフォークして[[valkey|Valkey]]を立ち上げた
3. **2024年11月**: いったんプロジェクトを離れていたantirezがRedis社に復帰
4. **2025年5月（Redis 8）**: [[agpl|AGPLv3]]を選択肢に加えたトリプルライセンスとなり、OSI承認ライセンスでも利用可能に戻った

## Redis 8以降

Redis 8で、別配布だったRedis Stackのモジュール群（JSON、クエリエンジン、時系列、確率的データ構造）が「Redis Open Source」本体に統合された。antirezが設計した新データ型のvector set（ベクトル類似検索用）もここで入った。以降8.2・8.4と、I/Oスレッド活用によるスループット改善を軸にリリースが続いている。

## [[in-memory-kvs|インメモリKVS]]の中での位置づけ

このジャンルのデファクトを作った本家。豊富なデータ構造と永続化で「キャッシュ以上、RDBMS未満」の領域を開拓した。ライセンス変更後は、BSDを維持する[[valkey|Valkey]]と本家という2系統に分かれている。

## 出典

- [Redis - Wikipedia](https://en.wikipedia.org/wiki/Redis)
- [Licenses - Redis](https://redis.io/legal/licenses/)
- [Redis 8 GA: Fast, scalable, and feature-rich - Redis](https://redis.io/blog/redis-8-ga/)
- [Redis 8.0 Released: Now Tri-Licensed With AGPLv3 - Phoronix](https://www.phoronix.com/news/Redis-8.0-Goes-AGPLv3)
- [Story: Redis and its creator antirez - Brachiosoft Blog](https://blog.brachiosoft.com/en/posts/redis/)
- [Redis 8.2 in Redis Open Source is GA - Redis](https://redis.io/blog/redis-82-ga/)
