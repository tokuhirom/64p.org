---
created: 2026-09-06 01:15
updated: 2026-09-06 01:15
---
# trusting trust攻撃

コンパイラなどのビルドツールの**バイナリ**にバックドアを仕込み、そのツールが自分自身の後継バイナリをビルドするときにバックドアを再注入させることで、ソースコードには一切悪意あるコードが存在しないまま汚染が世代を超えて生き続ける攻撃。Ken Thompsonが1983年のチューリング賞（Dennis Ritchieと共同受賞）の受賞講演で示し、1984年8月のCACMに「Reflections on Trusting Trust」として掲載された。 #security #supply-chain-attack #compiler

## 仕組み

Thompsonの構成では、汚染されたCコンパイラのバイナリが2つのパターンを認識する。

1. `login`のソースを認識したら、バックドア入りのバイナリを吐く。
2. **コンパイラ自身のソース**を認識したら、上記1と2の両方のロジックを新しいコンパイラバイナリに再注入する。

こうしておけば、コンパイラのソースから悪意あるコードを削除しても構わない。クリーンなコンパイラソースを汚染されたコンパイラバイナリでコンパイルすると、出来上がったバイナリはまた汚染されている。ソースをいくら監査しても、汚染はバイナリの側だけを伝って永続する。

Thompsonの結論は「自分が全部書いたのでないコードは信用できない。ソースコードレベルの検証や精査では、信用できないコードから身を守れない」というもので、講演の主眼は「最終的に信用しているのはソフトウェアを書いた人間である」という点にある。

## 4つの役割

[[strip-trusting-trust-attack|stripを使った2026年の研究]]は、この攻撃を成立させる要素を4つの役割に整理している。

| 役割 | Thompsonのコンパイラ | 一般化 |
| --- | --- | --- |
| 変換 (transformation) | ソースをコンパイルする | 何らかのビルド成果物を作る／書き換える |
| 認識 (recognition) | ソースのパターン | 対象を見分ける手段 |
| 注入 (implantation) | コード生成 | 成果物へのペイロード埋め込み |
| 後継辺 (successor edge) | コンパイラがコンパイラをコンパイルする | 自分の次世代を自分が処理する |

このうち**後継辺**が、悪意あるソースを消したあとも汚染を永続させる本体。攻撃の必須要素はコンパイラであることではなく、この4つを1つのツールが同時に満たすことなので、コンパイラ以外のビルドツールにも成立しうる。

## 対策と、それぞれの限界

- **DDC (diverse double-compiling)** — David A. Wheelerが2005年のACSAC論文と2009年の博士論文で定式化した手法。検証したいコンパイラのソースを、独立した**別の**コンパイラでビルドし直し、2つの結果が一致するかを見る。片方だけが持つThompson型の埋め込みは不一致として露出する。ただし多様化されるのはコンパイラであって、コンパイラ後段のツールではない。
- **再現可能ビルド (reproducible builds)** — 同じソースから常にビット単位で同一のバイナリが出るようにし、第三者のリビルダーがバイナリとソースの対応を確認する。ただし保証するのは「ビルドが決定的であること」であって「ビルド環境が正直であること」ではない。汚染されたシードを両方のビルドが使っていれば、同じ埋め込みがビット単位で再現されるだけで検知されない。
- **bootstrappable builds** — そもそも信用せざるを得ない不透明なバイナリ（ブートストラップシード）の量を減らす方向。GNU Guixのfull-source bootstrapは、357バイトの`hex0`シードから`stage0-posix`（hex1, hex2, M0, M1, M2-Planet…）を積み上げてGCCまで到達する、2万ノード超のパッケージグラフを実現している。OCamlツールチェインに対する同種の取り組みがCamlboot。

3つとも「ソースからバイナリへの経路」を守る手法であり、コンパイル**後**に走るユーティリティは対象外という共通の穴がある。そこを突いたのが[[strip-trusting-trust-attack]]。

## コンパイラの外への一般化

Thompson以前・以後にも、この構図をコンパイラの外に広げる議論はあった。

- Karger and Schell (1974) — Multicsの脆弱性分析で、コンパイラを介したコード挿入に言及。Thompsonの講演より前。
- Spinellis (2003) — 信用できないエージェントが動いているプラットフォームでは、そのセキュリティポリシー自体が信用できない、という形の一般化。
- Bratus et al. (2014) — 本質はコンパイラに仕込まれたバグではなく、プログラムが入力をどう扱うかにあり、信用できない入力を読むプログラムなら同じ攻撃を担える、という主張。
- Maynor (2004) — 弱点はコンパイラに限らず他の信用されたビルドツールにも一般化する、と指摘するにとどまり、実装は示していない。

「非コンパイラのビルドユーティリティによる、実ディストリビューションのブートストラップを通した自己増殖」という形で実装まで示したのが2026年の[[strip-trusting-trust-attack|strip版の研究]]。

## 出典

- [Reflections on Trusting Trust (Ken Thompson, CACM 27(8), 1984)](https://www.cs.cmu.edu/~rdriley/487/papers/Thompson_1984_ReflectionsonTrustingTrust.pdf)
- [ACM A.M. Turing Award — Kenneth Lane Thompson](https://amturing.acm.org/award_winners/thompson_4588371.cfm)
- [Countering Trusting Trust through Diverse Double-Compiling (David A. Wheeler)](https://dwheeler.com/trusting-trust/)
- [The Full-Source Bootstrap: Building from source all the way down — GNU Guix](https://guix.gnu.org/en/blog/2023/the-full-source-bootstrap-building-from-source-all-the-way-down/)
- [Bootstrappable Builds](https://bootstrappable.org/)
