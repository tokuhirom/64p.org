---
created: 2026-08-15 23:41
updated: 2026-08-15 23:41
---
# メール送信者認証(SPF/DKIM/DMARC/BIMI/ARC)

メールの送信者が名乗っているドメインの正当性を検証し、なりすまし・フィッシングを防ぐための一連の技術・運用ルールを束ねるハブノート。

- [[dmarc|DMARC]] — SPF/DKIMの認証結果をもとに、なりすましメールをどう扱うか(none/quarantine/reject)をドメイン所有者がDNSで宣言する中核プロトコル。2026年にDMARCbis(RFC 9989)として仕様改訂された。
- [[bimi|BIMI]] — DMARCのquarantine/rejectポリシーを前提に、受信箱にブランドロゴを表示する仕組み。VMC(Verified Mark Certificate)でロゴの真正性を証明する。
- [[arc-email|ARC]] — メーリングリスト等の転送でSPF/DKIMが壊れてDMARCが失敗してしまう問題を、中継者が認証結果を引き継ぐことで緩和する仕組み。
- [[one-click-unsubscribe|ワンクリック配信停止(RFC 8058)]] — メールヘッダーだけで購読解除を完結させる仕組み。認証そのものではないが、一括送信者要件の一部として運用されている。
- [[gmail-yahoo-bulk-sender-requirements|Gmail/Yahoo一括送信者要件]] — 上記の技術群を大手メールプロバイダが実際にどう強制執行しているか、という運用面のまとめ。

なりすまし対策(DMARC/BIMI)、転送耐性(ARC)、配信品質・運用要件(ワンクリック配信停止、一括送信者要件)という異なる切り口の技術が、Gmail/Yahoo宛のメール到達率という1つの実利のために組み合わさって運用されている、という構図。

#moc #email #security #dmarc
