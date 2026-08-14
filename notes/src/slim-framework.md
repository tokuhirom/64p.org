---
created: 2026-08-15 06:47
updated: 2026-08-15 06:47
---
# Slim Framework

PHPのマイクロフレームワーク。ルーティングとミドルウェアを中心とした最小構成で、シンプルなWebアプリケーションやAPIを素早く書くことを目的とする。[[laravel|Laravel]]や[[codeigniter|CodeIgniter]]のようなフルスタックフレームワークとは異なり、必要な機能をComposerパッケージとして個別に組み合わせて使うスタイル。

## バージョン状況(2026年8月時点)

- 最新はSlim 4.15.2(2026年5月22日リリース)。PHP 7.4〜8.5系をサポート。
- 旧メジャーのSlim 3系も並行してメンテナンスされている。Slim 3.13.0(2026年4月28日リリース)でPHP 8.1〜8.5サポートが追加された。
- GitHubリポジトリのコミット活動は2026年8月9日更新で、直近まで継続的にメンテナンスされている。

## セキュリティ

2026年5月、Slim 4.4.0〜4.15.1に反射型XSS脆弱性(CVE-2026-48157, CVSS 6.1 Medium)が発見された。`HttpException::setTitle()`/`setDescription()`に信頼できないデータを渡すアプリでのみ悪用可能で、`displayErrorDetails = false`でも影響する。組み込み例外(HttpNotFoundExceptionなど)はプレーンテキストのデフォルトを使うため、素のSlimアプリは影響を受けない。Slim 4.15.2で修正済み。

## 開発体制

メンテナ陣はTideliftと連携し、OSS依存関係の商用サポート・メンテナンス提供にも取り組んでいる。

## 出典

- [Slim Framework 公式サイト](https://www.slimframework.com/)
- [Slim 4.15.2 released](https://www.slimframework.com/2026/05/22/slim-4.15.2-release.html)
- [Security Advisory: Reflected XSS vulnerability in Slim (CVE-2026-48157)](https://www.slimframework.com/2026/05/22/slim-security-advisory.html)
- [slim/slim - Packagist.org](https://packagist.org/packages/slim/slim)
- [GitHub - slimphp/Slim](https://github.com/slimphp/Slim)

#php #web-framework
