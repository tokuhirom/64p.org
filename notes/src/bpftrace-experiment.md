---
created: 2026-08-13 08:32
updated: 2026-08-13 08:32
---
# bpftraceを動かしてeBPFトレーシングを体感する

[[bpftrace]]を実際にこのマシン(Pop!_OS/Ubuntu noble)にインストールして動かし、[[bpf|eBPF]]によるトレーシングを体感した記録。 #linux #kernel #observability

## 環境構築

`apt install bpftrace` でインストールできた(候補バージョン `0.20.2-1ubuntu4.3`)。

```sh
$ apt-cache policy bpftrace
bpftrace:
  Installed: (none)
  Candidate: 0.20.2-1ubuntu4.3
$ sudo apt install -y bpftrace
$ bpftrace --version
bpftrace v0.20.2
```

## 躓いた点: 非対話環境でのroot権限

bpftraceの実行にはroot権限(eBPFプログラムのロードにCAP_BPF/CAP_SYS_ADMIN相当の権限が必要)が要る。しかしClaude CodeのBashツールにはインタラクティブなsudoパスワード入力用のTTYが無く、`sudo -n true`や`sudo -v`はいずれも失敗した。

```
$ sudo -n true
sudo: a password is required
$ sudo -v
sudo: a terminal is required to read the password; either use the -S option to read from standard input or configure an askpass helper
```

そのため、実行自体はユーザーが別の実端末上で行い、出力をファイル経由で共有してもらう形で進めた。

## 実験1: syscallをプロセス名別に集計する(tracepoint)

```sh
sudo bpftrace -e 'tracepoint:raw_syscalls:sys_enter { @[comm] = count(); } interval:s:5 { exit(); }'
```

`@[comm] = count()`というmap集計だけで、カーネル空間でのプロセス名(`comm`)ごとのsyscall呼び出し回数を集計できる。`interval:s:5 { exit(); }`のように別のprobeでタイマーによる終了処理を書けるのも分かった。

5秒間の実行結果は降順で、上位は`HeapHelper`(291754回)、`pgrep`(159370回)、`herdr`(85612回)、`gnome-terminal-`(54975回)、`claude`(49301回)など。GUI環境(`gnome-shell`: 42290回、`Xorg`: 40950回)も多数のsyscallを発生させていることが見えた。プロセス名はLinuxの`comm`(`TASK_COMM_LEN`)の制約で15文字に切り詰められるため、`StreamT~ #14757`のような省略表示になっているものもあった。

## 実験2: `do_nanosleep`カーネル関数をkprobeで追跡する

```sh
sudo timeout 5 bpftrace -e 'kprobe:do_nanosleep { printf("PID %d (%s) sleeping\n", pid, comm); }'
```

`ibus-ui-gtk3`や`tailscaled`など、定期的にポーリング/スリープしているデーモンプロセスが高頻度で`do_nanosleep`を呼んでいることが可視化された。コンテナ管理daemonの`incusd`が短時間に何十回もsleepしている様子も観測できた。ユーザーが手動で叩いた`sleep`コマンドの呼び出しもPIDごとに個別に捕捉されている。

kprobeはカーネル関数名を直接指定するだけでフックできる手軽さがある一方、`do_nanosleep`のような内部関数名はカーネルバージョンが変われば変わりうる、という[[bpftrace|bpftraceノート]]で触れた「tracepointの方が安定している」という説明を裏付ける結果でもあった。

## 実験3: execveをtracepointで追跡し、新規プロセス起動を可視化する

```sh
sudo timeout 5 bpftrace -e 'tracepoint:syscalls:sys_enter_execve { printf("%s -> %s\n", comm, str(args->filename)); }'
```

`args->filename`のように、tracepointの引数構造体からファイルパス文字列を`str()`で読み出せる。5秒間の結果には`zsh -> /usr/bin/pgrep`のような親プロセスと起動された実行ファイルのペアが並び、シェルのプロンプト表示のたびに`pgrep`や`sleep`が起動されている様子が見えた。ユーザーが個人で開発しているRust製Rakuインタプリタ`mutsu`のデバッグビルド(`../../target/debug/mutsu`)が`timeout`コマンド経由で起動されているのも捕捉された。

## 分かったこと

- `@[key] = count()`のようなmap構文だけで、カーネル空間での集計処理をユーザー空間へのイベント転送やロックなしに数行で書ける
- 複数のprobeを1つのスクリプトに並べて書ける(タイマーprobeでの終了処理など)
- `printf`はカーネル側からユーザー空間の標準出力へ安全に文字列を渡す仕組みとして機能する
- 実運用では、動かす環境にTTY越しの対話的なroot権限取得手段が要る(今回のような非対話CI/エージェント環境では一手間かかる)
