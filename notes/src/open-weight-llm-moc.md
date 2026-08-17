---
created: 2026-08-16 12:48
updated: 2026-08-17 18:32
---
# オープンウェイトLLM

重み(weights)が公開されており、ダウンロードしてセルフホストできる大規模言語モデル群の見取り図。ライセンス・大きさ(パラメータ数)・賢さ(ベンチマーク上の位置づけ)の3軸で主要モデルを整理する。[[moc|MOCの説明]]も参照。

クローズドなフロンティアモデル(API経由でのみ利用可能なモデル)は対象外だが、賢さの比較基準として[[claude-model-tiers|Claudeのモデル階層]]・[[gpt-5-6-sol-terra-luna|GPT-5.6のSol/Terra/Luna]]をしばしば参照する。

## 比較表(2026年8月時点)

| モデル | 開発元 | リリース | ライセンス | パラメータ(総/アクティブ) | コンテキスト長 |
| --- | --- | --- | --- | --- | --- |
| [[qwen3-8-27b\|Qwen3.8-27B]] | Alibaba(Qwen Team) | 2026-08 | Apache 2.0 | 27.78B(dense) | 262K(拡張1M) |
| [[kimi-k2-6\|Kimi K2.6]] | Moonshot AI | 2026-04 | Modified MIT | 1T / 32B | 262K |
| [[kimi-k2-7\|Kimi K2.7 Code]] | Moonshot AI | 2026-06 | Modified MIT | 1T / 32B | 256K |
| [[kimi-k3\|Kimi K3]] | Moonshot AI | 2026-07 | Kimi K3 License(MITベース) | 2.8T / 104B | 1M |
| [[llama-4\|Llama 4 Scout]] | Meta | 2025-04 | Llama 4 Community License | 109B / 17B | 最大1000万 |
| [[llama-4\|Llama 4 Maverick]] | Meta | 2025-04 | Llama 4 Community License | 400B / 17B | - |
| [[llama-4\|Llama 4 Behemoth]] | Meta | 未リリース(事実上凍結) | Llama 4 Community License | 約2T / 288B | - |
| [[mistral-large-3\|Mistral Large 3]] | Mistral AI | 2025-12 | Apache 2.0 | 675B / 41B | 256K(要検証) |
| [[deepseek-v4\|DeepSeek V4-Pro]] | DeepSeek | 2026-08(0813版) | MIT | 1.6T / 49B | 1M |
| [[deepseek-v4\|DeepSeek V4-Flash]] | DeepSeek | 2026-07(0731版) | MIT | 284B / 13B | 1M |
| [[gpt-oss\|gpt-oss-120b]] | OpenAI | 2025-08 | Apache 2.0 | 116.8B / 5.1B | 131K |
| [[gpt-oss\|gpt-oss-20b]] | OpenAI | 2025-08 | Apache 2.0 | 20.9B / 3.6B | 131K |
| [[glm-5\|GLM-5.2]] | Zhipu AI(Z.ai) | 2026-06 | MIT | 744B / 40B | 1M |
| [[glm-5\|GLM-5.3]] | Zhipu AI(Z.ai) | 2026-08(重み未公開) | MIT | 744B / 40B(ベース同一) | 1M |

数値は各社発表・各種報道に基づく。空欄は調査時点で確認できなかった項目。GLM-5.3はAPI提供のみで、記事執筆時点ではモデル重みは未公開(安全性評価後に公開予定)。

## ライセンスの傾向

- **素直なApache 2.0/MIT系**: [[qwen3-8-27b|Qwen3.8-27B]]、[[mistral-large-3|Mistral Large 3]]、[[deepseek-v4|DeepSeek V4]]、[[gpt-oss|gpt-oss]]、[[glm-5|GLM-5.2/5.3]]。商用利用の制約がほぼない。
- **「Modified MIT」「独自ライセンス」で大規模商用利用に条件が付くタイプ**: [[kimi-k2-6|Kimi K2.6]]/[[kimi-k2-7|Kimi K2.7 Code]]の「Modified MIT」、[[kimi-k3|Kimi K3]]の「Kimi K3 License」。いずれも年商・MAUが一定規模を超える企業に対して、個別契約やブランド表示義務を課す条項がある。オープンウェイトではあるが、Apache/MITのような無条件の再配布・商用利用とは性質が異なる点に注意。
- **カスタムのコミュニティライセンス**: [[llama-4|Llama 4]]のLlama 4 Community License。月間アクティブユーザー7億人超の企業は個別許諾が必要という、オープンウェイト陣営の中でも制約が強い部類。

