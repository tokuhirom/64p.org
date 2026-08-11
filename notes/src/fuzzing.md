---
created: 2026-08-11 13:47
updated: 2026-08-11 13:47
---
# ファジング (Fuzzing)

不正な値・想定外の値・ランダムな値をプログラムへの入力として大量に与え、クラッシュやアサーション違反、メモリ破壊などの異常を観察することでバグや脆弱性を発見する、自動化されたソフトウェアテスト手法。

## 分類

- **Black-box**: プログラム内部を見ず、外部から観察できる挙動だけに依存
- **White-box**: ソースコードを詳細に解析した上でテストケースを生成
- **Gray-box**: 両者の中間。プログラムにコード網羅率（カバレッジ）計測用の計装を入れつつ、内部構造の完全解析はしない

## Coverage-guided fuzzing（カバレッジ誘導ファジング）

現在主流の方式。入力を変異させながらプログラムを実行し、実行経路（分岐カバレッジ）が広がる入力を優先的にシードとして保持し、さらに変異させ続けることで、未探索のコードパスに潜むメモリエラーなどを効率的に見つけ出す。

## 代表的なツール

- **AFL (American Fuzzy Lop)**: カバレッジ誘導ファジングを普及させた先駆的ツール。遺伝的アルゴリズムでミューテーションを行い、カバレッジが伸びた入力をシードとして保存・再利用する
- **libFuzzer**: LLVMのSanitizerCoverage計装によるカバレッジ情報を使う、LLVMコンパイラ基盤に統合されたツール。C/C++, Rust, Swift, JuliaなどLLVMでコンパイルされる言語向け。Memory Sanitizerと組み合わせてメモリエラーを検出できる

## 関連ツールでの用例

[[burp-suite]]のIntruder機能や[[metasploit]]のAuxiliary modulesなど、セキュリティツールの一機能としてファジングが組み込まれていることも多い。

#security #testing

## 出典

- [Fuzz Testing: A Beginner's Guide | Better Stack Community](https://betterstack.com/community/guides/testing/fuzz-testing/)
- [FuSeBMC v4: Improving code coverage with smart seeds via BMC, fuzzing and static analysis (arXiv)](https://arxiv.org/pdf/2206.14068)
- [Open Source Fuzzing Tools for Beginners](https://devhunt.org/blog/open-source-fuzzing-tools-for-beginners)
