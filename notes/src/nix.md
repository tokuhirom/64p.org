---
created: 2026-08-10 16:57
updated: 2026-08-10 16:57
---
# Nix

純粋関数型の設計思想に基づくパッケージマネージャー。ソフトウェアパッケージはそれぞれ不変の内容を持つ固有のディレクトリにインストールされ、ディレクトリ名は全依存関係を考慮した暗号学的ハッシュに対応する。同じ入力・同じビルドプラットフォームなら常に同じビルド結果になることで、環境の再現性を保証する。

## Nix言語

パッケージのビルド方法(レシピ)を記述するための専用言語(nix expression)。宣言型・純粋関数型・遅延評価・動的型付けが特徴。

## Nixpkgs

Nix言語で書かれたパッケージ定義をGitHub上に集約したパッケージリポジトリ。従来のLinuxディストリビューションでいう「公式パッケージリポジトリ」に相当し、Nixユーザーはこれを通じて必要なソフトウェアを取得する。[[nixos|NixOS]]のシステムパッケージも全てここに含まれる。

## 関連する出来事

Nixpkgsのガバナンスを担っていたコアチームが2026年8月に解散した。詳細は[[nixpkgs-core-team-disbanded]]を参照。

#nix

## 出典

- [Nix (パッケージ管理システム) - Wikipedia](https://ja.wikipedia.org/wiki/Nix_(%E3%83%91%E3%83%83%E3%82%B1%E3%83%BC%E3%82%B8%E7%AE%A1%E7%90%86%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0))
- [Nixpkgsとは？仕組み・パッケージ導入(install)・使い方を解説 - issoh](https://www.issoh.co.jp/tech/details/10472/)
- [§2. Nixpkgsを使う｜Nix入門: ハンズオン編 - Zenn](https://zenn.dev/asa1984/books/nix-hands-on/viewer/ch02-02-use-nixpkgs)
- [Nixとその他パッケージマネージャーの比較 - Zenn](https://zenn.dev/asa1984/scraps/cb1f60efcc09f2)
