---
created: 2026-08-14 08:09
updated: 2026-08-14 08:09
---
# Kubernetes on Oxide

[Oxide Computer](https://oxide.computer/)は、ハードウェアとソフトウェアを一体設計するクラウドインフラ企業。「The cloud you own（自分で所有するクラウド）」をコンセプトに、顧客が自社データセンター内で本格的なクラウドインフラをラック単位で所有・運用できる製品を提供している。同社のブログ記事[Kubernetes on Oxide](https://oxide.computer/blog/kubernetes-on-oxide)は、OxideプラットフォームへのKubernetes統合の取り組みをまとめたもの。

## 経緯

2024年末、顧客からKubernetesを動かしたいという要望が出たが、公式な統合手段が存在しなかった。Solutions Software Engineerを採用し、顧客フィードバックを起点に段階的に統合機能を作っていくアプローチを取った。

## 3つのクラスタ・プロビジョニング統合

1. **Rancher Node Driver** — Rancher経由でOxideインスタンスをKubernetesノードとしてプロビジョニング。顧客が出したPRを土台に改善・公開
2. **Omni Infrastructure Provider** — Talos LinuxベースのクラスタをOmni経由でプロビジョニング。Talos開発元のSidero Labsと協業し7週間で実装
3. **Cluster API Provider（CAPOx）** — [[cluster-api|Kubernetesネイティブな宣言的クラスタ管理]]をCluster API経由で実現。Packerプラグインとも連携

## ランタイム統合: [[kubernetes-cloud-controller-manager|Cloud Controller Manager（CCM）]]

クラスタ内で稼働し、Kubernetesリソースと実際のOxideインフラを同期させる役割。
- **ノード調整**: OxideインスタンスとKubernetesのNodeオブジェクトを同期
- **LoadBalancerサービス**: OxideのFloating IPを使った負荷分散（現状はProxyモードで実装）

## 未解決の課題: [[container-storage-interface|CSI]]ドライバとディスクホットプラグ

[[container-storage-interface|Container Storage Interface（CSI）]]ドライバの開発中に、Oxide側の制約と衝突する問題が発覚した。

> "Oxide requires an instance to be stopped before attaching or detaching a disk"

Kubernetesはディスクのホットアタッチ（起動中のノードへの動的なディスク接続）を前提とした設計になっているため、この制約と衝突する。解決には[[kvm|ハイパーバイザー]]からAPI層まで、スタック全体にディスクのホットプラグ対応を追加する必要があるとしている。

## 考えたこと

ハードウェア〜ハイパーバイザー〜APIまで一気通貫で自社設計しているOxideならではの、「Kubernetesが暗黙に前提としている振る舞い（ディスクのホットアタッチ等）が、独自インフラだと素直には成立しない」という摩擦が具体的に語られている点が興味深い。パブリッククラウドのAPIの背後で当然のように提供されている機能が、実はハイパーバイザーレベルでの作り込みを要求するものだと分かる例になっている。

## 出典

- [Kubernetes on Oxide](https://oxide.computer/blog/kubernetes-on-oxide)

#kubernetes #oxide #infrastructure
