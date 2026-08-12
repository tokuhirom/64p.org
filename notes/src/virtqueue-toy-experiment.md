---
created: 2026-08-12 23:55
updated: 2026-08-12 23:59
---
# virtqueue風トイ実験

[[virtio|virtio]]の核心である「共有メモリ経由でまとめて送り、通知は1回だけ」という設計を体感するための実験。[[kvm-hello-world-experiment|kvm-hello-world実験]]の続きとして、同じ`/dev/kvm`生ioctlの土台の上に自作した。 #virtualization #linux

## 前回実験との対比が主眼

kvm-hello-world実験の`guest.c`は、1文字送るたびに`outb`命令を実行し、そのたびに[[kvm|KVM]]の「VM exit」が発生していた。これは実デバイスのレジスタを1バイトずつ叩くのに近い、素朴なやり方。

今回作ったゲストコードは代わりに以下の手順を踏む。

1. メッセージ全体を共有メモリ上の固定アドレス(0x1000番地)にまとめて書き込む(通常のメモリアクセスなのでVM exitは起きない)
2. メッセージ長を別の固定アドレス(0x2000番地)に書き込む
3. **最後に1回だけ**専用ポート(0xE8)へ`outb`し、ホストに「ドアベル」を鳴らす

ホスト側は、このドアベルを受け取ったら0x2000番地から長さを読み、0x1000番地からメッセージ本体をまとめて読み出す。実際のvirtioは記述子テーブル・avail ring・used ringという3つのリング構造を持つが、この実験ではそれを「固定アドレスのバッファ+長さ+ドアベル」という単一スロットのメールボックスまで単純化している。

## 実行結果

```
$ ./vq_host vq_guest.img
[host] loaded 180 bytes of guest code at guest phys 0x0
[host] doorbell #1: ring says len=64 bytes -- reading straight out of guest memory (no per-byte trap):
Hello via a toy virtqueue! One doorbell, not one exit per byte.
[host] guest halted. doorbell rang 1 time(s) total (message was multiple bytes -- one exit either way)
[host] guest rax=42 (expect 42), mem[0x400]=42 (expect 42)
```

## `strace`で客観的に比較

`KVM_RUN` ioctlの呼び出し回数(=VM exitしてホストに戻ってきた回数)を`strace`で数えた。

| 実験 | メッセージ長 | `KVM_RUN`呼び出し回数 |
|---|---|---|
| kvm-hello-world(`-s`、1文字ごとに`outb`) | 14バイト("Hello, world!\n") | 15回(outb 14回 + HLT 1回) |
| virtqueue風トイ実験(まとめて送信) | 64バイト | 2回(doorbell 1回 + HLT 1回) |

```sh
strace -f -e trace=ioctl ./kvm-hello-world -s 2>&1 >/dev/null | grep -c KVM_RUN   # => 15
strace -f -e trace=ioctl ./vq_host vq_guest.img 2>&1 >/dev/null | grep -c KVM_RUN  # => 2
```

送ったメッセージは今回の方が長い(64バイト > 14バイト)にもかかわらず、ホストとのラウンドトリップ回数は15回→2回まで減っている。VM exit1回ごとに発生するコンテキストスイッチのコストを考えると、この差がそのままI/Oスループットの差になる。これが[[virtio|virtio]]がフルデバイスエミュレーションより高速な理由の最小限の実演になっている。

## ソースコード

```c
/* guest側: vq_guest.c (抜粋) */
volatile char *buf = (volatile char *) 0x1000;
volatile uint32_t *lenp = (volatile uint32_t *) 0x2000;
const char *msg = "Hello via a toy virtqueue! ...\n";
uint32_t i = 0;
while (msg[i]) { buf[i] = msg[i]; i++; }  /* VM exitなし */
*lenp = i;
outb(NOTIFY_PORT, 1);  /* ここだけVM exit */
```

```c
/* host側: vq_host.c (抜粋) */
case KVM_EXIT_IO:
    if (vcpu.kvm_run->io.port == NOTIFY_PORT) {
        uint32_t len;
        memcpy(&len, vm.mem + 0x2000, sizeof(len));
        fwrite(vm.mem + 0x1000, 1, len, stdout);  /* 直接ゲストメモリを読む */
        continue;
    }
```

ビルド方法は[[kvm-hello-world-experiment|kvm-hello-world実験]]と同様(`guest.ld`を流用し、`OUTPUT_FORMAT(binary)`でフラットバイナリを生成、ホスト側は`fread`でそれを読んでゲストメモリに直接コピーするだけなので、payload.ldのようなオブジェクト結合の仕掛けは不要にした)。

## 実際のvirtio仕様との違い(単純化した点)

- 記述子テーブル・avail ring・used ringという3種のリングではなく、固定アドレス1つの「メールボックス」にした
- virtio-mmio/virtio-pciのようなデバイス発見・feature negotiationの手順を省いた
- 割り込みによる完了通知ではなく、そもそも1往復で完結する単純なやり取りにした

これらを省いても「共有メモリ+バッチ化+1回の通知」という核心のメカニズムと、それによるVM exit削減効果は十分に確認できた。

## ソース

このリポジトリの[`notes/code/virtqueue-toy/`](https://github.com/tokuhirom/64p.org/tree/master/notes/code/virtqueue-toy)にソース一式を置いてある(`make run`でビルド・実行できる)。

## 出典

- 実装は独自。[[virtio|virtio]]・[[kvm|KVM]]の一般的な仕組みの理解を踏まえて書き下ろした
