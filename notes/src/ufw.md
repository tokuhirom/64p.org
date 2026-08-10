---
created: 2026-08-10 21:19
updated: 2026-08-10 21:20
---
# ufw

**Uncomplicated Firewall**の略。Debian系(Ubuntuなど)で標準的に使われるファイアウォール管理ツール。 #linux #security

## 特徴

- 内部では強力なパケットフィルタリングエンジンである[[iptables]](netfilter)を利用しているが、利用者にはシンプルなコマンドラインインターフェースだけを提供する、いわば[[iptables]]のフロントエンド
- 複雑な[[iptables]]のルール記述を意識せず、簡単なコマンドで本格的なパケットフィルタリングを設定できる
- 設定ミスのリスクを減らしながら、有効化/無効化、デフォルトポリシー(拒否/許可)の設定、特定ポート・IPからのアクセス許可、ルール削除などが可能

## 基本コマンド例

```sh
sudo ufw enable          # 有効化
sudo ufw disable         # 無効化
sudo ufw default deny    # デフォルトで拒否
sudo ufw allow 22/tcp    # SSHなど特定ポートを許可
sudo ufw status          # ルール一覧確認
```

## 出典

- [UFW (Uncomplicated Firewall)の使い方](https://zenn.dev/tomoakinagahara/articles/3ef0f6ab777af5)
- [ufw - セキュリティ](https://kaworu.jpn.org/security/ufw)
- [Uncomplicated Firewall - ufw - ArchWiki](https://wiki.archlinux.jp/index.php/Uncomplicated_Firewall)
- [UFWって何？Linuxでファイアウォールをサクッと設定＆解説してみた！ - Qiita](https://qiita.com/Termnix-IT/items/7c26348916d9c55a83cc)
