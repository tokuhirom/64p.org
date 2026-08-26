---
created: 2026-08-26 16:45
updated: 2026-08-26 16:45
---
# RVC (Retrieval-based Voice Conversion)

2023年に公開されたオープンソースの音声変換（Voice Conversion, VC）技術。テキストからではなく、既にある音声（自分の歌声など）を入力とし、話者性だけを別人の声に変換する「speech-to-speech」である点がTTS系ツールと異なる。リポジトリは[RVC-Project/Retrieval-based-Voice-Conversion-WebUI](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI)、MITライセンス。前身の技術であるSo-VITS-SVCから発展した。

## 仕組み: 3つのコンポーネント

1. **特徴抽出器**: HuBERTなど自己教師あり学習モデルで、入力音声から言語的内容の特徴を抽出する。
2. **検索（retrieval）モジュール**: 抽出した特徴を使い、ターゲット話者の音声データベースから最も近い音声セグメントを検索する。これが「Retrieval-based」の由来で、統計モデルで直接特徴をマッピングする方式より自然性・話者忠実度を高めることを狙っている。
3. **ボコーダー**: 検索結果の表現から実際の波形を合成する。

ベクトル量子化(VQ)や敵対的学習(adversarial learning)といった手法も組み込まれている。学習には10分程度の音声データがあれば良好なモデルを作れるとされる。

## 主な用途と論点

主用途は歌声変換で、動画共有プラットフォーム上で人気キャラクターの声で楽曲をカバーする「歌ってみた」的な使われ方が広く見られる。一方で、本人の同意なく著名人の声を模倣することがプライバシー・パブリシティ権の侵害に当たりうるという懸念が指摘されており、実際に一部プラットフォームで著名人に似せたAI生成音声への削除申請が出された事例がある。

## [[voice-cloning|音声クローニング・音声変換ツール]]の中での位置づけ

このハブノートの中で唯一の「音声変換(VC)」系ツール。[[gpt-sovits|GPT-SoVITS]]・[[fish-speech|Fish Speech]]がテキストから音声を生成するTTS系なのに対し、RVCは既存の音声（歌声など）の話者性だけを変換する用途に特化している。

## 出典

- [RVC-Project/Retrieval-based-Voice-Conversion-WebUI - GitHub](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI)
- [Retrieval-based Voice Conversion - Wikipedia](https://en.wikipedia.org/wiki/Retrieval-based_Voice_Conversion)
