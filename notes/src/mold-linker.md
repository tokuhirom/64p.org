---
created: 2026-08-12 13:50
updated: 2026-08-14 09:50
---
# mold(高速リンカ)

rui314氏(LLVM lldリンカの開発者でもある)が開発した、C++20製の次世代リンカ。GNU ld・LLVM lld・goldといった既存のUnix系リンカの代替として、リンク工程そのものを高速化することを狙ったツール。 #rust #build #linker

## 速度

MySQLのリンクを例にしたベンチマークでは、GNU ldが10.84秒、lldが1.64秒に対し、moldは0.46秒だったと報告されている。Clang 19でのビルドでもmold 1.35秒に対しlld 5.20秒という差が出ている。高度に並列化されており、リンク処理の全フェーズで利用可能な全コアを使い切る設計。デバッグビルドで編集→再ビルドを繰り返す開発サイクルでの恩恵が大きいとされる。

## 対応プラットフォーム

x86-64, i386, ARM64, ARM32, RISC-V(32/64bit, LE/BE), PowerPC(32/64bit), s390x, LoongArch, SPARC64, m68k, SH-4など幅広いISAに対応。

## ライセンスの変遷

- 元々[[agpl|AGPL]]ライセンスのOSSとして公開されていた。
- 開発初期の段階で、macOS対応など一部機能は「sold」という商用版(Blue Whale Systems社が販売、per-user課金)にゲートされていた。
- AGPL/商用のデュアルライセンス戦略が期待通りにはマネタイズできず、mold 2.0でAGPLコードをMITライセンスへ再ライセンスし、より広いユーザー獲得を狙う方針に転換した。

## Rustプロジェクトでの使い方

プロジェクト直下の`.cargo/config.toml`に以下のように書いておくとリンカとして利用できる。

```toml
[target.x86_64-unknown-linux-gnu]
linker = "clang"
rustflags = ["-C", "link-arg=-fuse-ld=/path/to/mold"]
```

## 自分の利用状況

Rust製Rakuインタプリタ「[[raku-rakudo-perl6|mutsu]]」のビルドで既にmoldを採用している。

## 出典

- [rui314/mold - GitHub](https://github.com/rui314/mold)
- [mold/README.md](https://github.com/rui314/mold/blob/main/README.md)
- [Mold 2.0 High Speed Linker Released: Moves From AGPL To MIT License - Phoronix](https://www.phoronix.com/news/Mold-2.0-Linker)
- [Mold linker: targeting macOS/iOS now requires a commercial license | Hacker News](https://news.ycombinator.com/item?id=34141912)
