# ネタメモ: mutsu トーク (YAPC::Tokyo 2026)

スライド (`main.txt`) に入れるかどうかは別として、話せそうなネタを全部ここに溜めておく。
✅ = スライドに採用済み / 💤 = 未採用（時間が余ったら・質疑用）

数字は 2026-11-22 時点。当日朝に更新するもの → 末尾の「当日更新」参照。

## tokuhirom の発言・スタンス

- ✅ 11/28 に 1.0.0 を出す。最初の安定版。「まだ使うな」ではない。バグはあると思う
- ✅ open な issue はあと 200 くらいある（11/22 時点で 192）
- ✅ Rakudo をけなしたいわけではない
  - ✅ ここがパフォーマンス改善の余地だよ、と知らせたい
  - ✅ 同じ言語仕様でもカリカリにチューニングすればこれぐらいやれる、を示したい
- ✅ ベンチは公平ではない点もある
  - ✅ ベンチの題材は AI がなんとなくそれっぽいものを設定した
  - ✅ mutsu はそれに合わせて最適化を頑張っている
- ✅ 開発の途中で Raku++ の存在に気づいた
  - ✅ 気づいたとき「先にあったら mutsu は作らなかったかも」とちょっと思った（※ rakupp の初回コミットは 2026-07-02 で、mutsu 開始時点では存在しなかった。なので「気づいたときの気持ち」として話す）
  - ✅ でも C++ なので、Rust 版を作ったらどうなるのかな、とも思ったかも
  - ✅ 同じ年に別々に新実装が始まっている → シンクロニシティ

## 開発の規模（GitHub API / リポジトリ, 2026-11-22）

- ✅ リポジトリ作成 2026-02-05
- ✅ コミット 33,457 / マージ済み PR 14,851（1日 約50）/ issue 3,902
- ✅ Rust 約108万行・2,975 ファイル（runtime 40万, vm 18万, builtins 11万, parser 10万, rakuast 8万, gc 4.5千）
- ✅ t/ のテストファイル 11,466
- ✅ ADR 236本
- 💤 news/ の記事 8,791 件（07: 222, 08: 1,082, 09: 1,907, 10: 3,479, 11: 2,101）
- 💤 最大ファイル: opcode.rs 15,914 行、vm_exec_dispatch.rs 8,778 行
- 💤 500 行ルールがあり、6月末に大きいファイルを一斉に分割した
- 💤 2月だけでコミット約1,229、PR #22〜#682

## Roast の推移（HISTORY.tsv）

- ✅ 2/12 開始 147 → 2/28 500 突破 → 4/14 1000 → 6/12 1200 → 7/12 1271 で頭打ち
- ✅ 最新 1,269 / 1,288（11/22）
- 💤 README の数え方だと 1,426 / 1,454。プロポーザルは 1,433 / 1,464。数え方の違いを聞かれたら説明
- 💤 リポジトリの HISTORY-pass.svg は横軸が日付スケールでなく、計測失敗が0に落ちる。スライドのグラフは `gen-history-graph.py` で描き直したもの

## KPI

- ✅ Roast の件数を KPI にすると目先のテストに全力投球してくれる / しすぎる（ハック・ハードコード・つまみ食い）
- ✅ 5月に「実用性」へピボット。KPI を roast → ベンチ → ecosystem に
- 💤 5月末に 6 本中 5 本のベンチで raku より速くなった（fib(25) 78.8x → 0.8x）
- 💤 試して捨てた最適化も記録が残っている（2-level Env, scope chain で 10〜24% 退行）

## パーサー

- ✅ yacc/bison 的なパーサーで詰む → Packrat に書き直し（リポジトリ内に記録はない。本人の記憶ベース）
- ✅ 今は RakuAST をフロントエンド IR にする移行中（ADR-10723）。Rakudo 2026.09 で RakuAST がデフォルトに

## バイトコード VM / 二重実装

