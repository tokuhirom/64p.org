---
created: 2026-08-12 13:40
updated: 2026-08-12 13:40
---
# MicrophoneTest(マイク音質評価Webアプリ)

#web-audio #tool

[vaaaaanquish](https://github.com/vaaaaanquish)氏が公開しているブラウザベースのマイク音質評価ツール。マイクを選んで数秒話すだけで、音声の明瞭さを100点満点でスコアリングしてくれる。

- URL: https://vaaaaanquish.github.io/MicrophoneTest/
- リポジトリ: https://github.com/vaaaaanquish/MicrophoneTest

## 仕組み

Web Audio APIとAudioWorklet(`recorder-worklet.js`)でマイク音声をキャプチャ・処理する。録音データは外部送信せずブラウザ内で完結する。ノイズ抑制やエコーキャンセルなどブラウザ側の補正を無効化した状態で測定するため、マイクの素の性能を評価できる。

8つの指標を文献ベースのアルゴリズムで評価し、重み付け集計した上でITU-T G.107 E-modelを用いてMOS(Mean Opinion Score)に変換する。

| 指標 | 手法 |
|---|---|
| ノイズ(SNR) | VADベース推定、30dB以上を「クリーン」と判定 |
| 残響(RT60) | Ratnam(2003)の減衰解析法 |
| 録音レベル | ITU-T P.56標準に基づく評価 |
| クリッピング | フルスケール付近のサンプル比率チェック |
| 周波数応答 | 帯域幅・アルファ比率の測定 |
| 接続安定性 | ドロップアウト検出 |
| 電源ハム | Goertzelアルゴリズムによる50/60Hz検出 |
| ピークヘッドルーム | 4倍オーバーサンプリングで算出 |

ITU勧告・ISO規格・査読済み論文などの学術文献を参照して設計されている。

## 出典

- [MicrophoneTest (公開ページ)](https://vaaaaanquish.github.io/MicrophoneTest/)
- [vaaaaanquish/MicrophoneTest (GitHub)](https://github.com/vaaaaanquish/MicrophoneTest)
