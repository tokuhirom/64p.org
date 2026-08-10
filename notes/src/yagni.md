---
created: 2026-08-11 08:04
updated: 2026-08-11 08:04
---
# YAGNI（You Aren't Gonna Need It）

[[extreme-programming|エクストリームプログラミング（XP）]]から生まれた原則。「プログラマは、実際に必要とされるまで機能を追加すべきではない」という考え方。

## 起源

- 最初のXPプロジェクトで生まれた言葉。Kent Beckが、単純な問題に対して大掛かりな解決策を提案する人に対して「You're not gonna need it」と言っていたことに由来する。将来を見越した設計より「今」に注意を向けさせるための言葉だった。
- 2001年、Ron Jeffries・Ann Anderson・Chet Hendricksonの共著 *"Extreme Programming Installed"* にて、XPの正式なプラクティスとして文書化された。
- XP共同創始者のRon Jeffriesは「常に、実際に必要になった時に実装せよ。必要になるだろうと予見しただけの時に実装してはならない」と説明している。
- Kent Beckの著書 *"Extreme Programming Explained"* の第17章でもこの略語が使われ、その根拠が説明されている。

## 原則の位置づけ

- XPの実践「**Do the simplest thing that could possibly work（できるだけシンプルなことをする、DTSTTCPW）**」を支える原則の一つ。
- 継続的リファクタリング・継続的自動単体テスト・継続的インテグレーションなど、他のXPプラクティスと組み合わせて使うことが前提。これらを伴わずにYAGNIだけを適用すると、コードが散らかり、大規模な修正が必要になる「[[technical-debt|技術的負債]]」につながりうる、という注意点も指摘されている。

## 出典

- [You aren't gonna need it - Wikipedia (English)](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it)
- [Ron Jeffries - Wikipedia (English)](https://en.wikipedia.org/wiki/Ron_Jeffries)
- [YAGNI, yes. Skimping, no. Technical Debt? Not even. - ronjeffries.com](https://ronjeffries.com/articles/019-01ff/iter-yagni-skimp/)

#software-engineering #agile
