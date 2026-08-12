---
created: 2026-08-12 23:42
updated: 2026-08-12 23:55
---
# kvm-hello-world実験

[[kvm|KVM]]がやっていることを手を動かして体感するための実験記録。[[qemu|QEMU]]等を一切使わず、`/dev/kvm`のioctlを直接叩くだけの最小限のCプログラムでVMを起動する。 #virtualization #linux

## 使ったもの

[dpw/kvm-hello-world](https://github.com/dpw/kvm-hello-world)というMIT Licenseの約500行のC教材プログラム。[[qemu|QEMU]]やkvmtoolのような「フル機能のVMM」ではなく、KVM APIの使い方だけを見せるために書かれたもの。

## 動かし方

```sh
git clone https://github.com/dpw/kvm-hello-world
cd kvm-hello-world
make
./kvm-hello-world -s   # protected modeでゲストを起動
```

Ubuntu/Pop!_OS 24.04・GCC 13・binutils 2.42の環境では、Makefileそのままだと2箇所で失敗したため修正が必要だった。

1. `CFLAGS`の`-Werror`を外す — 新しいGCCが`*(long *) 0x400 = 42;`(ヌルポインタ相当のアドレスへの書き込み)を`-Warray-bounds`で警告するようになっており、教材コード自体は正しい意図(アドレス0はゲストのメモリ先頭という意味)なのでビルドを通すために警告を無視する
2. `payload.o`を作る`ld -T payload.ld -o payload.o`に`-r`(relocatable指定)を追加 — 新しいbinutilsは`-r`なしだと実行可能ファイルを生成してしまい、後続のリンクに使えずエラーになる

## 実行結果

```
$ ./kvm-hello-world -s
Testing protected mode
Hello, world!
$ ./kvm-hello-world -p
Testing 32-bit paging
Hello, world!
$ ./kvm-hello-world -l
Testing 64-bit mode
Hello, world!
$ ./kvm-hello-world -r
Testing real mode
```

real modeのゲスト(`guest16.s`、アセンブリ6行)はメモリに42を書き込んで`hlt`するだけで文字出力コードがないため、`Hello, world!`は出ない(エラーが出なければ成功)。

## なぜsudoなしで動いたか

`/dev/kvm`は通常`root:kvm`グループの`0660`権限で、一般ユーザーはkvmグループに入っていないとアクセスできない。このマシンでは`getfacl /dev/kvm`で確認したところ、ユーザーに対する個別ACLエントリ(`user:tokuhirom:rw-`)が付与されており、それによってsudoなしで直接`/dev/kvm`を開けた。

## コードで分かること

ゲスト側(`guest.c`)はOSなしの3行程度のプログラムで、ポート0xE9への`outb`命令を1文字ずつ実行するだけ。

```c
for (p = "Hello, world!\n"; *p; ++p)
    outb(0xE9, *p);
```

ホスト側(`kvm-hello-world.c`)はこの機械語をVMのメモリに直接コピーし、`KVM_RUN`をループで呼ぶ。ゲストが`outb`を実行するたびに「VM exit」が発生し、`KVM_EXIT_IO`としてホスト側に制御が戻る。

```c
case KVM_EXIT_IO:
    if (vcpu->kvm_run->io.direction == KVM_EXIT_IO_OUT
        && vcpu->kvm_run->io.port == 0xE9) {
        fwrite(p + vcpu->kvm_run->io.data_offset,
               vcpu->kvm_run->io.size, 1, stdout);
        continue;  // またKVM_RUNに戻ってゲストを再開
    }
```

ポート0xE9は実在のデバイスではなく、このプログラムが決めた「ただの取り決め」。これが[[kvm|KVM]]ノートで説明した「KVMはデバイスエミュレーションを一切せず、ユーザー空間のVMMがI/Oを肩代わりする」の最小の実例になっている。FirecrackerやQEMUがネットワーク・ディスクに対してやっていることの、極小版がこれだと考えると分かりやすい。

## 続き: [[virtqueue-toy-experiment|virtqueue風トイ実験]]

この実験の「1文字ごとに`outb`してVM exitする」という素朴なI/Oを、[[virtio|virtio]]のように「まとめて共有メモリに書いて1回だけ通知する」設計に変えるとどれだけVM exit回数が減るかを、この実験の続きとして確認した。

## 出典

- [GitHub - dpw/kvm-hello-world](https://github.com/dpw/kvm-hello-world)
- [kvm-hello-world/README.md](https://github.com/dpw/kvm-hello-world/blob/master/README.md)
