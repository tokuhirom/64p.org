---
created: 2026-08-16 00:32
updated: 2026-08-16 00:32
---
# libfuseの高レベルAPIと低レベルAPI

[[fuse-filesystem-in-userspace|FUSE]]のユーザー空間ライブラリ`libfuse`は、ファイルシステムを実装するためのAPIを「高レベル(high-level)」「低レベル(low-level)」の2段階で提供している。高レベルAPIは低レベルAPIをラップする形で実装されており、自動的なinode追跡・パス解決・キャッシュを付加する。

## 同期・非同期モデル

最も根本的な違いは同期性。低レベルAPIは完全に非同期で、コールバックは明示的な`reply`用APIを使って結果を返す。一方、高レベルAPIは同期的で、コールバック関数がreturnした時点でリクエスト処理が完了する。

## パス名 vs inode

- **高レベルAPI**: ファイルシステム側はファイル名・パス名を使って操作を実装する。返り値（0または`-errno`）で成功/失敗を示す。inodeの管理はlibfuseが自動で行う。
- **低レベルAPI**: コールバックはinode番号とリクエストハンドルを使って操作する。FUSEが各エンティティに独自の「node ID」を割り当てて管理する。結果は`reply`関数で明示的に通知する。

## カーネルドライバとの連携

低レベルAPIはオプションをカーネルドライバへ直接通知できるが、高レベルAPIでは高レベルのオプションしかカーネルドライバに伝わらない。

## どちらを使うべきか

パフォーマンス自体は同程度とされる。選択基準はユースケース次第。

- シンプルな実装で済ませたい、学習コストを下げたい → **高レベルAPI**
- 細粒度のinode管理やカーネルとの連携が必要な高度な用途 → **低レベルAPI**

## 出典

- [FUSE Library Options and High- and Low-Level APIs — Stony Brook FSL](https://www.fsl.cs.stonybrook.edu/docs/fuse/fuse-article-appendices.html)
- [libfuse/libfuse — GitHub](https://github.com/libfuse/libfuse)

#fuse
