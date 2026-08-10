---
created: 2026-08-10 16:57
updated: 2026-08-10 16:57
---
# NixOS

[[nix|Nix]]をパッケージマネージャーとして採用したLinuxディストリビューション。システムパッケージも含め、全てNixpkgsのパッケージ定義から構築される。設定ファイル(Nix言語で記述)から宣言的にシステム全体を構成できるのが特徴。

## Nixとの関係

Nix言語で書かれたパッケージ定義がNixpkgsに集約され、その上でNixOSはNixpkgsのパッケージを活用してLinuxシステムを構築する、という階層構造になっている。

#nix #linux

## 出典

- [NixOSで最強のLinuxデスクトップを作ろう - Zenn](https://zenn.dev/asa1984/articles/nixos-is-the-best)
- [Nix (パッケージ管理システム) - Wikipedia](https://ja.wikipedia.org/wiki/Nix_(%E3%83%91%E3%83%83%E3%82%B1%E3%83%BC%E3%82%B8%E7%AE%A1%E7%90%86%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0))
