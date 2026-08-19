---
created: 2026-08-11 11:23
updated: 2026-08-19 19:09
---
# AIエージェント時代のAPI認可ガバナンス

AIエージェントがAPIを操作するようになったことで、従来から知られていたAPI認可の脆弱性が新しいリスクとして顕在化しているという論点。CloudNative Inc.のブログ記事が、[[ai-agent-gym-booking-hack|2026年8月のジム予約システム侵害事件]]を題材に整理している。

## 論点

- 事件の本質は「AIが暴走した」ことではなく、**既知の脆弱性（[[bola|BOLA]]）がAIエージェントという新しい主体によって探索・悪用された**こと。攻撃手法自体は十年以上前から知られている。
- 「ソフトウェアは法的人格ではない。法律上の責任を負えるのは法的人格を持つ者だけだ」という指摘があり、ユーザー・エージェント開発者・モデル提供者・脆弱なシステムの運営者のいずれに責任が帰属するかが未整理であるとされる。日本の不正アクセス禁止法も行為者の故意を前提とするため、故意の所在が曖昧な構図では法的評価に時間がかかると警告している。

## 誤解の否定

| 誤った対策 | 実態 |
|---|---|
| プロンプトで禁止すれば防げる | 禁止記述は出力傾向を変えるが実行時の強制力がない |
| 生成AI未導入なら無関係 | いつの間にかAIエージェントが攻撃してくる可能性がある |
| モデル提供元が対策すべき | 実務的でない。脆弱性は被攻撃側（API提供側）のシステムに存在する |

## 実効的な対策

- エージェントに削除などの破壊的操作を渡さない。
- API側で認可検証を実装する（[[bola|BOLA]]対策そのもの）。
- 実行前に人間の承認を要求する。
- 実行時に強制力を持つ認可レイヤーを設ける。ツール呼び出しのシーケンス(履歴)を踏まえて判定する仕組みとして[[dogwood|Dogwood]]のような時制ポリシー言語が提案されている。

## 出典

- [AIエージェントとAPI認可、BOLAガバナンス - CloudNative Inc.](https://blog.cloudnative.co.jp/articles/ai-agent-api-authorization-bola-governance/)
- [LLM06:2025 Excessive Agency - OWASP Top 10 for LLM Applications](https://github.com/OWASP/www-project-top-10-for-large-language-model-applications/blob/main/2_0_vulns/LLM06_ExcessiveAgency.md)
- [Careful adoption of agentic AI services - Australian Signals Directorate ACSC](https://www.cyber.gov.au/business-government/secure-design/artificial-intelligence/careful-adoption-of-agentic-ai-services)

#security #ai
