---
created: 2026-09-06 01:15
updated: 2026-09-06 01:15
---
# Kubernetesのrootless mode (KubeletInUserNamespace)

kubelet・CRI/OCIランタイム・CNIプラグイン・kube-proxyという**ノード側のスタック全体**を、Linuxのuser namespaceを使ってホスト上の非rootユーザー（例: UID 1000）として動かすモード。[[kubernetes|Kubernetes]] v1.37で`KubeletInUserNamespace`フィーチャーゲートがベータに昇格し、デフォルト有効になった。2018年に実験として始まり、v1.22 (2021) でアルファとしてマージされた KEP-2033 の系譜。 #kubernetes #security #linux #container

Podのuser namespace（`hostUsers: false` / `UserNamespacesSupport`、v1.36でGA）とは別物なので注意。あちらはPodをuser namespaceに入れるがノードコンポーネントはroot のまま。両者は競合せず、組み合わせると`privileged: true`なしでKubernetes-in-Kubernetesが組める。

## 何が嬉しいか

ノードコンポーネントには歴史的にコンテナブレイクアウト系の脆弱性があり、それがそのままホストのroot奪取に直結してきた。公式ブログが挙げている例は以下。

- CVE-2022-0811 ("cr8escape") — CRI-Oに任意のsysctl（`kernel.core_pattern`など）を設定させ、ホスト上でroot権限の任意コード実行
- CVE-2023-27561 — runcがvolume mountのレースでmasked pathsを迂回し、ホストのprocfsを露出（CVE-2019-19921のリグレッション）
- CVE-2024-10220 — kubeletがgitRepo volume経由でroot権限の任意コマンド実行
- CVE-2025-31133 — runcが攻撃者の制御下のパスをbind mountし、`/proc/sysrq-trigger`等に書き込み
- CVE-2026-53488 — containerdがコンテナイメージの細工されたラベル経由でホスト上の任意コマンド実行

user namespaceの中で動かしておけば、被害はその非rootユーザーのアカウント内に閉じる。特に**カーネル・ブートローダ・ファームウェアを書き換えて侵入を隠蔽することができなくなる**のが大きい。ただしカーネル自体の脆弱性には無力なので、[[seccomp|seccomp]]のような従来のハードニングと併用する前提。

## 用途

- **本番クラスタ**: コンテナブレイクアウトの被害範囲を絞る。
- **共有マシン（HPCなど）**: 管理者にroot権限を要求せず、他ユーザーの環境を壊すリスクもなくKubernetesを立てられる。
- **ノートPC**: ローカルクラスタがホストのiptablesルール（VPN用など）を壊さない。
- **AIサンドボックス**: AIコーディングエージェントとテスト用クラスタ専用のローカルユーザーを作り、エージェントがネット上の悪意ある情報に騙されてもホストを壊せないようにする。
- **Kubernetes-in-Kubernetes**: 親クラスタ上のuser namespace付きPodとして子クラスタを動かし、APIのnamespaceより強い分離を得る。
- **ブートストラップ**: Cluster APIなどで本番クラスタを組むための一時的な非特権クラスタ。

## 仕組み

user namespaceはホストの非rootユーザーをnamespace内の「偽物のroot」にマップする。UID 0の特権はnamespaceの内側だけに閉じるが、ノードコンポーネントの仕事（ボリュームのマウント、[[cgroups|cgroup]]の作成、Podの[[network-namespace|network namespace]]の設定）にはこの偽物のrootで足りる。

重要なのは、**user namespaceそのものはKubernetesの外側で作る**という点。rootless Docker / Podman / nerdctl や LXC/LXD がその役を担う。フィーチャーゲート自体は公式ブログの表現を借りれば「かなり地味」で、やっているのは主に以下のエラーを無視することだけ。

- sysctl設定の失敗を無視する（`vm.overcommit_memory`, `vm.panic_on_oom`, `kernel.panic`, `kernel.panic_on_oops`, `kernel.keys.root_maxkeys`, `kernel.keys.root_maxbytes`）
- `/dev/kmsg`のオープン失敗を無視する
- kube-proxyの`RLIMIT_NOFILE`設定の失敗を無視する

## 前提条件

- cgroup v2（**cgroup v1は非対応**）と、`Delegate=yes`によるcgroupツリーの委譲
- systemdのユーザーセッション
- 非特権ユーザーが`/etc/subuid`・`/etc/subgid`に登録されていること
- ディストリビューションに応じたいくつかのsysctl設定
- namespace内で書き込み可能である必要のあるディレクトリ: `/etc`, `/run`, `/var/logs`, `/var/lib/kubelet`, `/var/lib/cni`, `/var/lib/containerd`（containerdの場合）, `/var/lib/containers`（CRI-Oの場合）

