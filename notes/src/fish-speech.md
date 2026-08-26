---
created: 2026-08-26 16:45
updated: 2026-08-26 16:45
---
# Fish Speech

Fish Audio社が開発するオープンソースのTTS（テキスト音声合成）システム。リポジトリは[fishaudio/fish-speech](https://github.com/fishaudio/fish-speech)。

## アーキテクチャ

最新モデルS2 Proは「マスター/スレーブ構成のデュアル自己回帰（DualAR）」アーキテクチャを採用する。低速AR層（40億パラメータ）が意味情報（何を話すか）を処理し、高速AR層（4億パラメータ）が残りの音響的なディテールを生成する2段構成。強化学習による最適化も行われている。

## 音声クローンと対応言語

参照音声10秒程度で声をクローンできる。80言語以上に対応し、日本語・英語・中国語がTier1言語として扱われる。学習データは1,000万時間規模の音声。

## ライセンス: 研究無償・商用は別ライセンス

**FISH AUDIO RESEARCH LICENSE**の下で公開されている。研究・非商用目的の利用は無償だが、**商用利用にはFish Audioから別途ライセンスを取得する必要がある**（オープンウェイトのモデルweightそのものも対象）。サービス側の無料プランも個人・非商用限定で、収益化されたYouTubeチャンネルやクライアント向け成果物への利用は規約違反になる。

## [[voice-cloning|音声クローニング・音声変換ツール]]の中での位置づけ

TTS系の中で最も対応言語数・学習データ規模が大きい部類。ただし[[gpt-sovits|GPT-SoVITS]](MIT)と違い、商用利用には別途ライセンス契約が必要な点が実務上の大きな違いになる。

## 出典

- [fishaudio/fish-speech - GitHub](https://github.com/fishaudio/fish-speech)
- [fish-speech LICENSE](https://github.com/fishaudio/fish-speech/blob/main/LICENSE)
- [License terms: what about using this in a commercial product? · Issue #531](https://github.com/fishaudio/fish-speech/issues/531)
