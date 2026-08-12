---
created: 2026-08-12 13:36
updated: 2026-08-12 13:36
---
# リファクタリング(Refactoring)

#software-engineering

外部から見た振る舞いを変えずにコードの内部構造を改善すること。「誰が言い出したか」を軸に由来をまとめる。

## 用語の学術的初出

「refactoring」という語が文献に初めて現れたのは、**Bill Opdyke**と**Ralph Johnson**(イリノイ大学アーバナ・シャンペーン校)による1990年のACM SIGPLAN論文 *"Refactoring: An Aid in Designing Application Frameworks and Evolving Object-Oriented Systems"*。OpdykeはJohnsonの指導のもと1992年に博士論文 *"Refactoring Object-Oriented Frameworks"* をまとめ、これがrefactoringを技法として体系的に扱った最初の本格的な研究となった。

## 命名エピソード ― Opdyke自身の証言

Martin Fowlerが著書執筆にあたりWard Cunningham、Kent Beck、Bill Opdyke、John Brant、Don Roberts、Ralph Johnsonら当事者に語源を聞き取ったところ、多くは「正確な由来は覚えていない」と答えた中で、Opdykeだけが明確なエピソードを語っている。Johnsonと散歩をしていた際、当時流行していた「ソフトウェアファクトリ(software factory)」という概念について、「ソフトウェア開発は製造(manufacturing)というより設計(design)に近い」という考えから、"factory"をもじって**"software refactory"**と呼ぶことを提案した、というのがその由来。

用語自体は数学の「因数分解(factoring)」からの類推でもある。`x^2+5x+6` を `(x+2)(x+3)` に因数分解するのと同様に、コードを論理的なチャンクに再構成することを "well factored" と呼ぶ慣習がSmalltalkコミュニティに元々あり、そこに「re-」を足した形になっている。

## 実践としての起源は用語より前

命名者はOpdykeだが、実践自体はそれ以前からSmalltalkコミュニティ(Tektronix、Ward CunninghamやKent Beckら)で非公式に行われていた。Ward Cunninghamは後年、「Kent Beckの貢献は、彼と私が静かに一緒に発見したこと、あるいは他のプログラマから拾い上げたことを、極限まで推し進めたことだ」と語っている。Kent Beck自身も「自分がやったのは他人がすでにやっていたことの再発見にすぎない」「Ward Cunninghamがやっていたことの解釈にすぎない」と謙遜して述べている。

なお同じ概念の最初の印刷物としては、1984年のLeo Brodieの著書(Forthコミュニティ向け)にも独立して現れており、Smalltalk系譜とは別に「factoring」という語が使われていたとされる。

## Martin Fowlerによる普及と体系化

用語と技法自体は1990年代前半に存在していたが、これを広く世に知らしめたのはMartin Fowler、Kent Beck、John Brant、William Opdyke、Don Robertsの共著による1999年刊行の書籍 *Refactoring: Improving the Design of Existing Code*(初版は2000年出版、2018年に第2版)。FowlerはKent Beckと共に仕事をする中でリファクタリングが実際にもたらす効果を目の当たりにし、それを体系立てて解説する書籍がまだ存在しなかったことから自ら執筆したと述べている。

リファクタリングはこの少し前から[[extreme-programming|Extreme Programming]](XP)のプラクティスの一つとして組み込まれており、XPの文脈でも普及が進んだ。[[tdd|TDD]]の**Red-Green-Refactor**サイクルの最終ステップとしても位置づけられている。

## 出典

- [bliki: Etymology Of Refactoring (martinfowler.com)](https://martinfowler.com/bliki/EtymologyOfRefactoring.html)
- [William Opdyke - Wikipedia](https://en.wikipedia.org/wiki/William_Opdyke)
- [Refactoring Object-Oriented Frameworks - Opdykeの博士論文 PDF](https://www.laputan.org/pub/papers/opdyke-thesis.pdf)
- [Refactoring (martinfowler.com/books)](https://martinfowler.com/books/refactoring.html)
- [What is Refactoring? | Agile Alliance](https://agilealliance.org/glossary/refactoring/)
- [Ward Cunningham Quote (libquotes.com)](https://libquotes.com/ward-cunningham/quote/lbp7q9l)
