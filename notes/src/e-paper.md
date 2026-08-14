---
created: 2026-08-15 07:17
updated: 2026-08-15 07:19
---
# 電子ペーパー（e-paper）

#electronics #hardware

紙のような見た目と読みやすさを目指した反射型ディスプレイ技術の総称。バックライトで発光する液晶や有機ELと違い、周囲の光を反射して表示するため、直射日光下でも読みやすく、目への負担が少ないとされる。代表的な用途はKindle/Koboなどの電子書籍リーダー、電子棚札（ESL）、サイネージ、[[pebble-smartwatch|Pebble]]のようなウェアラブル。

## 電気泳動方式（E Ink）の仕組み

事実上の標準はE Ink社の電気泳動（electrophoretic）方式。髪の毛の直径ほどのマイクロカプセルを数百万個並べ、各カプセルの中に「負に帯電した白粒子」と「正に帯電した黒粒子」を透明な液体中に浮遊させている。電界をかけると粒子が泳動し、表面側に来た粒子の色が見える。DNA分離などで使う電気泳動と同じ原理をディスプレイに応用したもの。

重要な性質が2つある。

- **反射型**: 自発光せず環境光を反射する。
- **双安定（bistable）**: 電圧を切っても表示が保持される。電力を消費するのは表示を書き換える瞬間だけなので、静止画表示なら消費電力がほぼゼロ。電子書籍リーダーや電子棚札の桁違いのバッテリー持ちはこれによる。

トレードオフとして書き換えが遅く（動画やスムーズなスクロールは苦手）、書き換え時に前の表示が残るゴースティングが起きやすい。これを消すために画面全体を黒白反転させるリフレッシュが挟まる。

## カラー化の方式

E Inkのカラー技術は大きく3系統ある。

- **Kaleido 3**: 300ppiの白黒パネルの上にカラーフィルタを重ねる方式。カラー時の実効解像度は約150ppiに落ちるが、書き換えは白黒並みに速い。カラー電子書籍リーダーの主流。
- **Gallery 3（ACeP）**: 1画素の中に複数色の顔料粒子を入れ、粒子の配置で直接発色する方式。印刷物に近い豊かな色が出るが、粒子を精密に並べる必要があるため書き換えが遅い。
- **Spectra 6**: 赤・青・黄・白の4顔料をマイクロカップに封入した方式。サイネージ・電子棚札向け。

## 「e-paper」を名乗る別技術: メモリLCD

[[pebble-smartwatch|Pebble]]は「e-paperディスプレイ」とマーケティングされていたが、実際に使われていたのはE Inkではなくシャープの[[memory-lcd|メモリLCD]]（メモリインピクセル、MIP）。各画素に1bitのメモリを埋め込んだ反射型（transflective）液晶で、静止画表示時の消費電力が極めて小さい点は電子ペーパーと似ているが、双安定ではなく、原理は液晶。代わりに18fps程度の書き換えができるため、電気泳動方式が苦手とするアニメーションやスムーズなUIが可能。「常時表示・長時間バッテリー・日光下で読める」という体験ベースでe-paperと呼ばれることがある。詳細は[[memory-lcd]]を参照。

## 出典

- [E Ink: How it works](https://www.eink.com/tech/detail/How_it_works)
- [Visionect: Electronic paper explained](https://www.visionect.com/blog/electronic-paper-explained-what-is-it-and-how-does-it-work/)
- [MyGica: E Ink Gallery 3 vs Kaleido 3 vs Spectra 6](https://www.mygica.com/e-ink-color-technologies/)
- [Good e-Reader: E INK Gallery 3 vs E INK Kaleido 3](https://goodereader.com/blog/e-paper/e-ink-gallery-3-vs-e-ink-kaleido-3)
- [E-Ink-Info: MIP (Memory LCD)](https://www.e-ink-info.com/e-paper-technologies/mip-memory-lcd)
- [Wikipedia: Pebble (watch)](https://en.wikipedia.org/wiki/Pebble_(watch))
- [Hacker News: Pebble used a Sharp Memory LCD](https://news.ycombinator.com/item?id=26861671)
