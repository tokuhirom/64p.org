---
created: 2026-08-16 07:44
updated: 2026-08-16 07:44
---
# ptrace

`ptrace(2)`システムコール。あるプロセス(トレーサー)が別のプロセス(トレーシー)のメモリ・レジスタを観察・変更し、シグナル配送のたびに実行を止めて制御を奪えるようにする仕組み。`gdb`のようなデバッガや`strace`のようなシステムコールトレーサーの基盤になっている。 #linux #unix #security

## 基本的な使い方

トレーシー側が自ら`PTRACE_TRACEME`を呼んでからトレーサーに`exec`されるか、トレーサー側が既存のプロセスに`PTRACE_ATTACH`/`PTRACE_SEIZE`でアタッチするかの2通りで開始する。トレース中、トレーシーはシグナルを受け取るたびに停止し、トレーサーは`waitpid(2)`でそれを検知して、レジスタ・メモリの読み書き(`PTRACE_PEEKTEXT`/`PTRACE_GETREGS`など)や、シグナルの差し替え・システムコールの結果改変を行える。

## アクセス制御

`PTRACE_ATTACH`には`CAP_SYS_PTRACE`か、対象プロセスへシグナルを送れる権限(≒同一ユーザーであること)が必要。加えて多くのLinuxディストリビューションでは[[yama-lsm|Yama LSM]]の`ptrace_scope`によって、デフォルトでも「親子関係にあるプロセスのみアタッチ可能」のようにさらに制限されている。

## setuid/setgidとの非交差設計

`ptrace`と[[setuid-setgid|setuid/setgid]]は、意図的に交わらないよう設計されている。

- トレースされているプロセスが`execve(2)`でsetuid/setgidプログラムを実行しても、実効UID/GIDの昇格は行われない(詳細と実験での観察は[[ptrace-defeats-setuid]])
- 逆に、いったんsetuid/setgidで昇格したプロセスはptraceの対象にできない

これは、トレーサー側がトレーシーのメモリ・実行状態を自由に操作できるという`ptrace`の強力さゆえの制約。もし昇格後もトレース可能だったり、トレース中に昇格できてしまうと、非特権プロセスがptrace経由でroot権限のプロセスを乗っ取れてしまい、setuidによる権限分離が意味を失う。

## [[linux-privilege-mechanisms]]の中での位置づけ

[[setuid-setgid]]との非交差設計の具体的な観測は[[ptrace-defeats-setuid]]、ptrace自体をさらに制限する[[yama-lsm|Yama LSM]]もあわせて参照。

## 出典

- `man 2 ptrace`
- `man 2 execve`
