---
created: 2026-08-09 21:18
updated: 2026-08-09 21:18
---
# Project Amber

OpenJDKの、プロダクティビティ志向の小規模な言語機能を探求・育成するプロジェクト。Compiler Groupがスポンサー。

構文の簡潔化・ボイラープレート削減・可読性向上など軽量な言語機能追加を担当する。JVM/オブジェクトモデルの大規模な拡張を扱う[[project-valhalla|Project Valhalla]]とは役割が異なる。

## 目的

より簡潔な構文、ボイラープレートの削減、可読性・記述性の向上を通じてJavaをより効率的で快適な言語にすること。

## これまでに実現した主な機能

- `var` によるローカル変数の型推論 (Java 10)
- ラムダ式の暗黙的型パラメータでの `var` 使用 (Java 11)
- Java 12〜22にかけて、switch式の拡張、パターンマッチングの改善など多数の機能を継続的に導入

## 出典

- [Project Amber — OpenJDK公式](https://openjdk.org/projects/amber/)
- [Introduction to Project Amber | Baeldung](https://www.baeldung.com/java-project-amber)
- [Exploring Project Amber's Key Enhancements: From Java 12 to Java 22 | Medium](https://neha-sardana.medium.com/exploring-project-ambers-key-enhancements-from-java-12-to-java-22-0b290def4f9e)
