---
created: 2026-08-16 07:44
updated: 2026-08-16 07:44
---
# polkit

デスクトップLinux環境で、非特権のGUIアプリケーションが管理者権限の操作を認可付きで実行するためのフレームワーク。認可の判断をアプリ本体からDBus越しに別デーモン(`polkitd`)へ委譲する設計になっている。 #linux #security

## `pkexec`

`pkexec(1)`は「認可されたユーザーが別のユーザー(デフォルトはroot)としてプログラムを実行する」ためのコマンド。`sudo`に似ているが、polkitのポリシー(`/etc/polkit-1/`配下のルール、あるいはPolicyKit Action定義)に基づいて認可が判断され、GUI環境ではパスワード入力ダイアログがグラフィカルに表示される。

## [[setuid-setgid|setuid]]との関係

かつてはGUIの管理系ツール(ディスク管理・ネットワーク設定・パッケージ管理GUIなど)を丸ごとsetuid-rootにして実装する例が多かった。polkitは「操作の可否を判定するロジック」を別プロセス(`polkitd`)に切り出し、DBus越しに問い合わせる形にすることで、setuid-rootバイナリの数そのものを減らす方向の設計になっている。認可ポリシーが一箇所(polkitのルール)に集約されるため、[[least-privilege|最小権限]]の管理・監査もしやすくなる。

## [[linux-privilege-mechanisms]]の中での位置づけ

[[setuid-setgid|setuid]]バイナリを増やさずに特権操作を委譲する、デスクトップ向けの仕組み。[[fuse-filesystem-in-userspace|FUSE]]の`fusermount3`のように処理そのものをsetuidバイナリにする方式と対比すると分かりやすい。

## 出典

- `man pkexec`
