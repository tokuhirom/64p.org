---
created: 2026-08-13 12:59
updated: 2026-08-13 12:59
---
# Embulk

異なるデータベース・ストレージ・ファイル形式・クラウドサービス間でのバルクデータ転送を行う、プラグイン型のオープンソースデータローダー。Treasure Data社の古橋貞之(Sadayuki Furuhashi)氏が開発した。同氏は[[fluentd|Fluentd]]やMessagePackの開発者でもあり、Fluentdがストリーム型のログ収集を担うのに対し、Embulkはバルク(一括)型のデータ転送を担う位置づけになっている。

#data-engineering #ruby #java

## 主な機能

- 入力(Input)・出力(Output)・フィルタ(Filter)・パーサー(Parser)・フォーマッタ(Formatter)などのプラグインを組み合わせてデータパイプラインを構成するプラグイン型アーキテクチャ。プラグインはMavenやRubyGemsのリポジトリから利用できる。
- 入力ファイル形式の自動判定(guess)機能。
- 大規模データを扱うための並列実行。
- データの一貫性を保つためのトランザクション制御と、失敗時のリジューム(再実行)対応。
- 設定はYAMLで記述する。

## 技術基盤

- JRuby上に実装されており、Java(JVM)ランタイムで動作する。プラグインはJavaまたはJRubyのどちらでも実装できる。
- 執筆時点の最新安定版はv0.11系(GitHubの最新リリースはv0.11.5、2024年9月公開)で、Java 8を公式サポートしている。

## 出典

- [Embulk 公式サイト](https://www.embulk.org/)
- [embulk/embulk - GitHub](https://github.com/embulk/embulk)
- [Treasure Data - Wikipedia](https://en.wikipedia.org/wiki/Treasure_Data)
