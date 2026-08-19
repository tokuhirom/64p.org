---
created: 2026-08-19 15:26
updated: 2026-08-19 15:26
---
# Chef（構成管理ツール）

Rubyの内部DSL(cookbook/recipe)でインフラ構成をコードとして記述する構成管理ツール。「Infrastructure as Code」を早期に実践したツールの一つ。

## アーキテクチャ

Chef Server(または Chef Zero などのローカルモード)にクライアント(agent, `chef-client`)が定期的に問い合わせ、cookbookを取得して自身に適用するpull型。適用結果はChef Serverにレポートされ、フリート全体の状態を一元管理できる。

## 会社としての変遷

2020年にProgress Softwareが買収し、以降「Progress Chef」の名称でも展開されている。Chef Infra(構成管理)を中心に、アプリケーション配信・コンプライアンス機能なども含むポートフォリオを提供している。

## 影響を受けたツール

日本では、Chefに影響を受けつつもChef Serverなどを必要としない軽量な代替実装として[[itamae|Itamae]]が作られた。Itamaeの高速版[[mitamae|mitamae]]も含め、いずれもChef風のRuby DSLを踏襲している。

## [[configuration-management-tools|構成管理ツール]]の中での位置づけ

Ruby DSL・agent常駐・pull型を採用する構成管理ツールの代表格。[[puppet|Puppet]]と並ぶ「独自DSL＋agent/master型」の老舗であり、[[ansible|Ansible]]のagentless/push型とは設計思想が対照的。

#infrastructure-as-code #ruby

## 出典

- [Configuration Management System Software - Chef Infra | Chef](https://www.chef.io/products/chef-infra)
- [Progress Chef - Wikipedia](https://en.wikipedia.org/wiki/Progress_Chef)
- [The Top 5 Configuration Management Tools for 2024 | Chef](https://www.chef.io/blog/top-5-configuration-management-tools-2024)
