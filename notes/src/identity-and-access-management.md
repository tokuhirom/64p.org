---
created: 2026-08-19 12:54
updated: 2026-08-19 12:54
---
# IAM/アクセス管理(Identity and Access Management)

#security #identity #moc

「誰が(あるいは何が)、何に、どうアクセスできるか」を扱う領域のノートを束ねるハブノート。人間の認証を強化する仕組みと、機械・AIエージェントの認証情報を管理する仕組みは前提が大きく異なるため、別々の原子ノートに分けて相互リンクしている。

## 人間の認証を強化する

- [[multi-factor-authentication|MFA(多要素認証)]] — パスワードに加えて複数要素で本人確認する仕組み。SMS OTP・プッシュ通知など従来型の種類と、その弱点(中間者攻撃・MFA疲労)を扱う。
- [[phishing-resistant-mfa|フィッシング耐性MFA]] — MFAのうちFIDO/WebAuthnやPKIベースなど、認証情報の窃取自体を構造的に防ぐ実装方式。CISAが推奨。

## 機械・AIエージェントのアイデンティティを管理する

- [[non-human-identity|NHI(Non-Human Identity)]] — サービスアカウント・APIキー・OAuthトークン・AIエージェントなど、人間以外の主体を認証する認証情報の総称と、そのガバナンス課題。

## 昇格した権限を制御する

- [[privileged-access-management|PAM(Privileged Access Management)]] — 管理者権限などの特権アカウントをボールト化・監視するフレームワーク。人間の対話的セッションを前提に設計されており、NHI(ワークロード)への適用には限界がある。

## 関連する既存ノート

- [[least-privilege|最小権限の原則]] — PAM・NHIガバナンスいずれの土台にもなる設計原則。
- [[vault|Vault]] — PAM・NHIのシークレット管理を実装するツールの一例(HashiCorp製)。
- [[gitleaks|gitleaks]] — NHIのリスクの一つである「ハードコードされたシークレットの露出」を検出するツール。
- [[ai-agent-api-authorization-governance|AIエージェント時代のAPI認可ガバナンス]] — AIエージェントというNHIの一種が既存の認可脆弱性(BOLA)を悪用した実例と対策。
