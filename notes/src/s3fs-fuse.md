---
created: 2026-08-16 00:32
updated: 2026-08-16 07:10
---
# s3fs-fuse

Amazon S3バケットを[[fuse-filesystem-in-userspace|FUSE]]経由でマウントできるようにするサードパーティのOSSツール（C++実装）。LinuxとmacOSに対応する。AWS公式の[[aws-s3-files|S3 Files]]（EFS基盤・NFSプロトコル）とは異なり、s3fs-fuseはユーザー空間デーモンとしてS3 APIをファイル操作にマッピングする方式。

## 基本的な仕組み

s3fs-fuseはファイルをS3上にネイティブなオブジェクト形式のまま保存する。これにより[[s3cmd]]のような他のS3ツールと併用しても同じファイルにアクセスできる。ファイルを読み書きする際は、まずファイル全体をローカルのキャッシュフォルダにダウンロードしてから操作し、FUSEの`release()`が呼ばれたタイミングで変更があればS3に再アップロードする。

## キャッシュ

2種類のキャッシュを持つ。

- **メモリ内メタデータキャッシング** — メタデータを一時的にメモリに保持
- **ローカルディスクデータキャッシング** — データをディスク上にキャッシュ

## 対応機能

- ファイルの読み書き、ディレクトリ、シンボリックリンク操作
- ランダム書き込み・追記（マルチパートアップロードコピーで最適化）
- マルチパートアップロードAPIを使うことで最大5TBのファイルに対応
- サーバーサイド暗号化
- MD5ハッシュによるデータ整合性確認
- AWS署名v2・v4認証

## マウント例

```sh
s3fs mybucket /path/to/mountpoint -o passwd_file=${HOME}/.passwd-s3fs
```

AWS以外のS3互換ストレージの場合:

```sh
s3fs mybucket /path/to/mountpoint -o url=https://url.to.s3/ -o use_path_request_style
```

## 制限事項

ランダム書き込みや追記はオブジェクト全体の書き直しが必要になる（マルチパートアップロードコピーである程度最適化されるものの）。ディレクトリ一覧のようなメタデータ操作はネットワークレイテンシの影響で性能が悪化しやすい。複数クライアント間での同時書き込みの調整（ロック）には対応せず、ハードリンクもサポートしない。

## 出典

- [s3fs-fuse/s3fs-fuse — GitHub](https://github.com/s3fs-fuse/s3fs-fuse)
- [s3fs-fuse README.md](https://github.com/s3fs-fuse/s3fs-fuse/blob/master/README.md)

#fuse #s3 #ファイルシステム
