---
created: 2026-08-13 22:19
updated: 2026-08-13 22:19
---
# トイル (Toil)

#devops #sre

Google SRE本による定義: 「本番サービスの運用に紐づく作業のうち、手作業(manual)・反復的(repetitive)・自動化可能(automatable)・戦術的(tactical)・恒久的価値がない(no enduring value)・サービス規模に比例して線形に増加する(O(n) growth)という性質を持つ仕事」。単なる「やりたくない仕事」ではなく、明確に定義された作業カテゴリ。

## 6つの特徴

| 特徴 | 意味 |
|---|---|
| Manual | 人間の手作業が必要 |
| Repetitive | 同じ作業が何度も繰り返される |
| Automatable | 機械が人間と同等にこなせる |
| Tactical | アラート対応のような反応的な作業で、戦略性がない |
| No enduring value | 終えてもサービスの状態は恒久的には改善されない |
| O(n) growth | サービス規模の拡大に比例して増える |

## オーバーヘッドとの違い

トイルは「本番サービス運用に直接紐づく」作業に限定される。チーム会議やHR関連の事務作業のように、サービス運用に直結しない業務は「オーバーヘッド」として区別され、トイルには含まれない。

## 50%ルール

GoogleのSRE組織では、各SREが費やすトイルの時間を全体の50%以下に抑えることを目標としている。残りの50%以上は、将来的なトイル削減やサービス改善につながる「エンジニアリング」に充てるべきとされる。実際の平均は約33%だが、チームによっては80%に達することもある。

## トイル削減が重要な理由

- 個人への影響: エンジニアリングプロジェクトに割く時間が減りキャリアが停滞する、機械的作業の繰り返しで士気が低下し燃え尽きにつながる。
- 組織への影響: エンジニアリング組織としてのアイデンティティが曖昧になる、機能開発が遅延する、優秀な人材が流出する。

## [[devops|DevOps]]・[[platform-engineering|Platform Engineering]]との関連

「Shadow Ops」（開発者が本来の開発業務を犠牲にしてインフラ管理に忙殺される状態）は、まさにトイルが個人に集中してしまっている状態と言える。Platform Engineeringが目指すセルフサービス化・自動化は、トイルを組織的に削減する取り組みとして位置づけられる。

## 出典

- [Eliminating Toil - Google SRE Book](https://sre.google/sre-book/eliminating-toil/)
- [The Site Reliability Engineering Workbook Chapter: Eliminating Toil - Google Research](https://research.google/pubs/the-site-reliability-engineering-workbook-chapter-eliminating-toil/)
- [Site reliability engineering - Wikipedia](https://en.wikipedia.org/wiki/Site_reliability_engineering)
