---
created: 2026-08-12 13:42
updated: 2026-08-19 00:50
---
# MeCab

#nlp

京都大学大学院情報学研究科とNTTコミュニケーション科学基礎研究所の共同研究ユニットプロジェクトとして開発された、オープンソースの日本語形態素解析エンジン。開発者は工藤拓。2006年3月26日にバージョン0.90として最初に公開された。名前の由来は開発者の好物である「和布蕪(めかぶ)」から。

工藤拓は後に[[sentencepiece|SentencePiece]]の開発者としても知られ、Google Japanese Inputの開発にも携わった。

## 開発の背景

MeCab以前の代表的な形態素解析器にJumanとChaSenがあった。

- **Juman**: 辞書や品詞体系を外部に定義できる自由度はあったが、単語同士の連接コストを人手で調整する必要があり、そのコストが大きかった。
- **ChaSen**: 隠れマルコフモデル(HMM)による統計処理を導入したが、複雑な品詞体系を扱うにはHMMでは力不足という限界があった。

## CRFの採用

MeCab最大の技術的特徴は、コスト値の推定に条件付き確率場(**Conditional Random Fields, CRF**)を採用したこと。HMMと異なり複数の内部状態を定義できるため、「細かい品詞階層と粗い品詞階層の確率値を混ぜる」ようなスムージングが自然かつ自動的に実現でき、人手調整のコストを大幅に削減した。学習コーパスもHMMの1/3程度で同程度の性能が得られるとされる。

そのほかの特徴として、未知語処理を外部から自由に定義できる点、辞書引きに[[double-array|Double-Array]] Trie構造を用いた高速性、N-best出力や制約付き解析への対応などが挙げられる。

## 辞書

MeCab本体は言語・辞書・コーパスに依存しない汎用設計になっており、動作には別途辞書が必要。代表的なものに以下がある。

- **[[ipadic|IPAdic]]**: 標準的によく使われる辞書
- **UniDic**: 国立国語研究所が整備する、より詳細な形態素情報を持つ辞書
- **mecab-ipadic-NEologd**: IPAdicをベースに、Web上の言語資源から抽出した新語・固有表現を週2回のペースで追加収録するカスタム辞書。IPAdicでは分割されがちな固有名詞をまとめて認識できる一方、ディスク・メモリを多く消費する

## 後継・代替ツール

その後登場した日本語形態素解析器として、Works Applications主導の**Sudachi**などがある。MeCabとは別の辞書体系を持ち、代替の選択肢として比較されることが多い。

Rust製の[[lindera|Lindera]]は、MeCab系の解析器であるkuromoji(Java)をRustに移植したkuromoji-rsからさらにフォークしたライブラリで、IPAdicなどMeCab用の辞書をそのまま利用できる。

## 出典

- [MeCab: Yet Another Part-of-Speech and Morphological Analyzer (公式サイト)](https://taku910.github.io/mecab/)
- [MeCab の開発経緯 (公式サイト)](https://taku910.github.io/mecab/feature.html)
- [taku910/mecab (GitHub)](https://github.com/taku910/mecab)
- [mecab-ipadic-neologd README (GitHub)](https://github.com/neologd/mecab-ipadic-neologd/blob/master/README.ja.md)
- [「めかぶ」とは？食べ物ではないとっても賢いMeCab | 株式会社キャパ](https://www.capa.co.jp/archives/24856)
