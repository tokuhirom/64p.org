---
created: 2026-08-13 22:36
updated: 2026-08-13 22:36
---
# MITRE ATT&CK

#security

実際のサイバー攻撃事例の観測に基づいて、攻撃者の戦術・技術・手順（TTPs: Tactics, Techniques, and Procedures）を体系化した、誰でも参照できるナレッジベース。米国の非営利団体MITREが管理している。ATT&CKは Adversarial Tactics, Techniques, and Common Knowledge の略。

## 構造

- **Tactics（戦術）** — 攻撃者が達成しようとする目的。「なぜその行動をするのか」に当たる。初期アクセス（Initial Access）、実行（Execution）、永続化（Persistence）、権限昇格（Privilege Escalation）、横展開（Lateral Movement）、情報持ち出し（Exfiltration）など。
- **Techniques（技術）** — 各戦術を「どうやって」達成するかの具体的な手法。Enterprise向けマトリクスには185のテクニックと367のサブテクニックが登録されており（2026年時点）、継続的に追加されている。

戦術を列、技術を行としたマトリクス形式で整理されており、攻撃の一連の流れを標準化された語彙で記述できる。

## 使われ方

- インシデント対応で「何が・どのように起きたか」を標準化された用語で共有する
- [[threat-hunting|脅威ハンティング]]の仮説駆動型アプローチで、「このテクニックの痕跡が自環境にないか」という仮説の元ネタにする
- [[edr|EDR]]等の検知能力の評価・ギャップ分析（どのテクニックを検知できるか）に使う
- レッドチーム演習・[[penetration-test|ペネトレーションテスト]]の攻撃シナリオ設計に使う

## 出典

- [What is the MITRE ATT&CK framework? | Microsoft Security](https://www.microsoft.com/en-us/security/business/security-101/what-is-mitre-attack-framework)
- [MITRE ATT&CK Framework | Wiz](https://www.wiz.io/academy/detection-and-response/mitre-attack-framework)
- [What Are MITRE ATT&CK Techniques? | Palo Alto Networks](https://www.paloaltonetworks.com/cyberpedia/what-are-mitre-attack-techniques)
