---
created: 2026-08-13 22:36
updated: 2026-08-13 22:36
---
# IOC (侵害指標) と IOA (攻撃指標)

#security

サイバー攻撃の痕跡・兆候を表す2つの指標。[[threat-hunting|脅威ハンティング]]や[[soc|SOC]]での検知・調査の手がかりとして使われる。

## IOC (Indicators of Compromise: 侵害指標)

システムやネットワークが「既に侵害された」ことを示すアーティファクト（証拠）。事後的な性質を持ち、攻撃が起きたかどうか、どのシステムが侵害されたか、どう修復すべきかを判断するために使われる。具体例:

- 既知マルウェアのファイルハッシュ
- 悪性と判明しているIPアドレス・ドメイン・URL
- 不審なレジストリ変更や設定変更の痕跡

既知の悪性エンティティとの照合が中心なので機械的にマッチングしやすく、脅威インテリジェンスのフィードとして組織間で共有されることも多い。

## IOA (Indicators of Attack: 攻撃指標)

攻撃が「進行中である」こと、あるいは攻撃者の意図を示す行動パターン。攻撃者のTTPs（戦術・技術・手順。体系化したものが[[mitre-attack|MITRE ATT&CK]]）に着目し、異常なネットワークトラフィック、不正なアクセス試行、通常と異なるユーザー挙動などから、侵害が完了する前にリアルタイムで攻撃を捉えることを狙う。

## 対比

| | IOC | IOA |
|---|---|---|
| タイミング | 事後（侵害の証拠） | 進行中（攻撃の兆候） |
| 着目点 | アーティファクト（ハッシュ・IP等） | 行動・TTPs |
| 主な用途 | 侵害調査・修復・情報共有 | 予防・リアルタイム検知 |

IOCベースの検知は既知の脅威にしか効かないため、未知の攻撃には行動ベースのIOAで補う、という組み合わせで使われる。

## 出典

- [IOA vs IOC: 8 Critical Differences | SentinelOne](https://www.sentinelone.com/cybersecurity-101/threat-intelligence/ioa-vs-ioc/)
- [Indicators of Attack vs. Indicators of Compromise | CrowdStrike](https://www.crowdstrike.com/en-us/resources/white-papers/indicators-attack-vs-indicators-compromise/)
- [What Are Indicators of Compromise (IOC)? | Cisco](https://www.cisco.com/site/us/en/learn/topics/security/what-are-indicators-of-compromise-ioc.html)
