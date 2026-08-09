---
created: 2026-08-09
updated: 2026-08-09
---
# BPF (Berkeley Packet Filter)

OSカーネル内でパケットのフィルタリング・キャプチャを行うための仕組み。もともとは「小さな仮想マシン」として設計され、現在は拡張版のeBPFがカーネル拡張全般に使われる巨大なエコシステムに育っている。 #networking #linux #kernel

## 歴史

- 1992年12月、Lawrence Berkeley LaboratoryのSteven McCanneとVan Jacobsonが開発
- 論文 "The BSD Packet Filter: A New Architecture for User-level Packet Capture" が元になっている

## 仕組み(classic BPF)

- ユーザー空間のプロセスが「どのパケットを受け取りたいか」を指定するフィルタプログラムを、カーネル内の小さな仮想マシン上で実行する
- アキュムレータ1個・インデックスレジスタ1個を持つシンプルな32bit仮想マシン
- `tcpdump`や[[ngrep]]の`port 80`のようなフィルタ構文はこのBPFにコンパイルされて実行される

## eBPF (extended BPF)

- Linux 3.18(2014年)以降で導入された拡張版。64bitレジスタを10個持ち、パケットフィルタ以外の汎用的な用途にも対応
- カーネルソースコードを変更せず、**検証器(Verifier)**が「無限ループしない」「メモリ外アクセスがない」ことを静的に検証した上で、JITコンパイルしてネイティブ並みの速度で安全に実行する
- 用途はネットワーキング(Ciliumの高性能ロードバランシング)、オブザーバビリティ(`bpftrace`、`bcc`による低オーバーヘッドのトレーシング)、セキュリティ(実行時監視)など多岐にわたる
- Microsoftも Windows へのeBPFサポートを進めており、Linux固有の技術ではなくなりつつある

## まとめ

「BPF」と言った場合、文脈によって①`tcpdump`/ngrepのフィルタ構文の元になった古典的なパケットフィルタ仮想マシン(cBPF)、②カーネル拡張基盤として肥大化した現代のeBPF、のどちらを指すか変わってくる、という点が押さえどころ。

## 出典

- [Berkeley Packet Filter - Wikipedia](https://en.wikipedia.org/wiki/Berkeley_Packet_Filter)
- [What is eBPF? - ebpf.io](https://ebpf.io/what-is-ebpf/)
