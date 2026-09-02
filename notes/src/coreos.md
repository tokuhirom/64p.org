---
created: 2026-08-14 08:39
updated: 2026-09-02 19:13
---
# CoreOS

2013年創業のコンテナインフラ企業。同名のOS（後にContainer Linuxと改名）を軸に、コンテナ時代の基盤ソフトウェアを数多く生み出した。2018年1月にRed Hatが2.5億ドルで買収した。 #infrastructure #linux

## Container Linux

コンテナを動かすことに特化した軽量Linuxディストリビューション。パッケージマネージャを持たず、アプリケーションはすべてコンテナで動かす前提で、OS自体は自動アップデートされるという、当時としては先進的な設計だった。Red Hat買収後の2020年5月にEOLとなり、公式後継は[[fedora-coreos|Fedora CoreOS]]（Red Hat OpenShiftのノードOSであるRHEL CoreOSの上流）。

## 生み出したソフトウェア

会社としてのCoreOSの影響は、OS本体よりも周辺プロジェクトの方が大きく残っている。

- **[[etcd]]** — 分散キーバリューストア。[[kubernetes|Kubernetes]]のプライマリデータストアになり、[[cncf|CNCF]]へ寄贈された
- **rkt** — Dockerに対抗したコンテナランタイム。ランタイム自体は廃れたが、OCI（Open Container Initiative）標準化を後押しした
- **[[cni|CNI]]** — rktの文脈で提唱されたコンテナネットワークの標準インターフェース。Kubernetesのネットワークプラグイン機構として生き残った
- **flannel** — シンプルなオーバーレイネットワーク。[[k3s]]のデフォルトCNIプラグインとして今も現役
- **Tectonic** — Kubernetesディストリビューション。買収後にRed Hat OpenShiftへ統合された
- **Quay** — コンテナレジストリ。Red Hat製品として継続

## 出典

- [Red Hat to Acquire CoreOS - Red Hat](https://www.redhat.com/en/about/press-releases/red-hat-acquire-coreos-expanding-its-kubernetes-and-containers-leadership)
- [FAQ: Red Hat to acquire CoreOS - Red Hat](https://www.redhat.com/en/blog/faq-red-hat-acquire-coreos)
- [Container Linux - Wikipedia](https://en.wikipedia.org/wiki/Container_Linux)
- [Fork Available as Red Hat Ends Life of CoreOS Container Linux - Data Center Knowledge](https://www.datacenterknowledge.com/open-source/fork-available-red-hat-ends-life-coreos-container-linux)
