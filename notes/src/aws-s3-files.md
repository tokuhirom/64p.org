---
created: 2026-08-16 00:23
updated: 2026-08-16 00:23
---
# S3 Files (AWS)

AWSが2026年4月7日に一般提供(GA)を開始した新サービス。Amazon S3バケットを共有ファイルシステムとして直接扱えるようにする。AWS公式ブログでは「S3 Files は、あらゆる AWS コンピューティングリソースと Amazon S3 をつなぐ新しいファイルシステム」と説明されている。

## 何を解決するのか

従来のS3はオブジェクトストレージであり、`open`/`read`/`write`のようなOSのファイル操作を直接使えず、ファイル単位の部分編集もできない。ファイルシステムのインターフェースが必要なアプリケーションは別途EFS（Elastic File System）やFSxを使う必要があったが、S3 Filesはこのトレードオフを解消し、S3の耐久性・コスト効率を保ったままファイルシステムとしての操作性を提供する。

## 仕組み・主な特徴

- **基盤**: Amazon EFSを土台に構築されており、アクティブなデータセットを高性能ストレージへ自動的にロードすることで約1ミリ秒のレイテンシーを実現する。データはS3の外に出ない。
- **プロトコル**: NFS v4.1以降のすべての操作（作成・読み取り・更新・削除）に対応。POSIX権限やユーザーID/グループIDも扱える。
- **共有アクセス**: 複数のコンピュートリソースから同時アクセスでき、close-to-open整合性モデルで整合性を担保する。
- **コスト最適化**: バイト範囲読み取りやきめ細かいキャッシュ制御に対応。

## ユースケース

本番アプリケーションの実行、MLモデルのトレーニング、エージェント型AIシステムの構築、ファイルベースのツール連携などが挙げられている。

## 既存サービスとの違い

### S3 File Gatewayとは別物

似た名前の「S3ファイルゲートウェイ（S3 File Gateway）」は全くの別サービスで、AWS Storage Gatewayファミリーの一部として以前から存在する。オンプレミス〜クラウド接続用の仮想ソフトウェアアプライアンス（VMware ESXi/Hyper-V/Linux KVM上、またはハードウェアアプライアンスとしてデプロイ）で、NFS v3/4.1およびSMB v2/3に対応する。IAM・AWS KMS・CloudWatch・CloudTrailと統合されている。

オンプレミス環境からS3への「ゲートウェイ」という位置づけであり、今回のS3 Files（EFS基盤の共有ファイルシステム）とは目的も仕組みも異なる。

| | S3 Files（新, 2026年4月GA） | S3 File Gateway（既存） |
|---|---|---|
| 位置づけ | AWSコンピュートとS3をつなぐネイティブなファイルシステム | オンプレミス〜S3間のゲートウェイアプライアンス |
| 基盤 | EFS | 仮想アプライアンス（VM/HW） |
| 主用途 | AWS内でのML/エージェント/本番アプリのファイルアクセス | オンプレミス環境からのS3活用 |

### FSx・EFSとの違い

FSxはオンプレミスからの移行時の機能互換性に優れ、FSx for Lustreはハイパフォーマンスコンピューティング（HPC）向けとされる。特定のファイルシステム機能が必要な場合はFSxが適切な選択肢となる。

EFSは独立したファイルシステムサービスであるのに対し、S3 Filesは「S3バケットの永続的なストレージ層との自動同期」を提供する点が異なる。

## 出典

- [Amazon Web Services ブログ: Launching S3 Files](https://aws.amazon.com/jp/blogs/news/launching-s3-files-making-s3-buckets-accessible-as-file-systems)
- [Amazon S3 File Gateway とは - AWS Storage Gateway](https://docs.aws.amazon.com/ja_jp/filegateway/latest/files3/what-is-file-s3.html)

#aws #s3 #ファイルシステム
