---
created: 2026-08-16 07:36
updated: 2026-08-16 07:36
---
# ptraceされているプロセスはsetuidの昇格が無効化される

Linuxでは、`ptrace`でトレースされているプロセスが`execve(2)`でsetuid/setgidビット付きの実行ファイルを実行しても、実効ユーザーID(EUID)の昇格が行われない。`man strace`のBUGSセクションに一次情報として明記されている。

> Programs that use the setuid bit do not have effective user ID privileges while being traced.

`strace`自身のオプション`--user=username`の説明にも同じ制約が書かれている。「`strace`自身がroot権限で動いている場合のみ有効なオプションで、それ以外の場合、setuid/setgidプログラムは実効特権なしで実行される」という趣旨。

## なぜこの制約があるか

setuidバイナリは「実行した瞬間にroot(など他ユーザー)の権限に切り替わる」ことが前提の仕組み。もしトレーサー(ptraceする側)がトレーシー(される側)のメモリ・レジスタを自由に読み書きできる状態のまま昇格を許してしまうと、非特権ユーザーがトレーサー経由でroot権限のプロセスの実行内容を覗き見・改竄できてしまい、setuidの権限分離が意味を失う。この問題は歴史的に実際の脆弱性（ptrace/setuid実行のレースコンディションによる権限昇格）として悪用された経緯があり、その対策として「トレースされている間はsetuidによる昇格自体を止める」という設計になっている。

## 手を動かして確認したこと

[[fuse-hello-world-experiment]]で、非rootユーザーのプロセスが`fusermount3`（setuid-rootの[[fuse-filesystem-in-userspace|FUSE]]マウントヘルパー）を`fork`・`exec`する場面を`strace -f`でトレースしたところ、通常は成功するはずの`fusermount3`側の`mount(2)`システムコールまで`EPERM`（Operation not permitted）で失敗する挙動を実際に観測した。`strace -f`が`fusermount3`のexecve後もトレースを継続する(=`fusermount3`もトレースされたまま動く)ため、setuidによる昇格が無効化され、`fusermount3`が非特権のままmountを試みて失敗した、という説明と一致する結果だった。

## 出典

- `man strace`（BUGSセクション、`--user`オプションの説明）
