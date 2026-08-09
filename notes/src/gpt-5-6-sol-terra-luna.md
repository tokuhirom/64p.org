# GPT-5.6のSol / Terra / Lunaの違い

#gpt #openai #llm

2026年6月26日、OpenAIは単一モデルではなく、**Sol・Terra・Luna**という3階層構成の「GPT-5.6ファミリー」を発表した。名前は太陽・地球・月（cosmos）にちなんでおり、知能・速度・コストの3軸で選べるようにする狙い。

## Sol（最上位ティア）

- **位置づけ**: フロンティア（最高性能）モデル。旧GPT-5系での無印（サフィックスなし）ティアに相当。
- **用途**: 複雑なコーディング、長時間セッション、高度なエージェント、セキュリティ研究など「最も難しい仕事」向け。
- **スペック**: コンテキストウィンドウ約105万トークン（入力最大92.2万、出力最大12.8万）。
- **価格**: 入力$5 / 出力$30（100万トークンあたり）。27.2万トークンを超える入力は全体が入力2倍・出力1.5倍の料金になる。
- **アクセス**: OpenAI APIユーザー、ChatGPT Proサブスクライバー（Plusでも「High」設定までは利用可、「Extra High」「Pro」はPro/Business/Enterprise限定という情報あり）。

## Terra（中位ティア）

- **位置づけ**: 「スイートスポット」となるバランス型。
- **用途**: コンテンツ生成、カスタマーサポート、データ抽出、通常のコード補助など、大半の実務作業。
- **価格**: 入力$2.50 / 出力$15 ー Solの約半額。
- **アクセス**: ChatGPT Plus / Teams / Enterprise、API。

## Luna（軽量・低コストティア）

- **位置づけ**: 効率最優先モデル。
- **用途**: 高スループット処理、分類・ルーティング、リアルタイム補完、モデレーションなど単純作業向け。
- **価格**: 入力$1 / 出力$6 ー ファミリー内最安。
- **アクセス**: 全APIユーザー、ChatGPT無料ユーザーも制限付きで利用可。

## 使い分けの目安

基本はTerraで開始し、必要に応じてSolへ、大量処理はLunaへ、という運用が推奨されている。

## 関連

Anthropic Claudeも[[claude-model-tiers|同様のティア構成(Opus/Sonnet/Haiku/Fable)]]を採用している。

## 出典

- [Previewing GPT-5.6 Sol: a next-generation model | OpenAI](https://openai.com/index/previewing-gpt-5-6-sol/)
- [What Is GPT-5.6? OpenAI's Sol, Terra, and Luna Model Tiers Explained | MindStudio](https://www.mindstudio.ai/blog/what-is-gpt-5-6-sol-terra-luna-explained)
- [GPT-5.6 Sol Model | OpenAI API](https://developers.openai.com/api/docs/models/gpt-5.6-sol)
- [How to choose the right OpenAI GPT-5.6 model - Axios](https://www.axios.com/2026/07/12/openai-chatgpt-work-luna-terra-sol)
- [GPT-5.6 Sol Is Our Favorite Model to Collaborate With - Every](https://every.to/vibe-check/gpt-5-6-sol)
