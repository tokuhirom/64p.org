---
created: 2026-08-16 07:32
updated: 2026-08-16 07:32
---
# fuser (Rustクレート)

[[fuse-filesystem-in-userspace|FUSE]]ファイルシステムをRustで実装するためのクレート。単なる`libfuse`へのバインディングではなく、「Cで書かれた元のFUSEライブラリをRustのアーキテクチャを活かして書き直したもの」を謳っている。[zargony/fuse-rs](https://github.com/zargony/fuse-rs)というクレートからフォークして開発を継続する形で始まった。 #rust #linux #ファイルシステム

## アーキテクチャ: `libfuse`なしのpure-Rust実装がデフォルト

FUSEは通常「カーネルドライバ」「ユーザー空間ライブラリ(`libfuse`)」「ユーザー空間実装」の3層構造だが、fuserは`libfuse`を置き換える形でユーザー空間ライブラリ部分を担う。README曰く「mount/unmountの1回の呼び出しを除いて全部Rustで動く。Linuxではこの`libfuse`呼び出し自体もオプション」。

`Cargo.toml`を見ると`libfuse`フィーチャは`default = []`に含まれていない。`build.rs`もLinux/FreeBSD等で`libfuse`フィーチャが無効な場合には`fuser_mount_impl="pure-rust"`という設定を選ぶ実装になっている。そのため`libfuse3-dev`のようなヘッダパッケージを一切インストールせずにビルド・マウントできる（[[fuse-hello-world-experiment]]で確認済み）。`libfuse`/`libfuse3`フィーチャを明示的に有効化すれば、従来通りCの`libfuse`にリンクする実装に切り替えることもできる。

## API設計

`Filesystem`トレイトを実装する形の低レベルAPI。`lookup`/`getattr`/`read`/`readdir`のようなコールバックをino番号ベースで自分で実装する。[[libfuse-api-levels|libfuseの高レベル/低レベルAPI]]でいう低レベルAPI相当の設計にあたる。

## 対応OS・ライセンス

- Linux（開発・テストの主対象、fuse/fuse3両対応）
- macOS（10.9以降、Apple Siliconはkext有効化が必要）
- FreeBSD
- MITライセンス

## 開発方針: コーディングエージェント主体への転換を明言

READMEに以下のように明記されている。

> Version 0.18.0 is the last version that was primarily developed without coding agents.
> Future releases will be developed primarily by a coding agent, as I believe this will lead to higher quality code, and faster feature development.
> All the changes will receive at least a cursory review from a human, and a full review from a coding agent.

つまり0.18.0が「コーディングエージェントを使わず人間主体で開発された最後のバージョン」で、それ以降はコーディングエージェントが主体で開発する方針に転換したと公式に宣言している。すべての変更は人間による簡易レビューと、コーディングエージェントによるフルレビューを受けるとしている。

## 出典

- [fuser/README.md at master · cberner/fuser](https://github.com/cberner/fuser/blob/master/README.md)
- [GitHub - cberner/fuser](https://github.com/cberner/fuser)
- [GitHub - zargony/fuse-rs](https://github.com/zargony/fuse-rs)
