---
created: 2026-08-19 09:59
updated: 2026-08-19 09:59
---
# k3s実験

[[k3s]]の「単一バイナリの軽量ディストリビューション」という説明を実際に手を動かして確認するための実験記録。ホストにsystemdサービスとして直接インストールする公式手順(`get.k3s.io`)は、iptables変更やsystemdユニット登録を伴い後片付けが面倒なため、代わりに公式Dockerイメージ`rancher/k3s`を単体コンテナとして動かす方式を採った。 #kubernetes

## 使ったもの

- Docker 29.1.3(既にインストール済み)
- `rancher/k3s:v1.36.3-k3s1`イメージ(2026年8月時点の最新安定版)
- kubectlはホストにインストールせず、イメージに同梱されているものを`docker exec`経由で使った

## 動かし方

```sh
docker run --privileged --name k3s-experiment \
  --hostname k3s-experiment -p 6443:6443 \
  -d rancher/k3s:v1.36.3-k3s1 server
```

`--privileged`が必要な理由: k3sはコンテナの中でさらにcontainerdを動かし、その上でPod用のコンテナ(ネストしたコンテナ)を起動するため。単なる`docker run`の権限では足りない。

ノードのReady化はかなり速く、起動から15秒ほどで`kubectl get nodes`が`Ready`を返した。一方でTraefikはHelmChart経由のインストール(`helm-install-traefik`という一時的なJobがHelmチャートを展開する)のため、全Pod`Running`になるまでは40〜50秒ほどかかった。

## 躓いた点

- コンテナのIPを取ろうと`docker inspect -f '{{.NetworkSettings.IPAddress}}' k3s-experiment`を打ったら`map has no entry for key "IPAddress"`で失敗した。今のDockerではこのフィールドが常に空で、`docker inspect -f '{{json .NetworkSettings.Networks}}'`のように`Networks.<network名>.IPAddress`を見に行く必要があった(このホストではbridgeネットワークで`172.17.0.4`)。
- ポートは`-p 6443:6443`しか公開していないが、`kubectl expose --type=NodePort`で払い出されたポートやTraefikのServiceLBが使うポートには、コンテナのIP(`172.17.0.4`)に直接アクセスすれば(Docker bridgeネットワークはホストから素通しなので)届く。ホスト側で`-p`を追加しなくても動作確認できた。

## 実行結果

### 単一バイナリ・単一プロセスであることの確認

```
$ docker exec k3s-experiment ps aux
PID   USER     COMMAND
    1 root     /bin/k3s init
   56 root     {exe} k3s server
   81 root     containerd
  ...
 1485 65532    /coredns -conf /etc/coredns/Corefile
 1694 1000     /metrics-server ...
 1812 root     local-path-provisioner start --config /etc/config/config.json
 2605 65532    traefik traefik --entryPoints.web.address=:8000/tcp ...
```

[[k3s]]ノートに書いた「コントロールプレーン全コンポーネントを単一プロセスに封じ込める」というのは文字通りで、PID 56の`k3s server`1プロセスがapiserver・scheduler・controller-manager・kubeletをまとめて担っている。ただし**containerdは別プロセス(PID 81)**であり、CoreDNS・metrics-server・local-path-provisioner・Traefikも「k3sバイナリの中の機能」ではなく、containerdが起動する**普通のPod=普通のコンテナ**として動いている。つまり「同梱」の実態は「1バイナリに静的リンクされている」のではなく、「起動時に自動でmanifest/HelmChartがapplyされ、Pod化されて動く」という意味だとわかった。

### データストア(sqlite3 + kine)の確認

```
$ docker exec k3s-experiment ls -la /var/lib/rancher/k3s/server/db/
-rw------- 1 root root 9273344 state.db
-rw------- 1 root root   32768 state.db-shm
-rw------- 1 root root 6105872 state.db-wal
```

[[k3s]]ノートで触れた「デフォルトデータストアはetcdではなくsqlite3(kine経由)」の通り、`state.db`という素のsqliteファイルとしてクラスタ状態が保存されていた。WALモード(`-shm`/`-wal`)で運用されている。

### hello world: nginxを実際にデプロイして疎通確認

```sh
docker exec k3s-experiment kubectl create deployment hello-nginx --image=nginx
docker exec k3s-experiment kubectl expose deployment hello-nginx --port=80 --type=NodePort
```

払い出されたNodePort(この実行では30126)に、コンテナIP経由で直接アクセス:

```
$ curl -s -i http://172.17.0.4:30126/
HTTP/1.1 200 OK
Server: nginx/1.31.3
...
<title>Welcome to nginx!</title>
```

さらに、同梱の[[traefik|Traefik]]がIngressコントローラーとして機能することも確認した。`Ingress`リソースを1枚適用しただけで、Traefikの`LoadBalancer`Service(実体はServiceLBが払い出すNodePort)経由でも同じnginxに到達できた。

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: hello-nginx
spec:
  rules:
  - http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: hello-nginx
            port:
              number: 80
```

```
$ curl -s -i http://172.17.0.4:32498/   # traefik ServiceのNodePort
HTTP/1.1 200 OK
...
<title>Welcome to nginx!</title>
```

kube-apiserverにIngressをapplyしただけで、Traefikが自動でルーティング設定を反映していた(手動でTraefikを再起動・再設定する必要は一切なかった)。KubernetesのIngressコントローラーが「宣言的にapplyするだけでロードバランサ設定が反映される」という仕組みを実感できた。

## 後片付け

```sh
docker stop k3s-experiment && docker rm k3s-experiment
```

イメージ(`rancher/k3s:v1.36.3-k3s1`、265MB)はローカルに残したので、次回はpull無しですぐ再実験できる。

## コードから分かること

- k3sの「軽量」は主に配布形態(単一バイナリ)と運用の自動化(証明書配布・Ingress自動反映など)によるもので、実行時に全部が1プロセスに収まっているわけではない。コントロールプレーンのコアAPI群だけが1プロセス化されており、アドオン(Traefik・CoreDNS等)は素のKubernetesと同じくPodとして動く。
- Dockerコンテナ1個でCNCF準拠のフル機能Kubernetesクラスタが50秒足らずで立ち上がり、Ingress込みで実アプリの疎通まで確認できる手軽さは、[[minikube]]や[[kind|kind]]と同じ土俵の「ローカルで試すk3s」体験として十分実用的。

## 出典

- [rancher/k3s - Docker Hub](https://hub.docker.com/r/rancher/k3s)
- [Advanced Options / Configuration - K3s docs](https://docs.k3s.io/advanced)
- [k3s-io/k3s - Releases](https://github.com/k3s-io/k3s/releases)
