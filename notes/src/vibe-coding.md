---
created: 2026-09-01 23:40
updated: 2026-09-01 23:40
---
# vibe coding

Andrej Karpathyが2025年2月2日のポストで名付けた、LLMに自然言語で指示して出てきたコードを細かく読まずに動かし、望む結果になるまで指示を重ねていく開発スタイル。

https://x.com/karpathy/status/1886192184808149383

「コードの存在そのものを忘れる（*forget that the code even exists*）」という部分が肝で、単にAIに補完させることではなく、**生成されたコードを読まない・レビューしないことを前提に置く**点が定義の中心にある。Karpathy自身はそのループを "see stuff, say stuff, run stuff, copy-paste stuff" と要約している。当時の投稿ではCursor Composer + Sonnetを、音声入力のSuperWhisper経由で喋って操作する、という具体的な使い方が挙げられていた。

## 語の広まりと意味のずれ

Collins Dictionaryが2025年の Word of the Year に選出し、"the use of artificial intelligence prompted by natural language to assist with the writing of computer code" と定義した。ただしこの定義は「AIに自然言語で指示してコードを書かせること」全般を指しており、Karpathyの原義にあった「コードを読まない」という条件は落ちている。

現在は**プロンプト駆動の開発全般を指す語**として使われることが多く、本番システムに対して使われる文脈では品質面の含意を伴って否定的に用いられることもある。

## Karpathy自身による1年後の振り返り（2026年2月）

https://x.com/karpathy/status/2019137879310836075

命名当時はLLMの能力的に、使い捨てのプロジェクト・デモ・探索用途が中心だったが、1年後にはLLMエージェントによるプログラミングがプロの既定のワークフローになりつつある、ただしより多くの監督と精査を伴って——という趣旨の総括をしている。元のポスト自体は「シャワー中の思いつきを投げただけ」だったとも述べている。

## [[spec-driven-development|spec駆動開発]]との関係

vibe codingの失敗モード——エージェントが一見もっともらしいコードを出すが意図から徐々にずれる、存在しないAPIを呼ぶ、規模が大きくなるほど破綻する——への対処として立ち上がったのが[[spec-driven-development|spec駆動開発]]にあたる。「レビューされないコードが増える速度に、検証プロセスが追いつかない」という検証ギャップが批判の中心にあり、レビュー対象をコードから仕様へ前倒しするのがspec駆動側の答えになっている。

## 出典

- [Andrej Karpathy - X（原典、2025年2月2日）](https://x.com/karpathy/status/1886192184808149383)
- ['Vibe coding' named Collins Dictionary's Word of the Year - CNN](https://www.cnn.com/2025/11/06/tech/vibe-coding-collins-word-year-scli-intl)
- [A semantic history of vibe coding: Tweet, meme and workflow - CodeRabbit](https://www.coderabbit.ai/blog/a-semantic-history-how-the-term-vibe-coding-went-from-a-tweet-to-prod)

#llm #ai-agent #spec駆動開発
