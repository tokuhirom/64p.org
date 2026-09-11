---
created: 2026-09-11 05:53
updated: 2026-09-11 05:53
---
# testing/synctestを動かしてみる

#golang #testing

[[go-synctest|testing/synctest]]のドキュメントを読むだけだと「durably blocked」の線引きが実感しにくいので、手元で動かして確かめた記録。

## 環境

Go 1.24.7。このバージョンでは`GOEXPERIMENT=synctest`付きの旧API(`synctest.Run(func())`)になる。Go 1.25以降の`synctest.Test(t, func(*testing.T))`とはシグネチャが違うだけで、仮想時計とバブルの挙動自体は同じ。

`go.mod`と`_test.go`だけの最小モジュールを作り、`GOEXPERIMENT=synctest go test`で回した。

### まず引っかかったところ

`go vet`がこける。

```
package synctestexp (test)
	imports testing/synctest: build constraints exclude all Go files in /usr/local/go1.24.7/src/testing/synctest
```

`testing/synctest`のソースには`//go:build goexperiment.synctest`が付いているので、`GOEXPERIMENT=synctest`を渡さないツールからは**パッケージが存在しないように見える**。`go test`だけでなくvet・lint・エディタのLSPにも同じ環境変数を通す必要がある。Go 1.25以降ではこの問題自体が消える。

## 仮想時計

```go
synctest.Run(func() {
    t.Logf("bubble   time.Now() = %v", time.Now().UTC())
})
```

```
bubble   time.Now() = 2000-01-01 00:00:00 +0000 UTC
real     time.Now() = 2026-09-11 05:50:15.722901029 +0000 UTC
```

ドキュメント通り2000-01-01 00:00:00 UTC固定。そして`time.Sleep(24 * time.Hour)`は、

```
bubble経過 = 24h0m0s
実時間経過 = 30.607µs
```

バブル内では24時間経ったことになり、実時間では30µsしか使っていない。

複数のgoroutineが別々の長さで寝ても、仮想時刻順にきちんと起きる。

```go
for _, d := range []time.Duration{3 * time.Hour, 1 * time.Hour, 2 * time.Hour} {
    go func(d time.Duration) {
        time.Sleep(d)
        done <- d.String() + " @ " + time.Now().UTC().Format("15:04:05")
    }(d)
}
```

```
1h0m0s @ 01:00:00
2h0m0s @ 02:00:00
3h0m0s @ 03:00:00
```

投入順ではなく仮想時刻順。時計は「次に発火すべきタイマー」まで飛ぶので、3時間ぶんの待ちが一瞬で終わる。

## 実用上の本命: contextのタイムアウトとバックオフ

```go
ctx, cancel := context.WithTimeout(context.Background(), 10*time.Minute)
defer cancel()
<-ctx.Done()
```

```
ctx.Err = context deadline exceeded / バブル時刻 = 2000-01-01 00:10:00 +0000 UTC
実時間経過 = 35.013µs
```

`context.WithTimeout`は内部で`time`のタイマーを使うので、そのまま仮想時計に乗る。10分のタイムアウトが35µs。

指数バックオフ10回も同様。

```go
d := time.Second
for i := 0; i < 10; i++ {
    attempts = append(attempts, time.Now().UTC().Format("15:04:05"))
    time.Sleep(d)
    d *= 2
}
```

```
10回の試行時刻 = [00:00:00 00:00:01 00:00:03 00:00:07 00:00:15 00:00:31 00:01:03 00:02:07 00:04:15 00:08:31]
合計バブル時間 = 17m3s
実時間経過 = 87.768µs
```

17分ぶんのリトライが88µs。バックオフの間隔が意図通りかを、実時間を1秒も使わずに検証できる。

## `synctest.Wait`

```go
ch := make(chan int)
state := "not started"
go func() {
    state = "waiting on chan"
    <-ch
}()
synctest.Wait()
t.Logf("Wait後のstate = %q", state)
```

```
Wait後のstate = "waiting on chan"
```

`Wait`から戻った時点で、子goroutineは確実にチャネル待ちに入っている。ここを`time.Sleep(10 * time.Millisecond)`で代用するのが並行テストのflakyさの元なので、この一点だけでも価値がある。

## デッドロック検出

誰も送らないチャネルを待つ。

```go
synctest.Run(func() {
    ch := make(chan int)
    <-ch
})
```

```
--- FAIL: TestDeadlock (0.00s)
panic: deadlock: all goroutines in bubble are blocked
```

**goroutineリークも同じpanicで落ちる。** rootはすぐ返るが子が永久に待つケース。

```go
synctest.Run(func() {
    ch := make(chan int)
    go func() { <-ch }() // 誰も送らない
    // rootはすぐ返る
})
```

```
panic: deadlock: all goroutines in bubble are blocked
```

`Run`はバブル内の全goroutineの終了を待つので、残ったgoroutineが永久にブロックしていればデッドロックとして落ちる。リーク検出器を別途入れなくてよい。

## durably blocked でないものはハングする

ここが一番確かめたかったところ。`sync.Mutex`のロック待ちは durably blocked の定義に入っていない。

```go
var mu sync.Mutex
mu.Lock()
go func() {
    mu.Lock() // 誰もUnlockしない
    mu.Unlock()
}()
synctest.Wait()
```

```
panic: test timed out after 20s
	running tests:
		TestMutexNotDurable (20s)
```

**デッドロックとして検出されず、実時間でハングした。** 子goroutineが durably blocked にならないので`Wait`が戻らず、`go test -timeout`に救われるまで止まったまま。チャネルのデッドロックは0.00秒でpanicするのに、mutexのデッドロックは20秒待たされる。この非対称性は知っておかないとハマる。

バブルの外で作ったチャネルも同じ扱いになる。

```go
var outsideCh = make(chan int) // パッケージ変数 = バブル外で作られている

go func() {
    time.Sleep(2 * time.Second) // バブル外なので実時間
    outsideCh <- 1
}()
synctest.Run(func() { <-outsideCh })
```

```
実時間経過 = 2s
```

仮想時計で飛ばされず、律儀に実時間で2秒待った。「チャネルなら速い」ではなく「**バブル内で作られたチャネルなら**速い」。

## ネストは不可

```go
synctest.Run(func() {
    synctest.Run(func() {})
})
```

```
panic: synctest.Run called from within a synctest bubble
```

## 分かったこと

- 仮想時計が効く範囲は`time`パッケージ経由のもの(`time.Sleep`、`time.After`、`context.WithTimeout`など)。ここに乗っている限り、待ち時間はタダになる。
- バブルは「時計を速くする」だけでなく「**全goroutineが止まった**という状態を観測可能にする」仕組み。`Wait`とデッドロック検出はどちらもこの観測から来ている。
- 逆に、その観測から漏れるもの(mutex、バブル外チャネル、実I/O)が1つでも混ざると、その部分だけ実時間に戻る。しかもデッドロックしても静かにハングするので、テスト対象を設計する段階でI/Oを差し替え可能にしておく前提は変わらない。
