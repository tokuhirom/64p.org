---
created: 2026-08-19 12:54
updated: 2026-08-19 12:54
---
# フィッシング耐性MFA(Phishing-Resistant MFA)

#security #identity

[[multi-factor-authentication|MFA]]のうち、非対称暗号とドメインバインディングを用いることで、認証情報そのものの窃取・中継・再生を構造的に不可能にする実装方式。米CISA(Cybersecurity and Infrastructure Security Agency)が推奨する概念で、SMS OTPやプッシュ通知など従来型のMFAが抱える弱点への対応策として位置づけられる。

## 従来型MFAとの違い

パスワード・SMS OTP・メールOTP・セキュリティ質問・プッシュ通知は、いずれも何らかの形で「ユーザーに見せる/入力させる」情報のやり取りを伴うため、中間者攻撃によるリアルタイム中継や、プッシュ通知への根負け(MFA疲労攻撃)によって突破されうる。フィッシング耐性MFAは、認証がリクエスト元のドメインに暗号学的に紐付けられる(ドメインバインディング)ため、偽サイトに認証情報を入力させる古典的なフィッシングが原理的に成立しない。

## CISAが認める2つの実装方式

- **FIDO/WebAuthn** — パスキーやセキュリティキー(YubiKeyなど)による認証。公開鍵暗号方式で、秘密鍵はデバイスから外に出ない。
- **PKI(Public Key Infrastructure)ベース認証** — 証明書ベースの認証。

## [[multi-factor-authentication|MFA]]の中での位置づけ

MFA全般の種類・弱点は[[multi-factor-authentication|MFA]]を参照。このノートはその中でも「フィッシングに耐える」実装方式に焦点を当てる。

## 出典

- [What is Phishing-Resistant Multi-Factor Authentication? - Yubico](https://www.yubico.com/resources/glossary/phishing-resistant-mfa/)
- [Phishing-Resistant MFA vs. Standard MFA: What's the Difference? - Rublon](https://rublon.com/blog/phishing-resistant-mfa-vs-standard-mfa/)
- [Phishing-resistant MFA (Secure Future Initiative) - Microsoft Learn](https://learn.microsoft.com/en-us/security/zero-trust/sfi/phishing-resistant-mfa)
- [What Is Phishing-Resistant MFA and How Does it Work? - HYPR](https://www.hypr.com/blog/what-is-phishing-resistant-mfa)
