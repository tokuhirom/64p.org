---
created: 2026-08-19 12:54
updated: 2026-08-19 12:54
---
# PAM(Privileged Access Management)

#security #identity

管理者権限など「昇格した権限(privileged access)」を持つアカウントを監視・制御するためのセキュリティフレームワーク・技術群。管理者アカウントはシステム設定変更やセンシティブデータへのアクセスが可能なため、攻撃者にとって価値の高い標的になる。

## 中核メカニズム

- **クレデンシャルボールト**: 特権アカウントの認証情報を安全な保管庫([[vault|Vault]]のようなツール)に隔離し、平文の認証情報が利用者に直接渡らないようにする。
- **アクセス制御**: システム管理者はPAMシステム経由でしか認証情報を取得できず、その過程で認証・ログ記録が行われる。
- **セッション監視**: 特権セッションを継続的に監視・記録し、異常検知や事後の監査に使う。

## 主なユースケース

- 認証情報窃取の防止
- コンプライアンス対応(監査ログ・アクセス証跡の保持)
- 内部不正・外部攻撃双方による被害の縮小(攻撃対象領域の縮小)

## [[non-human-identity|NHI]]への適用の限界

PAMの主要な設計原則は[[least-privilege|最小権限の原則]]の実践形態の一つだが、その設計は人間の対話的セッション(ログイン→作業→ログアウト)を前提にしている。ワークロード同士の認証(service-to-service)にはそのまま当てはまりにくい。

従来型PAMがNHIに適用する典型的な方法は「シークレットをボールトに保管し、スケジュールでローテーションする」というものだが、これは以下のようなケースで限界を露呈する。

- パイプライン実行中の数十秒だけ必要な認証情報
- 大量のエフェメラルなサービスが同時にスコープ付きアクセスを要求するケース

ボールト化はシークレットの露出を減らせても、「そのワークロードは名乗る通りの存在か」「今アクセスすべきか」という認可判断そのものには答えない。この観点から、PAMのボールト機能を土台にしつつ、Just-in-Time(JIT)アクセスやワークロードID検証を組み合わせる「Workload IAM」という分野がPAMとは別に発展しつつある。

## [[identity-and-access-management|IAM/アクセス管理]]の中での位置づけ

このノートは「昇格した権限をどう保管・制御するか」を扱う。機械・AIエージェント側の認証情報管理は[[non-human-identity|NHI]]、人間の対話的ログインの強化は[[multi-factor-authentication|MFA]]を参照。

## 出典

- [What is Privileged Access Management (PAM) - Microsoft Security](https://www.microsoft.com/en-us/security/business/security-101/what-is-privileged-access-management-pam)
- [What is Privileged Access Management (PAM)? - CrowdStrike](https://www.crowdstrike.com/en-us/cybersecurity-101/identity-security/privileged-access-management-pam/)
- [What Is Privileged Access Management (PAM)? - Palo Alto Networks](https://www.paloaltonetworks.com/cyberpedia/what-is-privileged-access-management)
- [Non-Human Identity Security: Key Takeaways From Gartner's PAM Report - Aembit](https://aembit.io/blog/key-takeaways-on-non-human-identity-security-from-gartners-pam-report/)
