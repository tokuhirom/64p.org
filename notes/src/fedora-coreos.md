---
created: 2026-08-15 16:15
updated: 2026-08-15 16:19
---
# Fedora CoreOS

[[coreos|CoreOS]]社の Container Linux が2020年5月にEOLとなった際の公式後継ディストリビューション。Fedora Projectのイメージベース・自動アップデートの系譜（Silverblue等と同じrpm-ostree系統）と、Container Linuxの設計思想を統合したもの。 #linux #infrastructure

## イミュータブル設計

ルートファイルシステムは読み取り専用でマウントされ、書き込み可能なのは`/etc`と`/var`のみ。アプリケーションはコンテナとして動かす前提で、ホストOS自体は手で変更しない（構成ドリフトを防ぐ）という設計になっている。

- **rpm-ostree** — RPMパッケージ管理と[[ostree|OSTree]]（Gitのようにファイルシステムツリーをコミット単位でバージョン管理する仕組み）を組み合わせたハイブリッドパッケージシステム。OS全体を1つのイメージとしてアトミックに更新・ロールバックできる
- 更新は新しいOSTreeコミットをステージしておき、次回再起動時に切り替える方式。起動に失敗すると自動的に直前の正常なツリーに戻る
- **Ignition** — 初回起動時のプロビジョニングを担う仕組み。従来型のインストーラを使わず、JSON形式の設定ファイル（クラウドの場合はユーザーデータ経由で渡す）を初回起動時に読み込んで自己設定する

## リリースストリーム

stable / testing / next の3ストリームで段階的に検証しながら配信される（Fedora本体のリリースサイクルとは別に、CoreOS独自のケイデンスで更新される）。

## 関連

Red Hat OpenShiftのノードOSである**RHCOS (Red Hat CoreOS)** は、Fedora CoreOSを上流として派生した製品版。

## 出典

- [Fedora CoreOS: Immutable, Auto-Updating & Secure OS | mkdev](https://mkdev.me/posts/what-is-container-operating-system-immutable-auto-updating-security-minded-fedora-coreos-intro)
- [How to run containerized workloads securely and at scale with Fedora CoreOS | Red Hat Developer](https://developers.redhat.com/blog/2020/03/10/how-to-run-containerized-workloads-securely-and-at-scale-with-fedora-coreos)
- [Immutable Linux Infrastructure Guide (2026 Guide) | FOSS Linux](https://www.fosslinux.com/155038/scaling-reliable-infrastructure-with-immutable-linux-distributions-2026-admin-guide.htm)
