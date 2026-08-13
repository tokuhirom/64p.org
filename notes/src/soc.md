---
created: 2026-08-13 22:36
updated: 2026-08-13 22:36
---
# SOC (Security Operations Center)

#security

組織のセキュリティインシデントの監視・検知・対応を専門に担うチーム、およびその拠点。[[siem|SIEM]]や[[edr|EDR]]などのツールが上げるアラートを24時間365日体制で監視し、トリアージ・調査・対応を行う。

## ティア構成

SOCアナリストは習熟度・役割に応じて段階（ティア）に分かれるのが典型的。

- **Tier 1（トリアージ）** — アラートの一次対応。定義済みのプレイブックに従って緊急度を判定し、誤検知（false positive）を切り分け、本物のインシデントをエスカレーションする
- **Tier 2（調査・インシデント対応）** — エスカレーションされたインシデントを深掘りする。複数ソースのデータを相関させて攻撃のパターンを特定し、封じ込め・復旧を主導する
- **Tier 3（脅威ハンティング）** — 最上位のアナリストが、アラートに上がっていない脅威を能動的に探す[[threat-hunting|脅威ハンティング]]や、新しい脅威への対策立案を担う

このほか、チーム運営・プロセス整備・危機対応コミュニケーションを担うSOCマネージャーが置かれる。

## 関連する概念

- **[[noc|NOC]] (Network Operations Center)** — ネットワークの可用性・パフォーマンス維持が主目的で、セキュリティ特化のSOCとは役割が異なる
- Tier 1のアラートトリアージは反復作業（トイル）になりやすく、AIエージェントによる自動化（[[7ai|7AI]]など）が近年のトレンドになっている

## 出典

- [What is a Security Operations Center? | CrowdStrike](https://www.crowdstrike.com/en-us/cybersecurity-101/next-gen-siem/security-operations-center-soc/)
- [What Is a Security Operations Center (SOC)? | IBM](https://www.ibm.com/think/topics/security-operations-center)
- [SOC Roles and Responsibilities | Palo Alto Networks](https://www.paloaltonetworks.com/cyberpedia/soc-roles-and-responsibilities)
