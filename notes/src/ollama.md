---
created: 2026-08-19 17:09
updated: 2026-08-19 17:09
---
# Ollama

ローカルLLMを手軽に動かすためのランタイムツール。CLI(`ollama run llama3`)、Dockerライクなモデルレジストリ、`Modelfile`によるモデル定義、OpenAI互換のREST API(port 11434)、モデルの自動ダウンロード・常駐管理などを提供する。内部の推論エンジンとして[[llama-cpp|llama.cpp]]を利用しており、「llama.cppがエンジン、Ollamaはその上に載った車」という比喩がよく使われる。

## アーキテクチャ

Ollamaは2種類のランナーを持ち、モデルアーキテクチャに応じて自動選択する。

- **llamarunner**: [[llama-cpp|llama.cpp]]をCGoバインディングで呼び出す従来の実装。
- **ollamarunner**: マルチモーダルモデル対応のため2025年に導入された、Go言語によるOllama独自実装。画像処理メタデータ・KVCache最適化・画像キャッシュ、チャンク化attention、2D回転埋め込みなどをサポートする。

つまりOllamaは全面的にllama.cppへ依存しているわけではなく、一部のモデル系列は独自エンジンで動く。

## llama.cppとの違い

- **手軽さ**: llama.cppはバイナリとモデルファイルを渡され利用者が細部までパラメータを指定する低レベル志向。Ollamaはモデルの自動ダウンロード・常駐管理・シンプルなCLI/APIで手軽さを優先する。
- **性能**: 素のスループットはllama.cppの方が数%〜(ケースによっては)数十%上回ると報告されることが多い。Ollamaは薄い抽象化層のオーバーヘッドがある一方、モデル常駐によるウォームキャッシュで対話用途では体感差が縮まることもある。
- **制御性**: llama.cppはロジット制御・文法制約サンプリング・シード指定など細かい制御が可能。Ollamaはそこを隠蔽している。
- **運用**: Ollamaは常駐デーモン方式、llama.cppは単一プロセスで攻撃面が小さいという指摘もある。
- **開発速度**: llama.cppは新モデルアーキテクチャへの対応が日次更新レベルで速い一方、Ollamaがそれを取り込むのは週〜隔週サイクルになりがち。

実例として、あるブログ(nullmirror.com)ではOllamaからllama.cppへ推論バックエンドを移行しており、小規模モデルでスループットが4割近く向上したこと、ロジット制御や文法制約サンプリングなど細かい制御ができること、単一プロセスでの運用のシンプルさを移行理由として挙げている。

## [[gpustack|GPUStack]]との関係

GPUStackはOllamaのモデルライブラリとのモデル互換性を持ちつつ、複数GPU・複数ノードにまたがるクラスタ管理や認証・アクセス制御などエンタープライズ向け機能を追加で提供する、別レイヤーのツール。

## 出典

- [Ollama vs. LM Studio vs. llama.cpp: Which Local AI Runtime Should You Use in 2026? - MachineLearningMastery.com](https://machinelearningmastery.com/ollama-vs-lm-studio-vs-llama-cpp-which-local-ai-runtime-should-you-use-in-2026/)
- [Ollama vs llama.cpp: What's the Difference - Atomic Chat](https://atomic.chat/blog/guides/ollama-vs-llamacpp)
- [Ollama vs. llama.cpp: a technical deep dive for developers - Rushi's](https://www.rushis.com/ollama-vs-llama-cpp-a-technical-deep-dive-for-developers/)
- [Ollama + llama.cpp Architecture Overview | LLM Learning](https://jonathanding.github.io/llm-learning/en/articles/ollama-architecture/)
- [Switching our Inference Backend from Ollama to llama.cpp — _nullmirror](https://nullmirror.com/en/blog/2025-11-02-switching-our-inference-backend-from-ollama-to-llama.cpp/)
- [Ollama's new engine for multimodal models · Ollama Blog](https://ollama.com/blog/multimodal-models)

#machine-learning #llm
