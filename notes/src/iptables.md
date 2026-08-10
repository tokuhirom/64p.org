---
created: 2026-08-10 21:20
updated: 2026-08-10 21:20
---
# iptables

Linuxカーネルのパケットフィルタリング機能「Netfilter」を操作するためのコマンドラインツール。パケットフィルタリングやNAT(アドレス変換)などのパケット転送制御を、ルールベースで設定できる。 #linux #security

## 仕組み

ルールは「テーブル」と「チェーン」の組み合わせで指定する。

**テーブル(table)** — 機能ごとに用意されている

- `filter` — パケットフィルタ(通過の許可/拒否)
- `nat` — アドレス変換
- `mangle` — 特殊なパケット処理(ヘッダの書き換えなど)

**チェーン(chain)** — パケットが通過する処理段階を表す

- `INPUT` — ローカルシステムに入ってくるパケットを処理
- `OUTPUT` — システムから外部に送信されるパケットを処理
- `FORWARD` — システムを経由して転送されるパケットを処理

## [[ufw]]との関係

[[ufw]]はこのiptables(Netfilter)を直接操作する代わりに、シンプルなコマンドで同等の設定ができるようにしたフロントエンドツール。

## 出典

- [iptablesコマンドとは - IT用語辞典 e-Words](https://e-words.jp/w/iptables%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89.html)
- [iptablesの仕組みを図解 - Carpe Diem](https://christina04.hatenablog.com/entry/iptables-outline)
- [iptables まとめ【Linux ファイアウォール】 - RAKUS Developers Blog](https://tech-blog.rakus.co.jp/entry/20220301/iptables)
- [iptablesの概要 | KoANアカデミー](https://koanacademy.jp/iptables)
