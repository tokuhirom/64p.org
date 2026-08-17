---
created: 2026-08-18 08:44
updated: 2026-08-18 08:44
---
# Linux 7.2

2026年8月16日にリリースされたLinuxカーネルのバージョン。Linux 7.0(2026年4月12日リリース)・7.1に続く7.xシリーズ3番目のリリース。 #linux #kernel

## なぜ7.xになったか

Linux 6.19の次のバージョンとして、Linus Torvaldsが「6.20」ではなく「7.0」への番号繰り上げを決めた。これは技術的な節目ではなく、マイナーバージョン番号が二桁後半まで伸びるのを嫌う本人の個人的な好みによるもの。3.19→4.0(2015年)、5.19→6.0(2022年)でも同じ理由で繰り上げており、今回も「特に理由はない」と説明している。

## 主な変更点

### スケジューラ
- CPUスケジューラがキャッシュ認識型の負荷分散に対応。同じLast Level Cache(LLC)ドメイン内でデータを共有するタスクをまとめて配置し、キャッシュミスを削減
- CFS(Completely Fair Scheduler)の設計思想に基づく「Fair(er)」なGPUスケジューラを実装、対話型クライアントのスケジューリングを改善
- sched_extがsub-scheduler基盤に初期対応

### メモリ管理
- MGLRU(Multi-Gen LRU)のメモリ回収ループ改善。MongoDB YCSB等の負荷で最大30%の性能向上
- スワップテーブル フェーズIV。匿名メモリとshmemスワップの割り当てを統一し、1TBスワップデバイス使用時に約512MBのメモリを節約

### ファイルシステム
- Btrfs: 大規模フォリオをデフォルト有効化、2MBまでの巨大フォリオを実験的サポート
- EROFSにfscacheバックエンド追加
- NFSDでディレクトリ委譲を実装
- Linux 7.1で入った新NTFS実装のさらなる改善

### ストレージ・セキュリティ
- `dm-inlinecrypt`デバイスマッパーターゲットによるインラインブロックデバイス暗号化ハードウェア対応
- [[landlock|Landlock]]の強化
- `openat2()`に`O_EMPTYPATH`フラグを追加し、通常ファイル以外への不正なリダイレクトを防止

### その他
- ネットワーク: MPTCPのIPv6シグナリング対応、PPPoEのGRO/GSO対応
- AArch64向けに2025年dpISA拡張のhwcaps追加
- IBM System/390(S/390)アーキテクチャ向けRustサポート追加
- 長らく非推奨だった`strncpy()`をカーネルから完全排除、アーキテクチャ固有の最適化MD5実装を削除、AF_ALG(userspace crypto socketインターフェース)の非推奨化を開始

## 出典

- [Linux 7.2 released - OSnews](https://www.osnews.com/story/145830/linux-7-2-released/)
- [Linux_7.2 - Linux Kernel Newbies](https://kernelnewbies.org/Linux_7.2)
- [Linux Kernel 7.2 Officially Released, This Is What's New - 9to5Linux](https://9to5linux.com/linux-kernel-7-2-officially-released-this-is-whats-new)
- [Linux 7.0 Arrives — But Don't Expect Fireworks: Inside Linus Torvalds' Famously Arbitrary Version Bump - WebProNews](https://www.webpronews.com/linux-7-0-arrives-but-dont-expect-fireworks-inside-linus-torvalds-famously-arbitrary-version-bump/)
