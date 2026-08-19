---
created: 2026-08-19 15:26
updated: 2026-08-19 15:26
---
# Puppet（構成管理ツール）

2005年にLuke Kaniesが創業した構成管理ツール。Rubyのような汎用言語のDSLではなく、独自の宣言的言語(Puppet言語)でシステムのあるべき状態をモデル駆動で記述する点が特徴。

## アーキテクチャ

[[chef|Chef]]と同様、クライアント(agent)がサーバー(master)から設定指示を取得して適用し、結果をレポートするagent/master型・pull型のアーキテクチャを取る。

## ライセンスと会社の変遷

open-coreモデルを採用しており、OSS版はApache Licenseで提供される一方、Puppet Enterpriseは商用ライセンス。開発元のPuppet, Inc.(米オレゴン州ポートランド)は2022年4月にPerforceに買収された。

## 2025年の配布方針変更とコミュニティの反発

2025年、Perforceはオープンソース版Puppetの配布方針を変更し、バイナリ・パッケージの配布先を非公開リポジトリへ移した。コミュニティ貢献者はEULAへの同意のもとアクセスが許可されるが、25ノードを超える利用には商用ライセンスが必要になった。この変更に反発したコミュニティの一部が、Perforceの手を離れた形でPuppetをフォークする動きを見せている。

## [[configuration-management-tools|構成管理ツール]]の中での位置づけ

[[chef|Chef]]と同じくagent/master・pull型だが、DSLがRubyの内部DSLではなく独自の宣言的言語である点が異なる。買収・ライセンス変更を経た点は、Red Hatに買収されつつもagentless設計ゆえに配布形態が大きく変わっていない[[ansible|Ansible]]とは対照的な経緯。

#infrastructure-as-code

## 出典

- [Puppet (software) - Wikipedia](https://en.wikipedia.org/wiki/Puppet_(software))
- [Perforce Forks Puppet, Community Considers Muppet - DevOps.com](https://devops.com/perforce-forks-puppet-community-considers-muppet/)
- [Puppet Extends Enterprise-Grade Automation to Network and Edge Devices | Perforce Software](https://www.perforce.com/press-releases/puppet-edge)
