---
created: 2026-08-15 16:18
updated: 2026-08-15 16:18
---
# oasdiff

2つの[[openapi|OpenAPI]]仕様間の差分・破壊的変更検出を行うOSSツールチェーン。509種類の変更を検出可能で、breaking/non-breaking双方を区別できる。OpenAPI 3.0/3.1/3.2すべてに対応。

CLI・GitHub Action・オンラインの無料サイドバイサイド比較サービスなど複数の利用形態がある。GitHub Action(`oasdiff/oasdiff-action`)はPRのFiles changedタブにインラインで破壊的変更を注釈し、fail-on閾値以上ならワークフローを失敗させられる。

## 使いどころ

API定義の変更がクライアントを壊さないかをCI上で機械的にチェックする用途。[[openapi-tooling|OpenAPI関連ツールエコシステム]]の中では、Spectralが「定義の書き方の品質」を見るのに対し、oasdiffは「2バージョン間の互換性」を見る点で役割が異なる。

#openapi #api #ci-cd

## 出典

- [oasdiff公式](https://www.oasdiff.com/)
- [Using oasdiff to Detect Breaking Changes in APIs - Nordic APIs](https://nordicapis.com/using-oasdiff-to-detect-breaking-changes-in-apis/)
- [GitHub: oasdiff/oasdiff-action](https://github.com/oasdiff/oasdiff-action)
