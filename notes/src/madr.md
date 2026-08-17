---
created: 2026-08-17 17:45
updated: 2026-08-17 17:45
---
# MADR(Markdown Architectural Decision Records)

[[architecture-decision-record|ADR]]をMarkdownで書くための構造化テンプレート。2017年頃に初版が公開され、2024-09-17に4.0.0がリリースされている。

## Nygard型との違い

[[architecture-decision-record|ADR]]で最も広く使われているNygard型(Title/Status/Context/Decision/Consequences の5項目)よりも項目数が多く、意思決定のプロセス(検討した選択肢とその比較)まで構造化して残せるようになっている。

## Full版のセクション構成(v4.0.0)

YAML frontmatterでメタデータ(ステータス・日付・意思決定者・相談者・通知対象者)を持ち、本文は以下のセクションで構成される。

1. タイトル(問題と解決策を表現)
2. Context and Problem Statement — 文脈と問題
3. Decision Drivers(オプション)
4. Considered Options — 検討した選択肢
5. Decision Outcome — 選定理由
6. Consequences — 結果(良い点・悪い点)
7. Confirmation(オプション)
8. Pros and Cons of the Options — 各選択肢の詳細分析
9. More Information(オプション)

Full版の他に、必須セクションのみの Minimal版、説明文を省いた Bare版など複数のバリエーションが用意されている。

## 出典

- [About MADR | MADR](https://adr.github.io/madr/)
- [GitHub - adr/madr](https://github.com/adr/madr)
- [The Markdown ADR (MADR) Template Explained and Distilled](https://ozimmer.ch/practices/2022/11/22/MADRTemplatePrimer.html)

#software-engineering
