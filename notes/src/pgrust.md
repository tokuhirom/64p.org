---
created: 2026-08-17 12:33
updated: 2026-08-17 12:33
---
# pgrust

[[postgresql|PostgreSQL]]をRustで再実装したオープンソースプロジェクト。個人開発者malisper（Heapで数ペタバイト規模のPostgresクラスタを運用していた経験を持つブロガー）が、AIコーディングエージェントを主な実装手段として開発している。

- リポジトリ: https://github.com/malisper/pgrust（作成日2026-04-20、ライセンスAGPL-3.0）
- ホームページ: https://pgrust.com （ブラウザで動くWASMデモあり）

#database #rust #postgresql #ai-assisted-development

## 互換性

- ワイヤプロトコル互換（既存のPostgresクライアントがそのまま繋がる）
- SQL方言はPostgres 18.3互換
- ディスクフォーマット互換（既存のPostgresデータディレクトリをそのまま読める）
- Postgres回帰テストスイート46,066件を100%パス（開発開始2週間時点では約1/3のみ通過だった）

## パフォーマンス

AWS Graviton4（c8g.4xlarge）上での計測値として、以下が公表されている。

- ClickBench: [[clickhouse|ClickHouse]]より18.5%高速
- Sysbench-OLTP: Postgres 18.3より30%高いスループット

v0.2の機能としては、ベクトル化JITコンパイル実行エンジン、スレッドベースの並行処理モデル（Postgresの伝統的なプロセスベースモデルからの転換）、クエリスケジューラー、OOMキラー、列指向フォーマット(pgrcolumnar)などが挙げられている。本番運用は非推奨と明記されている。

## AIによる書き直しの経緯

開発ブログによれば、4回の書き直し挑戦を経て現在の形に至った。

1. **pgrust-og**（機能単位の移植、Codex 5.4使用）— コアシステム構築後300以上のデータ型・500近いSQLキーワード・3000以上の組み込み関数を移植したが、プランナー統合で破綻。同一クエリをPostgresは1ノード、pgrustは3ノードで表現しており、数千箇所の修正が必要になり断念（開発費約$1,600）。
2. **c2rust**（自動トランスパイル）— オープンソースツールc2rustでC(530万行)を自動的にunsafe Rustへ変換。100%のテスト成功・ABI互換は達成したが、「あらゆる値がポインタ」という構造のため、1関数を安全化(safe化)するだけで数時間+数百の呼び出し元修正が必要になり、段階的リファクタリングが事実上不可能と判明。
3. **pgrust-idiomatic**（クレート単位の移植）— 「find-next-crate」「port-crate」「audit-crate」の3スキルを定義し、Conductorで複数エージェントを並列実行（Claude dynamic workflowsで最大100以上のサブエージェント同時稼働）。しかし`Relation`型の定義が1万箇所で不統一（`&RelationData` / `usize` / `oid`が混在）になり、seam（依存注入の型境界）の型シグネチャが発散して修復不能に（ここまでで開発費約$50,000）。
4. **pgrust-fabled**（成功版）— 全バージョンのコンテキストと技術負債ログを常時エージェントに与え、audit skillに「seamの発散検出」を追加。検出したら即座に修正する運用を徹底した結果、180万行のイディオマティックなRustコードで回帰テスト100%合格を達成した。

その後さらに投資を重ねてパフォーマンスチューニング版（pgrust-fast）を作り、上記のClickHouse/Postgresを上回る性能値に至ったという。開発費の総額は数十万ドル規模と書かれている。

## 考えたこと

成功パターンで使われたと書かれている「Claude Fable」は、2026年8月時点でAnthropicが提供している実在のモデル(Fable 5)と同名で、記事の日付とも矛盾はない。全体としてAIエージェントによる大規模ソフトウェアの書き換えという文脈で、「機能単位」「自動変換」「クレート単位（並列化）」「型不整合の継続監視」という順に手法を変えていった過程が具体的に書かれており、大規模コードベースをAIエージェント群で移植する際に型定義の一貫性が最大のボトルネックになる、という知見が興味深い。

## 出典

- [GitHub - malisper/pgrust](https://github.com/malisper/pgrust)
- [pgrust/README.md](https://github.com/malisper/pgrust/blob/main/README.md)
- [pgrust: Rebuilding Postgres in Rust with AI - malisper.me](https://malisper.me/pgrust-rebuilding-postgres-in-rust/)
- [Postgres in Rust: three dead ends before we passed 100% of the regression suite - malisper.me](https://malisper.me/how-pgrust-was-built-four-attempts-to-rewrite-postgres-in-rust-with-ai)
