---
created: 2026-08-13 22:30
updated: 2026-08-13 22:30
---
# 脅威ハンティング (Threat Hunting)

#security

ネットワークやシステム内に既に潜んでいるが、自動化されたセキュリティツール（EDR・SIEM等のアラート）をすり抜けて未検出のままになっているサイバー脅威を、セキュリティアナリストが能動的に探索するプラクティス。「攻撃者は既に環境内にいる」という前提（assume breach）に立ち、アラートを待つ受動的な運用から、仮説を立てて自ら探しに行く能動的な運用へと発想を反転させる点が特徴。

攻撃者が初期防御を突破してから検知されるまで潜伏し続ける時間（dwell time）を短縮し、大きな実害が出る前にステルスな悪性活動を発見することが目的。

## 主なアプローチ

- **仮説駆動型 (hypothesis-driven)** — 新しく観測された攻撃者のTTPs（戦術・技術・手順）などの脅威インテリジェンスをもとに「自組織の環境にもこの行動パターンが存在するのではないか」という仮説を立てて調査する。
- **IOC/IOAベース** — 既知のIOC（Indicators of Compromise: 侵害指標）やIOA（Indicators of Attack: 攻撃指標）を手がかりに、隠れた攻撃や進行中の悪性活動を探す。
- **高度な分析・機械学習ベース** — 大量のテレメトリデータを分析して異常値（アノマリー）を検出し、そこから潜在的な悪性活動の手がかりを掘り下げる。

## ハンティングの流れ

1. **トリガー** — 仮説や異常な活動の検出により、調査対象のシステム・領域を特定する
2. **調査** — EDR等のツールとログ・テレメトリを使い、悪性の侵害が実際にあるかを深掘りする
3. **解決** — 発見した脅威の情報を運用チームに引き継ぎ、封じ込め・修復・防御の改善につなげる

## 関連する概念との違い

- **インシデントレスポンス** — IRはアラートや侵害の発覚を起点に事後対応するのに対し、脅威ハンティングはアラートがまだ上がっていない脅威を先回りして探す。SOC（Security Operations Center）の標準的な検知・対応プロセスと並行して行われ、自動化された検知を人間の分析で補完する位置づけ（SOCについては[[noc|NOC]]のノートも参照）。
- **[[penetration-test|ペネトレーションテスト]]** — ペンテストは攻撃者の視点で疑似攻撃を仕掛けて防御の弱点を検証するのに対し、脅威ハンティングは防御側の視点で「既に起きている侵害」の痕跡を探す。

## 出典

- [What is Cyber Threat Hunting? | CrowdStrike](https://www.crowdstrike.com/en-us/cybersecurity-101/threat-intelligence/threat-hunting/)
- [What is Proactive Threat Hunting? | Wiz](https://www.wiz.io/academy/detection-and-response/threat-hunting)
- [What Is Threat Hunting? | Sophos](https://www.sophos.com/en-us/cybersecurity-explained/threat-hunting)
