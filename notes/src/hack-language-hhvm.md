---
created: 2026-08-15 07:38
updated: 2026-08-15 07:38
---
# Hack言語とHHVM

Meta（旧Facebook）が開発した、PHPから派生したプログラミング言語「Hack」と、その専用ランタイム「HHVM (HipHop Virtual Machine)」についてのノート。

## 概要

- HHVMはもともと2010年にFacebookが公開したPHP実行系。JITコンパイルによりPHPの標準実装(Zend Engine)より高速に動かすことを目的としていた。
- Hackは2014年にFacebookが発表した、PHPに静的型付けを追加した言語。HHVM上で動作し、当初はPHPとの後方互換性を重視していた。
- 年月を経るにつれてHackは独自の言語機能(true types、enum classesのtype constantなど)を蓄積し、PHP本体の文法から乖離が進んでいる。PHP本体(php-src)側もFacebook発の提案とは別に独自路線でJIT実装などを進めており、両者の技術的な合流点はほぼなくなっている。

## 2023年10月: 公式リリース提供の停止

2023年10月、Metaは[公式ブログ記事](https://hhvm.com/blog/2023/10/27/oss-update.html)で、HHVMとHackの公式リリース(ビルド済みバイナリの定期配布)を今後行わないと発表した。

- GCCサポートも打ち切り、Meta内部のビルドはClangに一本化された。
- 一方で、OSSコミュニティとのやり取り自体は継続するとしている。
- この発表を受けて「もうメンテされていないのでは」という受け止め方も広がった（[Hacker News](https://news.ycombinator.com/item?id=41499855)）。

## 社内では現役の開発が継続

公式リリースが止まった後も、Meta社内ではHackとHHVMの開発自体は活発に続いている。

- 年間2,500コミット超のペースで日々更新が行われ、GitHub上のリポジトリ(facebook/hhvm)にも定期的に同期されている。
- 2025年5月には、生成AI(GenAI)ワークロード向けにHHVMを最適化した事例が報告されている。推論トラフィック専用のテナントを設け、スレッドプールを1ホストあたり最大1,000まで拡大、リクエストタイムアウトを標準の30秒超に延長するといった調整により、レイテンシを約30%改善したという。

## まとめ

「配布物としてのHack/HHVM」は事実上終息した(コミュニティが必要なら自前でビルドする必要がある)が、「Meta社内の基幹言語・ランタイムとしてのHack/HHVM」は今も現役で、生成AI系ワークロードへの最適化のような形で開発が続いている。

## 出典

- [Project Update and OSS Support Changes | HHVM](https://hhvm.com/blog/2023/10/27/oss-update.html)
- [Meta's Hack (HHVM) language appears to be no longer maintained | Hacker News](https://news.ycombinator.com/item?id=41499855)
- [Hack (programming language) — Wikipedia](https://en.wikipedia.org/wiki/Hack_(programming_language))
- [Hack (programming language) — Grokipedia](https://grokipedia.com/page/Hack_(programming_language))
- [HHVM — Grokipedia](https://grokipedia.com/page/HHVM)

#php #hack #hhvm #programming-language
