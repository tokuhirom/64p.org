---
created: 2026-08-19 15:26
updated: 2026-08-19 15:26
---
# Ansible（構成管理ツール）

Red Hatが開発するPython製の構成管理ツール。最大の特徴はagentless(エージェントレス)な設計で、管理対象ノードに常駐エージェントを一切インストールせず、SSH(LinuxUnix)やWinRM(Windows)経由で設定を「push」する。

## Playbook

設定はYAMLで書く「Playbook」に宣言的に記述する。人間にとって読みやすい自己文書化されたフォーマットで、管理対象ノードをあるべき状態へ導く手順を表現する。

## agentlessであることの利点

対象ノードに特別なソフトウェアのインストールが不要なため、導入・保守が単純になる。SSH鍵さえあればパスワードレスでpush型の設定適用ができる。

## [[configuration-management-tools|構成管理ツール]]の中での位置づけ

[[chef|Chef]]・[[puppet|Puppet]]がagent常駐・pull型なのに対し、Ansibleはagentless・push型という対照的な設計を取る構成管理ツール。DSLもRuby系の内部DSLではなくYAMLベース。

#infrastructure-as-code #python

## 出典

- [Agentless Ansible structure opens up configuration management potential | TechTarget](https://www.techtarget.com/searchitoperations/tip/Agentless-Ansible-structure-opens-up-configuration-management-potential)
- [What is the Ansible IT automation platform? – TechTarget Definition](https://www.techtarget.com/searchitoperations/definition/Ansible)
- [Agentless configuration drift detection and remediation - Red Hat](https://www.redhat.com/en/blog/agentless-configuration-drift-detection-and-remediation)
