---
created: 2026-08-19 15:26
updated: 2026-08-19 15:26
---
# 構成管理ツール

サーバーのセットアップ・状態維持を自動化する「Infrastructure as Code」系ツール群のハブノート。設計上の主な軸は次の2つ。

- **agent型 vs agentless型**: 管理対象ノードに常駐エージェントを置き、サーバー(master)からpullで設定を取得する方式か、SSHなどでサーバー側からpushする方式か。
- **DSLの種類**: Rubyのような汎用言語の内部DSLで書くか、独自の宣言的言語やYAMLで書くか。

## 構成管理ツール本体

- [[chef|Chef]] — Ruby DSL、agent/master・pull型。2020年にProgress Softwareが買収し「Progress Chef」に。
- [[puppet|Puppet]] — 独自の宣言的言語、agent/master・pull型。2022年にPerforceが買収、2025年の配布方針変更でコミュニティの反発とフォークの動きを招いた。
- [[ansible|Ansible]] — Red Hat開発、YAML Playbook、agentless・push型。SSH/WinRM経由で常駐エージェント不要。
- [[itamae|Itamae]] — ChefのDSLに影響を受けた日本発の軽量実装。Chef Serverなどの依存を持たない。
- [[mitamae|mitamae]] — Itamaeをmrubyで書き直し、単一バイナリ化・高速化した派生実装。

## 隣接する検証ツール

- [[serverspec|Serverspec]] — 上記ツール(あるいは手作業)で設定した結果をRSpec構文でテストする、構成管理ツールとは異なるカテゴリの検証ツール。

## 系譜のまとめ

[[chef|Chef]]のRuby DSLという発想は日本の[[itamae|Itamae]]に受け継がれ、さらに[[mitamae|mitamae]]がmrubyで書き直して単一バイナリ・高速化を実現するという派生関係にある。一方、[[puppet|Puppet]]は独自DSL・agent型という点でChefと共通の設計思想を持ちながら別系譜。[[ansible|Ansible]]はagentless・push型・YAMLという、これらとは異なる設計を選んだツールという位置づけになる。

#infrastructure-as-code #moc
