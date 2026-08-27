---
created: 2026-08-27 21:59
updated: 2026-08-27 21:59
---
# gVisor

Googleが開発した、コンテナ向けのオープンソース「アプリケーションカーネル」。通常のコンテナ(runcなど)がアプリケーションのシステムコールをホストカーネルへ直接パススルーするのに対し、gVisorはSentryと呼ばれるユーザースペースの中間層がシステムコールを自前実装で仲介・処理し、ホストカーネルへの直接アクセスを遮断する。Goで書かれておりメモリセーフ。

## アーキテクチャ

- **Sentry** — gVisorの中核。syscallの実装、シグナル配信、メモリ管理、ページフォルト処理、スレッドモデルなど、Linux互換のカーネル機能をユーザースペースで実装する。パススルーではなく「サポートされる全てのシステムコールをSentry内で独立実装する」設計で、ホストカーネルの脆弱性がそのまま露出しない。
- **Gofer** — ホスト側の別プロセス。9PプロトコルでSentryと通信し、ファイルシステムへのアクセスを仲介する追加の隔離レイヤーとして機能する。
- **Netstack** — Sentry内に実装された、Go製のユーザースペースTCP/IPスタック。TCPの接続状態管理・制御メッセージ・パケット組み立てまで全てSentry内で完結し、ホストのネットワークスタックを経由しない。gVisor専用ではなく、他プロジェクトへ単体で再利用できる設計になっている(例: [[tailcat|Tailcat]]がTCPの待受・発信に利用)。

## プラットフォーム層(システムコール捕捉方式)

- **ptrace** — `PTRACE_SYSEMU`でユーザーコードを実行しつつホストへのシステムコール実行を防ぐ。ネストした仮想化なしのVM内でも動く汎用性の高さが利点だが、コンテキストスイッチのオーバーヘッドが大きく低速。2023年半ば以降非推奨。
- **systrap** — 現在のデフォルトプラットフォーム。
- **KVM** — [[kvm|KVM]]の仮想化拡張を利用し、Sentry自身がゲストカーネルとVMMを兼ねる形で動作する。ベアメタル環境で最高性能を発揮するが、ネストした仮想化下ではオーバーヘッドが大きいためsystrapが推奨される。

## 他の隔離アプローチとの位置づけ

gVisor自身は、既存の隔離技術を次の3つに整理して自らを差別化している。

- seccompのようなルールベースのフィルタリング — ではない
- VirtualBoxのような完全仮想マシン — でもない
- 「マージされたゲストカーネル兼VMM」または「seccomp on steroids」と呼べる独自のハイブリッドアプローチ

固定オーバーヘッドが小さく、プロセスに近いリソース利用モデルを保ったまま、VMに近い隔離強度を実現する点が完全仮想化との対比での利点とされる。[[kata-containers|Kata Containers]]や[[firecracker|Firecracker]]など[[microvm-ecosystem|コンテナ向け軽量VM技術]]がコンテナ単位で軽量VMを丸ごと起動するのに対し、gVisorはVMを使わず(KVMプラットフォーム利用時を除き)システムコールの捕捉・独自実装によってサンドボックス化する点が異なるアプローチ。

## 用途

Google Cloud RunやGKE Sandboxの基盤技術として使われている。

#virtualization #security

## 出典

- [gVisor: The Container Security Platform](https://gvisor.dev/)
- [Networking Guide - gVisor](https://gvisor.dev/docs/architecture_guide/networking/)
- [Platforms - gVisor](https://gvisor.dev/docs/architecture_guide/platforms/)
- [Security Model - gVisor](https://gvisor.dev/docs/architecture_guide/security/)
- [GitHub - google/gvisor: Application Kernel for Containers](https://github.com/google/gvisor)
