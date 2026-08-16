---
created: 2026-08-16 12:48
updated: 2026-08-16 12:48
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
| Llama 4 | Meta | 2025- | Llama系カスタムライセンス | Scout/Maverick(MoE)、Behemoth未リリース | - |
| Mistral Large 3 | Mistral AI | 2025-12 | Apache 2.0 | 675B / 41B | 256K |
| DeepSeek V4-Pro | DeepSeek | 2026-04 | MIT | 1.6T / 49B | 1M |
| DeepSeek V4-Flash | DeepSeek | 2026-04 | MIT | 284B / 13B | 1M |
| gpt-oss-120b | OpenAI | 2025-08 | Apache 2.0 | 117B / 5.1B | - |
| gpt-oss-20b | OpenAI | 2025-08 | Apache 2.0 | 21B / 3.6B | - |
| GLM-5.2 | Zhipu AI(Z.ai) | 2026-06 | MIT | 744B / 40B | 1M |
| GLM-5.3 | Zhipu AI(Z.ai) | 2026-08 | MIT | GLM-5.2の後継 | - |

数値は各社発表・各種報道に基づく。空欄は調査時点で確認できなかった項目。

## ライセンスの傾向

- **素直なApache 2.0/MIT系**: Qwen3.8-27B、Mistral Large 3、DeepSeek V4、gpt-oss、GLM-5.2/5.3。商用利用の制約がほぼない。
- **「Modified MIT」「独自ライセンス」で大規模商用利用に条件が付くタイプ**: Kimi K2.6/K2.7 Codeの「Modified MIT」、Kimi K3の「Kimi K3 License」。いずれも年商・MAUが一定規模を超える企業に対して、個別契約やブランド表示義務を課す条項がある。オープンウェイトではあるが、Apache/MITのような無条件の再配布・商用利用とは性質が異なる点に注意。

## 大きさ(パラメータ規模)の傾向

2026年半ば以降、オープンウェイト陣営でも兆パラメータ級のMoEモデルが相次いでいる。

- **軽量・denseで扱いやすい層**: Qwen3.8-27B(27.78B)、gpt-oss-20b(21B)。単一の高性能GPU/ハイエンドPCでも動く規模。
- **数百B級MoE**: gpt-oss-120b、DeepSeek V4-Flash、Mistral Large 3。
- **兆パラメータ級MoE**: Kimi K2.6/K2.7 Code(1T)、DeepSeek V4-Pro(1.6T)、GLM-5.2(744B、こちらは1Tにやや届かない)、そして最大の[[kimi-k3|Kimi K3]](2.8T)。総パラメータ数が大きくてもアクティブパラメータ数(実際に計算に使われる部分)ははるかに小さいMoE設計が主流。

## 賢さの傾向

- Kimi K3はArtificial Analysis Intelligence Indexで57点を記録し、同時期のGPT-5.6 Sol(59点)・Claude Opus 5(61点)に迫る、オープンウェイト陣営トップの水準と報じられている。
- gpt-oss-120bはOpenAI自身のo3-miniを上回りo4-miniに匹敵するとされる。
- GLM-5.2は独立ベンチマークでコーディング分野においてGPT-5.5を上回ったとの報告がある。
- Kimi K2.6はHLE-Full(ツール使用あり)でGPT-5.4・Claude Opus 4.6・Gemini 3.1 Proを上回ったと報告されている。
- ベンチマーク数値は測定条件(ツール使用の有無、プロンプト、評価者)によって変動が大きく、各モデルのノート内で出典を明示している。特にQwen3.8-27Bの一部ベンチマークは一次情報での裏取りができていない点に注意。

## 出典

各モデルの詳細な出典は個別ノート([[qwen3-8-27b]]、[[kimi-k2-6]]、[[kimi-k2-7]]、[[kimi-k3]])を参照。その他モデルの出典は以下。

- [Llama 4 herd (Meta公式)](https://ai.meta.com/blog/llama-4-multimodal-intelligence/)
- [Every Mistral AI Model Explained (Second Talent)](https://www.secondtalent.com/resources/every-mistral-ai-model-explained-compared/)
- [DeepSeek V4 (morphllm)](https://www.morphllm.com/deepseek-v4)
- [Introducing gpt-oss (OpenAI公式)](https://openai.com/index/introducing-gpt-oss/)
- [GLM-5.2 released (datanorth.ai)](https://datanorth.ai/news/zhipu-ai-releases-glm-5-2)

#moc #llm #open-weight
