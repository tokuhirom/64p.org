---
created: 2026-08-13 09:09
updated: 2026-08-13 09:14
---
# Rolldown

Rustで書かれた次世代JavaScript/TypeScriptバンドラー。[[rollup|Rollup]]互換のAPI・プラグインインターフェースを提供しつつ、スコープとしてはesbuildに近いものを目指している。

VoidZero Inc.(Vue.jsの作者Evan You氏が設立した会社)が開発を主導している。パース処理には同社の別プロジェクトであるOxc(Rust製JS/TSパーサー・ツールチェーン)を使用し、Node.jsとの連携にはnapi-rsによるネイティブアドオンを利用している。

## 性能

esbuild相当のネイティブ速度で動作し、Rollup比で10〜30倍高速とされる。実例として、GitLabはビルド時間を2.5分から40秒に短縮し、Excalidrawは16倍高速化したと報告されている。

## Viteとの関係

[[vite|Vite]]はこれまで、開発時にesbuild・本番ビルド時にRollupという2つの異なるバンドラーを使い分ける構成だった。Rolldownはこの二重構成をRust製バンドラー1つに統一することを目指すプロジェクトで、開発ツール(Vite)・バンドラー(Rolldown)・コンパイラ(Oxc)をすべてVoidZeroが同じチームで維持する構成になる。

`rolldown-vite`パッケージとして試験的に利用可能になっており、Vite 8でデフォルトバンドラーとして採用される予定。プラグインはVite/Rollupプラグインであればそのまま試せるレベルの互換性が重視されている。

## 出典

- [rolldown/rolldown - GitHub](https://github.com/rolldown/rolldown)
- [Announcing Rolldown-Vite | VoidZero](https://voidzero.dev/posts/announcing-rolldown-vite)
- [Rolldown Integration | Vite](https://v7.vite.dev/guide/rolldown)
- [Vite 8 Beta: The Rolldown-powered Vite](https://vite.dev/blog/announcing-vite8-beta)
