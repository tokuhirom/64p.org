---
created: 2026-08-09
updated: 2026-08-09
---
# snoop

Sun Microsystems製の**Solaris**(SunOS)に標準搭載されているコマンドラインのパケットキャプチャ・解析ツール。 #networking #solaris #cli

## 概要

- SunOS 5.x(Solaris 2.x以降)に標準同梱、Solaris 10で安定版に
- 機能的には`tcpdump`や[[ngrep]]と同じ立ち位置(Wireshark/TSharkのSolaris版に近い)
- パケットをキャプチャしてリアルタイム表示するか、ファイルに保存できる

## ファイル形式

snoopが保存するキャプチャファイル形式は **RFC 1761** として標準化されており、Wireshark/TSharkも読み込み対応している(`tcpdump`のpcap形式とは別系統)。

## 位置づけ

Solaris環境における`tcpdump`相当のツール。[[ngrep]]のノートで触れた「`tcpdump`や`snoop`と同様の[[bpf|BPF]]フィルタ構文が使える」という記述の通り、フィルタ指定の文法もBPF系に準拠している。

## 出典

- [Snoop (software) - Wikipedia](https://en.wikipedia.org/wiki/Snoop_(software))
- [snoop - Wireshark Wiki](https://wiki.wireshark.org/snoop)
- [Monitoring Packet Transfers With the snoop Command - Oracle](https://docs.oracle.com/cd/E23824_01/html/821-1453/gexkw.html)
