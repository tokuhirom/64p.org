---
created: 2026-08-16 07:48
updated: 2026-08-16 07:48
---
# strace

Linuxのシステムコールトレーサー。プロセスが発行するシステムコールとその引数・戻り値、受信したシグナルを人間可読な形で表示するコマンドラインツール。1991年にPaul KranenburgがSunOS向けに書いたものが起源で、翌年Branko LankesterがLinux移植とカーネル側のptraceサポートを書いた。 #linux #security

## 実装原理: `PTRACE_SYSCALL`でシステムコールの境界ごとに止める

内部的には[[ptrace]]の`PTRACE_SYSCALL`操作を使う。`ptrace(2)`によると、トレーシーをこのオペレーションで再開すると、次のシステムコールの**入口**または**出口**で自動的に停止する。

1. straceが`fork()`→子で`PTRACE_TRACEME`→`execve()`(新規起動の場合)、または既存プロセスに`PTRACE_ATTACH`(`-p`オプションの場合)
2. `PTRACE_SYSCALL`でトレーシーを再開
3. トレーシーが次にシステムコールに入る瞬間(**syscall-enter-stop**)で自動停止
4. straceが`PTRACE_GETREGSET`などでレジスタを読み、システムコール番号と引数を取得・表示
5. 再び`PTRACE_SYSCALL`で再開すると、今度はシステムコールが完了した瞬間(**syscall-exit-stop**)で止まる
6. straceが戻り値を読んで`) = 結果`の部分を表示し、3に戻る

レジスタの読み方はアーキテクチャ依存。`man 2 syscall`のcalling conventionテーブルによれば、x86-64ではシステムコール番号が`rax`(enter時)、引数が`rdi`/`rsi`/`rdx`/`r10`/`r8`/`r9`、戻り値が`rax`(exit時)に入る。straceはこれをアーキテクチャごとのテーブルとシステムコール名/引数の型定義に突き合わせて`open("/etc/fuse.conf", O_RDONLY) = 3`のような表示に変換している。

strace本体のメインループは公式ドキュメント(`doc/INTERNALS.md`)によれば非常に単純。

```c
while (dispatch_event(next_event()))
    ;
```

`next_event()`が`wait4()`で停止イベントを待ち、`dispatch_event()`がsyscall-stopなら`trace_syscall()`でデコード・表示し、`ptrace_restart()`で再開する。

## 落とし穴: enter-stopとexit-stopは見分けがつかない

`doc/README-linux-ptrace`によると、この2種類の停止はトレーサー側からは本質的に区別できない(同じ`SIGTRAP`に見える)。straceは`PTRACE_O_TRACESYSGOOD`オプションを`PTRACE_SETOPTIONS`で立てることで対処している。これを立てるとsyscall-stopの時だけ`WSTOPSIG(status) == (SIGTRAP | 0x80)`という見分けやすい値になり、信頼性が高くオーバーヘッドもない。`PTRACE_GETSIGINFO`の`si_code`を見る方法やレジスタの値で判定する方法もあるが、いずれも「fragile(壊れやすい)」と明記されている。

## `--seccomp-bpf`オプション: オーバーヘッド対策

通常モードは全システムコールで停止するためコンテキストスイッチが2倍(enter+exit)に増え、トレース対象のプロセスは体感できるほど遅くなる。`--seccomp-bpf`(`-f`と併用時のみ有効)を使うと、[[seccomp]]の`SECCOMP_RET_TRACE`アクションを使うBPFフィルタをトレーシーに注入し、カーネル側で「見る必要のあるシステムコールだけ」を選別してからptrace-stopを発生させる。フィルタ対象外のシステムコールはstopなしで直接実行されるため、大幅にオーバーヘッドを削減できる。

## [[setuid-setgid|setuid]]との相互作用

[[ptrace-defeats-setuid]]に書いた通り、straceでトレースしている間は対象プロセスのsetuid/setgidによる昇格が無効化される。[[fuse-hello-world-experiment]]で`strace -f`を使って`fusermount3`(setuid-root)をトレースした際、この制約により`fusermount3`自身のマウント処理までEPERMで失敗する挙動を実際に観測した。

## [[linux-privilege-mechanisms]]の中での位置づけ

[[ptrace]]の代表的な利用者。[[ptrace-defeats-setuid]]で見た「setuidとの非交差設計」がユーザーに見える形で現れる場面でもある。

## 出典

- `man 2 ptrace`
- `man strace`
- `man 2 syscall`
- [strace/doc/README-linux-ptrace](https://github.com/strace/strace/blob/master/doc/README-linux-ptrace)
- [strace/doc/INTERNALS.md](https://github.com/strace/strace/blob/master/doc/INTERNALS.md)
