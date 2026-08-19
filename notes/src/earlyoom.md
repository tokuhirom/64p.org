---
created: 2026-08-19 14:27
updated: 2026-08-19 14:27
---
# earlyoom

Linux向けのユーザースペースOOM (Out Of Memory) デーモン。カーネル本体のOOM killerが動くよりも早いタイミングでメモリ枯渇を検知し、犠牲プロセスを終了させることで、システムがスワップ地獄に陥って無応答になるのを防ぐ。[[psi-pressure-stall-information|psi]]やcgroupsの複雑な機構には依存せず、`/proc/meminfo`と`/proc/*/oom_score`を読むだけのシンプルなC実装。https://github.com/rfjakob/earlyoom

## 動作原理

- 最大10回/秒の頻度で「available memory」と「free swap」を監視する。`free`ではなく`available`を見るのがポイントで、健全なLinuxではディスクキャッシュのためfreeメモリはほぼ0になるのが正常なので、availableの方が「実際に解放可能なメモリ」を正確に反映する。
- デフォルトで両方が**10%以下**になったタイミングで、`oom_score`が最も高いプロセス（≒最もメモリを食っているプロセス）へ**SIGTERM**を送る。
- さらに閾値の半分（デフォルトでは5%）を下回ると**SIGKILL**を送る2段階方式。
- 全メモリを`mlockall()`でロックしており、低メモリ状況下でも自分自身がスワップアウトされて動作が遅延することがない。RSSは約2MB程度と非常に軽量。

## 主なコマンドラインオプション

| オプション | 説明 |
|---|---|
| `-m PERCENT[,KILL_PERCENT]` | 利用可能メモリの最小割合（デフォルト10%）。第2引数でSIGKILL閾値を個別指定可 |
| `-s PERCENT[,KILL_PERCENT]` | 空きスワップの最小割合（デフォルト10%） |
| `-M SIZE[,KILL_SIZE]` / `-S SIZE[,KILL_SIZE]` | 割合ではなくKiB絶対値で指定 |
| `--prefer REGEX` / `--avoid REGEX` | 該当プロセスのoom_scoreを±300して優先/回避終了 |
| `--ignore REGEX` | 該当プロセスを終了候補から完全除外 |
| `--sort-by-rss` | oom_scoreではなくRSSで犠牲プロセスを選ぶ |
| `-N` / `-P` | 終了後/終了前に任意スクリプトを実行 |
| `-g` | プロセスグループごと終了 |
| `--kernel-oom` | 自前で殺さず`/proc/sysrq-trigger`経由でカーネルのOOM killerを起動 |
| `--dryrun` | 実際には殺さず動作確認のみ |

## インストール

```sh
sudo apt install earlyoom      # Debian 10+ / Ubuntu 18.04+
sudo dnf install earlyoom      # Fedora / RHEL 8 (EPEL)
sudo pacman -S earlyoom        # Arch Linux
```

## 他ツールとの比較

- **[[systemd-oomd]]**: [[psi-pressure-stall-information|psi]]ベースでcgroup単位の監視を行い、より高度な制御が可能。systemd統合環境向け。
- **nohang**: Python製で機能豊富だが依存が多く重め。
- **earlyoom**: C製・無依存・約2MBという軽さが強み。シンプルさと堅牢性重視。

カーネル標準の[[cgroups|cgroup]] v2によるハードなメモリ上限(`memory.max`)とは異なるアプローチで、こちらは厳格な上限強制というより「システム全体が詰まる前に緩やかに介入する」性質のツール。[[linux-command-memory-limit]]も参照。

## 出典

- [earlyoom - GitHub](https://github.com/rfjakob/earlyoom)
- [earlyoom README](https://github.com/rfjakob/earlyoom/blob/master/README.md)
- [earlyoom MANPAGE](https://github.com/rfjakob/earlyoom/blob/master/MANPAGE.md)
