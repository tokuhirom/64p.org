---
created: 2026-08-15 23:41
updated: 2026-08-15 23:41
---
# DMARC (Domain-based Message Authentication, Reporting & Conformance)

送信ドメインへの「なりすまし」を検知・拒否するためのメール認証プロトコル。SPF・DKIMという2つの下位検証の結果をもとに、受信サーバーがどう振る舞うべきかをドメイン所有者がDNSで宣言する。

## 前提: SPFとDKIM

- **SPF (Sender Policy Framework)** — 「このドメインからのメールを送ってよいIPアドレス」をDNSのTXTレコードで公開する仕組み。受信サーバーは接続元IPがSPFレコードに含まれるかを見る。
- **DKIM (DomainKeys Identified Mail)** — メールヘッダー・本文に電子署名を付与し、対応する公開鍵をDNSで公開する仕組み。改ざんされていないこと・そのドメインの秘密鍵で署名されたことを検証できる。

SPF・DKIMはどちらも「エンベロープFrom」や「署名ドメイン(d=タグ)」を検証するもので、ユーザーが実際に目にする「Fromヘッダーのドメイン」と必ずしも一致するとは限らない。DMARCはこのズレ(アライメント)まで含めてチェックする。

## 仕組み

`_dmarc.example.com`にTXTレコードとして`v=DMARC1; p=reject; rua=mailto:...`のような形式で公開する。

- `p=` — ポリシー。`none`(何もしない・監視のみ)/`quarantine`(迷惑メール行き)/`reject`(拒否)。
- `rua=` — 集計レポートの送付先(誰がどの程度失敗しているかの統計)。
- `ruf=` — 失敗レポートの送付先(個別メッセージの詳細)。

## DMARCbis (RFC 9989/9990/9991)

2026年にDMARCの仕様が改訂され、RFC 7489を置き換える形でRFC 9989(コア仕様)・RFC 9990(集計レポート)・RFC 9991(失敗レポート)として公開された。これによりDMARCは長らくInformationalだった扱いから、初めてProposed Standard(標準化トラック)に格上げされた。主な変更点は以下。

- **DNS Tree Walkアルゴリズム** — 組織ドメイン(Organizational Domain)の判定に、静的なPublic Suffix List(PSL)ではなく、DNSを動的に辿るアルゴリズムを採用。
- **npタグの新設** — サブドメインがDNS上にそもそも存在しない場合(NXDOMAIN)のポリシーを、通常の`sp=`(サブドメインポリシー)とは別に指定できるようになった。
- **`pct=`/`rf=`/`ri=`タグの非推奨化**。
- **間接メールフローへの配慮** — メーリングリストや転送を経由するメールに対して安易に`reject`を適用しないよう明記され、追加のコンテキスト([[arc-email|ARC]]など)がない場合は受信側が`quarantine`相当として扱うことが推奨されるようになった。
- 既存の`v=DMARC1`から始まるレコードはそのまま有効。

## 普及状況

グローバルなDMARC導入率は52.1%(2023年の27.2%から上昇)だが、その半数以上は`p=none`に留まっており、実質的になりすまし対策として機能していない。`p=reject`を100%のメールに適用できているドメインは、2026年3月時点で10.7%程度とされる。

PCI DSS v4.0では2025年からDMARC等のアンチフィッシング対策の実装が必須要件となり、クレジットカード情報を扱う組織にとっては単なるベストプラクティスではなく規制対応の一部になっている。

## [[email-authentication|メール送信者認証]]の中での位置づけ

SPF/DKIMの結果を統合し、なりすましメールの扱いをドメイン所有者が宣言する中核プロトコル。[[bimi|BIMI]]のブランドロゴ表示や[[gmail-yahoo-bulk-sender-requirements|Gmail/Yahooの一括送信者要件]]は、いずれもDMARCの厳格な適用(quarantine/reject)を前提としている。

## 出典

- [DMARCbis Is Official: What Changes in RFC 9989, 9990, and 9991](https://emaillabs.io/en/dmarcbis-rfc-9989-9990-9991/)
- [DMARC RFC 9989, 9990, And 9991 Replace RFC 7489](https://powerdmarc.com/dmarc-rfc-9989/)
- [DMARC is now a Proposed Standard: What it means for you](https://redsift.com/blog/dmarc-rfc-9989)
- [DMARC, SPF, and DKIM in 2026: Why Email Authentication Is Now a Regulatory Requirement](https://www.duocircle.com/blog/dmarc-spf-dkim-2026-email-authentication-regulatory-requirement-best-practice/)

#dmarc #spf #dkim #email #security #rfc
