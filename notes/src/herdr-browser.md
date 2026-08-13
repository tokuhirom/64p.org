---
created: 2026-08-10 15:21
updated: 2026-08-13 21:20
---
# herdr-browser

[[herdr]]のペイン内に本物のChromiumビューをレンダリングし、Chrome DevTools Protocol (CDP) 経由で操作できるようにするHerdrプラグイン。

## 特徴

- 本物のChromiumのスクリーンキャストをペイン内にライブストリーミングし、スクロール・クリック・ホバー・ズーム・タブ切り替えが可能
- クライアント接続中もペインは完全にインタラクティブなままで、クリックやスクロール、タイピングなどは自動化クライアント（[[playwright|Playwright]]など）が見ているのと同じターゲットに対して作用する。エージェントの実行中に人間が介入して操作を奪い、また戻すこともできる
- localhostへのリンクをCtrl-クリックすると、コードの隣にブラウザが開く。[[playwright|Playwright]]など任意のCDPツールをそこに向けて、エージェントがブラウザを操作する様子を見ながら必要に応じてマウスを奪える
- Herdrセッションごとに専用の永続プロファイルを持つ別プロセスのheadless Chromiumを起動する

Herdr開発元(herdrdev)のX投稿でも「みんなHerdrにブラウザが欲しいと言い続けていた」と言及されており、ユーザー要望から生まれた機能。実装は`ogulcancelik/herdr-browser`のほか、`StructuPath/herdr-browser`という派生実装も存在する。

## [[herdr]]の中での位置づけ

herdr本体はターミナルマルチプレクサとしてエージェントのPTYを束ねる役割に徹しており、ブラウザ操作の可視化はherdr-browserというプラグインとして別途提供されている。

#claude-code #tmux

## 出典

- [GitHub - ogulcancelik/herdr-browser](https://github.com/ogulcancelik/herdr-browser)
- [GitHub - StructuPath/herdr-browser](https://github.com/StructuPath/herdr-browser)
- [people kept asking for a browser in herdr - x.com/herdrdev](https://x.com/herdrdev/status/2081790556804411782)
- [Getting Started & Configuration | ogulcancelik/herdr-browser | DeepWiki](https://deepwiki.com/ogulcancelik/herdr-browser/1.1-getting-started-and-configuration)
- [Plugins | herdr](https://herdr.dev/docs/plugins/)
