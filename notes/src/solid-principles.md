---
created: 2026-09-01 09:14
updated: 2026-09-01 09:14
---
# SOLID原則

#software-engineering #architecture

オブジェクト指向のクラス設計に関する5つの原則の頭字語。Robert C. Martinが1990年代に *C++ Report* 誌で個別に発表し、2000年の論文「Design Principles and Design Patterns」でまとめた。**頭字語「SOLID」自体はMartinの命名ではなく、2004年ごろにMichael Feathersが「並べ替えるとSOLIDになる」と気づいて付けたもの**。

目的は「依存関係を減らし、あるコードを変更しても他の部分に影響が及ばないようにすること」。

## 5つの原則

| 略 | 原則 | 定義（原文の言い回し） |
|---|---|---|
| S | Single Responsibility Principle（単一責任の原則） | クラスを変更する理由は、ひとつより多くあってはならない |
| O | Open–Closed Principle（開放閉鎖の原則） | ソフトウェアの構成要素は、拡張に対して開いており、修正に対して閉じているべきである |
| L | Liskov Substitution Principle（リスコフの置換原則） | 基底クラスへのポインタ・参照を使う関数は、そうと知らずに派生クラスのポインタ・参照を使えなければならない |
| I | Interface Segregation Principle（インターフェース分離の原則） | クライアントに、使わないインターフェースのメソッドへの依存を強制してはならない |
| D | Dependency Inversion Principle（依存性逆転の原則） | 具象ではなく抽象に依存せよ |

OCPはBertrand Meyerが1988年の『Object-Oriented Software Construction』で出したもの。ただしMeyer版は「既存クラスを親として継承し、機能を足す」という実装継承前提だったのに対し、Martinが1996年に再定義した版は抽象基底クラス／インターフェースへの依存とポリモーフィズムを軸にしており、中身がかなり違う。LSPはBarbara Liskovによる置換可能性の定式化に由来する。

## DIP（依存性逆転の原則）が特別扱いされる理由

[[clean-architecture|クリーンアーキテクチャ]]・[[hexagonal-architecture|ヘキサゴナルアーキテクチャ]]・[[onion-architecture|オニオンアーキテクチャ]]はどれも、この1つの原則をアプリケーション全体のスケールに引き伸ばしたもの、と読める。

通常は上位のポリシー（業務ロジック）が下位の詳細（DBドライバ）を呼ぶので、依存は上→下に流れる。DIPは、上位側が必要とするインターフェースを**上位側で定義**し、下位がそれを実装することで、依存の向きだけを反転させる。制御の流れは変わらないのに、ソースコードの依存だけが逆を向く、というのがポイント。

これを実行時に組み立てる仕掛けが[[dependency-injection|依存性注入（DI）]]。DIPは設計原則、DIはその実現手段のひとつで、別物として区別しておくとよい。

## コンポーネント（パッケージ）レベルの原則

書籍『Clean Architecture』では、クラス設計のSOLIDに加えて、より大きな粒度であるコンポーネントの原則も扱っている。

- **凝集性**: REP（Reuse/Release Equivalence Principle: 再利用の単位はリリースの単位より小さくできない）、CCP（Common Closure Principle: 同じ理由・同じタイミングで変更されるクラスをまとめる）、CRP（Common Reuse Principle: 一緒に使われないクラスを同じコンポーネントに入れない）
- **結合度**: ADP（Acyclic Dependencies Principle: コンポーネントの依存グラフに循環を作らない）、SDP（Stable Dependencies Principle: 安定度の高い方向に依存する）、SAP（Stable Abstractions Principle: 安定したコンポーネントは抽象的であるべき）

REP・CCPはコンポーネントを大きくする方向、CRPは小さくする方向に働くため、この3つの間には本質的な緊張関係がある、とされる。

## CUPIDという別案

Dan Northは2021年3月の記事「CUPID: the back story」で、SOLIDの5要素それぞれに異論を出している。元はPubConf London でのIgniteスタイル（20枚・1枚15秒の自動送り）のライトニングトークで、1原則あたり3枚45秒という構成だったもの。

- **SRP** → 「one thing」の定義が曖昧なので "Pointlessly Vague Principle"。代わりに置くのは「Fits In My Head（頭に収まる）」
- **OCP** → コード変更が高価でリスキーだった時代の助言。今は「振る舞いを変えたければコードを変えればよい」
- **LSP** → 相対的にはまともだが、クラス継承前提の枠組みに紐付いている点が問題。小さく単純な型の組み合わせで置き換える
- **ISP** → God objectへの対処パターンであって原則ではない。そもそもそうならないロール設計をすべき
- **DIP** → 大半の依存は逆転させる必要がない。reuse ではなく use に注目せよ（Northは、この原則が回収できないコストを大量に生んだと主張している）

翌2022年の記事「CUPID – for joyful coding」で代替案を提示。論点は「principles（原則）」という枠組み自体への疑問で、原則はルールに近く遵守しているか否かの二値判定になってしまう。そうではなく **properties（性質）** として捉えれば、コードは中心に近いか遠いかのグラデーションで語れ、常に進むべき方向が明確になる、という主張。

CUPIDの5つの性質は **Composable / Unix philosophy / Predictable / Idiomatic / Domain-based**。目標に置かれているのは「joyful（一緒に仕事をしていて楽しい）コード」。

## 出典

- [SOLID - Wikipedia](https://en.wikipedia.org/wiki/SOLID)
- [Open–closed principle - Wikipedia](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle)
- [CUPID: the back story | Dan North & Associates (2021-03-16)](https://dannorth.net/blog/cupid-the-back-story/)
- [CUPID – for joyful coding | Dan North & Associates (2022-02-10)](https://dannorth.net/2022/02/10/cupid-for-joyful-coding/)
- [Component Principles (Clean Architecture Part IV) の要約](https://github.com/serodriguez68/clean-architecture/blob/master/part-4-component-principles.md)
