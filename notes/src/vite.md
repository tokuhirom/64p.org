---
created: 2026-08-13 09:14
updated: 2026-08-13 09:14
---
# Vite

フランス語で「素早い」を意味する、フロントエンド向けのビルドツール。Evan You氏(Vue.jsの作者)が開発し、2020年4月に初版がリリースされた。「dev server」と「本番ビルド」の2つの主要機能で構成される。

## 誕生の背景

従来型のバンドラーベースの開発サーバーは「アプリ全体を事前にバンドルしてからブラウザに渡す」方式だったため、アプリが大きくなるほど起動やHMR(Hot Module Replacement)が遅くなるという課題があった。Viteはブラウザのネイティブ ES モジュール対応を活かし、処理を2つに分割することでこれを解決した。

- **依存関係(node_modulesなど)**: esbuildで高速に事前バンドル
- **自分のソースコード**: ネイティブESMでオンデマンド配信し、ブラウザが必要なファイルだけを読み込む

これにより、アプリのサイズに関わらずdev serverの起動とHMRが高速なまま保たれる。

## ビルドパイプラインの変化

Viteは長らく「開発時はesbuild、本番ビルド時は[[rollup|Rollup]]」という2つの異なるツールを使い分けていたが、この不一致を解消するため、Rust製バンドラー[[rolldown|Rolldown]]へ移行し、単一の一貫したパイプラインを実現しつつある(Vite 8でデフォルト採用予定)。

## 関連

- [[vitest|Vitest]]はVite上に構築されたテストフレームワーク

## 出典

- [Getting Started | Vite](https://vite.dev/guide/)
- [Why Vite | Vite](https://vite.dev/guide/why)
- [Vite (software) - Wikipedia](https://en.wikipedia.org/wiki/Vite_(software))
