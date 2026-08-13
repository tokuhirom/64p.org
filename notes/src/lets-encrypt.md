---
created: 2026-08-14 08:33
updated: 2026-08-14 08:33
---
# Let's Encrypt

非営利団体ISRG（Internet Security Research Group）が運営する、無料・自動化された認証局（CA）。証明書の費用と手作業という「WebのHTTPS化の障壁」を取り除くことを目的に、2015年にサービスを開始した。発行は[[acme|ACMEプロトコル]]で完全に自動化されている。 #security #web

## 90日ライフタイムという設計

開始当初から証明書の有効期間は90日で、これは今もデフォルト。ISRGのJosh Aasは2015年に理由を「自動化を強く促すのに十分短く、手動でもぎりぎり運用できる長さ」と説明している。有効期間が短いほど、鍵の漏洩や誤発行があったときに悪用できる期間が限られるという利点もある。

## さらに短命へ

- 2026年1月から、有効期間**6日**の短命証明書が一般提供されている
- 業界ルール（CA/Browser Forum）で2029年3月15日から証明書の最大有効期間が47日に制限されるため、Let's Encryptは2028年2月までに最大有効期間を45日へ短縮する計画を出している

証明書の寿命がどんどん短くなっていく流れは、「証明書の更新は自動化されているのが当たり前」という前提が業界標準になったことの現れと言える。手動更新を前提とした運用は今後成り立たなくなっていく。

## 出典

- [Let's Encrypt](https://letsencrypt.org/)
- [Why ninety-day lifetimes for certificates? - Let's Encrypt](https://letsencrypt.org/2015/11/09/why-90-days)
- [Certificate Lifetime Rationale and Plans - Let's Encrypt](https://letsencrypt.org/docs/cert-lifetimes/)
- [Decreasing Certificate Lifetimes to 45 Days - Let's Encrypt](https://letsencrypt.org/2025/12/02/from-90-to-45)
