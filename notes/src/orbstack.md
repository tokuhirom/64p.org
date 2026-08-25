---
created: 2026-08-25 17:40
updated: 2026-08-25 17:40
---
# OrbStack

macOS向けの商用アプリ（無料枠あり）。Docker互換のコンテナ実行環境とLinux仮想マシンの管理を1つのアプリに統合している。[orbstack/orbstack](https://github.com/orbstack/orbstack)。Docker Desktopの有償ライセンス化を受けて広まった代替の一つで、「Docker Desktopをほぼ差し替えるだけで動く」GUI付き代替という位置づけ。

## 特徴

- Docker engineのドロップイン代替として、既存のDockerコマンド・ワークフローがそのまま動く。コンテナ・ボリューム管理用のGUIも備える。
- Apple Siliconでのバックグラウンド消費はCPU使用率0.1%未満、ディスク消費も抑えめとされ、パフォーマンス・省電力を強く訴求している。
- コンテナごとに`http://<container-name>.orb.local`形式のドメインが自動で割り当てられ、macOSホストから直接アクセスできる。
- Docker互換コンテナに加えてフルのLinux仮想マシンもオーバーヘッド少なく動かせる。Kubernetesにも対応。
- インストールはアプリをダウンロードして開くだけ、またはHomebrew Caskから。

## [[colima|Colima]]との違い

どちらもDocker Desktop代替だが、OrbStackは商用（無料枠あり）でGUIとパフォーマンスを重視し、セットアップの手軽さを優先する設計。Colimaは無料・OSSでCLI中心、細かいランタイム/リソース制御に向く。

## 出典

- [OrbStack · Fast, light, simple Docker & Linux](https://orbstack.dev/)
- [Architecture · OrbStack Docs](https://docs.orbstack.dev/architecture)
- [GitHub - orbstack/orbstack](https://github.com/orbstack/orbstack)

#virtualization #macos #docker