kubelet側の設定はこう。cgroupツリーはsystemdから委譲済みなので`systemd`ドライバではなく`cgroupfs`を使う。

```yaml
apiVersion: kubelet.config.k8s.io/v1beta1
kind: KubeletConfiguration
featureGates:
  KubeletInUserNamespace: true
cgroupDriver: "cgroupfs"
```

kube-proxyはconntrack系のsysctlを触らせないよう、0を明示して設定をスキップさせる。

```yaml
apiVersion: kubeproxy.config.k8s.io/v1alpha1
kind: KubeProxyConfiguration
mode: "iptables"
conntrack:
  maxPerCore: 0
  tcpEstablishedTimeout: 0s
  tcpCloseWaitTimeout: 0s
```

CRI側はcontainerd 1.4以降・CRI-O 1.22以降が対応。containerdならAppArmorの無効化、`oom_score_adj`設定エラーの無視、hugetlb cgroupコントローラの無効化、snapshotterを`fuse-overlayfs`にする、などの設定が要る。

## 制約

- `nfs`や`iscsi`のような「非ローカル」なvolume driverはほぼ動かない。`local`・`hostPath`・`emptyDir`・`configMap`・`secret`・`downwardAPI`は動作が確認されている。
- CNIプラグインによっては動かない。Flannel (VXLAN, 8472/UDP) は動作が確認されている。
- ノードのnetwork namespaceにはループバック以外のインターフェースが必要で、slirp4netnsやVPNKit、lxc-user-nicなどで用意する。kubeletのポート(10250/TCP)やNodePortはRootlessKit・slirp4netns・socatのような外部のポートフォワーダでホストへ露出させる。
- CNI/CSIドライバによっては、偽物のrootでは足りない場面が残る。

## アルファからベータへの変更点

- フィーチャーゲートがデフォルト有効に。ただし**有効化しただけでkubeletがuser namespaceに入るわけではない**ので、既存のrootfulなクラスタには何の影響もない。
- `kubectl get nodes -o yaml`が`runningInUserNamespace`プロパティでノードがuser namespace内かを報告するようになった。管理者はこれを見てラベルやtaintを付け、本物のroot権限を要るワークロード（一部のCNIプラグインのインストーラなど）がrootlessノードにスケジュールされないようにできる。
- Kubernetes自身のCI/CDで、ノードのconformance E2Eテストがrootlessクラスタ上で走るようになった（`ci-kubernetes-e2e-kind-rootless`）。

周辺の進展として、Linux 6.3 (2023) のidmapped tmpfs対応、Kubernetes v1.33 (2025) での`UserNamespacesSupport`のデフォルト有効化、containerd 2.1 (2025) のwritable cgroups対応が挙げられている。これらが揃ったことで、rootlessなクラスタを`hostUsers: false`なPodの中に入れ子にできるようになった。

## 試し方

- **[[kind|kind]]** — 一番簡単。`dockerd-rootless-setuptool.sh install`してrootless Docker（またはrootless nerdctl / [[podman|rootless Podman]]）を用意し、`kind create cluster`するだけ。
- **[[minikube|minikube]]** — 同様にrootless Docker / Podmanの上で`minikube start --driver=docker`。
- **Usernetes** — 記事の著者（NTTの須田瑛大氏）が2018年から開発しているrootless Kubernetesディストリビューション。`KubeletInUserNamespace`フィーチャーゲートの出自でもある。kind/minikubeと違い、複数のrootless Docker/Podman/nerdctlノードをFlannel CNIのVXLANで繋いだクラスタを組める。Kubernetes-in-Kubernetesモードも実験的に持つ。
- **[[k3s|k3s]]** — rootlessモードをサポート。kind/minikube/現行Usernetesと違って、rootless Dockerのような外部ランタイムに依存せずホスト上で直接動く。
- **Sysbox** — フィーチャーゲートもcgroup v2も要求せず、細工した`/proc`・`/sys`を見せることで非特権コンテナ内でKubernetesを動かすアプローチ（非公式）。

## 今後

フィードバックと普及状況次第でGAを目指す。Kubernetes-in-Kubernetesの簡素化に効きそうなKEPとして、KEP-5474 (Enable Writable cgroups for unprivileged containers) と KEP-5714 (Allow specifying whether to unshare cgroup namespaces) が議論されている。

## 出典

- [Kubernetes v1.37: KubeletInUserNamespace (aka Rootless mode) Graduates to Beta](https://kubernetes.io/blog/2026/09/04/kubernetes-v1-37-rootless-beta/)
- [Running Kubernetes Node Components as a Non-root User — Kubernetes Documentation](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-in-userns/)
- [Kubernetes v1.37: Garhwal](https://kubernetes.io/blog/2026/08/26/kubernetes-v1-37-release/)
