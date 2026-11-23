# ネタメモ: mutsu トーク (YAPC::Tokyo 2026)

スライド (`main.txt`) に入れるかどうかは別として、話せそうなネタを全部ここに溜めておく。
✅ = スライドに採用済み / 💤 = 未採用（時間が余ったら・質疑用）

発表スタイル: スライドをバーっとめくりながらガンガン話す。枚数が多い（180枚前後）のは想定どおり。

数字は 2026-11-22 時点。当日朝に更新するもの → 末尾の「当日更新」参照。

## Roast の物差し

- ✅ mutsu #19036 → PR #19043 (2026-11-23 マージ) で spectest.data 基準に統一。`scripts/roast-compat.py`、定義は `docs/roast-compatibility.md`
- ✅ pseudo-6c/6d/6e は PR #19007 で whitelist 入り → 1,425 / 1,425
- 💤 1,425/1,425 は whitelist ベース。spectest.data 列での実測は次の定期実行から HISTORY.tsv に入る

## 歴史の裏取り（2026-11-23 調査）

スライドの「３分間昔話」の各主張について。結論 / 根拠 / URL。

1. **2000年に Perl6 が発表された** — 正しい。2000-07-19、Larry Wall が The Perl Conference 4.0 の State of the Onion で発表
   - https://en.wikipedia.org/wiki/Raku_(programming_language) ("first announced on 19 July 2000")
   - https://www.perl.com/pub/2000/07/perl6.html/ (M-J Dominus の当時のレポート)
   - https://developers.slashdot.org/story/00/07/19/203221/larry-wall-announces-perl-6
2. **Grammar / Concurrency / CPAN が使える** — おおむね正しい。3つとも 6.c の公式アナウンスに出てくる。CPAN は Inline::Perl5 経由（XS モジュールも可）。当初構想は「Perl5 からの移行・相互運用」（S01 の `use v5`）で、「CPAN がすべて使える」は言い過ぎ気味
   - https://github.com/rakudo/rakudo/blob/main/docs/announce/2015.12.md ("staying compatible with Perl 5 (via Inline::Perl5)")
   - https://github.com/niner/Inline-Perl5 ("Supports Perl 5 modules including XS modules")
   - https://github.com/Raku/old-design-docs/blob/master/S01-overview.pod
3. **Parrot VM が作られることが発表された** — 2001年。名前は 2001-04-01 のエイプリルフールのジョーク（Perl と Python が合併）が由来で、実際の VM は 2001年9月に登場
   - https://en.wikipedia.org/wiki/Parrot_virtual_machine
   - https://www.perl.com/pub/2001/09/18/parrot.html/ ("destined to be the Perl 6 Virtual Machine")
   - https://developers.slashdot.org/story/01/09/12/133208/parrot-for-real
4. **Parrot 終了** — 正しい。Rakudo は 2015.03 で Parrot バックエンドを削除。Parrot 本体は 8.1.0 (2016-02) が最終で、2021年8月に開発終了を表明
   - https://pmthium.com/?p=460 (Patrick Michaud, 2015-02)
   - https://github.com/rakudo/rakudo/blob/main/docs/announce/2015.03.md ("first release of Rakudo that does *not* support Parrot")
   - https://github.com/parrot/parrot ("no longer being actively developed ... filled by MoarVM")
5. **Pugs → Roast** — 正しい。Pugs は 2005-02-01 に Audrey Tang が Haskell で開始、2010-04 に休止。Roast は Pugs 用に作られたテストが元（公式用語集）。Roast README には Pugs 由来の記述はない
   - https://en.wikipedia.org/wiki/Pugs_(compiler)
   - https://docs.raku.org/language/glossary#roast ("Originally developed for pugs, it now serves all Raku implementations")
6. **MoarVM 時代へ** — 正しい。MoarVM 開発開始 2012-03、公表 2013-05。Rakudo 2014.01 で MoarVM 対応、Rakudo Star は 2014.04 から MoarVM 同梱。2015.03 で Parrot が外れて実質 MoarVM が主
   - https://en.wikipedia.org/wiki/MoarVM
   - https://github.com/rakudo/rakudo/blob/main/docs/announce/2014.01.md
   - https://rakudo.org/post/announce-rakudo-star-release-2014-04
