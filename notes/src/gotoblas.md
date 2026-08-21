---
created: 2026-08-21 21:10
updated: 2026-08-21 21:10
---
# GotoBLAS

Kazushige Goto氏が開発した、手作業でチューニングされたアセンブリコードによる高速な[[blas|BLAS]]実装。[[openblas|OpenBLAS]]の直接の前身にあたるプロジェクト。

## 開発の経緯

Goto氏は日本国特許庁に勤務していたが、2002年のサバティカル休暇中にテキサス大学オースティン校のTexas Advanced Computing Center(TACC)に研究員として滞在し、GotoBLASを開発した。1990年代後半から、行列積の計算においてCPUの2階層のキャッシュ(L1/L2)を意識してブロック化する手法を導入し、ループ構造を工夫して行列Aの一部をL2キャッシュに保持し続けるようにした上で、内側のループ(「inner kernel」と呼ばれる)全体をアセンブリで手書きするというアプローチを取った。この手法は当時のコンパイラが生成するコードを上回る性能を発揮し、2003年時点では世界最速のスーパーコンピュータ上位10台のうち7台で採用されていた。

## その後

GotoBLASの開発は、Intelの Nehalemアーキテクチャ(2008年当時の最新世代)向けの最適化を最後に終了した(この時点のバージョンはGotoBLAS2と呼ばれる)。開発が止まった後、GotoBLAS2(1.13 BSD版)をベースに継続開発する形で生まれたのが[[openblas|OpenBLAS]]で、現在は中国科学院ソフトウェア研究所(ISCAS)の並列ソフトウェア・計算科学研究室が中心となってメンテナンスしている。

## 出典

- [Kazushige Goto - Wikipedia](https://en.wikipedia.org/wiki/Kazushige_Goto)
- [GotoBLAS - Wikipedia](https://en.wikipedia.org/wiki/GotoBLAS)
- [OpenBLAS - Wikipedia](https://en.wikipedia.org/wiki/OpenBLAS)
- [Anatomy of High-Performance Matrix Multiplication (Kazushige Goto, TOMS)](https://www.cs.utexas.edu/~flame/pubs/GotoTOMS_revision.pdf)

#math #performance #history
