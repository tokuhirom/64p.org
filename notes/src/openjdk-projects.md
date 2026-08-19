---
created: 2026-08-09 21:23
updated: 2026-08-19 22:56
---
# OpenJDKの主要プロジェクト

OpenJDKでは、JDK本体の開発とは別に、特定のテーマを掘り下げる「プロジェクト」がいくつも並行して進んでいる。それぞれ担当領域が異なり、実装された機能はJEPとしてJDKにマージされていく。

## 一覧

- [[project-amber|Project Amber]] — プロダクティビティ志向の言語機能(`var`、switch式、パターンマッチングなど)
- [[project-valhalla|Project Valhalla]] — オブジェクトモデルの拡張(値型によるプリミティブ並みの性能)
- [[project-loom|Project Loom]] — 軽量並行処理(仮想スレッド、構造化並行性)
- [[project-panama|Project Panama]] — 外部関数・外部データ連携(Foreign Function & Memory API、jextract)
- [[project-leyden|Project Leyden]] — 起動時間・ウォームアップ時間の改善(AOTキャッシュ)
- [[project-babylon|Project Babylon]] — 外部プログラミングモデル(SQL、GPU等)へのJavaの拡張(コードリフレクション)

## 関連ハブノート

各プロジェクトのJEPが実際にどのバージョンでリリースされたかは、時系列で追う[[java-version-updates|Javaバージョンごとのアップデート]]も参照。

## 出典

- [Java Innovation Projects - Dev.java](https://dev.java/future/innovation/)
