---
created: 2026-08-13 08:35
updated: 2026-08-13 08:35
---
# XDP (eXpress Data Path)

Linuxカーネルに統合された高性能パケット処理フレームワーク。[[bpf|eBPF]]を利用し、パケットがNICドライバに届いた直後、カーネルが`sk_buff`を確保するより前の最も早い段階でカスタムのパケット処理を実行できる。 #networking #linux #kernel

## 実行モード

- **Native XDP**: ドライバのRXパス内で直接実行される、最も高速なデフォルトモード。mlx5, i40e, ixgbeなど主要な高性能NICドライバが対応
- **Generic XDP**: `sk_buff`ベースで動作し、ドライバを問わず任意の環境で使えるが低速。ネイティブ対応がない場合のフォールバックで、主に開発・テスト用途
- **Offloaded XDP**: SmartNICなどの専用ハードウェア上でXDPプログラム自体を実行するモード。ホストCPUを消費せずに済むが、対応NICと利用可能なeBPF機能に制約がある

## アクション(戻り値)

XDPプログラムはパケットごとに以下のいずれかのアクションを返す。

- **XDP_PASS**: パケットを通常のネットワークスタックに渡す(内容の書き換えも可能)
- **XDP_DROP**: パケットを破棄する。DDoS対策やファイアウォールで、不正トラフィックを最小オーバーヘッドで早期に落とす用途に使われる
- **XDP_TX**: 受信したのと同じNICからパケットを送り返す
- **XDP_REDIRECT**: 別のNICやCPU、あるいは後述のAF_XDPソケットへパケットを転送する
- **XDP_ABORTED**: プログラムのエラーを示し、パケットは破棄される(トレースポイントで検知可能)

## AF_XDP

ユーザー空間アプリケーションがXDPプログラムから直接パケットを受け取るための、高性能パケット処理に最適化されたアドレスファミリ。XDPプログラムが`bpf_redirect_map()`でXSKMAP内のAF_XDPソケットへパケットを転送する仕組み。RXとTXが同じUMEM(ユーザーメモリ領域)を共有することで、パケットをRXとTX間でコピーする必要がないゼロコピーモードを実現できる。高スループットが要求されるパケット処理フレームワークやネットワーク監視ツールなどで使われる。

## ユースケース

- **DDoS対策・ファイアウォール**: `XDP_DROP`で不正トラフィックを早期に破棄
- **ロードバランシング・転送**: `XDP_TX`/`XDP_REDIRECT`によるパケット転送
- **モニタリング**: パケットヘッダや流特性の抽出

[[cilium|Cilium]]の高性能ロードバランシングや、[[open-vswitch|Open vSwitch]]のAF_XDP版実装など、eBPFエコシステムのネットワーキング用途で広く使われている。

## 出典

- [XDP (eXpress Data Path) - Linux Kernel Internals](https://kernel-internals.org/net/xdp/)
- [eBPF XDP: The Basics and a Quick Tutorial - Tigera](https://www.tigera.io/learn/guides/ebpf/ebpf-xdp/)
- [AF_XDP — The Linux Kernel documentation](https://docs.kernel.org/networking/af_xdp.html)
- [A gentle introduction to XDP - Datadog](https://www.datadoghq.com/blog/xdp-intro/)
