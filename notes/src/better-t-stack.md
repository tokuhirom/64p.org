---
created: 2026-08-14 20:21
updated: 2026-08-14 20:21
---
# Better-T-Stack

TypeScriptベースのフルスタックプロジェクトをワンコマンドでスキャフォールドするCLIツール。開発元は AmanVarshney01、リポジトリは `better-t-stack/create-better-t-stack`、MITライセンス。 #typescript

設計思想は「roll your own stack」— 必要な技術だけを選び、余計なものは入れない方針。ゼロブロートな最小テンプレートで、常に最新の安定版依存パッケージを使い、ベンダーロックインを避けることを謳っている。

## 使い方

対話式CLI、または[ブラウザのStack Builder](https://www.better-t-stack.dev/new)で技術構成を選択し、生成されたコマンドをコピーする2通りの導線がある。

```sh
bun create better-t-stack@latest
# または
pnpm create better-t-stack@latest
# または
npx create-better-t-stack@latest
```

## 選択できる技術要素

- フロントエンド: Next.js, React(TanStack Router), Nuxt, Svelte, SolidJS, React Native
- バックエンド: Hono, Express, Fastify, Next API Routes, Convex
- ランタイム: Bun, Node.js, Cloudflare Workers
- DB: SQLite, PostgreSQL, MongoDB
- ORM: Drizzle, Prisma, Mongoose
- 認証、モノレポ構成(Turborepo)、ドキュメント生成(Fumadocs)、デプロイ設定なども選択肢に含まれる

## その他

AIエージェントのワークフロー向けに、MCPサーバーとして起動する使い方も用意されている。

## 出典

- [Better-T-Stack公式サイト](https://www.better-t-stack.dev/)
- [GitHub: better-t-stack/create-better-t-stack](https://github.com/better-t-stack/create-better-t-stack)
- [npm: create-better-t-stack](https://www.npmjs.com/package/create-better-t-stack)
