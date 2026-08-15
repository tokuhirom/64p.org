---
created: 2026-08-16 00:30
updated: 2026-08-16 07:14
---
# FUSE (Filesystem in Userspace)

root権限を持たない一般ユーザーでも独自のファイルシステムを実装・マウントできるようにするLinuxの仕組み。通常Linuxでファイルシステムを実装するにはカーネル空間に組み込む必要があるが、FUSEを使うとファイルシステムのロジックをユーザー空間のプログラムとして書ける。

## 構成要素

3つのコンポーネントからなる。

- **`fuse.ko`** — カーネルモジュール。VFS(仮想ファイルシステム)層とユーザー空間デーモンの間の通信を仲介する。
- **`libfuse`** — ユーザー空間でファイルシステムデーモンを実装するためのライブラリ。`getattr`（属性取得）・`readdir`（ディレクトリ一覧）・`open`・`read`のようなコールバック関数を実装する形でファイルシステムを作る。[[libfuse-api-levels|高レベルAPIと低レベルAPI]]の2段階が用意されている。
- **`fusermount`** — 非特権ユーザーが安全にマウントできるようにするマウントユーティリティ。

## root権限なしでマウントできる仕組み

`fusermount`（新しい実装では`fusermount3`）はsetuid-rootバイナリになっており、これが代理で`mount()`システムコールを実行する。そのためユーザー自身がroot権限を持つ必要はない。

- デフォルトでは、非rootユーザーがマウントしたFUSEファイルシステムはマウントした本人しかアクセスできない（rootでも中身が見えない）。
- 他ユーザー（rootを含む）にもアクセスさせたい場合は`allow_other`マウントオプションを使うが、これを非rootユーザーが指定できるようにするには`/etc/fuse.conf`に`user_allow_other`を書いておく必要がある。この制限は`fusermount3`ヘルパー側で強制されているものなので、root権限で動くファイルシステム実装であれば回避できる。
- user namespace内でマウントすれば、setuidバイナリやroot権限を一切使わずに済ませることも可能。

## 動作の流れ

```
VFS layer
    ↓
FUSEカーネルモジュール (fuse.ko)
    ↓
/dev/fuse (キャラクタデバイス、通信パイプ)
    ↓
ユーザー空間プログラム (libfuseで実装)
```

`/dev/fuse`という仮想デバイスがカーネルとユーザー空間の通信パイプとして機能する。Linuxカーネルの公式ドキュメントでは`rm`（ファイル削除）を例に流れが説明されている。

1. アプリケーションが`sys_unlink()`を呼ぶ
2. カーネルがリクエストを「pending」キューに積む
3. ユーザー空間デーモンが`fuse_dev_read()`経由でリクエストを取得
4. デーモンが実際の処理（この場合は削除）を実行
5. デーモンが`sys_write()`で結果を書き戻し、カーネルが呼び出し元に結果を返す

つまりシステムコール1回につき、カーネル⇔ユーザー空間の往復（コンテキストスイッチ）が発生するため、カーネル内蔵のファイルシステムに比べてオーバーヘッドがある。

## デッドロック対策

FUSEはページフォールトなど特有のデッドロックシナリオに対応するため、ファイルシステムの中断（abort）機能やページフォルト時のアトミックなコピー処理を備えている。

## 代表的な用途

- **sshfs** — SFTPプロトコル経由でリモートファイルシステムをマウント
- **[[s3fs-fuse]]** — S3バケットをFUSE経由でマウントするサードパーティのOSSツール（AWS公式の[[aws-s3-files|S3 Files]]とは別物）
- **NTFS-3G** — NTFSファイルシステムへのアクセス
- **gocryptfs** — 暗号化ファイルシステム
- **rclone mount** — クラウドストレージをFUSE経由でマウント

macOSにも同等の仕組み（macFUSE）が存在する。

## 出典

- [FUSE — The Linux Kernel documentation](https://www.kernel.org/doc/html/next/filesystems/fuse.html)
- [FUSE: Building Filesystems in Userspace | InfluentCoder](https://influentcoder.com/posts/fuse/)
- [Filesystem in Userspace - Gentoo wiki](https://wiki.gentoo.org/wiki/Filesystem_in_Userspace/ja)
- [Using FUSE without root on Linux - Zameer Manji](https://zameermanji.com/blog/2022/8/5/using-fuse-without-root-on-linux/)
- [mount.fuse3(8) - Linux manual page](https://man7.org/linux/man-pages/man8/mount.fuse3.8.html)

#linux #ファイルシステム
