---
created: 2026-08-18 11:25
updated: 2026-08-18 11:25
---
# rclone

「rsync for cloud storage」を謳う、クラウドストレージ操作用のコマンドラインツール（[rclone/rclone](https://github.com/rclone/rclone)）。Go製、OSS。Amazon S3・Google Drive・Dropbox・Azure Blob・Backblaze B2・OneDrive・WebDAV・SFTPなど70以上のバックエンドに対応しており、単一のツールで多様なクラウドストレージを横断的に扱える点が特徴。

## 主な機能

Unix系コマンドに相当する機能をクラウドストレージ向けに提供する。

- **sync / copy / move** — ディレクトリ単位での一方向同期・コピー・移動
- **bisync** — 双方向同期（2つのクラウド/ローカルディレクトリを相互に同期し続ける）
- **mount** — [[fuse-filesystem-in-userspace|FUSE]]経由でクラウドストレージをローカルドライブとしてマウント
- **check / ls / ncdu / tree / cat / rm** — 対応するUnixコマンド相当の操作
- クラウド間の直接コピー（例: DropboxからGoogle Driveへ、S3からAzure Blobへ）にも対応し、ローカルへの一旦のダウンロードを介さない
- 転送時にMD5/SHA1などのハッシュを検証し、タイムスタンプも保持する
- マルチスレッドでの並列転送に対応

## crypt: クライアントサイド暗号化

`crypt`バックエンドを使うと、クラウドにアップロードする前にファイル内容とファイル名をクライアント側で暗号化できる。クラウド事業者側には暗号化済みのデータしか渡らない。

- ファイル内容は**NaCl SecretBox**（XSalsa20暗号 + Poly1305による認証）で64KiB単位のチャンクごとに暗号化される
- 暗号化キーはパスワードから**scrypt**で導出する
- ファイル名・ディレクトリ名もデフォルトで暗号化されるが、オプションで無効化できる

## 他のS3系CLIツールとの違い

[[s3cmd]]・[[s5cmd]]・[[s3fs-fuse]]はいずれもAmazon S3（および互換ストレージ）専用のツールだが、rcloneは特定のクラウドに限定せず70以上の異なるバックエンドを単一のインターフェースで扱える点が異なる。マウント機能（`rclone mount`）は[[s3fs-fuse]]と同様に[[fuse-filesystem-in-userspace|FUSE]]を利用するが、s3fs-fuseがS3専用でファイルをネイティブなオブジェクト形式のまま保存するのに対し、rcloneのmountは対応する全バックエンドで使える汎用実装になっている。

## 出典

- [Rclone公式サイト](https://rclone.org/)
- [Overview of cloud storage systems - rclone](https://rclone.org/overview/)
- [GitHub - rclone/rclone](https://github.com/rclone/rclone)
- [Crypt - rclone](https://rclone.org/crypt/)

#cli #cloud #storage
