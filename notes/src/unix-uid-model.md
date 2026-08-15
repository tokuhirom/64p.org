---
created: 2026-08-16 07:44
updated: 2026-08-16 07:44
---
# UNIXのユーザーID(UID)モデル

Linuxの各プロセスは、1種類のUIDだけでなく複数のUIDを同時に持っている。`credentials(7)`にまとまっている。GIDについても同様の4つ組がある。 #linux #unix #security

## 4つのID

| ID | 役割 |
|---|---|
| **実UID (real UID, RUID)** | プロセスの「所有者」。誰がこのプロセスを起動したかを表す。`getuid(2)`で取得 |
| **実効UID (effective UID, EUID)** | カーネルが実際の権限チェックに使う値。メッセージキュー・共有メモリ・セマフォなどへのアクセス可否を左右する。「今どの人物として振る舞っているか」に相当する。`geteuid(2)`で取得 |
| **保存set-user-ID (saved set-user-ID, saved-UID)** | [[setuid-setgid|setuidプログラム]]が実行開始時のEUIDを退避しておく場所 |
| **ファイルシステムUID (filesystem UID, fsuid)** | Linux固有。ファイルアクセス権限のチェック専用のID。EUIDが変わると自動的に追従するので通常は意識しなくてよいが、`setfsuid(2)`で単独に変更することもできる |

伝統的なUNIXではファイルアクセス権もEUIDで判定するが、Linuxはfsuidという専用のIDを別に持つ点が特徴。EUIDが変わると自動的にfsuidも追従するので、通常の利用では両者は同じ値になり、他のUNIXと見た目上の挙動は変わらない。

## なぜ4つも要るのか: 特権の一時放棄と再取得

[[setuid-setgid|setuidプログラム]]は、`seteuid(2)`/`setreuid(2)`/`setresuid(2)`を使って、EUIDを「実UID」と「保存UID」の間で行き来させられる。これにより、

1. 起動直後はEUID=保存UID(例: root)で特権を持つ
2. 特権が不要な処理をする間はEUIDを実UID側に一時的に下げる
3. 再び特権が必要になったらEUIDを保存UID側に戻す

という「必要な瞬間だけ昇格する」運用ができる。[[least-privilege|最小権限の原則]]の実装パターンの一つである「privilege bracketing」は、この4つ組の仕組みの上に成り立っている。

## execve(2)での扱い

`fork(2)`では親のIDがそのままコピーされる。`execve(2)`では実UID・実GID・補助グループIDは保持されるが、実行ファイルに[[setuid-setgid|set-user-ID/set-group-IDビット]]が立っていればEUID/EGIDが書き換わり、その新しいEUID/EGIDが保存UID/保存GIDにもコピーされる。

## [[linux-privilege-mechanisms]]の中での位置づけ

このノートは「プロセスがどのIDを持つか」という土台の話。そのIDを実行時にどう書き換えるかは[[setuid-setgid]]、細粒度化する方向は[[linux-capabilities]]を参照。

## 出典

- `man 7 credentials`
