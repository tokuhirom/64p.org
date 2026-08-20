---
created: 2026-08-12 20:37
updated: 2026-08-20 15:07
---
# Mojo

Modular社が開発するプログラミング言語。Pythonに似た構文を持ちつつ、システムプログラミングやGPU/AIワークロード向けの性能を目指す。2023年に初回リリースされ、2026年8月にリリースされた「Modular 26.5」で正式に1.0に到達した。 #ai #compiler-design

Swift/LLVMの開発を主導したChris LattnerとTim Davisが創設。TypeScriptがJavaScriptに対して持つ関係と同様、Pythonの動的な性質を保ちながら`fn`(厳格な型付き関数)・`struct`・`var`といった構文でシステムプログラミング向けの静的型付けを追加できる「Pythonのスーパーセット」として設計されている。コンパイラ基盤にはLLVMエコシステムの[[mlir|MLIR]] (Multi-Level Intermediate Representation) を採用しており、CPU・GPU・TPU・ASICなど異種ハードウェアを単一の言語でターゲットにできる。メモリ安全性まわりの所有権・借用の仕組みはRustに触発されている。

## 1.0の意味

1.0到達は、言語の基盤が長期的に安定し、大きな破壊的変更なしにプロジェクトを構築できる段階に入ったことを意味する。1.0以降も破壊的変更は慎重に行いつつ言語開発自体は継続する方針で、2026年中にはコンパイラ・ツールチェーン自体のオープンソース化も予定されている。

## Modular 26.5 / Mojo 1.0での変更点

- 言語仕様の一貫性向上。変数宣言・クロージャ・ポインタ型など、これまで複数あった書き方を単一の標準構文に収束させた
- lambda構文のサポート追加
- [[lsp|LSP]]サーバーの安定性向上
- メモリ安全性診断機能を実装（無効化された参照の検出など）

## コミュニティ

標準ライブラリのオープンソース化以降、約200人の貢献者が1,100件超のプルリクエストを提出し、20万行以上のコードが変更された。

## MAX(推論プラットフォーム)

Modular社は[[vllm|vLLM]]と同様のLLM推論・サービング領域で「[[max|MAX]]」という推論プラットフォームも開発している。Modular 26.5に合わせてMAXも26.5となり、インストールプロセスの最適化、GLM-5.2・Nemotron-Hなど新しいモデルファミリーへの対応、エージェント向けスキル機能の拡充が行われた。詳細は[[max|MAX]]を参照。

## Qualcommによる買収

Modular社は2026年6月にQualcommによる約39億ドル(株式交換)での買収が発表され、2026年7月29日に完了した。買収はデータセンター向けAIソフトウェア(推論・オーケストレーション・分散システムでのデプロイ)の強化を目的としたもの。共同創業者・CEOのChris LattnerはQualcommのExecutive Vice President, Advanced AI Software and Platformsに就任した。

## 出典

- [Modular 26.5: Mojo 1.0 is here](https://www.modular.com/blog/modular-26-5-mojo-1-0-is-here)
- [Mojo (programming language) - Wikipedia](https://en.wikipedia.org/wiki/Mojo_(programming_language))
- [Qualcomm Acquires Modular to Expand AI Software for Data Centers - Bloomberg](https://www.bloomberg.com/news/articles/2026-06-24/qualcomm-confirms-buying-modular-to-help-ai-market-push)
- [Qualcomm Completes Acquisition of Modular - PR Newswire](https://www.prnewswire.com/news-releases/qualcomm-completes-acquisition-of-modular-302837286.html)
