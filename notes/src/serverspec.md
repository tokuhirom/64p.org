---
created: 2026-08-19 15:26
updated: 2026-08-19 15:26
---
# Serverspec

Gosuke Miyashita(GitHub: mizzy)が開発したRuby gem。RSpecの構文でサーバーの状態をテストするためのツール。

## 位置づけ

[[chef|Chef]]・[[puppet|Puppet]]・[[ansible|Ansible]]・[[itamae|Itamae]]など、あるいは手作業でセットアップしたサーバーでも、設定した「結果」が意図通りになっているかをRSpecのテストとして検証できる。構成管理ツール自体ではなく、その適用結果を検証する別カテゴリのツールという点が特徴。

## 使い方

`gem install serverspec`でインストールし、`serverspec-init`コマンドでテスト用のテンプレートファイル・ディレクトリを生成する。

## 対応OS

RedHat/CentOS/SuSE、Debian/Ubuntu、Arch/Gentoo/Plamo、AIX/Solaris/SmartOS、FreeBSD/macOS、そしてMS Windows(限定的なサポート)と幅広いOSに対応している。

## [[configuration-management-tools|構成管理ツール]]の中での位置づけ

[[chef|Chef]]・[[ansible|Ansible]]・[[puppet|Puppet]]・[[itamae|Itamae]]/[[mitamae|mitamae]]が「あるべき状態を適用する」ツールであるのに対し、Serverspecは「適用された状態が正しいかを検証する」テストツールという、隣接するが異なるカテゴリに属する。

#infrastructure-as-code #ruby #testing

## 出典

- [GitHub - mizzy/serverspec](https://github.com/mizzy/serverspec)
- [serverspec - a rubygem for testing provisioned servers with RSpec - Gosuke Miyashita](https://mizzy.org/blog/2013/03/24/4/)
