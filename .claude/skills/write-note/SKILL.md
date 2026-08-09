---
name: write-note
description: 64p.org の /notes/ コーナーに新しい調査メモ（ノート）を追加する。ちょっと調べたことやAIに調査させた結果、コードスニペットなどを書き残したいときに使う。「ノート書いて」「これメモっといて」のような依頼で使う。
---

# Notesの書き方

64p.org には `/notes/` というコーナーがある。tokuhirom個人が、ちょっと調べたことやAIの調査結果を書き残しておく場所（Obsidian Publish風のデザイン）。ちゃんとした記事は blog.64p.org 側に書くので、ここはラフなメモでよい。

## 新しいノートを追加する手順

1. `notes/src/` 配下に新しい Markdown ファイルを作る。ファイル名は英数字とハイフンの kebab-case (例: `perl-signal-handling.md`)。
2. 1行目に `# タイトル` の形でタイトルを書く。タイトルは日本語でよい（むしろ日本語で書く）。
3. 本文はMarkdown。コードスニペットを載せる場合はフェンス付きコードブロックで言語を指定する(` ```perl ` のように)。シンタックスハイライトが自動で効く。
4. 書き終えたら以下を実行してHTMLを再生成する。

   ```sh
   perl regen-index.pl
   ```

   `notes/<slug>.html`、`notes/index.html`、トップページ (`index.html`) のNotes欄がまとめて更新される。

5. 生成されたHTMLも含めてコミットする。このリポジトリは生成物もgit管理してGitHub Pagesでそのまま配信しているため、`.gitignore`されていない。
6. mdのみ(および付随する生成物)の変更なら、ブランチを切ってPRを作らずに直接masterへpushしてよい。テンプレートやビルドロジックなどコードに手を入れた場合は従来通りPRを作る。

## 書き方のトーン

- ラフなメモでOK。前置きや読者への配慮は不要（tokuhirom個人用のメモなので）。
- 日本語で書く。
- 検証結果やコマンド例など、具体的な内容を優先する。

## 初回セットアップ

`Text::Xslate` や `Text::Markdown::Discount` が入っていない場合:

```sh
cpanm --installdeps .
```

## 関連ファイル

- `notes/src/*.md` — ノートのMarkdownソース
- `regen-index.pl` の `TGP::Notes` パッケージ — ビルドロジック
- `tmpl/note.tt` / `tmpl/notes-index.tt` / `tmpl/notes-sidebar.tt` — テンプレート
- `static/notes.css` / `static/notes.js` — スタイルとサイドバー検索・テーマ切替
