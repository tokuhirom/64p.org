---
created: 2026-08-15 16:29
updated: 2026-08-15 16:29
---
# MARISA (Matching Algorithm with Recursively Implemented StorAge)

[[trie|パトリシアトライ]]を再帰的に用いて表現する、静的(構築後は更新不可)で空間効率の良いTrieデータ構造。開発者はSusumu Yata(s-yata)。C++実装がGitHub上で公開されている。 #algorithm #data-structure #nlp #rust

## 仕組み

パトリシアトライ(共通接頭辞を持つ単一子ノードの連鎖をまとめて圧縮したTrie)を、さらに別のパトリシアトライで表現するという再帰的な構造を持つ。再帰の深さを増やすほど辞書はより圧縮されるが、検索性能は低下するというトレードオフがある。木のトポロジー自体はLOUDS(Level-Order Unary Degree Sequence)符号化で表現される。

サポートする操作:

- **Lookup** — 与えられた文字列が辞書に存在するか確認
- **Reverse lookup** — IDからキーを復元
- **Common prefix search** — 与えられた文字列の接頭辞に一致するキーを検索
- **Predictive search** — 与えられた文字列で始まるキーを検索

## [[double-array|ダブル配列]]との違い

どちらも静的なTrie実装で、更新には再構築が必要という点は共通する。

- **メモリ効率**: MARISAはダブル配列よりもかなりコンパクトになる傾向がある(英語版Wikipediaの記事タイトル約980万件のベンチマークで、他のダブル配列実装が数百MBになるのに対しMARISAは約50MBに収まる例が示されている)
- **検索速度**: ダブル配列は兄弟ノード数によらず一定して高速な検索ができる。MARISAも実用上十分高速だが、再帰の深さによっては劣る場合がある
- 日本語辞書のように親ノード1つに対する子ノード数(分岐数)が多くなりがちなケースでは、ダブル配列よりMARISAの方が空間効率の面で有利になりやすい

## 関連

tokuhirom自身がC++版MARISAをRustに移植した[rsmarisa](https://github.com/tokuhirom/rsmarisa)を開発している。C++版とのバイナリ互換性を保ちつつ、LOUDS符号化によるトライ構築・完全一致検索・共通接頭辞検索・予測検索・メモリマップドI/Oなどの主要機能を実装している。

## 出典

- [GitHub - s-yata/marisa-trie](https://github.com/s-yata/marisa-trie)
- [MARISA: Matching Algorithm with Recursively Implemented StorAge (公式ドキュメント)](http://www.s-yata.jp/marisa-trie/docs/readme.en.html)
- [marisa-trie · PyPI](https://pypi.org/project/marisa-trie/)
