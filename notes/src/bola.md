---
created: 2026-08-11 11:23
updated: 2026-08-11 11:23
---
# BOLA（Broken Object Level Authorization）

OWASP API Security Top 10で最上位（API1:2023）に位置づけられる脆弱性カテゴリ。オブジェクトレベルの認可メカニズムの不備を指す、IDOR（Insecure Direct Object References）系の典型的な脆弱性。

## 原因

サーバーコンポーネントは通常、クライアントの状態を完全には追跡せず、代わりにクライアントから送信されるオブジェクトIDなどのパラメータに依存して、どのオブジェクトにアクセスするかを決定する。このオブジェクトIDに対するアクセス権限の検証が欠けていると、攻撃者はIDを差し替えるだけで本来アクセスできないはずの他人のリソースを操作できてしまう。

## 典型的な攻撃例（OWASP掲載）

- 電子商取引プラットフォームで、URLパターン`/shops/{shopName}/revenue_data.json`の店舗名を操作し、他店舗の売上データにアクセスする。
- 自動車メーカーのAPIで、車両識別番号（VIN）が所有者本人のものかの検証が不足しており、他人の車両をリモート操作できてしまう。
- ドキュメント管理サービスの削除機能が許可チェックを実施しておらず、他ユーザーのドキュメントを削除できてしまう。

## 対策

- ユーザーポリシー・階層に基づく適切な認可メカニズムを実装する。
- クライアント入力に基づいてレコードへアクセスするすべての関数で認可チェックを行う。
- レコードIDにGUIDなど予測不可能なランダム値を使う。
- 認可メカニズムの脆弱性を評価するテストを実施する。

## 関連

[[ai-agent-gym-booking-hack]]では、AIエージェントがこのBOLA脆弱性を自ら発見・悪用してしまった事例が報告されている。

## 出典

- [API1:2023 Broken Object Level Authorization - OWASP](https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/)

#security #api
