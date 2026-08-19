---
created: 2026-08-19 12:54
updated: 2026-08-19 12:54
---
# MFA(Multi-Factor Authentication、多要素認証)

#security #identity

パスワードなど「知識」に加えて、複数の異なる種類の要素を組み合わせて本人確認を行う認証方式。単一要素(パスワードのみ)より認証情報の窃取・使い回しに強い。

## 主な種類

- SMS OTP(ワンタイムパスワード)
- メールOTP
- プッシュ通知(スマートフォンアプリでの承認)
- セキュリティ質問
- ハードウェアトークン
- 生体認証(指紋・顔認証など)

## 弱点

SMS・メールOTP・プッシュ通知・セキュリティ質問は、いずれも中間者攻撃やソーシャルエンジニアリングで突破されうる。特にプッシュ通知は、大量の承認リクエストを送りつけてユーザーが根負けして承認してしまう「MFA疲労(MFA fatigue)」攻撃の対象になりやすい。これらは総称して「フィッシング耐性のないMFA」と呼ばれ、[[phishing-resistant-mfa|フィッシング耐性MFA]]への移行が推奨されている。

## [[non-human-identity|NHI]]との接点

サービスアカウントは24時間動作し続け、そもそも対話的ログインを前提とするMFAの保護がかからないことが多い。これはNHI特有の脆弱性の一つとして指摘されている。NHIのガバナンスには、MFAではなく[[privileged-access-management|PAM]]のJust-in-Timeアクセスやワークロードの正当性検証といった別の手段が必要になる。

## [[identity-and-access-management|IAM/アクセス管理]]の中での位置づけ

このノートは人間の対話的ログインを強化する仕組みを扱う。フィッシング耐性を持つ実装の詳細は[[phishing-resistant-mfa|フィッシング耐性MFA]]、機械・AIエージェント側の認証情報管理は[[non-human-identity|NHI]]を参照。

## 出典

- [What is Phishing-Resistant Multi-Factor Authentication? - Yubico](https://www.yubico.com/resources/glossary/phishing-resistant-mfa/)
- [Phishing-Resistant MFA vs. Standard MFA: What's the Difference? - Rublon](https://rublon.com/blog/phishing-resistant-mfa-vs-standard-mfa/)
- [What Is Phishing-Resistant MFA? Modern Security - SentinelOne](https://www.sentinelone.com/cybersecurity-101/identity-security/phishing-resistant-mfa/)
