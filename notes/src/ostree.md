---
created: 2026-08-15 16:19
updated: 2026-08-15 16:19
---
# OSTree

Linuxのファイルシステムツリーをバージョン管理し、アトミックなアップグレード/ロールバックを実現するライブラリ・ツール(`libostree`)。単体では汎用のバージョン管理・デプロイ基盤であり、RPMなどのパッケージ管理そのものではない。 #linux #infrastructure

## 仕組み

- **コンテンツアドレス型オブジェクトストア** — Gitと同じ発想で、個々のファイルをチェックサム(SHA256)で管理し、変更されたファイルのみを差分配信できる。ブランチに相当する「refs」でツリーの世代を追跡する
- **ハードリンクによるチェックアウト** — Gitと異なり、リポジトリからチェックアウトする際にファイルをコピーせず**ハードリンク**で配置する。そのためチェックアウト後のファイルは変更不可(immutable)として扱う必要がある
- **デプロイメント** — `/ostree/repo`にあるリポジトリ内の特定コミット(SHA256ハッシュ)を1つの「デプロイメント」として扱い、ブートローダーのエントリと紐付ける。複数世代のデプロイメントを同一パーティション内に共存させられるので、更新失敗時は直前の正常な世代に即座にロールバック可能
- 電源断や通信切断時にも、更新はコミット単位でアトミックに適用されるためシステムの整合性が壊れにくい

## 歴史

2011年10月、Red HatのエンジニアColin Waltersが開発開始。GNOME(upower/NetworkManager/gnome-shell等)のOSレベルの変更をホスト環境を壊さずテスト・反復するための仕組みとして着想した。2012年のGUADEC(GNOME Users And Developers European Conference)で公開発表され、GNOME Continuous(GNOMEの継続的ビルド・配信プロジェクト)の文脈で発展。2013年8月に最初の公開リリース(v2013.6)。Waltersはdpkg/rpmなど他のビルドシステムとも共有可能な独立プロジェクトとして意図的に切り出した。

## 応用例

RPMパッケージ管理とOSTreeを組み合わせたものが**rpm-ostree**であり、[[fedora-coreos|Fedora CoreOS]]やFedora Silverblue/Kinoiteなど、Red Hat系のイミュータブルLinuxディストリビューションの中核技術になっている。組込み分野(Toradex TorizonなどYocto/IoTデバイスのOTA更新)でも使われている。

## 出典

- [OSTree Overview | ostreedev/ostree](https://ostreedev.github.io/ostree/introduction/)
- [OSTree — Wikipedia](https://en.wikipedia.org/wiki/OSTree)
- [GitHub - ostreedev/ostree](https://github.com/ostreedev/ostree)
- [Deployments | ostreedev/ostree](https://ostreedev.github.io/ostree/deployment/)
- [ostree v2013.6 released « Colin Walters](https://blog.verbum.org/2013/08/26/ostree-v2013-6-released/)
- [OSTree for Fedora [LWN.net]](https://lwn.net/Articles/581811/)
