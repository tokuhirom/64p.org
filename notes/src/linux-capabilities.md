---
created: 2026-08-16 07:44
updated: 2026-08-16 07:44
---
# Linux capabilities

Linux 2.2以降、伝統的な「rootは全権限・非rootは権限チェックあり」という2値のモデルを、`CAP_NET_BIND_SERVICE`(1024番未満のポートbind)・`CAP_SYS_PTRACE`など約40個の独立したcapabilityに分割した仕組み。プロセスごとに必要なcapabilityだけを個別に有効化/無効化できる。 #linux #security

## [[setuid-setgid|setuid]]との違い

setuidは「昇格したらそのユーザー(多くはroot)の全権限」という粗い粒度なのに対し、capabilitiesは権限を単位ごとに切り出せる。例えば「1024番未満のポートをbindしたいだけ」のプログラムに、root権限そのものではなく`CAP_NET_BIND_SERVICE`だけを持たせれば、脆弱性があってもroot全権限を奪われるリスクを避けられる。

## ファイルcapability

Linux 2.6.24以降、`setcap(8)`で実行ファイルの拡張属性(`security.capability`)にcapability集合を埋め込める。これによりsetuid-rootにせず、実行ファイル単位で細粒度な特権を付与できる。ファイルcapabilityには3つの集合があり、スレッド側の集合との組み合わせで`execve(2)`後の最終的なcapabilityが決まる。

- **Permitted**: 無条件でスレッドに許可される
- **Inheritable**: スレッド側のInheritable集合とANDされ、`execve(2)`後のPermitted集合に反映される
- **Effective**: 実際に権限チェックに使われる集合

## Ambient capabilities

Linux 4.3以降、`prctl(2)`で直接操作できる「Ambient」集合も追加された。setuid/setgidによるID変更やファイルcapability付きプログラムの実行はAmbient集合をクリアする。

## `no_new_privs`との関係

`no_new_privs`属性(`prctl(2)`)が立っているスレッドでは、[[setuid-setgid|setuid/setgidビット]]による昇格と同様に、ファイルcapabilityによる権限付与も無視される。systemdの`NoNewPrivileges=`はこの属性を立てる形で「このプロセスとその子孫は二度と`execve()`経由で特権を得られない」ことを保証する。[[seccomp]]フィルタを非特権ユーザーが取り付ける前提条件(`CAP_SYS_ADMIN`か`no_new_privs`のどちらかが必要)にもなっている。

## systemdでの宣言的な管理

`systemd.exec`のunit定義には、実行ファイル側にcapabilityを埋め込まずとも権限を宣言できるディレクティブがある。

- `CapabilityBoundingSet=` — プロセスが持てるcapabilityの上限集合を絞る
- `AmbientCapabilities=` — 実際に有効化するcapabilityを指定
- `DynamicUser=` — 起動のたびに使い捨てのUID/GIDを動的割り当て

実行ファイルのメタデータ(setuidビットやファイルcapability)に権限を埋め込むモデルから、起動する側(systemd)がポリシーを一元管理するモデルへの移行と言える。

## [[linux-privilege-mechanisms]]の中での位置づけ

[[setuid-setgid|setuid]]の「昇格したら丸ごと全権限」という粗さを補う、細粒度化の方向の代替。[[seccomp]]や[[landlock|Landlock]]とはレイヤが異なり(こちらは「誰の権限か」、あちらは「何ができるか」)、組み合わせて使われることが多い。

## 出典

- `man 7 capabilities`
- `man systemd.exec`
