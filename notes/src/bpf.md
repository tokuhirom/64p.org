---
created: 2026-08-09 16:23
updated: 2026-08-13 08:33
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
- 用途はネットワーキング([[cilium|Cilium]]の高性能ロードバランシング、[[open-vswitch|Open vSwitch]]のeBPF版実装)、オブザーバビリティ([[bpftrace]]、`bcc`による低オーバーヘッドのトレーシング)、セキュリティ(実行時監視)など多岐にわたる
- Microsoftも Windows へのeBPFサポートを進めており、Linux固有の技術ではなくなりつつある

### 実行の仕組み

eBPFプログラムはシステムコール・関数の入出力点・ネットワークイベントなど「フック」に取り付けられ、トリガーされるとカーネル内で特権的なアクセス権を持って実行される。

1. **Verifier(検証器)**: ロード時にあらゆる実行パスを静的解析し、クラッシュしないこと・未初期化メモリにアクセスしないこと・必ず完了すること(無限ループしない)を保証する。プログラムタイプごとに、呼び出せるヘルパー関数と必要な権限が定義されている
2. **JITコンパイラ/インタプリタ**: 検証を通過したプログラムは、対応アーキテクチャ(x86, ARM等)ではJITでネイティブ機械語にコンパイルされ高速実行される。非対応の場合はインタプリタがバイトコードを解釈実行する
3. **eBPF Maps**: プログラム終了後もデータを永続化するキー・バリュー型ストレージ。ハッシュテーブル・配列・リングバッファなど内部構造の異なる複数種類があり(Linux v5.15時点で29種類)、カーネル内のeBPFプログラムとユーザー空間のプログラム双方からBPFシステムコール経由でアクセスできる
4. **ヘルパー関数**: カーネルにハードコードされた定義済み関数群(Linux v5.15時点で175種類)。多くはMapの読み書き用(`bpf_map_lookup_elem`、`bpf_map_update_elem`等)

### 開発の流れ

多くの場合、開発者はバイトコードを直接書くのではなく、C言語ライクな擬似コードをLLVM経由でeBPFバイトコードにコンパイルするツール(`bcc`、[[bpftrace]]、`libbpf`等)を使う。

### ネットワーキングでの応用: XDP

XDP (eXpress Data Path) は、NICドライバのごく初期の段階(パケットがカーネルのネットワークスタックに入る前)でeBPFプログラムを実行する仕組み。パケットのコピーやスタック通過のオーバーヘッドを避けられるため、高性能なパケット処理・ロードバランシングに使われる。

## まとめ

「BPF」と言った場合、文脈によって①`tcpdump`/ngrepのフィルタ構文の元になった古典的なパケットフィルタ仮想マシン(cBPF)、②カーネル拡張基盤として肥大化した現代のeBPF、のどちらを指すか変わってくる、という点が押さえどころ。

## 出典

- [Berkeley Packet Filter - Wikipedia](https://en.wikipedia.org/wiki/Berkeley_Packet_Filter)
- [What is eBPF? - ebpf.io](https://ebpf.io/what-is-ebpf/)
- [eBPF Explained: Use Cases, Concepts, and Architecture - Tigera](https://www.tigera.io/learn/guides/ebpf/)
- [Helper functions - eBPF Docs](https://docs.ebpf.io/linux/helper-function/)
- [BPF Architecture — Cilium documentation](https://docs.cilium.io/en/stable/reference-guides/bpf/architecture/)