7. **2015年クリスマスに 6.c / 2019年に Raku に改名** — 正しい。6.c は 2015-12-25。改名は 2019年10月（Larry Wall 承認 10/11〜12、マージ報道 10/15）
   - https://docs.raku.org/language/faq
   - https://lwn.net/Articles/802329/
   - https://news.perlfoundation.org/post/tpf-response-raku-rename
8. **Raku は言語名、Rakudo は実装** — 正しい。Rakudo は Rakuda-do（駱駝道）の略、日本語の「楽土」の意味も
   - https://docs.raku.org/language/glossary#Rakudo
9. **仕様はテストとして提供される（Roast）** — 正しい。テストを通るコンパイラがその版の Raku を実装しているとみなされる。6.c は roast の `6.c` タグ / `6.c-errata` ブランチ
   - https://docs.raku.org/language/faq
   - https://github.com/Raku/roast
10. **Rakudo = MoarVM + NQP、「NQP は中間言語」** — 要修正。NQP (Not Quite Perl) は Raku のサブセットの言語で、コンパイラを書くためのもの。中間表現は QAST（MoarVM 向けには MAST）。Rakudo には JVM バックエンドも残っているが実験的扱い
    - https://github.com/Raku/nqp ("a lightweight Raku-like environment for virtual machines")
    - https://docs.raku.org/language/glossary ("NQP is a primitive language ... using a subset of the Raku syntax")
    - https://www.moarvm.org/features.html (MAST)
    - https://github.com/rakudo/rakudo ("moar and jvm backends")
11. **MoarVM はレジスタマシン** — 正しい。spesh（型による特化）と JIT も持つ。レジスタマシンと明記した公式文書は見つからず、JIT 開発者 brrt のブログが根拠
    - https://www.moarvm.org/features.html
    - https://docs.raku.org/language/glossary#Spesh
    - https://brrt-to-the-future.blogspot.com/2014/05/moarvm-as-machine.html
12. **起動時のオーバーヘッド** — 起動が重いのは事実（bench CI で raku -e 相当が 0.117s）。原因を「CORE.setting のデシリアライズ」と断定する現行の一次資料は見つからず。2012年に setting のシリアライズ方式を変えて起動時間が約25%に縮んだ、という jnthn の記事はある
    - https://raku.github.io/CCR/Remaster/Jonathan%20Worthington/Rakudo-Star-201202-out-and-the-focus-for-201203.html
    - https://use-perl.github.io/user/JonathanWorthington/journal/39500 (2009, "Rakudo just does a lot of work at startup")

13. **Parrot は多言語 VM / Perl5 との相互運用を目指した** — 正しい。Parrot は Perl6 用に始まり、すぐに Perl・Python・Ruby・Tcl など動的言語全般の共通 VM を目指す方向に広がった。Parrot 1.0 (2009) は Perl6・Python・Ruby などをサポートと発表
    - https://en.wikibooks.org/wiki/Parrot_Virtual_Machine/Introduction
    - https://www.linux-magazine.com/Online/News/Parrot-1.0-Said-to-Speak-Your-Virtual-Language
    - https://github.com/parrot/parrot ("never supplanted the existing VMs of those languages")
