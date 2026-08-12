---
created: 2026-08-13 00:41
updated: 2026-08-13 07:30
---
# PGlite

[[postgresql|PostgreSQL]]を[[wasm|WebAssembly]]にコンパイルし、TypeScript/JavaScriptクライアントライブラリとしてパッケージ化したもの。ElectricSQLプロジェクトが開発している。ブラウザ・Node.js・Bun・Denoで動作し、gzip後3MB以下と軽量。

#postgresql #wasm #database #javascript

## アーキテクチャ上の特徴

従来の「ブラウザでPostgresを動かす」系のプロジェクトはLinux仮想マシンをWasm上でエミュレートしてその中でPostgresを走らせる方式が多かったが、PGliteはLinux VMを使わず、Postgres自体を直接Wasmにコンパイルしている。単一ユーザー・単一コネクション向けの設計になっており、従来のマルチプロセス型Postgresとは前提が異なる。

## 基本的な使い方

```javascript
import { PGlite } from "@electric-sql/pglite";
const db = new PGlite();
await db.query("select 'Hello world' as message;");
```

## 永続化

- インメモリ（一時利用向け、デフォルト）
- ファイルシステム（Node/Bun/Deno）: `new PGlite("./path/to/pgdata")`
- IndexedDB（ブラウザ）: `new PGlite("idb://my-pgdata")`

## 拡張機能

[[pgvector]]やPostGISなど複数のPostgres拡張に対応する。

## 想定用途

- テストごとに独立したPostgresインスタンスを立てるテスト環境
- サーバー不要なローカル開発・Web container統合
- ブラウザ内でpgvectorを使ったエッジAI・ローカルRAG

## ライセンス

Apache 2.0とPostgreSQL Licenseのデュアルライセンス。

## 出典

- [What is PGlite | PGlite](https://pglite.dev/docs/about)
- [GitHub - electric-sql/pglite](https://github.com/electric-sql/pglite)
