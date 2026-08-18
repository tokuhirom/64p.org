---
created: 2026-08-18 20:47
updated: 2026-08-18 20:47
---
# SourceHut

Drew DeVault(sircmpwn)が開発する、オープンソース開発者向けの統合開発プラットフォーム。「the hacker's forge」を名乗る。ドメインは`sr.ht`。現在はパブリックアルファ版として提供されている。

## 特徴

GitHub・GitLabのような一般的なフォージ(git hosting + Issue + CI等の統合サービス)とは思想面で大きく異なる。

- **メール中心のワークフロー** — GitHub型のPull Request方式ではなく、メーリングリストでパッチをやり取りする伝統的な(Linuxカーネル的な)開発スタイルを採用している。パッチレビューと検索可能なメールアーカイブが中心的な役割を持つ。
- **トラッキング・広告なし** — ユーザートラッキングや広告が一切ない。
- **JavaScript不要** — 全機能がJSなしで動作する。
- **AI機能なし** — 明示的にAI機能を実装していない。
- **完全にフリー・オープンソース** — プラットフォーム自体もOSSで、自前でセルフホストすることも可能。

## 構成(mini-services群)

単一の巨大なアプリケーションではなく、独立した小さなサービス群として構成されている。

- Git / Mercurial リポジトリホスティング(公開・非公開・非表示に対応)
- 継続的インテグレーション(複数Linuxディストロ・BSDで仮想化ビルド)
- メーリングリスト+検索可能なアーカイブ
- チケット(Issue)トラッカー
- IRCボウンサー/Webチャット
- Git管理のMarkdown Wiki
- `hut export`によるデータのバックアップ・移行機能

## 利用例

Go言語のGPUベースGUIライブラリ[[go-gui-libraries|Gio]]は元々SourceHut上(`git.sr.ht/~eliasnaur/gio`)で開発されており、GitHubはミラーという位置づけになっている。

#git #vcs

## 出典

- [sourcehut - the hacker's forge](https://sourcehut.org/)
- [sourcehut: A software development platform for hackers](https://sr.ht/~sircmpwn/sourcehut/)
