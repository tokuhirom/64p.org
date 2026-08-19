---
created: 2026-08-19 12:48
updated: 2026-08-19 12:48
---
# CTログ監視・検索ツール

[[certificate-transparency|Certificate Transparency]]ログを検索・監視するための代表的なツール群。証明書に含まれるホスト名(CN/SAN)を手がかりに、ドメイン・サブドメインの発見やセキュリティ監視に使われる。 #security #pki #osint #moc

- [[crtsh|crt.sh]] — Sectigoが運営する無料のWeb検索・API。過去分も含めた蓄積データにクエリを投げる「検索型」。
- [[certstream|CertStream]] — 新規発行された証明書をWebSocket/SSEでリアルタイム配信する「プッシュ型」フィード。
- [[gungnir|Gungnir]] — CTログを監視し新規ドメインを標準出力へ流すGo製CLI。パイプで他ツールに繋げる偵察向けの「プッシュ型」ツール。

過去に発行された証明書を遡って調べたいなら crt.sh、発行された瞬間をリアルタイムで捕捉したいなら CertStream か Gungnir、という使い分けになる。
