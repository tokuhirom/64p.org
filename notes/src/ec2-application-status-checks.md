---
created: 2026-08-11 11:23
updated: 2026-08-11 11:23
---
# Amazon EC2 Application Status Checks

2026年8月10日にAWSが発表した、EC2インスタンス上で動作するアプリケーション自体の状態を監視する新機能。

## 従来のステータスチェックとの違い

従来のEC2ステータスチェック（システムステータスチェック・インスタンスステータスチェック）は、インスタンスやその基盤システムの到達可能性を監視するものだった。これに対しApplication Status Checksは、Webサーバーがリクエストを受け付けない・Dockerデーモンが停止している・ネットワーク設定を誤っている、といった**アプリケーション層の問題**を検出する。

## 仕組み

利用者が以下を指定して監視チェックを作成する。

- プロトコル（HTTP/HTTPS）
- ポート番号
- 監視対象パス
- 正常（ヘルシー）と判定する応答コード

設定後、EC2は60秒ごとにそのポート・パスへリクエストを送信し、アプリケーションの状態をレポートする。

## リージョン・連携

- 全商用AWSリージョンおよびAWS GovCloud（US）リージョンで利用可能。
- Auto Scalingグループと連携させることで、アプリケーションが異常（アンヘルシー）を報告した際に、インスタンスを自動的に置き換えて復旧を開始できる。

## 出典

- [Amazon EC2 Application Status Checks - AWS What's New](https://aws.amazon.com/jp/about-aws/whats-new/2026/08/amazon-ec2-application-status-checks/)

#aws #cloud
