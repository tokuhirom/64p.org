---
created: 2026-08-15 23:41
updated: 2026-08-15 23:41
---
# ワンクリック配信停止 (RFC 8058)

メールのヘッダーだけで購読解除を完結させる仕組み。ユーザーがメールクライアント上の「配信停止」ボタンを押すと、メール本文中のリンクを開かせるのではなく、クライアント(Gmail/Yahoo等)側が裏側で直接HTTP POSTリクエストを送るだけで処理が完了する。

## ヘッダーの構成

- `List-Unsubscribe` — 配信停止用のURLを指定する(以前からある古いヘッダー)。
- `List-Unsubscribe-Post` — このURLがワンクリックPOST方式に対応していることを示す。値は`List-Unsubscribe=One-Click`固定。

この2つのヘッダーが揃っていて初めて、メールクライアントは確認画面を挟まずに1クリックで配信停止処理を実行できる。

## セキュリティ上の要件

Gmailは、`List-Unsubscribe`と`List-Unsubscribe-Post`の両ヘッダーが**DKIM署名でカバーされていない**場合、ワンクリック機能を有効にしない。署名対象に含めておかないと、中間者によるヘッダー改ざんで意図しない配信停止・スパムを誘発できてしまうため。

## Gmail/Yahooでの必須化

2024年2月以降、Google・Yahoo・Microsoftは[[gmail-yahoo-bulk-sender-requirements|一括送信者要件]]の一部として、1日5,000通以上送信する送信者にRFC 8058対応を義務付けている。配信停止リクエストは48時間以内に処理する必要がある。対象はプロモーション・商用メールのみで、注文確認などのトランザクションメールには要求されない。

## [[email-authentication|メール送信者認証]]の中での位置づけ

[[dmarc|DMARC]]/[[bimi|BIMI]]がドメインのなりすまし対策であるのに対し、こちらは受信者側の利便性・エンゲージメント指標(スパム報告率の抑制)に関わる運用ルール。[[gmail-yahoo-bulk-sender-requirements|Gmail/Yahooの一括送信者要件]]では両系統がセットで要求されている。

## 出典

- [What Is RFC 8058? How Does it Enable One-click Unsubscribe?](https://www.mailgun.com/blog/deliverability/what-is-rfc-8058/)
- [One-click unsubscribe: What it is, how it works and RFC 8058](https://www.valimail.com/blog/one-click-unsubscribe/)
- [Gmail and Yahoo one-click unsubscribe: implementing RFC 8058](https://www.captaindns.com/en/blog/gmail-one-click-unsubscribe-rfc8058)

#email #rfc #deliverability
