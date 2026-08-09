---
created: 2026-08-09
updated: 2026-08-09
---
# ngrep (network grep)

`grep`のようなパターンマッチングをネットワークパケットに対して行えるコマンドラインツール。 #networking #cli

## 概要

- 名前の通り「grep + network」。pcapライブラリでパケットをキャプチャし、GNU regexライブラリで正規表現マッチングを行う
- `tcpdump`（パケットキャプチャ）と`grep`（テキスト検索）の中間に位置するツール、というのがよくある説明
- TCP/UDP/ICMPを、Ethernet/PPP/SLIP/FDDI/nullインターフェース越しに解析可能
- `tcpdump`や`snoop`と同様の[[bpf|BPF]]フィルタ構文が使える

`tcpdump`が「パケットの構造」を見るのに強い一方、ngrepは「ペイロード内の特定の文字列パターン」を探すのに向いている、という住み分け。

## チートシート

```sh
# デフォルトインターフェースでポート80(HTTP)を監視
ngrep port 80

# 全インターフェースを対象にする(-d any)
ngrep -d any port 25

# 特定文字列を含むパケットだけに絞り込む(syslogでerrorを検索)
ngrep -d any 'error' port syslog

# 単語マッチング+大文字小文字を区別しない(FTPのuser/passを監視)
ngrep -wi -d any 'user|pass' port 21

# 行単位で表示してヘッダを見やすく整形(HTTP向け)
ngrep -W byline port 80

# 16進数パターンでバイナリデータを検索
ngrep -xX '0xc5d5e5f55666768696a6b6c6d6e6' port 80

# キャプチャ結果をpcapファイルに保存(タイムスタンプ付き)
ngrep -O /tmp/dns.dump -T port domain

# 保存したpcapファイルを後から検索
ngrep -I /tmp/dns.dump
```

主なオプション:

| オプション | 意味 |
| --- | --- |
| `-d <iface>` | キャプチャするインターフェース指定(`any`で全インターフェース) |
| `-i` | 大文字小文字を区別しない |
| `-w` | 単語単位でマッチング |
| `-x` | 16進数ダンプも表示 |
| `-X` | 16進数パターンでマッチング |
| `-W byline` | 出力を行単位に整形 |
| `-O <file>` | キャプチャ結果をpcapファイルに保存 |
| `-I <file>` | 保存済みpcapファイルを読み込んで検索 |
| `-T` | タイムスタンプを表示 |

フィルタ部分(`port 80`など)は`tcpdump`と同じ[[bpf|BPF]]構文が使える。

## 出典

- [ngrep(8): network grep - Linux man page](https://linux.die.net/man/8/ngrep)
- [ngrep - network grep](https://ngrep.sourceforge.net/usage.html)
- [What is ngrep and How to Use It? - Linux Hint](https://linuxhint.com/how-to-use-ngrep/)
