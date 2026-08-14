---
created: 2026-08-15 07:19
updated: 2026-08-15 07:19
---
# メモリLCD（MIP: Memory-in-Pixel）

#electronics #hardware #wearable

各画素に1bitのSRAMを埋め込んだ反射型液晶ディスプレイ技術。画素が自分の状態を記憶しているため、通常の液晶のように60Hzで画面全体をリフレッシュし続ける必要がなく、変化した画素だけを書き換えればよい。静止画表示時の消費電力はマイクロワット級で、STN液晶の1/40〜1/80、アクティブマトリクスTFT液晶の1/1000程度とされる。

シャープが「Memory LCD」の名称で展開しているほか、JDI（Japan Display Inc）もMIPディスプレイを製造している。

## 特性

- **反射型（transflective）**: バックライトなしで環境光を反射して表示する。直射日光下ほど見やすい。暗所用に補助バックライトを組み合わせる製品が多い。
- **常時表示向き**: 静止画の維持がほぼ電力ゼロなので、スマートウォッチの「常時表示＋週〜月単位のバッテリー」が成立する。
- **書き換えが速い**: 18fps程度の描画ができるため、アニメーションやスムーズなUIが可能。ここが[[e-paper|電子ペーパー]]（電気泳動方式）との大きな違い。

## 電子ペーパーとの違い

体験（常時表示・長時間バッテリー・日光下で読める）が似ているため「e-paper」と呼ばれることがあるが、原理は液晶であり、E Inkのような双安定性はない。電源を完全に切ると表示は消える（表示維持にはSRAMを保持する微小電力が必要）。逆に電気泳動方式が苦手とする高速書き換えができるため、「ほぼ静止画だが時々滑らかに動かしたい」ウェアラブル用途に向く。

## 採用例

- [[pebble-smartwatch|Pebble]] — 「e-paperディスプレイ」とマーケティングされていたが、実体はシャープのメモリLCD。
- GarminのFenix / Forerunner / Instinct / Enduroシリーズ — 白黒はシャープ製、カラーはJDI製のMIPを採用し、週単位のバッテリー持ちを実現している（近年はAMOLEDモデルへの移行も進む）。
- シャープは2022年にウェアラブル向けの64色メモリLCDを発表している。

## 出典

- [Sharp: Memory LCD](https://sharpdevices.com/memory-lcd/)
- [O'Donnell: Sharp Memory in Pixel LCDs](https://www.odonnell.com/single-post/sharp-memory-in-pixel-lcds-the-ultimate-display-for-small-screen-outdoor-applications)
- [PanoxDisplay: How Does Sharp Memory LCD Technology Work?](https://www.panoxdisplay.com/solution/how-does-sharp-memory-lcd-technology-work/)
- [gadgets & wearables: AMOLED vs MIP](https://gadgetsandwearables.com/2023/05/17/amoled-vs-mip-screen/)
- [gadgets & wearables: Smartwatches with MIP displays](https://gadgetsandwearables.com/2025/02/22/memory-in-pixel-mip-display-smartwatch/)
- [Business Wire: Sharp's New 64 color Memory LCD](https://www.businesswire.com/news/home/20221013005073/en/Sharp%E2%80%99s-New-64-color-Memory-LCD-is-Perfect-for-Wearable-Product-Designs)
