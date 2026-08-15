---
created: 2026-08-15 23:41
updated: 2026-08-15 23:41
---
# BIMI (Brand Indicators for Message Identification)

受信箱に表示されるメール一覧に、送信元ブランドのロゴを表示するための仕組み。フィッシングメールと正規メールを視覚的に区別しやすくすることを狙っている。

## 仕組み

`default._bimi.example.com`のようなDNSのTXTレコードとして、SVG形式のロゴ画像のURLなどを含むBIMIレコードを公開する。

前提条件として、[[dmarc|DMARC]]のポリシーが`p=quarantine`または`p=reject`になっており、かつ送信するメールの100%をそのポリシーがカバーしている必要がある。`p=none`(監視のみ)のドメインに対しては、各メールプロバイダはBIMIレコードを処理しない。

## VMC (Verified Mark Certificate)

認証局(CA)が発行するX.509形式の証明書で、組織が保有する登録商標とドメインを暗号学的に紐付ける。BIMIレコードで指定したロゴが、本当にその商標の正当な保有者のものであることを証明する役割を持つ。

- **Gmail** — VMCがあるロゴにはブランドロゴの横に青い「認証済み」チェックマークが表示される。
- **Yahoo Mail / AOL** — 証明書なしの自己申告(self-asserted)BIMIレコードだけでもロゴを表示する。

## 目的

DMARCによる厳格ななりすまし対策(reject/quarantine)を前提として、視覚的なブランド信頼シグナルを受信者に提示することで、フィッシング被害の低減とメールのエンゲージメント向上を狙う施策。

## [[email-authentication|メール送信者認証]]の中での位置づけ

[[dmarc|DMARC]]のreject/quarantineポリシーを前提条件とする、送信者側にとっての「見返り」にあたる仕組み。DMARCが受信サーバー側の拒否・隔離判定を担うのに対し、BIMIはエンドユーザーの受信箱UIに直接効果を及ぼす点が異なる。

## 出典

- [BIMI & VMC: Complete Guide for Email Branding 2026](https://sslinsights.com/bimi-verified-mark-certificates-vmc-guide/)
- [Verified Mark Certificate (VMC) For BIMI Explained](https://powerdmarc.com/all-about-vmc-for-bimi/)
- [Verified Mark Certificate (VMC) - BIMI Record](https://mxtoolbox.com/dmarc/details/bimi-record/verified-mark-certificate)

#bimi #dmarc #email #phishing #security
