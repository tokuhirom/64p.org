---
created: 2026-08-13 22:12
updated: 2026-08-13 22:12
---
# Platform Engineering

#devops

クラウドネイティブ時代のソフトウェア開発組織に対して、セルフサービス型のツールチェーンとワークフローを設計・構築する規律。開発生産性、アプリケーションのサイクルタイム、市場投入速度の改善を目的とする。

## DevOpsとの関係 — Shadow Ops問題

DevOpsの理想は「You build it, you run it」（作った人が運用もする）だが、これを本当に実現できているのはGoogleのような一部の先進組織のみ。多くの組織では、経験豊富な開発者が本来の開発業務ではなくインフラ管理に時間を取られる「Shadow Ops（影のOps）」という状態が発生している。調査では、低パフォーマンス組織の44%がこの問題を抱える一方、高パフォーマンス組織はほぼ100%がtrue DevOpsを実現できているという。

Platform Engineeringは、この「開発者全員にインフラ運用スキルを求める」というDevOpsの理想と現実のギャップを埋めるために生まれた実践。[[devsecops|DevSecOps]]がDevOpsに「セキュリティ」という第3の柱を足す方向の拡張であるのに対し、Platform Engineeringは「運用の専門性をプラットフォームチームに集約し、開発者からは抽象化して隠す」方向の拡張という違いがある。

## 中核概念

### Internal Developer Platform (IDP)

プラットフォームエンジニアが提供する統合製品。アプリケーションライフサイクル全体（環境構築〜本番運用）をカバーし、認知負荷を軽減しつつ適切な抽象化レベルを開発者に提供する。開発者はHelmチャートのような詳細制御か、プリプロビジョニングされた環境での即時利用かを選べる。

### Golden Path（黄金経路）/ Paved Road

ほとんどのワークロードに対する標準化されたワークフロー。「強制ではないが最も楽で推奨される道」を用意することで、標準化と自由度のバランスを取る。

### Self-Service

複数の技術・ツールを単一のセルフサービス体験に統合し、開発者が都度Opsチームに依頼せず自律的に環境やリソースを扱えるようにする。

## 導入タイミング

開発者数が20〜30人規模に達した頃が、IDP構築を検討し始める目安とされている。

## 出典

- [What is platform engineering? - platformengineering.org](https://platformengineering.org/blog/what-is-platform-engineering)
- [Platform engineering - Wikipedia](https://en.wikipedia.org/wiki/Platform_engineering)
- [What is platform engineering? - Red Hat](https://www.redhat.com/en/topics/platform-engineering/what-is-platform-engineering)
- [What is platform engineering? - CNCF](https://www.cncf.io/blog/2025/11/19/what-is-platform-engineering/)
