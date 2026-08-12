---
created: 2026-08-13 00:24
updated: 2026-08-13 00:24
---
# librosa

Pythonの音声・音楽信号処理ライブラリ。MIR（Music Information Retrieval、音楽情報検索）システム構築に必要な基礎的なアルゴリズムとツール群を提供する。NumPy/SciPyの上に構築されており、matplotlibと連携した可視化もできる。ISCライセンス。

2015年のSciPyカンファレンスで発表された論文「librosa: Audio and music signal analysis in python」がベースになっている、研究由来のライブラリ。

インストールは以下のいずれか。

```sh
pip install librosa
conda install -c conda-forge librosa
```

## モジュール構成

| モジュール | 役割 |
|---|---|
| `librosa.core`（トップレベル`librosa.*`からも直接呼べる） | 音声ファイルの読み込み(`load`)、各種スペクトログラム計算など基礎機能 |
| `librosa.feature` | MFCC、クロマ特徴量、メルスペクトログラム、スペクトル重心など特徴量抽出。`delta()`で差分特徴量も可 |
| `librosa.beat` | テンポ推定・ビート検出（`beat_track()`） |
| `librosa.onset` | オンセット（音の立ち上がり）検出 |
| `librosa.effects` | ピッチシフト、タイムストレッチなど時間領域の加工 |
| `librosa.decompose` | 調波・打楽器成分分離(HPSS)、汎用スペクトログラム分解 |
| `librosa.segment` | 構造セグメンテーション |
| `librosa.sequence` | ビタービ復号などの系列モデリング |
| `librosa.display` | matplotlibベースの波形・スペクトログラム可視化 |
| `librosa.util` | 正規化・パディング等のユーティリティ |

## 主な用途

- 音楽情報検索(MIR): ジャンル分類、テンポ・拍検出、コード認識など
- 機械学習の前処理: MFCCやメルスペクトログラムを算出し、音声認識・音響イベント検出モデルの入力にする
- 音声加工: ハーモニック/パーカッシブ分離、ピッチ・テンポ変換
- 対応フォーマットはWAV/OGG/MP3/FLACなど

典型的なワークフローは、`librosa.load()`で波形を読み込み → `librosa.feature.*`で特徴量抽出 → 必要に応じて`librosa.beat.beat_track()`や`librosa.effects.hpss()`で解析、という流れになる。

## 出典

- [librosa GitHub](https://github.com/librosa/librosa)
- [librosa Tutorial (0.11.0)](https://librosa.org/doc/0.11.0/tutorial.html)
- [Extracting audio features using Librosa](https://kaavyamaha12.medium.com/extracting-audio-features-using-librosa-3be4ff1fe57f)
- [A Comprehensive Guide to Audio Processing with Librosa in Python](https://medium.com/@rijuldahiya/a-comprehensive-guide-to-audio-processing-with-librosa-in-python-a49276387a4b)
