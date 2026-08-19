---
created: 2026-08-19 22:56
updated: 2026-08-19 22:56
---
# Javaバージョンごとのアップデート

JDK/Javaは半年ごと(3月・9月)にフィーチャーリリースを重ねている。個々のリリースで何が変わったか(特にデフォルト挙動の変更や主要JEP)を、バージョンごとの原子ノートとして残していくためのハブノート。深掘りは各ノート側で行い、ここでは一覧と位置づけのみ整理する。

## バージョン一覧

- [[java-23]] — sun.misc.Unsafeメモリアクセス非推奨化(JEP 471)。2024年9月リリース。
- [[java-24]] — Unsafeデフォルトが警告に(JEP 498)、Compact Object Headers実験導入(JEP 450)、Windows 32bit x86ポート削除(JEP 479)。2025年3月リリース。
- [[java-25]] — LTS。Compact Object Headers正式機能化(JEP 519)。2025年9月リリース。
- [[java-26]] — G1のスループット改善(JEP 522)、Unsafeデフォルトが例外送出に、InitialRAMPercentage変更など。2026年3月リリース。
- [[java-27]] — G1を全環境のデフォルトGCに(JEP 523)、Compact Object Headersをデフォルト有効化(JEP 534)。2026年9月リリース予定、開発中。

## OpenJDKの「プロジェクト」との関係

上記の各バージョンノートは、そのリリースで実際に何が変わったかを時系列で追う。一方、[[openjdk-projects|OpenJDKの主要プロジェクト]]は特定テーマ([[project-loom|Loom]]・[[project-valhalla|Valhalla]]・[[project-leyden|Leyden]]など)を横断的に追うハブノート。同じJEPが両方から参照されることになるが、視点(時系列 vs テーマ別)が異なるので使い分ける。

#java #openjdk #moc
