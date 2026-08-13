---
created: 2026-08-13 09:14
updated: 2026-08-13 09:14
---
# Vitest

[[vite|Vite]]によって駆動される次世代テストフレームワーク。Anthony Fu氏(Vue/Vite/Nuxtのコアメンバー)とViteコミュニティにより2021年後半に作られた。

## 作られた理由

当時最も普及していたJestは非同期変換やESMのサポートが不十分で、Viteベースのプロジェクトを正しくテストできなかった。加えて「アプリのビルドはVite、テストはJest」という構成では、Babel/ts-jestなどJest用の変換パイプラインをアプリ用のVite設定とは別に用意する必要があり、二重設定になってしまう問題があった。Vitestはこれを1つのパイプラインに統合することを狙って作られた。

## 特徴

- 既存の`vite.config`をそのまま読み込むため、Viteプラグイン・エイリアス・resolve設定がテスト実行時にもそのまま使える(追加設定がほぼ不要)
- Jest互換のAPI(`describe`/`it`/`expect`など)を提供しつつ、より高速に動作
- ネイティブなwatchモード(HMRに近い即時再実行)
- v8/Istanbulによるネイティブコードカバレッジ
- Vue, React, Svelte, Lit, Markoなどのコンポーネントテストに対応するbrowser mode

## VitestとViteの関係

VitestはViteのモジュール解決・変換パイプライン・プラグインシステムをそのまま利用する。要件としてVite v6.0.0以上・Node v20.0.0以上が必要。

## 出典

- [Getting Started | Guide | Vitest](https://vitest.dev/guide/)
- [Vitest 4 adoption guide: Overview and migrating from Jest - LogRocket Blog](https://blog.logrocket.com/vitest-adoption-guide/)
