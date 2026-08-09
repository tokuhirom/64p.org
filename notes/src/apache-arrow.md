---
created: 2026-08-09
updated: 2026-08-09
---
# Apache Arrow

言語非依存のカラムナー(列指向)インメモリデータフォーマットを定義するオープンソースプロジェクト。分析処理向けに最適化されている。

## 特徴

- **列指向レイアウト**: 行ではなく列単位でデータを保持する。「多くの行・少ない列」を扱う分析タスク(集計など)に向いている。
- **ゼロコピー読み取り**: シリアライズ/デシリアライズのオーバーヘッドなしにデータへアクセスできる。
- **SIMD最適化**: 連続したメモリレイアウトのため、[[simd|SIMD]] (Single Instruction, Multiple Data) によるベクトル化演算と相性が良い。
- **多言語対応**: C++, Rust, Python, Java, Go など複数言語で実装が提供されており、システム間で同じメモリ表現を共有できる。異なる言語間でも変換コストなしにデータを受け渡しできる。

## エコシステムでの採用例

- クエリエンジン: Apache DataFusion, DuckDB, Velox
- データサイエンスライブラリ: pandas, polars, R Arrow
- データフォーマット: Vortex, [[apache-parquet|Parquet]]のreader
- データ転送レイヤー: Flight SQL, ADBC

## 出典

- [Apache Arrow公式サイト](https://arrow.apache.org/)
- [What is Apache Arrow? Columnar Data Format | Spice AI](https://spice.ai/learn/apache-arrow)
- [Format | Apache Arrow](https://arrow.apache.org/overview/)
- [Arrow Columnar Format — Apache Arrow v25.0.0](https://arrow.apache.org/docs/format/Columnar.html)
