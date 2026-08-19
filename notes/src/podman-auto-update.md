---
created: 2026-08-19 18:05
updated: 2026-08-19 18:05
---
# podman-auto-update

[[podman|Podman]]に標準で付属する、コンテナイメージの自動更新機能。systemd管理下で動くコンテナに対して、新しいイメージが公開されていれば取得・再起動を行う。`podman-auto-update.service`と、それをデフォルトで毎日深夜(ランダム遅延900秒付き)にトリガーする`podman-auto-update.timer`のペアで構成される。

## 有効化の条件

対象にできるのはsystemd管理下のコンテナのみ。以下3条件が必要。

1. 完全修飾されたイメージ参照であること(例: `quay.io/podman/stable:latest`)
2. コンテナに`AutoUpdate=registry`(または対応するラベル`io.containers.autoupdate`)を指定すること
3. `podman-auto-update.timer`を有効化すること(rootlessなら`systemctl --user enable --now podman-auto-update.timer`)

## AutoUpdateポリシー

- **registry(image)**: レジストリに問い合わせ、リモートイメージとローカルのダイジェストを比較。異なれば更新とみなす。
- **local**: レジストリには問い合わせず、ローカルストレージ内のダイジェスト差分だけで判定する。

Kubernetesマニフェスト形式でコンテナを定義する場合、`io.containers.autoupdate`ラベルは全コンテナに適用され、`io.containers.autoupdate/$container`とすれば特定コンテナのみに適用できる。

## Quadletでの設定例

Quadlet(systemdユニットファイルの拡張構文でコンテナを定義する仕組み)では、`.container`ファイルに`AutoUpdate=`を書くだけでよい。

```
[Container]
Image=registry.fedoraproject.org/fedora:latest
Exec=sleep infinity
AutoUpdate=registry
```

`~/.config/containers/systemd/`(rootless)に配置し、`systemctl --user daemon-reload`で反映する。

## ロールバック挙動

デフォルト(`--rollback`)では、イメージ更新後のsystemdユニット再起動が失敗すると前のイメージに戻して再起動する。ただしこれが正しく機能するには、コンテナが`--sdnotify=container`で作成され、READYメッセージをsd-notify経由で送る必要がある。そうしないと再起動成功の判定ができず、ロールバック判断が正確にならない。

## 出典

- [podman-auto-update — Podman documentation](https://docs.podman.io/en/latest/markdown/podman-auto-update.1.html)
- [Automatic container updates with Podman quadlets :: Major Hayden](https://major.io/p/podman-quadlet-automatic-updates/)
- [How to Set Up Automatic podman auto-update with systemd Timer](https://oneuptime.com/blog/post/2026-03-17-set-up-automatic-podman-auto-update-systemd-timer/view)

#container #linux #systemd
