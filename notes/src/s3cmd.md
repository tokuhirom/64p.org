---
created: 2026-08-16 07:10
updated: 2026-08-16 07:10
---
# s3cmd

Amazon S3および互換ストレージ（Google Cloud Storage、DreamHost DreamObjectsなど）をコマンドラインから操作するためのツール。2008年公開の老舗で、Python製。AWS公式SDKは使わず、独自にS3向けのリクエストを組み立てて送信する実装になっている。

## 特徴

60以上のコマンドラインオプションを持つ多機能なツールで、以下のような操作に対応する。

- バケットの作成・削除
- オブジェクトのアップロード・ダウンロード・削除
- マルチパートアップロード
- サーバーサイド暗号化
- 増分バックアップ
- `sync`によるディレクトリ同期
- ACL・メタデータ管理
- バケットサイズ取得、バケットポリシー設定

cronから起動する自動バックアップスクリプトなど、バッチ用途を主眼に設計されている。

## 弱点

シングルスレッド寄りの実装で、独自のRPCハンドリングであるがゆえにS3 API仕様の追随にも手間がかかる。結果として、後発の並列転送特化ツール[[s5cmd]]と比べると転送速度が大きく劣る（ベンチマークではアップロードで32倍、ダウンロードのスループットで数十倍の差が報告されている）。

## [[s3fs-fuse]]との関係

[[s3fs-fuse]]はS3をFUSE経由でファイルシステムとしてマウントするツールだが、ファイルをS3上にネイティブなオブジェクト形式のまま保存するため、s3cmdのような通常のS3ツールと併用しても同じファイルにアクセスできる。

## 出典

- [GitHub - s3tools/s3cmd](https://github.com/s3tools/s3cmd)
- [Amazon S3 Tools: S3cmd Usage](https://s3tools.org/usage)
- [S5cmd for High Performance Object Storage | by Joshua Robinson | Medium](https://joshua-robinson.medium.com/s5cmd-for-high-performance-object-storage-7071352cc09d)

#s3 #cli #aws
