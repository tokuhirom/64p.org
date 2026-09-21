---
created: 2026-09-21 23:33
updated: 2026-09-21 23:33
---
# OnceLock (Rust)

`std::sync::OnceLock<T>` は「一度だけ書き込める、スレッドセーフなセル」。Rust 1.70.0 で安定化された。`static` に置けるので、グローバルな遅延初期化を外部クレートなしで書くための標準的な手段になっている。 #rust #並行処理

中身は最初は空で、どのスレッドからでも一度だけ値をセットできる。セットされて以降は不変の `&T` として読めるだけになる。シングルスレッド専用版は `std::cell::OnceCell`。

## 典型的な使い方

```rust
use std::sync::OnceLock;

static CONFIG: OnceLock<Config> = OnceLock::new();

fn config() -> &'static Config {
    CONFIG.get_or_init(|| Config::load_from_env())
}
```

`OnceLock::new()` が const fn なので `static` の初期化子に書ける。`get_or_init` は複数スレッドが同時に呼んでもクロージャの実行は1回だけで、他のスレッドは初期化完了までブロックしてから同じ参照を受け取る。

公式ドキュメントの例:

```rust
use std::sync::OnceLock;

static CELL: OnceLock<usize> = OnceLock::new();
assert!(CELL.get().is_none());

std::thread::spawn(|| {
    let value = CELL.get_or_init(|| 12345);
    assert_eq!(value, &12345);
})
.join()
.unwrap();

assert_eq!(CELL.get(), Some(&12345));
```

## 主なメソッド

| メソッド | 挙動 |
|---|---|
| `get()` | `Option<&T>`。ブロックしない |
| `set(v)` | `Result<(), T>`。すでに入っていたら渡した値が `Err` で返ってくる |
| `get_or_init(f)` | 未初期化なら `f()` で初期化して `&T` を返す |
| `get_mut()` | `&mut self` 経由で `Option<&mut T>` |
| `take()` | `&mut self` 経由で中身を抜いて未初期化に戻す |
| `wait()` | 初期化されるまでブロックして `&T`（1.86.0で安定化）。クロージャを取らず観測するだけ |
| `into_inner()` | 消費して `Option<T>` |

`&mut self` を要求する `get_mut`/`take` は、排他参照が取れている＝他スレッドと共有されていないことがコンパイル時に保証されるので、同期なしで中身をいじれるという理屈。

## poisoning がない

`Mutex` と違い `OnceLock` は poisoning しない。`get_or_init` に渡したクロージャがパニックしても、セルは未初期化のまま残り、次に呼んだスレッドがもう一度初期化を試みる。

対して後述の `LazyLock` は初期化クロージャがパニックすると**恒久的に poisoned** になり、以降のアクセスはすべてパニックする。初期化が失敗しうる場合の挙動がまったく違うので注意。

## LazyLock・Once との使い分け

Rust 1.80.0 では `std::sync::LazyLock` も入った。

```rust
use std::sync::LazyLock;

static CONFIG: LazyLock<Config> = LazyLock::new(|| Config::load_from_env());
// *CONFIG でアクセスすれば初回に自動で初期化される
```

- **初期化ロジックが宣言時に確定している**なら `LazyLock`。格納場所と初期化処理を1箇所にまとめられ、`Deref` 経由の初回アクセスで自動的に走る。公式ドキュメントも「多くのケースで static には `LazyLock` のほうが簡潔」としている。
- **初期化に実行時の値が必要**（CLIオプションで組み立てた設定、あとから渡されるDBハンドルなど）な場合は `LazyLock::new(|| ...)` のクロージャに外から引数を渡せないので `OnceLock` + `get_or_init` / `set` を使う。初期化のタイミングを明示的に制御したい場合も同様。
- `std::sync::Once` は「値を持たない、処理を1回だけ実行する」ことだけを保証するプリミティブ。値を保持したいなら `OnceLock` を使う。

`OnceLock`/`LazyLock` はもともと外部クレート `once_cell`（および `lazy_static!` マクロ）が担っていた役割を標準ライブラリに取り込んだもので、[RFC 2788 "standard lazy types"](https://rust-lang.github.io/rfcs/2788-standard-lazy-types.html) がその提案にあたる。新しく書くコードで `lazy_static` を持ち込む理由はほぼなくなった。

## 出典

- [OnceLock in std::sync - Rust](https://doc.rust-lang.org/std/sync/struct.OnceLock.html)
- [LazyLock in std::sync - Rust](https://doc.rust-lang.org/stable/std/sync/struct.LazyLock.html)
- [RFC 2788: standard lazy types - The Rust RFC Book](https://rust-lang.github.io/rfcs/2788-standard-lazy-types.html)
