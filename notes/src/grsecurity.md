---
created: 2026-08-11 16:46
updated: 2026-08-11 16:46
---
# grsecurity

Linuxカーネル向けのセキュリティ強化パッチセット。メモリ保護機能「PaX」を内包し、[[yama-lsm|Yama]]のptrace制限ロジックの元にもなった「子プロセスのみ」制限など、後にメインラインカーネルへ個別に取り込まれた機能を多数含んでいた。[[linux-security-modules|LSMフレームワーク]]を使う実装ではなく、カーネル本体に直接パッチを当てる方式である点が異なる。

## 経緯

2003年頃から開発・公開されてきたが、2015年8月にPaXが無償公開を終了し、2017年4月26日を最後に公開パッチの提供が終了した。以降はgrsecurityの商用サブスクライバー向けにのみ、最新カーネルに追従する形でパッチが提供されている。ライセンスはGPLv2のため、それまでに公開された最後の公開パッチをコミュニティが引き続き利用・改変・再配布すること自体は可能。

#kernel #linux #security

## 出典

- [Passing the Baton: FAQ - grsecurity](https://grsecurity.net/passing_the_baton_faq)
- [grsecurity - FAQ](https://grsecurity.net/faq)
