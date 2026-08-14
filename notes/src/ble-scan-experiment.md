---
created: 2026-08-14 14:08
updated: 2026-08-14 14:08
---
# BLEスキャン実験: 周囲のアドバタイズを観察する

#bluetooth #experiment #linux

[[bluetooth-low-energy|BLE]]のアドバタイズが実際にどう飛んでいるかを、手元のLinuxマシン (Pop!_OS + BlueZ) の `bluetoothctl` で観察した記録。[[find-my-network|Find My ネットワーク]]系のトラッカー探しも兼ねて、検出デバイスのManufacturerData/ServiceDataを覗いてみた。

## やったこと

アダプタ確認 → LEスキャン → 検出デバイスの詳細確認、の3ステップ。root不要。

```sh
# アダプタの確認
bluetoothctl list
bluetoothctl show

# BLEアドバタイズを12秒間スキャン (le指定でClassicを除外)
bluetoothctl --timeout 12 scan le

# 検出デバイス一覧と、個別の詳細
bluetoothctl devices
bluetoothctl info <MACアドレス>
```

## 結果

12秒のスキャンで7台検出。名前が取れたのはUHK 80（キーボード）とLinksys（ルーター）のみで、残りは名無しのランダムアドレスだった。

`bluetoothctl info` でアドバタイズに載っていたデータを見ると:

- **Apple (ManufacturerData key `0x004c`) が2台** — ペイロードは `16 08 00 ...` で始まる10バイト。AppleのContinuityプロトコル（AirDrop/Handoff等を支える非公開仕様のBLEブロードキャスト群）の一種と思われるが、先頭のメッセージタイプ`0x16`はリバースエンジニアリング資料でも定番の一覧（`0x12`=Find My等）に見当たらず、詳細は特定できなかった
- **ServiceData UUID `0xFCF1` が2台** — `0xFCF1`はBluetooth SIGのメンバーUUID割り当てで**Google LLC**。22バイトのバイナリペイロードで、具体的なプロトコルまでは特定していない（周囲のGoogle系デバイスの何らかのブロードキャストらしい、というところまで）

Find Myのオフライン検索アドバタイズ（Appleのタイプ`0x12`）そのものは今回の12秒では観測できなかった。

## 読み取れること

- BLEアドバタイズは常時大量に飛んでいる。わずか12秒・自室でも7台、うち4台がApple/Googleエコシステムの「見えないブロードキャスト」だった
- 名無しデバイスのアドレスは `51:xx`（上位2bit `01` = resolvable private）や `1D:xx`/`3A:xx`（`00` = non-resolvable private）で、[[bluetooth-low-energy|BLE]]のランダムアドレスによるプライバシー保護が実際に使われているのが確認できた。一方UHKキーボードは `EB:xx`（`11` = static random）で固定
- RSSIも見えるので、アドバタイズを拾って距離感を推定する（≒[[find-my-network|Find My ネットワーク]]のクラウドソーシング測位の要素技術）のはこの情報だけで素朴には成立する

## 躓いた点

- `bluetoothctl scan le` は フォアグラウンドで流れ続けるので、非対話実行では `--timeout` を付けるか `timeout` コマンドで切る必要がある
- スキャン終了後しばらくすると未接続デバイスはBlueZのキャッシュから消えていく（RSSIがnilになる）ので、`info` での確認はスキャン直後に行う

## 出典

- [Bluetooth SIG Assigned Numbers: Member UUIDs](https://bitbucket.org/bluetooth-SIG/public/raw/main/assigned_numbers/uuids/member_uuids.yaml) — `0xFCF1` = Google LLC の確認
- [Apple Nearby Actions: The Protocol Behind iOS BLE Popups — InfiShark](https://infishark.com/blogs/learn/apple-nearby-actions-the-protocol-behind-ios-ble-popups) — Continuityアドバタイズのヘッダ構造 (AD Type 0xFF + Company ID 0x4C00)