- ✅ AI が tree walking で fallback したがる。置換に一ヶ月
- ✅ 二重実装で間違ったほうを直す、挙動がずれる（codepoint vs grapheme、div の丸め）
- ✅ 「1 operation = 1 implementation」（2026-06-07）
- ✅ `make check-slow-path` で fallback の数をラチェット
- ✅ AI「構造的に不可能」→「設計からやり直して」→ single-store で消えた（docs/vm-single-store.md）
- 💤 CP-3: `struct VM` を `Interpreter` に溶かして差し引き −794 行
- 💤 tree-walk の残り: 132 shapes / 380 calls（10/24）

## 小さい差分に逃げる

- ✅ "Refactor boldly"
- ✅ JSON::Fast をネイティブ実装で置き換え、ベンチ 1000 倍 → 51 op 中 42 個はもう動いてた → ネイティブ代替禁止（2026-08-01, ADR-0096）
- ✅ 7月「nqp:: op 層は作らない」→ 10月 撤回して 111 op 実装
- ✅ 完了条件を「古いものが消えたこと」にする
- 💤 OO::Monitors や `if` pragma も一時ネイティブ実装 → 撤去
- 💤 nqp:: op は 578 個中 362 個実装（10/3）

## GC / NaN-boxing / JIT

- ✅ GC: 非移動の参照カウント + cycle collector（ADR-0001, 6/27）。7/5 デフォルト on
- ✅ NaN-boxing: Value 48 → 8 バイト（7/12）。エラー 708 箇所、cargo fix で 558、残り 150 を AI 4 体で並列
- ✅ JIT: Cranelift、method JIT、tracing/OSR なし。J1→J5 を 2 日。7/13 デフォルト on
- ✅ 命令数 ≠ 時間（SetSourceLine が 21% → 消したら 7.8% 遅くなった）
- 💤 JIT 前の時点で fib(25) 1.0x、method-call 2.7x、bench-class 2.3x

## ベンチマーク（bench-data f684d28, 2026-11-22, Rakudo v2026.07）

- ✅ 起動 rakudo 117ms / mutsu 9ms
- ✅ fib(JIT) 0.59, mandelbrot(JIT) 0.21, grammar JSON::Tiny 0.13, method-call 0.32
- ✅ 処理部分だけ: multi-dispatch 1.45, JSON::Fast 1.33, YAML 0.93
- 💤 JIT の効き: fib 0.081→0.054s, mandelbrot 0.057→0.037s, tak 0.147→0.087s
- 💤 regex は対象文字列のサイズで比が大きく変わる（100文字なら 0.2〜0.4x、数百KBなら 1.0x 以上）
- 💤 CI ランナーの性能が二峰性で、一部ベンチは 30% 未満の差を判別できない

## Raku++ (rakupp)

- ✅ Andrew Shitov さん作、C++17 でゼロから。Rakudo とコード共有なし
- ✅ 初回コミット 2026-07-02（mutsu の5ヶ月後）、v0.1.0 は 7/10（~300 files）
- ✅ 2026-09-29 v5.0.0 で Roast 100.00%（テスト単位 218,421 / 218,422）、9/30 v5.1.0 でファイル単位 1,424 / 1,424
- 💤 9月前半はまだ 646〜676 / 1,464 files → 9/29 で一気に 100%（分母の数え方が途中で変わっている）
- 💤 最新は v5.10.0（2026-11-19）で 1,425 / 1,425 files
- 💤 rakupp の 100% は spectest.data（Rakudo が「通るはず」として走らせるリスト, 1,425 files）が分母で、#?rakudo skip/todo を除外した数え方
- 💤 同じ物差しで数えると mutsu も 1,422 / 1,425（99.8%）。残りは pseudo-6c/6d/6e の3ファイルだけ
  → mutsu 側の基準を揃える issue: https://github.com/tokuhirom/mutsu/issues/19036
