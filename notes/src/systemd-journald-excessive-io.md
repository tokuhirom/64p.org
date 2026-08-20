---
created: 2026-08-14 08:14
updated: 2026-08-20 09:10
---
# systemd-journaldの過剰なI/O

systemd-journaldはsystemdのログ収集デーモンで、ログをテキストのsyslog形式ではなく独自のバイナリ形式(journal file)でディスクに書き込む。この形式・書き込み方式が原因で、実際のログ出力量に対して不釣り合いに大きなディスクI/Oが発生することがある。

## 報告されている事例

[systemd/systemd#40262](https://github.com/systemd/systemd/issues/40262)(2026年1月3日、報告者XANi)では、Debian 13・systemd 257.9・XFS上のVMで、1秒あたり2行程度のログ書き込みに対して約50 IOPSが観測されたと報告されている。従来のsyslogでの書き込みと比べて桁違いに大きいI/O負荷になっているという指摘。

報告者は同種の過去のIssue(iotopの測定精度不足として却下されたもの)を踏まえた上で、カーネルレベルの計測を含めても journal のフォーマット自体が非効率であると主張している。挙げられている論点は次の2点。

- 実際に書き込まれるログのデータ量に対し、journalファイルのサイズが数倍に膨らむ
- 不正シャットダウン時にjournalファイルが破損しやすい

本Issueは2026年8月時点でOpen(未解決)、`bug`・`journal`ラベルが付いている。

同Issueは後に、ログ1行の書き込みでext4で49KB以上、btrfsで110KB以上のディスク書き込みが発生するという定量報告が追加され、[Hacker Newsで議論](https://news.ycombinator.com/item?id=49290215)を呼んだ。

## 過剰I/Oの技術的な原因

journaldをメンテナンスしてきた開発者(pengaru)によるHacker News上での解析では、次の点が原因として挙げられている。

- 新しいログ行を追記するたびにハッシュテーブルの更新が発生し、ディスク上の分散した位置への小さな書き込みが生じる
- こうした小規模書き込みがストレージのブロック単位に増幅され、書き込みがブロックサイズの境界をまたぐとさらに複数ブロックの書き込みになる
- ジャーナルファイルへのmmapベースのアクセスが、ページキャッシュの汚染や不要な先読みを引き起こす

journalのフォーマットが元々目指していた「ログエントリは高度に反復的なので、ディスクへの書き込み量自体は実質的に小さいはず」という設計意図に対し、実装がこの目標を達成できていない、という評価がなされている。

## 代替フォーマット案

Hacker News上の議論では、journalの独自バイナリ形式に代わる案として、SQLite・[[duckdb|DuckDB]]・Parquetなどの既存フォーマットの活用が提案された。それぞれについて次のような指摘もある。

- SQLiteは書き直し型(rewrite-based)のデータベースであり、少量データの頻繁な書き込みではwrite amplificationが大きいという反論がある
- Parquetは列指向・高圧縮で有利だが、行グループ単位のバッチ書き込みを前提とするため、ログのように低ボリュームで逐次発生するデータには向かないという指摘がある
- 最もwrite amplificationが小さいのは、結局プレーンテキストファイルへの追記だという意見もある

#systemd #logging

## 出典

- [Excessive IO caused by systemd-journald · Issue #40262 · systemd/systemd](https://github.com/systemd/systemd/issues/40262)
- [Single log line is 49KB+ (ext4) / 110KB+ (btrfs) of systemd-journald disk writes | Hacker News](https://news.ycombinator.com/item?id=49290215)
