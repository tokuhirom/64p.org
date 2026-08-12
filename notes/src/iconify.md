---
created: 2026-08-13 07:43
updated: 2026-08-13 07:43
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

## セルフホスト

IconifyのAPI自体もアイコンセットもGitHubで公開されており、自前サーバーでホストすることも可能。

## ライセンス

Iconify本体はMITライセンス。ただし個々のアイコンデータは各アイコンセット固有のライセンスに従う。

## 出典

- [Iconify Icon Web Component](https://iconify.design/docs/iconify-icon/)
- [GitHub - iconify/iconify](https://github.com/iconify/iconify)
