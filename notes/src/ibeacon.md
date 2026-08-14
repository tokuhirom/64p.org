---
created: 2026-08-14 14:12
updated: 2026-08-14 14:12
---
# iBeacon

#apple #bluetooth #ibeacon

Appleが2013年のWWDC (iOS 7) で発表したBLEビーコンの規格。キーノートのスライド1枚だけの静かな発表だったが、小売・美術館・屋内測位などの「近接検知」市場を作った。実体は[[bluetooth-low-energy|BLE]]の**非接続アドバタイズにApple定義のManufacturer Dataを載せただけ**のもので、ビーコン自身は誰が聞いているか知らないし、データも一方通行。受信側 (iPhone) が「どのビーコンのそばにいるか」を知るためだけの仕組み。

## パケットフォーマット

BLEアドバタイズのManufacturer Specific Data (AD Type `0xFF`) として以下を載せる。

| フィールド | サイズ | 内容 |
|---|---|---|
| Company ID | 2B | `0x004C` (Apple, リトルエンディアン表記で `4C 00`) |
| Type | 1B | `0x02` (Proximity Beacon) |
| Length | 1B | `0x15` (=21: 以降のペイロード長) |
| Proximity UUID | 16B | ビーコン群を識別するUUID |
| Major | 2B (BE) | UUID内のグループ番号 |
| Minor | 2B (BE) | グループ内の個体番号 |
| Measured Power | 1B | 1m地点でのRSSI較正値 (2の補数) |

UUID/Major/Minorは3階層のIDとして使う想定で、典型例は「チェーン全体=UUID、店舗=Major、売り場=Minor」。

## 距離推定

受信側は実際のRSSIとMeasured Power（1m地点の較正値）を比べて距離を推定する。iOSのCore Locationでは `immediate` / `near` / `far` / `unknown` の4段階の粗い区分 (CLProximity) で返してくる。電波環境の影響が大きいので、メートル精度の測距ではなく「ゾーン判定」として使うのが前提。

## Core Locationとの統合

iOSではiBeaconはCoreBluetoothではなく位置情報API (Core Location) の扱いになっているのが特徴的な設計。

- **リージョン監視** — 指定UUIDのビーコン圏内への出入りをOSが監視し、アプリがバックグラウンド・未起動でも通知で起こしてもらえる
- **レンジング** — フォアグラウンドで周囲のビーコンとの距離区分を連続取得する

「店に入ったらアプリが起きてクーポンを出す」のような体験はリージョン監視の仕組みに乗っている。

## セキュリティ・プライバシー

フレームは平文の固定IDをただ垂れ流すだけなので、誰でも受信・複製（スプーフィング）できる。ビーコンのなりすまし対策は規格自体には無い。[[find-my-network|Find My ネットワーク]]が公開鍵を暗号論的にローテーションするのと対照的に、iBeaconは「固定IDを晒すことが目的」の設計。

## 類似規格

- **Eddystone** — Google製のオープンなビーコン仕様 (2015)。UID/URL/TLMなど複数のフレームタイプを持つ
- **AltBeacon** — Radius Networksによるベンダー中立のオープン仕様

このマシンのBlueZから実際にiBeaconフレームを発信してみた記録は [[ibeacon-advertise-experiment]] を参照。

## 出典

- [The Promise of iBeacons in iOS 7 — TidBITS](https://tidbits.com/2013/09/18/the-promise-of-ibeacons-in-ios-7/)
- [iBeacon packet structure — AprilBrother Wiki](https://wiki.aprbrother.com/en/iBeacon_Packet.html)
- [What Is An iBeacon — Punch Through](https://punchthrough.com/wtf-is-an-ibeacon/)
- [iBeacon Tutorial: Silicon Labs BG22 — Novel Bits](https://novelbits.io/ibeacon-tutorial-silicon-labs-bg22/)
- [BLE Beacon with ESP32: iBeacon & Eddystone Packet — Zbotic](https://zbotic.in/ble-beacon-with-esp32-ibeacon-eddystone-packet-broadcasting/)
