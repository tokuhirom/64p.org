---
created: 2026-08-09 17:38
updated: 2026-08-09 17:38
---
# OpenRouter

#llm #api

複数のLLMプロバイダー（OpenAI、Anthropic、Google、Metaなど）のモデルを、単一のAPI・単一のAPIキーでまとめて利用できる統合ゲートウェイ／マーケットプレイス。2023年初頭にサービス開始し、最古参かつ最大手のLLMマーケットプレイスとされる。

## 特徴

- **OpenAI互換API**を提供しているため、既存のOpenAI SDK/クライアントの設定（base URLとAPIキー）を差し替えるだけでほぼそのまま流用できる。
- 400以上のモデルにアクセス可能（各社のフロンティアモデルからオープンソース系まで）。
- 課金がOpenRouter側に一元化され、プロバイダーごとに個別契約・個別請求を管理する必要がない。
- モデルのルーティング機能があり、価格・レイテンシ・可用性などの条件で自動的にモデルを切り替えられる（フォールバック構成も可能）。

## 主な用途

- 複数モデルを実際に試して、自分のユースケースに合ったものを選定する。
- 特定ベンダーへのロックインを避ける。
- あるモデル/プロバイダーが落ちた場合に別モデルへ自動フォールバックする構成を組む。

## 関連

[[claude-model-tiers|Claude]]や[[gpt-5-6-sol-terra-luna|GPT]]のように各社がモデルをティア分けして提供している状況では、OpenRouterのようなアグリゲーターを使うと、複数社のモデルを同じインターフェースで横断的に比較・使い分けしやすくなる。

## 出典

- [About - The Unified Interface For LLMs | OpenRouter](https://openrouter.ai/about)
- [OpenRouter](https://openrouter.ai/)
- [A practical guide to OpenRouter: Unified LLM APIs, model routing, and real-world use | Medium](https://medium.com/@milesk_33/a-practical-guide-to-openrouter-unified-llm-apis-model-routing-and-real-world-use-d3c4c07ed170)
- [What is OpenRouter? A Guide with Practical Examples | Codecademy](https://www.codecademy.com/article/what-is-openrouter)
