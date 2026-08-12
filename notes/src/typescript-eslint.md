# typescript-eslint

TypeScriptコードを[[eslint|ESLint]]でlintできるようにするツール群（パーサーとプラグインのモノレポプロジェクト）。ESLint本体はJavaScriptのみを解釈するため、TypeScript対応はこのプロジェクトがプラグインとして担っている。 #javascript #typescript

## TSLintからの移行

かつてTypeScriptにはTSLintという専用リンターがあったが、2019年に非推奨（deprecated）となり、公式にtypescript-eslintへの移行が推奨された。以降、JavaScript/TypeScript両方のlintをESLintエコシステムに一本化するのが標準になっている。移行用に設定変換ツール（tslint-to-eslint-config）も提供された。

## type-aware linting（typed linting）

typescript-eslintの特徴的な機能が、TypeScriptコンパイラの型情報を使ってコードを検査する「型認識lint（type-aware linting / typed linting）」。型情報がないと検出できない問題（例: Promiseのawait忘れ）を検出できる。ただしlint前にTypeScriptによるプロジェクトのビルド相当の処理が必要になるため、性能上のコストがかかる。

[[biome|Biome]] v2が「TypeScriptコンパイラに依存しない型認識lint」を打ち出しているのは、このコストへの対案という文脈。

## [[javascript-linters-formatters|JavaScriptのリンター・フォーマッター]]の中での位置づけ

[[eslint|ESLint]]のプラグイン機構の上に成立している拡張であり、ESLintエコシステムの代表例。[[biome|Biome]]のリンターが搭載するルールの由来元のひとつでもある。

## 出典

- [typescript-eslint](https://typescript-eslint.io/)
- [What About TSLint? | typescript-eslint](https://typescript-eslint.io/users/what-about-tslint/)
- [Typed Linting: The Most Powerful TypeScript Linting Ever | typescript-eslint](https://typescript-eslint.io/blog/typed-linting/)
