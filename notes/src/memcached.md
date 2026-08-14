---
created: 2026-08-14 09:06
updated: 2026-08-14 09:07
---
# memcached

2003年にBrad FitzpatrickがLiveJournalのスケーラビリティ問題を解決するために開発した、分散インメモリキャッシュサーバー。頻繁にアクセスされるデータをメモリに置いてDBへの負荷を減らすという、Webアプリケーションのキャッシュ層の原型を作ったソフトウェア。最初はPerlで書かれ、その後Anatoly VorobeyがCで書き直した。 #infrastructure #cache

## 設計思想: 徹底したシンプルさ

- 機能はほぼ「キーと値のget/set/delete + 有効期限」だけ。値はただのバイト列で、サーバー側はデータ構造を持たない
- 永続化もレプリケーションも持たない。「消えても困らないキャッシュ」に用途を絞っている
- サーバーノード同士は互いを知らず、分散はクライアント側のハッシュ計算（コンシステントハッシュ法など）で行う。ノード追加はクライアントの設定変更だけで済む
- マルチスレッドで動作し、コア数に応じてスケールする（[[redis|Redis]]のシングルスレッドモデルとの対比でよく語られる）

## slabアロケータ

初期のmemcachedはglibcのmallocをそのまま使っていたが、アドレス空間の断片化で1週間ほど稼働するとCPUを食い潰す問題があった。そこで大きなメモリチャンクをまとめて確保し、サイズクラスごとに小分けして使い回すslabアロケータを採用した。各サイズクラスごとにfreelistを維持し、断片化を回避する。追い出しはサイズクラスごとのLRUで行う。

## 現代のmemcached

古いソフトウェアだが開発は現役で、dormando（Alan Kasindorf）がメンテナンスを続けている。

- **metaプロトコル** — 従来のテキストプロトコルを拡張した新プロトコル。CASや stale-while-revalidate 的な制御ができる。バイナリプロトコルは廃止予定になった
- **extstore** — メモリに収まらない値をSSDに追い出す外部ストレージ機構。1.6系でデフォルトビルドに含まれるようになった
- **組み込みプロキシ** — mcrouter的なルーティング・レプリケーションをサーバー本体に取り込んだもの。Luaで設定を書く

## [[in-memory-kvs|インメモリKVS]]の中での位置づけ

「何もしない」ことを選び続けている純粋キャッシュ。データ構造・永続化・クラスタ管理が必要なら[[redis|Redis]]/[[valkey|Valkey]]、揮発してよいキャッシュを最小のオーバーヘッドで捌きたいならmemcached、という棲み分け。

## 出典

- [memcached - a distributed memory object caching system](https://memcached.org/about)
- [Distributed Caching with Memcached - Linux Journal](https://www.linuxjournal.com/article/7451)
- [Memcached - Wikipedia](https://en.wikipedia.org/wiki/Memcached)
- [Extstore - memcached wiki](https://github.com/memcached/memcached/wiki/Extstore)
- [Memcached - Database of Databases](https://dbdb.io/db/memcached)
