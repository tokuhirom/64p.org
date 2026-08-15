---
created: 2026-08-16 07:22
updated: 2026-08-16 07:22
---
# fuse-hello-world実験

[[fuse-filesystem-in-userspace|FUSE]]が「非rootユーザーでもファイルシステムをマウントできる」「システムコール1回ごとにカーネル⇔ユーザー空間を往復する」という仕組みを手を動かして体感するための実験記録。`libfuse`自体には依存せず、`/dev/fuse`を直接叩く純Rust実装の[fuser](https://github.com/cberner/fuser)クレート（[[libfuse-api-levels|低レベルAPI]]相当）で、`hello.txt`という1ファイルだけを返す最小のファイルシステムを実装した。 #linux #rust #ファイルシステム

## 使ったもの

- [fuser](https://crates.io/crates/fuser) 0.18.0 — FUSEの低レベルAPIをRustで実装したクレート。`libfuse3-dev`のヘッダ類は一切インストールせずに使えた。
- 公式リポジトリの`examples/hello.rs`をベースに、マルチスレッド統計などの余分な機能を削った最小版を書いた。

## 実装

`Filesystem`トレイトの`lookup`/`getattr`/`read`/`readdir`の4つだけを実装する。ルート(inode 1)配下に`hello.txt`(inode 2)が1つあるだけの固定内容のファイルシステム。

```rust
impl Filesystem for HelloFS {
    fn lookup(&self, _req: &Request, parent: INodeNo, name: &OsStr, reply: ReplyEntry) {
        if u64::from(parent) == 1 && name.to_str() == Some("hello.txt") {
            reply.entry(&TTL, &HELLO_TXT_ATTR, Generation(0));
        } else {
            reply.error(Errno::ENOENT);
        }
    }
    // getattr, read, readdir も同様に ino で分岐するだけ
}

fn main() {
    let mountpoint = env::args().nth(1).expect("usage: fuse-hello <mountpoint>");
    let mut cfg = Config::default();
    cfg.mount_options.extend([MountOption::RO, MountOption::FSName("hello".to_string())]);
    fuser::mount(HelloFS, &mountpoint, &cfg).unwrap();
}
```

## 躓いた点

`fuser` 0.18系は最近のバージョンで型付けが厳格化されており、ネット上に多い旧バージョン(0.1x系)ベースの解説コードそのままでは動かなかった。

1. `mount2()`が廃止され`mount(fs, mountpoint, &Config)`に変わっていた。`Config`は`mount_options: Vec<MountOption>`を持つ構造体で、`Config::default()`に`.extend()`する。
2. inode番号が生の`u64`ではなく`INodeNo`というnewtypeでラップされるようになっていた(`FileHandle`・`LockOwner`・`OpenFlags`・`Errno`も同様)。`u64::from(ino)`で取り出す。
3. `Filesystem`トレイトの各メソッドのレシーバが`&mut self`ではなく`&self`になっていた(内部で`AtomicU64`等を使う前提の設計)。
4. `MountOption::AutoUnmount`を付けると`AllowOther`か`AllowRoot`も同時に必要という制約があり、付けたままだとマウントが失敗した(今回はそのまま外し、`fusermount3 -u`で手動アンマウントする方針にした)。

公式リポジトリに`examples/hello.rs`が残っていたので、これを読んで型を合わせた。

## 実行結果

`sudo`を一切使わず、一般ユーザーのままビルド・マウントできた。

```
$ whoami
tokuhirom
$ ./target/debug/fuse-hello mnt &
$ mount | grep hello
hello on .../mnt type fuse (ro,nosuid,nodev,relatime,user_id=1000,group_id=1000)
$ ls -la mnt
-rw-r--r-- 1 tokuhirom tokuhirom 34 Jan  1 1970 hello.txt
$ cat mnt/hello.txt
Hello, FUSE from a non-root user!
$ echo test > mnt/hello.txt
read-only file system: mnt/hello.txt
$ fusermount3 -u mnt   # これも非rootのまま
```

`stderr`にコールバック呼び出しをログ出力するようにしていたところ、`ls`一発で以下のような順番で呼ばれるのが見えた。

```
lookup(parent=1, name=".Trash")       # デスクトップ環境のゴミ箱自動検出が先に触りにきた
lookup(parent=1, name=".Trash-1000")
getattr(ino=1)
readdir(ino=1, offset=0)
lookup(parent=1, name="hello.txt")
readdir(ino=1, offset=3)
read(ino=2, offset=0)
```

[[fuse-filesystem-in-userspace|FUSEノート]]に書いた「アプリのシステムコール→カーネルのpendingキュー→ユーザー空間デーモンが処理→結果を書き戻す」という往復が、`ls`や`cat`のような日常的なコマンド1つでも複数回のコールバック呼び出しとして実際に発生していることが確認できた。`.Trash`への問い合わせは自分では意図しておらず、GNOME(GVFS)側がマウントされたファイルシステムを自動でゴミ箱対応チェックしにきているものと見られる。

## コードから分かること

書き込み(`echo test > mnt/hello.txt`)を`read-only file system`エラーで弾けたのは、`write`コールバックを実装せず`MountOption::RO`を渡しただけで済んだため。FUSEでは実装していない操作はカーネル側/ライブラリ側がデフォルトで`ENOSYS`相当を返す設計になっており、最小限のコールバックだけ実装すれば安全に「読み取り専用ファイルシステム」を作れることが分かる。

## ソース

このリポジトリの[`notes/code/fuse-hello/`](https://github.com/tokuhirom/64p.org/tree/master/notes/code/fuse-hello)に、上記のソース一式を置いてある(`cargo build`するだけでビルドできる)。

## 出典

- [GitHub - cberner/fuser](https://github.com/cberner/fuser)
- [fuser 0.18.0 examples/hello.rs](https://github.com/cberner/fuser/blob/master/examples/hello.rs)
