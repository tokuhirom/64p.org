---
created: 2026-08-15 23:41
updated: 2026-08-15 23:41
---
# ARC (Authenticated Received Chain)

メーリングリストや転送サービスを経由したメールで[[dmarc|DMARC]]が誤って失敗してしまう問題を緩和するための仕組み。RFC 8617。

## 解決したい問題

メーリングリストや自動転送は、配送の過程で件名にプレフィックスを付けたり、本文にフッターを追加したりする。この改変によってDKIM署名が壊れ(本文が変わるため署名検証が通らなくなる)、さらに送信元IPも中継サーバーのものに変わるためSPFも通らなくなる。結果として、実際には正当なメールであってもDMARCのアライメントチェックに失敗し、最終受信者側で拒否・迷惑メール行きにされてしまう。

## 位置づけ

- [[dmarc|DMARC]]は「ポリシープロトコル」— ドメイン所有者がDNSで「SPF/DKIMアライメントに失敗したメールをどう扱うか」を宣言する。
- ARCは「エビデンスプロトコル」— 転送やメーリングリストなどの中継者(intermediary)が、自分が受信した時点で観測した認証結果を記録し、その情報を最終受信者に引き継ぐ。

両者は競合するものではなく補完関係にある。

## 仕組み

中継者は転送するメールに以下の3種類のヘッダーを追加する。

- `ARC-Authentication-Results` — その中継者が観測したSPF/DKIM/DMARCの結果。
- `ARC-Message-Signature` — メッセージ内容に対する署名。
- `ARC-Seal` — それまでのARCヘッダーチェーン全体を封印する署名。

これにより、転送を重ねるごとに「認証結果のチェーン(chain of custody)」が積み上がっていく。最終受信サーバーは、直接のSPF/DKIM結果がDMARC的に失敗していても、このARCチェーンを遡って「転送される前の時点では正当に認証されていた」ことを確認し、誤って拒否しないという判断が可能になる。

## [[email-authentication|メール送信者認証]]の中での位置づけ

[[dmarc|DMARC]]の弱点(転送に弱い)を補うための仕組みで、DMARCbis(RFC 9989)でも「間接メールフローに安易にrejectを適用しない」という方針の中で、ARCのような追加コンテキストの活用が前提として言及されている。

## 出典

- [What is ARC (Authenticated Received Chain) in Email?](https://www.validity.com/blog/how-to-explain-authenticated-received-chain-arc-in-plain-english/)
- [How to implement ARC and how does it affect DMARC failures from forwarding?](https://www.suped.com/learn/dmarc/how-to-implement-arc-authenticated-received-chain-and-how-does-it-affect-dmarc-failures-from-for)
- [ARC (RFC 8617): Authenticated Received Chain Guide 2026](https://smtpedia.com/authenticated-received-chain/)

#arc #dmarc #email #security #rfc
