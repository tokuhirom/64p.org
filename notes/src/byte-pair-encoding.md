---
created: 2026-08-12 09:46
updated: 2026-08-12 09:46
---
# BPE (Byte Pair Encoding)

#llm #nlp #algorithm #compression

現代のLLMのトークナイザで事実上の標準となっているサブワード分割アルゴリズム。もともとは Philip Gage が1994年に The C Users Journal で発表したデータ圧縮アルゴリズム（"A New Algorithm for Data Compression"）で、2015年に Sennrich, Haddow, Birch がニューラル機械翻訳の語彙問題を解くために転用した（論文 "Neural Machine Translation of Rare Words with Subword Units"）。以降 GPT系をはじめ多くのLLMがBPEベースのトークナイザを採用している。

## アルゴリズム

1. 語彙を個々の文字（またはバイト）で初期化する。
2. 学習コーパス中で隣接して出現するシンボルのペアを数え、最頻のペアをマージして1つの新しいシンボルにし、語彙に追加する。
3. 語彙が所定のサイズに達するまで 2. を繰り返す。

これにより、頻出する単語や語幹はまるごと1トークンに、珍しい単語はサブワードの組み合わせに分割される。未知語が出ても文字レベルまで分解すれば必ず表現できるため、open vocabulary 問題が解決する。

## LLMにとっての意味

- **計算効率**: attention は系列長の2乗でスケールするため、テキストを短いトークン列に圧縮できるほど効率が良い。
- **意味的密度**: BPEのトークンは形態素・単語・頻出部分文字列に対応することが多く、文字単位よりも意味のある単位で処理できる。

## 圧縮率を信号として使う応用

BPEは「よく出るパターンほど長いトークンにまとまる」圧縮アルゴリズムなので、**あるテキストがどれだけ効率よくトークン化されるか**自体が「自然言語らしさ」の統計的シグナルになる。シークレットスキャナの [[betterleaks]] はこれを "Token Efficiency" と呼び、[[shannon-entropy|シャノンエントロピー]]に代わる誤検知フィルタとして使っている（自然言語は長いトークンに圧縮されるが、APIキーのようなランダム文字列は短いトークンに細切れになる）。

## 出典

- [Neural Machine Translation of Rare Words with Subword Units (Sennrich et al., 2016)](https://aclanthology.org/P16-1162/)
- [Between words and characters: A Brief History of Open-Vocabulary Modeling and Tokenization in NLP](https://arxiv.org/pdf/2112.10508)
- [Byte Pair Encoding (BPE): From Data Compression to GPT-2 Tokenization](https://medium.com/@dakshrathi/byte-pair-encoding-bpe-from-data-compression-to-gpt-2-tokenization-44e35be2fd58)
