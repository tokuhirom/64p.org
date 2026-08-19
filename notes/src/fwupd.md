---
created: 2026-08-19 18:25
updated: 2026-08-19 22:44
---
# fwupd

Linux上で[[uefi|UEFI]]/BIOS、NVMe SSD、ネットワークカードなど各種デバイスのファームウェア更新を扱うシステムデーモン。ベンダーごとにバラバラだったファームウェア更新手順を、統一されたインターフェースで安全に行えるようにする。

## 仕組み

- [[lvfs|Linux Vendor Firmware Service (LVFS)]]というクラウドサービスに、各OEMベンダーがファームウェアイメージを提供する。
- fwupdデーモンは[[lvfs|LVFS]]からメタデータカタログをダウンロードし、署名検証などのチェックを経たファームウェアイメージをD-Busソケット経由で受け取り、システムに適用する。
- ユーザー操作はCLIツール`fwupdmgr`、またはGNOME SoftwareのようなGUIフロントエンド経由で行う。

## 基本的な使い方(fwupdmgr)

```sh
fwupdmgr get-devices    # 対応デバイス一覧を表示
fwupdmgr refresh        # メタデータを更新
fwupdmgr get-updates    # 利用可能な更新を確認
fwupdmgr update         # 更新を適用
```

## 対応ディストリビューション

Fedora、Ubuntu、Debian、Arch Linux、openSUSEなど主要ディストリビューションで利用可能。GitHubでOSSとして開発されている(`fwupd/fwupd`)。

## 出典

- [GitHub - fwupd/fwupd](https://github.com/fwupd/fwupd)
- [fwupd - ArchWiki](https://wiki.archlinux.org/title/Fwupd)
- [Fwupd - Wikipedia](https://en.wikipedia.org/wiki/Fwupd)
- [fwupd - Gentoo wiki](https://wiki.gentoo.org/wiki/Fwupd)
- [Use fwupd to deploy Linux firmware updates and more | Red Hat Developer](https://developers.redhat.com/articles/2023/10/06/use-fwupd-deploy-linux-firmware-updates-and-more)

#linux #firmware
