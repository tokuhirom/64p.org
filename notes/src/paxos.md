---
created: 2026-08-14 08:39
updated: 2026-08-14 08:39
---
# Paxos

Leslie Lamportが考案した、故障するノードを含む分散システムで単一の値に合意するためのアルゴリズム。分散合意アルゴリズムの古典であり、長らく教育・実装の標準だった。 #distributed-systems

## 「The Part-Time Parliament」の逸話

論文はギリシャ・Paxos島の古代議会の寓話という体裁で書かれ、1990年に投稿されたが、当時の査読者・読者はその語り口のせいで本質的な貢献を理解できず、まともに取り合わなかった。結局掲載されたのは8年後の1998年（ACM TOCS）。あまりに理解されないので、Lamport自身が寓話を排して普通の言葉で書き直した「Paxos Made Simple」（2001）を出したことでも知られる。

## Single-decree と Multi-Paxos

- 基本のPaxos（single-decree）は「1つの値への合意」を扱う。proposer/acceptor/learnerの役割と2フェーズ（prepare/accept）からなり、この範囲では証明も比較的きれい
- しかし実システムで必要なのは「値の列（レプリケートログ）への合意」で、そのための拡張が**Multi-Paxos**。安定したリーダーを選出してprepareフェーズを省略し、通常時は1往復でエントリを確定させる。この実用拡張のところが格段に複雑で、Paxosの「難解」という評判の多くはこのギャップに由来する

## 実システムでの採用

Googleの分散ロックサービス**Chubby**（Bigtableなどが依存）がMulti-Paxosでレプリカの一貫性を保っているのが有名。Chubbyの開発者は「Paxosアルゴリズムの記述と実世界のシステムの要求の間には大きなギャップがある」と述べており（論文「Paxos Made Live」）、この実装の難しさへの不満が、理解しやすさを第一目標に据えた[[raft|Raft]]が生まれる動機になった。

## 出典

- [The Part-Time Parliament - Leslie Lamport](https://lamport.azurewebsites.net/pubs/lamport-paxos.pdf)
- [The Part-Time Parliament - the morning paper](https://blog.acolyer.org/2015/03/03/the-part-time-parliament/)
- [The Strange Story of the Paxos Algorithm - Towards Data Science](https://towardsdatascience.com/the-strange-story-of-the-paxos-algorithm-52a9f3f53ae0/)
