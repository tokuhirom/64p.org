---
created: 2026-08-19 22:44
updated: 2026-08-19 22:44
---
# LVFS(Linux Vendor Firmware Service)

OEMベンダーがファームウェアイメージをアップロードし、Linuxユーザーがそのメタデータ・更新ファイルを安全にダウンロードできるようにするWebサービス。[[fwupd]]のバックエンドとして機能する。Richard Hughesが開発した。

## 解決する課題

LVFS登場以前、Linux上でのファームウェア更新には以下のような問題があった。

- 手元のハードウェアの詳細情報や現在のファームウェアバージョンを把握しづらい
- 更新ファイルの入手先が分散していて不明確
- ベンダー提供のフラッシングツールがWindows専用で、Linuxで動かせない

## 仕組み

3層アーキテクチャで構成され、クライアント側の[[fwupd]]デーモンと連携する。ベンダーが`.cab`形式のファームウェアファイルをアップロードすると、以下の処理が行われる。

1. メタデータの検証
2. GPG/PKCS#7による署名
3. ファイルの再パック
4. データベースへの登録

fwupdmgrやGNOME Softwareなどのクライアントは、LVFSが提供するメタデータカタログを取得し、対応デバイスへの更新を適用する。

## 対応するファームウェアの種類

USB、Thunderbolt、Synapticsデバイスのファームウェアのほか、UEFI UpdateCapsuleやDFU(Device Firmware Upgrade)標準に準拠したファームウェアが対象。不揮発性メモリに書き込まれるファームウェアの配布に限定して使われる。

## 出典

- [Linux Vendor Firmware Service](https://fwupd.org/)
- [Introduction — LVFS documentation](https://lvfs.readthedocs.io/en/latest/intro.html)
- [LVFS makes Linux firmware updates easier | Opensource.com](https://opensource.com/article/17/11/firmware-updates-and-lvfs)
- [What Is LVFS and How Do I Use It? - Make Tech Easier](https://maketecheasier.com/what-is-lvfs/)

#linux #firmware
