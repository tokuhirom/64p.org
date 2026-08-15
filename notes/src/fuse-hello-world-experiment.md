---
created: 2026-08-16 07:22
updated: 2026-08-16 07:48
---
# fuse-hello-world実験

[[fuse-filesystem-in-userspace|FUSE]]が「非rootユーザーでもファイルシステムをマウントできる」「システムコール1回ごとにカーネル⇔ユーザー空間を往復する」という仕組みを手を動かして体感するための実験記録。`libfuse`自体には依存せず、`/dev/fuse`を直接叩く純Rust実装の[[fuser-rust-crate|fuser]]クレート（[[libfuse-api-levels|低レベルAPI]]相当）で、`hello.txt`という1ファイルだけを返す最小のファイルシステムを実装した。 #linux #rust #ファイルシステム

## 使ったもの

- [[fuser-rust-crate|fuser]] 0.18.0 — FUSEの低レベルAPIをRustで実装したクレート。`libfuse3-dev`のヘッダ類は一切インストールせずに使えた。
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

## 内部動作を[[strace]]で確認

`fuser`クレートのソース(`src/mnt/fuse_pure.rs`)を読むと、マウント時は以下の順で処理していることが分かる。

1. `/dev/fuse`を`open`してfdを取得
2. 自プロセスのまま`mount("hello", mnt, "fuse", ...)`を直接呼んでみる(非特権なので通常は失敗する想定)
3. `EPERM`が返ったら、`socketpair(AF_UNIX)`を作り、setuid-rootの`fusermount3`を`fork`・`exec`する。子プロセスとの通信用fdは環境変数`_FUSE_COMMFD`で渡す
4. `fusermount3`が(実効uid=0で)実際に`mount(2)`を呼んで成功させ、マウントに使った`/dev/fuse`のfdを`SCM_RIGHTS`でUNIXソケット越しに親プロセスへ送り返す
5. 親プロセスが`recvmsg()`でそのfdを受け取り、以後はそのfdでFUSEカーネルモジュールと直接通信する

[[strace]] `-f -e trace=mount,execve,socketpair,recvmsg ./target/debug/fuse-hello mnt`で実際にこの通りの流れが見えた。

```
openat(AT_FDCWD, "/dev/fuse", O_RDWR|O_CLOEXEC) = 3
mount("hello", ".../mnt", "fuse", MS_RDONLY|MS_NOSUID|MS_NODEV, "fd=3,rootmode=40775,user_id=1000"...) = -1 EPERM
socketpair(AF_UNIX, SOCK_STREAM|SOCK_CLOEXEC, 0, [3, 4]) = 0
execve("/usr/bin/fusermount3", ["fusermount3", "-o", "ro,fsname=hello", "--", ".../mnt"], ...) = 0
recvmsg(4, ...) = 0   # fusermount3から送られてきたfdを受信
```

ただしこの回のトレースでは`fusermount3`側の`mount(2)`自体も`EPERM`になり、`fuse-hello`がpanicして失敗した。`strace -f`で`fusermount3`のexecve後もトレースを継続していたため、[[ptrace-defeats-setuid|ptraceされているとsetuidによる昇格が無効化される]]という制約が働き、setuid-rootのはずの`fusermount3`が非特権のままmountを試みて失敗したと考えられる。同じコマンドをstraceなしで実行した1回目の実験(本ノート冒頭)では問題なく成功していることから、原因はstraceによるトレースそのものだと分かる。

## `mnt`ディレクトリの挙動(マウント失敗時)

上記の`mount(2)`失敗パターンの場合、実際には一度も本物のFUSEマウントが成立していないため、`mnt`はただの空ディレクトリのままだった。

- `ls mnt` — 空(`hello.txt`は存在しない。マウントされていないのでファイルシステムの中身が差し替わっていない)
- `cat mnt/hello.txt` — `No such file or directory`(ローカルの空ディレクトリの中を見ているだけなので当然存在しない)
- `fusermount3 -u mnt` — `entry for .../mnt not found in /etc/mtab`というメッセージを出すだけで、エラー終了はしない。`/etc/mtab`(実体は`/proc/self/mounts`)にそもそもエントリが無い＝マウントされていないことを正しく検出し、何もせず終わる

つまりマウントに失敗しても`mnt`ディレクトリ自体が壊れたり「取り憑かれた」ような状態(stale mount)にはならず、後片付けなしでそのまま次の試行に使えた。stale mountになるのはあくまで「一度正常にマウントされたファイルシステムのデーモンプロセスだけが異常終了した」場合であり、マウント確立前の失敗ではそのリスクがないことが確認できた。

## コードから分かること

書き込み(`echo test > mnt/hello.txt`)を`read-only file system`エラーで弾けたのは、`write`コールバックを実装せず`MountOption::RO`を渡しただけで済んだため。FUSEでは実装していない操作はカーネル側/ライブラリ側がデフォルトで`ENOSYS`相当を返す設計になっており、最小限のコールバックだけ実装すれば安全に「読み取り専用ファイルシステム」を作れることが分かる。

## ソース

このリポジトリの[`notes/code/fuse-hello/`](https://github.com/tokuhirom/64p.org/tree/master/notes/code/fuse-hello)に、上記のソース一式を置いてある(`cargo build`するだけでビルドできる)。

## 出典

- [GitHub - cberner/fuser](https://github.com/cberner/fuser)
- [fuser 0.18.0 examples/hello.rs](https://github.com/cberner/fuser/blob/master/examples/hello.rs)
- `man strace`（BUGSセクション）
