---
created: 2026-08-14 08:24
updated: 2026-08-14 08:39
---
# etcd

分散システム向けの、信頼性の高いキーバリューストア。Go製で、合意アルゴリズムに**[[raft|Raft]]**を使い、リーダーノードの故障を含むマシン障害に耐えながら強い一貫性を保つ。名前はUnixの設定ディレクトリ `/etc` に distributed の「d」を付けたもの（「分散された/etc」）。 #infrastructure #distributed-systems

## 経緯

- 2013年、[[coreos|CoreOS]]社で開発が始まり、2014年にオープンソース化
- 2018年、CoreOSがRed Hatに買収され、同年12月にプロジェクトはCNCFへ移管
- 2020年11月、CNCFのgraduatedプロジェクトに昇格

## Kubernetesのプライマリデータストア

[[kubernetes|Kubernetes]]のクラスタ状態（あらゆるAPIオブジェクト）はすべてetcdに保存・複製される。kube-apiserverの背後にいる唯一のステートフルなコンポーネントであり、etcdのバックアップがそのままクラスタのバックアップになる。一方で運用（クラスタ構成・スナップショット・ディスク性能への敏感さ）には手間がかかるため、[[k3s]]は「kine」というシムでetcd APIをSQL（デフォルトはsqlite3）に変換し、小規模構成でetcdなしで動けるようにしている。

## 出典

- [etcd-io/etcd - GitHub](https://github.com/etcd-io/etcd)
- [etcd Project Journey Report - CNCF](https://www.cncf.io/reports/etcd-project-journey-report/)
- [What is etcd? - Red Hat](https://www.redhat.com/en/topics/containers/what-is-etcd)
- [etcd Becomes a CNCF Graduated Project - InfoQ](https://www.infoq.com/news/2020/11/etcd-cncf-graduation/)
