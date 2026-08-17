---
created: 2026-08-11 16:42
updated: 2026-08-17 18:25
---
# Yama (Yama LSM)

Linuxカーネルの[[linux-security-modules|LSM]] (Linux Security Module) フレームワーク向けの実装の一つ。Kees Cookが開発し、2010〜2011年頃にパッチが提出された。symlink/hardlink保護や[[ptrace]]制限など、以前からOpenwallや[[grsecurity]]といった別配布・パッチセットで個別に存在していたDAC（Discretionary Access Control）強化機能を、メインラインカーネルに統合する形でまとめたモジュール。ptraceの制限ロジックは元々grsecurityの「子プロセスのみ」制限がベースになっている。

## 主な目的: ptraceの制限

同一ユーザーが自分の任意のプロセスのメモリ・実行状態を検査できてしまう既定の挙動を制限する。あるアプリケーションが侵害された場合でも、攻撃者が同じユーザー権限の別プロセスに[[ptrace]]でアタッチして機密情報を抜き取ったり処理を改ざんしたりするのを防ぐのが狙い。

## ptrace_scope の4モード

`/proc/sys/kernel/yama/ptrace_scope`で設定する。

- **0（従来型）**: dumpableであれば、同一uidの任意のプロセスに`PTRACE_ATTACH`可能
- **1（制限型、Yamaのデフォルト）**: 親子関係などあらかじめ定義された関係を持つプロセスのみアタッチ可能。`prctl(PR_SET_PTRACER, pid, ...)`で明示的に許可するプロセスを指定できる。KDE・Chromium・Firefoxのクラッシュハンドラや、[[wine|Wine]]が同種プロセス間のptraceのみ許可する用途で使用
- **2（管理者のみ）**: `CAP_SYS_PTRACE`権限を持つプロセスのみ利用可能
- **3（禁止）**: ptrace使用を完全禁止。この設定にすると、再起動までリバート不可

## 設定方法

ビルド時は`CONFIG_SECURITY_YAMA`で有効化を選択する。実行時は`/proc/sys/kernel/yama`配下のsysctlで制御し、変更には`CAP_SYS_PTRACE`が必要。

#kernel #linux #security

## 出典

- [Yama — The Linux Kernel documentation](https://docs.kernel.org/admin-guide/LSM/Yama.html)
- [Protect against ptrace of processes: kernel.yama.ptrace_scope - Linux Audit](https://linux-audit.com/protect-ptrace-processes-kernel-yama-ptrace_scope/)
- [security: Yama LSM [LWN.net]](https://lwn.net/Articles/393012/)
