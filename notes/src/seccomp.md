---
created: 2026-08-12 17:52
updated: 2026-08-16 07:44
---
# seccomp

#linux #kernel #security

secure computing mode。Linuxカーネルの機能で、プロセスが発行できるシステムコールを制限する仕組み。プロセスの攻撃対象領域（カーネルへの入口）を必要最小限に絞る、[[least-privilege|最小権限の原則]]のシステムコールレベルでの実践と言える。

## strict mode から filter mode へ

- **strict mode**: Andrea Arcangeli が「信頼できないコードを計算サンドボックスで動かす」用途（グリッドコンピューティング的なサービス）のために導入した初期形態。`prctl(PR_SET_SECCOMP, SECCOMP_MODE_STRICT)` を呼ぶと、以後そのプロセスは read / write / exit / sigreturn の4つのシステムコールしか使えなくなる。安全だが、純粋な数値計算のようなワークロード以外では実用にならなかった。
- **filter mode (seccomp-bpf)**: Linux 3.5 で入った現在の主流。[[bpf|BPF]]（classic BPF）のプログラムをフィルタとしてプロセスに取り付け、システムコールごとに「システムコール番号と引数」（`struct seccomp_data`）を評価して許可・拒否を判定する。Linux 3.17 からは専用の `seccomp()` システムコールで設定できる。

フィルタの判定結果は `SECCOMP_RET_ALLOW`（許可）、`SECCOMP_RET_ERRNO`（エラーを返す）、`SECCOMP_RET_TRAP`（シグナル送出）、`SECCOMP_RET_KILL_PROCESS`（プロセスをkill）などのアクションで表現する。Linux 5.0 では判定をユーザー空間のスーパーバイザに委譲する `SECCOMP_RET_USER_NOTIF` も入った。

## 設計上の面白い点

- BPFプログラムはポインタの参照外しができないため、フィルタはシステムコールの引数の値そのものしか評価できない。これは制約であると同時に、システムコール介入系の仕組みにありがちな TOCTOU（time-of-check-to-time-of-use）攻撃が構造的に成立しないという安全性でもある（ユーザーメモリ上の文字列引数などを検査対象にすると、検査後・実行前に書き換えられうる）。
- 一度取り付けたフィルタは外せず、子プロセスにも継承される。フィルタは積み重ねられ、複数ある場合は最も厳しい判定が勝つ。

## 採用例

Chrome/Chromium のレンダラサンドボックス（seccomp-bpf の初期の代表的ユーザー）、Docker などのコンテナランタイム（デフォルトの seccomp プロファイルで危険なシステムコールを遮断）、systemd の `SystemCallFilter=`、Firefox、OpenSSH など。コンテナの文脈では、namespace や [[cgroups]] による分離と組み合わせて使われる。

## [[linux-privilege-mechanisms]]の中での位置づけ

[[setuid-setgid|setuid]]や[[linux-capabilities|capabilities]]が「誰の権限で動くか」を制御するのに対し、seccompは「どのシステムコールを発行できるか」というより下位のレイヤーを制御する。非特権ユーザーがseccompフィルタを取り付けるには`no_new_privs`([[linux-capabilities]]ノート参照)が必要な点でも両者は結びついている。

## 出典

- [seccomp(2) - Linux manual page](https://www.man7.org/linux/man-pages/man2/seccomp.2.html)
- [Seccomp BPF (SECure COMPuting with filters) — The Linux Kernel documentation](https://www.kernel.org/doc/html/v4.19/userspace-api/seccomp_filter.html)
- [Seccomp: Enhance Security for Linux Applications - ARMO](https://www.armosec.io/blog/seccomp-internals-part-1/)
