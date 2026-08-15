---
created: 2026-08-15 23:41
updated: 2026-08-15 23:41
---
# Gmail/Yahoo一括送信者要件

Google・Yahoo(・Microsoft)が、1日あたり5,000通以上のメールを送る「一括送信者(bulk sender)」向けに課している送信要件。要件は主に以下の3系統。

- **認証** — [[dmarc|SPF/DKIM/DMARC]]を正しく設定していること。
- **配信品質** — スパム苦情率(spam complaint rate)を0.3%未満に保つこと。
- **利便性** — [[one-click-unsubscribe|ワンクリック配信停止(RFC 8058)]]への対応。

## 強制執行の変遷

- **2024年2月〜(ソフトエンフォースメント)** — 要件違反のメールは即座に拒否されるのではなく、配信の遅延(SMTPの421エラー、一時的な失敗として再送を促す)や迷惑メールフォルダ行きに留まっていた。
- **2025年11月〜(ハードエンフォースメント)** — Gmailは非準拠の一括メールを550番台のSMTPエラー(5xx、恒久的な拒否)で即座にリジェクトするようになった。421エラーと違い再送されず、メールはそもそも配送されない。Yahoo・Microsoftも同様に、猶予を与える運用から拒否する運用へ移行した。

## 2026年時点の状況

- 一括送信者の約3割は、認証・ワンクリック配信停止・スパムしきい値のいずれかで依然として部分的に非準拠。
- 準拠している送信者のInbox到達率の目安は、Gmailで約87%、Microsoftで約75.6%。
- 継続的なハードバウンス率が2〜3%を超えると、各社のメールサーバーでスロットリング(送信制限)が発生する。
- 非準拠の一括送信者は、通常5〜10%程度の迷惑メールフォルダ行き率が22〜34%まで跳ね上がる。

## [[email-authentication|メール送信者認証]]の中での位置づけ

[[dmarc|DMARC]]・[[one-click-unsubscribe|RFC 8058]]という技術仕様を、大手メールプロバイダが実際にどう運用・強制しているかをまとめたもの。技術仕様自体は任意だが、Gmail/Yahoo宛のメール到達率に直結するため、事実上の必須要件になっている。

## 出典

- [Bulk Email Sender Rules For Google, Yahoo, Microsoft & Apple (2026)](https://powerdmarc.com/bulk-email-sender-requirements/)
- [Google and Yahoo Updated Email Authentication Requirements for 2025](https://securityboulevard.com/2025/11/google-and-yahoo-updated-email-authentication-requirements-for-2025/)
- [Email Deliverability Benchmarks 2026: Industry Report](https://www.digitalapplied.com/blog/email-deliverability-benchmarks-2026-industry)

#email #deliverability #gmail #yahoo #dmarc
