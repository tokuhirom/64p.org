---
created: 2026-08-11 07:34
updated: 2026-08-11 07:34
---
# MIDI

Musical Instrument Digital Interface。電子楽器・コンピュータ・音楽機材同士が演奏情報をやり取りするための通信規格。演奏情報（ノートオン/ノートオフ、ピッチ、タイミングなど）を送り、受信側は自身の音源で音を鳴らす仕組みで、音声波形そのものは送らない。

## 歴史

- 1981年に規格が起草され、1982年にYamaha・Roland・Korg・Kawai・Sequential Circuits・Oberheimの6社によって発表された。
- 開発の中心人物はSequential CircuitsのDave Smithと、RolandのIkutaro Kakehashi（梯郁太郎）。異なるメーカーのシンセサイザー同士が通信できる共通プロトコルとして考案された。
- MIDI以前は、メーカーが異なるデジタルピアノ・シンセサイザー・ドラムマシン同士は互いに通信できなかった。
- 1983年のWinter NAMM Showで、Sequential CircuitsのProphet-600とRolandのJP-6を接続した実演が行われ、初めて公に披露された。

## 技術仕様（MIDI 1.0）

- 転送速度は31.25kbps（31250bps）。
- 非同期シリアル通信で、スタート1ビット・データ8ビット・ストップ1ビットの構成。
- チャンネル数はステータスバイトの下位4ビットで表現するため16チャンネル（0〜15）。
- 物理コネクタは5ピンDINコネクタ、電気的には5mAのカレントループ方式。
- 標準化団体はMIDI Manufacturers Association（MMA）と、日本側は一般社団法人音楽電子事業協会（AMEI）のMIDI規格委員会。

## 関連

[[famimimidi]]はファミコンをMIDI音源として動作させる自作ハードウェアで、MIDI経由でファミコン内蔵音源を制御する応用例。

## 出典

- [MIDI History Chapter 6-MIDI Begins 1981-1983 – MIDI.org](https://midi.org/midi-history-chapter-6-midi-begins-1981-1983)
- [1983 Dave Smith, Sequential Circuits MIDI Specification](https://www.mixonline.com/technology/1983-dave-smith-sequential-circuits-midi-specification-383642)
- [MIDI ‐ 通信用語の基礎知識](https://www.wdic.org/w/CUL/MIDI)
- [MIDI1.0規格書 - AMEI](https://amei.or.jp/midistandardcommittee/MIDIspcj.html)
- [MIDI(ミディ)とは？ - コトバンク](https://kotobank.jp/word/midi-3172241)

#music #hardware #protocol
