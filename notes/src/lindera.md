---
created: 2026-08-19 00:50
updated: 2026-08-19 00:50
---
# Lindera

Rust製の多言語対応形態素解析ライブラリ。[kuromoji-rs](https://github.com/fulmicoton/kuromoji-rs)(Javaの[[mecab|MeCab]]系解析器kuromojiをRustに移植したプロジェクト)からフォークする形で開発が始まった。MIT Licenseで公開されている。 #nlp #rust

## 特徴

- 日本語テキスト(IPADIC使用時)を単一スレッドで約10〜20 MB/sの速度でトークン化できる
- 日本語のほか、中国語・韓国語など複数言語に対応
- Python、Node.js、Ruby、PHP、WebAssemblyなど複数言語向けのバインディングを提供
- `LINDERA_CONFIG_PATH`環境変数で指定するYAML設定ファイルにより、Rustコードを変更せずにtokenizerの挙動を設定できる
- CLIツールも提供されており、コマンドラインから直接トークナイズを試せる

## アーキテクチャ

`lindera-analysis`(解析エンジン)、`lindera-dictionary`(辞書管理とビterbiアルゴリズム)、`lindera-crf`(条件付き確率場)、`lindera-trainer`(CRFベースの学習機能)などのクレートに分割されたモジュール構成になっている。

辞書引きには[[double-array|ダブル配列]]Trieを実装したRustクレート[yada](https://crates.io/crates/yada)(Yet Another Double-Array)を利用している。これは[[mecab|MeCab]]が辞書引きにダブル配列Trieを用いているのと同じアプローチで、Rust実装として踏襲した形になる。辞書は`embedded://ipadic`のようにビルド時にバイナリへ埋め込む方式と、実行時にロードする方式の両方に対応する。

## 対応辞書

- 日本語: [[ipadic|IPADIC]]、IPADIC NEologd、UniDic
- 韓国語: ko-dic
- 中国語: CC-CEDICT、Jieba

## 出典

- [GitHub - lindera/lindera](https://github.com/lindera/lindera)
- [Lindera Documentation](https://lindera.github.io/lindera/)
- [yada - crates.io](https://crates.io/crates/yada)
