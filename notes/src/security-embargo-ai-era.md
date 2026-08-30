---
created: 2026-08-30 20:07
updated: 2026-08-30 20:07
---
# AI時代の脆弱性エンバーゴ

脆弱性の情報を修正が行き渡るまで伏せておく「エンバーゴ」を前提にした協調的開示(coordinated disclosure)のプロセスが、LLMによる悪用コード生成の速度に対して成り立ちにくくなっているのではないか、という論点。

#security #ai

## 発端となった記事

Anil Madhavapeddy が 2026年8月22日に書いた [Just a rumour of a bug is enough to find a security exploit these days](https://anil.recoil.org/notes/rumour-is-the-exploit)。[[cohttp-path-traversal-2026|cohttpのパストラバーサル脆弱性]]の修正PRを公開した際の観測をもとにしている。

記事に書かれている観測と主張は以下の通り。

- 修正PRを公開してから約10分後、自身のウェブサイトがパーセントエンコードされたトラバーサル文字列の探索を受けた("within about ten minutes (!) this website was fielding probes for percent-encoded traversal sequences")
- 自身のAIエージェントにパス正規化まわりを調べさせたところ、関連する脆弱性を数分で特定できた。ローカルのサーバーを叩く悪用コードは1分足らずで書けた("created an exploit to probe a local live server in under a minute")
- したがって、修正内容を伏せても「そこにバグがあるらしい」という情報だけで悪用が成立しうる

記事には、探索の送信元・タイムスタンプ・ペイロードといったログや、平常時の探索頻度との比較は掲載されていない。なお、パーセントエンコードされたトラバーサル探索は特定の実装を狙わない汎用ペイロードとして各種スキャナに標準で同梱されている(→ [[path-traversal]])。

## 記事が引用している数値

| 出典 | 内容 |
| --- | --- |
| Sysdig | marimo (CVE-2026-39987): アドバイザリ公開から最初の悪用試行まで9時間 |
| Sysdig | Langflow (CVE-2026-33017): 同20時間 |
| Mandiant M-Trends 2026 | mean time to exploit が -7日 |
| Fang et al. | CVE の説明文を与えた場合、GPT-4エージェントは15件のベンチマークの87%を悪用。説明文なしでは7% |

M-Trends の time-to-exploit (TTE) は「脆弱性が知られてから最初の悪用が観測されるまで」の差分として定義されており、負の値は「パッチが公開される前に悪用されている」ことを意味する。この指標は2018年時点で約63日、2024年にゼロを下回った。

## 記事が挙げている3つの方向性

1. **Super sekrit private patch development** — 私的な開発基盤の強化。OSSコミュニティの議論はMatrix(暗号化)やDiscord/Slackに分散しており、修正コードそのものより「脆弱性の説明を必要な人にだけ届ける」仕組みが重要になる、という指摘。GitHubのtemporary private forkについては、CI/CDと連携できない、マージできるPRが1本のみ、リポジトリ横断の問題に対応できない、レビュアー追加に時間がかかる、という制約が挙げられている
2. **No embargoes, just ship continuously** — エンバーゴを置かず継続的にリリースする。Chromeの週次セキュリティ更新と隔週リリースが例として挙げられている。OSSライブラリでは依存関係が絡むため、エコシステム横断のパッケージ管理、Andrew Nesbitt の Scrutineer のようなトリアージ支援ツール、マルチプラットフォームのCI/CD強化が必要とされる
3. **Proactive protection at the protocol layer** — 仮想パッチング。CloudflareがLog4j2の際にマネージドルールを即座に配布した例が挙げられ、著者は "antibotty network"(ローカルで高速に伝播する防御)を提案している

著者はいずれか単独では足りず組み合わせが必要だとしている。また [[project-glasswing]] のような商用フロンティアモデルへのアクセス格差にも言及している。

## bugonomics

記事が土台にしている概念。2026年5月23日の論文 [Demystifying the Mythos or Disrupting Bugonomics? From Zero-Day Asymmetry to Defender Remediation Throughput](https://arxiv.org/abs/2605.24632) で提示された。

- 脆弱性の「発見・証明・優先順位付け・修正」の運用経済(bugonomics)という観点から、LLMによる脆弱性発見の影響を分析したもの
- Anthropic の Mythos Preview と Mozilla Firefox の協業に関する公開データ、exploit市場の価格、脆弱性報奨金プログラム、インシデントのベースラインを材料にしている
- 主張は「単にゼロデイが増える」ではなく、**ボトルネックがゼロデイの非対称性から防御側の修正スループット(defender remediation throughput)へ移る**というもの。低シグナルな候補報告の生成コストが下がり、証拠の揃った修正パッケージの価値が上がり、希少な処理能力がメンテナのレビューとリリース作業に集中する
- 特にOSSで影響が大きい。LLM支援の発見は機械速度で報告量を増やせるが、メンテナ側の検証・トリアージ・資金・リリース能力は自動的にはスケールしない

## 出典

- [Just a rumour of a bug is enough to find a security exploit these days | Anil Madhavapeddy](https://anil.recoil.org/notes/rumour-is-the-exploit)
- [Demystifying the Mythos or Disrupting Bugonomics? (arXiv:2605.24632)](https://arxiv.org/abs/2605.24632)
- [M-Trends 2026: Data, Insights, and Strategies From the Frontlines | Google Cloud Blog](https://cloud.google.com/blog/topics/threat-intelligence/m-trends-2026)
- [Lobsters での議論](https://lobste.rs/s/t73wqi/just_rumour_bug_is_enough_find_security)
