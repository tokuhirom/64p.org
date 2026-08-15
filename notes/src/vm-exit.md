---
created: 2026-08-16 07:48
updated: 2026-08-16 07:48
---
# VM exit

ゲスト(VM内で動くコード)が、CPU自身では処理できない・処理してはいけない操作をしようとした瞬間に、制御が強制的にゲストからホスト側([[kvm|KVM]]およびその上のVMM)に戻される現象。 #virtualization

## 発生する操作

[[kvm|KVM]]は「ゲストのCPU命令をホストCPU上でほぼそのままネイティブ実行する」というのが基本方針だが、以下のような操作だけは例外的にトラップしてユーザー空間のVMMに処理を投げる。

- **I/O命令**(`outb`/`inb`などポートへの読み書き) — `KVM_EXIT_IO`
- **メモリマップドI/O(MMIO)へのアクセス** — `KVM_EXIT_MMIO`
- **HLT命令**(CPUを停止させる) — `KVM_EXIT_HLT`
- **特権命令の実行**(CR3の書き換えなど、ハードウェア全体に影響する操作)
- **割り込み・例外**

## `kvm_run`構造体

VMMが`KVM_RUN`ioctlを呼んでゲストを実行させると、VM exitが起きた際の理由は`struct kvm_run`(vCPUのファイルディスクリプタにmmapされた共有メモリ)の`exit_reason`フィールドに書き込まれる。I/Oの場合は`run->io`に方向(入力/出力)・サイズ・ポート番号・値の個数が、MMIOの場合は`run->mmio`にゲスト物理アドレスや読み書きするデータが入る。VMM側はこの`exit_reason`を見て該当するデバイスエミュレーションを行い、また`KVM_RUN`を呼んでゲストの実行を再開させる。

## なぜ重要か: 性能設計の中心テーマ

VM exit1回ごとに、ゲストモードからホストモードへのコンテキストスイッチというオーバーヘッドが乗る。そのため「VM exitの回数をいかに減らすか」が仮想化I/Oの性能設計の中心的なテーマになる。[[virtio|virtio]]が「共有メモリのリングバッファにまとめて書き、通知は1回だけ」という設計を取っているのも、まさにこのVM exit削減が狙い。

## 実際に動かしてみる

[[kvm-hello-world-experiment|kvm-hello-world実験]]と[[virtqueue-toy-experiment|virtqueue風トイ実験]]で、VM exit回数を[[strace]]で実測して比較した。

| 実験 | 送信データ量 | VM exit(`KVM_RUN`)回数 |
|---|---|---|
| 1文字ごとに`outb`で通知 | 14バイト | 15回 |
| まとめて書いて1回だけ通知 | 64バイト | 2回 |

送信データ量は後者の方が大きいにもかかわらず、VM exit回数は15回→2回まで減った。データをまとめてVM exitを減らすことが、そのままI/Oスループットの改善に直結することを数字で確認できる。

## [[microvm-ecosystem|コンテナ向け軽量VM技術]]の中での位置づけ

[[kvm|KVM]]とユーザー空間VMMの間の連携を成立させている核心のメカニズム。[[virtio|virtio]]のようなI/O設計は、このVM exitをいかに減らすかという課題への回答になっている。

## 出典

- [Using the KVM API - LWN.net](https://lwn.net/Articles/658511/)
- [Assignment 7 - SO2 Virtual Machine Manager with KVM — The Linux Kernel documentation](https://linux-kernel-labs.github.io/refs/heads/master/so2/assign7-kvm-vmm.html)
- [KVM Exit Handling - Linux Kernel Internals](https://kernel-internals.org/virtualization/kvm-exits/)
- [Analyzing VM exit reasons and statistics with kvmexit command - Red Hat Customer Portal](https://access.redhat.com/solutions/6994095)
