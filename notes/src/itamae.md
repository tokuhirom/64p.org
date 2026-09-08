---
created: 2026-08-19 15:26
updated: 2026-09-08 15:07
---
# Itamae（構成管理ツール）

[[chef|Chef]]にインスパイアされた、日本発のシンプル・軽量な構成管理ツール。旧称はLightchef。

## Chefとの違い

Chef風のRuby DSLを採用しつつも互換性はなく、Chef Serverのような集中管理サーバーは不要。CookbookやRoleといった複雑な概念を持たず、レシピ機能に特化したシンプルな実装になっている。べき等性を持ち、繰り返し実行しても安全に動作する。

## DSLの例

```ruby
package 'nginx' do
  action :install
end

service 'nginx' do
  action [:enable, :start]
end
```

## 実行方法

- ローカル実行: `itamae local recipe.rb`
- SSH経由のリモート実行: `itamae ssh --host example.jp recipe.rb`
- Vagrant: `itamae ssh --vagrant --host vm_name recipe.rb`

## 基盤ライブラリ

OSごとの差異(パッケージマネージャの違い、サービス管理がsystemdかSysVinitかなど)の吸収は、[[serverspec|Serverspec]]と共通の基盤ライブラリであるSpecinfraが担っている。同じ抽象の上に「状態を適用する側」と「状態を検証する側」が乗っている格好になる。

## 高速な代替実装

MRI(標準Ruby処理系)上で動くItamaeに対し、mrubyで書き直して単一バイナリ化・高速化した代替実装として[[mitamae|mitamae]]がある。`itamae ssh`は1つのリソースを処理するたびにSSH越しにコマンドを実行するため、リソース数が増えるとその往復が積み上がる。mitamaeはバイナリとレシピを対象ホストへ送り込んでローカル実行する方針を取ることで、この往復自体をなくしている。

## [[configuration-management-tools|構成管理ツール]]の中での位置づけ

[[chef|Chef]]のRuby DSLを踏襲しつつ、Chef Serverなどの依存を排したシンプル路線。同種の思想をさらに推し進めたのが単一バイナリ版の[[mitamae|mitamae]]。同じくagentlessな[[ansible|Ansible]]とは、対象ノードにPython処理系を要求するか(Ansible)、SSH越しのコマンド実行だけで済ませるか(Itamae)という点で異なる。

#infrastructure-as-code #ruby

## 出典

- [GitHub - itamae-kitchen/itamae](https://github.com/itamae-kitchen/itamae)
- [Itamae Wiki](https://github.com/itamae-kitchen/itamae/wiki)
