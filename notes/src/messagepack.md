---
created: 2026-08-13 13:07
updated: 2026-08-27 21:59
---
# MessagePack

「JSONのようだが、高速かつ小さい」ことを謳う、効率的なバイナリシリアライゼーション形式。マップ(オブジェクト)・配列・文字列・整数・浮動小数点数・真偽値・nullといったJSONと同じ論理データモデルを、テキストではなくコンパクトなバイナリ表現でエンコードする。2008年に[[embulk|Embulk]]・[[fluentd|Fluentd]]の開発者でもある古橋貞之(Sadayuki Furuhashi)氏が考案した。

#data-engineering #serialization

## 生まれた背景

分散システムの開発において、JSONのパース処理がボトルネックになっていたことが開発の動機。JSONと同様にスキーマフリーでありながら、バイナリで高速なフォーマットを求めて作られた。

## 特徴

- 小さな整数は1バイトにエンコードされ、典型的な短い文字列も文字列本体+1バイト程度で表現できるなど、コンパクトさを重視した設計。JSONと比べておよそ50%小さくなる。
- バイナリ形式のためテキストパースが不要で、処理が高速。
- JSONが対応していないバイナリデータをネイティブにサポートする。
- 50以上のプログラミング言語・環境で実装が提供されている。

## 採用事例

- [[fluentd|Fluentd]]は内部データ表現に全面的にMessagePackを採用しており、パイプラインの各ステージ間でゼロコピーのデータ受け渡しを実現している。
- [[redis|Redis]]はLuaスクリプティングでMessagePackを採用している。
- Treasure Data社の分析基盤パイプラインもMessagePack上に構築されている。

## [[cbor|CBOR]]との違い

同じくJSON互換のデータモデルをバイナリでスキーマフリー・自己記述的にエンコードする形式として[[cbor|CBOR]]がある。CBORはMessagePackの発想を拡張し、バイト文字列・日付・多倍長整数といった型をタグ機構でネイティブサポートする点が異なる。

## 出典

- [MessagePack: It's like JSON. but fast and small.](https://msgpack.org/)
- [MessagePack - Wikipedia](https://en.wikipedia.org/wiki/MessagePack)
