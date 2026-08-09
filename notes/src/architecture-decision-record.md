---
created: 2026-08-09
updated: 2026-08-09
---
# ADR(Architecture Decision Record)

#software-engineering

アーキテクチャに関する意思決定とその背景・結論を記録するドキュメント。「なぜそう決めたのか」を後から追跡できるようにする目的で書かれる。

## 起源

2011年、Michael NygardがCognitect在籍中に発表したブログ記事「Documenting Architecture Decisions」で提唱した概念。以降ソフトウェア開発コミュニティで広く採用されている。

## Nygard型の基本構成

最も広く使われているテンプレート(Nygard型)は以下の5項目で構成される。

- **Title**: タイトル
- **Status**: 状態(proposed, accepted, rejected, deprecated, supersededなど)
- **Context**: 意思決定に至った経緯・背景
- **Decision**: 決定した内容の詳細
- **Consequences**: その決定がもたらすポジティブ・ネガティブな影響

他にMADRテンプレートなど派生形式も存在する。

## Dress Codeの事例("Any Decision Record"としての運用)

[Zenn記事](https://zenn.dev/dress_code/articles/c73500ae73361c)で紹介されている運用例。

- "A"を「Architecture」ではなく**「Any」**と読み替え、領域・大小を問わずあらゆる意思決定を残す運用にしている。
- 意思決定を「システムを再構築するための事実」と位置づけ、データレイヤーのイベント、コードレイヤーの仕様と並ぶ、アーキテクチャレイヤーの源泉として扱う3層構造で考えている。
- フォーマットは「文脈(判断当時の経緯)と結論さえ書けば成立する」ようあえて緩くしている。
- 記録例: 「イベント処理の技術選定」「クラウドコスト削減戦略」「ライブラリアップグレードの影響調査」「コードレビューのプロセス定義」など、技術選定に限らず組織的合意(例: 「Approveはバグがないことの保証ではなく、一緒に対応する意思表示」)も記録する。
- 運用: Notionデータベースに一元集約し、フォルダ分類は最小限にして検索はNotion AIに任せる。週次の読み合わせで全員が確認し、「共有がないことを異常と見なす」文化で継続を促進。議事録の要約をAIで下書きにするなど、読み書きのハードルを下げる工夫もしている。
- 蓄積ペース: チームエンジニア15名で1年半で450本超。2025年半ばから月50〜60本ペースに加速。
- 課題: 古くなったADRが更新されにくい、仕様との境界が曖昧になることがある、著者への短期的なリターンが見えにくい、という点が挙げられている。

## 関連

[[sakpilot]]でもE2Eテスト戦略がADR(`docs/adr/0001-e2e-testing-strategy.md`)として記録されている。

## 出典

- [ADRを"Any"にしてみたら意外とうまくいった話 - Zenn](https://zenn.dev/dress_code/articles/c73500ae73361c)
- [architecture_decision_record/adr_template_by_michael_nygard.md - GitHub](https://github.com/jamesmh/architecture_decision_record/blob/master/adr_template_by_michael_nygard.md)
- [Architectural Decision Records (ADRs)](https://adr.github.io/)
