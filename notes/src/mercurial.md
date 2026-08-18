---
created: 2026-08-18 20:31
updated: 2026-08-18 20:31
---
# Mercurial

CLIコマンド名は`hg`。Matt Mackallが2005年に開発した分散型バージョン管理システム。Linuxカーネルが使っていたBitKeeper（クローズドソース）に代わるツールとして、Linus TorvaldsがGitを発表したわずか13日後（2005年4月19日）に発表された。Python製で、開発当初からクロスプラットフォームで動作する。

## 設計思想

- 高いパフォーマンスとスケーラビリティ、完全な分散型協調開発、テキスト・バイナリ両方のファイルの堅牢な扱い、高度なブランチ・マージ機能を、コンセプトとしてはシンプルに保ちながら実現することを目標としている。
- 開発当初から一貫して使いやすいCLIを志向しており、これは長年「難解」という評判を持っていたGitとの対比としてよく語られる点。
- Web UIが標準で統合されている。

## Gitとの比較・採用状況

- 基本的な操作速度はGitの方が総じて速いとされるが、Mercurialも僅差で追随している。
- MozillaやPythonといった大規模プロジェクトに採用され、大規模コードベースでの実用性を証明してきた。
- 一方で現在のVCS市場シェアはGitに大きく水をあけられており、約2%程度とされる。
- 最新の安定版は7.2.1（2026年4月1日リリース）。実装言語はPython・C・Rust。

## 後継・派生ツールへの影響

[[sapling|Sapling]]のCLI(`sl`)はもともとMercurialをベースに作られており、UIや機能を色濃く継承している。また[[jujutsu|Jujutsu]]も設計思想の一部（匿名ブランチ、indexのないシンプルなCLI、revset、強力な履歴書き換え）をMercurialから取り入れているとされる。

#git #vcs

## 出典

- [Mercurial - Wikipedia](https://en.wikipedia.org/wiki/Mercurial)
- [Mercurial SCM 公式サイト](https://www.mercurial-scm.org/)
- [history_of_vcs/10_mercurial.md](https://github.com/CuriousCurmudgeon/history_of_vcs/blob/master/10_mercurial.md)
- [Beyond Git: The other version control systems developers use - Stack Overflow](https://stackoverflow.blog/2023/01/09/beyond-git-the-other-version-control-systems-developers-use/)
