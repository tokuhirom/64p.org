---
created: 2026-08-15 16:22
updated: 2026-08-15 16:22
---
# OpenAPI Moonwalk

[[openapi|OpenAPI]]仕様の次期メジャーバージョン(通称OpenAPI 4.0)を探索する特別委員会(SIG)、およびその取り組み全体の通称。2023年12月に開始され、毎週火曜9時(太平洋時間)に定例会を開催している。公式リポジトリ`OAI/sig-moonwalk`では「4.xを見据えた検討だけでなく3.x側の改善も含めて将来を探る取り組み」と説明されており、終了予定日は定められていない。公式には「4.0には計画された終了日がないため、現時点で存在する3.xバージョンの利用を強く推奨する」と明記されている。

## 6つの基本原則

当初5つだった原則が、2024〜2025年にかけて6つに拡大した。

1. **セマンティクス** — 人間・AI双方の利用者に目的(purpose)を提供する
2. **シグネチャ** — HTTPの仕組みに基づいてAPI操作を識別可能にする
3. **包括性 (Inclusion)** — HTTPベースの全APIを記述対象としつつ、特定の実装に偏らない中立性を保つ
4. **基盤インターフェース (Foundational Interfaces、2024年追加)** — ツール作成者側の複雑さを削減する。Henry Andrewsの研究により実現可能になったとされる
5. **関心の分離** — スコープをモジュール化し管理可能な単位に保つ
6. **機械的アップグレード** — 3.xから4.0への自動変換プロセスを用意する

## 2025〜2026年の焦点: LLM/AIエージェント対応

2026年は少なくとも最初の半年、OpenAPIとLLMの交差領域に焦点を当てる方針が示されている。LLMを新しいクラスの「賢いクライアント」と捉え、OpenAPI文書をAIエージェントにとって読み取りやすい("agent-ready"な)ものにする方法が検討テーマになっている。

## 進め方

2025年3月時点では正式な仕様のドラフト執筆にはまだ入っておらず、GitHub Discussions上でのArchitectural Design Records (ADR) の議論を通じて意思決定を積み重ねている段階。十分な意思決定が蓄積された時点で正式な仕様執筆に移るとされている。参加はSlackチャンネルやGitHub Discussionsを通じて可能。

## [[openapi|OpenAPI]]の中での位置づけ

現行の最新マイナーバージョンである[[openapi-3-1|OpenAPI 3.1]]・3.2の先にある、次のメジャーバージョンの検討という位置づけ。

#openapi

## 出典

- [GitHub: OAI/sig-moonwalk](https://github.com/OAI/sig-moonwalk)
- [Moonwalk – 2025 update - OpenAPI Initiative](https://www.openapis.org/blog/2025/02/05/moonwalk-2025-update)
- [OpenAPI v4.0 (A.K.A "Project Moonwalk") - Bump.sh](https://bump.sh/blog/openapi-v4-moonwalk/)
- [Moonwalk 2026 · OAI/sig-moonwalk Discussion #219](https://github.com/OAI/sig-moonwalk/discussions/219)
