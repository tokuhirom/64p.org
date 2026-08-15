---
created: 2026-08-16 07:44
updated: 2026-08-16 07:44
---
# setuid / setgid

実行ファイルのパーミッションビットに立てられる特殊フラグ(`S_ISUID`/`S_ISGID`、`chmod u+s`/`chmod g+s`で設定)。このビットが立ったファイルを`execve(2)`すると、実行したユーザーに関わらず、プロセスの[[unix-uid-model|実効UID/実効GID]]がファイルの所有者・所有グループに書き換わる。 #linux #unix #security

## 具体例

[[fuse-filesystem-in-userspace|FUSE]]の`fusermount3`(`-rwsr-xr-x root root`)が典型例。誰が実行してもEUID=0(root)として動くため、非特権ユーザーのままFUSEファイルシステムをマウントできる。実際にこの仕組みを[[fuse-hello-world-experiment]]で確認した。他には`passwd`(`/etc/shadow`書き換えのためroot権限が必要)などが伝統的な用途。

## execve(2)時に無効化される3条件

`execve(2)`のman pageには、この昇格が起きない条件が明記されている。

- 呼び出し側スレッドに`no_new_privs`属性が立っている(`prctl(2)`、[[linux-capabilities]]ノート参照)
- ファイルシステムが`nosuid`でマウントされている
- 呼び出し元プロセスが[[ptrace|ptrace]]されている(詳細は[[ptrace-defeats-setuid]])

このとき[[linux-capabilities|ファイルcapability]]も同様に無視される。逆方向として、いったんsetuidで昇格したプロセスはptraceの対象にできない(`execve(2)`man page: "Set-user-ID and set-group-ID processes can not be ptrace(2)d")。特権化の前後どちらの向きでもptraceとsetuidが交わらないよう設計されている。

## 弱点として知られている点

setuid/setgidは「昇格したら丸ごとそのユーザー(多くはroot)相当の権限になる」という粒度の粗さが弱点として知られている。バイナリに脆弱性があれば、その脆弱性はそのままroot権限での任意コード実行に直結しうる。この弱点を補う方向で[[linux-capabilities|Linux capabilities]]による細粒度化や、[[bubblewrap|user namespace]]によるsetuid自体の回避が進んでいる。

## [[linux-privilege-mechanisms]]の中での位置づけ

[[unix-uid-model|UIDモデル]]を実行時に書き換える古典的な手段。粒度の粗さを補う細粒度な代替が[[linux-capabilities]]、setuid自体を不要にする代替が[[bubblewrap|user namespace]]や[[polkit]]。

## 出典

- `man 2 execve`
- `man 7 credentials`
