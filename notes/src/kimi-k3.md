---
created: 2026-08-16 12:48
updated: 2026-08-17 18:32
---
# Kimi K3

中国・北京のMoonshot AI(Alibaba出資先)が2026年7月16日に発表、7月27日にモデル重みと技術レポートを公開したモデル。総パラメータ数2.8兆(2,800B)で、VentureBeatやTom's Hardwareなど複数メディアが「史上最大のオープンウェイトモデル」と報じている。[[open-weight-llm-moc|オープンウェイトLLM MOC]]の一員で、[[kimi-k2-7|Kimi K2.7]]・[[kimi-k2-6|Kimi K2.6]]の上位フラッグシップにあたる。

## アーキテクチャ

- 総パラメータ数2.8兆、トークンあたりのアクティブパラメータ数1,040億。
- [[moe|Mixture-of-Experts]]構成で、896個のルーティングエキスパートのうちトークンごとに16個を選択するスパース構成。
- MXFP4[[llm-quantization|量子化]]フォーマットを採用。
- テキスト・画像・動画の入力に対応するマルチモーダルモデル。

## コンテキスト長・料金

- コンテキスト長は1,048,576トークン(約1M)。
- API価格は入力$3/出力$15(百万トークンあたり)。

## ライセンス

「Kimi K3 License」という独自ライセンス。MITベースだが非商用寄りの制約が付く。年間売上2,000万ドル超の企業は個別の商用契約が必要で、月間アクティブユーザー1億人超または月商2,000万ドル超の製品では「Kimi K3」ブランドの表示義務がある。

## ベンチマーク

Artificial Analysis Intelligence Indexで57点を記録。同時期のOpenAI GPT-5.6 Sol(59点)、Anthropic Claude Opus 5(61点)にはわずかに及ばないものの、オープンウェイトモデルの中ではトップで、トップクラスのクローズドモデルに肉薄する水準と報じられている。エージェントタスク・コーディング・視覚評価でもオープンウェイト最高水準とされ、Frontend Code ArenaベンチマークではClaude Fable 5を上回ったとの報道もある。

一方で、ハルシネーション率51%という課題も指摘されている(出典: kingy.ai)。パラメータ数が非常に大きいため実行に必要なハードウェア要件が高く、実際にセルフホストできる環境が限られる点も複数メディアで指摘されている。

## [[open-weight-llm-moc|オープンウェイトLLM]]の中での位置づけ

2026年8月時点で総パラメータ数最大のオープンウェイトモデル(2.8兆)。ライセンスはMITベースだが大規模商用利用に制約が付く。知能指標ではクローズドなフロンティアモデル([[claude-model-tiers|Claude]]・[[gpt-5-6-sol-terra-luna|GPT-5.6]]など)に肉薄する、オープンウェイト陣営のフラッグシップ。

## 出典

- [China's Moonshot AI releases Kimi K3, the largest open-source model ever, rivaling top U.S. systems (VentureBeat)](https://venturebeat.com/technology/chinas-moonshot-ai-releases-kimi-k3-the-largest-open-source-model-ever-rivaling-top-u-s-systems)
- [Moonshot releases 2.8 trillion parameter Kimi K3 (Tom's Hardware)](https://www.tomshardware.com/tech-industry/artificial-intelligence/moonshot-releases-2-8-trillion-parameter-kimi-k3)
- [Kimi K3 model overview, MXFP4 quantization, open weights (Hugging Face blog)](https://huggingface.co/blog/ResterChed/kimi-k3-model-overview-mxfp4-quantization-open-wei)
- [Kimi K3 benchmarks, specs, price (kingy.ai)](https://kingy.ai/blog/kimi-k3-benchmarks-specs-price-fable-5-gpt-5-6-sol/)
- [Kimi公式ブログ](https://www.kimi.com/blog/kimi-k3)

#kimi #moonshot-ai #llm #open-weight
