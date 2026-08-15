---
created: 2026-08-14 22:35
updated: 2026-08-15 16:18
---
# Valibot

TypeScript向けのスキーマ検証ライブラリ。実行時に不明な構造化データを検証しつつ、そのスキーマからTypeScriptの型を推論できる。[Zod](https://zod.dev/)と同じ問題領域を扱うツールで、比較対象として並べて語られることが多い。

作者はFabian Hiller。シュトゥットガルトメディア大学の卒業論文の一環として開発された（指導教員はWalter Kriha、Miško Hevery、Ryan Carniato）。Hillerは複数のバリデーションライブラリ間の共通インターフェース仕様であるStandard Schemaの共同作成者でもある。

#typescript #validation

## 設計思想: モジュラーアーキテクチャ

Zodが「多数のメソッドを持つ少数の大きな関数（オブジェクトにメソッドをチェーンする方式）」で構成されるのに対し、Valibotは「単一責務を持つ多数の小さく独立した関数」を組み合わせる設計を採る。

```ts
import * as v from 'valibot';

const LoginSchema = v.object({
  email: v.pipe(v.string(), v.email()),
  password: v.pipe(v.string(), v.minLength(8)),
});
```

この違いにより、esbuildなどのバンドラーが静的インポート解析でツリーシェイキングを効かせやすく、実際に使った関数のコードだけが本番バンドルに残る。

## バンドルサイズ

最大の売りはバンドルサイズの小ささ。シンプルなログインフォーム検証で比較すると、Zod(標準)が17.7kBに対しValibotは1.37kB（約90%削減）。関数型APIに寄せた"Zod Mini"（約6.88kB）と比べても3〜5倍小さいとされる。クライアントサイドバリデーション（フォーム等）で起動時間（TTI）を短縮したい場面に向く設計。

## 実行時パフォーマンス

強みは「起動パフォーマンス」であり、実行時のバリデーション速度自体はZod v4と同程度で中位。コンパイラ方式で事前にバリデーションコードを生成する[Typia](https://typia.io/)や[TypeBox](https://github.com/sinclairzx81/typebox)ほどは速くない。

## エコシステム

週間ダウンロード数はZodが約1.79億に対しValibotは約1090万と、採用規模はZodが大きく上回る。React Hook Form・tRPC・[[openapi|OpenAPI]]生成・AI SDKの構造化出力などではZodがデファクトスタンダード。一方Valibotは SvelteKitのSuperformsで一級サポートされているほか、`@valibot/to-json-schema`（JSON Schema出力）、`@valibot/i18n`（多言語エラーメッセージ）などの補助パッケージが用意されている。

## 使い分け

バンドルサイズとツリーシェイキングを重視するエッジ関数・ブラウザ配信のバリデータにはValibot、エコシステムの厚みとAPIの馴染みやすさを取るならZod、という棲み分けになる。

## 出典

- [Valibot 公式サイト](https://valibot.dev/)
- [Comparison with Zod and others | Valibot](https://valibot.dev/guides/comparison/)
- [Zod vs Valibot in 2026: Schema Validation Bundle Size and DX Compared | SouvenirList](https://souvenirlist.com/blog/zod-vs-valibot-2026/)
- [fabian-hiller (Fabian Hiller) · GitHub](https://github.com/fabian-hiller)
- [Fabian Hiller - Valibot, Standard Schema, Formisch - devtools.fm](https://podcasts.apple.com/us/podcast/fabian-hiller-valibot-standard-schema-formisch/id1566647758?i=1000747658676)
