---
created: 2026-08-14 08:33
updated: 2026-08-14 08:39
---
# Raft (合意アルゴリズム)

複製ログ（replicated log）を複数ノード間で一貫させるための合意（コンセンサス）アルゴリズム。StanfordのDiego OngaroとJohn Ousterhoutが設計し、USENIX ATC 2014の論文「In Search of an Understandable Consensus Algorithm」で発表された。 #distributed-systems

## 設計目標: 理解しやすさ

先行する[[paxos|Paxos]]と等価な結果を同等の効率で出せるが、構造がまったく異なる。Paxosが「難解で、実システムを作るには大きなギャップがある」とされてきたのに対し、Raftは**理解しやすさ**そのものを第一の設計目標にした。論文には2大学の学生43名にPaxosとRaftを両方教えたユーザースタディが載っており、33名がPaxosよりRaftの設問に良い成績を出した。

そのために問題を独立したサブ問題に分解している:

- **リーダー選出（leader election）** — 強いリーダーを1人選び、ログの書き込みをリーダー経由に一本化する
- **ログ複製（log replication）** — リーダーがクライアントの要求をログに追記し、フォロワーへ複製する
- **安全性（safety）** — コミット済みエントリが失われない・食い違わないことの保証

## ノードの状態遷移

```mermaid
stateDiagram-v2
    [*] --> Follower
    Follower --> Candidate: 選挙タイムアウト<br/>(リーダーから音沙汰なし)
    Candidate --> Leader: 過半数の票を獲得
    Candidate --> Follower: 他のリーダーを発見
    Candidate --> Candidate: 票が割れて再選挙
    Leader --> Follower: より新しいterm<br/>のノードを発見
```

## 採用例

[[etcd]]がRaftで一貫性を保っているのが代表例（つまり[[kubernetes|Kubernetes]]のクラスタ状態はRaftの上に載っている）。ほかにHashiCorp ConsulやTiKV、CockroachDBなど、Go/Rust系の分散システムでの採用が多い。

## 出典

- [In Search of an Understandable Consensus Algorithm (Extended Version)](https://raft.github.io/raft.pdf)
- [In Search of an Understandable Consensus Algorithm - USENIX ATC 2014](https://www.usenix.org/conference/atc14/technical-sessions/presentation/ongaro)
- [The Raft Consensus Algorithm](https://raft.github.io/)
