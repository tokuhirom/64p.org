---
created: 2026-08-15 09:14
updated: 2026-08-15 09:14
---
# Go netpoller

Goランタイムが持つ、I/Oの多重化（epoll/kqueue/IOCPなど）をgoroutineスケジューラと統合する内部レイヤー。[[go-o_nonblock-read-blocks|GoのosReadがO_NONBLOCK+EAGAINでもブロックする]]問題の直接の原因になっている仕組み。

## 設計思想

Goの標準ライブラリは、ソケットやファイルへの`Read`/`Write`をアプリケーションコードから見て素朴な「ブロッキング呼び出し」のように書かせる。コールバックベースの非同期I/O（イベントループにハンドラを登録するスタイル）は制御フローを追いにくくするため、Goはその複雑さをランタイム内部に押し込め、開発者には`epoll_create`/`epoll_ctl`/`epoll_wait`を一切触らせない設計を選んでいる。

## 主要な関数(Linux実装: `runtime/netpoll_epoll.go`)

- `netpollinit()` — epollインスタンスの作成。プログラム全体で1回だけ呼ばれる。
- `netpollopen(fd, pd)` — 対象のファイルディスクリプタをエッジトリガーで`epoll_ctl`に登録する。
- `netpoll(delta)` — `epoll_wait`を実行する本体。`delta`が負なら無限待機、0ならノンブロック、正ならその時間だけ待機。
- `netpollBreak()` — `netpoll`がブロック中のときに強制的に起こすための唤起機構。

## pollDesc とgoroutineの休止・再開

各fdには`pollDesc`という構造体が対応付けられ、その fd を読み待ち/書き待ちしているgoroutineへのポインタ(`rg`/`wg`)を保持する。

- **休止時**: `read(2)`などが`EAGAIN`を返すと、ランタイムは`netpollblock`を呼び、`gopark`で該当goroutineをスケジューラから外して休眠させる。この時点でOSスレッド(M)は解放され、他のgoroutineの実行に回せる。
- **再開時**: `netpoll`が`epoll_wait`でfdのready状態を検出すると、対応する`pollDesc`から休止中のgoroutineを`goready`で実行可能状態に戻す。

## スケジューラ(GMPモデル)との統合

goroutineスケジューラの`findRunnable`は、実行可能なgoroutineを探す過程で`runtime.netpoll`を呼び出す。さらに、バックグラウンドで動く`sysmon`スレッドも約10ms間隔で`netpoll`を実行し、非同期的にI/Oイベントを拾い上げる。この統合により、「netpollが1個で済んでいるランタイム全体の窓口」として機能し、複数スレッドが同時にepollへブロックしないよう排他制御されている。

## 出典

- [go/src/runtime/netpoll.go](https://github.com/golang/go/blob/master/src/runtime/netpoll.go)
- [go/src/runtime/netpoll_epoll.go](https://github.com/golang/go/blob/master/src/runtime/netpoll_epoll.go)
- [Explaining the Golang I/O multiplexing netpoller model - SoByte](https://www.sobyte.net/post/2022-01/go-netpoller/)

#golang #linux
