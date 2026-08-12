# kvm-hello-world

[dpw/kvm-hello-world](https://github.com/dpw/kvm-hello-world)(MIT License)を元にした、`/dev/kvm`のioctlを直接叩く最小限のKVM実験コード。詳細は [`/notes/kvm-hello-world-experiment.html`](https://64p.org/notes/kvm-hello-world-experiment.html) を参照。

Ubuntu/Pop!_OS 24.04・GCC 13・binutils 2.42向けに、オリジナルのMakefileに以下の修正を加えている。

1. `CFLAGS`から`-Werror`を除去(新しいGCCの`-Warray-bounds`警告を無視するため)
2. `payload.o`を作る`ld`呼び出しに`-r`を追加(新しいbinutilsでの互換性のため)

## ビルド・実行

```sh
make
./kvm-hello-world -s   # protected mode
./kvm-hello-world -p   # 32-bit paging
./kvm-hello-world -l   # long mode (64-bit)
./kvm-hello-world -r   # real mode
```

`/dev/kvm`への読み書き権限が必要(`kvm`グループへの所属、またはACL付与)。
