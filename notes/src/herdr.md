---
created: 2026-08-10 15:18
updated: 2026-08-10 15:21
---
# herdr

複数のAIコーディングエージェント（Claude Code、Codex、OpenCodeなど）を1つのターミナルからまとめて管理するRust製のターミナルマルチプレクサ。「one terminal for the whole herd」がモットーで、「herd(群れ)」が名前の由来。

## 特徴

- tmuxライクな操作感で、デフォルトのキーバインドもtmuxと同一
- 主要なターミナルベースAIエージェントを追加設定なしで自動検出
- サイドバーに各エージェントの状態(作業中・アイドル・入力待ちなど)が一覧表示され、複数エージェントの並行実行状況を一目で把握できる
- 単一バイナリで配布される軽量なツール
- 2026年3月にリリース

複数のAIコーディングエージェントを並行稼働させる際に「今どのエージェントが何をしているか分からない」という課題を、tmuxを拡張する形で解決するツール。

ブラウザをペイン内に表示する[[herdr-browser]]というプラグインも存在する。

#claude-code #tmux

## 出典

- [herdr を使いこなす: 複数 AI エージェントの連携から自作プラグインまで - TECHSCORE BLOG](https://blog.techscore.com/entry/2026/08/03/080000)
- [herdr 入門：AIエージェントを束ねるマルチプレクサ - Qiita](https://qiita.com/takish/items/5ef1eeee97e6e48404e3)
- [AIエージェント時代のターミナルマルチプレクサ「herdr」にtmuxから乗り換えた - Zenn](https://zenn.dev/studypocket/articles/herdr-ai-agent-multiplexer)
- [【2026年7月版】AIエージェント多重化ターミナル「Herdr」を触ってみた - note](https://note.com/kazu_t/n/nb4958baf3290)
- [AIエージェント時代のターミナルマルチプレクサ「Herdr」を使う - Don't Repeat Yourself](https://blog-dry.com/entry/2026/06/30/234346)