## 大きさ(パラメータ規模)の傾向

2026年半ば以降、オープンウェイト陣営でも兆パラメータ級の[[moe|MoE]]モデルが相次いでいる。

- **軽量・denseで扱いやすい層**: [[qwen3-8-27b|Qwen3.8-27B]](27.78B)、[[gpt-oss|gpt-oss-20b]](21B)。単一の高性能GPU/ハイエンドPCでも動く規模。
- **数百B級MoE**: [[gpt-oss|gpt-oss-120b]]、[[deepseek-v4|DeepSeek V4-Flash]]、[[mistral-large-3|Mistral Large 3]]、[[llama-4|Llama 4 Maverick]]。
- **兆パラメータ級MoE**: [[kimi-k2-6|Kimi K2.6]]/[[kimi-k2-7|Kimi K2.7 Code]](1T)、[[deepseek-v4|DeepSeek V4-Pro]](1.6T)、[[llama-4|Llama 4 Behemoth]](約2T、プレビューのみで凍結)、[[glm-5|GLM-5.2/5.3]](744B、こちらは1Tにやや届かない)、そして最大の[[kimi-k3|Kimi K3]](2.8T)。総パラメータ数が大きくてもアクティブパラメータ数(実際に計算に使われる部分)ははるかに小さいMoE設計が主流。

## 賢さの傾向

- [[kimi-k3|Kimi K3]]はArtificial Analysis Intelligence Indexで57点を記録し、同時期のGPT-5.6 Sol(59点)・Claude Opus 5(61点)に迫る、オープンウェイト陣営トップの水準と報じられている。
- [[gpt-oss|gpt-oss-120b]]はOpenAI自身のo3-miniを上回りo4-miniに匹敵するとされる。
- [[glm-5|GLM-5.2]]は独立ベンチマークでコーディング分野においてGPT-5.5を上回ったとの報告がある。
- [[kimi-k2-6|Kimi K2.6]]はHLE-Full(ツール使用あり)でGPT-5.4・Claude Opus 4.6・Gemini 3.1 Proを上回ったと報告されている。
- [[llama-4|Llama 4 Maverick]]はGPT-4o・Gemini 2.0 Flashを上回るとMetaは発表しているが、これは2025年4月の旧世代モデルとの比較である点に注意(その後2026年にかけて各社モデルは大きく更新されている)。
- ベンチマーク数値は測定条件(ツール使用の有無、プロンプト、評価者)によって変動が大きく、各モデルのノート内で出典を明示している。特に[[qwen3-8-27b|Qwen3.8-27B]]や[[deepseek-v4|DeepSeek V4]]の一部ベンチマークは、二次情報源間で数値の食い違いがあり一次情報での裏取りができていない点に注意。

## 各社のフロンティア開発動向

- Metaは[[llama-4|Llama 4]]のBehemoth(約2T)を正式リリースしないまま事実上凍結し、2026年に開発の軸を新系列「Muse」へ転換した。「Llama 5」は存在しない。
- Zhipu AI(Z.ai)は[[glm-5|GLM-5.3]]でベースモデルを再学習せずポストトレーニングのみで性能を伸ばす手法を取っており、他社と開発サイクルの取り方が異なる。

## 出典

各モデルの詳細な出典は個別ノート([[qwen3-8-27b]]、[[kimi-k2-6]]、[[kimi-k2-7]]、[[kimi-k3]]、[[llama-4]]、[[mistral-large-3]]、[[deepseek-v4]]、[[gpt-oss]]、[[glm-5]])を参照。

#moc #llm #open-weight
