---
created: 2026-08-10 19:42
updated: 2026-08-10 19:42
---
# Prettier

JavaScript/TypeScriptを中心に、HTML・CSS・JSON・Markdown・YAMLなど幅広い言語に対応するコードフォーマッター(自動整形ツール)。 #javascript

## オピニオン型という設計思想

ESLintのように何十個ものルールを個別に選ぶ必要がなく、設定項目を最小限にして「いい感じ」に整形してくれるよう設計されている。保存時に自動でルールに沿ってコードを書き換える。

## 導入

`npm install --save-dev prettier` でインストールし、`npx prettier --write .` で整形を実行する。

## 利点

開発者ごとのコードスタイルのバラつきをなくし、コードレビューで「インデントが」といったスタイルに関する議論が発生しなくなる。

## 新世代ツールとの関係

[[biome|Biome]]や[[oxc|Oxc]]など、Rust製の高速な後発ツールが「Prettier比で何倍高速」と比較対象にする、業界標準的な既存フォーマッターという位置づけになっている。

## 出典

- [Prettierとは？意味・読み方・使い方・設定・ESLintとの違い](https://www.issoh.co.jp/tech/details/3354/)
- [コードフォーマッター「Prettier」を初心者にも分かりやすく解説 - Qiita](https://qiita.com/Junpei_Takagi/items/3983cc735e71ea3917fd)
- [Prettierの導入方法 - フロントエンド開発で必須のコード整形ツール - ICS MEDIA](https://ics.media/entry/17030/)
