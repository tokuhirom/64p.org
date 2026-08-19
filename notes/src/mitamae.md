---
created: 2026-08-19 15:26
updated: 2026-08-19 15:26
---
# mitamae

[[itamae|Itamae]]の代替実装(alternative implementation)。mrubyで駆動する、高速・軽量・単一バイナリの構成管理ツール。

## 特徴

- **単一バイナリ**: バイナリ1つをサーバーに転送するだけで展開できる。MRI(標準Ruby処理系)は不要。
- **高速**: Itamae本家がシェルコマンド経由・SSH越しに処理するのに対し、mitamaeはmrubyのC関数を活用してローカルで処理するため高速。
- **依存が少ない**: Chef Server、Berkshelf、Data Bags、RubyGemsすら不要。本質的な機能のみを提供する設計思想。

## 使い方の例

```ruby
# recipe.rb
package 'nginx' do
  action :install
end

service 'nginx' do
  action [:enable, :start]
end
```

```sh
mitamae local recipe.rb --log-level=debug
```

`directory`, `file`, `package`, `service`などの主要リソースは[[itamae|Itamae]]本家に準拠しており、[Itamaeのwiki](https://github.com/itamae-kitchen/itamae/wiki)がそのままドキュメントとして参照できる。Serverspecがサポートする全OS向けにマルチアーキテクチャのバイナリが配布されている。

## [[configuration-management-tools|構成管理ツール]]の中での位置づけ

[[itamae|Itamae]]をmrubyで書き直し、単一バイナリ配布・高速化を実現した派生実装。シンプルさを追求する路線をさらに推し進めたツール。

#infrastructure-as-code #ruby #mruby

## 出典

- [GitHub - itamae-kitchen/mitamae](https://github.com/itamae-kitchen/mitamae)
- [GitHub - eagletmt/mitamae](https://github.com/eagletmt/mitamae)
- [itamae-kitchen/mitamae | DeepWiki](https://deepwiki.com/itamae-kitchen/mitamae)
