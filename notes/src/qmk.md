---
created: 2026-08-15 22:21
updated: 2026-08-15 22:21
---
# QMK Firmware

キーボードを制御するマイクロコントローラ向けのオープンソースファームウェア。QMKはQuantum Mechanical Keyboardの略。C言語で書かれ、Atmel AVR・ARM系のマイコン上で動作する。ライセンスはGPLv2/GPLv3、MIT、Modified BSD、Apache Licenseなどが混在している。

## 由来・開発体制

OLKBのJack Humbert氏によって開発・保守されている。Hasu氏によるtmk_keyboardというファームウェアをベースに、OLKB製品ライン・ErgoDox EZ・Clueboard向けの機能を追加する形で発展した。公式リポジトリは[qmk/qmk_firmware](https://github.com/qmk/qmk_firmware)で、GitHub上でStar数17.2k・Fork数37.1kと、コミュニティからのコントリビューションも活発。

## 自作キーボードでの使われ方

キーボードごとに「キーボード定義ファイル」(ピン配置・マトリクス構成など)を用意し、その上に「キーマップ」(どのキーにどの出力を割り当てるか)を記述する。これらをコンパイルして`.hex`などのバイナリを生成し、Pro Microなどのマイコンに書き込む、という流れで使う。

キー入力以外にも、ロータリーエンコーダやLED制御などをサポートしており、これが自作キーボード界隈で広く採用される理由の一つになっている。環境構築やカスタマイズには一定の難しさがあるが、機能の豊富さから根強く使われている。

GUIでレイアウトを設計してファームウェアを生成できる**QMK Configurator**や、生成したファームウェアをマイコンに書き込むためのフラッシュツールなど、周辺ツールも整備されている。

[[keyball]]や[[dactyl-manuform]]のファームウェアもQMKベースで作られている。

## 出典

- [QMK Firmwareで自作キーボードのファームウェアをイチから書く](https://zenn.dev/ymkn/articles/8f46a3d190fb13)
- [プログラマーではない人向けのQMK Firmware入門](https://qiita.com/cactusman/items/ac41993d1682c6d8a12e)
- [GitHub - qmk/qmk_firmware](https://github.com/qmk/qmk_firmware)
- [QMK - Wikipedia](https://en.wikipedia.org/wiki/QMK)

#自作キーボード #qmk
