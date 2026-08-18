---
created: 2026-08-12 08:17
updated: 2026-08-18 16:44
---
# hunk(AIエージェント向けCLI diffビューア)

modem-dev製の、ターミナル上で動くdiffビューア(TUI)。「Review-first terminal diff viewer for agentic coders」と銘打たれており、Claude Codeのようなコーディングエージェントが生成する差分をレビューするために作られている。

## 背景にある問題意識

コーディングエージェントは人間より大きな差分を、より速いサイクルで生成する。その結果、変更の文脈がチャットログ側に流れてしまい、diff単体からは意図が読み取りにくくなる。hunkは「レビューを主作業にする」ことを狙ったツールで、変更セット全体を上から下へ連続して読めるナビゲーション可能なビューに、エージェントの残した文脈を突き合わせて表示する。

## 主な機能

- git diff・パッチファイル・2ファイル比較を、シンタックスハイライト付き・split/unified切替可能なフルスクリーンTUIでレンダリング。
- 複数ファイルにまたがる変更をサイドバー順に上から下へ連続して読める「レビューストリーム」形式。1ファイルずつ切り替える従来のpager型diffツールとは異なる。
- エージェントがサイドカーファイルに残した注釈(要約・根拠・作成者)を、該当hunkの直上にインラインで表示できる。
- watchモード: ファイルの変更を検知してライブ更新。
- Git/[[jujutsu|Jujutsu]]/[[sapling|Sapling]] に対応。jj・Sapling環境では自動検出してネイティブのrevsetを使う。

## インストールと基本コマンド

```sh
npm i -g hunkdiff   # Node.js 18+
# もしくは
brew install hunk
```

- `hunk diff`: 現在のリポジトリの変更(未追跡ファイル含む)をレビュー
- `hunk show`: 直近のコミットをレビュー
- `hunk --version`: バージョン表示

## 「hunk」という用語について

そもそも diff における hunk とは、変更箇所(追加/削除された行)とその前後の文脈行をまとめた1ブロックを指す一般的な用語。unified diff形式では `@@ -1,3 +1,4 @@` のようなヘッダーで各hunkが区切られる。`git add -p` などのhunk単位での対話的操作もこの単位に基づく。ツール名の「hunk」はこの用語に由来する。

#cli #git #ai-agent

## 出典

- [GitHub - modem-dev/hunk](https://github.com/modem-dev/hunk)
- [hunk — review-first terminal diff viewer](https://www.hunk.dev/)
- [Install | hunk](https://www.hunk.dev/docs/start/install/)
- [Getting Started | modem-dev/hunk | DeepWiki](https://deepwiki.com/modem-dev/hunk/1.1-getting-started)
