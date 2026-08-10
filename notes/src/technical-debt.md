---
created: 2026-08-11 07:50
updated: 2026-08-11 07:55
---
# 技術的負債（Technical Debt）

ソフトウェア開発において、短期的な速度を優先した実装判断が、将来の開発速度を低下させる形で「借金」のように積み重なっていくことを表すメタファー。生みの親は[[ward-cunningham|Ward Cunningham]]（Wikiの発明者、[[agile-manifesto|アジャイルマニフェスト]]共著者の一人）。

## 原典1: 1992年のOOPSLA論文

論文タイトルは *"The WyCash Portfolio Management System"*（OOPSLA '92 Experience Report）。CunninghamがSmalltalkで開発していた金融アプリケーションについて、非技術者の経営層にリファクタリングの必要性を説明するために書かれた。

> "Shipping first time code is like going into debt. A little debt speeds development so long as it is paid back promptly with a rewrite."
> （初回リリースのコードを出荷することは借金をするようなものだ。少額の借金は、書き直しという形ですぐに返済される限り、開発を加速させる）

> "Every minute spent on not-quite-right code counts as interest on that debt."
> （完全に正しくないコードに費やされる時間は、その借金の利子として積み重なっていく）

> "Entire engineering organizations can be brought to a stand-still under the debt load of an unconsolidated implementation"
> （整理されていない実装の負債が積み重なると、エンジニアリング組織全体が停滞しうる）

## 原典2: Ward自身による後年の補足解説

Cunninghamは後年、このメタファーが誤解されがちだと述べている。多くの人が「技術的負債＝後で直すつもりで質の低いコードを書くこと」と誤解しているが、彼の本来の意図はそれとは異なる。

- 本来のポイントは「その時点での自分たちの理解（ドメイン理解）を反映したコードを書くこと」にある。開発初期はドメインへの理解が不完全なまま実装せざるを得ず、その「理解と実装のズレ」自体が負債である、という考え方。
- 負債には**元本（principal）**と**利子（interest）**があり、元本は「その決定を後で置き換えるのにかかるコスト」、利子は「置き換えるまでの間、他の機能開発が受け続ける速度低下」を指す。
- 質の悪いコードを書くこと自体を正当化するメタファーではなく、あくまで「リファクタリング可能な程度にきれいなコード」であることが前提。これが彼の言う「エクストリーム・プログラミングの中核」だとしている。

## 補足: 後の展開

このメタファーはMartin Fowlerが[[technical-debt-quadrant|技術的負債の四象限]]として整理し直すなど、後年さまざまな形で拡張・再解釈され、現在の一般的な用法（「あえて質を落として素早くリリースする」というニュアンス）に広がっていった経緯がある。

## 出典

- [Experience Report — The WyCash Portfolio Management System (Ward Cunningham, OOPSLA '92)](http://c2.com/doc/oopsla92.html)
- [Ward Explains Debt Metaphor - Crater Moon Development](https://cmdev.com/papers/debt-metaphor/)
- [bliki: Technical Debt - Martin Fowler](https://martinfowler.com/bliki/TechnicalDebt.html)
- [Introduction to the Technical Debt Concept | Agile Alliance](https://agilealliance.org/introduction-to-the-technical-debt-concept/)

#software-engineering #agile
