---
created: 2026-08-12 23:23
updated: 2026-08-12 23:25
---
# firecracker-containerd

AWSが開発する、containerdに[[firecracker|Firecracker]]をコンテナのVM分離バックエンドとして統合するプロジェクト。containerdのプラグインとして実装されており、Kubernetes・Amazon ECSなど既存のコンテナオーケストレーションフレームワークとの互換性を保ちながら、コンテナをFirecracker microVM単位で分離実行できる。 #virtualization #aws

## アーキテクチャ

- **Runtime**: ホスト側のcontainerdとFirecracker VMMの間、およびmicroVM内で動く後述のAgentとの間をつなぐコンポーネント。ttrpc経由で通信するout-of-processシムとして実装されている。
- **Agent**: microVM内で動作し、Runtimeからの制御指示を実行するプロセス。containerdの`containerd-shim-runc-v1`経由でrunCを呼び出し、microVM内部に標準的なLinuxコンテナを作る。
- ネットワーキングはCNIプラグインでmicroVM単位に設定でき、チェイン可能な`tc-redirect-tap`というCNIプラグインを提供している。

## [[kata-containers|Kata Containers]]との違い

Kata ContainersがOCI/CRI互換のコンテナランタイムとして複数のVMM・複数のコンテナランタイム統合先を横断的にサポートするのに対し、firecracker-containerdはAWSが開発する、containerd専用のFirecracker統合という位置づけ。

## [[microvm-ecosystem|コンテナ向け軽量VM技術]]の中での位置づけ

containerd専用のFirecracker統合レイヤー。

## 出典

- [GitHub - firecracker-microvm/firecracker-containerd](https://github.com/firecracker-microvm/firecracker-containerd)
- [firecracker-containerd/docs/architecture.md](https://github.com/firecracker-microvm/firecracker-containerd/blob/main/docs/architecture.md)
