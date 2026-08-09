---
created: 2026-08-09
updated: 2026-08-09
---
# Solaris / illumos

**Oracle Solaris**(商用・プロプライエタリ)と、**illumos**(OpenSolarisの後継オープンソースプロジェクト)の2系統に分かれて、どちらも現在進行形で開発が続いている。 #solaris #unix

## Oracle Solaris(商用版)

- 最新版は Solaris 11.4 SRU92(2026年4月21日リリース)で、SRU(月次更新)ベースで継続的にアップデートされている
- サポート期限: Solaris 11.4は2031年11月まで、Solaris 10は2027年1月まで延長
- 2026年3月には開発者・FOSSコミュニティ向けに Solaris Common Build Environment (CBE) も公開されている

## OpenSolaris → illumos

- Sun時代のオープンソースプロジェクト「OpenSolaris」自体は、2010年にOracleがSunを買収した後に打ち切られた
- それに反発した開発者たちが **illumos** としてフォーク。2012年にillumos Foundationが501(c)6として法人化され、コミュニティ主導で継続開発中
- ZFS、DTrace、Solaris Zonesといった目玉機能を引き継いでいる
- Oracle Solaris 11自体もOpenSolarisからのプロプライエタリフォークだが、illumosとはこの10年近くで実装がかなり乖離している

## illumosディストリビューション

illumosを元にしたディストリビューションも活発。**OpenIndiana** は「Hipster 2026.04」を2026年5月5日にリリースしており、他にもOmniOS、SmartOS、Tribblixなどが存在する。

## まとめ

「OpenSolarisという名前のプロジェクト」自体はもう存在しないが、その血筋は**Oracle Solaris**(商用)と**illumos系**(OSS)の2系統に分かれて、どちらも2026年現在生きている。

[[snoop]]など、64p.orgのnotesで言及したSolaris標準ツール群は現行のOracle Solarisにも引き続き搭載されている。

## 出典

- [Solaris Operating System - Releases (Oracle)](https://www.oracle.com/solaris/technologies/releases.html)
- [Oracle Solaris - Wikipedia](https://en.wikipedia.org/wiki/Oracle_Solaris)
- [FAQ - illumos](https://www.illumos.org/docs/about/faq/)
- [OpenIndiana - Wikipedia](https://en.wikipedia.org/wiki/OpenIndiana)
