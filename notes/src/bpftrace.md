---
created: 2026-08-13 08:32
updated: 2026-08-13 08:32
---
# bpftrace

Linux向けの高レベルなトレーシング言語兼フロントエンド。ユーザーが書いたトレーシングスクリプトをコンパイルし、[[bpf|eBPF]]バイトコードとしてカーネル空間で安全に実行する。eBPFのオブザーバビリティ用途を代表するツールの一つ。 #linux #kernel #observability

## 設計

- 言語デザインはawk、C、および先行するトレーサーであるDTrace・SystemTapから影響を受けている
- バックエンドとしてLLVM(スクリプトのコンパイル)とlibbpf(BPFサブシステムとのやり取り)を使用する

## probeの種類

- **kprobe/kretprobe**: カーネル関数の呼び出し時/リターン時に発火する。動的で、デバッグ・調査向け
- **uprobe/uretprobe**: ユーザー空間関数版のkprobe。アプリケーション内部の可視化に使う
- **tracepoint**: カーネルソースコードに静的に定義されたプローブ地点。kprobeと異なりカーネルバージョン間で安定しているため、本番監視向け
- **usdt** (User Statically-Defined Tracing): ユーザー空間アプリケーションに静的に埋め込まれたトレースポイント

使い分けの目安として、本番監視には安定したtracepoint、デバッグ・調査にはkprobe、アプリケーション内部を見たい場合はuprobeを使うとされる。

## 実行モード

- **Dynamic Mode**: スクリプトを即座にコンパイル・実行する通常の使い方
- **Listing Mode** (`-l`): 実行せず利用可能なprobe地点を列挙する
- **Ahead-of-Time Mode** (`--aot`): スクリプトを移植可能な実行ファイルに事前コンパイルする
- **Test Mode** (`--test-mode`): カーネル実行なしでの検証・ベンチマーク用

## 実験

実際にインストールして動かした記録は[[bpftrace-experiment]]を参照。

## 出典

- [bpftrace: dynamic tracing for Linux](https://bpftrace.org/)
- [GitHub - bpftrace/bpftrace](https://github.com/bpftrace/bpftrace)
- [bpftrace/bpftrace | DeepWiki](https://deepwiki.com/bpftrace/bpftrace)
- [A thorough introduction to bpftrace - Brendan Gregg](https://www.brendangregg.com/blog/2019-08-19/bpftrace.html)
- [Working with kernel probes - bpftrace docs](https://bpftrace.org/hol/kernel-probes)
