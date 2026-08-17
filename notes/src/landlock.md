---
created: 2026-08-16 07:44
updated: 2026-08-18 08:44
---
# Landlock

Linux 5.13で導入された、非特権プロセスが「自分自身とその将来の子プロセス」に対してアクセス制御を自己適用できる仕組み。`landlock(7)`。積み重ね可能な[[linux-security-modules|LSM]]として実装されている。 #linux #security

## setuidやcapabilitiesとの方向性の違い

[[setuid-setgid|setuid]]や[[linux-capabilities|capabilities]]が「他人・他プロセスに権限を与える／絞る」仕組みなのに対し、Landlockは「自分自身の権限を自分で絞る」方向の仕組み。root権限もCAP_SYS_ADMINのような特別なcapabilityも必要とせず、非特権プロセスが単独で利用できる点が特徴。ブラウザのレンダラープロセスのような「信頼できない入力を処理する部分を自己隔離する」用途に向く。

## 使い方

3つのシステムコールで構成される。

1. `landlock_create_ruleset(2)` — 新しいルールセットを作る
2. `landlock_add_rule(2)` — ルールセットにルールを追加する(例: 「特定のディレクトリ配下は読み取り専用」)
3. `landlock_restrict_self(2)` — ルールセットを呼び出し元スレッドに強制する

ルールはファイル階層(パス)に紐づく形で「あるオブジェクトに対して許可するアクセス権」を表現する。一度`landlock_restrict_self(2)`で適用すると、その制限を自分で緩めることはできない。

## [[linux-privilege-mechanisms]]の中での位置づけ

[[setuid-setgid|setuid]]や[[linux-capabilities|capabilities]]が「他者に権限を与える」方向なのに対し、Landlockと[[seccomp]]は「自分自身の権限を絞る」方向。両者の違いは、seccompがシステムコール単位のフィルタなのに対し、Landlockはファイルパスのようなオブジェクト単位でルールを表現できる点。

## [[linux-7.2|Linux 7.2]]での強化

[[linux-7.2|Linux 7.2]]でも機能強化が入っている。詳細は[[linux-7.2|Linux 7.2]]のノート参照。

## 出典

- `man 7 landlock`
