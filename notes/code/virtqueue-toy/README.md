# virtqueue-toy

[kvm-hello-world](../kvm-hello-world/)の土台の上に自作した、[virtio](https://docs.oasis-open.org/virtio/virtio/v1.3/virtio-v1.3.html)のvirtqueue(共有メモリ+バッチ化+1回の通知)の核心だけを再現したトイ実装。詳細は [`/notes/virtqueue-toy-experiment.html`](https://64p.org/notes/virtqueue-toy-experiment.html) を参照。

- `vq_guest.c` — ゲスト側。メッセージを共有メモリにまとめて書き込み、最後に1回だけ`outb`でドアベルを鳴らす(32-bit protected mode、freestanding)
- `vq_host.c` — ホスト側。`/dev/kvm`を直接叩いてこのゲストを起動し、ドアベルを受け取ったら共有メモリから直接メッセージを読み出す
- `guest.ld` — [dpw/kvm-hello-world](https://github.com/dpw/kvm-hello-world)(MIT License)の同名ファイルを流用。フラットバイナリ(`OUTPUT_FORMAT(binary)`)を生成するリンカスクリプト

## ビルド・実行

```sh
make run
```

`/dev/kvm`への読み書き権限が必要(`kvm`グループへの所属、またはACL付与)。

## VM exit回数の比較

`../kvm-hello-world`(1文字ごとに`outb`)との比較は`strace`で確認できる。

```sh
strace -f -e trace=ioctl ../kvm-hello-world/kvm-hello-world -s 2>&1 >/dev/null | grep -c KVM_RUN   # => 15
strace -f -e trace=ioctl ./vq_host vq_guest.img 2>&1 >/dev/null | grep -c KVM_RUN                    # => 2
```
