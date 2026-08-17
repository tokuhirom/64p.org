---
created: 2026-08-17 18:38
updated: 2026-08-17 18:38
---
# hyperfine

Rust製のコマンドラインベンチマークツール。任意のシェルコマンドを複数回実行し、統計的に処理時間を比較する。

## 特徴

- デフォルトで最低10回・3秒以上の計測を自動で行い、平均・標準偏差・外れ値検出などを算出する。
- ウォームアップ実行(`-w`)、各計測前の準備コマンド(`-p`、キャッシュクリアなどに使う)を指定できる。
- 複数コマンドを一度に比較できる(`hyperfine 'cmd1' 'cmd2'`)。
- パラメータを振っての計測(`-P/--parameter-scan`, `-L/--parameter-list`)ができ、スレッド数などを変えたベンチマークを1コマンドで回せる。
- 結果をCSV/JSON/Markdown/AsciiDocへエクスポートできる。

## bisectとの関係

hyperfine自体に`git bisect`のようなbisect機能は無い。ただし`git bisect`と組み合わせて「各コミットでhyperfineを実行し、性能が閾値を超えたら失敗扱いにする」という使い方(性能回帰のbisect)は一般的に行われている。`Chronologer`や`Bencher`のような周辺ツールが、hyperfineの上にGit履歴を跨いだ性能追跡・CI回帰検出の機能を重ねている。

つまり「bisectするツール」というより「bisectの各ステップでの計測に使うツール」という位置づけ。

## 出典

- [GitHub - sharkdp/hyperfine: A command-line benchmarking tool](https://github.com/sharkdp/hyperfine)

#cli #benchmark
