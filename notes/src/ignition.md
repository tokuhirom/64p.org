---
created: 2026-08-15 16:22
updated: 2026-08-15 16:22
---
# Ignition

initramfs内(userlandが起動する前)で初回起動時に1回だけ実行されるプロビジョニングユーティリティ。JSON形式の設定ファイルを読み込み、ディスクのパーティショニング/フォーマット、ファイル書き込み(通常ファイルやsystemdユニット等)、ユーザー作成などをブートプロセスの非常に早い段階で行う。[[coreos|CoreOS]]系ディストリビューションの初期設定機構。 #linux #infrastructure

## cloud-initとの違い・経緯

CoreOSは元々`coreos-cloudinit`(cloud-initのCoreOS版)を使っていたが、これはOS起動後に動作するため、ディスクパーティションのような根本的な変更がしにくいという限界があった。Ignitionはその後継として開発され、CoreOS内部では約1年運用されたのち正式公開された。

- **実行タイミング** — cloud-initは通常のinit処理の一部として起動後に動くため、ディスクパーティションのような変更がしにくい。Ignitionはinitramfs中に動くため、まっさらなディスクからでもPXEブート等でベアメタルのセットアップができる
- **設計方針** — Ignitionは初回起動時に1回だけ実行され、変数展開(variable substitution)のような複雑さを持たない、よりシンプルで予測可能な設計
- **設定フォーマット** — cloud-initはYAMLだが、Ignitionは機械可読性を優先しJSONを採用

`coreos-cloudinit`は非推奨化され、現在は開発が止まっている。

## 設定の書き方

Ignition設定(JSON)は人間が直接書くには不向きなため、通常はYAMLで書いた設定をJSONへトランスパイルする2段階のワークフローを使う。

- **Butane** — 汎用のYAML→Ignition設定トランスパイラ
- **FCC (Fedora CoreOS Configuration Format)** — [[fedora-coreos|Fedora CoreOS]]向けの同種の仕組み

## 出典

- [Ignition | Ignition documentation](https://coreos.github.io/ignition/)
- [Producing an Ignition Config - Fedora Documentation](https://docs.fedoraproject.org/en-US/fedora-coreos/producing-ign/)
- [Cloudy Journey: Introducing Ignition](https://www.toddpigram.com/2016/04/introducing-ignition-new-coreos-machine.html)
- [GitHub - coreos/coreos-cloudinit [DEPRECATED]](https://github.com/coreos/coreos-cloudinit)
- [CoreOS ignition support | oVirt](https://www.ovirt.org/develop/release-management/features/virt/coreos-ignition-support.html)
