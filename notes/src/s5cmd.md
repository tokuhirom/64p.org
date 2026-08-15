---
created: 2026-08-16 07:10
updated: 2026-08-16 07:10
---
# s5cmd

Amazon S3および互換ストレージに対して並列実行に特化したコマンドラインツール（[peak/s5cmd](https://github.com/peak/s5cmd)）。Go製。

## 特徴

- **コマンドファイル**による一括実行が最大の特徴。数千件のS3/ファイルシステム操作コマンドを1つのファイルに記述し、複数の並列ワーカーで実行できる。
- Goのgoroutineによる並行処理と、複数のTCPコネクションを同時に張ることで高スループットな転送を実現する。
- [[s3cmd]]やaws-cliと比べて桁違いに高速。ベンチマークでは、アップロードでs3cmd比32倍・aws-cli比12倍高速、ダウンロードでは40Gbpsリンク（約4.3GB/s）を飽和させられるとされるのに対し、s3cmdは85MB/s程度、aws-cliは375MB/s程度に留まるという結果が報告されている。

## 弱点

高速性と引き換えに機能面は[[s3cmd]]より薄い。バケットの作成・削除、マルチパートアップロードの中断、オブジェクトへのHEADリクエストといった一部の操作は欠けている。

## 使いどころ

大規模なバックアップ・データ移行・大量オブジェクトの一括同期や削除など、転送量が多くスループットがボトルネックになる場面で有効。バケット管理やポリシー設定など多機能なCLI操作が必要な場面は[[s3cmd]]の方が向く。

## 出典

- [GitHub - peak/s5cmd](https://github.com/peak/s5cmd)
- [S5cmd for High Performance Object Storage | by Joshua Robinson | Medium](https://joshua-robinson.medium.com/s5cmd-for-high-performance-object-storage-7071352cc09d)
- [Save Time and Money on S3 Data Transfers: Surpass AWS CLI Performance by Up to 80X](https://www.doit.com/blog/save-time-and-money-on-s3-data-transfers-surpass-aws-cli-performance-by-up-to-80x)

#s3 #cli #aws
