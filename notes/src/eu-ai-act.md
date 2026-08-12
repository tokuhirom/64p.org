---
created: 2026-08-12 23:33
updated: 2026-08-12 23:33
---
# EU AI Act

#ai #regulation #eu #law

EUの包括的なAI規制法（Regulation (EU) 2024/1689）。世界初の包括的AI規制とされ、2024-08-01に発効し、義務ごとに段階的に適用が始まっている。EU域内で活動する企業だけでなく、**EU市場にAIシステム・モデルを提供する域外企業にも適用される**（Anthropicが[[claude-text-watermark|Claudeの透かし]]を全世界適用したのはこの文脈）。

## リスクベースアプローチ

AIシステムをリスクの大きさで4段階に分類し、段階ごとに義務の重さを変えるのが基本設計。

| リスク区分 | 例 | 義務 |
| --- | --- | --- |
| 許容できないリスク | 公的機関によるソーシャルスコアリング、サブリミナルな行動操作、公共空間でのリアルタイム遠隔生体認証（法執行の限定的例外あり） | 禁止 |
| ハイリスク | 雇用・教育・与信・法執行・重要インフラでのAI（Annex III）、規制対象製品の安全部品（Annex I） | リスク管理・技術文書・人間による監督などの厳格な要求 |
| 限定リスク | チャットボット、生成AI、感情認識、ディープフェイク | 透明性義務（第50条） |
| 最小リスク | それ以外（スパムフィルタ等） | 義務なし |

## 第50条: 透明性義務

生成AIに直結する条文で、**2026-08-02から適用**。主な内容:

- 人と直接対話するAIシステム（チャットボット等）は、AIと対話していることを本人に知らせる（明白な場合を除く）
- 合成コンテンツ（音声・画像・動画・**テキスト**）を生成するAIシステム（GPAIを含む）のプロバイダーは、出力を**機械可読な形式でマーキングし、人工的に生成・操作されたと検出可能**にする。技術的に実現可能な範囲で、効果的・相互運用可能・頑健・信頼できる方式であること
- 感情認識・生体分類システムのデプロイヤーは対象者に稼働を通知する
- ディープフェイクのデプロイヤーは人工生成であることを開示する（芸術・風刺目的には緩和あり）

このテキストへの機械可読マーキング義務が[[llm-text-watermarking|LLMテキスト電子透かし]]の商用実装（[[claude-text-watermark]]など）の直接の規制ドライバーになっている。マーキングの技術標準は Code of Practice とEU標準化作業で策定が進められている段階。

適用除外もある: 標準的な編集の補助機能で入力の意味を実質的に変えないもの、犯罪捜査目的で法律上認められたもの、人間に露出しないmachine-to-machine通信など。

## GPAI（汎用AIモデル）への義務

第53条・第55条で、GPAIモデル（LLMの基盤モデルが典型）のプロバイダーに技術文書・学習データ要約の公開・著作権ポリシーなどを義務付ける。**2025-08-02以降に市場投入されたモデルから適用**（それ以前のモデルは2027-08-02までに対応）。システミックリスクを持つ大規模モデルには追加義務がある。

- 欧州委員会は2025-07に自主的な遵守ツールとして **General-Purpose AI Code of Practice**（Transparency / Copyright / Safety & Security の3章構成）を公表した。署名は任意だが、署名すれば遵守の立証手段として使える。

## タイムライン

| 日付 | 内容 |
| --- | --- |
| 2024-08-01 | 発効 |
| 2025-02-02 | 禁止AI（許容できないリスク）の適用開始 |
| 2025-08-02 | GPAIモデルの義務の適用開始（新規モデル） |
| 2026-08-02 | 第50条（透明性義務）を含む本体の適用開始。GPAI義務の執行（情報要求・モデル回収等）もここから |
| 2027-12-02 | Annex III型ハイリスクシステムの義務の適用（延期後） |
| 2028-08-02 | Annex I型（規制製品組み込み）ハイリスクの義務の適用（延期後） |

当初ハイリスク義務は2026-08-02適用予定だったが、技術標準や各国監督体制の準備遅れを受けて、**Digital Omnibus on AI**（Regulation (EU) 2026/1744、2026-07-27発効）で上記の通り延期された。第50条の透明性義務と第4条のAIリテラシー義務は延期されず元のスケジュールのまま。

## 罰則

違反区分ごとの段階制で、最大は禁止AI違反の**3,500万ユーロまたは全世界年間売上高の7%のいずれか高い方**。

## 出典

- [High-level summary of the AI Act (artificialintelligenceact.eu)](https://artificialintelligenceact.eu/high-level-summary/)
- [Article 50: Transparency Obligations (artificialintelligenceact.eu)](https://artificialintelligenceact.eu/article/50/)
- [Transparency obligations under Article 50 of the AI Act — FAQ (European Commission)](https://digital-strategy.ec.europa.eu/en/faqs/transparency-obligations-under-article-50-ai-act)
- [General-purpose AI Obligations Under the EU AI Act Kick in From 2 August 2025 (Baker McKenzie)](https://www.bakermckenzie.com/en/insight/publications/2025/08/general-purpose-ai-obligations)
- [An Introduction to the Code of Practice for General-Purpose AI (artificialintelligenceact.eu)](https://artificialintelligenceact.eu/introduction-to-code-of-practice/)
- [EU Digital Omnibus on AI Enters Into Force (K&L Gates, 2026-07-31)](https://www.klgates.com/EU-Digital-Omnibus-on-AI-Enters-Into-Force-7-31-2026)
- [EU AI Act Omnibus Agreement — Postponed High-Risk Deadlines (Gibson Dunn)](https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/)