14. **Perl5 の正規表現を Raku で使える（`m:P5/.../`）→ 捨てられた** — 正しい。2026年に Rakudo と roast の両方から削除
    - Raku/problem-solving #133 (2019, vrurg): Perl5 からの移行という理由はもうないので非推奨・削除を提案 https://github.com/Raku/problem-solving/issues/133
    - Raku/problem-solving #378 (2023-07-30, lizmat) "The fate of P5 regexes in a RakuAST world" https://github.com/Raku/problem-solving/issues/378
    - rakudo #6708 (2026-09-21 マージ): `:P5`/`:Perl5` を既知の adverb から外す → "Adverb P5 not allowed on m" https://github.com/rakudo/rakudo/pull/6708 。続く `0dd07126b` で P5Regex の grammar/actions/slang ごと削除。Rakudo 2026.09 に入った
    - roast `41679797` (lizmat): `S05-modifier/Perl_0.t`〜`Perl_10.t` の11ファイルを削除。"This will not be supported in any language level for now"
    - ecosystem での `:P5` 利用は 2,558 dist 中 6 (≈0.23%)（mutsu #10225 の調査）
    - mutsu も追随して PCRE2 エンジンごと削除（ADR-0138, 2026-10-01）。C ライブラリのビルド依存が1つ消えた
    - ネタ: rakupp の Roast 分母が 1,434 → 1,424 になった一因もこの11ファイルの削除

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
- ✅ 裏取り（GC/JIT の表現）:
  - スタックマップ不要は「参照カウントで、GC がスタックを走査しないから」、write barrier 不要は「世代別じゃないから」（ADR-0004 §2.4, ADR-0001）。非移動なのはコード中のポインタが動かないこと（forwarding 不要）に効く
  - JIT: 最初の PR #4471 作成 2026-07-12 20:45 JST → デフォルト on の #4482 マージ 2026-07-13 11:48 JST（PR ベースで約15時間）。スライドは「実装開始からデフォルト on まで 2日」
  - SetSourceLine: 実行命令の 21%（fib で 8.9M 中 1.9M）。素朴に消して毎命令で行番号を更新したら +7.8%（命令数）、観測点だけで引くようにして -3.4%（インタプリタ）、JIT 有効時 ±0%（news/2026-07.md round 5, #4489）
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

## 起動の速さ

- ✅ 「Rakudo の起動が遅いのは NQP/Raku で書かれたコンパイラ・標準ライブラリを起動のたびに読むからでは？」は tokuhirom の仮説。調べたわけではない → スライドでも仮説と明言
- ✅ mutsu 側の事実: `say 1` の起動命令数 10.16M → 7.66M (-25%)、ページフォルト ~950 → ~700（callgrind）。修飾名インデックスの遅延構築など（news/2026-10/startup-skips-qualified-index-and-relocations.md）
- 💤 起動は Raku++ のほうが速い（bench-startup で mutsu/rakupp ≈ 2）

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

## デモ

- ✅ `demo.html?ex=hello|grammar|multi|concurrency` を iframe でスライドに埋め込み
- ✅ wasm はローカルの `vendor/mutsu-wasm/` から読む（ネットワーク不要）。`sh fetch-mutsu-wasm.sh` で npm から取得（integrity 検証あり、vendor/ は gitignore）。ローカルに無いときだけ CDN にフォールバックし、ステータスがオレンジ色で `(CDN)` と出る
- ✅ 発表時は `cd talks && python3 -m http.server` などローカルサーバで開く。ステータスが `(local)` になっていることを確認
- 💤 パッケージ同梱の `<mutsu-code>` は CDN の wasm-worker.js を `new Worker()` するので、別オリジンのページでは起動しない（Failed to construct 'Worker'）。docs/browser-embedding.md の CDN 例がそのままだと動かない
- 💤 iframe 内にフォーカスがあるとページ送りできない → 外側をクリックしてから送る

## 当日更新

- [ ] Roast の数: mutsu で `scripts/roast-compat.py count`、HISTORY.tsv の `spec_pass` 列に実測が入っているか確認（PR #19043 以降、定期実行で入る）
- [ ] グラフ再生成: `python3 gen-history-graph.py ../../../mutsu/HISTORY.tsv history-pass.svg`（spec_pass があれば橙線で重なる）
- [ ] コミット数・PR 数・issue 数・open issue 数
- [ ] ベンチ（bench-data ブランチの最新コミット）
- [ ] ecosystem pass rate
- [ ] Raku++ の README（バージョン・Roast）
- [ ] 1.0.0 のリリース日
- [ ] demo.html の VERSION を 1.0.0 に更新 → `sh fetch-mutsu-wasm.sh` → Wi-Fi を切って4つのデモが `(local)` で動くか確認
