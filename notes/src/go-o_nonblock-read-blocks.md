---
created: 2026-08-15 09:11
updated: 2026-08-15 09:14
---
# Goのos.ReadはO_NONBLOCK+EAGAINでもブロックする

Go言語で`/dev/kmsg`のようなデバイスファイルを`O_NONBLOCK`フラグ付きで開いて`os.File.Read`しても、C言語のように`EAGAIN`を受け取ってすぐ制御が戻ってくることを期待するとハングする。

## 原因

Goの`os.Read`（Linux実装）は、内部の`read(2)`システムコールが`EAGAIN`を返した場合、それをアプリケーション側にエラーとして返さない。代わりに`fd.pd.pollable()`が`true`のとき`fd.pd.waitRead`が呼ばれ、readyになるまで（＝データが来るまで）内部で待機し続ける。

Goランタイムは[[go-netpoller|netpoller]]という`epoll`ベースのI/Oポーリング機構を使い、ノンブロッキングI/Oをアプリケーションから見て「あたかもブロッキングI/Oであるかのように」隠蔽する設計になっている。そのため、呼び出し元は`EAGAIN`を観測できず、`O_NONBLOCK`フラグを立てただけでは真にノンブロッキングな挙動にならない。

## 検証方法

元記事の著者は以下の手順で原因を突き止めている。

1. `strace`で追跡し、①`read`が`O_NONBLOCK`付きで実行され`EAGAIN`を返している、②その直後に`epoll_pwait`がtimeout=-1（無限待ち）で呼ばれていることを確認。
2. `gdb`の`catch syscall`機能で、その`epoll_pwait`呼び出しが`runtime.schedule → runtime.findRunnable`というGoランタイムのスケジューラ内部から発生していることを突き止めた。

## 回避策

1. **`SetReadDeadline`でタイムアウトを設定する** — `os.ErrDeadlineExceeded`を検知して抜ける。
2. **`SyscallConn`インターフェースを使う** — 低レベルの`read(2)`を直接呼び、netpollerの自動待機を経由せず`EAGAIN`を自分でハンドリングする。

## 出典

- [Go: O_NONBLOCKなのにreadがブロックする](https://appare45.hatenablog.com/entry/go-o_nonblock-read-blocks)

#golang #linux
