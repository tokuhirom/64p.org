---
created: 2026-08-15 06:45
updated: 2026-08-15 06:45
---
# Laravel

PHPのWebアプリケーションフレームワーク。エンタープライズ・大規模アプリ向けの選択肢として支持を広げており、[[codeigniter|CodeIgniter]]とは用途による住み分けの関係にある。

## バージョン状況(2026年8月時点)

- 最新メジャーはLaravel 13。2026年3月17日リリース。PHP 8.3を要求する。既存コードベースからのアップグレード自体は10分程度で完了するとされる。
- 2026年8月時点の最新パッチはLaravel 12.46.0系(12.45.1/12.45.2/12.46.0)。

## Laravel 13の主な新機能

- **AI SDK**: プロバイダに依存しない単一インターフェースで、テキスト生成・ツール呼び出しエージェント・画像生成・音声合成・embedding生成を扱えるファーストパーティパッケージ。Laravel 13と同日にベータからプロダクション安定版へ移行。
- **PHP Attributes対応**: `$table`・`$fillable`・`$hidden`・`$primaryKey`など、モデルのプロパティとして散らばっていた定義を、フレームワーク内15箇所以上でPHP属性(Attribute)構文としてコンパクトに宣言できるようになった。
- **マルチテナンシー**: 新しいスターターキットにチームベースのマルチテナンシーが復活。Jetstreamの旧Teams機能を改良し、別ブラウザタブで別チームコンテキストをURLルーティング経由で操作できる。
- **JSON:API仕様対応**: レスポンスオブジェクトのシリアライズ、リレーション同梱、sparse fieldsets、links、準拠したレスポンスヘッダーを自動処理するリソースクラスをファーストパーティで提供。
- 破壊的変更はゼロと謳われている。

## 出典

- [Laravel 12.45.1, 12.45.2, and 12.46.0 Released - Laravel News](https://laravel-news.com/laravel-12-46-0)
- [Laravel 13 Release 2026: New Features & Complete Upgrade Guide](https://impacttechlab.com/laravel-13-release/)
- [Laravel 13: Launch Date and New Features (News from Laracon EU)](https://laraveldaily.com/post/laravel-13-laracon-eu-taylor-otwell)

#php #web-framework
