---
created: 2026-08-16 07:44
updated: 2026-08-16 07:44
---
# Linuxの権限分離・権限昇格の仕組み

「非特権ユーザーがどうやって特権操作をするか」「プロセスの権限をどう絞り込むか」に関わるLinuxの仕組みを束ねるハブノート。[[fuse-hello-world-experiment|fuse-hello-world実験]]で`fusermount3`のsetuid昇格を手を動かして確認したのをきっかけに、関連する概念を整理した。 #moc #linux #security

## 土台: プロセスが持つID

- [[unix-uid-model|UNIXのUIDモデル]] — 実UID/実効UID/保存set-user-ID/fsuidの4つ組。他のすべての話の前提になる

## 古典的な昇格の仕組みとその弱点

- [[setuid-setgid|setuid / setgid]] — 実行ファイルのビット1つでEUIDを丸ごと昇格させる、最も古典的な仕組み。「昇格したら全権限」という粒度の粗さが弱点
- [[ptrace]] — デバッガ・トレーサーの基盤となるシステムコール。setuidとは意図的に交わらないよう設計されている
- [[ptrace-defeats-setuid]] — 上記2つの交点。「traceされているとsetuidの昇格が無効化される」ことを`strace -f`で実際に観測した記録

## 細粒度化・サンドボックス化の方向

- [[linux-capabilities|Linux capabilities]] — rootの全権限を約40個の単位に分割し、必要な分だけ与える。setuidの粗さを補う直接の代替
- [[seccomp]] — 発行できるシステムコールをフィルタで絞る。「誰の権限か」ではなく「何ができるか」を制限するレイヤ
- [[landlock|Landlock]] — 非特権プロセスが自分自身にファイルアクセス制限を自己適用できる仕組み。seccompと同じ「自分を絞る」方向だが、対象がシステムコールではなくファイルパスのようなオブジェクト
- [[bubblewrap|Bubblewrap]] — user namespaceを使い、setuidバイナリを一切使わずにサンドボックスを作るツール

## 権限の委譲

- [[polkit]] — デスクトップGUIアプリが管理者権限の操作を認可付きで実行するための仕組み。判断ロジックを別デーモンに切り出すことでsetuidバイナリを減らす方向

## 原則

- [[least-privilege|最小権限の原則]] — 上記すべての仕組みが実践しようとしている、より上位の設計原則
