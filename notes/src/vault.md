---
created: 2026-08-14 11:39
updated: 2026-08-14 11:39
---
# Vault

#hashicorp #security

HashiCorpが開発するシークレット管理・暗号化・PKIツール。APIキー・パスワード・証明書などの機密情報を一元管理し、アクセス制御と監査ログを提供する。

## アーキテクチャ

- プラグイン形式の「secrets engine」がパス単位でマウントされ、それぞれが独立した名前空間としてシークレットの保存・生成・暗号化を担当する。
- **static secrets**: 明示的に変更・削除するまで保持され続ける固定値。
- **dynamic secrets**: リクエストのたびにオンデマンドで生成される、TTL(time-to-live)付きの一時的な認証情報。TTLが切れると自動的に無効化されるため、漏洩しても手動ローテーションなしに無害化される。
- Kubernetes・AWS IAM・LDAP・GitHub・Azure AD・JWT/OIDCなど多様な認証方式(auth method)をサポートし、IDベースのアクセス制御を実現する。

## ライセンス変遷

2023年8月にMPL 2.0からBUSL 1.1へ変更され、これを機に**OpenBao**(Linux Foundation傘下)としてフォークされた。詳細は[[bsl|BSL]]を参照。

## 出典

- [Secrets Management | hashicorp/vault | DeepWiki](https://deepwiki.com/hashicorp/vault/4-secrets-management)
- [How to Use Vault Dynamic Secrets | OneUptime](https://oneuptime.com/blog/post/2026-01-26-vault-dynamic-secrets/view)
- [OpenBao vs HashiCorp Vault: the Open-Source Fork, Compared (2026)](https://wetheflywheel.com/en/comparisons/openbao-vs-hashicorp-vault/)
