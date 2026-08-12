---
created: 2026-08-12 09:55
updated: 2026-08-12 09:55
---
# SentencePiece

#llm #nlp

Google 製のオープンソースのテキストトークナイザ／デトークナイザライブラリ。工藤拓（MeCabの作者としても知られる）と John Richardson により開発され、2018年に論文が公開された。ニューラルネットベースのテキスト生成システム向けに、語彙サイズを事前に固定してサブワード分割を学習する。サブワードアルゴリズムとしては [[byte-pair-encoding|BPE]] と Unigram 言語モデルの両方を実装している。

## 特徴

- **生のテキストストリームとして扱う**: 従来のトークナイザが「空白で単語に分割してからサブワード化する」前提だったのに対し、SentencePiece はテキストを生の文字ストリームとして扱い、空白も `▁`（U+2581）という特殊マーカーに変換して語彙学習の対象に含める。
- **言語非依存**: 空白で単語が区切られない日本語や中国語でも、言語固有の前処理（分かち書き）なしにそのまま学習・適用できる。
- **可逆（lossless）**: トークン列から元のテキストを正確に復元できる。前処理で情報が落ちないため、生成系タスクのデトークナイズが単純になる。
- **BPE と Unigram の2方式**: BPE が頻度ベースで決定的にマージしていくのに対し、Unigram 言語モデルは確率的で、学習時に複数のトークン化をサンプリングできる（subword regularization）。

T5 や ALBERT、XLNet をはじめ多くの言語モデルのトークナイザとして採用されてきた。

## 出典

- [google/sentencepiece - GitHub](https://github.com/google/sentencepiece)
- [SentencePiece: A simple and language independent subword tokenizer and detokenizer for Neural Text Processing (Kudo & Richardson, 2018)](https://aclanthology.org/D18-2012/)
- [Summary of the tokenizers - Hugging Face](https://huggingface.co/docs/transformers/tokenizer_summary)
