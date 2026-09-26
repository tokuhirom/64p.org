---
created: 2026-09-26 02:07
updated: 2026-09-26 02:07
---
# 文芸的プログラミング (Literate Programming)

Donald Knuthが1984年の論文「Literate Programming」(The Computer Journal, Vol.27 No.2, pp.97-111)で提唱したプログラミングのパラダイム。コードの中にコメントを埋め込むのではなく、**人間向けの文章の中にコード片を埋め込む**。プログラムを「コンピュータへの指示」ではなく「人間に向けて、何をさせたいかを説明する文章」として書く。

## 考え方

- 「複雑なソフトウェアは単純な部品と部品間の単純な関係からなる。プログラマの仕事はそれらを、人間の理解にとって最適な順序で述べることだ」(Knuth)。
- コンパイラが要求する順序ではなく、説明しやすい順序でコードを並べられる。
- コード片には「◯◯を初期化する」のような説明的な名前のマクロを付け、マクロの中からさらに別のマクロを参照する。Knuthは「プログラムはさまざまな部品からなる web(網)として捉えるのが最もよい」と言っており、トップダウン・ボトムアップのどちらにも縛られない。
- Knuth自身、当初はドキュメントのための仕組みと考えていたが、WEBで書いたプログラムは他の言語で書いたものより良くなった、と述べている。説明を書くことで推論を明示せざるを得なくなるため。

## tangle と weave

1つのソースから2つの成果物を取り出す。

- **tangle** — マクロを展開し、コンパイラが要求する順序に並べ替えて、コンパイル可能なソースコードを生成する。
- **weave** — 組版されたドキュメント(Knuthの場合TeX)を生成する。

同じファイルから両方を作るので、コードとドキュメントがずれない。

## ツール

- **WEB** — Knuthのオリジナル。Pascal + TeX。コンピューティング分野でまだ使われていなかった数少ない3文字の英単語、ということで命名。
- **CWEB** — KnuthとSilvio LevyによるC/C++版。
- **noweb** — 言語非依存。
- **Org-mode Babel** — Emacs上で多言語のコードブロックを実行・tangleできる。
- **knitr / Sweave** — R向け。再現可能な統計レポート用。
- **[[jupyter-notebook|Jupyter Notebook]]** — コードセルとMarkdownセルを交互に並べる。2010年代、データサイエンス分野での計算ノートブックの普及によって文芸的プログラミングは再評価された。

## Literate Computing への拡張

IPython作者のFernando Pérezは2013年に「Literate Computing」という言葉を使い、文芸的プログラミングの一歩先として位置づけた。テキストとコードと**実行結果**を織り交ぜ、ナラティブを生きた計算の中に直接織り込む、という考え方。Knuthの文芸的プログラミングが「プログラムを説明する文章」なのに対し、Literate Computingは「計算とその結果を説明する文章」を主眼にしている。

この流れをインフラ運用に持ち込んだのが[[lc4ri|LC4RI]]。

#programming #jupyter

## 出典

- [Literate programming - Wikipedia](https://en.wikipedia.org/wiki/Literate_programming)
- [IPython - Wikipedia](https://en.wikipedia.org/wiki/IPython)
- [IPython from the shell to a book with a single tool with Fernando Perez - MachineLearningMastery.com](https://machinelearningmastery.com/ipython-from-the-shell-to-a-book-with-a-single-tool-with-fernando-perez/)
