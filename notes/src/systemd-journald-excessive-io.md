---
created: 2026-08-14 08:14
updated: 2026-08-14 08:14
---
# systemd-journaldの過剰なI/O

systemd-journaldはsystemdのログ収集デーモンで、ログをテキストのsyslog形式ではなく独自のバイナリ形式(journal file)でディスクに書き込む。この形式・書き込み方式が原因で、実際のログ出力量に対して不釣り合いに大きなディスクI/Oが発生することがある。

## 報告されている事例

[systemd/systemd#40262](https://github.com/systemd/systemd/issues/40262)(2026年1月3日、報告者XANi)では、Debian 13・systemd 257.9・XFS上のVMで、1秒あたり2行程度のログ書き込みに対して約50 IOPSが観測されたと報告されている。従来のsyslogでの書き込みと比べて桁違いに大きいI/O負荷になっているという指摘。

報告者は同種の過去のIssue(iotopの測定精度不足として却下されたもの)を踏まえた上で、カーネルレベルの計測を含めても journal のフォーマット自体が非効率であると主張している。挙げられている論点は次の2点。

- 実際に書き込まれるログのデータ量に対し、journalファイルのサイズが数倍に膨らむ
- 不正シャットダウン時にjournalファイルが破損しやすい

本Issueは2026年8月時点でOpen(未解決)、`bug`・`journal`ラベルが付いている。

#systemd #logging

## 出典

- [Excessive IO caused by systemd-journald · Issue #40262 · systemd/systemd](https://github.com/systemd/systemd/issues/40262)