- 出典: https://github.com/ash/rakupp/blob/main/docs/status/MILESTONES.md, https://github.com/ash/rakupp/blob/main/docs/status/COUNTING.md
- ✅ bench CI で 9 月から rakupp v5.0.1 も計測
- 💤 tree-walking evaluator。`--exe` でネイティブバイナリ化、Raku.js として WASM、`rakupp --mcp` で MCP サーバ
- 💤 ecosystem は 1,182 / 2,584 dist が自身のテストを通過（README）
- 💤 rakupp のほうが速いベンチ: JSON::Fast（mutsu/rakupp 5.9）、startup（2.1）など
- 💤 AI の利用: README・JOURNEY.md には明記なし。ただし作者ブログに "OK, today, we have great friends and helpers, AI." とある（Raku++ — the fastest Raku compiler, 2026-07-13, AI カテゴリ）。コミット 58105a0（2026-11 の ecosystem sweep）は GitHub 上で ash と claude の共同作成表示
  - どのツールをどの程度使っているかは不明。言うなら「作者のブログでも AI を helper と書いている」程度に留める
  - 出典: https://andrewshitov.com/2026/07/13/raku-the-fastest-raku-compiler/ , https://github.com/ash/rakupp/commits/main

## Raku Weekly への改名

- ✅ 2026-10-05 の号（2026.40 Pythonesque, Elizabeth Mattijsen）で Rakudo Weekly News → Raku Weekly News に改名
- ✅ 理由: Raku の実用的な実装が3つになり、Rakudo はそのうちの1つだから。2019年7月の開始時は実用的な実装が Rakudo だけだった
- ✅ 本文で Raku++ と Mutsu の名前が出ている（主要開発者に改名を伝え、ニュースを送ってもらう約束をした、という段落）
- 💤 記事は3つを一覧にしていない（Rakudo + Raku++ + Mutsu と読めるが明記はない）
- 出典: https://rakuweekly.blog/2026/10/05/2026-40-pythonesque/

## AI を並列で走らせる運用

- ✅ ADR 番号の衝突 6 回 → ADR 番号 = issue 番号
- ✅ CI 詰まり（同時 20 ジョブ）→ 重いテストは main で毎時
- ✅ main が赤 → 約20 PR が勝手に修正 → 「main is red」issue を1つ、直すのは1人
- ✅ flaky の大半は普通のバグ（ポート衝突など）
- ✅ `pgrep -f` / `pkill -f` で自分のシェルにマッチ → dev job runner（ADR-0126）
- ✅ 本家リポジトリへの issue 誤登録 → AGENTS.md に禁止を明記
- ✅ AGENTS.md 567 行
- 💤 lane 制: 13 lane + perf lane、1 lane 1 エージェント、issue コメントで claim（10/11〜）
- 💤 ecosystem の「lock board」issue でエージェント同士が dist を取り合わない
- 💤 CI 失敗 31 件中 13 件（42%）が間欠失敗（7/23 までの 300 run）
- 💤 GC/JIT stress を PR から外した: 3 週間で stress 起因の失敗 28 件、うち GC/JIT の欠陥 0 件
- 💤 起動 0.5〜1ms のために non-PIE バイナリを出荷 → revert。以後「保護を弱める変更は事前承認」
- 💤 ADR は決定だけ書く、進捗は書かない（ADR-11276 が進捗追記で約 5,800 行に膨れた）
- 💤 CLAUDE.md は置かず AGENTS.md だけにしている
- 💤 .agents/skills に 16 スキル（ecosystem-dist-fix, cut-release など）
- 💤 リポジトリ内は英語のみ、会話は日本語

## 現状

- ✅ ecosystem: 9月 41.2% → 11月 99.2%（分母は rakudo で通る gradable dist 1,335。除外15件。定義変更の影響もありそう → 聞かれたら正直に）
- ✅ batteries: Cro::HTTP, JSON::Fast, Text::CSV, YAMLish, DBIish(SQLite), OpenSSL など（modules/ に 42）
- ✅ mzef（本物の Zef を同梱）、mise、Docker、WASM playground
- 💤 Language Server（ADR-0065, AI エージェント向け）
- 💤 RakuAST 移行・builtin method のテーブル化・Interpreter のサブシステム分割が進行中（PLAN.md §0）

## 当日更新

- [ ] Roast の数（HISTORY.tsv）と グラフ再生成: `python3 gen-history-graph.py ../../../mutsu/HISTORY.tsv history-pass.svg`
- [ ] コミット数・PR 数・issue 数・open issue 数
- [ ] ベンチ（bench-data ブランチの最新コミット）
- [ ] ecosystem pass rate
- [ ] Raku++ の README（バージョン・Roast）
- [ ] 1.0.0 のリリース日
