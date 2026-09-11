---
created: 2026-09-11 05:53
updated: 2026-09-11 05:53
---
# testing/synctest

#golang #testing

並行処理のテストのためにGoの標準ライブラリに入ったパッケージ。テスト関数を「バブル」と呼ばれる隔離環境で走らせ、その中では**`time`パッケージが仮想時計で動く**。`time.Sleep(24 * time.Hour)`が実時間ゼロで終わるので、タイムアウト・リトライ・バックオフのテストから`time.Sleep`による待ち合わせを追い出せる。

実際に動かして確かめた記録は[[go-synctest-experiment|testing/synctestを動かしてみる]]に分けてある。

## 2つのAPIがある

| Goバージョン | API | 有効化 |
| --- | --- | --- |
| 1.24 | `synctest.Run(f func())` | `GOEXPERIMENT=synctest` が必要 |
| 1.25以降 | `synctest.Test(t *testing.T, f func(*testing.T))` | 不要(一般提供) |

[[go-release-cycle|リリースサイクル]]に沿って、Go 1.25のリリースノートいわく、「このパッケージはGo 1.24で`GOEXPERIMENT=synctest`の下、少し違うAPIで最初に利用可能になった。実験は一般提供に昇格した。古いAPIは`GOEXPERIMENT=synctest`を設定すれば今も存在するが、**Go 1.26で削除される**」。新規に書くなら`Test`の方。

```go
func TestTimeout(t *testing.T) {
    synctest.Test(t, func(t *testing.T) {
        ctx, cancel := context.WithTimeout(context.Background(), 10*time.Minute)
        defer cancel()
        <-ctx.Done() // 実時間では一瞬
    })
}
```

## バブルの中のルール

- **初期時刻は2000-01-01 00:00:00 UTC固定。** 実時計とは無関係。
- **時間は「バブル内の全goroutineがdurably blockedになったとき」にだけ進む。** 動いているgoroutineが1つでもあれば仮想時計は止まったまま。次に発火すべきタイマーの時刻まで一気に飛ぶ。
- **rootのgoroutineが終了すると時間の進行も止まる。**
- 全goroutineがdurably blockedで、発火待ちのタイマーも無ければ**デッドロックとしてpanicする**。
- バブルの中から`Run`/`Test`を呼ぶとpanicする(ネスト不可)。

## durably blocked の定義が肝

「durably blocked(永続的にブロックされている)」に該当するのは、ドキュメント上は次の5つだけ。

1. **バブル内で作られたチャネル**への送受信でのブロック
2. 全てのcaseがバブル内チャネルである`select`でのブロック
3. `sync.Cond.Wait`
4. `sync.WaitGroup.Wait`(ただし`Add`がバブル内で呼ばれた場合)
5. `time.Sleep`

裏を返すと、**ここに無いものは仮想時計を進めない**。特に引っかかるのが以下。

- **`sync.Mutex`のロック待ちは durably blocked ではない。** そのためバブル内でmutexのデッドロックを作ってもsynctestは検出せず、実時間でハングし続ける(実験では`go test -timeout`に引っかかるまで止まった)。
- **バブルの外で作られたチャネル**を待つのも durably blocked ではない。実時間で待つことになる。
- ネットワークI/Oやシステムコールも同様。実際のI/Oを伴うコードは、バブルに入れる前にインターフェイス越しに差し替えておく必要がある。

## `synctest.Wait`

「自分以外のバブル内の全goroutineがdurably blockedになるまで」待つ。「goroutineを起動した → そいつがチャネル待ちに入るまで待ってから次に進む」という同期を、`time.Sleep(10 * time.Millisecond)`のような当て推量なしに書ける。並行テストの[[flaky-test|flakyさ]]の主因を潰せるのはこちらの機能。

## 何が嬉しいか

- タイムアウトのテストが実時間を消費しない(10分のタイムアウト → 実測35µs)
- 指数バックオフの全試行を一瞬で回せる(17分ぶんのリトライ → 実測88µs)
- テスト内に`time.Sleep`で「たぶんこれくらい待てば終わってるだろう」と書かずに済む
- goroutineリークがデッドロックpanicとして自動的に見つかる

## 出典

- [testing/synctest - Go Packages](https://pkg.go.dev/testing/synctest)
- [Go 1.25 Release Notes](https://go.dev/doc/go1.25)
- [[go-synctest-experiment|手元で動かした記録]]
