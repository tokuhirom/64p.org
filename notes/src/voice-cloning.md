---
created: 2026-08-26 16:45
updated: 2026-08-26 16:45
---
# 音声クローニング・音声変換ツール

音声を使ってテキストを特定の人物の声で読み上げたり(TTS)、既存の音声の話者性だけを別人の声に変換したり(VC)するAIツール群。オープンソースのTTS/VC系と、商用SaaSとに大別できる。

#moc #tts #voice-cloning

## TTS系(テキスト→音声)

- [[gpt-sovits|GPT-SoVITS]] — 1分の音声でfew-shot学習できるオープンソースTTS。MITライセンスで商用利用も無償。
- [[fish-speech|Fish Speech]] — Fish Audio社によるオープンソースTTS。80言語以上に対応するが、商用利用には別途ライセンス契約が必要。

## VC系(音声→音声)

- [[rvc-voice-conversion|RVC (Retrieval-based Voice Conversion)]] — 既存の音声（歌声など）の話者性だけを別人の声に変換するオープンソース技術。歌ってみた動画などで広く使われる。

## 商用SaaS

- [[elevenlabs-instant-voice-cloning|ElevenLabs Instant Voice Cloning]] — 1〜3分の音声アップロードだけでクローンを作れる商用サービス。より高精度な「Professional Voice Cloning」という上位オプションもある。

## 選び方の軸

- **入力がテキストか既存音声か**: テキストから読み上げたいならTTS系(GPT-SoVITS・Fish Speech・ElevenLabs)、既存の歌声・話し声の声質だけ変えたいならVC系(RVC)。
- **必要な音声サンプル量**: 少ない順に Fish Speech(10秒) < GPT-SoVITSゼロショット(5秒〜) ≒ ElevenLabs Instant(1〜3分) ≒ GPT-SoVITS few-shot(1分) < RVC学習(10分) < ElevenLabs Professional(30〜180分)。
- **ライセンス・商用可否**: GPT-SoVITSとRVCはMITで無償・商用可。Fish Speechは商用利用に別ライセンスが必要。ElevenLabsはSaaS課金。
- **セルフホスト vs SaaS**: オープンソース3種はローカル/自前サーバでの実行が前提。ElevenLabsはAPI/Web UIのみで自前ホスティング不要。
