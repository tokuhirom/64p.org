---
created: 2026-08-26 16:45
updated: 2026-08-26 16:45
---
# ElevenLabs Instant Voice Cloning

商用TTSサービスElevenLabsが提供する音声クローン機能のひとつ。ダッシュボードの「Voices」セクションから音声をアップロードまたは録音するだけで、訓練なしにその声でのTTS生成を開始できる。

## 必要な音声サンプル

1〜3分の高品質な音声（ノイズやリバーブのないクリアな音声）が必須。1〜2分程度が推奨され、3分を超えても改善効果は薄く、むしろ品質低下につながる可能性があるとされる。サンプルの本数より総時間の質が重要。

## Professional Voice Cloningとの違い

ElevenLabsにはもう一段上の**Professional Voice Cloning**があり、両者は必要な音声量と処理内容が異なる。

- **Instant**: 1〜3分の音声で、学習（トレーニング）を行わずに即座にクローンを生成。長尺のナレーションでは声質が不安定になりやすい。
- **Professional**: 30〜180分の音声を使い、3〜6時間かけてモデルをファインチューニングする。より自然で安定した結果が得られる。

## 料金プラン

Instant Voice CloningはStarterプラン（月$5〜6程度）から利用可能。無料プランには含まれない。Professional Voice CloningはCreatorプラン以上（月$22程度）が必要。

## 利用規約上の注意点

クローン化しようとする音声について、利用者本人がその権利と本人の同意を有していることの確認が必須とされている。知的財産権の尊重と悪用防止が規約上強調されている。

## [[voice-cloning|音声クローニング・音声変換ツール]]の中での位置づけ

このハブノートの中で唯一の商用SaaS。[[gpt-sovits|GPT-SoVITS]]・[[fish-speech|Fish Speech]]のような自前ホスティングの手間なしに、サブスク課金だけで使える点が特徴。必要サンプル量（1〜3分）はGPT-SoVITSのfew-shot(1分)と同程度、Fish Speechのゼロショット(10秒)よりは多い。

## 出典

- [Instant Voice Cloning - ElevenLabs公式ドキュメント](https://elevenlabs.io/docs/product-guides/voices/voice-cloning/instant-voice-cloning)
- [ElevenLabs Pricing](https://elevenlabs.io/pricing)
