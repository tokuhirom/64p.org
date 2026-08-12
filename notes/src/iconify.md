---
created: 2026-08-13 07:43
updated: 2026-08-13 07:45
---
# Iconify

複数のオープンソースアイコンセットを統一した記法で扱えるアイコンフレームワーク。個々のアイコンライブラリを直接使うのではなく、それらを束ねる統合レイヤーとして機能する。

#icon #frontend #web

## 対応規模

Font Awesome、Material Design Icons、Feather Icons、Noto Emojiなど200以上のアイコンセット、約25万個以上のアイコンに対応する。セットをまたいでも同じ統一シンタックスで参照できる。

## 仕組み

Iconify自体はアイコンデータを内包せず、使用するアイコンだけをAPI経由でオンデマンドに取得する。従来のアイコンフォント/SVGスプライトのように未使用アイコンまでバンドルに含める必要がなく、地理分散サーバーで低遅延を実現している。

## 利用方法

- 全フレームワーク共通で使える`iconify-icon`というWeb Component
- React/Vue/Svelte向けの専用コンポーネント
- Figma/Sketch/Adobe XD向けのデザインプラグイン

## Font Awesomeなど個別のアイコンセットとの関係性

Font Awesomeは1つの統一デザイン言語を持つ独立したアイコンセット（公式のReact/Vue/Angular連携、CDN配布、Pro版は年額$99〜のサブスクリプション課金）。一方Iconifyはそれ自体がアイコンを作るのではなく、Font Awesome（オープンソース版）を含む200以上の既存アイコンセットを統一シンタックスで横断的に扱うための集約レイヤーで、実際にIconifyのアイコン検索サイトにも「Font Awesome Solid」「Font Awesome 6 Brands」がそのまま収録されている。したがって両者は対等な競合というより、「1つのアイコンセット」対「複数のアイコンセット（Font Awesomeも含む）を束ねる仕組み」という関係にある。

## セルフホスト

IconifyのAPI自体もアイコンセットもGitHubで公開されており、自前サーバーでホストすることも可能。

## ライセンス

Iconify本体はMITライセンス。ただし個々のアイコンデータは各アイコンセット固有のライセンスに従う。

## 出典

- [Iconify Icon Web Component](https://iconify.design/docs/iconify-icon/)
- [GitHub - iconify/iconify](https://github.com/iconify/iconify)
