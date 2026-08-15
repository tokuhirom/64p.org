---
created: 2026-08-15 20:47
updated: 2026-08-15 20:47
---
# Bubblewrap (bwrap)

非特権ユーザーがLinuxのコンテナ機能を使ってサンドボックスを作れる、低レベルのサンドボックスツール。[containers/bubblewrap](https://github.com/containers/bubblewrap)としてGitHubで公開されており、LGPL v2ライセンス。root権限もsetuidバイナリも不要で、ユーザーネームスペースを使って動作する。sudoやchrootに近い、単純な「ラッパーツール」として設計されている。

## 使っているカーネル機能

- **user namespace** — 非特権ユーザーでもコンテナ機能を使えるようにする基盤
- **mount namespace** — ファイルシステムビューの分離
- **IPC namespace** — 共有メモリ・セマフォの隔離
- **PID namespace** — プロセスツリーの独立（いわゆる「Docker pid 1問題」を回避）
- **[[network-namespace]]** — ループバックのみの独立したネットワーク環境
- **UTS namespace** — ホスト名の分離
- **[[seccomp]]** — システムコールのフィルタリング

複数のnamespaceと[[seccomp]]を組み合わせている点で、[[least-privilege|最小権限の原則]]をプロセス起動レベルで実践するツールと言える。[[cgroups]]によるリソース制御とは異なるレイヤ（隔離であってリソース制限ではない）を担う。

かつてはsetuidモードも存在したが、現在は削除されており、ユーザーネームスペースの利用が標準になっている。

## 使い方の基本形

マウントを1つずつ積み上げてサンドボックスの中身を組み立てる。何も見せなければ何もアクセスできないので、必要なパスだけを`--ro-bind`や`--bind`で明示的に見せる、という発想。

```sh
bwrap --ro-bind /usr /usr --proc /proc --dev /dev bash
```

## 由来

2016年、Alexander Larsson（Red Hat）らxdg-appの開発者が、xdg-appのヘルパー(`xdg-app-helper`)に内包されていたコンテナ起動処理を、より汎用的・最小限な独立プロジェクトとして切り出したのが始まり。当時Red HatのProject Atomicがホストしていた。内部実装はColin Waltersの`linux-user-chroot`に由来する。

## 使用例

- **[Flatpak](https://flatpak.org/)** — アプリケーションのサンドボックス化に利用。BubblewrapはFlatpak開発の過程で生まれた。
- **[OpenAI Codex CLI](https://github.com/openai/codex)** — Linux版でコマンド実行のサンドボックスとしてbwrapを利用する（`codex-rs/linux-sandbox`）。ホストの`/`をデフォルトで読み取り専用マウントし、書き込み可能なパスを個別に許可する方式。

#linux #kernel #security #sandbox
