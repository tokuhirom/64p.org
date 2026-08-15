---
created: 2026-08-15 22:21
updated: 2026-08-15 22:21
---
# Dactyl Manuform

コンケイブ(凹型)・カラムスタッガード配列を持つ、オープンソースかつパラメータ化されたエルゴノミック分割キーボード。3Dプリントでケースを製作する。

## 由来

原型となる**Dactyl**は、Matthew Adereth氏がClojureとOpenSCADで設計した。これをTom Short氏が**ManuForm**キーボードコミュニティの設計要素(親指クラスタ部分)を取り入れて派生させたのが**Dactyl-ManuForm**。後にコードベースをClojure/OpenSCADからPython + cadquery(OpenCASCADE)へ移植したフォークも登場している。元開発者らがClojureを難解、OpenSCADのジオメトリエンジンを不安定と感じたことが移植の理由。

## 特徴

- ケース設計は列数・行数・傾斜角など多数のパラメータで調整できる。
- 3Dプリントで製作するのが基本。高強度フィラメントを使い、レイヤー高さ0.2mm設定ではケース一対あたりほぼ丸一日かかる印刷時間になる。
- ボトムプレートをネジ止めできる構造で、M3ネジ用のインサートナット穴が用意されている。
- GitHub上で設計ファイル(事前生成されたSTLを含む)が公開されており、そのまま印刷することも、パラメータをカスタマイズして再生成することもできる。
- ファームウェアには[[qmk|QMK]]を組み合わせることが多い。トラックボールを組み込むカスタム例もあり、その点では[[keyball]]と近い狙い(タイピングとポインティングデバイスの一体化)を持つビルドも存在する。
- 日本の自作キーボードコミュニティでも人気があり、ビルド記録のブログ記事が多数存在する。

## 出典

- [GitHub - maxkorp/dactyl-manuform](https://github.com/maxkorp/dactyl-manuform)
- [GitHub - joshreve/dactyl-keyboard](https://github.com/joshreve/dactyl-keyboard)
- [Dactyl Manuform系列のキーボードを作った話｜なゆ](https://note.com/nykx/n/ndb74597ff296)
- [エルゴノミックな自作キーボード Dactyl Manuform を作った話](https://www.creativity-ape.com/entry/2019/01/12/204423)

#自作キーボード #qmk
