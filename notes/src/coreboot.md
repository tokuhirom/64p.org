---
created: 2026-08-09
updated: 2026-08-09
---
# coreboot

BIOS/UEFIを置き換える、オープンソースのファームウェアプロジェクト。旧称LinuxBIOS。1999年に初リリース、当初の開発者にはRonald G. Minnich、Eric Biedermanらが名を連ねる。 #linux #kernel

## 設計思想

- 起動速度・セキュリティ・柔軟性に強くフォーカスした「BIOS/UEFIの置き換え」を標榜し、バックドアや'80年代からの不要なコードを排除してできる限り高速にOSを起動することを目指す。
- デスクトップ・ノートPCでは1秒未満、サーバーでは数分単位の起動時間短縮を実現できるとされる。
- もともとはノード数千台規模のスーパーコンピュータ向けに設計されたが、デスクトップ・ヘッドレスサーバー・ノートPC・タブレット・IoTデバイスまで幅広く動作する。
- ソースコードは他のOSSと同様に検査・学習・改変が可能。

## 技術詳細

主にC言語(約1%はアセンブリ、オプションでSPARK)で書かれており、IA-32・x86-64・ARMv7・ARMv8・RISC-V・POWER8など複数のプラットフォームをサポートする。Linuxカーネル開発に携わるエンジニアも多く関わっている。

## 採用例

[[system76|System76]]は一部のノートPCでcorebootを採用し、自社でも関連リポジトリをGitHubで公開している。

## 出典

- [Coreboot - Wikipedia](https://en.wikipedia.org/wiki/Coreboot)
- [coreboot for end users](https://www.coreboot.org/end_users.html)
- [System76 introduces laptops with open source BIOS coreboot | Opensource.com](https://opensource.com/article/19/11/coreboot-system76-laptops)
