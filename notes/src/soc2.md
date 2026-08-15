---
created: 2026-08-15 17:39
updated: 2026-08-15 17:39
---
# SOC 2

SOC(System and Organization Controls)は米国公認会計士協会(AICPA)が定めた監査フレームワーク。SOC 2はその中でも、クラウドサービス・SaaSなど顧客データを扱うサービス組織の内部統制を評価する報告書で、AICPAが策定した**Trust Services Criteria(信頼性サービス基準、TSC)**という評価基準に基づいて監査が行われる。

## Trust Services Criteria(5つの評価カテゴリ)

- **Security(セキュリティ)** — 不正アクセスからの保護。SOC 2監査で唯一必須のカテゴリ
- **Availability(可用性)** — 契約通りにシステムが利用可能であること
- **Processing Integrity(処理の完全性)** — 処理が完全・正確・適時であること
- **Confidentiality(機密性)** — 機密情報が保護されていること
- **Privacy(プライバシー)** — 個人情報が適切に収集・利用・保持されていること

Securityのみ必須で、残り4つは事業内容や顧客との契約に応じて対象に含めるかどうかを選択する。

## Type 1とType 2の違い

- **Type 1** — ある一時点でのコントロールの「設計」を評価する。監査期間の目安は3〜6ヶ月
- **Type 2** — 3〜12ヶ月間の観察期間における「運用の実効性」を評価する。初回の監査期間の目安は6〜15ヶ月

Type 2の方がより厳密で、エンタープライズ顧客や規制業界から好まれる。

## SOC 1・SOC 2・SOC 3の違い

- **SOC 1** — 財務報告に影響する内部統制を対象(会計目的)
- **SOC 2** — データ保護に関する運用リスク管理を対象。詳細で機密性の高い内容のため、NDAを結んだ顧客・見込み客にのみ開示するのが通例
- **SOC 3** — SOC 2と同じ監査に基づくが、技術的詳細を省いた一般公開向けの簡易版。必ずType 2ベースで発行され、Webサイト等で公開できる

数字は難易度の序列を表すものではなく、SOC 1を取ってからSOC 2に進む必要もない。

## 関連ノート

SOC 2は具体的な実装手段(プルリクエストレビューの要否など)を規定しているわけではなく、リスクに対するコントロールが機能していることを求める枠組みである、という論点については[[soc2-without-pull-requests|SOC 2準拠にプルリクエストは必須ではない]]を参照。

## 出典

- [SOC 2 Trust Services Criteria (TSC): A Guide | Cherry Bekaert](https://www.cbh.com/insights/articles/soc-2-trust-services-criteria-guide/)
- [2025 Trust Services Criteria for SOC 2 | Secureframe](https://secureframe.com/hub/soc-2/trust-services-criteria)
- [SOC 2 Trust Services Criteria (TSC) Explained | Schellman](https://www.schellman.com/blog/soc-examinations/soc-2-trust-services-criteria-with-tsc)
- [SOC 2 Type 1 vs. Type 2: Timeline, Cost, and Key Differences | Drata](https://drata.com/learn/soc-2/type-1-vs-type-2)
- [SOC 1 vs SOC 2 vs SOC 3: What's the Difference? | Secureframe](https://secureframe.com/hub/soc-2/soc-1-vs-soc-2-vs-soc-3)

#soc2 #compliance #security
