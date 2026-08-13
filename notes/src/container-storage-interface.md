---
created: 2026-08-14 08:09
updated: 2026-08-14 08:09
---
# Container Storage Interface (CSI)

コンテナオーケストレーションシステム（Kubernetes、Mesos、Cloud Foundryなど）に対して、任意のブロック/ファイルストレージシステムを統一的な方法で公開するための標準仕様。Kubernetes、Mesos、Docker、Cloud Foundryのコミュニティメンバーの協力によって策定された、Kubernetes本体からは独立した仕様（[spec本体](https://github.com/container-storage-interface/spec/blob/master/spec.md)はKubernetesリポジトリの外にある）。

## 目的

ストレージベンダーが、Kubernetesのコア実装に手を入れることなく、独自のプラグイン（CSIドライバ）を書いてデプロイするだけで自社のストレージシステムをKubernetesから使えるようにすること。プロビジョニング、アタッチ/デタッチ、マウント/アンマウントといったストレージ操作を、環境をまたいで一貫したインターフェースで扱えるようにする。

## Kubernetesでの経緯

Kubernetes v1.9でCSI仕様のalpha実装が公開され、v1.13でGA（General Availability）に到達した。それ以前はKubernetes本体のコードにストレージベンダーごとの実装を直接組み込む方式（in-treeプラグイン）だったが、CSIによってベンダー実装をKubernetesのリリースサイクルから切り離せるようになった。

## [[kubernetes-on-oxide|Oxide Computer]]での事例

CSIドライバが前提とする「稼働中のノードへディスクを動的にアタッチ/デタッチする」という振る舞い（ホットアタッチ）は、Oxide Computerのように独自にハードウェア〜[[kvm|ハイパーバイザー]]〜APIまで一気通貫で設計しているプラットフォームでは自明には成立しない。Oxideの制約「ディスクの着脱前にインスタンスを停止する必要がある」とCSIの前提が衝突し、ハイパーバイザー層まで遡った対応が必要になった。

## 出典

- [Introducing Container Storage Interface (CSI) Alpha for Kubernetes | Kubernetes](https://kubernetes.io/blog/2018/01/introducing-container-storage-interface/)
- [Container Storage Interface (CSI) for Kubernetes GA | Kubernetes](https://kubernetes.io/blog/2019/01/15/container-storage-interface-ga/)
- [Introduction - Kubernetes CSI Developer Documentation](https://kubernetes-csi.github.io/docs/)

#kubernetes #storage
