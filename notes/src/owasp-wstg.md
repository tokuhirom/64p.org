---
created: 2026-08-14 15:54
updated: 2026-08-14 15:54
---
# WSTG（Web Security Testing Guide）

[[owasp|OWASP]]が公開する、Webアプリケーション・Webサービスのセキュリティテスト手法を体系化したガイド。[[owasp-top-10|OWASP Top 10]]が「どんなリスクが重大か」のランキングであるのに対し、WSTGは「実際にどうテストするか」という手順・観点を網羅する、[[penetration-test|ペネトレーションテスト]]実務向けの参照ドキュメント。

## 構成

100以上の個別テスト項目を12のカテゴリに分類している。

- Information Gathering — 対象アプリの技術的詳細の収集
- Configuration and Management Testing — サーバー・システムの設定不備の確認
- Identity Management Testing — ユーザーID管理の検証
- Authentication Testing — ログイン機構の安全性確認
- Authorization Testing — 権限のあるリソース・機能にのみアクセスできるかの確認
- 以下、Session Management・Input Validation・Error Handling・Cryptography・Business Logic・Client-side・APIのテストと続く

各テスト項目には`WSTG-<4文字のカテゴリ略号>-<連番>`という安定したID（例: `WSTG-INPV-05`＝SQLインジェクション、`WSTG-ATHN-03`＝弱いロックアウト）が振られており、マイナーリビジョンをまたいでも変わらない。バージョンを明示する場合は`WSTG-v42-INFO-02`のように書く。

テストは大きく「パッシブテスト（挙動を変えずに情報収集）」と「アクティブテスト（実際に入力を送り込んで検証）」の2フェーズに分かれる。

## バージョン履歴

v1.0(2004)→v2.0(2007)→v3.0(2008)→v4.0(2014、書籍版も刊行)→v4.1(2020-04)→v4.2(2020-12、現行安定版)。v5.0は2026年8月時点で開発中。

## 関連

- [[owasp|OWASP]] — 発行元のハブノート
- [[owasp-top-10|OWASP Top 10]] — 「何が重大リスクか」のランキング。WSTGは「それをどうテストするか」の手順書という位置づけの違い
- [[penetration-test|ペネトレーションテスト]] — WSTGを実務で使う場面

## 出典

- [OWASP Web Security Testing Guide | OWASP Foundation](https://owasp.org/www-project-web-security-testing-guide/)
- [GitHub - OWASP/wstg](https://github.com/owasp/wstg)

#security
