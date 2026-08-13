---
created: 2026-08-13 21:24
updated: 2026-08-13 21:24
---
# flaky test

コードに変更がないにもかかわらず、実行するたびに成功したり失敗したりする、非決定的な挙動を示すテストのこと。

## 主な原因

- **並行性の問題** — スレッド間の競合状態など
- **タイミング依存** — 非同期処理やアニメーションの完了を待たずにアサーションする
- **外部システムへの依存** — ネットワーク接続、外部API、DBなどの不安定さ
- **テスト間の分離不足** — 前のテストの状態(グローバル変数、DBレコード等)が後続テストに影響する
- **テスト設定の不整合** — 実行環境によってパラメータや設定が変わる
- **環境差異** — ハードウェアやOS、CI環境とローカル環境の違い
- **甘いテスト設計** — 前提条件を十分に検証・保証できていない

## 影響

- **偽陽性(false positive)** — アプリ自体は正常なのにテストが失敗と報告する
- **不要なビルド失敗** — 再実行やデプロイ遅延を招く
- CI/CDで信頼性が下がり、チームが「失敗しても無視して再実行/マージする」習慣がつくと、本物のバグを見逃すリスクが高まる
- デバッグに無駄な工数がかかり、リリースサイクルが遅延する

## 関連

[[playwright]]の自動待機(auto-waiting)機能やアサーションの自動リトライは、タイミング依存によるflakinessを減らすための対策の一つ。

#testing

## 出典

- [Flaky test - Wikipedia](https://en.wikipedia.org/wiki/Flaky_test)
- [What is a Flaky Test? Causes, Identification & Remediation | Datadog](https://www.datadoghq.com/knowledge-center/flaky-tests/)
- [What are Flaky Tests? | TeamCity CI/CD Guide | JetBrains](https://www.jetbrains.com/teamcity/ci-cd-guide/concepts/flaky-tests/)
