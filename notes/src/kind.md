---
created: 2026-08-14 08:24
updated: 2026-08-14 08:24
---
# kind (Kubernetes in Docker)

Dockerコンテナを「ノード」として[[kubernetes|Kubernetes]]クラスタを動かすツール。`kubernetes-sigs/kind` で開発されている。名前は "Kubernetes IN Docker" の略。もともとはKubernetes自体のテスト（本体のCI）のために設計されたもので、ローカル開発やCIでの利用にも使える、という立ち位置。 #kubernetes

## 仕組み

- **node image** — systemd・containerd・kubeadm・kubeletなど、コンテナの中でKubernetesノードとして振る舞うのに必要な一式を焼き込んだDockerイメージ。ベースとなるbase-imageの上に、Kubernetesのビルド成果物を載せて作られる
- このnode imageのコンテナを1ノード1コンテナで起動し、**kubeadm**で各ノードをブートストラップしてクラスタを組む
- VMを使わないため起動が速く、マルチノードクラスタ（コントロールプレーン複数のHA構成も含む）を気軽に作れる
- Kubernetesのリリース前バイナリ（CI artifacts）からnode imageをビルドする機能があり、「まだリリースされていないKubernetes」のテストができる

## [[kubernetes]]の中での位置づけ

ローカルクラスタツールとしては[[minikube]]・k3d（[[k3s]] in Docker）と並ぶ選択肢。upstream Kubernetesを忠実に動かすこと・使い捨てのクラスタを高速に作れることに強みがあり、オペレーターやCRDのテスト、CIでのE2Eテストに向く。一方でminikubeのようなアドオン機構やドライバーの多様性はない。

## 出典

- [kind - Kubernetes](https://kind.sigs.k8s.io/)
- [kubernetes-sigs/kind - GitHub](https://github.com/kubernetes-sigs/kind)
- [Initial design - kind](https://kind.sigs.k8s.io/docs/design/initial/)
